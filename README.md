[![Build Status](https://johnwatson484.visualstudio.com/John%20D%20Watson/_apis/build/status/johnwatson484.azure-service-bus-test-client?branchName=master)](https://johnwatson484.visualstudio.com/John%20D%20Watson/_build/latest?definitionId=24&branchName=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=johnwatson484_azure-service-bus-test-client&metric=alert_status)](https://sonarcloud.io/dashboard?id=johnwatson484_azure-service-bus-test-client)
[![Known Vulnerabilities](https://snyk.io/test/github/johnwatson484/azure-service-bus-test-client/badge.svg)](https://snyk.io/test/github/johnwatson484/azure-service-bus-test-client)

# Azure Service Bus Test Client
A test client for sending and receiving JSON format messages with Azure Service Bus

## Prerequisites
Node v14+  

Or:  

Docker

## Running the client
### From source
- Clone the repo and run `npm install` to install required npm packages
- Update the preferred port in the `config.js` file.  By default this is set to **3011**.
- Run `npm start` to start the application.

The application can be run in a container if preferred by running the `scripts/start` script.

### Docker
`docker run -p 3011:3011 johnwatson484/azure-service-bus-test-client`

### Hosted
A hosted version is available at https://asbtc.lynxmagnus.com/

## Using the client
The below screenshot shows an overview of the the client.

![Client Screenshot](/docs/screenshot.png "Client Screenshot")

### Set the connection string
This can be found in the Azure portal under Shared Access Policies for either the root account or a specific queue key.

This must be in the below format and note that the validation provided by the client is case sensitive.  For example "endpoint=..." would be invalid.  EntityPath is optional as it only applies to queue policies.

`Endpoint=sb://YOUR_HOSTNAME/;SharedAccessKeyName=KEYNAME;SharedAccessKey=KEY`

### Set the queue or topic name
This is the queue or topic where the message will be sent to or received from.

## Sending a message
### Set the message body
This is the message that will be sent to the specified resource and must be in JSON format.  

Any `##` placeholders will be replaced by an auto incrementing integer.

### Set the message format
Messages can be sent as JSON or stringified JSON.

### Set the number of copies of the message to send

## Receiving a message
### Subscription
If messages are to be received from a topic, then set the subscription name.

### Set whether to peek, complete or clear the full queue.
Peeked messages remain on the queue, whilst completed messages are removed.

### Set the number of messages to receive
Maximum of 250.

## Errors
If invalid credentials or malformed JSON is provided an error will be returned through the client.
