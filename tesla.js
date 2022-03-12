"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var util = require("util");
util.inspect.defaultOptions.depth = null;
var crypto = require("crypto");
var puppeteer = require("puppeteer");
var axios_1 = require("axios");
var TESLA_CLIENT_ID = '81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384';
var TESLA_CLIENT_SECRET = 'c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3';
exports.teslaLogin = function (ws) {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, passcode, browser, page;
        var _this = this;
        return __generator(this, function (_a) {
            email = null;
            password = null;
            passcode = null;
            browser = null;
            ws.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
                var _loop_1, i;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _loop_1 = function () {
                                var msg, e_1, paramsSerializer, redirect_uri, state, code_verifier, code_challenge, queryParams, queryString, url, setUpPage, handleCaptcha, submitForm, submitForm2, retryCount, e_2, hasMfa, e_3, cookies, callbackUrl, code, cookieString, accessTokenRes, tokenRes, e_4;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            msg = null;
                                            _b.label = 1;
                                        case 1:
                                            _b.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, JSON.parse(message)];
                                        case 2:
                                            msg = _b.sent();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            e_1 = _b.sent();
                                            console.log(e_1);
                                            throw e_1;
                                        case 4:
                                            console.log(msg);
                                            if (typeof msg.login !== 'undefined') {
                                                if (typeof msg.email === 'undefined' || typeof msg.password === 'undefined') {
                                                    throw new Error('wrong params in JSON');
                                                }
                                                email = msg.email;
                                                password = msg.password;
                                            }
                                            else if (typeof msg.mfa !== 'undefined') {
                                                if (typeof msg.passcode === 'undefined') {
                                                    throw new Error('wrong params in JSON');
                                                }
                                                passcode = msg.passcode;
                                            }
                                            else {
                                                throw new Error('invalid message');
                                            }
                                            paramsSerializer = function (params) {
                                                return Object.keys(params).map(function (key) {
                                                    return "".concat(key, "=").concat(encodeURIComponent(params[key]).replace(/%20/g, '+').replace(/%3A/g, ':'));
                                                }).join('&');
                                            };
                                            redirect_uri = 'https://auth.tesla.com/void/callback';
                                            state = '123';
                                            code_verifier = crypto.randomBytes(64).toString('base64').replace(/[+/=]/g, function (m) { return ({ '+': '-', '/': '_' }[m] || ''); });
                                            code_challenge = crypto.createHash('sha256')
                                                .update(code_verifier)
                                                .digest('base64')
                                                .replace(/[+/=]/g, function (m) { return ({ '+': '-', '/': '_' }[m] || ''); });
                                            queryParams = {
                                                client_id: 'ownerapi',
                                                code_challenge: code_challenge,
                                                code_challenge_method: 'S256',
                                                redirect_uri: redirect_uri,
                                                response_type: 'code',
                                                scope: 'openid email offline_access',
                                                state: state,
                                                login_hint: email
                                            };
                                            queryString = paramsSerializer(queryParams);
                                            url = "https://auth.tesla.com/oauth2/v3/authorize?".concat(queryString);
                                            if (!(passcode === null)) return [3 /*break*/, 6];
                                            return [4 /*yield*/, puppeteer.launch({ headless: false })];
                                        case 5:
                                            // launch a browser (does not work in headless mode and I haven't figured out why yet)
                                            browser = _b.sent();
                                            _b.label = 6;
                                        case 6:
                                            setUpPage = function () { return __awaiter(_this, void 0, void 0, function () {
                                                var p;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, browser.newPage()];
                                                        case 1:
                                                            p = _a.sent();
                                                            // constantly changing part of the version string seems to help
                                                            return [4 /*yield*/, p.setUserAgent("haha150/1.0.".concat(+new Date()))];
                                                        case 2:
                                                            // constantly changing part of the version string seems to help
                                                            _a.sent();
                                                            return [4 /*yield*/, p.setCacheEnabled(false)];
                                                        case 3:
                                                            _a.sent();
                                                            return [4 /*yield*/, p.goto(url, { waitUntil: 'networkidle0' })];
                                                        case 4:
                                                            _a.sent();
                                                            return [4 /*yield*/, p.waitForTimeout(1000)];
                                                        case 5:
                                                            _a.sent();
                                                            // clicking on the page a few times seems to help
                                                            return [4 /*yield*/, p.click('#main-content')];
                                                        case 6:
                                                            // clicking on the page a few times seems to help
                                                            _a.sent();
                                                            return [4 /*yield*/, p.click('#form-input-credential')];
                                                        case 7:
                                                            _a.sent();
                                                            return [4 /*yield*/, p.click('#main-content')];
                                                        case 8:
                                                            _a.sent();
                                                            return [2 /*return*/, p];
                                                    }
                                                });
                                            }); };
                                            if (!(passcode === null)) return [3 /*break*/, 8];
                                            return [4 /*yield*/, setUpPage()];
                                        case 7:
                                            page = _b.sent();
                                            _b.label = 8;
                                        case 8:
                                            handleCaptcha = function () { return __awaiter(_this, void 0, void 0, function () {
                                                var hasCaptcha, captchaIframe, frame, imagePicker, e_5;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, page.evaluate(function () { return document.querySelector('iframe[title="reCAPTCHA"]') !== null; })];
                                                        case 1:
                                                            hasCaptcha = _a.sent();
                                                            if (!hasCaptcha) return [3 /*break*/, 9];
                                                            return [4 /*yield*/, page.waitForSelector('iframe[title="reCAPTCHA"]')];
                                                        case 2:
                                                            captchaIframe = (_a.sent());
                                                            return [4 /*yield*/, captchaIframe.contentFrame()];
                                                        case 3:
                                                            frame = (_a.sent());
                                                            return [4 /*yield*/, frame.evaluate(function () {
                                                                    document.querySelector('.recaptcha-checkbox').click();
                                                                })];
                                                        case 4:
                                                            _a.sent();
                                                            imagePicker = null;
                                                            _a.label = 5;
                                                        case 5:
                                                            _a.trys.push([5, 7, , 8]);
                                                            return [4 /*yield*/, page.waitForSelector('iframe[title="recaptcha challenge expires in two minutes"]', { timeout: 1000 })];
                                                        case 6:
                                                            imagePicker = _a.sent();
                                                            return [3 /*break*/, 8];
                                                        case 7:
                                                            e_5 = _a.sent();
                                                            console.log(e_5);
                                                            return [3 /*break*/, 8];
                                                        case 8:
                                                            if (imagePicker) {
                                                                throw new Error('Cannot automatically solve image picker!');
                                                            }
                                                            _a.label = 9;
                                                        case 9: return [2 /*return*/];
                                                    }
                                                });
                                            }); };
                                            submitForm = function () { return __awaiter(_this, void 0, void 0, function () {
                                                var navigationPromise;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, handleCaptcha()];
                                                        case 1:
                                                            _a.sent();
                                                            navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 });
                                                            return [4 /*yield*/, page.type('.sign-in-form input[name="credential"]', password)];
                                                        case 2:
                                                            _a.sent();
                                                            return [4 /*yield*/, page.click('#form-submit-continue')];
                                                        case 3:
                                                            _a.sent();
                                                            return [4 /*yield*/, navigationPromise];
                                                        case 4:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); };
                                            submitForm2 = function (ans) { return __awaiter(_this, void 0, void 0, function () {
                                                var navigationPromise;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 });
                                                            return [4 /*yield*/, page.type('input[name="passcode"]', ans)];
                                                        case 1:
                                                            _a.sent();
                                                            return [4 /*yield*/, page.click('#form-submit')];
                                                        case 2:
                                                            _a.sent();
                                                            return [4 /*yield*/, navigationPromise];
                                                        case 3:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); };
                                            _b.label = 9;
                                        case 9:
                                            _b.trys.push([9, 38, , 42]);
                                            if (!(passcode === null)) return [3 /*break*/, 11];
                                            return [4 /*yield*/, submitForm()];
                                        case 10:
                                            _b.sent();
                                            _b.label = 11;
                                        case 11:
                                            retryCount = 0;
                                            _b.label = 12;
                                        case 12:
                                            if (!(retryCount < 10 && !page.url().startsWith('https://auth.tesla.com/void/callback'))) return [3 /*break*/, 35];
                                            console.log('retry');
                                            retryCount++;
                                            return [4 /*yield*/, page.title()];
                                        case 13:
                                            if (!((_b.sent()) === 'Challenge Validation')) return [3 /*break*/, 20];
                                            console.log('Challenge Validation');
                                            _b.label = 14;
                                        case 14:
                                            _b.trys.push([14, 16, , 18]);
                                            return [4 /*yield*/, page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 32000 })];
                                        case 15:
                                            _b.sent();
                                            return [3 /*break*/, 18];
                                        case 16:
                                            e_2 = _b.sent();
                                            // reload if no navigation after 32 seconds
                                            return [4 /*yield*/, page.reload()];
                                        case 17:
                                            // reload if no navigation after 32 seconds
                                            _b.sent();
                                            return [3 /*break*/, 18];
                                        case 18: return [4 /*yield*/, submitForm()];
                                        case 19:
                                            _b.sent();
                                            return [3 /*break*/, 34];
                                        case 20: return [4 /*yield*/, page.title()];
                                        case 21:
                                            if (!((_b.sent()) === 'Access Denied')) return [3 /*break*/, 27];
                                            console.log('Access Denied');
                                            return [4 /*yield*/, page.goto(url, { waitUntil: 'networkidle0' })];
                                        case 22:
                                            _b.sent();
                                            return [4 /*yield*/, page.close()];
                                        case 23:
                                            _b.sent();
                                            return [4 /*yield*/, setUpPage()];
                                        case 24:
                                            page = _b.sent();
                                            // adding a reload seems to help
                                            return [4 /*yield*/, page.reload({ waitUntil: 'networkidle0' })];
                                        case 25:
                                            // adding a reload seems to help
                                            _b.sent();
                                            return [4 /*yield*/, submitForm()];
                                        case 26:
                                            _b.sent();
                                            return [3 /*break*/, 34];
                                        case 27:
                                            console.log('else');
                                            return [4 /*yield*/, page.evaluate(function () { return document.querySelector('[name=passcode]') !== null; })];
                                        case 28:
                                            hasMfa = _b.sent();
                                            if (!hasMfa) return [3 /*break*/, 32];
                                            if (!(passcode !== null)) return [3 /*break*/, 30];
                                            return [4 /*yield*/, submitForm2(passcode)];
                                        case 29:
                                            _b.sent();
                                            return [3 /*break*/, 31];
                                        case 30:
                                            ws.send('MFA');
                                            _b.label = 31;
                                        case 31: return [3 /*break*/, 34];
                                        case 32: return [4 /*yield*/, submitForm()];
                                        case 33:
                                            _b.sent();
                                            _b.label = 34;
                                        case 34: return [3 /*break*/, 12];
                                        case 35:
                                            if (!!page.url().startsWith('https://auth.tesla.com/void/callback')) return [3 /*break*/, 37];
                                            console.log('failed, start over');
                                            return [4 /*yield*/, browser.close()];
                                        case 36:
                                            _b.sent();
                                            passcode = null;
                                            return [2 /*return*/, "continue"];
                                        case 37:
                                            console.log('success');
                                            return [3 /*break*/, 42];
                                        case 38:
                                            e_3 = _b.sent();
                                            if (!(e_3.message === 'Cannot automatically solve image picker!')) return [3 /*break*/, 40];
                                            console.log('CAPTCHA image picker, starting over');
                                            return [4 /*yield*/, browser.close()];
                                        case 39:
                                            _b.sent();
                                            passcode = null;
                                            return [2 /*return*/, "continue"];
                                        case 40: throw e_3;
                                        case 41: return [3 /*break*/, 42];
                                        case 42: return [4 /*yield*/, page.cookies()];
                                        case 43:
                                            cookies = _b.sent();
                                            callbackUrl = page.url();
                                            // close the browser to free up resources
                                            return [4 /*yield*/, browser.close()];
                                        case 44:
                                            // close the browser to free up resources
                                            _b.sent();
                                            code = new URL(callbackUrl).searchParams.get('code');
                                            cookieString = cookies.map(function (cookie) { return "".concat(cookie.name, "=").concat(cookie.value); }).join('; ');
                                            _b.label = 45;
                                        case 45:
                                            _b.trys.push([45, 48, , 49]);
                                            return [4 /*yield*/, axios_1["default"].post('https://auth.tesla.com/oauth2/v3/token', {
                                                    grant_type: 'authorization_code',
                                                    client_id: 'ownerapi',
                                                    code: code,
                                                    code_verifier: code_verifier,
                                                    redirect_uri: redirect_uri
                                                }, {
                                                    headers: {
                                                        Cookie: cookieString
                                                    }
                                                })];
                                        case 46:
                                            accessTokenRes = _b.sent();
                                            return [4 /*yield*/, axios_1["default"].post('https://owner-api.teslamotors.com/oauth/token', {
                                                    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                                                    client_id: TESLA_CLIENT_ID,
                                                    client_secret: TESLA_CLIENT_SECRET
                                                }, {
                                                    headers: {
                                                        Authorization: "Bearer ".concat(accessTokenRes.data.access_token),
                                                        Cookie: cookieString
                                                    }
                                                })];
                                        case 47:
                                            tokenRes = _b.sent();
                                            // this is what we want!
                                            console.log(tokenRes.data);
                                            ws.send(JSON.stringify(tokenRes.data));
                                            ws.close();
                                            return [3 /*break*/, 49];
                                        case 48:
                                            e_4 = _b.sent();
                                            if (axios_1["default"].isAxiosError(e_4)) {
                                                if (e_4.response) {
                                                    console.log({
                                                        status: e_4.response.status,
                                                        responseHeaders: e_4.response.headers,
                                                        responseData: e_4.response.data
                                                    });
                                                }
                                            }
                                            else {
                                                console.error(e_4);
                                            }
                                            throw e_4;
                                        case 49: return [2 /*return*/];
                                    }
                                });
                            };
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 10)) return [3 /*break*/, 4];
                            return [5 /*yield**/, _loop_1()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
};
