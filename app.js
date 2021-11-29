const express = require('express');
const bodyParser = require('body-parser');
const tokenStorage = require('./tokenStorage');
const apiFunctions = require('./APIFunctions');
const mariadb = require('mariadb');
const sandbox = require('./sandbox');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = 3001;

var SANDBOX = false;
if (process.env.SANDBOX.toLowerCase() === 'true') {
	SANDBOX = true;
}

var endpointURI = process.env.ENDPOINT_URI;
console.log(endpointURI);

const pool = mariadb.createPool({
	host: process.env.DB_HOST, 
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	connectionLimit: 5
})

if (!SANDBOX) {
    tokenStorage.getToken().then(res => console.log("Token hämtad"));
} else {
    console.log("Kör som sandbox");
}

async function checkOrganisationNumber(orgNumber) {
    let response = /^(\d{6}|\d{8})[-|(\s)]{0,1}\d{4}$/.test(orgNumber);
    return response;
}

app.get('/', function (req, res) {
	res.sendStatus(200);
});

app.get(`${endpointURI}/:id/oepstatus/`, async (req, res) => {
    if (!SANDBOX) {
        console.log("Anropar status");
        let checkCaseManagement = await apiFunctions.getCaseManagementStatus(req.params.id);
        let responseJson;

        if (checkCaseManagement != "error") {
            let status = checkCaseManagement.status;
            try {
                conn = await pool.getConnection();
                let query = 'select openeID from vStatusCaseManagementOpenE where caseManagementID = ?;';
                let rows = await conn.query(query, status);
                responseJson = {"key":"status","value":rows[0].openeID};
                res.send(responseJson);
            } catch (err) {
                console.log(err);
                res.status(500).send({"message":"Ett internt fel uppstod"});
                return err;
            } finally {
                if (conn) return conn.release();
            }
    
        } else {
                       
            let checkIncident = await apiFunctions.getIncidentStatus(req.params.id);
            let responseJson;

            if (checkIncident != "error") {
                let status = checkIncident.statusId;
                try {
                    conn = await pool.getConnection();
                    let query = 'select openeID from vStatusIncidentOpenE where incidentID = ?;';
                    let rows = await conn.query(query, parseInt(status));
                    if (rows[0] !== undefined) {
                        responseJson = {"key":"status","value":rows[0].openeID};
                        res.send(responseJson);
                    } else {
                        responseJson = {"key":"status","value":"Okänd"};
                        res.send(responseJson);
                    }
                    
                } catch (err) {
                    console.log(err);
                    res.status(500).send({"message":"Ett internt fel uppstod"});
                    return err;
                } finally {
                    if (conn) return conn.release();
                }
            } else {
                res.status(404).send({"message":"Ärende kan inte hittas"});
            }
        }
    } else {
        console.log("Anropar sandbox status");
        let sandboxRes = await sandbox.sandboxGetStatus(req.params.id);
        if (sandboxRes != "error") {
            res.send(sandboxRes);
        } else {
            res.status(404).send({"message":"Ärende kan inte hittas"});
        }
    }
    
});

app.get(`${endpointURI}/:organisationNumber/statuses/`, async (req, res) => {
    console.log("Anropar organisation statuses");
    if (!SANDBOX) {
        let orgNumberOK = await checkOrganisationNumber(req.params.organisationNumber);
        if (orgNumberOK) {
            var responseJson = [];
            let checkCaseManagement = await apiFunctions.getCaseManagementStatusOrganisation(req.params.organisationNumber);  
            if (checkCaseManagement.code == 200)
            {
                try {
                    conn = await pool.getConnection();
                    for (var i = 0;i < checkCaseManagement.body.length;i++) {
                        let query = 'select openeID from vStatusCaseManagementOpenE where caseManagementID = ?;';
                        let rows = await conn.query(query, checkCaseManagement.body[i].status);
                        let errandType = "";
                        if (rows[0] == "BYGGR") {
                            errandType = "Byggärende";
                        } else {
                            errandType = "Annat";
                        }
                        if (rows[0] !== undefined) {
                            statusObj = {"caseType":errandType,"id":checkCaseManagement.body[i].caseId,"status":rows[0].openeID};
                        } else {
                            statusObj = {"caseType":errandType,"id":checkCaseManagement.body[i].caseId,"status":"Okänd"};
                        }                       
                        responseJson.push(statusObj);
                    }               
                } catch (err) {
                    console.log(err);
                    res.status(500).send({"message":"Ett internt fel uppstod"});
                    return err;
                } finally {
                    res.send(responseJson);
                    if (conn) return conn.release();
                } 
            } else {
                res.status(checkCaseManagement.code).send({"status":"error","message":checkCaseManagement.body.message});
            }
                       
        } else {
            res.status(400).send({"status":"error","message":"Organisationsnummer måste innehålla 10 eller 12 siffror och skrivas i formatet NNNNNN-NNNN"});
        }
        
    } else {
        console.log("Anropar sandbox organisation status");
        let sandboxRes = await sandbox.sandboxGetOrganisationStatus(req.params.id);
        if (sandboxRes != "error") {
            res.send(sandboxRes);
        } else {
            res.status(404).send({"message":"Inga ärenden kopplat till organisationsnummer kunde hittas"});
        }
    }
});

app.listen(port, function () {
	console.log(`Lyssnar på port ${port}`);
});