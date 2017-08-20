import {success, failure} from './libs/response-lib';
import {FLICKR_API_KEY, FLICKR_API_SECRET} from './config.js'
let Flickr = require("node-flickr");

export async function photos(event, context, callback) {

  try {
    let keys = {
      api_key: FLICKR_API_KEY,
      secret: FLICKR_API_SECRET
    }
    let flickr = new Flickr(keys);

    flickr.get("photos.search",
      {
        user_id: "144521588@N08",
        per_page: 9,
        page: 1,
        sort: 'interestingness-desc'
      },
      function (err, result) {
        if (err) {
          callback(null, success(err));
        } else {
          callback(null, success(result.photos.photo));
        }
      });
  }
  catch (e) {
    callback(null, failure({status: false}));
  }
};

