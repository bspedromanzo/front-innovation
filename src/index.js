import React from 'react'
import './index.css'
import Routes from './Routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import Helmet from 'react-helmet'
import { createRoot } from 'react-dom/client';
import logo from './image/logo.png'
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <>
    <Helmet>
      <title>Painel Administrativo</title>
      <meta name="description" content="Painel Administrativo" />
      <meta property="og:title" content="Painel Administrativo" />
      <meta property="og:description" content="Painel Administrativo" />

      <meta property="og:image" content={logo} />

    </Helmet>
    <Routes />
  </>,
)
