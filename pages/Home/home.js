import { StyleSheet, Text, View } from "react-native";

export default function Home({navigation}){

    return (
        <View style={styles.container}>
            <Text onPress={() => navigation.navigate("BemVindo")}>ir para a tela bem vindo</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  