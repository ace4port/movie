import { getMovieKey } from './helper'

const url = 'https://api.themoviedb.org/3'

export const discoverURL = `${url}/discover/movie?api_key=${getMovieKey()}`

export const imageURL = 'https://image.tmdb.org/t/p/w300'

export const searchURL = (query) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${getMovieKey()}&language=en-US&query=${query}&page=1&include_adult=false`

export const getImageURL = (id) => `${url}/movie/${id}/images?api_key=${getMovieKey()}`

export const getVideoURL = (id) => `${url}/movie/${id}/videos?api_key=${getMovieKey()}`

export const getCreditImgURL = (id) => `${url}/movie/${id}/credits?api_key=${getMovieKey()}`
