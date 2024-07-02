import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar
 from './components/NavBar';
import Home from './pages/Home';
import CadastrarDisciplinas from './pages/CadastrarDisciplina/index';
import LogarUsuario from './pages/LogarUsuario';
import CadastrarUsuario from './pages/CadastrarUsuario';
// eslint-disable-next-line react/prop-types
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
            <Route element={<CadastrarDisciplinas/>} path="/cadastrar-disciplinas"/>
            <Route element={<LogarUsuario/>} path="/logar-usuario"/>
            <Route element={<CadastrarUsuario/>} path="/cadastrar-usuario"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
  
  export default AppRoutes;