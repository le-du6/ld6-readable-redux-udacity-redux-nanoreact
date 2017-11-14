// Readable fetchs API
console.log("Readable from fetchs API")
const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage['readable-token']
if (!token)
  token = localStorage['readable-token'] = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
fetch(`${api}/categories/`, { headers })
  .then(res => res.json())
  .then(data => data.categories)

export const getPosts = () =>
fetch(`${api}/posts/`, { headers })
  .then(res => res.json())
  .then(data => data)

export const getPostsId = (postId) =>
fetch(`${api}/posts/${postId}`, { headers })
  .then(res => res.json())
  .then(data => data)

export const getComments = (postId) =>
fetch(`${api}/posts/${postId}/comments`, { headers })
  .then(res => res.json())
  .then(data => data)

export const postComment = (newComment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newComment)
  }).then(res => res.json())
    .then(data => data)

export const voteComment = (commentId, vote) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vote)
  }).then(res => res.json())
    .then(data => data)


export const putComment = (commentId, updateComment) =>
fetch(`${api}/comments/${commentId}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updateComment)
}).then(res => res.json())
  .then(data => data)

export const delComment = (commentId) =>
fetch(`${api}/comments/${commentId}`, {
  method: 'DELETE',
  headers: {
    ...headers,
  }
}).then(res => res.json())
  .then(data => data)

// export const get = (bookId) =>
//   fetch(`${api}/books/${bookId}`, { headers })
//     .then(res => res.json())
//     .then(data => data.book)

// export const getAll = () =>
//   fetch(`${api}/books`, { headers })
//     .then(res => res.json())
//     .then(data => data.books)

// export const update = (bookId, shelf) =>
//   fetch(`${api}/books/${bookId}`, {
//     method: 'PUT',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ shelf })
//   }).then(res => res.json())


