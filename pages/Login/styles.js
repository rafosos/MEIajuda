import { StyleSheet } from "react-native";
import {colors, dimensions} from "../../variables";

const styles = StyleSheet.create({
    container:{ 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: colors.darkGreen,
        flexDirection: 'column', 
    },
    containerTudo:{ 
        alignItems: 'center', 
        justifyContent: 'center', 
        flex: 1 
    },
    containerImagem:{ 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 20 
    },
    txtBemVindo:{
        color: colors.white,
        fontSize: 24
    },
    imgLogo:{ 
        width: dimensions.width * 0.7,
        height: dimensions.width * 0.7, 
        resizeMode: 'contain'
    },
    txtInput:{ 
        backgroundColor: colors.white, 
        color: colors.black, 
        width: '100%', 
        marginBottom: 20, 
        paddingHorizontal: 10, 
        borderRadius: 15,
        width: dimensions.width * 0.8,
        height: 45 
    },
    botao: { 
        backgroundColor: colors.green,
        width: dimensions.width * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 15
    },
    txtBotao:{
        fontSize: 18,
        color: colors.white
    }
});

export default styles;