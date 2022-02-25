import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import Home from './pages/Home'
import Movie from './pages/Movie'
import Wishlist from './pages/Wishlist'

import user from './styled/user.svg'

const NotFound = () => <h1>404: Invalid route</h1>

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

const Navbar = () => {
  return (
    <Nav>
      <div className="nav">
        <NavLink to="/">Movies</NavLink>
        <NavLink to="/wishlist">WishList</NavLink>
      </div>
      <img src={user} alt="user" />
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background: #008cba;
  z-index: 1;
  gap: 2rem;
  font-size: 1.5rem;
  .nav {
    margin-left: auto;
    margin-right: auto;
  }
  a {
    color: white;
    margin-left: 2rem;
    text-decoration: none;
  }

  > :last-child {
    justify-self: flex-end;
  }
`
