const connection = require('../infrastructure/connection')

class Count {
    create(count, res) {
        const inventorydate = new Date()
        const countDate = {...count, inventorydate}
        const sql = 'INSERT INTO Inventory SET ?'

        connection.query(sql, countDate, (error, results) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(201).json(count)
            }
        })
    }

    list(res) {
        const sql = 'SELECT * FROM inventory'

        connection.query(sql, (error, results) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(results)
            }
        })
    }

    searchId(id, res) {
        const sql = `SELECT * FROM inventory WHERE id=${id}`

        connection.query(sql, (error, results) => {
            const count = results[0]
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(count)
            }
        })

    }

    changecount(id, values, res) {
        const sql = 'UPDATE inventory SET ? WHERE id=?'

        connection.query(sql, [values, id], (error, results) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({...values, id})
            }
        })       
    }

    deletecount(id, res) {
        const sql = 'DELETE FROM inventory WHERE id=?'

        connection.query(sql, id, (error, results) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Count