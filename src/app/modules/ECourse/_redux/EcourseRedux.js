import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'

export const actionTypes = {
  ADD_SECTION: 'New Course Section',
  SET_CURRENT_COURSE: 'Set Current Course',
  SET_CURRENT_SECTION: 'Set Current Section',
  SET_CURRENT_CONTENT:'Set Current Content'
}

const initialCourseState = {
  CurrentCourseId: null,
  CurrentSection: null,
  CurrentContent:null,
}

export const reducer = persistReducer(
  { storage, key: 'v706-ecom' },
  (state = initialCourseState, action) => {
    switch (action.type) {
      case actionTypes.SET_CURRENT_COURSE: {
        const { id } = action.payload
        return { ...state, CurrentCourseId: id }
      }
      case actionTypes.SET_CURRENT_SECTION: {
        const { item } = action.payload
        return { ...state, CurrentSection: item }
      }
      case actionTypes.SET_CURRENT_CONTENT: {
        const { item } = action.payload
        return { ...state, CurrentContent: item }
      }
      default:
        return state
    }
  }
)

export const actions = {
  SetCurrentCourse: id => ({
    type: actionTypes.SET_CURRENT_COURSE,
    payload: { id }
  }),
  SetCurrentSection: item => ({
    type: actionTypes.SET_CURRENT_SECTION,
    payload: { item }
  }),
  SetCurrentContent: item => ({
    type: actionTypes.SET_CURRENT_CONTENT,
    payload: { item }
  })
}
