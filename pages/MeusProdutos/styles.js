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

});

export default styles;