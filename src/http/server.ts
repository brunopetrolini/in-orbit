import fastify from 'fastify'
import { createGoal } from '../functions/create-goal'
import z from 'zod'

const app = fastify()

const createGoalBodySchema = z.object({
  title: z.string(),
  desiredWeeklyFrequency: z.number(),
})

app.post('/goals', async request => {
  const body = createGoalBodySchema.parse(request.body)

  await createGoal({
    title: body.title,
    desiredWeeklyFrequency: body.desiredWeeklyFrequency,
  })
})

app
  .listen({
    port: 3030,
  })
  .then(address => console.log(`Server listening on ${address} 🚀`))
