const db = require('../config/db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'thisIsJSONWebTokenKey'
const adminCreate = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName && !lastName && !email && !password) {
            return res.status(400).send({
                success: false,
                msg: 'Provided Info are not correct.',

            })
        }
        const [find] = await db.query(
            'SELECT 1 FROM admin WHERE user_id =? LIMIT 1', [email]
        )
        if (find) {
            return res.status(400).send({
                success: false,
                msg: 'User All ready Exists.',

            })
        }
        const [results] = await db.query(
            'INSERT INTO admin(firstName,lastName,email,password,active,user_id) VALUES(?,?,?,?,?,?)', [firstName, lastName, email, password, 1, 1]
        );

        const token = jwt.sign({ email }, JWT_SECRET);
        res.status(200).send({
            success: true,
            Token: token,
            msg: 'User login successful.',
            user: results[0],

        });

    } catch (error) {
        res.status(500).send({
            success: false,
            msg: 'Server Problem,Please Try Again.',
            Error: error
        })
    }
}

module.exports = { adminCreate };