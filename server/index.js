const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const onlyUsers = require('./onlyUsers');
const onlyAdmins = require('./onlyAdmins')

app.use(express.json());
app.use(cors());

//Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'Travely'
})
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log("connected to my sql")
})

//Users&Admins auth
app.use("/api/auth", require("./authRoutes"))

//Get all Unfollowed Vacations: By User
app.get("/api/vacations", onlyUsers, async (req, res) => {
    let q = `SELECT id, destination,
    description, img_url, 
    DATE_FORMAT(from_date,'%d/%m/%Y') AS from_date, DATE_FORMAT(until_date,'%d/%m/%Y') AS until_date,
    price FROM vacations`
    try {
        const results = await Query(q)
        res.json(results)
        console.log(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Get Followed Vacations By User:
app.get("/api/followers/:id", async (req, res) => {
    const id = req.params.id;
    console.log('hi1',id);
    let q = `SELECT vacations.id, vacations.destination,
     vacations.description, vacations.img_url, 
     DATE_FORMAT(vacations.from_date,'%d/%m/%Y') AS from_date, DATE_FORMAT(vacations.until_date,'%d/%m/%Y') AS until_date,
     vacations.price, followers.u_id AS status FROM vacations
     LEFT JOIN followers ON vacations.id=followers.v_id 
     WHERE followers.u_id= ${id} ORDER BY vacations.id`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})
//Get All Followed Vacations For Reports
app.get("/api/followedvacations", async (req, res) => {
    let q = `SELECT vacations.destination as Destination, 
    COUNT(v_id) as Followers
     From followers
     INNER JOIN vacations ON vacations.id=followers.v_id
     GROUP BY v_id 
     HAVING COUNT(v_id) >= 1`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Get Search result
app.get("/api/searchedvacations/:result", onlyUsers, async (req, res) => {
    const { result } = req.params
    let q = `SELECT DISTINCT vacations.id, vacations.destination,
    vacations.description, vacations.img_url, vacations.from_date,
    vacations.until_date, vacations.price
    FROM vacations LEFT JOIN followers ON vacations.id = followers.v_id
    WHERE destination  LIKE '%${result}%' OR description LIKE '%${result}%' 
    OR from_date LIKE '%${result}%' OR until_date LIKE '%${result}%'`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Add a vacation:
app.post("/api/vacations", onlyAdmins, async (req, res) => {
    const { destination, description, img_url, from_date, until_date, price } = req.body;
    console.log(req.body);
    let q = `INSERT INTO vacations (destination, description, img_url, from_date, until_date, price)
    VALUES ('${destination}','${description}','${img_url}', '${from_date}', '${until_date}', ${price})`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Edit a Vacation:
app.put("/api/vacations", onlyAdmins, async (req, res) => {
    const { id, destination, description, img_url, from_date, until_date, price } = req.body
    console.log(req.body);
    let q = `UPDATE vacations
    SET destination = '${destination}',
    description =  '${description}',
    img_url = '${img_url}',
    from_date = '${from_date}',
    Until_date = '${until_date}',
    price = ${price}
    WHERE id = ${id}`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Delete a Vacation:
app.delete("/api/vacations/:id", onlyAdmins, async (req, res) => {
    const { id } = req.params;
    console.log(id)
    let q = `DELETE FROM vacations WHERE id = ${id}`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})

//Follow:
app.post("/api/followers", onlyUsers, async (req, res) => {
    const { u_id, v_id } = req.body;
    let q = `INSERT INTO followers (u_id, v_id)
    VALUES (${u_id}, ${v_id})`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})
//Unfollow:
app.delete("/api/followers", onlyUsers, async (req, res) => {
    const { u_id, v_id } = req.body;
    let q = `DELETE FROM followers WHERE v_id = ${v_id} AND u_id = ${u_id}`
    try {
        const results = await Query(q)
        res.json(results)
    }
    catch (err) {
        console.log(err)
    }
})


// Query Promise Function
const Query = (q, ...par) => {
    return new Promise((resolve, reject) => {
        db.query(q, par, (err, results) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(results)
            }
        })
    })
}

app.listen(3001, console.log('listeting on http://localhost:3001'))

module.exports = { Query }
