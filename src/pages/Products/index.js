import { useState, useEffect } from "react";
import React from 'react'
import './createProducts.css';
import { Card, Button, Offcanvas } from "react-bootstrap";
import api from "../../service/api";
import Form from 'react-bootstrap/Form';
import TableProducts from '../TableProducts'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';

const Products = () => {

    const [category, setCategory] = useState([]);
    const [marks, setmarks] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        api
            .get("/TodasCategorias")
            .then((response) => {
                setCategory(response.data);
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);

    useEffect(() => {
        api
            .get("/TodasMarcas")
            .then((response) => {
                setmarks(response.data);
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
            name: data.product,
            category_id: Number(data.categoryProduct),
            mark_id: Number(data.markProduct),
            value: Number(data.valueProduct),
            stock: Number(data.stockProduct)
        }

        api.post("/CadastrarProduto", dados);

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
                    {'Novo produto'}
                </Button>
                <Offcanvas show={show} onHide={handleClose} {...props}>
                    <Offcanvas.Header >
                        <Offcanvas.Title>Novo produto</Offcanvas.Title>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}>X</button>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <form className="input" onSubmit={submitForm}>
                            <div className="divCadastro">
                                <InputLabel htmlFor="product">Nome do produto *</InputLabel>
                                <input
                                    required
                                    id="product"
                                    name="product"
                                    className="inputCadastro"
                                />
                            </div>
                            <div className="divCadastro">
                                <InputLabel htmlFor="modelVehicle">Categoria *</InputLabel>
                                <Form.Select
                                    name='categoryProduct'
                                    className="inputCadastro"
                                >
                                    <option value='' >Selecione uma categoria</option>
                                    {category.map(k => {
                                        return (
                                            <option value={k['id']}>{k['name']}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>

                            <div className="divCadastro">
                                <InputLabel htmlFor="modelVehicle">Marca *</InputLabel>
                                <Form.Select
                                    name='markProduct'
                                    className="inputCadastro"
                                >
                                    <option value='' >Selecione uma marca</option>
                                    {marks.map(k => {
                                        return (
                                            <option value={k['id']}>{k['name']}</option>
                                        )
                                    })}
                                </Form.Select>
                            </div>

                            <div className="divCadastro">
                                <InputLabel htmlFor="valueProduct">Valor *</InputLabel>
                                <input
                                    required
                                    id="valueProduct"
                                    name="valueProduct"
                                    className="inputCadastro"
                                />
                            </div>
                            <div className="divCadastro">
                                <InputLabel htmlFor="stockProduct">Estoque *</InputLabel>
                                <input
                                    required
                                    name="stockProduct"
                                    id="stockProduct"
                                    className="inputCadastro"
                                />
                            </div>

                            <div className="buttonLogin">
                                <button className="buttonSecundary" >
                                    Cadatrar produto
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
                        <h3>Produtos</h3>
                    </div>
                    <div>
                        <OffCanvasExample key={0} placement={'end'} name={'end'} />
                    </div>
                </div>
                <Card style={{ width: '100%', height: '135vh', borderRadius: '10px', padding: '10px' }}>
                    <TableProducts />
                </Card>
            </div >
        </>
    )
}

export default Products