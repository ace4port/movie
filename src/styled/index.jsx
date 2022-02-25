import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 20px;
  
  min-height: calc(100vh - 60px);
  
  // Credits to Manuel Pinto   https://codepen.io/P1N2O/pen/pyBNzX 
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;

  @keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

export const Search = styled.input`
  padding: 10px;
  border-radius: 5px;
  margin: 2rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  border: 1px solid #ae3da2;
  background: #23a6d5;
  outline: none;

  transition: all 0.3s ease-in-out;
  &:focus {
    background: #ae3da2;
  }
`

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;

  button {
    margin-top: auto;
    margin-bottom: 2rem;
    background: #a0a000;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: #fff;
      color: #a0a000;
    }
  }
`

export const Card = styled(Link)`
  background-color: #0505a5aa;
  color: white;
  img {
    border-radius: 0.4rem;
  }
  border-radius: 2rem;
  margin: 10px;
  width: 200px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  position: relative;

  .desc {
    border-radius: 0.4rem;
    position: absolute;
    padding: 1rem;
    opacity: 0;

    height: 270px;
    transition: 0.5s ease;
    background-color: #008cba;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    .desc {
      opacity: 1;
    }
  }
`
