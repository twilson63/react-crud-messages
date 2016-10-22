const PouchDB = require('pouchdb')
const { pluck } = require('ramda')

module.exports = function () {
  const db = PouchDB('https://secure-pouchcloud-jgdkeovacz.now.sh/messages')
  //const db = PouchDB('http://localhost:4000/messages')

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
