import { StyleSheet } from "react-native";
import {colors} from "../../variables";

const styles = StyleSheet.create({
    tudo:{
        backgroundColor: colors.darkGreen,
        flex: 1,
        paddingHorizontal: 20
    },
    containers:{
        marginVertical: 5
    },
    nomeInput:{
        color: colors.white,
        fontSize: 20,
        marginBottom: 5
    },
    inputValor:{
        backgroundColor: colors.white,
        color: colors.black,
        height: 50,
        borderRadius: 10,
        padding: 10,
        fontSize: 20
    },
    containerData:{
        backgroundColor: colors.white,
        height: 50,
        borderRadius: 10,
        padding: 10,
    },
    data:{
        color: colors.black,
        fontSize: 20
    },
    inputObservacoes:{
        backgroundColor: colors.white,
        color: colors.black,
        borderRadius: 10,
        paddingHorizontal:10,
        paddingVertical: 5,
        textAlignVertical: "top"
    },
    botaoSalvar:{
        backgroundColor: colors.green,
        marginVertical: 20,
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textSalvar:{
        fontSize: 20,
        color: colors.white
    }
})

export default styles;