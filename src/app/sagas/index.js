import { fork, call, put } from 'redux-saga/effects';
import Api from '../services/api';
import * as systemActions from '../actions/system';

function* fetchData() {
  let moreDataToFetch = true;
  let dataUrl = 'https://collections.museumvictoria.com.au/api/search?collection=Victorian+Women+on+Farms+Gathering+Collection&hasimages=yes';
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

  yield put(systemActions.recievedObjects(data.map(object => ({
    id: object.id,
    title: object.objectName,
    media: object.media.filter(media => media.medium)[0],
    description: object.objectSummary,
  }))));
}

export default function* root() {
  yield fork(fetchData);
}
