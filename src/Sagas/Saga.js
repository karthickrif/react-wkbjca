import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { FetchFromLoginApi, FetchfromSessionApi } from './FetchData';

function* loginAsync(action) {
  const authData = yield call(FetchFromLoginApi, action.value);
  yield delay(1000);
  if (authData.authToken != undefined) {
    const sessionData = yield call(FetchfromSessionApi, authData.authToken);
    yield put({ type: 'ReceiveApiData', value: sessionData });
    yield put({ type : 'ReceiveAuthToken' , value: authData.authToken})
    yield put({ type : 'FailedAuthToken' , value: authData,status : "success"})
  } else {
    yield put({ type : 'FailedAuthToken' , value: authData, status : "failed"})
    console.log('failed',authData);
  }
}

export function* rootSaga() {
  yield takeLatest('GetLoginData', loginAsync);
}
