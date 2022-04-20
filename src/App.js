import React,{Fragment}   from "react";

/**Routing */
import { Routes, Route} from "react-router-dom";


/**Layout */
import Header from "./components/layout/Header";
import AdminMenu from "./components/layout/AdminMenu";

/**Components */
import Clients from "./components/clients/Clients";
import Products from "./components/products/Products";
import Orders from "./components/orders/Orders";
import NewClient from "./components/clients/NewClient";
import EditClient from "./components/clients/EditClient";


function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (

      <Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
          <AdminMenu />
          <main className="caja-contenido col-9">
            
            {/* Routing to components */}
            <Routes>
              <Route path="/" element={<Clients/>}  />
              <Route path="/clients/newclient" element={<NewClient/>}  />
              <Route path="/clients/edit/:id" element={<EditClient/>}  />
              <Route path="/products" element={<Products/>}  />
              <Route path="/orders" element={<Orders />} /> 
            </Routes>
          </main>
        </div>
      </Fragment>
   

    
  ) 
  
}

export default App;
