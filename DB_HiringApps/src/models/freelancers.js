const db = require('../helper/db')

module.exports = {
  listFreelancersModel: (searchKey, searchValue, jobDesc, statusJob, cityAddress, sort, typeSort, limit, offset) => {
    return new Promise((resolve, reject) => {
      let filter = ''
      if (!jobDesc) {
        filter = `jobDesc LIKE '%${''}%'`
      } else {
        filter = `jobDesc = '${jobDesc}'`
      }
      if (!statusJob) {
        filter += ` AND statusJob LIKE '%${''}%'`
      } else {
        filter += ` AND statusJob = '${statusJob}'`
      }
      if (!cityAddress) {
        filter += ` AND cityAddress LIKE '%${''}%'`
      } else {
        filter += ` AND cityAddress = '${cityAddress}'`
      }

      let order = ''
      if (sort) {
        order = `ORDER BY ${sort}`
      } else {
        order = 'ORDER BY id_account'
      }
      if (typeSort) {
        order += ` ${typeSort}`
      } else {
        order += ' ASC'
      }

      db.query(`SELECT A.id_account, A.name, F.jobDesc, F.statusJob, F.cityAddress, GROUP_CONCAT(S.skill_name) AS skill FROM account AS A INNER JOIN freelancers AS F ON A.id_account = F.id_account INNER JOIN skill_freelancers AS SF  ON F.id_account = SF.id_account INNER JOIN skill AS S ON SF.id_skill = S.id_skill WHERE ${searchKey} LIKE '%${searchValue}%' AND ${filter} GROUP BY SF.id_account ${order} LIMIT ${limit} OFFSET ${offset} `, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  updateFreelancersModel: (idAccount, data) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE freelancers SET ${data}, updateAt=CURRENT_TIMESTAMP WHERE id_account=${idAccount}`, (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
