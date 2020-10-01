const {
  addSkillModel,
  updateSkillModel,
  deleteSkillModel
} = require('../models/skill')
const jwt = require('jsonwebtoken')

module.exports = {
  addSkill: async (req, res) => {
    try {
      let idAccount = ''
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, process.env.KEY_JWT, (error, result, response) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          response.status(403).send({
            success: false,
            message: error.message
          })
        } else {
          idAccount = result.idAccount
        }
      })
      const setData = {
        id_account: idAccount,
        ...req.body
      }
      await addSkillModel(setData)
      res.status(201).send({
        success: true,
        message: `Skill account id ${idAccount} has been added!`,
        data: setData
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  },

  updateSkill: async (req, res) => {
    try {
      const idSkillFE = req.params.id
      const { idSkill } = req.body
      let idAccount = ''
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, process.env.KEY_JWT, (error, result, response) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          response.status(403).send({
            success: false,
            message: error.message
          })
        } else {
          idAccount = result.idAccount
        }
      })
      const setData = {
        id_account: idAccount,
        id_skill: idSkill
      }
      const data = Object.entries(setData).map(item => {
        return `${item[0]}='${item[1]}'`
      })
      await updateSkillModel(idSkillFE, data)
      res.status(201).send({
        success: true,
        message: 'Skill has been update!',
        data: setData
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  },

  deleteSkill: async (req, res) => {
    try {
      const { idSkill } = req.body
      let idAccount = ''
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, process.env.KEY_JWT, (error, result, response) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          response.status(403).send({
            success: false,
            message: error.message
          })
        } else {
          idAccount = result.idAccount
        }
      })
      await deleteSkillModel(idAccount, idSkill)
      res.status(201).send({
        success: true,
        message: 'Skill has been delete!'
      })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Bad request'
      })
    }
  }
}
