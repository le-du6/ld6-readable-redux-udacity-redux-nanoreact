import { getCategories, getPosts, getComments, getPostsId, postComment, putComment, delComment } from "../utils/ReadAPI";

//  action types
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const GET_ALL_CATEGORIES_W_POSTS = 'GET_ALL_CATEGORIES_W_POSTS'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_CURRENT_POST = 'GET_CURRENT_POST'
export const POST_NEW_COMMENT = 'POST_NEW_COMMENT'
export const PUT_UPDATE_COMMENT = 'PUT_UPDATE_COMMENT'
export const DEL_COMMENT = 'DEL_COMMENT'

//  action creators
export const postNewComment = newComment => ({
    type: POST_NEW_COMMENT,
    newComment
  })
export const putUpdateComment = updateComment => ({
    type: PUT_UPDATE_COMMENT,
    updateComment
  })
export const deleteAComment = delComment => ({
    type: DEL_COMMENT,
    delComment
  })
export const getAllCategories = categories => ({
    type: GET_ALL_CATEGORIES,
    categories
  })
export const getCurrentPost = currentPost => ({
    type: GET_CURRENT_POST,
    currentPost
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
export const ac_postComment = (idPost, comment) => dispatch => {
  postComment(comment)
    .then(newComment => {
      dispatch(postNewComment(newComment))
      getComments(idPost)
        .then(comments => dispatch(getAllComments(comments)))
    })
}
export const ac_updateComment = (idC, comment, idPost) => dispatch => {
  putComment(idC, comment)
    .then(comment => {
      dispatch(putUpdateComment(comment))
      getComments(idPost)
        .then(comments => dispatch(getAllComments(comments)))
    })
}
export const ac_deleteComment = (idC, idPost) => dispatch => {
  delComment(idC)
    .then(idC => {
      dispatch(deleteAComment(idC))
      getComments(idPost)
        .then(comments => dispatch(getAllComments(comments)))
    })
}
export const fetchCurrentPost = (postId) => dispatch => {
  getPostsId(postId)
    .then(post => dispatch(getCurrentPost(post)))
}
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
