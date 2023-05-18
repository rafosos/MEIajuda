import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { AsyncStorageService } from '../../storage/asyncStorageService';
import { useUser } from '../../storage/userContext';
import styles from './styles';

const Configuracoes = ({navigation}) => {
  const userContext = useUser();
  const storageService = AsyncStorageService();
  const [nome, setNome] = useState('');
  const [textoConfirmacao, setTextoConfirmacao] = useState('');

  const salvarNome = () => {
    storageService.salvarNomeFantasia(nome).then(() => {
      userContext.setNome(nome);
      navigation.navigate("Home");
    }).catch(err => console.log(err));
  };

  const removerDados = () => {
    if (textoConfirmacao === 'remover') {
      storageService.removerDados().then(() => {
        userContext.setNome('');
        navigation.navigate("Home");
      }).catch(err => console.log(err));
    } else {
      alert('Digite "remover" para confirmar a exclusão dos dados');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTudo}>
        <View style={styles.containerImagem}>
          <Image source={require('../../assets/logomeiajuda.png')} style={styles.imgLogo} />
          <TextInput
          placeholder="Insira seu nome aqui..."
          placeholderTextColor="#666"
          style={styles.txtInput} 
          onChangeText={setNome}
          value={nome}
        />
        <TouchableOpacity style={[styles.botao, { width: 350 }]} onPress={salvarNome}>
          <Text style={styles.botaoTexto}>Salvar nome</Text>
        </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Digite 'remover' para confirmar..."
          placeholderTextColor="#666"
          style={styles.txtInput} 
          onChangeText={setTextoConfirmacao}
          value={textoConfirmacao}
        />
        <Text style={styles.aviso}>ATENÇÃO: Ao remover os dados, todas as informações armazenadas serão apagadas e não poderão ser recuperadas.</Text>
        <TouchableOpacity style={[styles.botao, { width: 350 }]} onPress={removerDados}>
          <Text style={styles.botaoTexto}>Remover dados</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Configuracoes;