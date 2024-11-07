import next from 'next'

const NODE_ENV = process.env.NODE_ENV
const DEV = NODE_ENV !== 'production'

export const nextApp = next({
  dev: DEV,
})

export const nextHandler = nextApp.getRequestHandler()