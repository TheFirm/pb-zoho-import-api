var rest = require('restling')
    , querystring = require('querystring')
    , _ = require('lodash');
    methods = {};

const API_URL = {
    createSession: 'https://link.privatbank.ua/api/auth/createSession'
    , login: 'https://link.privatbank.ua/api/p24BusinessAuth/createSession'
    , requestSMSCode: 'https://link.privatbank.ua/api/p24BusinessAuth/sendOtp'
    , checkSMSCode: 'https://link.privatbank.ua/api/p24BusinessAuth/checkOtp'
    , getStatements: 'https://link.privatbank.ua/api/p24b/statements'
    , getAccounts: 'https://link.privatbank.ua/api/p24b/rests'
};

var defaultOptions = {
    headers: {
        'Content-Type': 'application/json'
        , 'Accept': 'application/json'
    }
};

var customRest = {
    'get': function (url, opt) {
        return rest.get.call(undefined, url, _.merge(defaultOptions, opt))
    },
    'post': function (url, data) {
        defaultOptions.data = JSON.stringify(data);
        return rest.post.call(undefined, arguments[0], defaultOptions)
    }
};

/**
 * Init session
 * @returns Promise
 */
methods.createSession = function () {
    var credentials = {
        "clientId": "5c6afd92-0612-4e27-aedf-3a182eb52435",
        "clientSecret": "67b9a571d8efbf048a4825742416d725"
    };

    return customRest.post(API_URL.createSession, credentials);
};

/**
 * Login via sessionId, login and password
 * @returns Promise
 */
methods.login = function (data) {
    return customRest.post(API_URL.login, data);
};

/**
 * @param data object {sessionId: sessionId, otpDev: otpDev}
 * @returns Promise
 */
methods.requestSMSCode = function (data) {
    return customRest.post(API_URL.requestSMSCode, data);
};

/**
 * Login via sessionId, login and password
 * @param data object {sessionId: sessionId, otp: otp}
 * @returns Promise
 */
methods.confirmSMSCode = function (data) {
    return customRest.post(API_URL.checkSMSCode, data);
};

/**
 * Get statements
 * @param data object {sessionId: sessionId, stdate:stdate, endate:endate}
 * @returns Promise
 */
methods.getStatements = function (data) {
    var params = {
        stdate: data.stdate,
        endate: data.enddate,
        showInf: '1'
    };

    var opt = {
        headers: {
            'Authorization': 'Token ' + data.sessionId
        }
    };
    var queryUrl = API_URL.getStatements + '?' + querystring.stringify(params);
    return customRest.get(queryUrl, opt);
};

/**
 * Get account list
 * @param data object {sessionId:sessionId}
 * @returns Promise
 */
methods.getAccounts = function (data) {
    var opt = {
        headers: {
            'Authorization': 'Token ' + data.sessionId
        }
    };
    return customRest.get(API_URL.getAccounts, opt);
};

module.exports = methods;
