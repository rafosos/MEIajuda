import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, TouchableOpacity, RefreshControl, Text, TextInput, View } from "react-native";
import { MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigationState } from "@react-navigation/native";
import s from "./styles";
import ProdutoService from "../../services/produtoService";
import { colors, formataReal } from "../../variables";

export default function MeusProdutos({navigation}){
    const [produtos, setProdutos] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [termo, setTermo] = useState("");
    const [loading, setLoading] = useState(false);
    const produtoService = ProdutoService();

    const routeIndex = useNavigationState(state => state.index);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          get();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(()=> {
        get();
    }, [termo])

    const onRefresh = () => {
        setRefreshing(true);
        get();
    }

    const get = () => {
        setLoading(true);
        
        produtoService.get(termo, []).then(res => {
            setProdutos(res);
        }).catch(err => {
            Alert.alert("Erro", "Ocorreu um erro ao buscar os produtos");
            console.log(err);
        }).finally(() => {
            setRefreshing(false);
            setLoading(false);
        });
    }

    const adicionarProduto = () => navigation.navigate("AdicionarProduto");
    const editarProduto = (produto) => navigation.navigate("AdicionarProduto", {produto});

    return (
        <View style={s.scrollview}>
            <View style={s.cabecalho}>
                <View style={s.containerTitle}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {routeIndex ? <Ionicons name="arrow-back" style={s.iconeVoltar} onPress={() => navigation.pop()}/> : null}
                        <Text style={s.title}>Meus produtos</Text>
                    </View>
                    <MaterialIcons name="add-box" style={s.iconeAdd} onPress={adicionarProduto} />
                </View>
           </View>

           <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}

                ListHeaderComponent={ 
                    <View style={s.textInputContainer}>
                        <Entypo name="magnifying-glass" style={s.iconLupa} />
                        <TextInput
                            value={termo}
                            onChangeText={(value) => setTermo(value)}
                            placeholder="Pesquisar produto"
                            style={s.textInput}
                        />
                    </View>
                }

                renderItem={({item}) =>
                    <TouchableOpacity style={s.produto} onPress={() => editarProduto(item)}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={s.nomeProduto}>{item.nome}</Text>
                            <Text style={s.precoProduto}>{formataReal(item.preco)}</Text>
                        </View>
                        {item.descricao ? <Text style={s.descricaoProduto}>{item.descricao}</Text> : null}
                    </TouchableOpacity>
                }

                ListEmptyComponent={!loading?
                    <TouchableOpacity style={s.containerSemProduto} onPress={adicionarProduto} >
                        <Text style={s.txtSemProdutos}>Não foram encontrados produtos...{"\n"}Adicione um produto novo clicando aqui</Text>
                        <MaterialIcons name="add-box" style={[s.iconeAdd, s.iconeSemProdutos]}/>
                    </TouchableOpacity>
                :null}

                ListFooterComponent={
                    loading ? <ActivityIndicator size={"large"} color={colors.white}/> : null
                }
           />
        </View>
    );
}