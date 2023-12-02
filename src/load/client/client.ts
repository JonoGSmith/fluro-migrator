import axios from 'axios'

export const client = axios.create({
  baseURL: 'https://rock.aucklandev.co.nz/api',
  timeout: 60000,
  headers: { 'Authorization-Token': `${process.env.ROCK_API_TOKEN}` },
  withCredentials: true
})
