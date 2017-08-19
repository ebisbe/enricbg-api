import {DOMAIN} from '../config.js'

export function success(body) {
  return buildResponse(200, body);
}

export function failure(body) {
  return buildResponse(500, body);
}

export function validationError(validationResponse) {
  return buildResponse(422, {status: false, error: validationResponse.error.details[0].message});
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': DOMAIN,
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  };
}