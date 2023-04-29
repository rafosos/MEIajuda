import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import styles from "./styles";
import CompraService from "../../services/compraService";

const AdicionarCompra = ({navigation}) =>{
    const [preco, setPreco] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState(new Date());
    const [hora, setHora] = useState(new Date());
    const compraService = CompraService();

    const salvar = () => {
        const dataHora = new Date(data);
        dataHora.setHours(hora.getHours());
        dataHora.setMinutes(hora.getMinutes());

        compraService.add(preco, descricao, dataHora)
            .then(res => {
                navigation.pop();
            })
            .catch(err => console.log(err));
    }

    const onChangeData = (event, selectedDate) => {
        if(event.type != "set") return;
        setData(selectedDate);
        abrirHora();
    }

    const onChangeHora = (event, selectedTime) => {
        setHora(selectedTime);
    }

    const abrirData = () => {
        modalDataHora("date", onChangeData, data);
    }

    const abrirHora = () => {
        modalDataHora("time", onChangeHora, hora);
    }

    const modalDataHora = (modo, onChange, value, fim) =>{
        DateTimePickerAndroid.open({
            value: value ?? new Date(),
            onChange,
            mode: modo,
            is24Hour: true
        });
    }

    const formataDezena = (num) => num.toLocaleString(undefined, {minimumIntegerDigits: 2});

    return(<View style={styles.tudo}>
        <View style={styles.containers}>
            <Text style={styles.nomeInput}>
                Valor da compra*
            </Text>
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
            <Text style={styles.nomeInput}>
                Data da compra
            </Text>
            <View style={styles.containerData}>
                <Pressable onPress={abrirData}>
                    <Text style={styles.data}>
                        {data.getDate()}/{data.getMonth() + 1}/{data.getFullYear() + " "}
                        {formataDezena(hora.getHours())}:{formataDezena(hora.getMinutes())}
                    </Text>
                </Pressable>
            </View>
        </View>

        <View style={styles.containers}>
            <Text style={styles.nomeInput}>
                Observações
            </Text>
            <TextInput
                placeholder="Insira aqui as observações da compra..."
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

export default AdicionarCompra;
