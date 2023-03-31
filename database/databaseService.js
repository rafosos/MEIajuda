import { DatabaseConnection } from "./databaseConnection";

const db = DatabaseConnection.getConnection();

export default function DatabaseService() {

    const addData = (query, params) => {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(query,
                params, 
                (_, { insertId }) => {
                    console.log("id insert: " + insertId);
                    resolve(insertId)
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

    const deleteById = (table, id) => {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rows }) => {
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            });
    }


    const updateById = (query, param) => {
        return new Promise((resolve, reject) =>db.transaction(tx => {
                tx.executeSql(query, param, () => {
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

    const getById = (table, id) => {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where id=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        }));
    }

    const getAll = (table, where = ";") => {
        return new Promise((resolve, reject) => db.transaction(tx => {
            console.log(`select * from ${table} ${where}`)
            tx.executeSql(`select * from ${table} ${where}`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
                console.log(txError);
        }))
    }

    return{
        addData,
        deleteById,
        updateById,
        getById,
        getAll
    }
}
