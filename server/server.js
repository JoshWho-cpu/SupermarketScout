require("dotenv").config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const db = require('./db/db');

// Get all Stores
app.get('/api/v1/stores', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM stores');
    res.json({
      status: "success",
      results: result.rows.length,
      data: {
        stores: result.rows
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// Get individual store
app.get('/api/v1/stores/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM stores WHERE id = $1', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Store not found"
      });
    }

    res.json({
      status: "success",
      data: {
        store: result.rows[0]
      }
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a store
app.post('/api/v1/stores', async (req, res) => {
  try {
    const result = await db.query("INSERT INTO stores (name, location) values ($1, $2) RETURNING *", [req.body.name, req.body.location]);
    res.json({
      status: "success",
      data: {
        store: result.rows[0]
      }
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update stores
app.put("/api/v1/stores/:id", async (req, res) => {
  try {
    const result = await db.query("UPDATE stores SET NAME= $1, LOCATION = $2 WHERE ID = $3 RETURNING *", [req.body.name, req.body.location, req.params.id]);
    res.status(200).json({ status: "success", data: result.rows[0] }); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete stores
app.delete("/api/v1/stores/:id", async (req, res) => {
  try {
    const result = await db.query("DELETE FROM stores WHERE ID = $1 RETURNING *", [req.params.id]);
    res.status(204).json({ status: "success", data: result.rows[0] }); 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});