import React, { useState } from 'react';
import { View, TextInput, Text, Button, Image } from 'react-native';
import { AsyncStorageService } from '../../storage/asyncStorageService';
import { useUser } from '../../storage/userContext';
import styles from './styles';

const RemoverDados = ({navigation}) => {
  const userContext = useUser();
  const storageService = AsyncStorageService();
  const [textoConfirmacao, setTextoConfirmacao] = useState('');

  const removerDados = () => {
    if(textoConfirmacao === 'remover') {
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
        </View>
        <Text style={styles.aviso}>ATENÇÃO: Ao remover os dados, todas as informações armazenadas serão apagadas e não poderão ser recuperadas.</Text>
        <TextInput
          placeholder="Digite 'remover' para confirmar"
          placeholderTextColor="#666"
          style={styles.txtInput} 
          onChangeText={setTextoConfirmacao}
          value={textoConfirmacao}
        />
        <Button title="Remover dados" onPress={() => removerDados()} style={styles.botao} />
      </View>
    </View>
  );
};

export default RemoverDados;