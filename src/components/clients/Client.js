import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import clientAxios from '../../config/axios';

const Client = ({client}  ) =>{
    // console.log(props.client.name);

    const {_id, name, last_name, email, phone} = client; 
    // console.log(client);

    const deleteClient = idClient => {
        console.log('deleted...', idClient);

        Swal.fire({
            title: '¿Está seguro?',
            text: "el cliente una vez eliminado no podrá recuperarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              //request axios delete
              clientAxios.delete(`/clients/${idClient}`)
              .then( error =>{
                  console.log(error);
                  Swal.fire(
                '¡Eliminado!',
                'El cliente ha sido eliminado',
                // 'success'
              )
              })

                
            }
          })

    }

    return(
        <li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">{name} {last_name}</p>
                        <p>Correo: {email}</p>
                        <p>Teléfono: {phone}</p>
                    </div>
                    <div className="acciones">
                        <Link to={`/clients/edit/${_id}`} className="btn btn-azul">
                            {/* <i className="fas fa-pen-alt"></i> */}
                            Editar 
                        </Link>
                        <button 
                        type="button" 
                        className="btn btn-rojo btn-eliminar"
                        onClick={() => deleteClient(_id)}
                        >
                            {/* <i className="fas fa-times"></i> */}
                            Eliminar 
                        </button>
                    </div>
                </li>
    )

}  

export default Client;