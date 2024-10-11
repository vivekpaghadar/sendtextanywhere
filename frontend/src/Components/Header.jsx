import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {

    return (
        <div className='Header'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme={props.theme}>
                <div className="container-fluid ms-3">
                    <div className="navbar-container">
                        <img src='./logo.png' style={{ height: '28px', width: '28px' }} alt="Logo" />
                        <Link className="navbar-brand fs-5" to="/">SendTextAnywhere</Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item fs-8 ms-3">
                                <Link className="nav-link" to="/about">About Us</Link>
                            </li>
                            <li className="nav-item fs-8 ms-3">
                                <Link className="nav-link" to="/privacy">Privacy</Link>
                            </li>
                            <li className="nav-item fs-8 ms-3">
                                <Link className="nav-link" to="/contect">Contect Us</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item fs-8">
                                <Link className="nav-link" to="/livechat">LiveChat</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
