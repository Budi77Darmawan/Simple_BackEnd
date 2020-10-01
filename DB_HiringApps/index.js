const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const accountRouter = require('./src/routers/account')
const projectRouter = require('./src/routers/project')
const freelancersRouter = require('./src/routers/freelancers')
const recruitersRouter = require('./src/routers/recruiters')
const experienceRouter = require('./src/routers/experience')
const portofolioRouter = require('./src/routers/portofolio')
const skillRouter = require('./src/routers/skill')
const hireprojectRouter = require('./src/routers/hire_project')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/account', accountRouter)
app.use('/project', projectRouter)
app.use('/freelancers', freelancersRouter)
app.use('/recruiters', recruitersRouter)
app.use('/experience', experienceRouter)
app.use('/portofolio', portofolioRouter)
app.use('/skill', skillRouter)
app.use('/hireproject', hireprojectRouter)
app.use(cors())
app.use('/images', express.static('src/uploads'))

app.use((req, response, next) => {
  response.header('Acces-Control-Allow-Origin', '*')
  response.header('Acces-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

app.listen(8080, () => {
  console.log('App listen on port 8080!')
})

app.get('/', (_request, response) => {
  response.send('EXAM WEEK 7 - BEGINNER BACK-END')
})
