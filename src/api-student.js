const wreck = require('wreck');
const request = require('request');
const credentials = require('../credentials.json');

const transformTagsJson = (response) => {
  const tags = response.tags.map((tag) => {
    const {
      name,
      confidence,
    } = tag;

    return {
      name,
      confidence,
    };
  });

  return tags;
};

const flickrJpgPath = (flickrResponse) => {
  const paths = flickrResponse.photos.photo.map((photo) => {
    const {
      farm,
      id,
      secret,
      server,
      title,
      latitude,
      longitude,
    } = photo;

    let map = {};
    map["image"] = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
    map["title"] = title;
    map["lat"] = latitude;
    map["long"] = longitude;

    return map;
  });

  return paths;
};

exports.flickrJpgPath = flickrJpgPath;

exports.plugin = {
  name: 'api-student',
  version: '1.3.0',
  register: (server) => {
    server.route({
      method: 'GET',
      path: '/api/student/flickr',
      handler: async (request) => {
        let address = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${credentials.flickr.api_key}&has_geo=1&accuracy=11&per_page=20&format=json&nojsoncallback=1&lat=${request.query.latitude}&lon=${request.query.longitude}&radius=2&extras=geo,tags`;
        let transform = flickrJpgPath;

        try {
          const { payload } = await wreck.get(address);
          return { paths: transform(JSON.parse(payload)) };
        } catch (error) {
          return { error: error.message };
        }
      },
    });
  },
};
