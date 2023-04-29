import { StyleSheet } from "react-native";
import colors from "../../variables";

const styles = StyleSheet.create({
    tudo:{
        backgroundColor: colors.darkGreen,
        flex: 1,
        paddingHorizontal: 10
    },
    containers:{
        marginVertical: 5
    },
    labels:{
        color: colors.white,
        fontSize: 20
    },
    inputNome:{
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 10
    },
    inputValor:{
        backgroundColor: colors.white,
        borderRadius: 15,
        height: 40,
        paddingHorizontal: 10
    },
    inputObservacoes:{
        backgroundColor: colors.white,
        borderRadius: 15,
        textAlignVertical: 'top',
        paddingVertical: 5,
        paddingHorizontal: 10
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
});

export default styles;