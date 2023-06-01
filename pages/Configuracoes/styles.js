import { StyleSheet } from "react-native";
import {colors} from "../../variables";

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
    width: 140, 
    height: 140, 
    resizeMode: 'contain',
    marginBottom: 20
  },
  txtInput: { 
    backgroundColor: colors.white,
    color: colors.black,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    textAlignVertical: "top",
    width: 350,
    borderRadius: 10,
    textAlignVertical: 'center'
  },
  txtInputAviso:{
    borderColor: colors.red,
    borderWidth: 2,
    marginBottom: 0,
  },
  aviso: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'space-between',
    height: 250,
    borderColor: colors.red,
    borderWidth: 1
  },
  txtAviso:{
    textAlign: 'center',
    color: colors.red, 
    fontSize: 16, 
    color: colors.red
  },
  botao: {
    backgroundColor: colors.green, 
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoAlerta:{
    width: 350,
    marginBottom: 0,
    backgroundColor: colors.red
  },
  botaoTexto: {
    color: colors.white,
    fontSize: 17
  },
});

export default styles;