/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

  const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
  const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({
    email: '',
    nome: '',
    logado: false
  });

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export {useAuth, AuthProvider}