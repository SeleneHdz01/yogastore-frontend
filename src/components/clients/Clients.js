import React, { useEffect, useState, Fragment }  from 'react';
import { Link } from 'react-router-dom'; 

/**Import axios to client component */
import clientAxios from '../../config/axios';
import Client from './Client';


const Clients = () =>{

    //Working with state
     const[clients, saveClients] = useState([]); 

    //Query to consult API rest
    const queryRestapi = async() =>{
        const queryClient = await clientAxios.get('/clients')
       {/**console.log(queryClient); */ } 
       saveClients(queryClient.data)

    } 
    
    //Hook useEffect 
    useEffect(() =>{
        queryRestapi();
    },[clients])   

    
    return(
        <Fragment>

            <h1>Clientes </h1>

            <Link to ={"/clients/newclient"}  className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
               {clients.map((client) => ( 
                //    console.log(client)
                <Client 
                    key={client._id} 
                    client={client} 
                />
                ))} 
            </ul>
        </Fragment>
    )

} 

export default Clients;