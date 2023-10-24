const express = require("express");
const app = express();
const mongoose = require('mongoose')

const cors = require('cors');
const user = require("./model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
const transporter = require("../backend/nodemailer")

mongoose.connect("mongodb://localhost:27017/user-authentication-system")

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.post("/register", async (req, res) => {
    let name=req.body.name;
    try {
        const foundUser = user.findOne(req.body.email);
        if (foundUser.name) {
            res.status(401).send("user is already exist")
            return;
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashPassword
        const token = jwt.sign({ user: req.body }, "iieieijeijiei", { expiresIn: "2h" });

        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 30000),
            httpOnly: true
        })
        const obj = req.body;
        obj.token = token
        const newUser = await user.create(req.body);
        if (newUser) {
            const info = await transporter.sendMail({
                from: "tejwanikaushit@gmail.com",
                to: req.body.email,
                subject: "Register successfully", // Subject line
                text: "Hello" + req.body.name + " you successfully register in our demo app ", // plan body
            html: `<b>Hello ${req.body.name}</b>
            you have successfully resgistered into our app
            congratularions bro`, // html body

            });
            transporter.sendMail(info, (err, result) => {
                if (err) {
                    console.log("Error sending mail")
                }
                console.log(newUser, "Register successfully")
            })


        }

        res.status(201).send(newUser)


    } catch (err) {
        res.send(err);
        console.log("error", err)
    }
})

app.post("/login", async (req, res) => {
    try {
        if (!(req.body)) {
            res.status(401).send("please fill email or password")
        }
        const foundUser = await user.findOne({ email: req.body.email });
        const password = await bcrypt.compare(req.body.password, foundUser.password)
        if (foundUser && password) {
            const token = jwt.sign({ id: user._id }, 'iieieijeijiei', { expiresIn: "2h" })
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30000),
                httpOnly: true
            })
            foundUser.token = token;
            foundUser.password = undefined;

            const info = await transporter.sendMail({
                from: "tejwanikaushit@gmail.com",
                to: req.body.email,
                subject: "login successfully", // Subject line
                text: "Hello" + req.body.name + " you successfully login in our demo app ", // plan body
                html:`<b>Hello ${foundUser.name}</b>
                you have successfully log into our app
                congratularions bro` // html body, // html body
            });

            transporter.sendMail(info, (err, result) => {
                if (err) {
                    console.log("Error sending mail")
                }
                console.log(foundUser, "login successfully")
            })


        }




    } catch (err) {
        res.send(err)
        console.log("error", err)
    }
})

app.listen(2000, () => {
    console.log("server listen successfully");
})