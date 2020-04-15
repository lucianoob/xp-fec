import { SEARCH_RECENTS, SEARCH_LAST } from '../actions/actionTypes';

const initialState = {
  storeSearchRecents: {},
  storeSearchLast: ''
};

export const changeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RECENTS:
      return Object.assign({}, state, {
        storeSearchRecents: action.searchRecents
      });
    case SEARCH_LAST:
      return Object.assign({}, state, {
        storeSearchLast: action.searchLast
      });
    default:
      return state;
  }
};
