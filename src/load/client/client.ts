import createClient from 'openapi-fetch'
import { paths } from './__generated__/v1'

export const { GET, PUT, POST } = createClient<paths>({
  baseUrl: 'https://rock.aucklandev.co.nz/',
  headers: { 'Authorization-Token': `${process.env.ROCK_API_TOKEN}` }
})
