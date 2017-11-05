import {
  GET_ALL_CATEGORIES
} from '../actions'

const initialState = {
  allCategories: []
}

function myReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return Object.assign({}, state, {
        allCategories: action.categories
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