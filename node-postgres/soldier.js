const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cs_077_120_126',
  password: 'testing123', /* replace with your password*/
  port: 5432,
});
const getSoldiers = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM soldier ORDER BY msn ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createSoldier = (body) => {
    return new Promise(function(resolve, reject) {
      const {msn,name,dob,height,weight,gender,rank,speciality} = body
      pool.query('INSERT INTO soldier (msn,name,dob,height,weight,gender,rank,speciality) VALUES ($1, $2,$3,$4,$5,$6,$7,$8) RETURNING *', [msn,name,dob,height,weight,gender,rank,speciality], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new merchant has been added added: ${results.rows[0]}`)
      })
    })
  }
  const deleteSoldier = () => {
    return new Promise(function(resolve, reject) {
      const msn = request.params.msn
      pool.query('DELETE FROM soldier WHERE msn = $1', [msn], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Soldier deleted with MSN: ${msn}`)
      })
    })
  }
  const getonedep = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT msn,name FROM soldier WHERE EXISTS (SELECT * FROM dependents WHERE msn=msn_of_sol) ;', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const getSoldierHQ = () => {
    return new Promise(function(resolve, reject) {
      const hq = request.params.hq
      pool.query('Select msn from (soldier join regiment on msn=s_msn) where hqcity = $1', [hq], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows)
      })
    })
  }
  module.exports = {
    getSoldiers,
    createSoldier,
    deleteSoldier,
    getonedep,
    getSoldierHQ,
  }

