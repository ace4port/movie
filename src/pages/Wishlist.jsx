import React from 'react'
import { imageURL } from '../constants'
import { useMoviesContext } from '../context'
import { Card, Container, Page } from '../styled'

const Wishlist = () => {
  const { wishlist } = useMoviesContext()
  return (
    <Page>
      <h1>Wishlist</h1>
      <Container>
        {!wishlist && <div>No movies in your wishlist</div>}

        {/* {wishlist && wishlist[0] && wishlist.map((movie) => <MovieItem key={movie?.id} movie={movie} />)} */}

        {wishlist &&
          wishlist[0] &&
          wishlist.map((movie) => (
            <Movie
              id={movie?.id}
              key={movie?.id}
              title={movie?.title}
              poster_path={movie?.poster_path}
              release_date={movie?.release_date}
              vote_average={movie?.vote_average}
            />
          ))}
      </Container>
    </Page>
  )
}

export default Wishlist

const Movie = ({ id, title, release_date, vote_average, poster_path }) => {
  return (
    <Card to={`/movie/${id}`}>
      <img src={`${imageURL}/${poster_path}`} alt={title} />

      <div className="desc">
        <h2>{title}</h2>
        <p>Release: {release_date}</p>
        <p>Vote: {vote_average}</p>
      </div>
    </Card>
  )
}
