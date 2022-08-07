import { useState, useEffect } from "react";
import React from 'react'
import './collaborators.css';
import { Card, Button, Offcanvas, Modal } from "react-bootstrap";
import api from "../../service/api";
import makeAnimated from 'react-select/animated';
import Form from 'react-bootstrap/Form';
import TableCollaborator from '../TableCollaborators'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';

const Collaborators = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        api.post("/CadastrarColaborador", {
            name: data.nameCollaborator,
            email: data.emailCollaborator,
            password: data.senhaCollaborator,
            type: data.typeCollaborator
        });
        setOpen(true)
        setTimeout(function () {
            window.location.reload(1);
        }, 3000);
    }

    const [open, setOpen] = useState(false);

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

    function OffCanvasExample({ ...props }) {
        return (
            <>
                <Loading />
                <Button variant="primary" onClick={handleShow} className="me-2 button">
                    {'Novo colaborador'}
                </Button>
                <Offcanvas show={show} onHide={handleClose} {...props}>
                    <Offcanvas.Header >
                        <Offcanvas.Title>Novo colaborador</Offcanvas.Title>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <form className="input" onSubmit={submitForm}>
                            <div className="divCadastro">
                                <InputLabel htmlFor="nameCollaborator">Nome *</InputLabel>
                                <input
                                    required
                                    id="nameCollaborator"
                                    name="nameCollaborator"
                                    className="inputCadastro"
                                />
                            </div>

                            <div className="divCadastro">
                                <InputLabel htmlFor="typeCollaborator">Tipo de colaborador *</InputLabel>
                                <Form.Select
                                    id='typeCollaborator'
                                    name='typeCollaborator'
                                    className="inputCadastro"
                                >
                                    <option value=''>Selecione um colaborador</option>
                                    <option value='superadmin'>Superadmin</option>
                                    <option value='collaborator'>Colaborador</option>
                                </Form.Select>
                            </div>

                            <div className="divCadastro">
                                <InputLabel htmlFor="senhaCollaborator">Senha *</InputLabel>
                                <input
                                    required
                                    id="senhaCollaborator"
                                    name="senhaCollaborator"
                                    className="inputCadastro"
                                />
                            </div>

                            <div className="divCadastro">
                                <InputLabel htmlFor="emailCollaborator">E-mail</InputLabel>
                                <input
                                    name="emailCollaborator"
                                    id="emailCollaborator"
                                    className="inputCadastro"
                                />
                            </div>

                            <div className="buttonLogin">
                                <button className="buttonSecundary" >
                                    Cadastrar colaborador
                                </button>
                            </div>
                        </form>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );

    }

    return (
        <>
            <div className='orderedContainer'>

                <div className="titleAndButton">
                    <div>
                        <h3>Colaboradores</h3>
                    </div>
                    <div>
                        <OffCanvasExample key={0} placement={'end'} name={'end'} />
                    </div>
                </div>
                <Card style={{ width: '100%', height: '135vh', borderRadius: '10px', padding: '10px' }}>
                    <TableCollaborator />
                </Card>
            </div >
        </>
    )
}

export default Collaborators