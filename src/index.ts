import express, { json } from 'express'
import { createServer } from 'http'
import { middleware } from 'express-openapi-validator'
import logger from 'morgan'
// ENDPOINTS HANDLERS
import {
  setHeaders,
  handleTest,
  sendMsg,
  receiveMsg
} from './handlers'

const app = express()

// = CORS headers ==============
// Avoid origin checks hassle if the frontend is not served from the same domain as the backend
app.use(setHeaders)

// = LOGGER ====================
// Will log incoming requests in the console.
app.use(logger('dev'))

// = BODY PARSERS ==============
// HTTP request load (the "body" part) can be formatted in many ways. Parsers makes the content accessible for the application.

// application/json -- actually the only format we use (apart from the raw text which works without a dedicated parser)
app.use(json())

// = SOME STATIC CONTENT ===============
// Following URLs respond with the content of some local static file

// Server should provide a trivial test page at address localhost:3333/status (suits for quick test if the API Server works)
app.use('/status', express.static('status.html'))

// = API SUPPORT ================

// validator -- controls that requests and responses fulfill the specification
app.use(
  middleware({
    apiSpec: 'api-spec.yaml',
    validateApiSpec: true,
    validateRequests: true,
    validateResponses: true,
    fileUploader: false // we don't need a support for multipart/data-form
  })
)

// All API endpoints starts with this prefix -- it make sense to put the API on a dedicated path to avoid collisions
// with other resources available on this server.
// KEEP IN SYNC with the servers.url in the API specification (we should just read it from there but
// we want keep it simple)
const baseAPIPath = '/api/maja'

app.post(baseAPIPath + '/test', handleTest)

// ... other handlers you write
// use app.get(baseAPIPath + <endpoint_url>, yourHandler) for GET method
// use app.post(baseAPIPath + <endpoint_url>, yourHandler) for POST methods

//jj. End-point for the Rick and Morty character list 
app.post(baseAPIPath + '/resp', sendMsg);

//.jj Listener for the update's form client
app.post(baseAPIPath + '/hello', receiveMsg);

// = ERRORS HANDLER ===================
// Should remain as the last use-ed handler to catch errors that happened in previous handlers
// app.use((
//   err,
//   // req, 
//   res,
//   // next
// ) => {
//   // Wrap errors in some common form response (we use a JSON with known fields)
//   res.status(err.status || 500).json({
//     message: err.message,
//     errors: err.errors
//   })
// })

// = START THE SERVER ===============
const port = 3333

createServer(app).listen(port)
console.log(`API Server works at http://localhost:${port}`)
console.log(`Try open http://localhost:${port}/status in your browser to see the status page.`)

export default app