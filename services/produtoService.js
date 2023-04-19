import DatabaseService from "../database/databaseService"

export default function ProdutoService(){
    const db = DatabaseService();

    const add = (nome, descricao, valor) => {
        const sql = `
        INSERT INTO produtos (nome, descricao, valor)
        values ((?), (?), (?));`;
        return db.addData(sql, [nome, descricao, valor]);
    }

    const getAll = () => {
        return db.getAll("produtos");
    }

    return{
        add,
        getAll
    }
}