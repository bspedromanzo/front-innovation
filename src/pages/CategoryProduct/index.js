import { useState, useEffect } from "react";
import React from 'react'
import './categoryProduct.css';
import { Card, Button, Offcanvas, Modal } from "react-bootstrap";
import api from "../../service/api";
import TableClients from '../TableCategoryProduct'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';

const CategoryProduct = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const dados = {
            name: data.categoryProduct,
        }

        api.post("/CadastrarCategoria", dados);

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
                    {'Novo categoria'}
                </Button>
                <Offcanvas show={show} onHide={handleClose} {...props}>
                    <Offcanvas.Header >
                        <Offcanvas.Title>Novo categoria de produto</Offcanvas.Title>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}>X</button>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <form className="input" onSubmit={submitForm}>
                            <div className="divCadastro">
                                <InputLabel htmlFor="categoryProduct">Nome da categoria *</InputLabel>
                                <input
                                    required
                                    id="categoryProduct"
                                    name="categoryProduct"
                                    className="inputCadastro"
                                />
                            </div>

                            <div className="buttonLogin">
                                <button className="buttonSecundary" >
                                    Cadastrar categoria
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
                        <h3>Categoria dos produtos</h3>
                    </div>
                    <div>
                        <OffCanvasExample key={0} placement={'end'} name={'end'} />
                    </div>
                </div>
                <Card style={{ width: '100%', height: '135vh', borderRadius: '10px', padding: '10px' }}>
                    <TableClients />
                </Card>
            </div >
        </>
    )
}

export default CategoryProduct