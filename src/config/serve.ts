import { ServeConfig } from '../types'

export const Serve: ServeConfig = {
  host: '0.0.0.0',
  port: 9527,
  dire: '../plugins',
  plugins: ['index']
}