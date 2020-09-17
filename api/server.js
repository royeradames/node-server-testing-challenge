const express = require("express");
const Hobbits = require("../hobbits/hobbitsModel.js");
const server = express();
server.use(express.json());
server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
    // 200 http code
    // JSON
    // api property on body
    // value of the res.body.api property is 'up'
});
server.get("/hobbits", (req, res) => {
    Hobbits.getAll()
        .then(hobbits => {
            res.status(200).json(hobbits);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});
server.post("/hobbits", (req, res) => {
    if (req.body.name) {
        Hobbits.insert(req.body)
            .then(hobbit => {
                res.status(201).json({ data: hobbit });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({ message: "please provide a name" });
    }
});
module.exports = server;