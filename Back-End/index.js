const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./Controller');
// const { default: axios } = require('axios');
const path = require('path');
const https = require('https');
const fs = require('fs');
const httpsOptions = {
    key :fs.readFileSync(__dirname + "/cert/epg_root_key.key"),
    cert :fs.readFileSync(__dirname + "/cert/epg_root_key.crt")
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors());


require('dotenv').config()
const port = process.env.PORT || 3010;


// routes
app.get('/list/queues' , controller.listQueues)
app.get('/rest/mobile/services' , controller.listServices)
app.get('/rest/mobile/appointment/id/:id' , controller.getAppointment)
app.get('/rest/mobile/appointment/one/:id' , controller.getOneAppointment)
app.post('/rest/mobile/appointment/checkin' , controller.checkInAppointment)
app.get('/rest/mobile/visit/status' , controller.currentVisit)
app.post('/rest/mobile/visit/create' , controller.createTicket)
app.post('/rest/mobile/createCustomer' , controller.createCustomer)
app.post('/rest/mobile/sendotp' , controller.sendOTP)
app.post('/rest/mobile/validateotp' , controller.validateOTP)
app.get('/rest/mobile/golobalVariables/:name' , controller.golobalVariables)
app.post('/rest/mobile/sendSms' , controller.sendSms)

// app.get('/admin/editactive' , controller.putVariable)
// app.get('/admin/getactive' , controller.getVariable)
// app.get('/delete/ticket' , controller.deleteTicket)

app.use(express.static(path.join(__dirname, '../Front-End/build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-End/build', 'index.html'));
});

console.log(process.env.REACT_APP_TESTING);
if(process.env.REACT_APP_TESTING==1){
    app.listen(port, () => {
        console.log(`Server is running for testing on port ${port}`);
    });
}else{
    const server = https.createServer(httpsOptions , app)
    server.listen(port , ()=> console.log('> Server is up and running on port : ' + port))
}


