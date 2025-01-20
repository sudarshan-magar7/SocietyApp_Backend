const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET || 'thisIsJSONWebTokenKey'; // Use env variable for secret

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                msg: 'Email and password are required.',
            });
        }

        // Query to find user by email
        const [results] = await db.query('SELECT * FROM admin WHERE email = ?', [email]);

        // Check if user exists
        if (results.length === 0) {
            return res.status(400).send({
                success: false,
                msg: 'User not found.',
            });
        }

        const user = results[0];

        // Compare provided password with the stored hashed password
        const passwordMatches = await(password==user.password);

        if (!passwordMatches) {
            return res.status(400).send({
                success: false,
                msg: 'Invalid credentials.',
            });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email}, JWT_SECRET);

        // Successful login response
        res.status(200).send({
            success: true,
            msg: 'Admin Login Successfully.',
            token: token,
        });

    } catch (error) {
        // Handle errors
        res.status(500).send({
            success: false,
            msg: 'Server Problem.',
            error: error.message,
        });
    }
};

module.exports = adminLogin;
