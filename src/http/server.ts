import fastify from 'fastify'

const app = fastify()

app
  .listen({
    port: 3030,
  })
  .then(address => console.log(`Server listening on ${address} 🚀`))
