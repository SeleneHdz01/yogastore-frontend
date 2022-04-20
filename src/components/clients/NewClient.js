import React, {Fragment, useState} from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';  
import clientAxios from '../../config/axios';


const NewClient = () =>{

    //client equal to state and save saveNewClient() into state
    const[client, saveNewclient] = useState({
        name: '',
        last_name: '',
        email: '',
        phone: ''
    })
    //read data from form
    const updateState = event =>{
          
        saveNewclient({
            //get copy from current state 
            ...client,
            [event.target.name] : event.target.value
        })

    //   console.log(client);
    } 
    let navigate = useNavigate(); 
    //Add to RESTAPI newClient 
    const handleSubmit = event =>{
        event.preventDefault();

        //send request to axios
        clientAxios.post('clients', client)
        .then(res =>{
            console.log(res.data);
            //Send Alert
            Swal.fire(
                'Se ha agregado el cliente',
                // res.data.message,
                'success'
              )
            //Redirection
            navigate("/", { replace: true })

        })
    } 

    //validate form
    const validateForm = () =>{
        //Destructuring
        const{name, last_name, email, phone}  = client;
        //chek if properties of state have value
        let validate = !name.length || !last_name.length || !email.length || !phone.length;
        //return true or false
        return validate;

    }  

    return(
        <Fragment>

            <h1>Nuevo Cliente</h1>

            <form
                onSubmit={handleSubmit}
                
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                    placeholder="Nombre Cliente" 
                    name="name"
                    onChange={updateState}
                     />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                    placeholder="Apellido Cliente" 
                    name="last_name"
                    onChange={updateState}
                     />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                    placeholder="Email Cliente" 
                    name="email"
                    onChange={updateState}
                     />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="phone" 
                    placeholder="Teléfono Cliente" 
                    name="phone"
                    onChange={updateState}
                     />
                </div>

                <div className="enviar">
                        <input type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Cliente" 
                        disabled={validateForm()} 
                        />
                </div>

            </form>
        </Fragment>
    )
} 

export default NewClient;
