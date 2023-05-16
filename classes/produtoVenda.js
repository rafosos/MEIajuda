export default class ProdutoVenda{
    constructor(id, nome, preco, descricao, quantidade){
        this.id = id;
        this.nome = nome;
        this.precoProduto = preco / 100;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.calcularPrecoFinal();
    }

    adicionarUm(){
        this.quantidade++;
        this.calcularPrecoFinal();
    }

    tirarUm(){
        this.quantidade--;
        this.calcularPrecoFinal();
    }

    calcularPrecoFinal(){
        this.precoFinal = this.precoProduto * this.quantidade;
        return this.precoFinal;
    }
}