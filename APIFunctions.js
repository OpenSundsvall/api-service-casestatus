require('dotenv').config();
const fetch = require('node-fetch');
const tokenStorage = require('./tokenStorage');

const client_key = process.env.CLIENT_KEY;
const client_secret = process.env.CLIENT_SECRET;
const urlGateway = process.env.URL_GATEWAY;

async function getToken() {
    var response = "OK";
    var authString = Buffer.from(client_key + ':' + client_secret, 'utf-8').toString('base64');

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    var requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + authString,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlencoded,
        redirect: 'follow'
    };

    let tokenresponse = await fetch(`${urlGateway}/token`, requestOptions);
    if (tokenresponse.ok)
    {
        result = await tokenresponse.json();
        tokenStorage.setToken(result.access_token);
        tokenStorage.setTokenTime((result.expires_in - 10));
    }  else {
        let errorMsg = await tokenresponse.text();
        console.log(errorMsg);
    }

    return response;
}

async function getIncidentStatus(externalCaseId) {
    var returnResponse = "error";
    var token = await tokenStorage.getToken();

    var requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        redirect: 'follow'
    };

    let response = await fetch(`${urlGateway}/incident/1.0/api/internal/oep/status/${externalCaseId}`, requestOptions)
    if (response.ok)
    {
        returnResponse = await response.json();
    } else {
        let errorMsg = await response.text();
        console.log(errorMsg);
    }
    
    return returnResponse;
}

async function getCaseManagementStatus(externalCaseId) {
    var returnResponse = "error";
    var token = await tokenStorage.getToken();

    var requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        redirect: 'follow'
    };

    let response = await fetch(`${urlGateway}/casemanagement/1.1/cases/${externalCaseId}/status`, requestOptions)
    if (response.ok)
    {
        returnResponse = await response.json();
    }  else {
        let errorMsg = await response.text();
        console.log(errorMsg);
    }

    return returnResponse;
}

async function getCaseManagementStatusOrganisation(orgNumber) {
    var token = await tokenStorage.getToken();
    let returnObj = {
        "code":0,
        "body":{}
    }

    var requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        redirect: 'follow'
    };

    let response = await fetch(`${urlGateway}/casemanagement/1.1/organization/${orgNumber}/cases/status`, requestOptions)
    if (response.ok)
    {
        returnResponse = await response.json();
        returnObj.code = response.status;
        returnObj.body = returnResponse;
    }  else {
        let errorMsg = await response.text();
        returnObj.code = response.status;
        returnObj.body = {"status":"error", "message":errorMsg};
        console.log(errorMsg);
    }

    return returnObj;
}

module.exports.getToken = getToken;
module.exports.getIncidentStatus = getIncidentStatus;
module.exports.getCaseManagementStatus = getCaseManagementStatus;
module.exports.getCaseManagementStatusOrganisation = getCaseManagementStatusOrganisation;