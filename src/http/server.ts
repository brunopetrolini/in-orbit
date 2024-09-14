import fastify from 'fastify'
import { createGoal } from '../functions/create-goal'
import z from 'zod'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'

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

app.get('/goals/week-pending', async () => {
  const { pendingGoals } = await getWeekPendingGoals()
  return { pendingGoals }
})

app
  .listen({
    port: 3030,
  })
  .then(address => console.log(`Server listening on ${address} 🚀`))
