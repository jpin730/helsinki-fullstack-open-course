const express = require('express')
const app = express()

app.get('/', (_, response) => {
  response.send('Hello  World!')
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
