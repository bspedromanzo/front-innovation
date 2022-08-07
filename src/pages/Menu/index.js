import React from 'react';
import './menu.css'
import logo from '../../image/logo.png'
import { AiOutlineTeam, AiOutlineBulb } from "react-icons/ai";
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';

const Menu = () => {
    const user_type = sessionStorage.getItem('userType');
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark" id="accordionSidebar">
            <div className="mb-2">
                <a className="titleLogo sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon">
                        <img className='menuImg' src={logo} />
                    </div>
                    <div className="mx-3">Painel de Gestão</div>
                </a>
            </div>

            <div className="mb-2">

                <Dropdown as={ButtonGroup}
                    key={'end'}
                    id={`dropdown-button-drop-${'end'}`}
                    drop={'end'}
                    variant="secondary"
                    className="drop-menu">
                    <Dropdown.Toggle id="dropdown-custom-1"><div><AiOutlineBulb className="icons" /> <span>Produtos / Serviços</span></div></Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                        <Dropdown.Item eventKey="1" href="/produtos">Cadastro de Produtos</Dropdown.Item>
                        {user_type == 'superadmin' ? (
                            <Dropdown.Item eventKey="3" href="/categoria-produto">Cadastro de categoria produto</Dropdown.Item>
                        ) : ("")}
                    </Dropdown.Menu>
                </Dropdown>

            </div>

            {user_type == 'superadmin' ? (
                <div className="mb-2">

                    <Button bsPrefix="button-menu" href="/colaboradores">
                        <div>
                            <AiOutlineTeam className="icons" />
                            <span> Colaboradores</span>
                        </div>
                    </Button>

                </div>
            ) : ("")}
        </ul>
    )
}

export default Menu