import { StyleSheet, Text, View } from 'react-native';

export default function BemVindo({navigation}){
    return (
        <View style={styles.container}>
          <Text onPress={() => navigation.navigate('Home')}> ir para tela de home </Text>
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
