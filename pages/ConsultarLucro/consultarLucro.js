import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { LineChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";
import s from "./styles";
import {colors, dimensions} from "../../variables";
import LucroService from "../../services/lucroService";

export default function ConsultarLucro({navigation}){
    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [lucros, setLucros] = useState();
    const [selectedTipo, setSelectedTipo] = useState();
    const [data, setData] = useState();

    const tipos = {
        total: "Total",
    }
    
    const lucroService = LucroService();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          get();
        });
        return unsubscribe;
    }, [navigation]);

    const get = () => {
        switch(selectedTipo){
            case tipos.total:{
                getTotal();
                break;
            }
        }
    }

    const getTotal = () =>{
        setLoading(true);
        lucroService.getTudoPorMes().then(res => {
            setLucros(res);
            if(res.length){
            setData({
                labels: res.map((mes) => mes.mes),
                datasets:[{
                    data: res.map((mes) => mes.valor),
                }]
            });
            }else{
                setData(null);
            }
        }).catch(err => {
            Alert.alert("Erro", "Não foi buscar os registros devido a um erro.");
            console.log(err);
        }).finally(() => setLoading(false));
    }

    const getData = () => {
// var secInicial = (dataInicio.getTime() / 1000) | 0;
        // var secFinal = (dataFim.getTime() / 1000) | 0;

        // comprasService.getDatas(secInicial, secFinal).then((res) => {
        //     setCompras(res);
            
        //     if(res.length){
        //         let somas = {};
        //         let calendario = {};
        //         res.forEach(compra => {
        //             const mes = compra.data.toLocaleString('default', { month: 'long' })
        //             if(somas[mes])
        //                 somas[mes] += compra.valor;
        //             else{
        //                 somas[mes] = compra.valor;
        //                 calendario[mes] = compra.data.getMonth();
        //             }
        //         });

        //         let meses = Object.keys(somas);
        //         meses.sort((a, b) => calendario[a] - calendario[b]);

        //         setData({
        //             labels: meses,
        //             datasets:[{data: Object.values(somas)}],
        //             legend: ["Mêses com compras registradas no período selecionado"]
        //         });
        //     }
        //     else{
        //         setData(null);
        //     }
        // }) 
        // .catch(err => {
        //     console.log(err);
        //     Alert.alert("Não foi possível buscar os registros devido a um erro.");
        // })
        // .finally(() => setLoading(false));
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

    return (
        <ScrollView style={s.scrollview}>
        <View style={{paddingBottom: 10}}>
            <View style={s.cabecalho}>
                <View style={s.containerTitle}>
                    <Text style={s.title}>Lucros</Text>
                </View>

                <View style={s.picker}>
                    <Picker
                        selectedValue={selectedTipo}
                        onValueChange={(item,i) => setSelectedTipo(item)}
                        mode={'dropdown'}
                    >
                        <Picker.Item label="Selecionar periodicidade"/>
                        {Object.keys(tipos).map((tipo, i) =>
                            <Picker.Item label={tipos[tipo]} value={tipos[tipo]} key={i}/>
                        )}
                    </Picker>
                </View>

                {/* {selectedTipo == tipos.total ? null :
                <>
                <View style={s.containerDataLabel}>
                    <Text style={s.labelFiltro}>Data inicial:</Text>
                    <View style={s.linhaDataHora}>
                        <View style={s.filtroDatas}>
                            <MaterialIcons name="date-range" onPress={abrirDataInicio} style={s.iconeCalendario}/>
                            <Pressable onPress={abrirDataInicio} style={s.datas}>
                                <Text style={s.textoDataHora}>{dataInicio.getDate()}/{dataInicio.getMonth() + 1}/{dataInicio.getFullYear() + " "}</Text>
                            </Pressable>
                        </View>

                        <View style={s.filtroDatas}>
                            <MaterialIcons name="alarm" onPress={abrirHoraInicio} style={s.iconeCalendario}/>
                            <Pressable onPress={abrirHoraInicio} style={s.datas}>
                                <Text style={s.textoDataHora}>{formataDezena(dataInicio.getHours())}:{formataDezena(dataInicio.getMinutes())}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View style={s.containerDataLabel}>
                    <Text style={s.labelFiltro}>Data final:</Text>
                    <View style={s.linhaDataHora}>
                        <View style={s.filtroDatas}>
                            <MaterialIcons name="date-range" onPress={abrirDataFim} style={s.iconeCalendario}/>
                            <Pressable onPress={abrirDataFim} style={s.datas}>
                                <Text style={s.textoDataHora}>{dataFim.getDate()}/{dataFim.getMonth() + 1}/{dataFim.getFullYear() + " "}</Text>
                            </Pressable>
                        </View>

                        <View style={s.filtroDatas}>
                            <MaterialIcons name="alarm" onPress={abrirHoraFim} style={s.iconeCalendario}/>
                            <Pressable onPress={abrirHoraFim} style={s.datas}>
                                <Text style={s.textoDataHora}>{formataDezena(dataFim.getHours())}:{formataDezena(dataFim.getMinutes())}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                </>
                } */}

                <View style={s.containerBotaoConsultar}>
                    <Pressable onPress={() => getTotal()} style={s.botaoConsultar} disabled={!selectedTipo}>
                        <Text style={s.textConsultar}>CONSULTAR</Text>
                    </Pressable>
                </View>
            </View>

            {data ? 
                <View style={[{alignItems: 'center', marginVertical: 5}, s.grafico]}>
                    <Text>Lucro por mês</Text>
                    <LineChart
                        data={data}
                        yAxisLabel="R$ "
                        width={dimensions.width * 0.87}
                        height={dimensions.width * 0.70}
                        verticalLabelRotation={30}
                        withShadow={true}
                        getDotColor={(dataPoint, index) => dataPoint == 0 ? colors.darkGrey 
                            : dataPoint > 0 ? colors.green : colors.red}
                        chartConfig={{
                            backgroundColor: colors.white,
                            backgroundGradientFrom: colors.white,
                            backgroundGradientTo: colors.white,
                            decimalPlaces: 2,
                            strokeWidth: 2,
                            color: colors.charts.black,
                            labelColor: colors.charts.noOpacityBlack,
                            propsForDots: {
                                r: "7"
                            }
                        }}
                        fromZero={true}
                    />
                </View>
            :null}
               
            {loading ? <ActivityIndicator size={"large"} color={colors.white}/> : null}
            </View>
        </ScrollView>
    );
}