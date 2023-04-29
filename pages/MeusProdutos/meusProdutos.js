import { ScrollView, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import styles from "./styles";

export default function MeusProdutos({navigation}){
    const adicionarProduto = () => navigation.navigate("AdicionarProduto");

    return (
        <ScrollView style={styles.scrollview}>
        <View style={{paddingBottom: 10}}>
            <View style={styles.cabecalho}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Meus produtos</Text>
                    <MaterialIcons name="add-box" style={styles.iconeAdd} onPress={adicionarProduto} />
                </View>
           </View>
        </View>
        </ScrollView>
    );
}