import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken,
  // logoutUser
 } from "./authCrud";

export const actionTypes = {
  getUserData : 'getUserData',
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  registerReducer: "[registerReducer] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  LogoutRequested:"[Logout User] Auth API",
  ChangeBranch:"[Change Current Branch] Auth API",
  ChangeControlPanelStatus:"[Change Control panel status]"
};

const initialAuthState = {
  user: undefined,
  isInstituteUser:false,
  userPermission:[],
  authToken: undefined,
  currentBranch:null,
  branches:[],
  controlPanelStatus:false
};

export const reducer = persistReducer(
  { storage, key: "v706-demo1-auth", whitelist: ["user", "authToken","currentBranch","branches","controlPanelStatus","isInstituteUser","userPermission"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;
        return { ...state, authToken, user: undefined };
      }

      case actionTypes.registerReducer: {
        const message = action.payload;
        return {  ...state, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user ,authToken} = action.payload;
        debugger;
        if(user && user.roles){
          console.log("in reduceer" , user)
          var  instituteAdmin= user.roles.filter(u=> u.type===1)
          console.log("in reduceer 1" , instituteAdmin)
          var isInstituteUser=instituteAdmin.length?true:false;
        }
      
        return { ...state,authToken , user,userPermission:user.permission,branches:user.branches,currentBranch:user.branch,isInstituteUser};
      }
        case actionTypes.ChangeControlPanelStatus: {
          debugger;
          const { status } = action.payload;
        return { ...state,controlPanelStatus:status};
      }
      // case actionTypes.ChangeBranch: {
      //   const { branchId } = action.payload;
      //   return { ...state,currentBranch:state.branches?state.branches.filter(m=>m._id===branchId)[0]:null};
      // }
      default:
        return state
    }
  }
);

export const actions = {
  login: authToken => ({ type: actionTypes.Login, payload: { authToken } }),
  register: message => ({
    type: actionTypes.Register,
    payload: { message }
  }),
  registerReducer: message => ({
    type: actionTypes.Register1,
    payload: { message }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user =>({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser:( user ,authToken) => ({ type: actionTypes.UserLoaded, payload: { user ,authToken } }),
  requestLogout: user => ({ type: actionTypes.LogoutRequested}),
  changeBranch: branchId=>({ type: actionTypes.ChangeBranch,payload:{branchId}}),
  ChangeControlPanelStatus:status=>({type: actionTypes.ChangeControlPanelStatus,payload:{status}})

};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga(action) {
    console.log("in the saga" , action.payload.message)
    yield put(actions.registerReducer(action.payload.message))
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getUserByToken();
    yield put(actions.fulfillUser(user));
  });

  // yield takeLatest(actionTypes.LogoutRequested, function*  UserLogout() {
  //   debugger;
  //   logoutUser();
  //   yield put(actions.logout());
  // });

  yield takeLatest(actionTypes.getUserData, function* getUser(action) {
    debugger
    const {authToken }  = action.payload
    console.log("auth here" , authToken)
    const { data: user } = yield getUserByToken(authToken);
    debugger
    yield put(actions.fulfillUser(user ,authToken));
    console.log("auth" , authToken , user)
  });
}
