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
    width: 50, 
    height: 50, 
    resizeMode: 'contain'
  },
  txtInput: { 
    backgroundColor: '#FFF', 
    color: '#000', 
    width: '100%', 
    marginBottom: 20, 
    paddingHorizontal: 10,  
    borderRadius: 2 
  },
  botao: { 
    width: '100%'
  },
  aviso: {
    backgroundColor: '#FFF',
    color: '#f00', 
    fontSize: 16, 
    marginTop: 10, 
    textAlign: 'center',
    marginBottom: 20, 
    paddingHorizontal: 10, 
    borderRadius: 2
  }
});

export default styles;