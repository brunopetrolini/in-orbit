import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { env } from '../env'

const client = postgres(env.DATABASE_URL)
const db = drizzle(client, { schema, logger: true })

export { client, db }
