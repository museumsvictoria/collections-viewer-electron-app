import fetch from 'isomorphic-fetch';
import parse from 'parse-link-header';

export default class Api {
  static getResponse(url) {
    return fetch(url)
      .then(response => ({ json: response.json(), link: parse(response.headers.get('link')) }));
  }
}
