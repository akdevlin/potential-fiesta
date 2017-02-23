//never finished working on these...

//found this on so....
//returns true if broswer can handle the spellcheck attribute, 
//returns false if not.
//parameter is an array of objects with the following format
/* argArray = 
 [   '{   "browserName": "IE"", 
 "version" : 8, 
 "comparisonOperator": "<="
 },
 {
 'browserName': 'FireFox', 
 'version' : '30', 
 'comparisonOperator': '=' 
 }'
 ] 
 */
//browser boolean will return true or false depending on use case
//default returnvalue for a matching browser is true
//function browserCheck(browsersArray, browserBoolean) {
//    //check for incorrect or no input for the browser boolean value
//    if ((browserBoolean == undefined) || (typeof (browserBoolean) !== 'boolean')) {
//        browserBoolean = true;
//    }
//    var theBrowsers = browsersArray.map(function (x) {
//        JSON.parse(x);
//    });
//
//    navigator.browserSpecs = (function () {
//        var ua = navigator.userAgent,
//                tem,
//                M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
//        if (/trident/i.test(M[1])) {
//            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
//            return {name: 'IE', version: (tem[1] || '')};
//        }
//        if (M[1] === 'Chrome') {
//            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
//            if (tem != null)
//                return {name: tem[1].replace('OPR', 'Opera'), version: tem[2]};
//        }
//        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
//        if ((tem = ua.match(/version\/(\d+)/i)) != null)
//            M.splice(1, 1, tem[1]);
//        return {name: M[0], version: M[1]};
//    })();
//
//    //console.log(navigator.browserSpecs); //Object { name: "Firefox", version: "42" }
//    //ad debugging
//    adLog.innerHTML = +navigator.browserSpecs.name;
//    adLog.innerHTML = +navigator.browserSpecs.version;
//
//    theBrowsers.map(function (x) {
//        if (navigator.browserSpecs.name === x.browserName) {
//            // Check for the comparison Operator and apply to the corresponding operation
//            if (x.comparisionOperator === '<') {
//                if (navigator.browserSpecs.version < x.version) {
//                    // less test
//                    return browserBoolean;
//                } else {
//                    return !browserBoolean;
//                }
//            } else if (x.comparisionOperator === '>') {
//                if (navigator.browserSpecs.version > x.version) {
//                    // greater test
//                    return browserBoolean;
//                } else {
//                    return !browserBoolean;
//                }
//            } else if (x.comparisionOperator === '=') {
//                if (navigator.browserSpecs.version === x.version) {
//                    // equality test
//                    return browserBoolean;
//                } else {
//                    return !browserBoolean;
//                }
//            } else if (x.comparisionOperator === '!=') {
//                if (navigator.browserSpecs.version !== x.version) {
//                    // inequality test
//                    return browserBoolean;
//                } else {
//                    return !browserBoolean;
//                }
//            } else if (x.comparisionOperator === '<=') {
//                if (navigator.browserSpecs.version <= x.version) {
//                    // less or equal test
//                    return browserBoolean;
//                } else {
//                    return !browserBoolean;
//                }
//            } else if (x.comparisionOperator === '>=') {
//                if (navigator.browserSpecs.version >= x.version) {
//                    // greater or equal test
//                    return browserBoolean;
//                } else {
//                    return !browserBoolean;
//                }
//            } else {
//                throw new Error('Looks like something is off with your comparison operator');
//            }
//
//        } else {
//            console.log('The browsers did not match');
//            return ! else{
//                return !browserBoolean;
//            }
//            ;
//        }
//    });
//
//
//}
