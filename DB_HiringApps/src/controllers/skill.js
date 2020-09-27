const {
  addSkillModel,
  updateSkillModel,
  deleteSkillModel
} = require('../models/skill')

module.exports = {
  addSkill: async (req, res) => {
    try {
      const { idAccount } = req.query
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
      const { idAccount } = req.query
      const { idSkill } = req.body
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
      const { idAccount } = req.query
      const { idSkill } = req.body
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
