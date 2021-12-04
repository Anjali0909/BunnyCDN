//Importing all dependencies
const express = require("express");
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const { json } = require("express");


//Creating instance of express
const app=express();
app.use('/web', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/liststoragezones",(req,res)=>{
    var list={}
    const url = 'https://api.bunny.net/storagezone';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            AccessKey: 'e344a1a3-cde1-4a5c-95e0-0f67e655be4eecaac195-ed77-4f01-9859-021887b8ee3b' //Replace it with your access key which will be in the account section of BunnyCDN
        }
    };
    fetch(url, options)
    .then(res => res.json())
    .then(json => 
        res.send(json)
    )
    .catch(err => console.error('error:' + err));

    
})

//Creating new storage zone

app.post("/createstoragezone",(req,res)=>{
    const url = 'https://api.bunny.net/storagezone';
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            AccessKey: 'e344a1a3-cde1-4a5c-95e0-0f67e655be4eecaac195-ed77-4f01-9859-021887b8ee3b' //Replace it with your access key which will be in the account section of BunnyCDN
        },
        body: JSON.stringify({
            ReplicationRegions: ['DE'],
            OriginUrl: 'https://psyched-freedom-318017.web.app/',
            Name: 'airqualitystoragezone',
            Region: 'LA'
        })
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(err => console.error('error:' + err));
})

//Fetching the list of pull zones

app.get("/listpullzones",(req,res)=>{
    const url = 'https://api.bunny.net/pullzone';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            AccessKey: 'e344a1a3-cde1-4a5c-95e0-0f67e655be4eecaac195-ed77-4f01-9859-021887b8ee3b' //Replace it with your access key which will be in the account section of BunnyCDN
        }
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(err => console.error('error:' + err));
})


// creating pull zone

app.get("/createpullzone",(req,res)=>{
const url = 'https://api.bunny.net/pullzone';
const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    AccessKey: 'e344a1a3-cde1-4a5c-95e0-0f67e655be4eecaac195-ed77-4f01-9859-021887b8ee3b'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
});

// linking pull zone with the storage zone with the help of storage zone

app.post("/linking",(req,res)=>{
    const url = 'https://api.bunny.net/pullzone';
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            AccessKey: 'e344a1a3-cde1-4a5c-95e0-0f67e655be4eecaac195-ed77-4f01-9859-021887b8ee3b' //Replace it with your access key which will be in the account section of BunnyCDN
        },
        body: JSON.stringify({StorageZoneId: 60209, Name: 'SamplePullZone2'})
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(err => console.error('error:' + err));
})

app.listen(5000,()=>{
    console.log("Server started at port 5000")
})