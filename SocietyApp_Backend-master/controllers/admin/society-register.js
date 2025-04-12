const db=require('../../config/db')
const societyRegister=async (req, res) => {
    const { name, address, contact } = req.body;
    const admin_id=value.id;
    // Validate input
    if (!name || !address || !contact || !admin_id) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    try {
      // Check if admin exists
      const [adminExists] = await db.query('SELECT * FROM admin WHERE id = ?', [admin_id]);
      if (adminExists.length === 0) {
        return res.status(404).json({ error: 'Admin not found.' });
      }
      const [societyExists] = await db.query('SELECT * FROM society WHERE admin_id = ?', [admin_id]);
      // Insert society into the database
      if(societyExists){
        return res.status(400).send({
            success:false,
            msg:'Society Allready Exists.'
        })
      }
      const [result] = await db.query(
        'INSERT INTO society (name, address, contact, admin_id) VALUES (?, ?, ?, ?)',
        [name, address, contact, admin_id]
      );
  
      // Return success response
      res.status(201).json({
        success:true,
        message: 'Society registered successfully.',
        societyId: result.insertId
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success:false,
        msg:'Server Problem.',
        error:error
      })
    }
  }

module.exports=societyRegister;