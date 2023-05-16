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

    return {getTotal, getDatas}
}