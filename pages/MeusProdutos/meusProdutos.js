import { Alert, FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import s from "./styles";
import { useEffect, useState } from "react";
import ProdutoService from "../../services/produtoService";
import { formataNumero } from "../../variables";

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
        <View 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            style={s.scrollview}>
            <View style={s.cabecalho}>
                <View style={s.containerTitle}>
                    <Text style={s.title}>Meus produtos</Text>
                    <MaterialIcons name="add-box" style={s.iconeAdd} onPress={adicionarProduto} />
                </View>
           </View>

           <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({item}) =>
                <Pressable style={s.produto} onPress={() => editarProduto(item)}>
                    <Text style={s.nomeProduto}>{item.nome}</Text>
                    <Text style={s.precoProduto}>R${formataNumero(item.preco)}</Text>
                    {item.descricao ? <Text style={s.descricaoProduto}>{item.descricao}</Text> : null}
                </Pressable>
            }
                ListEmptyComponent={() => <Pressable style={s.containerSemProduto} onPress={adicionarProduto} >
                    <Text style={s.txtSemProdutos}>Não foram encontrados produtos...{"\n"}Adicione um produto novo clicando aqui</Text>
                    <MaterialIcons name="add-box" style={[s.iconeAdd, s.iconeSemProdutos]}/>
                </Pressable>}
           />
        </View>
    );
}