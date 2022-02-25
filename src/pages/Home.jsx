import React, { useState } from 'react'

import { useMoviesContext } from '../context'
import { useDebounce } from '../helper/useDebounce'

import { Page, Search, Card, Container } from '../styled'
import { imageURL, searchURL } from '../constants'

const MoviesList = () => {
  const [searchRes, setSearchRes] = useState([])
  const [search, setSearch] = useState('')

  const [searchLoading, setSearchLoading] = useState(false)

  const { movies, loading } = useMoviesContext()

  const handleChange = (e) => {
    const next = e.target.value
    setSearch(next)
    setSearchLoading(true)
    debouncedSearch(next)
  }

  const debouncedSearch = useDebounce((val) => handleAPI(val), 500)

  const handleAPI = async (val) => {
    await fetch(searchURL(val))
      .then((res) => res.json())
      .then((data) => setSearchRes(data?.results))
      .then(() => setSearchLoading(false))
  }

  return (
    <Page>
      <Search type="text" value={search} onChange={handleChange} placeholder="Search" />

      {searchLoading && <h5>Loading search items</h5>}

      {searchRes && !searchRes.length ? (
        <h2>No search results ...</h2>
      ) : (
        <>
          <h2>Search results:</h2>
          <Container>{searchRes && searchRes.map((movie) => <MovieItem key={movie.id} movie={movie} />)}</Container>
        </>
      )}

      <h1 className="section-title">Movies</h1>

      {loading && <h1>Loading...</h1>}

      <Container>
        {movies && movies[0] && movies.map((movie) => <MovieItem key={movie.id} movie={movie} />)}

        {!movies && <h2 className="section-title">No movies found</h2>}
      </Container>
    </Page>
  )
}

export default MoviesList

export const MovieItem = ({ movie }) => {
  const { addToWishlist } = useMoviesContext()

  const handleCLick = (e) => {
    e.preventDefault()
    addToWishlist(movie.id)
  }

  return (
    <Card to={`/movie/${movie.id}`}>
      <img src={imageURL + movie.poster_path} alt={movie.title} />

      <div className="desc">
        <h2>{movie.title}</h2>
        {/* <p>Genre: {movie.genre_ids}</p> */}
        {/* <p>Id: {movie.id}</p> */}
        {/* <p>Overview: {movie.overview}</p> */}
        <p>Release: {movie.release_date}</p>
        <p>
          Vote: {movie.vote_average}
          {/* Vote: {movie.vote_average} from {movie.vote_count} votes */}
        </p>

        <button onClick={handleCLick}>Add to wishlist</button>
      </div>
    </Card>
  )
}
