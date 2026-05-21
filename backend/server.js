import { app } from './src/app.js'
import { env } from './src/config/env.js'

app.listen(env.port, () => {
  console.log(`BrianE-Dev API running at http://localhost:${env.port}`)
})
