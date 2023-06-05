import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, ScrollView, Text, ToastAndroid, View, TextInput } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import CurrencyInput from "react-native-currency-input";
import { FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import s from "./styles";
import ProdutoService from "../../services/produtoService";
import {colors, formataNumero, formataReal} from "../../variables";
import ModalSimples from "../../components/modalSimples";
import VendaService from "../../services/vendaService";
import ProdutoVenda from "../../classes/produtoVenda";
import ModalAdicionarProduto from "../../components/modalAdicionarProduto";

const AdicionarVenda = ({route, navigation}) =>{
    const [produtos, setProdutos] = useState([]);
    const [pesquisa, setPesquisa] = useState([]);
    const [data, setData] = useState(new Date());
    const [valorFinal, setValorFinal] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [observacoes, setObservacoes] = useState();
    const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
    const [modalProdutoVisivel, setModalProdutoVisivel] = useState(false);
    const [loadingProduto, setLoadingProduto] = useState(false);
    const id = useRef(route?.params?.id).current;
    const refValorFinal = useRef();
    const refObservacoes = useRef();
    const produtoService = ProdutoService();
    const vendaService = VendaService();

    useEffect(() => {
        if(id){
            navigation.setOptions({title: "Editar venda"});
            getById();
        }
    },[])

    useEffect(() => {
        calcularValor();
    }, [produtos, desconto])

    useEffect(() => {
        calcularDesconto();
    }, [valorFinal])

    const getById = () => {
        vendaService.getById(id).then(res => {
            console.log(res)
            setProdutos(res.produtos);
            setData(res.data);
            setValorFinal(res.valor);
            setDesconto(res.desconto);
            setObservacoes(res.observacoes);
        })
    }

    const salvar = () => {
        if(id){
            vendaService.updateById(id, data, valorFinal, desconto, observacoes, produtos)
            .then(res => {
                ToastAndroid.show("Venda editada com sucesso!", ToastAndroid.SHORT);
                navigation.pop();
            })
            .catch(err => {
                Alert.alert("Não foi possível editar a venda devido a um erro.");
                console.log(err);
            });
        }else
            vendaService.add(data, valorFinal, desconto, observacoes, produtos)
            .then(res => {
                ToastAndroid.show('Venda adicionada com sucesso!', ToastAndroid.SHORT);
                navigation.pop();
            })
            .catch(err => {
                Alert.alert("Não foi possível adicionar a venda devido a um erro.");
                console.log(err);
            });
    }

    const pesquisarProdutos = (termo = "") => {
        setLoadingProduto(true);
        let ids = [];
        if(produtos.length) produtos.map(produto => ids.push(produto.id));
        produtoService.get(termo, ids).then(res => {
            setPesquisa(res);
        }).catch(err => {
            Alert.alert("Erro", "Erro ao buscar os produtos");
            console.log(err);
        }).finally(() => setLoadingProduto(false));
    }

    const excluir = () => {
        vendaService.deleteById(id)
            .then(res => {
                ToastAndroid.show("Venda excluida com sucesso.", ToastAndroid.SHORT);
                navigation.pop();
            })
            .catch(err => { 
                Alert.alert("Não foi possível excluir a venda devido a um erro.");
                console.log(err);
            });
    }

    const adicionarProduto = (produto) => {
        setModalProdutoVisivel(false);
        let produtosNova = produtos;
        produtosNova.push(new ProdutoVenda(produto.id,produto.nome, produto.preco*100, produto.descricao, 1));
        setProdutos(produtosNova);
        calcularValor();
    }

    const maisUm = (id) => {
        let listaNova = copiaArrayProdutos();
        listaNova.find((produto) => produto.id == id).adicionarUm();
        setProdutos(listaNova);
        calcularValor();
    }

    const menosUm = (id) => {
        let listaNova = copiaArrayProdutos();
        const i = listaNova.findIndex((produto) => produto.id == id);
        listaNova[i].tirarUm();
        if(listaNova[i].quantidade <= 0) listaNova.splice(i,1);
        setProdutos(listaNova);
        calcularValor();
    }

    const copiaArrayProdutos = () => JSON.parse(JSON.stringify(produtos)).map(item => new ProdutoVenda(item.id, item.nome, item.precoProduto*100, item.descricao, item.quantidade));

    const calcularValor = () => {
        let valorProd = 0;
        if(produtos?.length)
            valorProd = produtos.reduce((total, current) => total + current.calcularPrecoFinal(), 0);
        setValorFinal(valorProd - desconto);
    }

    const calcularDesconto = () => {
        let valorProd = 0;
        if(produtos?.length)
            valorProd = produtos.reduce((total, current) => total + current.calcularPrecoFinal(), 0);
        setDesconto(valorProd - valorFinal);
    }

    const abrirModalProduto = () => {
        pesquisarProdutos();
        setModalProdutoVisivel(true);
    }

    const onChangeData = (event, selectedDate) => {
        if(event.type != "set") return;
        let dia = new Date(data);
        dia.setDate(selectedDate.getDate());
        dia.setMonth(selectedDate.getMonth());
        dia.setFullYear(selectedDate.getFullYear());
        setData(dia);
    }

    const onChangeHora = (event, selectedTime) => {
        if(event.type != "set") return;
        let hora = new Date(data);
        hora.setHours(selectedTime.getHours());
        hora.setMinutes(selectedTime.getMinutes());
        setData(hora);
    }

    const abrirData = () => {
        modalDataHora("date", onChangeData);
    }

    const abrirHora = () => {
        modalDataHora("time", onChangeHora);
    }

    const modalDataHora = (modo, onChange, value) =>{
        DateTimePickerAndroid.open({
            value: value ?? new Date(),
            onChange,
            mode: modo,
            is24Hour: true
        });
    }

    return(<ScrollView style={s.tudo}>

        <Text style={s.labels}>Produtos</Text>
        <View style={s.containerProdutos}>
            {produtos?.length? 
                produtos.map(produto => 
                    <View key={produto.id} style={s.itemProduto}>
                        <View style={{flex: 1}}>
                            <Text style={s.nomeProduto}>{produto.nome}</Text>
                            <Text>Un.: {formataReal(produto.precoProduto)}</Text>
                            <Text>Total: {formataReal(produto.precoFinal)}</Text>
                        </View>
                        <View style={s.quantidade}>
                            <Text onPress={() => menosUm(produto.id)} style={s.maisMenos}>-</Text>

                            <Text>{produto.quantidade}</Text>
                        
                            <Text onPress={() => maisUm(produto.id)} style={s.maisMenos}>+</Text>
                        </View>
                    </View>
                )
            :null}

            <View style={s.containerBotaoAdd}>
                <Pressable style={s.botaoAddProduto} onPress={abrirModalProduto}>
                    <MaterialIcons name="add-box" style={s.iconeAdd} />
                    <Text style={s.textBotaoAdd}>Adicionar produto</Text>
                </Pressable>
            </View>
        </View>

        <View style={s.containerDataHora}>
            <View style={s.itemDataHora}>
                <MaterialIcons name="date-range" onPress={abrirData} style={[s.labels, s.icones]} />
                <Pressable onPress={abrirData} style={s.inputDataHora}>
                    <Text style={s.data}>{data.getDate()}/{data.getMonth() + 1}/{data.getFullYear()}</Text>
                </Pressable>
            </View>
    
            <View style={s.itemDataHora}>
                <MaterialIcons name="alarm" onPress={abrirHora} style={[s.labels, s.icones]}/>
                <Pressable onPress={abrirHora} style={s.inputDataHora}>
                    <Text style={s.data}>{formataNumero(data.getHours())}:{formataNumero(data.getMinutes())}</Text>
                </Pressable>
            </View>
        </View>

        <View style={s.containers}>
            <Text style={s.labels}>Desconto</Text>
            <CurrencyInput
                prefix="R$"
                separator=","
                delimter="."
                precision={2}
                minValue={0}
                value={desconto}
                keyboardType="numeric"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => refValorFinal.current.focus()}
                style={s.inputValor}
                onChangeValue={setDesconto}
            />
        </View>

        <View style={s.containers}>
            <Text style={s.labels}>Valor final</Text>
            <CurrencyInput
                prefix="R$"
                separator=","
                delimter="."
                precision={2}
                minValue={0}
                value={valorFinal}
                keyboardType="numeric"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => refObservacoes.current.focus()}
                style={s.inputValor}
                onChangeValue={setValorFinal}
                ref={refValorFinal}
            />
        </View>

        <View style={s.containers}>
            <Text style={s.labels}>Observações</Text>
            <TextInput
                placeholder="Insira aqui as observações da venda..."
                numberOfLines={5}
                multiline={true}
                onChangeText={(value) => {setObservacoes(value)}}
                ref={refObservacoes}
                style={s.inputObservacoes}
                value={observacoes}
            />
        </View>

        <View style={s.botoesContainer}>
            {id?
                <Pressable 
                    style={[s.botoes, s.botaoExcluir]}
                    onPress={() => setModalExcluirVisible(true)}
                >
                    <AntDesign name="delete" size={24} color={colors.white} />
                    <Text style={s.textBotao}>EXCLUIR</Text>
                </Pressable>
            :null}

            <Pressable 
                style={[s.botoes, s.botaoSalvar]}
                onPress={() => salvar()}
            >
                <FontAwesome5 name="save" size={24} color={colors.white} />
                <Text style={s.textBotao}>SALVAR</Text>
            </Pressable>
        </View>

        <ModalSimples 
            modalVisivel={modalExcluirVisible}
            setModalVisivel={setModalExcluirVisible}
            onPressConfirmar={() => excluir()}
        />

        <ModalAdicionarProduto
            modalVisivel={modalProdutoVisivel}
            setModalVisivel={setModalProdutoVisivel}
            resultados={pesquisa}
            pesquisar={pesquisarProdutos}
            loading={loadingProduto}
            produtoEscolhido={adicionarProduto}
        />
    </ScrollView>)
}

export default AdicionarVenda;