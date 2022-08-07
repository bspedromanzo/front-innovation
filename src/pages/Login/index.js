import React, { useState, useEffect } from 'react';
import './login.css'
import { Card } from 'react-bootstrap'
import logo from '../../image/logo.png'
import api from '../../service/api'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const submitForm = async (e) => {
        e.preventDefault();

        await api.post("/Logar", {
            email: email, password: password
        }).then(response => {
            if (response.data.code == 400) {
                setErrMsg('E-mail ou senha inválido');
            } else {
                sessionStorage.setItem('token', response.data.token)
                sessionStorage.setItem('id', response.data.id)
                sessionStorage.setItem('userType', response.data.type)
                window.location.href = '/produtos'
            }

        }).catch(err => {


        })

    }

    return (
        <div className='loginContainer'>
            <Card style={{ width: '50rem', height: '45rem' }}>
                <div className='modalContainer'>
                    <div className='imgContainer'>
                        <img className='loginImg' src={logo} />
                    </div>
                    <div className='dateContainer'>
                        <div className="titleContainer">
                            <h1>Bem vindo</h1>
                        </div>
                        <div className="errorContainer">
                            <span>{errMsg}</span>
                        </div>
                        <form onSubmit={submitForm} className="input">
                            <input
                                className="inputLog"
                                aria-label="email"
                                placeholder="E-mail"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={e => setEmail(e.target.value)}
                                name="email"
                                value={email}
                            />
                            <input
                                type='password'
                                className="inputLog"
                                placeholder="Senha"
                                onChange={e => setPassword(e.target.value)}
                                name="password"
                                value={password}
                            />
                            <div className="buttonLogin">
                                <button className="buttonSecundary" >
                                    Acessar
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </Card >
        </div >
    )
}

export default Login