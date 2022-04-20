import React, {Fragment, useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';  
import clientAxios from '../../config/axios';


const EditClient = (props) =>{
    
    //Obtener el ID 
    const { id } = useParams();
    // console.log(id);

    //client equal to state and save saveNewClient() into state
    const[client, dataClient] = useState({
        name: '',
        last_name: '',
        email: '',
        phone: ''
    })

    //Query to REST API whit promise 
    const getDataApi =  async () =>{
        const queryClient = await clientAxios.get(`/clients/${id}`);
        // console.log('el cliente',queryClient.data);

        //colocar en el state
        dataClient(queryClient.data);
    } 


    //useEffect when load edit component, use [] so it doesn't run multiple times
    useEffect( () =>{
        getDataApi();
    }, []);


    //read data from form
    const updateState = event =>{
          
        dataClient({
            //get copy from current state 
            ...client,
            [event.target.name] : event.target.value
        })

    //   console.log(client);
    } 
    let navigate = useNavigate(); 

    //Send request to axios from update client
    const updateClient = event => {
        event.preventDefault();

        clientAxios.put(`/clients/${client._id}`, client)
        .then( res =>{
            console.log(res);

            Swal.fire(
                'Se actualizo el cliente',
                // res.data.message,
                // 'success'
              )
            //Redirection
            navigate("/", { replace: true })  
        } )
    }

    //validate form
    const validateForm = () =>{
        //Destructuring
        const{name, last_name, email, phone}  = client;
        //chek if properties of state have value
        let validate = !name.length  || !email.length || !phone.length;
        //return true or false
        return validate;

    }  

    return(
        <Fragment>

            <h1>Editar Cliente</h1>

            <form 
                onSubmit={updateClient}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                    placeholder="Nombre Cliente" 
                    name="name"
                    onChange={updateState}
                    value= {client.name}
                     />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                    placeholder="Apellido Cliente" 
                    name="last_name"
                    // onChange={updateState}
                    // value= {client.last_name}

                     />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                    placeholder="Email Cliente" 
                    name="email"
                    onChange={updateState}
                    value= {client.email}
                    
                     />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="phone" 
                    placeholder="Teléfono Cliente" 
                    name="phone"
                    onChange={updateState}
                    value= {client.phone}
                     />
                </div>

                <div className="enviar">
                        <input type="submit" 
                        className="btn btn-azul" 
                        value="Guardar" 
                        disabled={validateForm()} 
                        />
                </div>

            </form>
        </Fragment>
    )
} 

export default EditClient;
