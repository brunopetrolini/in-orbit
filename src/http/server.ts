import fastify from 'fastify'
import { createGoal } from '../functions/create-goal'
import z from 'zod'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.post(
  '/goals',
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number(),
      }),
    },
  },
  async request => {
    const { title, desiredWeeklyFrequency } = request.body
    await createGoal({ title, desiredWeeklyFrequency })
  }
)

app
  .listen({
    port: 3030,
  })
  .then(address => console.log(`Server listening on ${address} 🚀`))
