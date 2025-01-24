const db = require('../../config/db')


const CreateNotice = async (req, res) => {
    try {
       
        const { title, description, attachments } = req.body;

    
        const admin_id = value.id; 
        console.log(admin_id) 
        if (!admin_id) {
            return res.status(400).send({
                success: false,
                msg: 'Admin ID is missing'
            });
        }

      
        const [admins] = await db.query('SELECT * FROM admin WHERE id = ?', [admin_id]);
        const admin = admins[0];
        if (!admin) {
            return res.status(404).send({
                success: false,
                msg: 'Admin not found'
            });
        }

        // Fetch the society details
        const [societies] = await db.query('SELECT * FROM society WHERE admin_id = ?', [admin_id]);
        const society = societies[0];
        if (!society) {
            return res.status(404).send({
                success: false,
                msg: 'Society not found for the admin'
            });
        }
        const society_id = society.id;

       
        const [result] = await db.execute(
            'INSERT INTO notices (title, description, admin_id, society_id, attachments) VALUES (?, ?, ?, ?, ?)',
            [title, description, admin_id, society_id, JSON.stringify(attachments)] // Serialize attachments if it's an object/array
        );

        
        res.status(201).send({
            success: true,
            msg: 'Notice Created Successfully.',
            notice: {
                id: result.insertId,
                title,
                description,
                attachments,
                admin_id,
                society_id
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            msg: 'Failed to create notice',
            error: err.message || err
        });
    }
};

module.exports = CreateNotice;


// Get all notices
// app.get('/notices', async (req, res) => {
//   try {
//     const [rows] = await db.execute('SELECT * FROM notices');
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch notices' });
//   }
// });

// Get a single notice by ID
// app.get('/notices/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [rows] = await db.execute('SELECT * FROM notices WHERE id = ?', [id]);

//     if (rows.length === 0) {
//       return res.status(404).json({ error: 'Notice not found' });
//     }

//     res.status(200).json(rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch notice' });
//   }
// });

// Update a notice by ID
// app.put('/notices/:id', async (req, res) => {
//   const { id } = req.params;
//   const { title, description, admin_id, society_id, attachments } = req.body;

//   try {
//     const [result] = await db.execute(
//       'UPDATE notices SET title = ?, description = ?, admin_id = ?, society_id = ?, attachments = ? WHERE id = ?',
//       [title, description, admin_id, society_id, attachments, id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Notice not found' });
//     }

//     res.status(200).json({ id, title, description, admin_id, society_id, attachments });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to update notice' });
//   }
// });

// Delete a notice by ID
// app.delete('/notices/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [result] = await db.execute('DELETE FROM notices WHERE id = ?', [id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Notice not found' });
//     }

//     res.status(204).send();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to delete notice' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });