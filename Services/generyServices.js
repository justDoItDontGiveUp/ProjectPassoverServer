const db = require("../DataBase/db.js");

async function getAll(table) {
    const [rows] = await db.query("SELECT * FROM ??", [table]);
    return rows;
  }
  async function getobjectById(table,id) {
    const [rows] = await db.query("SELECT * FROM ?? WHERE id = ?", [table,id]);
    return rows[0];
  }

  async function createObject(table, data) {
    const [result] = await db.query(`INSERT INTO ?? SET ?`, [table, data]);
    return { id: result.insertId, ...data };
  }

  async function updateObject(table,id, data) {
    await db.query("UPDATE ?? SET ? WHERE id = ?", [table,data, id]);
    return { id, ...data };
  }
  

module.exports = {
  getAll,
  getobjectById,
  createObject,
  updateObject,
  updateObject,
 };
  