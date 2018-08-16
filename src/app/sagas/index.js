import { fork, call, put } from 'redux-saga/effects';
import Api from '../services/api';
import * as systemActions from '../actions/system';
import { createDescription } from '../services/misc';

function* fetchData() {
  let moreDataToFetch = true;
  let data = [];

  const config = JSON.parse(yield call(Api.readConfigFile));

  while (moreDataToFetch) {
    const response = yield call(Api.getResponse, config.dataUrl);
    const newData = yield response.json;
    data = [...data, ...newData];

    if (response.link.next) {
      config.dataUrl = response.link.next.url;
    } else {
      moreDataToFetch = false;
    }
  }

  data = data.map(object => ({
    id: object.id,
    title: object.displayTitle,
    media: object.media.filter(media => media.medium)[0],
    description: createDescription(object),
  }));

  yield put(systemActions.recievedObjects(data));

  // Preload the medium sized image used in object modal
  for (let i = 0; i < data.length; i += 1) {
    yield call(Api.cacheImage, data[i].media.medium.uri);
  }
}

export default function* root() {
  yield fork(fetchData);
}
