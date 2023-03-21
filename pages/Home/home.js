import { useState } from "react";
import { Button, Text, View } from "react-native";
import { Ionicons, FontAwesome5, Octicons } from '@expo/vector-icons';
import styles from "./styles";
import colors from "../../variables";

export default function Home({navigation}){
    const [nome, setNome] = useState("Ohata");
    const [semanal, setSemanal] = useState(-10.00);
    const [mensal, setMensal] = useState(0.00);

    return (
        <View style={styles.container}>
            <View style={styles.headerBemVindo}>
                <Text style={styles.textoBemVindo}>Bem vindo(a), {nome}</Text>
                <Ionicons onPress={() => {}} name="settings-outline" size={24} color="#fff" />
            </View>

            <View style={styles.containerLucro}>
                <Text style={{fontSize: 18}}>Seu lucro semanal é de:</Text>
                <Text style={{
                    fontSize: 25, 
                    color: 
                        semanal > 0 ? colors.green : 
                        semanal < 0 ? colors.red : "#000"
                    }}>R$ {semanal}</Text>
                <Text>Seu lucro mensal é de R$ {mensal}</Text>
            </View>

            <View style={{marginVertical: 50}}>
                <View style={{
                    height: 100,
                    backgroundColor: colors.grey,
                    borderRadius: 15
                }}>
                </View>
            </View>

            <View style={styles.linhaBotao}>
                <View
                    onPress={() => {}}
                    style={styles.botao}
                >
                    <Ionicons name="menu-outline" style={styles.iconeBotao} />
                    <Text>Meu cardápio</Text>
                </View>

                <View
                    onPress={() => {}}
                    style={styles.botao}
                >
                    <FontAwesome5 name="hand-holding-usd" style={styles.iconeBotao} />
                    <Text>Adicionar venda</Text>
                </View>
            </View>

            <View style={styles.linhaBotao}>
                <View
                    onPress={() => {}}
                    style={styles.botao}
                >
                    <FontAwesome5 name="shopping-cart" style={styles.iconeBotao} />
                    <Text>Adicionar compra</Text>
                </View>

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
  