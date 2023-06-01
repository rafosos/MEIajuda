import { View, Image, ActivityIndicator, StyleSheet } from "react-native";
import {colors} from "../variables";

export default function Loading(){
    return (
      <View style={styles.container}>
        <Image 
          source={require("../assets/logomeiajuda.png")}
          style={styles.imageLogo}
        />
        <ActivityIndicator
          size={"large"} 
          color={"#fff"} 
        />
      </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.darkGreen, 
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageLogo:{
        width: '90%',
        resizeMode: 'contain'
    }
})