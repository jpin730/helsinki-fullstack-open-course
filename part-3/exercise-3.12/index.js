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
console.log(mongoDbUri)

if (personName && !personNumber) {
  console.log('Please provide the number as an argument: node index.js <password> <name> <number>')
  process.exit(1)
}

if (personName && personNumber) {
  console.log(`added ${personName} number ${personNumber} to phonebook`)
  process.exit(0)
}

console.log(password)
