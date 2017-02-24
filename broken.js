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
// not so much broken but more procedural than functional

function adFilter() {
    jQuery(document).ready(function ($) { //jQuery no conflict wrapper for wordpress
        //Change these variables based on the HTML
        var specialSelectionValue = 'selectOne'; //This is the value that will be returned when no option is really selected

        //Initialize variables for answers you seek
        var finalSelectionValues = [];
        var finalCaseStudyValues = [];
        var finalRelevantCaseStudies = [];

        //------------------------------------//
        // -- Get the Tag Selection Values -- //
        //------------------------------------//
        //console.log('Begin getting selection values...');

        //constructor function for selection objects
        function selectionOBJ(elementID) { //remember to use css selectors in your argument so jquery will find the element
            this.idString = elementID;
            this.elementJQ = $(elementID);
            this.optionsJQ = $(elementID + ' option');
            this.currentVal = $(elementID).val();

        }
        //create the objects you seek witht heir html tags
        var locationSelection = new selectionOBJ('#locationTag');
        var fuelSelection = new selectionOBJ('#fuelTag');
        var modelSelection = new selectionOBJ('#modelTag');

        //create some arrays using the objects you just created
        var selectionAY = [locationSelection, fuelSelection, modelSelection]; // BEWARE: this order is important to the other functions. 
        var selectionValues = [selectionAY[0].currentVal, selectionAY[1].currentVal, selectionAY[2].currentVal];

        //console.log('Returning selection values...');
        //get what you need
        finalSelectionValues = selectionValues;

        //---------------------------------//
        // -- Get the Case Study Values -- //
        //---------------------------------//

        console.log("Begin getting the case study values...");

        function caseStudyOBJ() { //empty constructor function for case study objects

        }
        //initizialize an array that you can fill up with the objects you are about to create
        var caseStudyObjectsAY = [];
        //get all of the case studies from the page
        var allCaseStudies = $('.case-study');
        //loop through all of the case studies, and create an object for each one
        for (var i = 0; i < allCaseStudies.length; i++) {
            caseStudyObjectsAY[i] = new caseStudyOBJ();
            caseStudyObjectsAY[i].location = $(allCaseStudies[i]).data('ad-location'); //string
            caseStudyObjectsAY[i].fuel = $(allCaseStudies[i]).data('ad-fuel'); //string
            caseStudyObjectsAY[i].model = $(allCaseStudies[i]).data('ad-model'); //string
            caseStudyObjectsAY[i].visible = $(allCaseStudies[i]).hasClass('ad-visible'); //(bool) -used when testing to see if case study should be visible?
            caseStudyObjectsAY[i].relevant = true; // (bool) this is changed when case study values and selected tags are matched up

        }

        //console.log('Returning case study values...');
        //get what you need
        finalCaseStudyValues = caseStudyObjectsAY;

        //-------------------------------------------------------//
        // -- Check Case Study Values Against Selection Values-- //
        //-------------------------------------------------------//

        //console.log('Begin checking selection values against case study values...');

        //just in case we manipulate the case studies, let's copy the array of selection values
        var caseStudyValues = finalCaseStudyValues;
        //same thing for the array of objects you also created earlier...
        var currentSelectionValues = finalSelectionValues;

        //just a reminder of the special selection value...
        //specialSelectionValue = specialSelectionValue; //this is the value that will be returned when nothing is selected 

        var allCaseStudies = $('.case-study');
        //make sure the arrays have at least the same number of objects
        if (caseStudyValues.length == allCaseStudies.length) {

            //initialize the bo0lean values for the tags
            var locationVerity = false;
            var modelVerity = false;
            var fuelVerity = false;
            //loop through the case study array
            for (var i = 0; i < caseStudyValues.length; i++) {
                //loop through all of the values in the tag array
                var locationVerity = false;
                var fuelVerity = false;
                var modelVerity = false;
                var selectedLocationValue = currentSelectionValues[0];
                var selectedFuelValue = currentSelectionValues[1];
                var selectedModelValue = currentSelectionValues[2];
                //check to see if the current case study has values that match the current selections
                //location flag
                if (selectedLocationValue == caseStudyValues[i].location) {
                    //console.log("The location has matched! " + selectedLocationValue);
                    locationVerity = true;
                }
                //fuel flag
                if (selectedFuelValue == caseStudyValues[i].fuel) {
                    //console.log("The fuel has matched! " + selectedFuelValue);
                    fuelVerity = true;
                }
                //model flag
                if (selectedModelValue == caseStudyValues[i].model) {
                    //console.log("The model has matched! " + selectedModelValue);
                    modelVerity = true;
                }
                //set defaults to true if the value is blank or special value
                if (selectedLocationValue == ('' || specialSelectionValue)) {
                    var locationVerity = true;
                }
                if (selectedFuelValue == ('' || specialSelectionValue)) {
                    var fuelVerity = true;
                }
                if (selectedModelValue == ('' || specialSelectionValue)) {
                    var modelVerity = true;
                }
                //The moment of truth...
                if (locationVerity && fuelVerity && modelVerity) { //if all of the conditions set the flags to true, then set the visibility property on the case study object to true
                    caseStudyValues[i].relevant = true;
                } else {
                    caseStudyValues[i].relevant = false;
                }
            }
        }

        //console.log('Returning relevant case studies...');
        //get what you need
        finalRelevantCaseStudies = caseStudyValues;

        //------------------------------------//
        // -- Display Relevant case Studies-- //
        //------------------------------------//
        //console.log('Begin displaying case studies...');
        //reinstance all case studies
        allCaseStudies = $('.case-study');
        for (var i = 0; i < allCaseStudies.length; i++) {
            if (finalRelevantCaseStudies[i].relevant) {
                $(allCaseStudies[i]).addClass('ad-visible');
                $(allCaseStudies[i]).removeClass('ad-hidden');
                //console.log('finalRelevantCaseStudies[ ' + i + ']' + 'is relevant!!!');
            } else {
                //console.log('finalRelevantCaseStudies[ ' + i + ']' + 'is not relevant!!');
                $(allCaseStudies[i]).removeClass('ad-visible');
                $(allCaseStudies[i]).addClass('ad-hidden');
            }
        }
        //console.log('Relevant case studies have been displayed...');

    });//End the jquery noconflict wrapper for wordpress

}//end the case study filter function


function adShowSearch(buttonId, searchID) {
    var theButton = buttonId;
    var theSearchBox = searchID;
    jQuery(document).ready(function ($) { //
        $(theSearchBox).hide();
        $(theButton).click(function () {
            if($(theSearchBox).hasClass('searching')){
                $(theSearchBox).removeClass('searching');
                $(theSearchBox).slideUp();
            }
            else{
                $(theSearchBox).slideDown();
                $(theSearchBox).addClass('searching');
            }
        });
    });//End the jquery noconflict wrapper for wordpress
}
