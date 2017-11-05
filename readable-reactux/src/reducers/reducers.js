import {
  GET_ALL_CATEGORIES,
  GET_ALL_POSTS
} from '../actions/actions'

const initialState = {
  allCategories: []
}

function myReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return Object.assign({}, state, {
        allCategories: action.categories
      })
    case GET_ALL_POSTS:
    console.log(action)
      return Object.assign({}, state, {
        allPosts: action.posts
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