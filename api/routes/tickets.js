let config = require('../config/config');
const csv = require('csv-parser');
const fs = require('fs');
var QRCode = require('qrcode');
const express = require('express');
const router = express.Router();
let axios = require('axios');
const sgMail = require('@sendgrid/mail');
const createCSV = require('../helpers/csv-writer');
const readCSV = require('../helpers/csv-reader');
const mongoose = require('mongoose');
const Attendee = require('../models/Attendee');
const Schwag = require('../models/Schwag');

mongoose.connect(config.MONGODB_CONNECTION, {useNewUrlParser: true}).then(res => {
    // console.log(res);
});

sgMail.setApiKey(config.SENDGRID_API_KEY);
const ticketsFromCsv = [];
const path = require('path');
const directory = './data';

router.get('/qrcode/email', async function (req, res) {

    // explicit read the .csv file
    fs.createReadStream('./data/gdg-devfest-2019-tickets.csv').pipe(csv()).on('data', (row) => {
        // ensure you replace with your header values, we are using Instamojo payments, try to match the property with your .csv file
        ticketsFromCsv.push(
            {
                paymentId: row['Payment ID'],
                name: row['Buyer Name'],
                email: row['Buyer Email Address'],
                category: row['Link/Purpose']
            });
    })
        .on('end', () => {
            ticketsFromCsv.forEach(ticket => {
                let id = ticket['paymentId'];
                let name = ticket['name']
                let email = ticket['email'];
                let category = ticket['category'];

                // console.log('Name: ' + name + ', Payment id: ' + id + ', Email: ' + email + ', Category: ' + category);

                // generate a qrcode and send out email
                QRCode.toDataURL(id, function (err, url) {
                    var base64Data = url.replace(/^data:image\/png;base64,/, "");

                    // uncomment the next line to see the qrcode in the browser
                    // note: it would show the qrcode for last item in the list of tickets
                    //return res.render("index", {qrcode: url});

                    require("fs").writeFile('qrcodes/' + id + '.png', base64Data, 'base64', function (err) {
                        // structure the message
                        const msg =
                            {
                                to: email,
                                from: 'tickets@gdgbaroda.com',
                                subject: 'Your QRCode to GDG DevFest 2019 (Baroda)',
                                text: 'Hello ' + name + '. \nHere is your QRCode to participate at GDG DevFest 2019 (Baroda).',
                                attachments: [
                                    {
                                        filename: id + '.png',
                                        type: "image/png",
                                        content: base64Data,
                                        content_id: "QRCode",
                                        disposition: "attachment"
                                    }
                                ],
                                html: 'Hello ' + name + '.</br></br>Thank you for purchasing a ticket for <b>' + category + '</b> at the upcoming DevFest.</br></br>Here is your QRCode to participate at GDG DevFest 2019 (Baroda).</br></br></br></br></br>We hope to see you at the event.</br></br>Regards,</br>GDG DevFest Team',
                            };

                        // send the email (using SendGrid)
                        sgMail.send(msg);
                    });
                })
            });

            // console.log('CSV file successfully processed');
        });

    return res.json({status: true, message: "QR Code sent successfully"});
});

router.get('/status/:paymentid/', async function (req, res) {
    await axios.get(`https://www.instamojo.com/api/1.1/payments/${req.params.paymentid}/`,
        {
            headers:
                {
                    'X-Api-Key': config.INSTAMOJO_API_KEY,
                    'X-Auth-Token': config.INSTAMOJO_AUTH_TOKEN
                }

        }).then(async (data) => {
        console.log(JSON.stringify(data.data));
        let today = new Date();
        let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        if (data.data['payment'] != null) {
            if (data.data['payment']['status'] === 'Credit')
                await Attendee.count({payment_id: data.data['payment']['payment_id']}, async function (err, count) {
                    if (count === 0) {
                        var attendee_instance = await new Attendee({
                            event: data.data['payment']['link_title'],
                            payment_id: data.data['payment']['payment_id'],
                            name: data.data['payment']['buyer_name'],
                            email: data.data['payment']['buyer_email'],
                            date: date,
                            time: time,
                        });
                        await attendee_instance.save()
                        return res.json({status: true, message: `${data.data['payment']['buyer_name']} checked in.`});
                    } else {
                        return res.json({
                            status: false,
                            message: `${data.data['payment']['buyer_name']} is already checked in.`
                        });
                    }
                });
        }
    }).catch((error) => {
        console.log(JSON.stringify(error['message']))
        return res.json({status: false, message: JSON.stringify(error['message'])});
    });
});
// router.get('/status/:paymentid/', async function (req, res) {
//
//     await axios.get(`https://www.instamojo.com/api/1.1/payments/${req.params.paymentid}/`,
//         {
//             headers:
//                 {
//                     'X-Api-Key': config.INSTAMOJO_API_KEY,
//                     'X-Auth-Token': config.INSTAMOJO_AUTH_TOKEN
//                 }
//
//         }).then(async (data) => {
//             // console.log(JSON.stringify(data.data));
//             let today = new Date();
//             let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
//             if (data.data['payment'] != null) {
//                 if (data.data['payment']['status'] === 'Credit')
//                     if (fs.existsSync(`./data/${date}_CheckIns.csv`)) {
//                         await fs.createReadStream(`./data/${date}_CheckIns.csv`).pipe(csv()).on('data', async (row) => {
//                             if (row['PAYMENT ID'] !== data.data['payment']['payment_id']) {
//                                 await createCSV.data.CreateCSV(data.data, 'CheckIns');
//                                 return res.json({
//                                     status: true,
//                                     message: `${data.data['payment']['buyer_name']} checked in.`
//                                 });
//                             } else {
//                                 return res.json({
//                                     status: false,
//                                     message: `${data.data['payment']['buyer_name']} is already checked in.`
//                                 });
//                             }
//                         })
//                     } else {
//                         createCSV.data.CreateCSV(data.data, 'CheckIns');
//                         return res.json({status: true, message: `${data.data['payment']['buyer_name']} checked in.`});
//                     }
//             } else {
//                 return res.json({status: false, message: `${data.data['payment']['buyer_name']} is already checked in.`});
//             }
//         }
//     ).catch((error) => {
//         console.log(JSON.stringify(error['message']))
//
//         return res.json({status: false, reason: JSON.stringify(error['message'])});
//     });
//
// });

router.get('/t/status/:paymentid/', async function (req, res) {

    await axios.get(`https://www.instamojo.com/api/1.1/payments/${req.params.paymentid}/`,
        {
            headers:
                {
                    'X-Api-Key': config.INSTAMOJO_API_KEY,
                    'X-Auth-Token': config.INSTAMOJO_AUTH_TOKEN
                }

        }).then(async (data) => {
            // console.log(JSON.stringify(data.data));
            let today = new Date();
            let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            // console.log(`Current hour: ${today.getHours()}`);

            if (today.getHours() >= 10) {
                if (data.data['payment'] != null) {
                    if (data.data['payment']['status'] === 'Credit')
                        await Schwag.count({payment_id: data.data['payment']['payment_id']}, async function (err, count) {
                            if (count === 0) {
                                var schwag_instance = await new Schwag({
                                    event: data.data['payment']['link_title'],
                                    payment_id: data.data['payment']['payment_id'],
                                    name: data.data['payment']['buyer_name'],
                                    email: data.data['payment']['buyer_email'],
                                    date: date,
                                    time: time,
                                });
                                await schwag_instance.save()
                                return res.json({
                                    status: true,
                                    message: `${data.data['payment']['buyer_name']} is schwagged up!`
                                });
                            } else {
                                return res.json({
                                    status: false,
                                    message: `${data.data['payment']['buyer_name']} is already schwagged up.`
                                });
                            }
                        });
                }
            } else {
                return res.json({status: false, message: 'Giveaway not started yet.'});
            }
        }
    ).catch((error) => {
        console.log(JSON.stringify(error['message']))
        return res.json({status: false, message: JSON.stringify(error['message'])});
    });

});

// date is of format DD-MM-YYYY without prefix 0
// example: for date such as 08-09-2019, the actual file name is 8-9-2019
router.get('/checkins/:date/', async function (req, res) {

    const file = `./data/${req.params.date}_CheckIns.csv`;

    res.download(file);

});

// date is of format DD-MM-YYYY without prefix 0
// example: for date such as 08-09-2019, the actual file name is 8-9-2019
router.get('/giveaways/:date/', async function (req, res) {

    const file = `./data/${req.params.date}_GiveAways.csv`;

    res.download(file);

});

// a helper route to help your delete files from the /data directory cause this run within docker container
router.get('/data/clear', async function (req, res) {

    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });

    return res.json(`${directory} contents cleared`);
});

module.exports = router;
