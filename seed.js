const dbConnection = require("./config/mongoConnection");
const records = require("./data/rec");
const users = require("./data/users")
const bcrypt = require('bcrypt-nodejs');

async function main() {

  const hash = bcrypt.hashSync("123456789");
  await users.createUser("xiao", "zhao", "xiaoyichuanfengnuan@163.com", hash, "1990-09-08", "female");
  const theFirstUser = await users.getUser("xiaoyichuanfengnuan@163.com")
  await records.createRec(theFirstUser._id, theFirstUser.firstname,"google","Software Engineer","The best job for Software Engineer","C:\Users", "true","20000")

  const db = await dbConnection();
  await db.serverConfig.close();

  console.log("Done seeding database!");

}

main().catch(error => {
  console.log(error);
});
