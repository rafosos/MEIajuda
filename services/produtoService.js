import DatabaseService from "../database/databaseService";
import Produto from '../classes/produto';
import ProdutoVenda from "../classes/produtoVenda";

export default function ProdutoService(){
    const db = DatabaseService();

    const add = (nome, valor, descricao = null) => {
        const sql = `INSERT INTO produtos (nome, valor${descricao? ", descricao" : ""})
        values ((?), (?)${descricao? ", (?)" : ""});`;

        let values = [nome, (valor*100)];
        if(descricao) values.push(descricao);
        
        return db.addData(sql, values);
    }

    const updateById = (id, nome, valor, descricao = null) => {
        let values = [nome, (valor*100)];
        let columns = ["nome", "valor"];
        if(descricao) {
            values.push(descricao);
            columns.push("descricao");
        }

        return db.updateById("produtos", id, columns, values);
    }

    const getAll = async () => {
        return mapearProdutos(await db.getAll("produtos"));
    }

    const get = async (termo, escolhidos) => {
        return mapearProdutos(await db.getAll("produtos", 
            `WHERE id NOT IN (${escolhidos}) AND
                (nome LIKE '%${termo}%' OR 
                descricao LIKE '%${termo}%');`));
    }

    const getMaisVendidos = async (quantidade) => {
        const sql = `SELECT * FROM produtos 
        WHERE id IN (SELECT id_produto
            FROM produto_venda 
            GROUP BY id_produto 
            ORDER BY COUNT(id_produto) DESC
            LIMIT ${quantidade});`;
        return mapearProdutoVenda(await db.getCustom(sql));
    }

    const deleteById = (id) => db.deleteById("produtos", id);

    const mapearProdutos = (produtos) => 
        produtos.map(produto => new Produto(produto.id, produto.nome, produto.valor, produto.descricao));


    const mapearProdutoVenda = (produtos) =>
        produtos.map(produto => new ProdutoVenda(produto.id, produto.nome, produto.valor, produto.descricao, produto.quantidade));
    
    return{
        add,
        get,
        getAll,
        getMaisVendidos,
        updateById,
        deleteById
    }
}