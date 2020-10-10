const PORT = 8080
const LOCALHOST = `http://localhost:${PORT}`
const HEROKU = 'https://cooked-server.herokuapp.com'

export default URL = HEROKU || LOCALHOST
