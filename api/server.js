const express = require("express")
const Hobbits = require("../hobbits/hobbitsModel.js")
const server = express()
server.use(express.json())
server.get("/", (req, res) => {
    res.status(200).json({ api: "up" })
    // 200 http code
    // JSON
    // api property on body
    // value of the res.body.api property is 'up'
})
server.get("/hobbits", (req, res) => {
    Hobbits.getAll()
        .then(hobbits => {
            res.status(200).json(hobbits)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})
server.post("/hobbits", (req, res) => {
    if (req.body.name) {
        Hobbits.insert(req.body)
            .then(hobbit => {
                res.status(201).json({ data: hobbit })
            })
            .catch(error => {
                res.status(500).json({ message: error.message })
            })
    } else {
        res.status(400).json({ message: "please provide a name" })
    }
})
server.delete("/hobbits/:id", verifyId(), (req, res) => {
    Hobbits.remove(req.params.id)
        .then(account => {
            res.status(204).json(account)
        })
        .catch(error => {
            res.status(500).json({ message: error.message })
        })

})

function verifyId() {
    return (req, res, next) => {
        console.log(req.params.id)
        const id = req.params.id
        console.log(id)

        Hobbits.findById(id)
            .then(hobbit => {
                console.log(hobbit)
                if (hobbit.length) {
                    next()
                } else {
                    res.status(404).json({ message: `Hobbit not found` })
                }
            })
            .catch(error => {
                console.log(error.message)
                res.status(500).json(error.message)

            })

    }

}
module.exports = server