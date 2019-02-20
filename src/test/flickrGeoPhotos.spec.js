/* global describe, it */
const expect = require('expect.js');

const response = require('./fixtures/flickr-geophotos.json'); // Flickr service cached response
const { flickrJpgPath } = require('../api-student');

describe('Flickr', () => {
  it('should return a valid JPG path and tags', () => {
    const mockPhoto = {
      farm: 5,
      server: 4493,
      id: 37665981392,
      secret: '2e105fd543',
      title: 'test',
      tags: 'testtag',
      latitude: 1,
      longitude: -1,
    };
    const mock = { photos: { photo: [mockPhoto] } };
    const actual = flickrJpgPath(mock)[0];

    var map = {};
    map['image'] = `https://farm5.staticflickr.com/4493/37665981392_2e105fd543.jpg`;
    map['tag'] = 'testtag';
    map['title'] = 'test';
    map['lat'] = 1;
    map['long'] = -1;
    const expected = map;
    expect(actual).to.be(expected);
  });

  describe('Cached service response', () => {
    it('should be full length', () => {
      const actual = response.photos.photo.length;
      const expected = 20;
      expect(actual).to.be(expected);
    });

    it('should have the first photo path and tags', () => {
      const actual = flickrJpgPath(response)[0];
      var map = {};
      map['image'] = `https://farm1.staticflickr.com/861/43828217972_71aa124942.jpg`;
      map['tag'] = 'tags';
      map['title'] = 'title';
      map['lat'] = 49.289252;
      map['long'] = -123.110245;
      const expected = map;
      expect(actual).to.be(expected);
    });
  });
});
