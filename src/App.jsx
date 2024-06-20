import "./App.css";
import AppRoutes from "./routes";
import { DisciplinaProvider } from "./hooks/useDisciplinas";

const App = () => {
  
  return (
    <DisciplinaProvider>
    <AppRoutes />
    </DisciplinaProvider>
  );
};

export default App;
