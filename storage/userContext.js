import { createContext, useContext, useEffect, useState } from "react";
import { AsyncStorageService, CHAVE_NOME_FANTASIA } from "./asyncStorageService";

const UserContext = createContext({
    nome: '',
    setNome: () => {},
    loadingAuth: true
});

export const UserProvider = ({children}) => {
    const [nome, setNome] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const storageService = AsyncStorageService();
    
    useEffect(() => {
        const verificaUsuarioLogado = async () => {
            const nome = await storageService.get(CHAVE_NOME_FANTASIA);
            setNome(nome);
            setLoadingAuth(false);
        }

        verificaUsuarioLogado();
    })

    return (
        <UserContext.Provider value={{
            nome,
            setNome,
            loadingAuth
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    return context;
}