const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./Controller');
// const { default: axios } = require('axios');
const path = require('path');
const https = require('https');
const fs = require('fs');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

require('dotenv').config()
const port = process.env.PORT || 85;

// app.use(express.static(path.join(__dirname, './dubai-police')));


// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, './dubai-police', 'admin.html'));
// });
// routes
app.get('/list/queues' , controller.listQueues)
app.get('/rest/mobile/services' , controller.listServices)
app.get('/rest/mobile/appointment/id/:id' , controller.getAppointment)
app.post('/rest/mobile/appointment/checkin' , controller.checkInAppointment)
app.get('/rest/mobile/visit/status' , controller.currentVisit)
app.post('/rest/mobile/visit/create' , controller.createTicket)
app.post('/rest/mobile/sendotp' , controller.sendOTP)
app.post('/rest/mobile/validateotp' , controller.validateOTP)

// app.get('/admin/editactive' , controller.putVariable)
// app.get('/admin/getactive' , controller.getVariable)
// app.get('/delete/ticket' , controller.deleteTicket)


// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, './dubai-police', 'index.html'));
// });

// const httpsOptions = {
//     key :fs.readFileSync(__dirname + "/cert/epg_root_key.key"),
//     cert :fs.readFileSync(__dirname + "/cert/epg_root_key.crt")
// }

// const server = https.createServer(httpsOptions , app)

// const options = {
//   key: fs.readFileSync('./cert/c2ac13265c238eb0.pem'),
//   cert: fs.readFileSync('./cert/c2ac13265c238eb0.crt')
// };


// const server = https.createServer(options, app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// server.listen(port , ()=> console.log('> Server is up and running on port : ' + port))