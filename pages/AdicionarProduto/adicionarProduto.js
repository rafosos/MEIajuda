import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, Text, TextInput, ToastAndroid, View } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import styles from "./styles";
import ProdutoService from "../../services/produtoService";
import {colors} from "../../variables";
import ModalSimples from "../../components/modalSimples";

const AdicionarProduto = ({route, navigation}) =>{
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const produto = useRef(route?.params?.produto).current;
    const produtoService = ProdutoService();

    useEffect(() => {
        if(produto){
            navigation.setOptions({title: "Editar produto"});
            setNome(produto.nome);
            setDescricao(produto.descricao);
            setPreco(produto.preco);
        }
    },[])

    const salvar = () => {
        if(produto){
            produtoService.updateById(produto.id, nome, preco, descricao)
            .then(res => {
                ToastAndroid.show("Produto editado com sucesso!", ToastAndroid.SHORT);
                navigation.pop();
            })
            .catch(err => {
                Alert.alert("Não foi possível editar o produto devido a um erro.");
                console.log(err);
            });
        }else
            produtoService.add(nome, preco, descricao)
            .then(res => {
                ToastAndroid.show('Produto adicionado com sucesso!', ToastAndroid.SHORT);
                navigation.pop();
            })
            .catch(err => {
                Alert.alert("Não foi possível adicionar o produto devido a um erro.");
                console.log(err);
            });
    }

    const excluir = () => {
        produtoService.deleteById(produto.id)
            .then(res => {
                ToastAndroid.show("Produto excluido com sucesso.", ToastAndroid.SHORT);
                navigation.pop();
            })
            .catch(err => {
                Alert.alert("Não foi possível excluir o produto devido a um erro.");
                console.log(err);
            });
    }

    return(<View style={styles.tudo}>
        <View style={styles.containers}>
            <Text style={styles.labels}>Nome*</Text>
            <TextInput
                value={nome}
                placeholder="EX.: Milkshake simples..."
                numberOfLines={1}
                multiline={false}
                onChangeText={(value) => setNome(value)}
                style={styles.inputNome}
            />
        </View>

        <View style={styles.containers}>
            <Text style={styles.labels}>Valor do produto*</Text>
            <CurrencyInput
                prefix="R$"
                separator=","
                delimter="."
                precision={2}
                minValue={0}
                value={preco}
                keyboardType="numeric"
                style={styles.inputValor}
                onChangeValue={setPreco}
            />
        </View>

        <View style={styles.containers}>
            <Text style={styles.labels}>Descrição</Text>
            <TextInput
                placeholder="Milkshake com duas colheres de sorvete..."
                numberOfLines={5}
                multiline={true}
                onChangeText={(value) => {setDescricao(value)}}
                style={styles.inputObservacoes}
                value={descricao}
            />
        </View>

        <View style={styles.botoesContainer}>
            {produto?
                <Pressable 
                    style={[styles.botoes, styles.botaoExcluir]}
                    onPress={() => setModalVisible(true)}
                >
                    <AntDesign name="delete" size={24} color={colors.white} />
                    <Text style={styles.textBotao}>EXCLUIR</Text>
                </Pressable>
            :null}

            <Pressable 
                style={[styles.botoes, styles.botaoSalvar]}
                onPress={() => salvar()}
            >
                <FontAwesome5 name="save" size={24} color={colors.white} />
                <Text style={styles.textBotao}>SALVAR</Text>
            </Pressable>
        </View>

        <ModalSimples 
            modalVisivel={modalVisible}
            setModalVisivel={setModalVisible}
            onPressConfirmar={() => excluir()}
        />
    </View>)
}

export default AdicionarProduto;