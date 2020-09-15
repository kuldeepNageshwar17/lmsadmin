import {all} from "redux-saga/effects";
import {combineReducers} from "redux";


import * as auth from "../app/modules/Auth/_redux/authRedux";
import * as ecourse from "../app/modules/ECourse/_redux/EcourseRedux";


export const rootReducer = combineReducers({
  auth: auth.reducer, 
  course:ecourse.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
