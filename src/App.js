import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import Home from './pages/Home'
import Movie from './pages/Movie'

const WishList = () => Home
const NotFound = () => <h1>404: Invalid route</h1>

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/whishlist" element={<WishList />} />
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
      <NavLink to="/">Movies</NavLink>
      <NavLink to="/whishlist">WishList</NavLink>
      <p>Person icon</p>
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background: #2f22c4;
  z-index: 1;
  gap: 2rem;
  font-size: 1.5rem;
  a {
    color: white;
    text-decoration: none;
  }
`
