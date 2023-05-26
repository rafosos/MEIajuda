import Lucro from "../classes/lucro";
import DatabaseService from "../database/databaseService";

export default function LucroService(){
    const db = DatabaseService();

    const getTotal = async () => {
        const sql = `SELECT CASE WHEN sum(valor) is null THEN 0 ELSE sum(valor) end - (SELECT sum(valor) FROM compras) AS lucro FROM vendas`;
        const data = await db.getCustom(sql);
        console.log(data);
        return data;
    }

    const getDatas = async (inicio, fim) => {
        let wheres = "WHERE data " 
        
        if(inicio && fim)
            wheres += `BETWEEN ${inicio} AND ${fim}`;
        else if(inicio)
            wheres += `>= ${inicio}`;
        else if(fim)
            wheres += `<= ${fim}`;
        else {
            return getTotal();
        }

        let sql = `SELECT CASE WHEN sum(valor) is null THEN 0 ELSE sum(valor) end - (SELECT sum(valor) FROM compras ${wheres}) AS lucro FROM vendas ${wheres} `;

        const data = await db.getCustom(sql);
        console.log(data)
        return data;
    }

    const getTudoPorMes = async () => {
        return mapearLucros(await db.getCustom(`SELECT 
        (CASE WHEN sum(vendas.valor) IS null then 0 ELSE sum(vendas.valor) END - 
         CASE WHEN sum(compras.valor) IS null THEN 0 ELSE sum(compras.valor) END) as lucro,
         meses.mes AS mes
       FROM (SELECT strftime('%m/%Y', datetime(vendas.data, 'unixepoch')) AS mes FROM vendas UNION SELECT strftime('%m/%Y', datetime(compras.data, 'unixepoch')) FROM compras) AS meses
       LEFT JOIN vendas on strftime('%m/%Y', datetime(vendas.data, 'unixepoch')) = mes
       LEFT JOIN compras on strftime('%m/%Y', datetime(compras.data, 'unixepoch')) = mes
       GROUP BY mes;`));
    }

    const mapearLucros = (lucros) =>
        lucros.map(lucro => new Lucro(lucro.lucro, lucro.mes));

    return {getTotal, getDatas, getTudoPorMes}
}