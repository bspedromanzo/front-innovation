import { useState, useEffect } from "react";
import React from 'react'
import './profile.css';
import { Card } from "react-bootstrap";
import api from "../../service/api";
import InputLabel from '@mui/material/InputLabel';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Profile = () => {
    const user_id = sessionStorage.getItem('id');

    const [collaborator, setCollaborator] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        api
            .get("/Colaborador/" + user_id)
            .then((response) => {
                setCollaborator(response.data)
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        var dados = {
            id: user_id,
            name: data.nameCollaboratorProfile,
            email: data.emailCollaboratorProfile,
        }

        console.log(user_id)

        api.put("/AtualizarColaborador", dados);

        // setOpen(true)
        // setTimeout(function () {
        //     window.location.reload(1);
        // }, 3000);
    }

    function Loading() {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
        <>
            <Loading />
            <div className='orderedContainer'>
                <div className="titleAndButton">
                    <div>
                        <h3>Perfil do colaborador</h3>
                    </div>
                </div>
                <Card style={{ width: '100%', height: '135vh', borderRadius: '10px', padding: '10px' }}>
                    <form className="input" onSubmit={submitForm}>
                        <div className="divCadastro">
                            <InputLabel htmlFor="nameCollaboratorProfile">Nome *</InputLabel>
                            <input
                                required
                                id="nameCollaboratorProfile"
                                name="nameCollaboratorProfile"
                                className="inputCadastro"
                                defaultValue={collaborator['name']}
                            />
                        </div>

                        <div className="divCadastro">
                            <InputLabel htmlFor="emailCollaboratorProfile">E-mail</InputLabel>
                            <input
                                name="emailCollaboratorProfile"
                                id="emailCollaboratorProfile"
                                className="inputCadastro"
                                defaultValue={collaborator['email']}
                            />
                        </div>

                        <div className="buttonLogin">
                            <button className="buttonSecundary" >
                                Atualizar cadastro
                            </button>
                        </div>
                    </form>
                </Card>
            </div >
        </>
    )
}

export default Profile