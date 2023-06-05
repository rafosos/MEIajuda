import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AsyncStorageService } from '../../storage/asyncStorageService';
import { useUser } from '../../storage/userContext';
import styles from './styles';
import TudoService from '../../services/tudoService';
import { colors } from '../../variables';

const Configuracoes = ({navigation}) => {
  const userContext = useUser();
  const storageService = AsyncStorageService();
  const tudoService = TudoService();
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
      tudoService.apagarDados().then(() => {
        userContext.setNome(null);
        storageService.removerNomeFantasia();
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
            placeholderTextColor={colors.grey}
            style={styles.txtInput}
            onChangeText={setNome}
            value={nome}
          />
          <TouchableOpacity style={[styles.botao, { width: 350 }]} onPress={salvarNome}>
            <Text style={styles.botaoTexto}>Salvar nome</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.aviso}>
          <TextInput
            placeholder="Digite 'remover' para confirmar..."
            placeholderTextColor={colors.grey}
            style={[styles.txtInput, styles.txtInputAviso]} 
            onChangeText={setTextoConfirmacao}
            value={textoConfirmacao}
            />
          
          <Text style={styles.txtAviso}>
          <FontAwesome name="warning" size={30} color={colors.red} />
          {"\n"}ATENÇÃO: Ao remover os dados, todas as informações armazenadas serão apagadas e não poderão ser recuperadas.
          </Text>
          
          <TouchableOpacity style={[styles.botao, styles.botaoAlerta]} onPress={removerDados}>
            <Text style={styles.botaoTexto}>Remover dados</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Configuracoes;