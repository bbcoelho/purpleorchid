const Count = require('../models/counts')

module.exports = app => {
    app.get('/inventory', (req, res) => {
        Count.list(res)
    })

    app.get('/inventory/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Count.searchId(id, res)
    })

    app.post('/inventory', (req, res) => {
        const count = req.body

        Count.create(count, res)
    })

    app.patch('/inventory/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        Count.changecount(id, values, res)

    })

    app.delete('/inventory/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Count.deletecount(id, res)
    })
}