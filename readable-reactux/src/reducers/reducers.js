import {
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_W_POSTS,
  GET_ALL_POSTS,
  GET_COMMENTS,
  GET_CURRENT_POST,
  POST_NEW_COMMENT,
  PUT_UPDATE_COMMENT,
  DEL_COMMENT,
  VOTE_COMMENT,
  VOTE_POST,
  POST_NEW_POST,
  PUT_POST,
  DELETE_POST
} from '../actions/actions'

const initialState = {
  allCategories: [],
  allCategoriesWP: [],
  allPosts: [],
  allVotes: []
}

function myReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_POST:
      const id_del = action.oldPost.id
      return Object.assign({}, state, {
        allPosts: state.allPosts
        .filter(p =>!(p.id === id_del)),
        currentPost: {},
      })
    case PUT_POST:
      const id_put = action.newPost.id
      return Object.assign({}, state, {
        allPosts: state.allPosts
        .filter(p =>!(p.id === id_put))
        .concat(action.newPost),
        currentPost: action.newPost
      })
    case POST_NEW_POST:
      return Object.assign({}, state, {
        allPosts: state.allPosts.concat(action.newPost)
      })
    case POST_NEW_COMMENT:
      return state
    case PUT_UPDATE_COMMENT:
      return state
    case DEL_COMMENT:
      return state
    case VOTE_POST:
      const id = action.post.id
      const oldPost = state.allPosts.filter(p=>(p.id === id))[0]
      return Object.assign({}, state, {
        allPosts: state.allPosts
          .filter(p =>!(p.id === id))
          .concat(Object.assign({}, oldPost, {voteScore: action.post.voteScore})),
        currentPost: Object.assign({}, action.post, {voteScore: action.post.voteScore})
      })
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