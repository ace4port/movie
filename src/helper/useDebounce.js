import { useCallback } from 'react'
import debounce from 'lodash.debounce'

export const useDebounce = (cb, delay) => {
  /* eslint-disable-next-line */
  const debouncedFn = useCallback(
    debounce((...args) => cb(...args), delay),
    [delay]
  )
  return debouncedFn
}
