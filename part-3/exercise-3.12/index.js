const mongoose = require('mongoose')

process.loadEnvFile()
let mongoDbUri = process.env.MONGODB_URI

if (!mongoDbUri) {
  console.log('Please provide the MongoDB URI as an environment variable: MONGODB_URI')
  process.exit(1)
}

const args = process.argv

if (args.length < 3) {
  console.log('Please provide the password as an argument: node index.js <password>')
  process.exit(1)
}

const password = args[2]
const personName = args[3]
const personNumber = args[4]

mongoDbUri = mongoDbUri.replace('<db_password>', password)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (personName && !personNumber) {
  console.log('Please provide the number as an argument: node index.js <password> <name> <number>')
  process.exit(1)
}

mongoose.set('strictQuery', false)

mongoose.connect(mongoDbUri, { family: 4 })

if (personName && personNumber) {
  const person = new Person({
    name: personName,
    number: personNumber
  })

  person.save().then(() => {
    console.log(`added ${personName} number ${personNumber} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log(password)
}
