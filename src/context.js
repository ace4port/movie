import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

// const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
// const url = 'https://api.themoviedb.org/3/movie/550?api_key=ba5a4f22e4ed5be8a9cbec812c6fa695'
const url = 'https://api.themoviedb.org/3/discover/movie?api_key=ba5a4f22e4ed5be8a9cbec812c6fa695'

const AppContext = React.createContext()

const MoviesContext = React.createContext({
  // loading: false,
  // movies: [],
  // setSearch: () => {},
  // setLoading: () => {},
})

const MoviesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')

  const setSearchCallback = useCallback(
    async (search) => {
      setLoading(true)
      setSearch(search)
      try {
        const res = await fetch(`${url}${search}`)
        const data = await res.json()
        setMovies(data?.results)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    },
    // [search]
    []
  )

  useEffect(() => {
    setSearchCallback(search)
  }, [search, setSearchCallback])

  return (
    <MoviesContext.Provider
      value={{
        loading,
        movies,
        setSearch: setSearchCallback,
        setLoading,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('a')
  const [cocktail, setCocktail] = useState([])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${search}`)
      const data = await response.json()
      console.log(data)
      const { drinks } = data
      if (drinks) {
        const newDrinks = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item
          return { id: idDrink, name: strDrink, image: strDrinkThumb, info: strAlcoholic, glass: strGlass }
        })
        setCocktail(newDrinks)
        console.log(cocktail)
        setLoading(false)
      } else {
        setCocktail([])
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [search, cocktail])

  useEffect(() => {
    fetchData()
  }, [search, fetchData])

  return (
    <AppContext.Provider
      value={{
        loading,
        cocktail,
        setSearch,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

export const useMoviesContext = () => useContext(MoviesContext)
export { MoviesContext, MoviesProvider }
