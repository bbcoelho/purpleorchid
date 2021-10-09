class Tables {
    init(connection) {
        this.connection = connection
        this.createInventory()
    }

    createInventory() {
        const sql = 'CREATE TABLE IF NOT EXISTS Inventory (id int NOT NULL AUTO_INCREMENT, inventorydate datetime NOT NULL, store varchar(50) NOT NULL, item varchar(50) NOT NULL, iteminventory float, itemcase varchar(20), costpercase float, caseunit varchar(10), qtyperCase float, category varchar(20), supplier varchar(20), toorder float, obs text, PRIMARY KEY(id))'

        this.connection.query(sql, (error) => {
            if(error) {
                console.log(error)
            } else {
                console.log('TABELA INVENTORY CRIADA COM SUCESSO')
            }
        })
    }

}

module.exports = new Tables