import react from "react";
import ReactDOM from "react-dom"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Nevbar from "./components/Nevbar";
import Footer from "./components/Footer";
import "./style.scss";

const Layout =()=>{
  return (
    <>
    <Nevbar/>
    <Outlet/>
    <Footer/>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/> ,
  },

]);

function App() {
  return <div className="app"> 
    <div className="container"> 
      <RouterProvider router={router}/>
    </div>
  </div>;
}


export default App;
