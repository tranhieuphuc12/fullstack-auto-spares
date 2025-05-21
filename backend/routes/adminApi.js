const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_ADMIN;


const ADMIN_USER = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
};

const verifyAdmin = require("../middleware/auth");

router.get("/dashboard", verifyAdmin, (req, res) => {
    res.json({ message: "Welcome Admin" });
});


router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
        const token = jwt.sign({ username, role: "admin" }, JWT_SECRET, {
            expiresIn: "2h",
        });
        console.log("api/admin/login called");

        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS            
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000, // 2 hours
            path: "/",
        });

        return res.json({ token, msg: "Login successful" });

    } else {
        return res.status(401).json({ error: "Invalid credentials" });
    }
});

module.exports = router;
