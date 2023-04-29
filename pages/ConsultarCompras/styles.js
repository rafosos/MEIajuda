import { StyleSheet } from "react-native";
import colors from "../../variables";

const styles = StyleSheet.create({
    scrollview:{
        backgroundColor: colors.darkGreen
    },
    cabecalho:{
        justifyContent:"space-around"
    },
    containerTitle:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center'
    },
    iconeAdd:{
        color: colors.white,
        fontSize: 24
    },
    title: {
        color: colors.white,
        fontSize: 25, 
        textAlign: 'center'
    },
    containerDataLabel:{
        marginHorizontal: 5
    },
    labelFiltro:{
        fontSize: 15,
        color: colors.white  
    },
    linhaDataHora:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2
    },
    filtroDatas: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex:1
    },
    iconeCalendario:{
        fontSize: 24,
        color: colors.white
    },
    datas:{
        backgroundColor: colors.white, 
        marginVertical: 5,
        marginHorizontal: 5,
        height: 35, 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingHorizontal: 20,
        flex: 1
    },
    textoDataHora:{
        fontSize: 17
    },
    grafico:{
        borderRadius: 20
    },
    labelResultados:{
        color: colors.white,
        fontSize: 15,
        marginHorizontal: 10
    },
    itemCompra:{
        backgroundColor: colors.white,
        margin: 10,
        borderRadius: 15,
        padding: 10
    },
    containerBotaoConsultar: {
        alignItems: "center"
    },
    botaoConsultar: {
        alignItems: "center",
        backgroundColor: colors.green,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        marginVertical: 10
    },
    textConsultar:{
        color: colors.white,
        fontSize: 20
    },
    naoHaResultados: {
        color: colors.white,
        textAlign:'center'
    },
    centeredView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black7
    },
    modalView: {
        width: '90%',
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    headingModal:{
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center'
    },
    subHeadingModal:{
    },
    botoesModal:{
        marginTop: 15,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '60%'
    },
    botaoDeletarModal:{
        backgroundColor: colors.red,
        padding: 5,
        paddingHorizontal: 7,
        borderRadius: 5
    },
    textBotaoModal:{
        color: colors.white
    },
    textCancelarModal:{
        color: colors.green
    }
});

export default styles;