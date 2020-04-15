import { SEARCH_RECENTS, SEARCH_LAST } from './actionTypes';

export default {
  changeSearchRecents(storeSearchRecents) {
    return {
      type: SEARCH_RECENTS,
      searchRecents: storeSearchRecents
    }
  },
  changeSearchLast(storeSearchLast) {
    return {
      type: SEARCH_LAST,
      searchLast: storeSearchLast
    }
  }
}
