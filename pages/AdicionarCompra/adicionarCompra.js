import { Text, TextInput, View } from "react-native";
import styles from "./styles";

const AdicionarCompra = () =>{

    return(<View style={styles.tudo}>
        <View>
            <TextInput 
                placeholder="Valor da compra"
                keyboardType="numeric"
            />
        </View>
    </View>)
}

export default AdicionarCompra;