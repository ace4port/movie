import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

import { discoverURL } from './constants'

const MoviesContext = React.createContext({})

const MoviesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])

  const oldWishList = localStorage.getItem('wishlist')
  const list = oldWishList ? JSON.parse(oldWishList) : []
  const [wishlist, setWishlist] = useState(list)

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true)
      try {
        const res = await axios.get(discoverURL)
        const data = await res.data
        if (data.results) {
          setMovies(data?.results)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    getMovies()
  }, [])

  const addToWishlist = (id) => {
    const movie = movies.find((movie) => movie.id === parseInt(id))
    const newList = [...wishlist, movie]

    setWishlist(newList)

    localStorage.setItem('wishlist', JSON.stringify(newList))

    alert('Added to wishlist')
  }

  return (
    <MoviesContext.Provider
      value={{
        loading,
        movies,
        setLoading,

        wishlist,
        addToWishlist,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}

export const useMoviesContext = () => useContext(MoviesContext)
export { MoviesContext, MoviesProvider }
