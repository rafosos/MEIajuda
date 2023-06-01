import { View, StyleSheet, Modal, Pressable, Text, ActivityIndicator } from "react-native";
import { Entypo } from '@expo/vector-icons';
import {colors} from "../variables";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { FlatList } from "react-native";

export default function ModalAdicionarProduto({
  modalVisivel = false,
  setModalVisivel,
  produtoEscolhido,
  pesquisar,
  resultados,
  loading
  }){
    const [termo, setTermo] = useState("");

    useEffect(()=> {
        pesquisar(termo);
    }, [termo])

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {setModalVisivel(false)}}>
        <View style={styles.centeredView}>
            <Pressable onPress={() => setModalVisivel(false)}>
            <View style={styles.modalView}>
            <Pressable onPress={() => {}}>
                <View style={styles.textInputContainer}>
                    <Entypo name="magnifying-glass" style={styles.iconLupa} />
                    <TextInput
                        value={termo}
                        onChangeText={setTermo}
                        placeholder="Pesquisar produto"
                        style={styles.textInput}
                    />
                </View>
                
                <FlatList
                    data={resultados}
                    keyExtractor={item => item.id}
                    renderItem={({item})=> 
                        <Pressable style={styles.produto} onPress={() => produtoEscolhido(item)}>
                            <View>
                                <Text style={styles.nome}>{item.nome}</Text>
                                <Text style={styles.descricao} numberOfLines={2}>{item.descricao}</Text>
                            </View>

                            <Text style={styles.preco}>R$ {item.preco}</Text>
                        </Pressable>
                    }
                    ListFooterComponent={() => loading ?
                        <ActivityIndicator size="large" color={colors.green} />
                        :null}
                    ListEmptyComponent={() => termo != "" ? 
                        <Text style={styles.listEmptyText}>Não foram encontrados produtos para "{termo}".</Text>
                        :null}
                />
            </Pressable>
            </View>
            </Pressable>
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.black7
    },
    modalView: {
        height: '90%',
        marginHorizontal: '5%',
        backgroundColor: colors.white,
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textInputContainer:{
        flexDirection: 'row',
        borderColor: colors.grey,
        borderWidth: 1.5,
        height: 50,
        alignItems: 'center',
        borderRadius: 15,
        paddingHorizontal: 10
    },
    iconLupa:{
        fontSize: 24,
        color: colors.black,
        paddingRight: 5
    },
    textInput:{
        width: "100%",
    },
        botoesModal:{
        marginTop: 15,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '60%'
    },
    listEmptyText:{
        marginTop: 10,
        color: colors.darkGrey,
        textAlign: 'center'
    },
    produto:{
        backgroundColor: colors.lighterGrey,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        borderRadius: 15
    },
    nome: {
        fontWeight: 'bold',
        fontSize: 20
    },
    descricao: {
        fontSize: 12,
    },
    preco:{
        // fontWeight: 'bold'
        fontSize: 15
    }
})