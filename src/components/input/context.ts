import { createContext, useContext } from 'react'

import { Context } from './types'

const InputContext = createContext<Context | null>(null)

export const useInput = () => {
  const context = useContext(InputContext)
  if (!context) {
    throw new Error(
      'Input components cannot be rendered outside the InputProvider',
    )
  }
  return context
}

export default InputContext
