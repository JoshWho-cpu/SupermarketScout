require("dotenv").config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const axios = require('axios');
const { readFileSync, writeFileSync } = require('fs');
const { createSign } = require('crypto');

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;
    
const consumerId = process.env.CONSUMER_ID;
const keyVersion = process.env.KEY_VERSION;
const privateKeyPath = process.env.PRIVATE_KEY_PATH;
const privateKey = readFileSync(privateKeyPath, 'utf8');

const generateSignature = (verifiableData, privateKey) => {
  const rsaSigner = createSign("RSA-SHA256");
  rsaSigner.update(verifiableData);
  return rsaSigner.sign(privateKey, "base64");
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Query for store locations
app.get('/api/v1/stores/findstore/:latitude/:longitude', async (req, res) => {
  try {
    const { latitude, longitude } = req.params;

    const timestamp = Date.now().toString();
    const signatureString = ''+consumerId+'\n'+timestamp+'\n'+keyVersion+'\n';
    const signature = generateSignature(signatureString, privateKey);
    // const walmartApiUrl = `https://developer.api.walmart.com/api-proxy/service/affil/v2/stores?zip=${zipcode}`;
    const walmartApiUrl = `https://developer.api.walmart.com/api-proxy/service/affil/product/v2/stores?lon=${longitude}&lat=${latitude}`;
    // const walmartApiUrl = "https://developer.api.walmart.com/api-proxy/service/affil/product/v2/stores?lon=-95.511747&lat=29.735577";
    // console.log(consumerId);
    // console.log(keyVersion);
    // console.log(timestamp);
    // console.log(signature);
    await axios.get(walmartApiUrl, {
      headers: {
        'WM_CONSUMER.ID': consumerId,
        'WM_SEC.KEY_VERSION': keyVersion,
        'WM_CONSUMER.INTIMESTAMP': timestamp,
        'WM_SEC.AUTH_SIGNATURE': signature
      }
    })
    .then(response => {
        // console.log(response.data);
      res.json({
        status: "success",
        data: {
          stores: response.data
        }
      })
    })
    .catch(error => {
      console.error('Error making API request to zipcode:', error);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/v1/items/search', async (req, res) => {
  try {
    const searchQuery = req.query.query;

    const timestamp = Date.now().toString();
    const signatureString = ''+consumerId+'\n'+timestamp+'\n'+keyVersion+'\n';
    const signature = generateSignature(signatureString, privateKey);
    const walmartApiUrl = `https://developer.api.walmart.com/api-proxy/service/affil/product/v2/search?query=${searchQuery}`;
    await axios.get(walmartApiUrl, {
      headers: {
        'WM_CONSUMER.ID': consumerId,
        'WM_SEC.KEY_VERSION': keyVersion,
        'WM_CONSUMER.INTIMESTAMP': timestamp,
        'WM_SEC.AUTH_SIGNATURE': signature
      }
    })
    .then(response => {
        // console.log(response.data);
      res.json({
        status: "success",
        data: {
          stores: response.data
        }
      })
    })
    .catch(error => {
      console.error('Error making API request to zipcode:', error);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


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