import { useState } from "react";
import { ActivityIndicator, Button, Pressable, ScrollView, Text, View } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import styles from "./styles";
import CompraService from "../../services/compraService";

export default function ConsultarCompras({navigation}){
    const [dataInicio, setDataInicio] = useState();
    const [horaInicio, setHoraInicio] = useState();
    const [dataFim, setDataFim] = useState();
    const [horaFim, setHoraFim] = useState();
    const [compras, setCompras] = useState(null);
    const [valor, setValor] = useState(1);
    const [loading, setLoading] = useState(false);
    
    const comprasService = CompraService();

    const next = () => {
        // adiciona valor no banco (apenas para teste)
        comprasService.add(valor).then(res => {
            console.log("res: " + res);
            setValor(valor + res);
        }) .catch(err => console.log(err));
    }
    
    const get = () =>{
        // get no banco
        var secInicial = dataSec(dataInicio, horaInicio);
        var secFinal = dataSec(dataFim, horaFim);

        setLoading(true);
        comprasService.getDatas(secInicial, secFinal).then(res => {
            console.log("res: " + res);
            setCompras(res);
        }) 
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }

    const dataSec = (data, hora) => {
        if(!data || !hora) return null;

        var dataNova = new Date(data);
        dataNova.setHours(hora.getHours());
        dataNova.setMinutes(hora.getMinutes());
        return (dataNova.getTime() / 1000) | 0;
    }

    const onChangeDataInicio = (event, selectedDate) => {
        if(event.type != "set") return;
        setDataInicio(selectedDate);
        abrirHoraInicio();
    }

    const onChangeHoraInicio = (event, selectedTime) => {
        if(event.type != "set"){
            if(!horaInicio) limparInicio();
            return;
        }

        setHoraInicio(selectedTime);
    }

    const abrirDataInicio = () => {
        modalDataHora("date", onChangeDataInicio, dataInicio, false);
    }

    const abrirHoraInicio = () => {
        modalDataHora("time", onChangeHoraInicio, horaInicio, false);
    }

    const limparInicio = () => {
        setDataInicio(null);
        setHoraInicio(null);
    }

    //fim
    const onChangeDataFim = (event, selectedDate) => {
        if(event.type != "set") return;
        setDataFim(selectedDate);
        abrirHoraFim();
    }

    const onChangeHoraFim = (event, selectedTime) => {
        setHoraFim(selectedTime);
    }

    const abrirDataFim = () => {
        modalDataHora("date", onChangeDataFim, dataFim, true);
    }

    const abrirHoraFim = () => {
        modalDataHora("time", onChangeHoraFim, horaFim, true);
    }

    const limparFim = () => {
        setDataFim(null);
        setHoraFim(null);
    }

    const modalDataHora = (modo, onChange, value, fim) =>{
        DateTimePickerAndroid.open({
            value: value ?? new Date(),
            onChange,
            mode: modo,
            is24Hour: true,
            minimumDate: fim ? dataInicio : null
        });
    }

    const formataDezena = (num) => num.toLocaleString(undefined, {minimumIntegerDigits: 2});

    const adicionarCompra = () => navigation.navigate("AdicionarCompra");

    return (
        <ScrollView style={styles.scrollview}>
            <View style={styles.cabecalho}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Consultar compras</Text>
                    <MaterialIcons name="add-box" style={styles.iconeAdd} onPress={adicionarCompra} />
                </View>

                {/* botão de teste para adicionar compra no banco! */}
                {/* <Button onPress={() => next()} title="add"/> */}

                <View style={styles.filtroDatas}>

                    <View style={styles.containerFiltroData}>
                        <MaterialIcons name="date-range" onPress={abrirDataInicio} style={styles.iconeCalendario}/>
                        <View style={styles.datas}>
                            <Pressable onPress={abrirDataInicio} style={styles.filtroData}>
                                {dataInicio && horaInicio ?
                                <Text>
                                    {dataInicio.getDate()}/{dataInicio.getMonth() + 1}/{dataInicio.getFullYear() + " "}
                                    {formataDezena(horaInicio.getHours())}:{formataDezena(horaInicio.getMinutes())}
                                </Text>
                                : <Text style={styles.placeholderData}>Data inicial</Text> }
                            </Pressable>
                            {dataInicio && horaInicio ? 
                                <Pressable onPress={limparInicio}>
                                    <AntDesign name="closecircle" style={styles.iconeLimpar}/>
                                </Pressable>
                            :null}
                        </View>
                    </View>

                    <View style={styles.containerFiltroData}>
                        <MaterialIcons name="date-range" onPress={abrirDataInicio} style={styles.iconeCalendario}/>
                        <View style={styles.datas}>
                            <Pressable onPress={abrirDataFim}>
                                {dataFim && horaFim ?
                                <Text>
                                    {dataFim.getDate()}/{dataFim.getMonth() + 1}/{dataFim.getFullYear() + " "}
                                    {formataDezena(horaFim.getHours())}:{formataDezena(horaFim.getMinutes())}
                                </Text>
                                : <Text style={styles.placeholderData}>Data final</Text> }
                            </Pressable>
                            {dataFim && horaFim ? 
                                <Pressable onPress={limparFim}>
                                    <AntDesign name="closecircle" style={styles.iconeLimpar}/>
                                </Pressable>
                            :null}
                        </View>
                    </View>

                </View>

                <View style={styles.botaoConsultar}>
                    <Button 
                        onPress={() => get()}
                        title="Consultar"
                    />
                </View>
            </View>
            {compras ? 
                compras.length ? 
                    compras.map(compra => {
                        return (
                            <View key={compra.id} style={styles.itemCompra}>
                                <Text>Id da compra: {compra.id}</Text>
                                <Text>Valor: R$ {compra.valor/100}</Text>
                                <Text>Descrição: {compra.descricao}</Text>
                                <Text>
                                    Data: {compra.data.getDate()}/
                                    {compra.data.getMonth()+1}/
                                    {compra.data.getFullYear() + " "}
                                    {compra.data.getHours()}:{compra.data.getMinutes()}
                                </Text>
                            </View>
                        )
                    }):
                    <Text style={styles.naoHaResultados}>Não há compras para o período pesquisado.</Text>
            : null}

            {loading ? <ActivityIndicator size={"large"} color={"#fff"}/> : null}

        </ScrollView>
    );
}