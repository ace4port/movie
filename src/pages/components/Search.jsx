import React, { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

const Search = () => {
  const [search, setSearch] = useState()
  const [queryResults, setQueryResults] = useState([])

  const handler = useCallback(debounce(searchAPI(), 500), [])

  const handleChange = (e) => {
    setSearch(e.target.value)
    handler(search)
  }

  useEffect(() => {
    const fetch = async fetchData(search), [search])

  }, [search])

  return (
    <div>
      Search
      <input type="text" value={search} onChange={handleChange} />
    </div>
  )
}

export default Search
