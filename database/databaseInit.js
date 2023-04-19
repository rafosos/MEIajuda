import { DatabaseConnection } from "./databaseConnection";

export default function DatabaseInit(){
    var db = null;

    const openAndInitDb = () => {
        db = DatabaseConnection.getConnection();
        db.exec([{
                    sql: 'PRAGMA foreign_keys = ON;',
                    args: []
                }],
                false,
                () => console.log("foreign keys turned on"));
        initDb();
    };

    const initDb = () => {
        // `DROP TABLE IF EXISTS produto_venda;`,
        // `DROP TABLE IF EXISTS produtos;`,
        // `DROP TABLE IF EXISTS vendas;`,
        // `DROP TABLE IF EXISTS compras;`,
        var sql = [

            `CREATE TABLE IF NOT EXISTS vendas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                data DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP)),
                valor INTEGER NOT NULL,
                desconto INTEGER
            );`,
            
            `CREATE TABLE IF NOT EXISTS compras (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                valor INTEGER NOT NULL,
                descricao TEXT,
                data INTEGER DEFAULT (STRFTIME('%s',CURRENT_TIMESTAMP))
            );`,

            `CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT,
                descricao TEXT,
                valor INTEGER
            );`,

            `CREATE TABLE IF NOT EXISTS produto_venda (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                id_venda INTEGER,
                id_produto INTEGER,
                FOREIGN KEY (id_venda) REFERENCES vendas(id),
                FOREIGN KEY (id_produto) REFERENCES produtos(id)
            );`
        ];
        
        db.transaction(
            tx => {
                    for (var i = 0; i < sql.length; i++) {
                        console.log("execute sql : " + sql[i]);
                        tx.executeSql(sql[i]);
                    }
                }
            , (error) => {
                console.log("error callback : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("transaction complete");
            }
        );
    }

    return {openAndInitDb}
}