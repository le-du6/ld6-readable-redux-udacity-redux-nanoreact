import {
  PIPO,
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_W_POSTS,
  GET_ALL_POSTS,
  GET_COMMENTS,
  GET_CURRENT_POST,
  POST_NEW_COMMENT,
  PUT_UPDATE_COMMENT,
  DEL_COMMENT,
  VOTE_COMMENT,
} from '../actions/actions'

const initialState = {
  allCategories: [],
  allCategoriesWP: [],
  allPosts: [],
  allVotes: []
}

function myReducer(state = initialState, action) {
  switch (action.type) {
    case POST_NEW_COMMENT:
      return state
    case PUT_UPDATE_COMMENT:
      return state
    case DEL_COMMENT:
      return state
    case VOTE_COMMENT:
      return Object.assign({}, state, {
        votedComment: action.comment
      })
    case GET_ALL_CATEGORIES:
      return Object.assign({}, state, {
        allCategories: action.categories
      })
    case GET_ALL_CATEGORIES_W_POSTS:
      return Object.assign({}, state, {
        allCategoriesWP: action.categoriesWP
      })
    case GET_ALL_POSTS:
      return Object.assign({}, state, {
        allPosts: action.posts
      })
    case GET_COMMENTS:
      return Object.assign({}, state, {
        comments: action.comments
      })
    case GET_CURRENT_POST:
      return Object.assign({}, state, {
        currentPost: action.currentPost
      })
    default:
      return state
  }
}

export default myReducer;