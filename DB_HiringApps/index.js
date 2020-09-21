const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const accountRouter = require('./src/routers/account')
const projectRouter = require('./src/routers/project')
const freelancersRouter = require('./src/routers/freelancers')
const recruitersRouter = require('./src/routers/recruiters')
const experienceRouter = require('./src/routers/experience')
const hiringAppsRouter = require('./src/routers/hiringApps')

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/account', accountRouter)
app.use('/project', projectRouter)
app.use('/freelancers', freelancersRouter)
app.use('/recruiters', recruitersRouter)
app.use('/experience', experienceRouter)
app.use('/hiringapps', hiringAppsRouter)

app.listen(8080, () => {
  console.log('App listen on port 8080!')
})

app.get('/', (_request, response) => {
  response.send('EXAM WEEK 7 - BEGINNER BACK-END')
})
