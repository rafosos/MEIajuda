import { StyleSheet } from "react-native";
import {colors, dimensions} from "../../variables";

const styles = StyleSheet.create({
    scrollview:{
        backgroundColor: colors.darkGreen,
        flex:1
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
    produto:{
        backgroundColor: colors.white,
        justifyContent: 'center',
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 15,
        padding: 10
    },
    nomeProduto:{
        fontSize: 22,
        fontWeight: 'bold'
    },
    precoProduto:{
        fontFamily: 'geo-bold',
    },
    descricaoProduto:{
        color: colors.darkGrey
    },
    containerSemProduto:{
        marginTop: dimensions.height * 0.37,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtSemProdutos:{
        color: colors.white,
        textAlign: 'center',
        fontSize: 17
    },
    iconeSemProdutos:{
        fontSize: 60,
        textAlign: 'center',
        padding: 10
    }
});

export default styles;