import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import styles from "./styles";
import colors from "../../variables";

const NomeScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');

  const onPress = () => {
    
    navigation.navigate('ProximaTela', { nome });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#0e201e" }}>
  <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
  <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Image source={require('../../assets/logomeiajuda.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
        </View>
    <TextInput
      placeholder="Insira seu nome aqui"
      placeholderTextColor="#666" 
      style={{ backgroundColor: '#FFF', color: '#000', width: '100%', marginBottom: 20, paddingHorizontal: 10, borderRadius: 2 }} 
      onChangeText={setNome}
      value={nome}
    />
    <Button title="Próximo" onPress={onPress} style={{ width: '100%' }} />
  </View>
</View>
  );
};

export default NomeScreen;