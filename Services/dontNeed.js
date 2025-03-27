const db = require("../DataBase/db.js");
//עשיתי גנרי
// async function getAllUsers() {
//   const [rows] = await db.query("SELECT * FROM users");
//   return rows;
// }
// async function getUserById(id) {
//   const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
//   return rows[0];
// }
// async function createUser(user) {
//     const [result] = await db.query("INSERT INTO users SET ?", user);
//     return { id: result.insertId, ...user };
//   }
// async function updateUser(id, user) {
//     await db.query("UPDATE users SET ? WHERE user_id = ?", [user, id]);
//     return { id, ...user };
//   }



//של פרל
// async function getUserByApartmentId(apartmentId) {
//   const [rows] = await db.query("SELECT * FROM users WHERE apartment_Id = ?", [
//     apartmentId,
//   ]);
//   return rows;
// }

// async function getUserDonations(id) {
//   const [rows] = await db.query("SELECT * FROM donations WHERE user_id = ?", [
//     id,
//   ]);
//   return rows;
// }

// async function getUserAmount(id) {
//   const [rows] = await db.query(
//     "SELECT SUM(amount) as amount FROM donations WHERE user_id = ?",
//     [id]
//   );
//   return rows[0];
// }

// async function getTopUsers(num) {
//   const [rows] = await db.query(
//     "SELECT user_id, name, apartment_id, SUM(donations.amount) as totalDonations FROM users NATURAL JOIN donations WHERE user_id !=1 GROUP BY user_id, name, apartment_id ORDER BY totalDonations DESC LIMIT ?",
//     [parseInt(num, 10)]
//   );
//   return rows;
// }


module.exports = {
    //   getAllUsers,
    //   getUserById,
    //   getUserByApartmentId,
    //   getTopUsers,
    //   getUserDonations,
    //   getUserAmount,
    //  createUser,
    //   updateUser,
    
    };