const jsonUtil = require('./jsonUtil')
const getCandidated = async function () {
  const db = await jsonUtil.jsonReader('./db.json')
  const candidates = []
  for (var candidate of db.candidates) {
    if(!candidate.deleted) {
      candidates.push(candidate)
    }
  }
  return candidates
}

module.exports = {
  devServer: {
    disableHostCheck: true,
    before: function(app, server) {
      var bodyParser = require('body-parser') 
      app.use(bodyParser.json())

      app.get('/api/tags', async function(req, res) {
        const db = await jsonUtil.jsonReader('./db.json')
        res.json({ tags: db.tags })
      })

      app.post('/api/tags', async function(req, res) {
        const { tag } = req.body
        const db = await jsonUtil.jsonReader('./db.json')
        db.tags.push(tag)
        await jsonUtil.jsonWriter('db.json', db)
        res.json({ tags: db.tags })
      })

      app.delete('/api/tags/:tag', async function(req, res) {
        const tag = req.params.tag
        const db = await jsonUtil.jsonReader('./db.json')
        db.tags.splice(db.tags.indexOf(tag), 1)
        await jsonUtil.jsonWriter('db.json', db)
        res.json({ tags: db.tags })
      })

      app.get('/api/candidates', async function(req, res) {
        res.json({ candidates: await getCandidated() })
      })

      app.post('/api/candidates', async function(req, res) {
        const { candidate } = req.body
        const db = await jsonUtil.jsonReader('./db.json')
        db.candidates.push(candidate)
        await jsonUtil.jsonWriter('db.json', db)
        res.json({ candidates: db.candidates })
      })

      app.put('/api/candidates/:candidateId', async function(req, res) {
        const candidateId = req.params.candidateId

        const db = await jsonUtil.jsonReader('./db.json')
        const candidates = db.candidates
        for (candidate of candidates) {
          if(candidate.id === candidateId) {
            candidate.votes++
          }
        }
        await jsonUtil.jsonWriter('db.json', db)
        res.json({ candidates: await getCandidated() })
      })

      app.delete('/api/candidates/:candidateId', async function(req, res) {
        const candidateId = req.params.candidateId

        const db = await jsonUtil.jsonReader('./db.json')
        const candidates = db.candidates
        for (candidate of candidates) {
          if(candidate.id === candidateId) {
            candidate.deleted = true
          }
        }
        await jsonUtil.jsonWriter('db.json', db)
        res.json({ candidates: await getCandidated() })
      })
    }
  }
}