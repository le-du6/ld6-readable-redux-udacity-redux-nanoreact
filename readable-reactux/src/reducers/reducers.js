import {
  PIPO,
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_W_POSTS,
  GET_ALL_POSTS,
  GET_COMMENTS,
  GET_CURRENT_POST,
  POST_NEW_COMMENT
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
    case GET_ALL_CATEGORIES:
      return Object.assign({}, state, {
        allCategories: action.categories
      })
    case GET_ALL_CATEGORIES_W_POSTS:
    console.log(action)
      return Object.assign({}, state, {
        allCategoriesWP: action.categoriesWP
      })
    case GET_ALL_POSTS:
    console.log(action)
      return Object.assign({}, state, {
        allPosts: action.posts
      })
    case GET_COMMENTS:
    // console.log(action)
      return Object.assign({}, state, {
        comments: action.comments
      })
    case GET_CURRENT_POST:
    // console.log(action)
      return Object.assign({}, state, {
        currentPost: action.currentPost
      })
    // case ADD_TODO:
    //   return Object.assign({}, state, {
    //     todos: [
    //       ...state.todos,
    //       {
    //         text: action.text,
    //         completed: false
    //       }
    //     ]
    //   })
    default:
      return state
  }
}

export default myReducer;