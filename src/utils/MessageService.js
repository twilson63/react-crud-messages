const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-upsert'))

const { pluck } = require('ramda')

module.exports = function () {
  let _db = null

  return {
    list () {
      return Db().allDocs({descending: true, include_docs: true, limit: 10 })
        .then(res => pluck('doc', res.rows))
        .then(docs => docs.filter(doc => doc._id.indexOf('_design') < 0 ))


    },
    post (msg) {
      return Db().post(msg)
    },
    put (msg) {
      return Db().put(msg)
    },
    remove (msg) {
      return Db().remove(msg)
    },
    get (id) {
      return Db().get(id)
    },
    search (criteria) {
      return initSearchView()
        .then(_ => Db().query('search/title', {
          limit: 10,
          include_docs: true,
          startkey: criteria,
          endkey: criteria + '{}'})
        )
        .then(res => pluck('doc', res.rows))
        .then(docs => docs.filter(doc => doc._id.indexOf('_design') < 0 ))
    }
  }

  function initSearchView () {
    const emit = _ => true
    return Db().putIfNotExists({
      _id: '_design/search',
      language: 'javascript',
      views: {
        'title': {
          map: function (doc) {
            emit(doc.title)
          }.toString()
        }
      }
    })
  }

  function Db() {
    const token = localStorage.getItem('id_token')
    const dbUrl = process.env.NODE_ENV === 'production' ?
      'https://secure-pouchcloud-emzevjwlhd.now.sh/messages' :
      'http://127.0.0.1:4000/messages'

    _db = !_db ? PouchDB(dbUrl, {
      ajax: {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    }) : _db

    return _db
  }

}
