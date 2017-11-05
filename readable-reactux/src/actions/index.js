import { getCategories } from "../utils/ReadAPI";

/*
 * action types
 */

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'



/*
 * action creators
 */
export const getAllCategories = categories => ({
    type: GET_ALL_CATEGORIES,
    categories
  })


export const fetchAllCategories = () => dispatch => {
  console.log('fetchAllCategories');
  getCategories()
    .then(categories => dispatch(getAllCategories(categories)))
};