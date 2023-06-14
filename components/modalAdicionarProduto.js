import { View, StyleSheet, Modal, TouchableOpacity, Text, ActivityIndicator, Pressable } from "react-native";
import { Entypo } from '@expo/vector-icons';
import {colors, formataReal} from "../variables";
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
                        <TouchableOpacity style={styles.produto} onPress={() => produtoEscolhido(item)}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.nome}>{item.nome}</Text>
                                <Text style={styles.preco}>{formataReal(item.preco)}</Text>
                            </View>
                            {item.descricao? <Text style={styles.descricao} numberOfLines={2}>{item.descricao}</Text>:null}
                        </TouchableOpacity>
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
        padding: 10,
        marginVertical: 5,
        borderRadius: 15
    },
    nome: {
        fontFamily: 'geo-bold',
        fontSize: 17,
        flexWrap: 'wrap',
        flex: 1,
        marginRight: 5
    },
    descricao: {
        fontSize: 12,
    },
    preco:{
        fontFamily: 'geo-bold',
        fontSize: 17
    }
})