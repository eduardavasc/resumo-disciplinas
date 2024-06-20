import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar
 from './components/NavBar';
import Home from './pages/Home';
import CadastrarDisciplinas from './pages/CadastrarDisciplina/CadastrarDisciplina';
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
  
  export default AppRoutes;