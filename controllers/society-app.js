const db = require('../config/db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'thisIsJSONWebTokenKey'
const SuperAdminLogin = async (req, res) => {
    try {
        const { user_id, password } = req.body;


        if (!user_id || !password) {
            return res.status(400).send({
                success: false,
                msg: 'Missing user_id or password',
            });
        }


        const [results] = await db.query(
            'SELECT * FROM superadmin WHERE user_id = ? AND password = ?',
            [user_id, password]
        );


        if (results.length === 0) {
            return res.status(404).send({
                success: false,
                msg: 'Invalid credentials',
            });
        }

        const token = jwt.sign({ user_id }, JWT_SECRET);
        res.status(200).send({
            success: true,
            Token: token,
            msg: 'User login successful',
            user: results[0],
            
        });

    } catch (error) {

        res.status(500).send({
            success: false,
            msg: 'Server error',
            error: error.message,
        });
    }
};

module.exports = { SuperAdminLogin };
