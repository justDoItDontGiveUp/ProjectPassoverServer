const conDB = require("./connectToDB");
const fs = require("fs");

function createTable(query, tableName) {
  return new Promise((resolve, reject) => {
    conDB.query(query, (err, result) => {
      if (err) return reject(err);
      console.log(`${tableName} table created`);
      resolve(result);
    });
  });
}

async function createTables() {
  const tableFiles = [
      "./sqlTables/users.sql",
    "./sqlTables/todos.sql",
      "./sqlTables/posts.sql",
    "./sqlTables/comments.sql",
     "./sqlTables/passwords.sql"
  
  ];

  for (const file of tableFiles) {
    const query = fs.readFileSync(file, "utf8");
    const tableName = file.split("/").pop().split(".")[0];
    await createTable(query, tableName);
  }
}
createTables();
module.exports = createTables;
