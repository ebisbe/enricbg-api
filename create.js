import uuid from 'uuid';
import * as dynamoDbLib from './libs/dynamodb-lib';
import {success, failure, validationError} from './libs/response-lib';
import * as sesLib from './libs/email-lib';
import joi from '@hapi/joi';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body).params;

  const schema = joi.object().keys({
    name: joi.string().alphanum().min(3).max(30),
    message: joi.string().min(1),
    email: joi.string().email()
  });

  const validationResponse = joi.validate(data, schema, {presence: 'required'});
  if (validationResponse.error !== null) {
    callback(null, validationError(validationResponse));
    return;
  }

  const params = {
    TableName: 'enricbg_messages',
    Item: {
      messageId: uuid.v1(),
      name: data.name,
      email: data.email,
      message: data.message,
      createdAt: new Date().getTime(),
    },
  };

  try {
    const result = await dynamoDbLib.call('put', params);

    let message = sesLib.buildMessage(data.name, data.email, data.message);
    const resultEmail = await sesLib.call('sendEmail', message);
    callback(null, success(params.Item));
  }
  catch (e) {
    console.log(e);
    callback(null, failure({status: false}));
  }
};

