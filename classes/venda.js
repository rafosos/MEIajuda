export default class Venda{
    constructor(id, valor, desconto, observacoes, data){
        this.id = id;
        this.valor = valor / 100;
        this.desconto = desconto;
        this.observacoes = observacoes
        this.data = new Date(data*1000);
        this.produtos = [];
    }

    adicionarProduto(prodVenda){
        this.produtos.push(prodVenda);
    }
}