import { fork, call, put } from 'redux-saga/effects';
import Api from '../services/api';
import * as systemActions from '../actions/system';

function* fetchData() {
  let moreDataToFetch = true;
  let dataUrl = 'https://collections.museumvictoria.com.au/api/search?classification=Clothing&collectingarea=clothing+%26+textiles&hasimages=yes&sort=date';
  let data = [];

  while (moreDataToFetch) {
    const response = yield call(Api.getResponse, dataUrl);
    const newData = yield response.json;
    data = [...data, ...newData];

    if (response.link.next) {
      dataUrl = response.link.next.url;
    } else {
      moreDataToFetch = false;
    }
  }

  data = data.map(object => ({
    id: object.id,
    title: object.objectName,
    media: object.media.filter(media => media.medium)[0],
    description: object.objectSummary,
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
