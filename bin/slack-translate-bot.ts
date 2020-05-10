#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SlackTranslateBotStack } from '../lib/slack-translate-bot-stack';

const app = new cdk.App();
new SlackTranslateBotStack(app, 'SlackTranslateBotStack');
