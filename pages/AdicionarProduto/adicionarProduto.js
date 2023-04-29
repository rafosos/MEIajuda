import { useState } from "react";
import { Alert, Pressable, Text, TextInput, ToastAndroid, View } from "react-native";
import CurrencyInput from "react-native-currency-input";
import styles from "./styles";
import ProdutoService from "../../services/produtoService";

const AdicionarProduto = ({navigation}) =>{
    const [nome, setNome] = useState(new Date());
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState(0);
    const produtoService = ProdutoService();

    const salvar = () => {
        produtoService.add(nome, descricao, preco)
            .then(res => {
                ToastAndroid.show('Produto adicionado com sucesso!', ToastAndroid.SHORT);
                navigation.pop();
            })
            .catch(err => {
                Alert.alert("Não foi possível adicionar o produto devido a um erro.");
                console.log(err);
            });
    }

    return(<View style={styles.tudo}>
        <View style={styles.containers}>
            <Text style={styles.labels}>Nome*</Text>
            <TextInput
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
            />
        </View>

        <Pressable 
            style={styles.botaoSalvar}
            onPress={() => salvar()}
        >
            <Text style={styles.textSalvar}>SALVAR</Text>
        </Pressable>

    </View>)
}

export default AdicionarProduto;