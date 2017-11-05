import { getCategories, getPosts } from "../utils/ReadAPI";

//  action types
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'

//  action creators
export const getAllCategories = categories => ({
    type: GET_ALL_CATEGORIES,
    categories
  })

export const getAllPosts = posts => ({
    type: GET_ALL_POSTS,
    posts
  })

//  action creators with THUNK middlware
export const fetchAllCategories = () => dispatch => {
  getCategories()
    .then(categories => dispatch(getAllCategories(categories)))
};

export const fetchAllPosts = () => dispatch => {
  getPosts()
    .then(posts => dispatch(getAllPosts(posts)))
};