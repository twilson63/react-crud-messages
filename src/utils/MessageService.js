const PouchDB = require('pouchdb')
const { pluck } = require('ramda')

module.exports = function () {
  const token = localStorage.getItem('id_token')
  const db = PouchDB('https://secure-pouchcloud-emzevjwlhd.now.sh/messages', {
  //const db = PouchDB('http://localhost:4000/messages', {
    ajax: {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  })

  return {
    list () {
      return db.allDocs({include_docs: true})
        .then(res => pluck('doc', res.rows))

    },
    post (msg) {
      return db.post(msg)
    },
    put (msg) {
      return db.put(msg)
    },
    remove (msg) {
      return db.remove(msg)
    },
    get (id) {
      return db.get(id)
    }

  }
}
