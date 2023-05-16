import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { Ionicons, FontAwesome5, Octicons } from '@expo/vector-icons';
import styles from "./styles";
import colors from "../../variables";
import { useUser } from "../../storage/userContext";
import LucroService from "../../services/lucroService";

export default function Home({navigation}){
    const {nome} = useUser();
    const [total, setTotal] = useState(0);
    const [mensal, setMensal] = useState(0.00);
    
    const lucroService = LucroService();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTotal();
            getMensal();
        });
        return unsubscribe;
    }, [navigation]);

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
    
    const irParaAlterarNome     = () => navigation.navigate('AlterarNome');
    const irParaAdicionarCompra = () => navigation.navigate("AdicionarCompra");
    const irParaMeusProdutos    = () => navigation.navigate("MeusProdutos");
    const irParaAdicionarVenda  = () => navigation.navigate("AdicionarVenda");

    const formataNumero = (num) => num.toLocaleString("pt-BR", {maximumFractionDigits:2});

    return (
        <View style={styles.container}>
            <View style={styles.headerBemVindo}>
                <Text style={styles.textoBemVindo}>Bem vindo(a), {nome}</Text>
                <Ionicons onPress={() => irParaAlterarNome()} name="settings-outline" size={24} color="#fff" />
            </View>

            <View style={styles.containerLucro}>
                <Text style={{fontSize: 18}}>Seu lucro total é de:</Text>
                <Text style={{
                    fontSize: 25,
                    color: 
                        total > 0 ? colors.green : 
                        total < 0 ? colors.red : colors.black
                    }}>R$ {formataNumero(total)}</Text>
                <Text>Seu lucro mensal é de R$ {formataNumero(mensal)}</Text>
            </View>

            <View style={{marginVertical: 50}}>
                <View style={{
                    height: 100,
                    backgroundColor: colors.white,
                    borderRadius: 15
                }}>
                </View>
            </View>

            <View style={styles.linhaBotao}>
                <Pressable
                    onPress={() => irParaMeusProdutos()}
                    style={styles.botao}
                >
                    <Ionicons name="menu-outline" style={styles.iconeBotao} />
                    <Text>Meus produtos</Text>
                </Pressable>

                <Pressable
                    onPress={() => irParaAdicionarVenda()}
                    style={styles.botao}
                >
                    <FontAwesome5 name="hand-holding-usd" style={styles.iconeBotao} />
                    <Text>Adicionar venda</Text>
                </Pressable>
            </View>

            <View style={styles.linhaBotao}>
                <Pressable
                    onPress={() => irParaAdicionarCompra()}
                    style={styles.botao}
                >
                    <FontAwesome5 name="shopping-cart" style={styles.iconeBotao} />
                    <Text>Adicionar compra</Text>
                </Pressable>

                <View
                    onPress={() => {}}
                    style={styles.botao}
                >
                    <Octicons name="graph" style={styles.iconeBotao} />
                    <Text>Histórico de lucros</Text>
                </View>
            </View>
        </View>
    );
}
  