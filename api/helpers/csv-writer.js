const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var newLine = "\r\n";
var methods = {};

methods.CreateCSV = async function (data, filename) {
    let today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    let path = `./data/${date}_${filename}.csv`;
    const records = [
        {
            event: data['payment']['link_title'],
            payment_id: data['payment']['payment_id'],
            name: data['payment']['buyer_name'],
            email: data['payment']['buyer_email'],
            check_in: dateTime,
        },
    ];
    if (!fs.existsSync(path)) {
        const csvWriter = createCsvWriter({
            path: path,
            header: [
                {id: 'event', title: 'EVENT'},
                {id: 'payment_id', title: 'PAYMENT ID'},
                {id: 'name', title: 'NAME'},
                {id: 'email', title: 'EMAIL'},
                {id: 'check_in', title: 'DATE TIME'}
            ]
        });

        csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
                console.log('...Done');
            });
    } else {
        const csvWriter = createCsvWriter({
            path: path,
            append: true,
            header: [
                {id: 'event', title: 'EVENT'},
                {id: 'payment_id', title: 'PAYMENT ID'},
                {id: 'name', title: 'NAME'},
                {id: 'email', title: 'EMAIL'},
                {id: 'check_in', title: 'CHECK IN'}
            ]
        });
        csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
                console.log('...Done');
            });
    }
};

exports.data = methods;