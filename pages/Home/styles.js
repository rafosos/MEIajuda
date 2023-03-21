import { StyleSheet } from "react-native";
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
        color: '#fff',
        fontSize: 25
    },
    containerLucro:{
        backgroundColor: colors.grey,
        borderRadius: 15,
        padding: 10
    },
    linhaBotao:{
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 5
    },
    botao:{
        backgroundColor: colors.grey,
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
    }
});

export default styles;