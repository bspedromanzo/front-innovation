import { useState, useEffect } from "react";
import React from 'react'
import './updatePassword.css';
import { Card } from "react-bootstrap";
import api from "../../service/api";
import InputLabel from '@mui/material/InputLabel';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const UpdatePassword = () => {
    const user_id = sessionStorage.getItem('id');

    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState('')

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const oldPass = data.passwordProfile
        const newPass = data.newPasswordProfile
        const confirmPass = data.confirmPasswordProfile

        if (newPass == confirmPass) {
            const dados = {
                id: user_id,
                password: data.newPasswordProfile
            }

            api.put("/AtualizarSenha", dados).then(response => {
                if (response.data.code == 400) {
                    setAlert(response.data.message)
                } else {
                    setOpen(true)
                    setTimeout(function () {
                        window.location.reload(1);
                    }, 3000);
                }
            });
        } else {
            setAlert('Nova senha não é igual a senha de confirmação')
        }

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
                        <h3>Alterar senha</h3>
                    </div>
                </div>
                <Card style={{ width: '100%', height: '135vh', borderRadius: '10px', padding: '10px' }}>
                    {alert !== '' ? (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="error" className="alertError">{alert}</Alert>
                        </Stack>
                    ) : ("")}
                    <form className="input" onSubmit={submitForm}>
                        <div className="divCadastro">
                            <InputLabel htmlFor="passwordProfile">Senha atual *</InputLabel>
                            <input
                                required
                                id="passwordProfile"
                                name="passwordProfile"
                                className="inputCadastro"
                                type='password'
                            />
                        </div>
                        <div className="divCadastro">
                            <InputLabel htmlFor="newPasswordProfile">Nova senha *</InputLabel>
                            <input
                                required
                                id="newPasswordProfile"
                                name="newPasswordProfile"
                                className="inputCadastro"
                                type='password'
                            />
                        </div>

                        <div className="divCadastro">
                            <InputLabel htmlFor="confirmPasswordProfile">Confirmar nova senha *</InputLabel>
                            <input
                                required
                                id="confirmPasswordProfile"
                                name="confirmPasswordProfile"
                                className="inputCadastro"
                                type='password'
                            />
                        </div>

                        <div className="buttonLogin">
                            <button className="buttonSecundary" >
                                Alterar senha
                            </button>
                        </div>
                    </form>
                </Card>
            </div >
        </>
    )
}

export default UpdatePassword