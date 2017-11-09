import { getCategories, getPosts, getComments, getPostsId } from "../utils/ReadAPI";

//  action types
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const GET_ALL_CATEGORIES_W_POSTS = 'GET_ALL_CATEGORIES_W_POSTS'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_CURRENT_POST = 'GET_CURRENT_POST'
export const PIPO = 'PIPO'

//  action creators
export const pipo = () => ({
    type: PIPO,
    inc: 1
  })

export const getAllCategories = categories => ({
    type: GET_ALL_CATEGORIES,
    categories
  })

export const getCurrentPost = post => ({
    type: GET_ALL_CATEGORIES,
    post
  })

export const getAllCategoriesWPosts = categoriesWP => ({
    type: GET_ALL_CATEGORIES_W_POSTS,
    categoriesWP
  })

export const getAllPosts = posts => ({
    type: GET_ALL_POSTS,
    posts
  })

export const getAllComments = comments => ({
    type: GET_COMMENTS,
    comments
  })

//  action creators with THUNK middlware
export const fetchAllCategories = () => dispatch => {
  getCategories()
    .then(categories => dispatch(getAllCategories(categories)))
}

export const fetchAllCategoriesWPosts = () => dispatch => {
  getCategories()
    .then(categories =>
      getPosts()
        .then(posts => {
          // adding count property to Categories
          let categoriesWP = categories.map(cat=>Object.assign({}, cat, {nbPost: 0}));
          // count how many CAT regarding each POST
          posts.forEach(p=>categoriesWP.filter(cat=>cat.name===p.category).map(e=>e.nbPost++));
          // dispatch the new categories Array
          return dispatch(getAllCategoriesWPosts(categoriesWP))
        })
    )
}

export const fetchComments = (idPost) => dispatch => {
  getComments(idPost)
    .then(comments => dispatch(getAllComments(comments)))
}

export const fetchAllPosts = () => dispatch => {
  getPosts()
    .then(posts => {
      // adding Comments NB count property to posts
      const postsWC = posts.map(post=>Object.assign({}, post, {nbComment: 0}));
      // count number of Comments by PostId
      const requests = postsWC.map(post => {
          return getComments(post.id).then(comments => {
            // console.log(post.nbComment, comments.length)
            post.nbComment = comments.length;
          })
        })
      // dispatch the posts with Comments number Array
      Promise.all(requests).then(() => {
        // console.log('finish');
        return dispatch(getAllPosts(postsWC))
      });

})
}

// dispatch(getAllPosts(postsWC))