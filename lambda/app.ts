import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const translate = new AWS.Translate();

export async function handler(
  event: APIGatewayProxyEvent,
  context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {
  try {
    if (event.body == null) return { statusCode: 400, body: JSON.stringify({ message: 'request body is required' }) };
    const body = JSON.parse(event.body);
    if (body.type === 'url_verification') {
      console.log('challenge request');
      return { statusCode: 200, body: JSON.stringify({ challenge: body.challenge }) };
    }

    // reaction_added event
    if (body.event.type === 'reaction_added') {
      if (body.event.reaction === 'translate') {
        return { statusCode: 200, body: JSON.stringify({ message: 'OK' }) };
      }
    }

    // message events
    if (body.event.type === 'message') {
      const { thread_ts, text } = body.event;

      const params = {
        SourceLanguageCode: 'auto',
        TargetLanguageCode: 'en',
        Text: text
      };
      const { TranslatedText } = await translate.translateText(params).promise();
      console.log(TranslatedText);
    }

    return { statusCode: 502, body: JSON.stringify({ message: '' }) };
  } catch (error) {
    console.log(error);
    return { statusCode: 502, body: JSON.stringify({ message: error }) };
  }
}
