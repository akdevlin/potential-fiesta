//A Library of (hopefully) reusable js functions

/*|||||||||||||||||||||||||
|||| DOM Manipulation |||||
|||||||||||||||||||||||||*/

//given a query selector string, it checks to see if the selector is an id and if so it uses a different method to selcet that element
//The Good: Apparently using a different method to selct ID's is faster than just querySelector ALL
//The Bad : The output of this fucntion is query selector string and the utput of that command will differ based on what method it uses
// i.e querySelectorALl returns a nodelist which will have to be looped through with a for loop(map isn't supported) while getElelemtn by ID returns just the element?

    function vanillaQuerySelection(selector) {
        var selectorType = 'querySelectorAll'; //will return a nodelist
        //check to see if we are checking an id
        if (selector.indexOf('#') === 0) {
            selectorType = 'getElementById';//will return an element
            selector = selector.substr(1, selector.length);
        }
        //console.log(document[selectorType](selector));
        return document[selectorType](selector);
      
      
      
