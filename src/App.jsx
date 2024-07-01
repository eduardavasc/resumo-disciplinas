import "./App.css";
import AppRoutes from "./routes";
import { DisciplinaProvider } from "./hooks/useDisciplinas";
import { AuthProvider } from "./hooks/useAuth";

const App = () => {
  
  return (
    <AuthProvider>
      <DisciplinaProvider>
        <AppRoutes />
      </DisciplinaProvider>
    </AuthProvider>
    
  );
};

export default App;
