import axios from 'axios'

export const client = axios.create({
  baseURL: 'https://api.fluro.io/',
  timeout: 60000,
  headers: { Authorization: `Bearer ${process.env.FLURO_API_TOKEN}` }
})
