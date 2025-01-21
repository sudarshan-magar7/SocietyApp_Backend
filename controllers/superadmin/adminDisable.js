const db = require('../../config/db');
const adminDisable = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({
                success: false,
                msg: 'Email address is not provided.'
            });
        }
        const [result] = await db.query(
            'UPDATE admin SET active = ? WHERE email = ? LIMIT 1',
            [0, email]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                msg: 'No user found with the provided email address.',
            });
        }
        res.status(200).send({
            success: true,
            msg: 'User Disabled Successfully.',
            email: email
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            msg: 'Server Problem',
            error: error.message,
        });
    }
};

module.exports = adminDisable;
