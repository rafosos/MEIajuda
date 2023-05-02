import { View, StyleSheet, Modal, Pressable, Text } from "react-native";
import colors from "../variables";

export default function ModalSimples({
  modalVisivel = false,
  setModalVisivel,
  heading = "Tem certeza que deseja apagar o registro permanentemente?", 
  subHeading = "Esta ação não poderá ser desfeita.",
  onPressConfirmar,
  botaoCancelar,
  botaoConfirmar
  }){

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {setModalVisivel(false)}}>
        <View style={styles.centeredView}>
            <Pressable onPress={() => setModalVisivel(false)}>
            <View style={styles.modalView}>
                <Text style={styles.headingModal}>{heading}</Text>
                <Text style={styles.subHeadingModal}>{subHeading}</Text>

                <View style={styles.botoesModal}>
                    <Pressable onPress={() => setModalVisivel(false)}>
                        <Text style={styles.textCancelarModal}>Não, cancelar</Text>
                    </Pressable>

                    <Pressable
                        style={styles.botaoDeletarModal}
                        onPress={onPressConfirmar}
                        >
                        <Text style={styles.textBotaoModal}>Sim, deletar</Text>
                    </Pressable>
                </View>
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
    alignItems: 'center',
    backgroundColor: colors.black7
  },
  modalView: {
      width: '90%',
      backgroundColor: colors.white,
      borderRadius: 20,
      padding: 20,
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
  headingModal:{
      fontWeight: 'bold',
      fontSize: 17,
      textAlign: 'center'
  },
  subHeadingModal:{
  },
  botoesModal:{
      marginTop: 15,
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '60%'
  },
  botaoDeletarModal:{
      backgroundColor: colors.red,
      padding: 5,
      paddingHorizontal: 7,
      borderRadius: 5
  },
  textBotaoModal:{
      color: colors.white
  },
  textCancelarModal:{
      color: colors.green
  }
})