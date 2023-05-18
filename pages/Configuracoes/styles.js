import { StyleSheet } from "react-native";
import colors from "../../variables";

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: colors.darkGreen,
    flexDirection: 'column', 
  },
  containerTudo: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1,
    paddingHorizontal: 20, 
  },
  containerImagem: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 20 
  },
  imgLogo: { 
    width: 120, 
    height: 120, 
    resizeMode: 'contain'
  },
  txtInput: { 
    backgroundColor: colors.white,
    color: colors.black,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    textAlignVertical: "top",
    width: 350
  },
  aviso: {
    backgroundColor: colors.white,
    color: '#f00', 
    fontSize: 16, 
    textAlign: 'center',
    marginBottom: 20, 
    paddingHorizontal: 10, 
    borderRadius: 2
  },
  botao: {
    backgroundColor: colors.green, 
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoTexto: {
    color: colors.white, 
  },
});

export default styles;