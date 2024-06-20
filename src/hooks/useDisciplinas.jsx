/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

  const DisciplinaContext = createContext();

// eslint-disable-next-line react/prop-types
  const DisciplinaProvider = ({ children }) => {
  const [disciplinas, setDisciplinas] = useState([]);

  return (
    <DisciplinaContext.Provider value={{ disciplinas, setDisciplinas }}>
      {children}
    </DisciplinaContext.Provider>
  );
};

const useDisciplinas = () => {
    const context = useContext(DisciplinaContext)
    return context
}

export {useDisciplinas, DisciplinaProvider}