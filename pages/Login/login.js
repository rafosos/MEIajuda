import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, Text } from 'react-native';
import { AsyncStorageService } from '../../storage/asyncStorageService';
import { useUser } from '../../storage/userContext';
import s from "./styles";
import { colors } from '../../variables';

const Login = () => {
  const [nome, setNome] = useState('');
  const userContext = useUser();
  const storageService = AsyncStorageService();

  const salvarNome = () => {
    storageService.salvarNomeFantasia(nome).then(() => {
      userContext.setNome(nome);
    }).catch(err => console.log(err));
  };

  return (
    <View style={s.container}>
      <View style={s.containerTudo}>
        <View style={s.containerImagem}>
          <Image source={require('../../assets/logomeiajuda.png')} style={s.imgLogo} />
          <Text style={s.txtBemVindo}>Boas vindas ao MEIajuda!</Text>
        </View>
        <TextInput
          placeholder="Insira o nome fantasia..."
          placeholderTextColor={colors.darkGrey}
          style={s.txtInput} 
          onChangeText={setNome}
          value={nome}
        />
        <TouchableOpacity onPress={() => salvarNome()} style={s.botao}>
          <Text style={s.txtBotao}>PRÓXIMO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;