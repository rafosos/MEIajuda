import { StyleSheet } from "react-native";
import {colors} from "../../variables";

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
    botoesContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    botoes:{
        flex:1,
        margin: 20,
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },
    botaoSalvar:{
        backgroundColor: colors.green
    },
    botaoExcluir:{
        backgroundColor: colors.red
    },
    textBotao:{
        fontSize: 20,
        color: colors.white,
        marginLeft: 15
    }
});

export default styles;