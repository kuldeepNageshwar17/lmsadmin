import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken,logoutUser } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  LogoutRequested:"[Logout User] Auth API",
  ChangeBranch:"[Change Current Branch] Auth API",
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  currentBranch:null,
  branches:[]
};

export const reducer = persistReducer(
  { storage, key: "v706-demo1-auth", whitelist: ["user", "authToken","currentBranch","branches"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;
        return { ...state, authToken, user: undefined };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;
        return {  ...state,authToken, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user,branches:user.branches,currentBranch:state.branches?user.branches[0]:null};
      }
      case actionTypes.ChangeBranch: {
        const { branchId } = action.payload;
        return { ...state,currentBranch:state.branches?state.branches.filter(m=>m._id===branchId)[0]:null};
      }
      default:
        return state
    }
  }
);

export const actions = {
  login: authToken => ({ type: actionTypes.Login, payload: { authToken } }),
  register: authToken => ({
    type: actionTypes.Register,
    payload: { authToken }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } }),
  requestLogout: user => ({ type: actionTypes.LogoutRequested}),
  changeBranch: branchId=>({ type: actionTypes.ChangeBranch,payload:{branchId}})

};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getUserByToken();
    yield put(actions.fulfillUser(user));
  });
  yield takeLatest(actionTypes.LogoutRequested, function*  UserLogout() {
    debugger;
    logoutUser();
    yield put(actions.logout());
  });
}
