import DatabaseService from "../database/databaseService";
import Compra from "../classes/compra";

export default function CompraService(){
    const db = DatabaseService();

    const add = (valor, descricao = null) => {
        const sql = `INSERT INTO compras (valor${descricao ?? ", descricao"})
        values ((?)${descricao ?? ", (?)"});`;
        return db.addData(sql, descricao ? [valor, descricao] : [valor]);
    }

    const getAll = async () => {
        return mapearCompras(await db.getAll("compras"));
    }

    const getDatas = async (dataInicio, dataFim) => {
        let sql = ` WHERE data `;
        
        if(dataInicio && dataFim)
            sql += `BETWEEN ${dataInicio} AND ${dataFim}`;
        else if(dataInicio)
            sql += `>= ${dataInicio}`;
        else if(dataFim)
            sql += `<= ${dataFim}`;
        else sql = "";

        const data = await db.getAll("compras", sql);
        console.log(data)
        return mapearCompras(data);
    }

    const mapearCompras = (compras) => 
        compras.map(compra => new Compra(compra.id, compra.valor, compra.descricao, compra.data));

    return {add, getAll, getDatas}
}