import 'dotenv/config'
import axios from 'axios'
import fs from 'node:fs'

const client = axios.create({
  baseURL: 'https://rock.aucklandev.co.nz/api',
  timeout: 60000,
  headers: { 'Authorization-Token': `${process.env.ROCK_API_TOKEN}` }
})

async function downloadSchema() {
  const REST_CONTROLLER_NAMES = ['Groups', 'GroupTypes', 'People']
  // const REST_CONTROLLER_NAMES = (await client.get(
  //   '/RestControllers/RestControllerNames?includeObsolete=false'
  // )).data

  const definitionsAndPathsArr = await Promise.all(
    REST_CONTROLLER_NAMES.map(async (name: string) => {
      const schema = await client.get(`/doc/v1?controllerName=${name}`)
      console.log(name)
      return { definitions: schema.data.definitions, paths: schema.data.paths }
    })
  )

  const definitionsAndPaths = definitionsAndPathsArr.reduce(
    function (accumulator, currentValue) {
      return {
        definitions: Object.assign(
          accumulator.definitions,
          currentValue.definitions
        ),
        paths: Object.assign(accumulator.paths, currentValue.paths)
      }
    },
    { definitions: {}, paths: {} }
  )

  const swagger = {
    swagger: '2.0',
    info: {
      version: 'v1',
      title: 'Rock Rest API v1'
    },
    host: 'rock.aucklandev.co.nz',
    schemes: ['https'],
    ...definitionsAndPaths
  }

  const req = await axios.post(
    'https://converter.swagger.io/api/convert',
    swagger
  )

  fs.writeFileSync('./swagger.json', JSON.stringify(req.data, null, 2))
}

downloadSchema()
