import { StyleSheet } from "react-native";
import colors from "../../variables";

const styles = StyleSheet.create({
    scrollview:{
        backgroundColor: colors.darkGreen, 
        paddingVertical: 20,
        paddingBottom: 50
    },
    cabecalho:{
        height: 150, 
        justifyContent:"space-around"
    },
    title: {
        color: "#fff", 
        fontSize: 25, 
        textAlign: 'center'
    },
    filtroDatas: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    containerFiltroData:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2
    },
    iconeCalendario:{
        fontSize: 24,
        color: colors.white
    },
    datas:{
        backgroundColor: '#fff', 
        marginVertical: 5,
        marginHorizontal: 5,
        height: 35, 
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row'
    },
    placeholderData: {
        color: colors.grey
    },
    itemCompra:{
        backgroundColor: "#fff", 
        margin: 10,
        borderRadius: 15,
        padding: 10
    },
    iconeLimpar:{
        fontSize: 24,
        color: "#f00"
    },
    botaoConsultar: {
        alignItems: "center"
    },
    naoHaResultados: {
        color: colors.white,
        textAlign:'center'
    }
});

export default styles;