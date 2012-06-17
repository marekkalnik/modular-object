/**
 * This code provides prototype fixes for objects using Module Pattern
 *
 * It's based on Dmitry Sheiko's code found on his blog:
 * http://dsheiko.com/weblog/prototypal-inheritance-in-javascript-for-modules/
 *
 * It creates a global function called ModularObject rather than modifying
 * Function prototype
 *
 * To use:
 * - pass an object constructor as argument
 * - to specify parent, add __extends property with parent's constructor as
 *   value in the returned object  
 *
 * See the test file for usage example.
 *
 * @license MIT
 * @author Dmitry Sheiko 
 * @author Marek Kalnik
 * @copyright (c) Dmitry Sheiko http://dsheiko.com
 * @copyright (c) Marek Kalnik
 */
(function(window){
    "use strict";
    
    window.ModularObject = function(constructor) {
        var key, module, members, mergedObject;

        module = constructor;
        members = module.apply(this, arguments),
        mergedObject = function () {};

        // Check for __extend property;
        members.hasOwnProperty('__extends') && (module.prototype = window.ModularObject(members.__extends));

        // Link to the supertype
        mergedObject.prototype = module.prototype;
        for (key in members) {
            // Inherit methods
            if (members.hasOwnProperty(key)) {
                mergedObject.prototype[key] = members[key];
            }
        }

        return new mergedObject();
    };
})(this);
