import { getCategories, getPosts } from "../utils/ReadAPI";

//  action types
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const GET_ALL_CATEGORIES_W_POSTS = 'GET_ALL_CATEGORIES_W_POSTS'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
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

export const getAllCategoriesWPosts = categoriesWP => ({
    type: GET_ALL_CATEGORIES_W_POSTS,
    categoriesWP
  })

export const getAllPosts = posts => ({
    type: GET_ALL_POSTS,
    posts
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
          let categoriesWP = categories.map(cat=>Object.assign({}, cat, {count: 0}));
          // count how many CAT regarding each POST
          posts.forEach(p=>categoriesWP.filter(cat=>cat.name===p.category).map(e=>e.count++));
          // dispatch the new categories Array
          return dispatch(getAllCategoriesWPosts(categoriesWP))
        })
    )
}

export const fetchAllPosts = () => dispatch => {
  getPosts()
    .then(posts => dispatch(getAllPosts(posts)))
}