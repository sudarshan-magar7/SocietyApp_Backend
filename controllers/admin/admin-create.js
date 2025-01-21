const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'thisIsJSONWebTokenKey';

const adminCreate = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).send({
                success: false,
                msg: 'Provided information is not correct.',
            });
        }

        // Check if the user already exists
        const [find] = await db.query(
            'SELECT * FROM admin WHERE email = ? LIMIT 1', [email]
        );

        if (find && find.length > 0) {
            return res.status(400).send({
                success: false,
                msg: 'User already exists.',
            });
        }

        // Insert new user
        const [results] = await db.query(
            'INSERT INTO admin (firstName, lastName, email, password, active,super_admin_id) VALUES (?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, password, 1, 1]
        );

        // Generate JWT token
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({
            success: true,
            Token: token,
            msg: 'User created successfully.',
            user: {
                id: results.insertId,
                firstName,
                lastName,
                email,
                active: 1,
            },
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            msg: 'Server problem, please try again.',
            Error: error.message,
        });
    }
};

module.exports = { adminCreate };
