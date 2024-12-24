require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;  // Use PORT from .env, or default to 3000

// Middleware
app.use(express.json());
app.use(cors());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Use DATABASE_URL from .env
  ssl: {
    rejectUnauthorized: false,  // Set to true for production, false for Render's free tier
  },
});

// Sample API route
app.get('/api/test', async (req, res) => {
        const {id} = req.query;
        pool.query('SELECT * FROM TEST where id = $1',[id] , (err, result) => {
                if (err) {
                        console.error('Error executing query:', err);
                        res.status(500).json({ error: 'Internal Server Error' });
                } else {
                        res.json(result.rows);
                }
        });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// const express = require('express');
// const app = express();

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres.lgfghnmitonjjiipddcf',
//   host: 'aws-0-ca-central-1.pooler.supabase.com',
//   database: 'postgres',
//   password: 'mydonationtest01',
//   port: 5432,
//   pool_mode: 'session'
// });

// pool.connect((err) => {
//   if (err) {
//     console.error('Error connecting to PostgreSQL:', err);
//   } else {
//     console.log('Connected to PostgreSQL');
//   }
// });

// app.get('/api/TEST', (req, res) => {   
//         const {id} = req.query;
//         pool.query('SELECT * FROM TEST where id = $1',[id] , (err, result) => {
//                 if (err) {
//                         console.error('Error executing query:', err);
//                         res.status(500).json({ error: 'Internal Server Error' });
//                 } else {
//                         res.json(result.rows);
//                 }
//         });
// });