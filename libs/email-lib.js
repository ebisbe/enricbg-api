import AWS from 'aws-sdk';
import {NOTIFY_EMAIL} from '../config.js'


AWS.config.update({region: 'eu-west-1'});

export function buildMessage(name, email, message) {
  return {
    Destination: {
      ToAddresses: [NOTIFY_EMAIL],
    },
    Message: {
      Subject: {
        Data: 'New message from:' + name,
        Charset: 'UTF-8'
      },
      Body: {
        Text: {
          Data: message,
          Charset: "UTF-8"
        }
      }
    },
    Source: email
  };
}

export function call(action, params) {
  const ses = new AWS.SES();

  return ses[action](params).promise();
}
