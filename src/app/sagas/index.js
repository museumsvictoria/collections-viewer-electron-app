import { fork, call, put } from 'redux-saga/effects';
import Api from '../services/api';
import * as systemActions from '../actions/system';
import { createDescription } from '../services/misc';

function* fetchRelatedItems(relatedItemIds) {
  const items = [];

  for (const itemId of relatedItemIds) {
    const response = yield call(Api.getResponse, `https://collections.museumvictoria.com.au/api/${itemId}`);

    const json = yield response.json;

    if (json.media && json.media.length) {
      const media = json.media.filter(m => m.medium)[0];

      items.push({
        id: json.id,
        title: json.displayTitle,
        media,
        description: createDescription(json),
      });

      // Preload the medium sized image used in object modal
      yield call(Api.cacheImage, media.medium.uri);
    }
  }

  return items;
}

function* fetchData() {
  const data = [];

  const config = JSON.parse(yield call(Api.readConfigFile));

  for (const url of config.dataUrls) {
    const response = yield call(Api.getResponse, url);
    const json = yield response.json;

    const relatedItems = yield fetchRelatedItems(json.relatedItemIds);

    if (relatedItems && relatedItems.length) {
      data.push({
        title: json.title.substr(0, json.title.indexOf('-')).trim(),
        items: relatedItems,
      });
    }
  }

  yield put(systemActions.recievedObjects(data));
}

export default function* root() {
  yield fork(fetchData);
}
