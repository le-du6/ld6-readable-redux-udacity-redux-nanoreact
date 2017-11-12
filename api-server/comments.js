const clone = require('clone')

let db = {}

const defaultData = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a famous 💋 COMMENT.',
    author: 'NeverThing',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: '🍺 Give me this Fucking Beer Please',
    author: 'Ratacol',
    voteScore: 4,
    deleted: false,
    parentDeleted: false
  },
  "qkdjsqjkhdjsqhdkjqhdhsqjkdh": {
    id: 'qkdjsqjkhdjsqhdkjqhdhsqjkdh',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'A - No Comment ',
    author: 'Allo',
    voteScore: -2,
    deleted: false,
    parentDeleted: false
  },
  "qopidqsdisoqi": {
    id: 'qopidqsdisoqi',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'B - No Comment',
    author: 'Allo',
    voteScore: 3,
    deleted: false,
    parentDeleted: false
  },
  "ckdhjsckjds": {
    id: 'ckdhjsckjds',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'C - No Comment',
    author: 'Allo',
    voteScore: -2,
    deleted: false,
    parentDeleted: false
  },
  "kjchsdkjchkdjs": {
    id: 'kjchsdkjchkdjs',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1469479767190,
    body: 'I do not play Comment when 🌭',
    author: 'Understood 💋',
    voteScore: 15,
    deleted: false,
    parentDeleted: false
  },
  "ciucqcaaa": {
    id: 'ciucqcaaa',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1469479767190,
    body: 'This is so TRUE dude 🍒',
    author: 'DudyMan🍷',
    voteScore: 22,
    deleted: false,
    parentDeleted: false
  },
  "8768TG8G": {
    id: '8768TG8G',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1469479767190,
    body: 'Play Now 🍔',
    author: 'Thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  },
  "ckhqdsiuch": {
    id: 'ckhqdsiuch',
    parentId: "bofx3tmar83",
    timestamp: 1469479767190,
    body: '🍔💋🍷🍒 + 🍔💋🍷🍒 + 🍔💋🍷🍒',
    author: 'Geaorges of the Jungle 🍒',
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  },
  "cvbncw": {
    id: 'cvbncw',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: `[readable-reactux] npm list reactstrap                                                                               9:37:53  ☁  master ☂ ⚡ ✭
    readable-reactux@0.1.0 /Users/.../redux-udacity/readable-reactux
    └── reactstrap@5.0.0-alpha.3`,
    author: 'Rooty',
    voteScore: 10,
    deleted: false,
    parentDeleted: false
  },
  "dpoisq": {
    id: 'dpoisq',
    parentId: "v6gkpatseu",
    timestamp: 1469479767190,
    body: '1 - Comment Here',
    author: 'Zero',
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  },
  "sdlsqkj": {
    id: 'sdlsqkj',
    parentId: "v6gkpatseu",
    timestamp: 1469479767190,
    body: 'JY BGFD JJJKS LKJSI KHSBSKJ KJHSKJSHKJ SHJKJSHJKSHK KSHSJKS SKHSJKHSKJ SKJHSSHKJ LKSLKS?JS LKSJSLKjlsj SLKJSLKS Sljfebds,fdns kfndskjf ksdhjfksdjf lkshjflkdsfljkn lqfjdlskjflkd ljfldksjflkdsjf',
    author: 's;:df,dslkfdslkfjkljdflkds',
    voteScore: 100,
    deleted: false,
    parentDeleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent (token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(
      comments[id].deleted || comments[id].parentDeleted
        ? {}
        : comments[id]
      )
  })
}

function add (token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    res(comments[comment.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    switch(option) {
        case "upVote":
            comment.voteScore = comment.voteScore + 1
            break
        case "downVote":
            comment.voteScore = comment.voteScore - 1
            break
        default:
            console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent (token, post) {
    return new Promise((res) => {
        let comments = getData(token)
        keys = Object.keys(comments)
        filtered_keys = keys.filter(key => comments[key].parentId === post.id)
        filtered_keys.forEach(key => comments[key].parentDeleted = true)
        res(post)
    })
}

function disable (token, id) {
    return new Promise((res) => {
      let comments = getData(token)
      comments[id].deleted = true
      res(comments[id])
    })
}

function edit (token, id, comment) {
    return new Promise((res) => {
        let comments = getData(token)
        for (prop in comment) {
            comments[id][prop] = comment[prop]
        }
        res(comments[id])
    })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}
