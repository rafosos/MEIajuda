import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { LineChart } from "react-native-chart-kit";
import { MaterialIcons } from '@expo/vector-icons';
import styles from "./styles";
import CompraService from "../../services/compraService";
import colors from "../../variables";
import ModalSimples from "../../components/modalSimples";

export default function ConsultarCompras({navigation}){
    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());
    const [compras, setCompras] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalVisivel, setModalVisivel] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [data, setData] = useState()
    
    const comprasService = CompraService();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          get();
        });
        return unsubscribe;
    }, [navigation]);
    
    const get = () =>{
        var secInicial = (dataInicio.getTime() / 1000) | 0;
        var secFinal = (dataFim.getTime() / 1000) | 0;

        setLoading(true);
        comprasService.getDatas(secInicial, secFinal).then((res) => {
            setCompras(res);
            
            if(res.length){
                let somas = {};
                let calendario = {};
                res.forEach(compra => {
                    const mes = compra.data.toLocaleString('default', { month: 'long' })
                    if(somas[mes])
                        somas[mes] += compra.valor;
                    else{
                        somas[mes] = compra.valor;
                        calendario[mes] = compra.data.getMonth();
                    }
                });

                let meses = Object.keys(somas);
                meses.sort((a, b) => calendario[a] - calendario[b]);

                setData({
                    labels: meses,
                    datasets:[{data: Object.values(somas)}],
                    legend: ["Mêses com compras registradas no período selecionado"]
                });
            }
            else{
                setData(null);
            }
        }) 
        .catch(err => {
            console.log(err);
            Alert.alert("Não foi possível buscar os registros devido a um erro.");
        })
        .finally(() => setLoading(false));
    }

    const onChangeDataInicio = (event, selectedDate) => {
        if(event.type != "set") return;
        var data = new Date(dataInicio);
        data.setDate(selectedDate.getDate());
        data.setMonth(selectedDate.getMonth());
        data.setFullYear(selectedDate.getFullYear());
        setDataInicio(data);
    }

    const onChangeHoraInicio = (event, selectedTime) => {
        if(event.type != "set") return;
        var data = new Date(dataInicio);
        data.setHours(selectedTime.getHours());
        data.setMinutes(selectedTime.getMinutes());
        setDataInicio(data);
    }

    const abrirDataInicio = () => {
        modalDataHora("date", onChangeDataInicio, dataInicio, false);
    }

    const abrirHoraInicio = () => {
        modalDataHora("time", onChangeHoraInicio, dataInicio, false);
    }

    //fim
    const onChangeDataFim = (event, selectedDate) => {
        if(event.type != "set") return;
        var data = new Date(dataFim);
        data.setDate(selectedDate.getDate());
        data.setMonth(selectedDate.getMonth());
        data.setFullYear(selectedDate.getFullYear());
        setDataFim(data);
    }

    const onChangeHoraFim = (event, selectedTime) => {
        if(event.type != "set") return;
        var data = new Date(dataFim);
        data.setHours(selectedTime.getHours());
        data.setMinutes(selectedTime.getMinutes());
        setDataFim(data);
    }

    const abrirDataFim = () => {
        modalDataHora("date", onChangeDataFim, dataFim, true);
    }

    const abrirHoraFim = () => {
        modalDataHora("time", onChangeHoraFim, dataFim, true);
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

    const abrirModal = (id) => {
        setSelectedId(id);
        setModalVisivel(true);
    }

    const deletarRegistro = () => {
        setModalVisivel(false);
        comprasService.deleteById(selectedId).then(res => {
            console.log("Registro deletado com sucesso.");
            get();
        }).catch(err => {
            console.log(err);
            Alert.alert("Não foi possível deletar o registro devido a um erro.");
        });
    }

    return (
        <ScrollView style={styles.scrollview}>
        <View style={{paddingBottom: 10}}>
            <View style={styles.cabecalho}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Consultar compras</Text>
                    <MaterialIcons name="add-box" style={styles.iconeAdd} onPress={adicionarCompra} />
                </View>

                <View style={styles.containerDataLabel}>
                    <Text style={styles.labelFiltro}>Data inicial:</Text>
                    <View style={styles.linhaDataHora}>
                        <View style={styles.filtroDatas}>
                            <MaterialIcons name="date-range" onPress={abrirDataInicio} style={styles.iconeCalendario}/>
                            <Pressable onPress={abrirDataInicio} style={styles.datas}>
                                <Text style={styles.textoDataHora}>{dataInicio.getDate()}/{dataInicio.getMonth() + 1}/{dataInicio.getFullYear() + " "}</Text>
                            </Pressable>
                        </View>

                        <View style={styles.filtroDatas}>
                            <MaterialIcons name="alarm" onPress={abrirHoraInicio} style={styles.iconeCalendario}/>
                            <Pressable onPress={abrirHoraInicio} style={styles.datas}>
                                <Text style={styles.textoDataHora}>{formataDezena(dataInicio.getHours())}:{formataDezena(dataInicio.getMinutes())}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View style={styles.containerDataLabel}>
                    <Text style={styles.labelFiltro}>Data final:</Text>
                    <View style={styles.linhaDataHora}>
                        <View style={styles.filtroDatas}>
                            <MaterialIcons name="date-range" onPress={abrirDataFim} style={styles.iconeCalendario}/>
                            <Pressable onPress={abrirDataFim} style={styles.datas}>
                                <Text style={styles.textoDataHora}>{dataFim.getDate()}/{dataFim.getMonth() + 1}/{dataFim.getFullYear() + " "}</Text>
                            </Pressable>
                        </View>

                        <View style={styles.filtroDatas}>
                            <MaterialIcons name="alarm" onPress={abrirHoraFim} style={styles.iconeCalendario}/>
                            <Pressable onPress={abrirHoraFim} style={styles.datas}>
                                <Text style={styles.textoDataHora}>{formataDezena(dataFim.getHours())}:{formataDezena(dataFim.getMinutes())}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View style={styles.containerBotaoConsultar}>
                    <Pressable onPress={() => get()} style={styles.botaoConsultar}>
                        <Text style={styles.textConsultar}>Consultar</Text>
                    </Pressable>
                </View>
            </View>

            {data ? 
                <View style={{alignItems: 'center', marginVertical: 5}}>
                    <LineChart
                        data={data}
                        yAxisLabel="R$ "
                        width={Dimensions.get("window").width * 0.95}
                        height={256}
                        verticalLabelRotation={30}
                        style={styles.grafico}
                        chartConfig={{
                            backgroundColor: colors.white,
                            backgroundGradientFrom: colors.white,
                            backgroundGradientTo: colors.white,
                            decimalPlaces: 2,
                            color: colors.charts.green,
                            labelColor: colors.charts.black,
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: colors.charts.darkGreen
                            }
                        }}
                        bezier
                    />
                </View>
            :null}

            {compras ? 
                compras.length ? <>
                    <Text style={styles.labelResultados}>Compras no período selecionado:</Text>
                    {compras.map(compra => {
                        return (
                            <View key={compra.id} style={styles.itemCompra}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <View>
                                        <Text>Id da compra: {compra.id}</Text>
                                        <Text>Valor: R$ {compra.valor/100}</Text>
                                        <Text>Descrição: {compra.descricao}</Text>
                                    </View>
                                    <MaterialIcons name="delete" size={20} color={colors.red} onPress={() => abrirModal(compra.id)}/>
                                </View>
                                <Text>
                                    Data: {compra.data.getDate()}/
                                    {compra.data.getMonth()+1}/
                                    {compra.data.getFullYear() + " "}
                                    {compra.data.getHours()}:{compra.data.getMinutes()}
                                </Text>
                            </View>
                        )
                    })}
                    </>:
                    <Text style={styles.naoHaResultados}>Não há compras para o período pesquisado.</Text>
            : null}

            <ModalSimples
                modalVisivel={modalVisivel}
                setModalVisivel={setModalVisivel}
                onPressConfirmar={() => deletarRegistro()}
            />
               
            {loading ? <ActivityIndicator size={"large"} color={colors.white}/> : null}
            </View>
        </ScrollView>
    );
}