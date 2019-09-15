const csv = require('csv-parser');
const fs = require('fs');
var QRCode = require('qrcode');
const express = require('express');
const router = express.Router();
let axios = require('axios');
const sgMail = require('@sendgrid/mail');
const createCSV = require('../helpers/csv-writer');
sgMail.setApiKey('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');
const ticketsFromCsv = [];


router.get('/qrcode/email', async function (req, res) {

    // explicit read the .csv file
    fs.createReadStream('./data/gdg-devfest-2019-tickets.csv').pipe(csv()).on('data', (row) => 
    {
        // ensure you replace with your header values, we are using Instamojo payments, try to match the property with your .csv file
        ticketsFromCsv.push(
        {
            paymentId:row['Payment ID'],
            name:row['Buyer Name'],
            email:row['Buyer Email Address'],
            category:row['Link/Purpose']
        });
    })
    .on('end', () => 
    {
        ticketsFromCsv.forEach(ticket => 
        {
            let id = ticket['paymentId'];
            let name = ticket['name']
            let email = ticket['email'];
            let category = ticket['category'];

            console.log('Name: ' + name + ', Payment id: ' + id + ', Email: ' + email + ', Category: ' + category);

            // generate a qrcode and send out email
            QRCode.toDataURL(id, function (err, url) 
            {
                var base64Data = url.replace(/^data:image\/png;base64,/, "");

                // uncomment the next line to see the qrcode in the browser
                // note: it would show the qrcode for last item in the list of tickets
                //return res.render("index", {qrcode: url});

                require("fs").writeFile('qrcodes/' + id + '.png', base64Data, 'base64', function (err)
                {
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

        console.log('CSV file successfully processed');
    });
});

router.get('/status/:paymentid/', async function (req, res) {

    let ApiKey = "6542868eb3df23a8b6724fd73489a029";
    let AuthToken = "432fddd99b8580a98398b2e0cc29f46f";

    await axios.get(`https://www.instamojo.com/api/1.1/payments/${req.params.paymentid}/`, 
    {
        headers: 
        {
            'X-Api-Key': ApiKey,
            'X-Auth-Token': AuthToken
        }

    }).then(async (data) => 
    {
        console.log(JSON.stringify(data.data));

        if(data.data['payment'] != null)
        {
            if(data.data['payment']['status'] === 'Credit')
                createCSV.data.CreateCSV(data.data);
                return res.json({status:true});
        }

        return res.json({status:false});

    }).catch((error) => 
    {
        console.log(JSON.stringify(error['message']))

        return res.json({status:false,reason:JSON.stringify(error['message'])});
    });
    
});

// date is of format DD-MM-YYYY without prefix 0
// example: for date such as 08-09-2019, the actual file name is 8-9-2019
router.get('/checkins/:date/', async function (req, res) {

    const file = `./data/${req.params.date}.csv`;
  
    res.download(file);
    
});

module.exports = router;