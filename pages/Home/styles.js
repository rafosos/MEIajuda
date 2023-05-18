import { StyleSheet, Dimensions } from "react-native";
import colors from "../../variables";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.darkGreen,
      padding: '2.5%'
    },
    headerBemVindo:{
        display: "flex", 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginVertical: 15
    },
    textoBemVindo:{
        color: colors.white,
        fontSize: 25
    },
    textoVendaRapida:{
        color: colors.white,
        fontSize: 20
    },
    containerLucro:{
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: 10
    },
    itemProduto:{  
        backgroundColor: colors.white,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: Dimensions.get('window').width * 0.9, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginRight: 7,
        marginVertical: 5
    },
    nomeProd:{
        fontWeight: "bold",
        fontSize: 20
    },
    quantidade:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    maisMenos:{
        fontWeight: 'bold',
        fontSize: 25,
        padding: 5,
        paddingHorizontal: 17,
        marginHorizontal: 5,
        backgroundColor: colors.lightGrey,
        borderRadius: 100
    },
    containerValorSalvar:{
        flexDirection: 'row',
        height: 35
    },
    campoValor:{
        backgroundColor: colors.white,
        borderRadius: 15,
        flex:2,
        padding:5,
        paddingLeft: 15,
        marginRight: 5,
        justifyContent: 'center'
    },
    botaoSalvar:{
        backgroundColor: colors.green,
        borderRadius: 15,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtBotaoSalvar:{
        color: colors.white,
        fontSize: 17
    },
    linhaBotao:{
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 5
    },
    botao:{
        backgroundColor: colors.white,
        borderRadius: 15,
        flex: 1,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    iconeBotao:{
        marginRight: 10,
        color: colors.darkGreen,
        fontSize: 25
    },
    bold:{
        fontWeight: 'bold'
    }
});

export default styles;