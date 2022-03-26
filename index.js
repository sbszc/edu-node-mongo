const http = require('http');
const connStr = "mongodb://localhost:27017/";
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(connStr);

http.createServer(function (req, res) {
  insert()
  .then(v => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(v);
    res.end();
  })
  .catch(err => {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.write(err.message);
    res.end();
  });
  // try {
  //    insertOne();
  //    insertMany();
  //    find();
  //    findOne();

  //   res.writeHead(200, { 'Content-Type': 'text/html' });
  //   res.write("success");
  //   res.end();
  // } catch (err) {
  //   res.writeHead(400, { 'Content-Type': 'text/html' });
  //   res.write(err.message);
  //   res.end();
  // }
}).listen(8080);

async function insert() {
  await client.connect();
  console.log("Connected");
  const db = client.db("mydb");
  const collection = db.collection('mycollection');
  //throw new Error("Not inserted");
  const docs = [{ name: "Juani", age: 14 },{ name: "Juano", age: 13, nickname: "juano13" }];
  const insertResult = await collection.insertMany(docs);
  console.log('Inserted documents =>', insertResult);
  return "Inserted";
}

// function insertOne() {
//   MongoClient.connect(connStr, (err, db) => {
//     if (err) throw err;
//     console.log("One Connected");

//     const mydb = db.db("mydb");
//     const myobj = { name: "Company Inc", address: "Highway 37" };
//     mydb.collection("mycollection").insertOne(myobj, (err, res) => {
//       if (err) throw err;
//       console.log("One Inserted");
//       console.log(res);
//       db.close();
//     });
//   });
// }

// function insertMany() {
//   MongoClient.connect(connStr, (err, db) => {
//     if (err) throw err;
//     console.log("Many Connected");

//     const mydb = db.db("mydb");
//     const myarr = [
//       { name: "seb", address: "abc" },
//       { name: "name2", address: "add2" },
//     ];
//     mydb.collection("mycollection").insertMany(myarr, (err, res) => {
//       if (err) throw err;
//       console.log("Many Inserted");
//       console.log(res);
//       db.close();
//     });
//   });
// }

// function findOne(){
//   MongoClient.connect(connStr, (err, db) => {
//     if (err) throw err;
//     console.log("FindOne Connected");

//     const mydb = db.db("mydb");
//     mydb.collection("mycollection").findOne({"name":'seb'}, (err, res) => {
//       if (err) throw err;
//       console.log("FoundOne");
//       console.log(res);
//       db.close();
//     });
//   });
// }

// function find(){
//   MongoClient.connect(connStr, (err, db) => {
//     if (err) throw err;
//     console.log("Find Connected");

//     const mydb = db.db("mydb");
//     mydb.collection("mycollection").find({"name":'seb'}).toArray((err, res) => {
//       if (err) throw err;
//       console.log("Found");
//       console.log(res);
//       db.close();
//     });
//   });
// }