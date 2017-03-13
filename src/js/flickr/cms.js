function cms() {
  $.ajax({
    url: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=yvr&format=json',
    jsonpCallback: 'jsonFlickrFeed',
    dataType: 'jsonp', // JSON with Padding. Whereas padding is the function name that Flickr is wrapping JSON in
    success: (response) => {
      const html = [];
      response.items.forEach((item) => {
        html.push(`<img src="${item.media.m}">`);
      });
      $('body').append(html.join(''));
    }
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    cms
  };
}
