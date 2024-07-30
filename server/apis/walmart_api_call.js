const axios = require('axios');
const { readFileSync, writeFileSync } = require('fs');
const { createSign } = require('crypto');
require('dotenv').config(); 

// console.log('Consumer ID:', process.env.CONSUMER_ID);
// console.log('Key Version:', process.env.KEY_VERSION);
// console.log('Private Key Path:', process.env.PRIVATE_KEY_PATH);

const consumerId = process.env.CONSUMER_ID;
const keyVersion = process.env.KEY_VERSION;
const privateKeyPath = process.env.PRIVATE_KEY_PATH;

const generateSignature = (verifiableData, privateKey) => {
    const rsaSigner = createSign("RSA-SHA256");
    rsaSigner.update(verifiableData);
    return rsaSigner.sign(privateKey, "base64");
}


const url = 'https://developer.api.walmart.com/api-proxy/service/affil/product/v2/taxonomy?id=3944';
// const url = 'https://developer.api.walmart.com/api-proxy/service/affil/product/v2/paginated/items';


// const baseUrl = 'https://developer.api.walmart.com';

// let url = `${baseUrl}/api-proxy/service/affil/product/v2/paginated/items?count=10&category=3944`;

const run = async() => {

// Generate the current Unix epoch time in milliseconds
const timestamp = Date.now().toString();

const privateKey = readFileSync(privateKeyPath, 'utf8');

// Create the signature string
const signatureString = ''+consumerId+'\n'+timestamp+'\n'+keyVersion+'\n';
const signature = generateSignature(signatureString, privateKey);

// Make the API call
await axios.get(url, {
  headers: {
    'WM_CONSUMER.ID': consumerId,
    'WM_SEC.KEY_VERSION': keyVersion,
    'WM_CONSUMER.INTIMESTAMP': timestamp,
    'WM_SEC.AUTH_SIGNATURE': signature
  }
})
.then(response => {
    let output='';
    const categories = response.data.categories;
    categories.forEach((category, index) => {
        if (category.id == 976759) {
            output += `Category ${index + 1}: ${category.name}\n`;
            const children = category.children;
            children.forEach((child, idx) => {
                output += `    Child ${idx + 1}: ${JSON.stringify(child, null, 2)}\n`;
            });
        }
    });

    writeFileSync('./apis/example calls/categories_output.json', output);
    console.log('Output written to categories_output.json');
    console.log(response.data);
//   console.log(response.data.nextPage);
//   url = `${baseUrl}${response.data.nextPage}`;
})
.catch(error => {
  console.error('Error making API request:', error);
});


// axios.get(url, {
//   headers: {
//     'WM_CONSUMER.ID': consumerId,
//     'WM_SEC.KEY_VERSION': keyVersion,
//     'WM_CONSUMER.INTIMESTAMP': timestamp,
//     'WM_SEC.AUTH_SIGNATURE': signature
//   }
// })
// .then(response => {
//   console.log(response.data);
// //   console.log(response.data.nextPage);
// //   url = `${baseUrl}${response.data.nextPage}`;
// })
// .catch(error => {
//   console.error('Error making API request:', error);
// });
}
run();