/**
 * This is test file for ModularObject script 
 *
 * @license MIT
 * @author Dmitry Sheiko 
 * @author Marek Kalnik
 * @copyright (c) Dmitry Sheiko http://dsheiko.com
 * @copyright (c) Marek Kalnik
 */
var AbstractModule = function () {
    "use strict";
    return {
        inheritedProp : "inherited property",
        publicProp : "original property"
    };
},
ConcreteModule = function () {
    "use strict";
    var _privateVar = "private";
    return {
        __extends: AbstractModule,  // ConcreteModule extends AbstractModule
        getPrivate : function () {
            return _privateVar;
        },
        publicProp : "overriden property"
    };
};

var o = ModularObject(ConcreteModule);

test('ModularObject', function(){
    equal(true, o instanceof ConcreteModule);
    equal(true, o instanceof AbstractModule);
    equal('private', o.getPrivate());
    equal('overriden property', o.publicProp);
    equal('original property', o.constructor.prototype.publicProp);
});

