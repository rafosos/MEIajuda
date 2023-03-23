import AsyncStorage from '@react-native-async-storage/async-storage';

export const CHAVE_NOME_FANTASIA = 'nomeFantasia';

export function AsyncStorageService(){
    const save = async (key, value) => {
        return await AsyncStorage.setItem(key, value);
    }

    const salvarNomeFantasia = async (nome) => {
        return await AsyncStorage.setItem(CHAVE_NOME_FANTASIA, nome);
    }

    const get = async (key) => {
        return await AsyncStorage.getItem(key);
    }

    const getNomeFantasia = async () => {
        return await AsyncStorage.getItem(CHAVE_NOME_FANTASIA);
    }

    const remove = async (key) => {
        return await AsyncStorage.removeItem(key);
    }

    const removerNomeFantasia = async () => {
        return await AsyncStorage.removeItem(CHAVE_NOME_FANTASIA);
    }

    return {
        save, 
        get, 
        remove, 
        salvarNomeFantasia, 
        getNomeFantasia,
        removerNomeFantasia
    };
}