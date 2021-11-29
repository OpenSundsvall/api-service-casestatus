async function sandboxGetStatus(id) {
    id = id.toString();
    if (id == "1") {
        return {"key":"status","value":"Inskickat"};
    } else if (id == "2") {
        return {"key":"status","value":"Klart"};
    } else if (id == "3") {
        return {"key":"status","value":"Ärendet arkiveras"};
    } else {
        return "error";
    } 
}

async function sandboxGetOrganisationStatus(id) {
    id = id.toString();
    if (id == "123456789") {
        return [
                    {"caseType":"Ärende","id":"1","status":"Inskickat"},
                    {"caseType":"Ärende","id":"2","status":"Klart"},
                    {"caseType":"Ärende","id":"3","status":"Ärendet arkiveras"}
                ];
    } else if (id == "234567891") {
        return [
                    {"caseType":"Ärende","id":"1","status":"Inskickat"},
                    {"caseType":"Ärende","id":"2","status":"Klart"},
                    {"caseType":"Ärende","id":"3","status":"Ärendet arkiveras"}
                ];
    } else if (id == "345678912") {
        return [
                    {"caseType":"Ärende","id":"1","status":"Inskickat"},
                    {"caseType":"Ärende","id":"2","status":"Klart"},
                    {"caseType":"Ärende","id":"3","status":"Ärendet arkiveras"}
                ];
    } else {
        return "error";
    } 
}

module.exports.sandboxGetStatus = sandboxGetStatus;
module.exports.sandboxGetOrganisationStatus = sandboxGetOrganisationStatus;