const db = require('../helper/db')

module.exports = {
  addSkillModel: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO skill_freelancers SET ?', data, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  updateSkillModel: (idSkillFE, data) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE skill_freelancers SET ${data} WHERE id_skillfreelancer=${idSkillFE}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  deleteSkillModel: (idAccount, idSkill) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM skill_freelancers WHERE id_account=${idAccount} && id_skill=${idSkill}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
