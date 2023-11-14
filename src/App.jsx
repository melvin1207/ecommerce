import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { useRoutes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { ContextAppProvider } from './Context/ContextAppProvider';
import { AuthLoggedin, AuthNoLoggedin, ContextAuthProvider } from './Context/ContextAuthProvider';
import Home from './Pages/Home/Home'
import Login from './Pages/LogIn/Login'
import MyOrder from './Pages/MyOrder/MyOrder'
import NotFound from './Pages/NotFound/NotFound'
import SignUp from './Pages/SignUp/SignUp'
import NavBar from './Components/NavBar/NavBar'
import SideMenu from './Components/SideMenu/SideMenu'
import Products from './Pages/Products/Products'

const AppRoutes = () => {
  const routes = useRoutes([
    {path: "/", element: <Home/>},
    {path: "categories/:category", element: <Home/>},
    {path: "search/:searchText", element: <Home/>},

    { path: "log-in",
    element: (
      <AuthLoggedin>
        <Login/>
      </AuthLoggedin>
    )},

    { path: "my-orders/:id", 
    element: (
      <AuthNoLoggedin>
        <MyOrder />
      </AuthNoLoggedin>) 
    },

    { path: "sign-up", 
    element: (
      <AuthLoggedin>
        <SignUp />
      </AuthLoggedin>
    ) },

    { path: "admin-products", 
    element: (
      <AuthNoLoggedin>
        <Products />
      </AuthNoLoggedin>) 
    },

    { path: "/*", element: <NotFound /> },
  ]);
  return routes;
}

const App = () => {
  return(
  <BrowserRouter>
    <ContextAuthProvider>
      <ContextAppProvider>
        <NavBar/>
        <AppRoutes/>
        <SideMenu/>
      </ContextAppProvider>
    </ContextAuthProvider>
  </BrowserRouter>
  )
}

export default App
