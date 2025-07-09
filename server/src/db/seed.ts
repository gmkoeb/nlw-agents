/** biome-ignore-all lint/suspicious/noConsole: only used in dev */
import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

await reset(db, schema)

await seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 8,
      columns: {
        name: f.companyName(),
        description: f.jobTitle(),
        createdAt: f.date({ minDate: "2025-06-01", maxDate: "2025-07-09" }),
      },
    },
    questions: {
      count: 80,
    },
  }
})

await sql.end()

console.log('Database Seeded')
