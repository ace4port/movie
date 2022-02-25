import debounce from 'lodash.debounce'
import React, { useCallback, useState } from 'react'
import { useMoviesContext } from '../context'
import { Page, Search, Card, Container } from '../styled'

const url = 'https://image.tmdb.org/t/p/w300'

const Home = () => {
  return <MoviesList />
}

export default Home

const useDebounce = (cb, delay) => {
  /* eslint-disable-next-line */
  const debouncedFn = useCallback(
    debounce((...args) => cb(...args), delay),
    [delay]
  )
  return debouncedFn
}

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
    await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=ba5a4f22e4ed5be8a9cbec812c6fa695&language=en-US&query=${val}&page=1&include_adult=false`
    )
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
          <h2>Search results ...</h2>
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

export const MovieItem = ({ movie }) => {
  const { addToWishlist } = useMoviesContext()

  const handleCLick = (e) => {
    e.preventDefault()
    addToWishlist(movie.id)
    alert('Added to wishlist')
  }

  return (
    <Card href={`/movie/${movie.id}`}>
      <img src={url + movie.poster_path} alt={movie.title} />

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
