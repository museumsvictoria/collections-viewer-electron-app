import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import fetch from 'fetch-retry';
import parse from 'parse-link-header';

const isDevMode = process.execPath.match(/[\\/]electron/);

export default class Api {
  static getResponse(url) {
    return fetch(url, {
      retries: 5,
      retryDelay: 2000,
    }).then(response => ({
      json: response.json(),
      link: parse(response.headers.get('link')),
    }));
  }

  static cacheImage(resourceUrl) {
    return new Promise((resolve) => {
      const imageEl = new Image();
      imageEl.src = resourceUrl;
      imageEl.addEventListener('load', () => {
        resolve();
      });
    });
  }

  static readConfigFile() {
    return new Promise((resolve, reject) => {
      const configFilePath = isDevMode
        ? './config.json'
        : `${path.dirname(remote.app.getPath('exe'))}/config.json`;

      fs.readFile(
        configFilePath,
        (err, data) => (err ? reject(err) : resolve(data)),
      );
    });
  }
}
