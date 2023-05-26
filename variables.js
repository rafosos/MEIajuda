const colors = {
    white: '#fff',
    green: '#3c9c03',
    notSoDarkGreen: "#0E4D1E",
    darkGreen: "#0e201e",
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

export default colors;