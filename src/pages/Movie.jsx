import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import { getCreditImgURL, getImageURL, getVideoURL, imageURL } from '../constants'
import { useMoviesContext } from '../context'
import { Page } from '../styled'

const Movie = () => {
  const id = useParams().id

  const [active, setActive] = useState(0)
  const [movie, setMovie] = useState({})

  const { movies, loading, addToWishlist } = useMoviesContext()

  useEffect(() => setMovie(movies.find((mov) => mov.id === parseInt(id))), [movies, id])
  return (
    <Page>
      {loading ? <div>Loading...</div> : <h1>{movie?.title}</h1>}

      <FlexA>
        {movie?.poster_path && <img src={`${imageURL}/${movie?.poster_path}`} alt={movie?.title} />}

        <Aside>
          <ButtonGroup>
            <button className={!active && 'active'} onClick={() => setActive(0)}>
              Description
            </button>
            <button className={active && 'active'} onClick={() => setActive(1)}>
              Cast
            </button>
            <button onClick={() => addToWishlist(id)}>Add to Watchlist</button>
          </ButtonGroup>

          <div>{active ? <Credits /> : <Description overview={movie?.overview} />}</div>
        </Aside>
      </FlexA>
    </Page>
  )
}

export default Movie

const Description = ({ overview }) => {
  const id = useParams().id
  const { movies, loading } = useMoviesContext()
  const [movie, setMovie] = useState({})
  useEffect(() => setMovie(movies.find((mov) => mov.id === parseInt(id))), [movies, id])

  const [details, setDetails] = useState({})
  const [video, setVideo] = useState({})

  useEffect(() => {
    const getMovieImg = async () => {
      const img = await axios.get(getImageURL(id))
      setDetails(img?.data.posters.slice(1, 6))
    }
    getMovieImg()
  }, [id])

  useEffect(() => {
    const getMovieVideo = async () => {
      const vdo = await axios.get(getVideoURL(id))
      setVideo(vdo?.data.results[0].key)
      console.log(vdo?.data.results[0].key)
    }
    getMovieVideo()
  }, [id])

  return (
    <div>
      {!movie || loading ? <h2>Loading ...</h2> : <p>{overview}</p>}

      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${video}?controls=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
        allowFullScreen
      ></iframe>

      <FlexImg>
        {details[0] &&
          details.map((img, id) => <img key={id} src={`${imageURL}/${img.file_path}`} alt="movie screenshots" />)}
      </FlexImg>
    </div>
  )
}

const Credits = () => {
  const id = useParams().id

  const [cast, setCast] = useState([])
  useEffect(() => {
    const getCredits = async () => {
      const cred = await axios.get(getCreditImgURL(id))
      setCast(cred.data.cast)
    }
    getCredits()
  }, [id])
  return (
    <Flex>
      {cast.slice(0, 5).map((cast) => (
        <div key={cast.id}>
          <img src={`${imageURL}/${cast.profile_path}`} alt={cast.name} />
          <p>{cast.name}</p>
        </div>
      ))}
    </Flex>
  )
}

const ButtonGroup = styled.div`
  display: flex;
  margin: 0 auto;
  button {
    margin: 0 10px;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
    color: #000;
    font-size: 1.2rem;
    cursor: pointer;
    &:hover {
      background: #ccc;
    }
    border-bottom: 2px solid inherit;
  }
  .active {
    border-bottom: 2px solid #00f;
  }
`

const FlexA = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  &:first-child {
    align-self: flex-start;
  }

  img {
    width: 300px;
  }
`

const Aside = styled.aside``

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;

  div {
    width: 200px;
  }

  img {
    width: 100%;
  }
`

const FlexImg = styled.div`
  display: flex;
  gap: 0 10px;
  img {
    width: 100px;
  }
`
