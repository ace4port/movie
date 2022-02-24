import React from 'react'
import styled from 'styled-components'
import { useMoviesContext } from '../context'

const url = 'https://image.tmdb.org/t/p/w500'

const Home = () => {
  const { movies, loading, setLoading } = useMoviesContext()

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (movies.length < 1) {
    setLoading(false)
    return <h2 className="section-title">No movies found</h2>
  }
  return (
    <div>
      <MoviesList movies={movies} />
    </div>
  )
}

export default Home

const MoviesList = ({ movies }) => {
  return (
    <Container>
      {/* {movies.slice(0, 1).map((movie) => ( */}
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
`

const MovieItem = ({ movie }) => {
  return (
    <Card href={`/movie/${movie.id}`}>
      <img src={url + movie.poster_path} alt={movie.title} />

      <div className="desc">
        <h4>{movie.title}</h4>
        <p>Genre: {movie.genre_ids}</p>
        <p>Id: {movie.id}</p>
        {/* <p>Overview: {movie.overview}</p> */}
        <p>Release date: {movie.release_date}</p>
        <p>
          Vote: {movie.vote_average} from {movie.vote_count} votes
        </p>
      </div>
    </Card>
  )
}

const Card = styled.a`
  background-color: #0505a5aa;
  color: white;
  * {
    border-radius: 0.4rem;
  }
  border-radius: 2rem;
  margin: 10px;
  width: 300px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .desc {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: 0.5s ease;
    background-color: #008cba;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  position: relative;
  &:hover {
    .desc {
      opacity: 1;
    }
  }
`
