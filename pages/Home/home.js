import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View, FlatList, ToastAndroid } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { Ionicons, FontAwesome5, Octicons } from '@expo/vector-icons';
import s from "./styles";
import colors from "../../variables";
import { useUser } from "../../storage/userContext";
import LucroService from "../../services/lucroService";
import ProdutoService from "../../services/produtoService";
import VendaService from "../../services/vendaService";
import ProdutoVenda from "../../classes/produtoVenda";
import ModalVendaRapida from "../../components/modalVendaRapida";

export default function Home({navigation}){
    const {nome} = useUser();
    const [total, setTotal] = useState(0);
    const [mensal, setMensal] = useState(0.00);
    const [produtos, setProdutos] = useState([]);
    const [valor, setValor] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [modalVendaRapida, setModalVendaRapida] = useState(false);
    
    const lucroService = LucroService();
    const produtoService = ProdutoService();
    const vendaService = VendaService();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTotal();
            getMensal();
            produtosCompraRapida();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        calcularValor();
    }, [produtos]);

    const produtosCompraRapida = () => {
        produtoService.getMaisVendidos(3).then(res => {
            setProdutos(res);
        }).catch(err => {
            Alert.alert("Erro", "Ocorreu um erro ao buscar os produtos para venda rápida.");
        });
    }

    const getTotal = () => {
        lucroService.getTotal().then(res => {
            setTotal(res[0].lucro / 100);
        }).catch(err => {
            Alert.alert("Erro", "Não foi possível retornar o lucro total devido a um erro.");
            console.log(err)
        });
    }

    const getMensal = () => {
        const inicio = new Date();
        inicio.setDate(1);
        const fim = new Date();
        lucroService.getDatas(inicio.getTime()/1000, fim.getTime()/1000).then(res => {
            setMensal(res[0].lucro/100);
        }).catch(err => {
            Alert.alert("Erro", "Não foi possivel retornar o lucro mensal devido a um erro.");
            console.log(err);
        })
    }

    const maisUm = (id) => {
        let listaNova = copiaArrayProdutos();
        listaNova.find((produto) => produto.id == id).adicionarUm();
        setProdutos(listaNova);
    }

    const menosUm = (id) => {
        let listaNova = copiaArrayProdutos();
        const i = listaNova.findIndex((produto) => produto.id == id);
        listaNova[i].tirarUm();
        setProdutos(listaNova);
    }

    const calcularValor = () => {
        let valorProd = 0;
        produtos.map((produto) => valorProd += produto.calcularPrecoFinal());
        setValor(valorProd);
    }

    const mudarValor = (valorNovo) => {
        setDesconto(valor - valorNovo);
        setValor(valorNovo);
    }

    const salvarVenda = (dataVenda, valorVenda, descontoVenda, produtosVenda) => {
        vendaService.add(dataVenda, valorVenda, descontoVenda, null, produtosVenda).then(res => {
            limparVenda();
            setModalVendaRapida(false);
            ToastAndroid.show("Venda adicionada com sucesso!", ToastAndroid.SHORT);
        }).catch(err => {
            Alert.alert("Erro", "Não foi possível salvar a venda devido a um erro.");
            console.log(err)
        });
    }

    const limparVenda = () => {
        setDesconto(0);
        setValor(0);
        produtosCompraRapida();
    }

    const copiaArrayProdutos = () => 
        JSON.parse(JSON.stringify(produtos)).map(item => new ProdutoVenda(item.id, item.nome, item.precoProduto*100, item.descricao, item.quantidade));

    const irParaAlterarNome     = () => navigation.navigate('AlterarNome');
    const irParaAdicionarCompra = () => navigation.navigate("AdicionarCompra");
    const irParaMeusProdutos    = () => navigation.navigate("MeusProdutos");
    const irParaAdicionarVenda  = () => navigation.navigate("AdicionarVenda");

    const formataNumero = (num) => num.toLocaleString("pt-BR", {maximumFractionDigits:2});

    return (
        <View style={s.container}>
            <View style={s.headerBemVindo}>
                <Text style={s.textoBemVindo}>Bem vindo(a), {nome}</Text>
                <Ionicons onPress={() => irParaAlterarNome()} name="settings-outline" size={24} color="#fff" />
            </View>

            <View style={s.containerLucro}>
                <Text style={{fontSize: 18}}>Seu lucro total é de:</Text>
                <Text style={{
                    fontSize: 25,
                    color: 
                        total > 0 ? colors.green : 
                        total < 0 ? colors.red : colors.black
                    }}>R$ {formataNumero(total)}</Text>
                <Text>Seu lucro mensal é de R$ {formataNumero(mensal)}</Text>
            </View>

            <View style={{marginVertical: 40}}>
                <Text style={s.textoVendaRapida}>Venda rápida</Text>
                <FlatList
                    horizontal
                    data={produtos}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) =>
                        <View style={s.itemProduto}>
                            <View>
                                <Text style={s.nomeProd}>{item.nome}</Text>
                                <Text><Text style={s.bold}>Un.:</Text> R$: {formataNumero(item.precoProduto)}</Text>
                                <Text><Text style={s.bold}>Total:</Text> R$ {formataNumero(item.precoFinal)}</Text>
                            </View>

                            <View style={s.quantidade}>
                                <Text onPress={() => menosUm(item.id)} style={s.maisMenos}>-</Text>

                                <Text>{item.quantidade}</Text>
                            
                                <Text onPress={() => maisUm(item.id)} style={s.maisMenos}>+</Text>
                            </View>
                        </View>
                    }
                />
                <View style={s.containerValorSalvar}>
                    <CurrencyInput
                        prefix="R$"
                        separator=","
                        delimter="."
                        precision={2}
                        minValue={0}
                        value={valor}
                        keyboardType="numeric"
                        style={s.campoValor}
                        onChangeValue={(value) => mudarValor(value)}
                        />
                    <Pressable style={s.botaoSalvar} onPress={() => setModalVendaRapida(true)}>
                        <Text style={s.txtBotaoSalvar}>SALVAR</Text>
                    </Pressable>
                </View>
            </View>

            <View style={s.linhaBotao}>
                <Pressable
                    onPress={() => irParaMeusProdutos()}
                    style={s.botao}
                >
                    <Ionicons name="menu-outline" style={s.iconeBotao} />
                    <Text>Meus produtos</Text>
                </Pressable>

                <Pressable
                    onPress={() => irParaAdicionarVenda()}
                    style={s.botao}
                >
                    <FontAwesome5 name="hand-holding-usd" style={s.iconeBotao} />
                    <Text>Adicionar venda</Text>
                </Pressable>
            </View>

            <View style={s.linhaBotao}>
                <Pressable
                    onPress={() => irParaAdicionarCompra()}
                    style={s.botao}
                >
                    <FontAwesome5 name="shopping-cart" style={s.iconeBotao} />
                    <Text>Adicionar compra</Text>
                </Pressable>

                <View
                    onPress={() => {}}
                    style={s.botao}
                >
                    <Octicons name="graph" style={s.iconeBotao} />
                    <Text>Histórico de lucros</Text>
                </View>
            </View>

            <ModalVendaRapida 
                modalVisivel={modalVendaRapida}
                setModalVisivel={setModalVendaRapida}
                onPressConfirmar={salvarVenda}
                maisUm={maisUm}
                menosUm={menosUm}
                produtos={produtos.filter((produto) => produto.quantidade > 0)}
                valor={valor}
                desconto={desconto}
            />
        </View>
    );
}
  