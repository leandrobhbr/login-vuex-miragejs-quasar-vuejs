// import { create } from 'core-js/fn/object'
import { createServer, Model, Response } from 'miragejs'

export function makeServer ({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model
    },

    seeds (server) {
      server.create('user', {
        id: '1',
        email: 'user1@gmail.com',
        password: '124578',
        name: 'User 1',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbW9uaXRvcmFjb3ZpZC51Zm1nLmJyXC9iYWNrZW5kN1wvcHVibGljXC9hcGlcL3YxXC9taW5oYXVmbWciLCJpYXQiOjE2MTI5MDUxNDgsImV4cCI6MTYxMjkwODc0OCwibmJmIjoxNjEyOTA1MTQ4LCJqdGkiOiJ5WHdwMTRzSlp3cU9rdHVqIiwic3ViIjoyMjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.OvJ8DGyACWnWWcJFpiKtEa7duP7RTyzP1jLGFP_6fyE1'
      })
      server.create('user', {
        id: '2',
        email: 'user2@gmail.com',
        password: '124578',
        name: 'User 2',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbW9uaXRvcmFjb3ZpZC51Zm1nLmJyXC9iYWNrZW5kN1wvcHVibGljXC9hcGlcL3YxXC9taW5oYXVmbWciLCJpYXQiOjE2MTI5MDUyNDUsImV4cCI6MTYxMjkwODg0NSwibmJmIjoxNjEyOTA1MjQ1LCJqdGkiOiJPd2pGWnhQdkpsMFFmeU9UIiwic3ViIjoyMjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.tJTECYfA4M7TRipDDQHq62aPwl2_kCX26IXqWcTtPuM2'
      })
    },

    routes () {
      this.namespace = 'api'

      this.post('/login', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        const logar = schema.users.findBy({ email: attrs.email, password: attrs.password })
        if (logar === null) {
          return new Response(500, {}, { error: 'Error: email or password.' })
        }
        return logar
      })
      this.get('/list_users', (schema) => {
        return schema.users.all()
      })
    }
  })
  return server
}
