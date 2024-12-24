const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.lgfghnmitonjjiipddcf',
  host: 'aws-0-ca-central-1.pooler.supabase.com',
  database: 'postgres',
  password: 'mydonationtest01',
  port: 5432,
  pool_mode: 'session'
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

app.get('/api/TEST', (req, res) => {   
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