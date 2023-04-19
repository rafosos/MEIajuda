export default class Compra{
    constructor(id, valor, descricao, data){
        this.id = id;
        this.valor = valor;
        this.descricao = descricao;
        this.data = new Date(data*1000);
    }
}