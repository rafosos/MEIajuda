const colors = {
    white: '#fff',
    green: '#3c9c03',
    darkGreen: "#0e201e",
    red: '#f00',
    grey: '#cfcfcf',
    black: "#000",

    charts: {
        black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        green: (opacity = 1) => `rgba(0, 128 , 0, ${opacity})`,
        darkGreen: "#006400"
    }
}

export default colors;