const db = require('../../config/db');
const bcrypt=require('bcrypt');
const residentRegister = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password,
            date_of_birth,
            gender,
            phone_number,
            address,
        } = req.body;
        const admin_id=value.id;
        const [societies] = await db.query('SELECT * FROM society WHERE admin_id = ?', [admin_id]);
        const society = societies[0];
        if (!society) {
            return res.status(404).send({
                success: false,
                msg: 'Society not found for the admin'
            });
        }
        const society_id = society.id;
        if (!first_name || !last_name || !email || !password||!date_of_birth || !gender || !phone_number || !address) {
            return res.status(400).send({
                success: false,
                msg: 'Provided information is not correct.',
            });
        }

        // Check if the user already exists
        const [find] = await db.query(
            'SELECT * FROM residents WHERE email = ? LIMIT 1', [email]
        );

        if (find && find.length > 0) {
            return res.status(400).send({
                success: false,
                msg: 'User Allready  exists.',
            });
        }

        // Insert new user
        // const password_hash = await bcrypt.hash(password, 10);

        // Insert resident into database
        const [result] = await db.query(
            `INSERT INTO residents 
            (first_name, last_name, email, password_hash, date_of_birth, gender, phone_number, address, admin_id, society_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                first_name,
                last_name,
                email,
                password,
                date_of_birth,
                gender,
                phone_number,
                address,
                admin_id,
                society_id
            ]
        );
        // Generate JWT token
        // const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({
            success: true,
            // Token: token,
            msg: 'User created successfully.',
            user: {
                id: result.insertId,
                first_name,
                last_name,
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


module.exports = residentRegister;