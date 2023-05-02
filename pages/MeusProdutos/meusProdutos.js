import { Alert, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import styles from "./styles";
import { useEffect, useState } from "react";
import ProdutoService from "../../services/produtoService";

export default function MeusProdutos({navigation}){
    const [produtos, setProdutos] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const produtoService = ProdutoService();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          get();
        });
        return unsubscribe;
    }, [navigation]);

    const get = () => {
        produtoService.getAll().then(res => {
            setProdutos(res);
        })
        .catch(err => {
            Alert.alert("Ocorreu um erro ao buscar os produtos.");
            console.log(err);
        })
        .finally(() => setRefreshing(false));
    }

    const onRefresh = () => {
        setRefreshing(true);
        get();
    }

    const adicionarProduto = () => navigation.navigate("AdicionarProduto");
    const editarProduto = (produto) => navigation.navigate("AdicionarProduto", {produto});

    return (
        <ScrollView 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        style={styles.scrollview}>
        <View style={{paddingBottom: 10}}>
            <View style={styles.cabecalho}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Meus produtos</Text>
                    <MaterialIcons name="add-box" style={styles.iconeAdd} onPress={adicionarProduto} />
                </View>
           </View>

            {produtos? produtos.map(produto => 
            <Pressable style={styles.produto} key={produto.id} onPress={() => editarProduto(produto)}>
                <Text>Id: {produto.id}</Text>
                <Text>Nome: {produto.nome}</Text>
                <Text>Preço: R${produto.preco}</Text>
                <Text>Descrição: {produto.descricao}</Text>
            </Pressable>
            ): null}   
        </View>
        </ScrollView>
    );
}