import React from 'react'
import { useMoviesContext } from '../context'
import { Container, Page } from '../styled'
import { MovieItem } from './Home'

const Wishlist = () => {
  const { wishlist } = useMoviesContext()
  return (
    <Page>
      <h1>Wishlist</h1>
      <Container>
        {wishlist.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </Container>
    </Page>
  )
}

export default Wishlist
