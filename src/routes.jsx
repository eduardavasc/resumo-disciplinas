import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar
 from './components/NavBar';
import Home from './pages/Home';
import CadastrarDisciplina from './pages/CadastrarDisciplina/CadastrarDisciplina';
const AppRoutes = () => (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <>
                <Navbar />
  
                <Outlet />
              </>
            }
          >
            <Route element={<Home/>} path="/"/>
            <Route element={<CadastrarDisciplina/>} path="/cadastrar-disciplina"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
  
  export default AppRoutes;