const db = require("../DataBase/db.js");

async function getAll(table) {
    const [rows] = await db.query("SELECT * FROM ??", [table]);
    return rows;
  }
  async function getObjectById(table,id) {
    const [rows] = await db.query("SELECT * FROM ?? WHERE id = ?", [table,id]);
    return rows[0];
  }

  async function getObjectByUserId(table,UserId) {
    const [rows] = await db.query("SELECT * FROM ?? WHERE id = ?", [table,UserId]);
    return rows[0];
  }

  async function getObjectsByField(table, Field, value) {
    const [rows] = await db.query(`SELECT * FROM ?? WHERE ?? = ?`, [table, Field, value]);
    return rows;
  }

  async function createObject(table, data) {
    const [result] = await db.query(`INSERT INTO ?? SET ?`, [table, data]);
    console.log("I entered to createObject");
    return { id: result.insertId, ...data };

  }

  async function updateObject(table,id, data) {
    await db.query("UPDATE ?? SET ? WHERE id = ?", [table,data, id]);
    return { id, ...data };
  }
  
  async function deleteObject(table, id) {
    await db.query("DELETE FROM ?? WHERE id = ?", [table, id]);
  }
  

module.exports = {
  getAll,
  getObjectById,
  createObject,
  updateObject,
  updateObject,
  getObjectsByField,
  deleteObject,
  getObjectByUserId
 };

 
  