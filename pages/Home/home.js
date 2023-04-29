import { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { Ionicons, FontAwesome5, Octicons } from '@expo/vector-icons';
import styles from "./styles";
import colors from "../../variables";
import { AsyncStorageService } from "../../storage/asyncStorageService";
import { useUser } from "../../storage/userContext";

export default function Home({navigation}){
    const {nome, setNome} = useUser();
    const [semanal, setSemanal] = useState(-10.00);
    const [mensal, setMensal] = useState(0.00);
    
    //teste
    const storageService = AsyncStorageService();
    const removeNome = async () =>{
        await storageService.removerNomeFantasia();
        setNome(null);
    }

    const irParaAlterarNome = () => {
        navigation.navigate('AlterarNome');
    };

    const irParaAdicionarCompra = () => {
        navigation.navigate("AdicionarCompra");
    };

    const irParaMeusProdutos = () => {
        navigation.navigate("MeusProdutos");
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerBemVindo}>
                <Text style={styles.textoBemVindo}>Bem vindo(a), {nome}</Text>
                <Ionicons onPress={() => irParaAlterarNome()} name="settings-outline" size={24} color="#fff" />
            </View>

            <View style={styles.containerLucro}>
                <Text style={{fontSize: 18}}>Seu lucro semanal é de:</Text>
                <Text style={{
                    fontSize: 25, 
                    color: 
                        semanal > 0 ? colors.green : 
                        semanal < 0 ? colors.red : colors.black
                    }}>R$ {semanal}</Text>
                <Text>Seu lucro mensal é de R$ {mensal}</Text>
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

                <View
                    onPress={() => {}}
                    style={styles.botao}
                >
                    <FontAwesome5 name="hand-holding-usd" style={styles.iconeBotao} />
                    <Text>Adicionar venda</Text>
                </View>
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

                {/*botão apenas para testes*/}
                <Button onPress={removeNome} title="remover nome" />
        </View>
    );
}
  