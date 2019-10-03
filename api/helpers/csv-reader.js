const csv = require('csv-parser');
const fs = require('fs');
var methods = {};

methods.ReadCSV = async function (data, filename) {
    let today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    await fs.createReadStream(`./data/${date}_${filename}.csv`).pipe(csv()).on('data', (row) => {
        if (row['PAYMENT ID'] === data['payment']['payment_id']) {
            flag = false
        } else {
            flag = true
        }
    });
}
exports.data = methods;