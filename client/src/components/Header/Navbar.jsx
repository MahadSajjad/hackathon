import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">

        <div className="container-fluid">
          <Link to="/" className="navbar-brand">DonationHub</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link to="/" className="nav-link active">Home</Link>
              </li>

              {/* Dropdown Menu for About */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle active"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  About
                </a>
                <ul className="dropdown-menu">
                  <li>
                  <Link to="/about/company" className="dropdown-item">About Company</Link>
                  </li>
                  <li>
                  <Link to="/about/team" className="dropdown-item">About Team</Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link to="/contact" className="nav-link active">Contact</Link>
              </li>
              <li className="nav-item">
                <Link to="/compaigns" className="nav-link active">Compaigns</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link active">Dashboard</Link>
              </li>

            </ul>

            <div className="d-flex">
              <Link to="auth/login" className="btn btn-success">Login</Link>
              <Link to="auth/register" className="btn btn-info ms-2">Register</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
