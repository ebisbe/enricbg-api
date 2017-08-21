import {success, failure} from './libs/response-lib';
import {FLICKR_API_KEY, FLICKR_API_SECRET} from './config.js'

let Flickr = require('flickr-sdk');


export async function photos(event, context, callback) {

  try {
    var flickr = new Flickr({
      apiKey: FLICKR_API_KEY,
      apiSecret: FLICKR_API_SECRET
    });

    flickr
      .request()
      .people("144521588@N08")
      .media()
      .get({ per_page: 9, page:1, sort: 'interestingness-desc'})
      .then(function (response) {
        callback(null, success(response.body.photos.photo));
      });
  }
  catch (e) {
    callback(null, failure({status: false}));
  }
};

