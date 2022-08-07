import { useEffect, useState } from 'react';
import React from 'react'
import './header.css'
import { Navbar, Container, Form } from 'react-bootstrap';
import { FiBell } from "react-icons/fi";
import api from '../../service/api';
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'
import Badge from '@mui/material/Badge';

const Header = () => {
    const user_id = sessionStorage.getItem('id');

    const [userName, setUserName] = useState();

    useEffect(() => {
        api
            .get("/Colaborador/" + user_id)
            .then((response) => {
                setUserName(response.data.name)
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);

    return (
        <Navbar className='Navbar' expand="lg">
            <Container fluid>
                <Form className="d-flex">

                </Form>

                <div className="d-flex">
                    <div className='iconContainer'>
                        <div className='iconBell'>
                            <Badge badgeContent={0} color="primary">
                                <FiBell />
                            </Badge>
                        </div>
                    </div>
                    <div className='lineVertical'>
                        <span >|</span>
                    </div>

                    <DropdownButton
                        as={ButtonGroup}
                        key={'down'}
                        id={`dropdown-button-drop-${'down'}`}
                        drop={'down'}
                        title={
                            <div className="userContainer-menu">
                                <span>{userName}</span>
                            </div>
                        }
                        bsPrefix="userContainer-menu"
                    >
                        <Dropdown.Item eventKey="1" href="/perfil">Perfil</Dropdown.Item>
                        <Dropdown.Item eventKey="1" href="/alterar-senha">Alterar Senha</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="3" onClick={() => {
                            sessionStorage.removeItem('token')
                            sessionStorage.removeItem('id');
                            sessionStorage.removeItem('userType');
                        }} href="/">Sair</Dropdown.Item>
                    </DropdownButton>
                </div>
            </Container>
        </Navbar>
    )
}

export default Header