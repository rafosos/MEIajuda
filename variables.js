import { Dimensions } from "react-native";

const colors = {
    white: '#fff',
    green: '#3c9c03',
    notSoDarkGreen: "#0E4D1e",
    darkGreen: "#0e201e",
    yellow: '#ffa700',
    blue: "#0047AB",
    red: '#f00',
    lighterGrey: '#efefef',
    lightGrey: '#dfdfdf',
    grey: '#cfcfcf',
    darkGrey: '#555',
    black: "#000",

    charts: {
        noOpacityBlack: (opacity = 1) => `rgba(0, 0, 0, 1)`,
        black: (opacity = 1) => `rgba(0, 0, 0, 0.4)`,
        green: (opacity = 1) => `rgba(0, 128 , 0, ${opacity})`,
        darkGreen: "#006400"
    },

    black7: "rgba(0,0,0,0.7)"
}

const formataNumero = (num) => num.toLocaleString("pt-BR", {maximumFractionDigits:2});

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export {colors, formataNumero, dimensions};