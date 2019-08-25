/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const ses = new AWS.SES({
  region: process.env.SES_REGION
});
const connect = new AWS.Connect({
  credentials: {
    accessKeyId: process.env.CONNECT_CREDENTIAL_ACCESS_KEY_ID,
    secretAccessKey: process.env.CONNECT_CREDENTIAL_SECRET_ACCESS_KEY,
  },
  region: process.env.CONNECT_REGION,
});

let undefinedEnv = [];
Object.keys(process.env).forEach(function (key) {
  if ('####' === process.env[key]) {
    undefinedEnv.push(key);
  }
});

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

var apiEkkenGraphQLAPIIdOutput = process.env.API_EKKEN_GRAPHQLAPIIDOUTPUT;
let streamTableName = 'Stream-' + apiEkkenGraphQLAPIIdOutput;
let eventTableName = 'Event-' + apiEkkenGraphQLAPIIdOutput;
let subscribeTableName = 'Subscribe-' + apiEkkenGraphQLAPIIdOutput;
if(process.env.ENV && process.env.ENV !== "NONE") {
  streamTableName = streamTableName + '-' + process.env.ENV;
  eventTableName = eventTableName + '-' + process.env.ENV;
  subscribeTableName = subscribeTableName + '-' + process.env.ENV;
}

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});



app.post('/alert', async function(req, res) {
  if (undefinedEnv.length > 0) {
    console.error('Undefined environments', undefinedEnv);
    res.json({message: 'Undefined environments', environments: undefinedEnv});
  }

  console.log('alert detected');

  const token = req.query.token;

  if (!token) {
    res.json({error: 'invalid token'});
  }

  if (!req.body.level || !req.body.message) {
    res.json({error: 'invalid request'});
  }

  const getStreamParams = {
    TableName: streamTableName,
    Key:{
      id: token
    }
  };

  const stream = await dynamodb.get(getStreamParams).promise();

  if (!stream) {
    throw {message: 'invalid token', name: 'InvalidToken'};
  }

  const listSubscribesParams = {
    TableName: subscribeTableName,
    Key: {
      streamId: stream.id
    }
  };

  const subscribes = await dynamodb.scan(listSubscribesParams).promise();
  console.log('subscribes');

  let emails = [];
  let phones = [];

  subscribes.Items.map((subscribe) => {
    console.log(subscribe);

    if (subscribe.phone) {
      phones.push(subscribe.phone);
    }

    if (subscribe.email) {
      emails.push(subscribe.email);
    }
  });

  console.log(phones);
  console.log(emails);

  for (let phone of phones) {
    console.log('call');
    console.log(phone);
    const params = {
      SourcePhoneNumber: process.env.CONNECT_SOURCE_PHONE_NUMBER,
      DestinationPhoneNumber: phone,
      ContactFlowId: process.env.CONNECT_CONTACT_FLOW_ID,
      InstanceId: process.env.CONNECT_INSTANCE_ID,
      Attributes: {
        message: req.body.message
      }
    };
    const response = await connect.startOutboundVoiceContact(params).promise();
    console.log(phone);
    console.log(response);
  }

  if (emails.length > 0) {
    const emailResponse = await ses.sendEmail({
      Source: process.env.SES_SOURCE_EMAIL_ADDRESS,
      Destination: {
        ToAddresses: emails
      },
      Message: {
        Subject: {
          Data: req.body.level
        },
        Body: {
          Text: {
            Data: req.body.message
          }
        },
      },
    }).promise();
    console.log(emailResponse);
  }

  res.json({url: req.url, body: req.body})
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
