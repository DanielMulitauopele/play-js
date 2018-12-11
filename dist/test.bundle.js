/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/mocha-loader/src/index.js!./test/index-test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/assertion-error/index.js":
/*!***********************************************!*\
  !*** ./node_modules/assertion-error/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */

function exclude () {
  var excludes = [].slice.call(arguments);

  function excludeProps (res, obj) {
    Object.keys(obj).forEach(function (key) {
      if (!~excludes.indexOf(key)) res[key] = obj[key];
    });
  }

  return function extendExclude () {
    var args = [].slice.call(arguments)
      , i = 0
      , res = {};

    for (; i < args.length; i++) {
      excludeProps(res, args[i]);
    }

    return res;
  };
};

/*!
 * Primary Exports
 */

module.exports = AssertionError;

/**
 * ### AssertionError
 *
 * An extension of the JavaScript `Error` constructor for
 * assertion and validation scenarios.
 *
 * @param {String} message
 * @param {Object} properties to include (optional)
 * @param {callee} start stack function (optional)
 */

function AssertionError (message, _props, ssf) {
  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
    , props = extend(_props || {});

  // default values
  this.message = message || 'Unspecified AssertionError';
  this.showDiff = false;

  // copy from properties
  for (var key in props) {
    this[key] = props[key];
  }

  // capture stack trace
  ssf = ssf || AssertionError;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ssf);
  } else {
    try {
      throw new Error();
    } catch(e) {
      this.stack = e.stack;
    }
  }
}

/*!
 * Inherit from Error.prototype
 */

AssertionError.prototype = Object.create(Error.prototype);

/*!
 * Statically set name
 */

AssertionError.prototype.name = 'AssertionError';

/*!
 * Ensure correct constructor
 */

AssertionError.prototype.constructor = AssertionError;

/**
 * Allow errors to be converted to JSON for static transfer.
 *
 * @param {Boolean} include stack (default: `true`)
 * @return {Object} object that can be `JSON.stringify`
 */

AssertionError.prototype.toJSON = function (stack) {
  var extend = exclude('constructor', 'toJSON', 'stack')
    , props = extend({ name: this.name }, this);

  // include stack if exists and not turned off
  if (false !== stack && this.stack) {
    props.stack = this.stack;
  }

  return props;
};


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./test/index-test.js":
/*!************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./test/index-test.js ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var chai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chai */ "./node_modules/chai/index.js");
/* harmony import */ var chai__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chai__WEBPACK_IMPORTED_MODULE_0__);

describe('test', function () {
  it('should return true', function () {
    chai__WEBPACK_IMPORTED_MODULE_0__["assert"].equal(true, true);
  });
});

/***/ }),

/***/ "./node_modules/chai/index.js":
/*!************************************!*\
  !*** ./node_modules/chai/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/chai */ "./node_modules/chai/lib/chai.js");


/***/ }),

/***/ "./node_modules/chai/lib/chai.js":
/*!***************************************!*\
  !*** ./node_modules/chai/lib/chai.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var used = [];

/*!
 * Chai version
 */

exports.version = '4.2.0';

/*!
 * Assertion Error
 */

exports.AssertionError = __webpack_require__(/*! assertion-error */ "./node_modules/assertion-error/index.js");

/*!
 * Utils for plugins (not exported)
 */

var util = __webpack_require__(/*! ./chai/utils */ "./node_modules/chai/lib/chai/utils/index.js");

/**
 * # .use(function)
 *
 * Provides a way to extend the internals of Chai.
 *
 * @param {Function}
 * @returns {this} for chaining
 * @api public
 */

exports.use = function (fn) {
  if (!~used.indexOf(fn)) {
    fn(exports, util);
    used.push(fn);
  }

  return exports;
};

/*!
 * Utility Functions
 */

exports.util = util;

/*!
 * Configuration
 */

var config = __webpack_require__(/*! ./chai/config */ "./node_modules/chai/lib/chai/config.js");
exports.config = config;

/*!
 * Primary `Assertion` prototype
 */

var assertion = __webpack_require__(/*! ./chai/assertion */ "./node_modules/chai/lib/chai/assertion.js");
exports.use(assertion);

/*!
 * Core Assertions
 */

var core = __webpack_require__(/*! ./chai/core/assertions */ "./node_modules/chai/lib/chai/core/assertions.js");
exports.use(core);

/*!
 * Expect interface
 */

var expect = __webpack_require__(/*! ./chai/interface/expect */ "./node_modules/chai/lib/chai/interface/expect.js");
exports.use(expect);

/*!
 * Should interface
 */

var should = __webpack_require__(/*! ./chai/interface/should */ "./node_modules/chai/lib/chai/interface/should.js");
exports.use(should);

/*!
 * Assert interface
 */

var assert = __webpack_require__(/*! ./chai/interface/assert */ "./node_modules/chai/lib/chai/interface/assert.js");
exports.use(assert);


/***/ }),

/***/ "./node_modules/chai/lib/chai/assertion.js":
/*!*************************************************!*\
  !*** ./node_modules/chai/lib/chai/assertion.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var config = __webpack_require__(/*! ./config */ "./node_modules/chai/lib/chai/config.js");

module.exports = function (_chai, util) {
  /*!
   * Module dependencies.
   */

  var AssertionError = _chai.AssertionError
    , flag = util.flag;

  /*!
   * Module export.
   */

  _chai.Assertion = Assertion;

  /*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * `Assertion` objects contain metadata in the form of flags. Three flags can
   * be assigned during instantiation by passing arguments to this constructor:
   *
   * - `object`: This flag contains the target of the assertion. For example, in
   *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
   *   contain `numKittens` so that the `equal` assertion can reference it when
   *   needed.
   *
   * - `message`: This flag contains an optional custom error message to be
   *   prepended to the error message that's generated by the assertion when it
   *   fails.
   *
   * - `ssfi`: This flag stands for "start stack function indicator". It
   *   contains a function reference that serves as the starting point for
   *   removing frames from the stack trace of the error that's created by the
   *   assertion when it fails. The goal is to provide a cleaner stack trace to
   *   end users by removing Chai's internal functions. Note that it only works
   *   in environments that support `Error.captureStackTrace`, and only when
   *   `Chai.config.includeStack` hasn't been set to `false`.
   *
   * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
   *   should retain its current value, even as assertions are chained off of
   *   this object. This is usually set to `true` when creating a new assertion
   *   from within another assertion. It's also temporarily set to `true` before
   *   an overwritten assertion gets called by the overwriting assertion.
   *
   * @param {Mixed} obj target of the assertion
   * @param {String} msg (optional) custom error message
   * @param {Function} ssfi (optional) starting point for removing stack frames
   * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
   * @api private
   */

  function Assertion (obj, msg, ssfi, lockSsfi) {
    flag(this, 'ssfi', ssfi || Assertion);
    flag(this, 'lockSsfi', lockSsfi);
    flag(this, 'object', obj);
    flag(this, 'message', msg);

    return util.proxify(this);
  }

  Object.defineProperty(Assertion, 'includeStack', {
    get: function() {
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
      return config.includeStack;
    },
    set: function(value) {
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
      config.includeStack = value;
    }
  });

  Object.defineProperty(Assertion, 'showDiff', {
    get: function() {
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
      return config.showDiff;
    },
    set: function(value) {
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
      config.showDiff = value;
    }
  });

  Assertion.addProperty = function (name, fn) {
    util.addProperty(this.prototype, name, fn);
  };

  Assertion.addMethod = function (name, fn) {
    util.addMethod(this.prototype, name, fn);
  };

  Assertion.addChainableMethod = function (name, fn, chainingBehavior) {
    util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  Assertion.overwriteProperty = function (name, fn) {
    util.overwriteProperty(this.prototype, name, fn);
  };

  Assertion.overwriteMethod = function (name, fn) {
    util.overwriteMethod(this.prototype, name, fn);
  };

  Assertion.overwriteChainableMethod = function (name, fn, chainingBehavior) {
    util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  /**
   * ### .assert(expression, message, negateMessage, expected, actual, showDiff)
   *
   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
   *
   * @name assert
   * @param {Philosophical} expression to be tested
   * @param {String|Function} message or function that returns message to display if expression fails
   * @param {String|Function} negatedMessage or function that returns negatedMessage to display if negated expression fails
   * @param {Mixed} expected value (remember to check for negation)
   * @param {Mixed} actual (optional) will default to `this.obj`
   * @param {Boolean} showDiff (optional) when set to `true`, assert will display a diff in addition to the message if expression fails
   * @api private
   */

  Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
    var ok = util.test(this, arguments);
    if (false !== showDiff) showDiff = true;
    if (undefined === expected && undefined === _actual) showDiff = false;
    if (true !== config.showDiff) showDiff = false;

    if (!ok) {
      msg = util.getMessage(this, arguments);
      var actual = util.getActual(this, arguments);
      throw new AssertionError(msg, {
          actual: actual
        , expected: expected
        , showDiff: showDiff
      }, (config.includeStack) ? this.assert : flag(this, 'ssfi'));
    }
  };

  /*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   */

  Object.defineProperty(Assertion.prototype, '_obj',
    { get: function () {
        return flag(this, 'object');
      }
    , set: function (val) {
        flag(this, 'object', val);
      }
  });
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/config.js":
/*!**********************************************!*\
  !*** ./node_modules/chai/lib/chai/config.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {

  /**
   * ### config.includeStack
   *
   * User configurable property, influences whether stack trace
   * is included in Assertion error message. Default of false
   * suppresses stack trace in the error message.
   *
   *     chai.config.includeStack = true;  // enable stack on error
   *
   * @param {Boolean}
   * @api public
   */

  includeStack: false,

  /**
   * ### config.showDiff
   *
   * User configurable property, influences whether or not
   * the `showDiff` flag should be included in the thrown
   * AssertionErrors. `false` will always be `false`; `true`
   * will be true when the assertion has requested a diff
   * be shown.
   *
   * @param {Boolean}
   * @api public
   */

  showDiff: true,

  /**
   * ### config.truncateThreshold
   *
   * User configurable property, sets length threshold for actual and
   * expected values in assertion errors. If this threshold is exceeded, for
   * example for large data structures, the value is replaced with something
   * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
   *
   * Set it to zero if you want to disable truncating altogether.
   *
   * This is especially userful when doing assertions on arrays: having this
   * set to a reasonable large value makes the failure messages readily
   * inspectable.
   *
   *     chai.config.truncateThreshold = 0;  // disable truncating
   *
   * @param {Number}
   * @api public
   */

  truncateThreshold: 40,

  /**
   * ### config.useProxy
   *
   * User configurable property, defines if chai will use a Proxy to throw
   * an error when a non-existent property is read, which protects users
   * from typos when using property-based assertions.
   *
   * Set it to false if you want to disable this feature.
   *
   *     chai.config.useProxy = false;  // disable use of Proxy
   *
   * This feature is automatically disabled regardless of this config value
   * in environments that don't support proxies.
   *
   * @param {Boolean}
   * @api public
   */

  useProxy: true,

  /**
   * ### config.proxyExcludedKeys
   *
   * User configurable property, defines which properties should be ignored
   * instead of throwing an error if they do not exist on the assertion.
   * This is only applied if the environment Chai is running in supports proxies and
   * if the `useProxy` configuration setting is enabled.
   * By default, `then` and `inspect` will not throw an error if they do not exist on the
   * assertion object because the `.inspect` property is read by `util.inspect` (for example, when
   * using `console.log` on the assertion object) and `.then` is necessary for promise type-checking.
   *
   *     // By default these keys will not throw an error if they do not exist on the assertion object
   *     chai.config.proxyExcludedKeys = ['then', 'inspect'];
   *
   * @param {Array}
   * @api public
   */

  proxyExcludedKeys: ['then', 'catch', 'inspect', 'toJSON']
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/core/assertions.js":
/*!*******************************************************!*\
  !*** ./node_modules/chai/lib/chai/core/assertions.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, _) {
  var Assertion = chai.Assertion
    , AssertionError = chai.AssertionError
    , flag = _.flag;

  /**
   * ### Language Chains
   *
   * The following are provided as chainable getters to improve the readability
   * of your assertions.
   *
   * **Chains**
   *
   * - to
   * - be
   * - been
   * - is
   * - that
   * - which
   * - and
   * - has
   * - have
   * - with
   * - at
   * - of
   * - same
   * - but
   * - does
   * - still
   *
   * @name language chains
   * @namespace BDD
   * @api public
   */

  [ 'to', 'be', 'been', 'is'
  , 'and', 'has', 'have', 'with'
  , 'that', 'which', 'at', 'of'
  , 'same', 'but', 'does', 'still' ].forEach(function (chain) {
    Assertion.addProperty(chain);
  });

  /**
   * ### .not
   *
   * Negates all assertions that follow in the chain.
   *
   *     expect(function () {}).to.not.throw();
   *     expect({a: 1}).to.not.have.property('b');
   *     expect([1, 2]).to.be.an('array').that.does.not.include(3);
   *
   * Just because you can negate any assertion with `.not` doesn't mean you
   * should. With great power comes great responsibility. It's often best to
   * assert that the one expected output was produced, rather than asserting
   * that one of countless unexpected outputs wasn't produced. See individual
   * assertions for specific guidance.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.equal(1); // Not recommended
   *
   * @name not
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('not', function () {
    flag(this, 'negate', true);
  });

  /**
   * ### .deep
   *
   * Causes all `.equal`, `.include`, `.members`, `.keys`, and `.property`
   * assertions that follow in the chain to use deep equality instead of strict
   * (`===`) equality. See the `deep-eql` project page for info on the deep
   * equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) equals `{a: 1}`
   *     expect({a: 1}).to.deep.equal({a: 1});
   *     expect({a: 1}).to.not.equal({a: 1});
   *
   *     // Target array deeply (but not strictly) includes `{a: 1}`
   *     expect([{a: 1}]).to.deep.include({a: 1});
   *     expect([{a: 1}]).to.not.include({a: 1});
   *
   *     // Target object deeply (but not strictly) includes `x: {a: 1}`
   *     expect({x: {a: 1}}).to.deep.include({x: {a: 1}});
   *     expect({x: {a: 1}}).to.not.include({x: {a: 1}});
   *
   *     // Target array deeply (but not strictly) has member `{a: 1}`
   *     expect([{a: 1}]).to.have.deep.members([{a: 1}]);
   *     expect([{a: 1}]).to.not.have.members([{a: 1}]);
   *
   *     // Target set deeply (but not strictly) has key `{a: 1}`
   *     expect(new Set([{a: 1}])).to.have.deep.keys([{a: 1}]);
   *     expect(new Set([{a: 1}])).to.not.have.keys([{a: 1}]);
   *
   *     // Target object deeply (but not strictly) has property `x: {a: 1}`
   *     expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});
   *     expect({x: {a: 1}}).to.not.have.property('x', {a: 1});
   *
   * @name deep
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('deep', function () {
    flag(this, 'deep', true);
  });

  /**
   * ### .nested
   *
   * Enables dot- and bracket-notation in all `.property` and `.include`
   * assertions that follow in the chain.
   *
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
   *     expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 'x'}}).to.have.nested.property('\\.a.\\[b\\]');
   *     expect({'.a': {'[b]': 'x'}}).to.nested.include({'\\.a.\\[b\\]': 'x'});
   *
   * `.nested` cannot be combined with `.own`.
   *
   * @name nested
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('nested', function () {
    flag(this, 'nested', true);
  });

  /**
   * ### .own
   *
   * Causes all `.property` and `.include` assertions that follow in the chain
   * to ignore inherited properties.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.have.own.property('a');
   *     expect({a: 1}).to.have.property('b');
   *     expect({a: 1}).to.not.have.own.property('b');
   *
   *     expect({a: 1}).to.own.include({a: 1});
   *     expect({a: 1}).to.include({b: 2}).but.not.own.include({b: 2});
   *
   * `.own` cannot be combined with `.nested`.
   *
   * @name own
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('own', function () {
    flag(this, 'own', true);
  });

  /**
   * ### .ordered
   *
   * Causes all `.members` assertions that follow in the chain to require that
   * members be in the same order.
   *
   *     expect([1, 2]).to.have.ordered.members([1, 2])
   *       .but.not.have.ordered.members([2, 1]);
   *
   * When `.include` and `.ordered` are combined, the ordering begins at the
   * start of both arrays.
   *
   *     expect([1, 2, 3]).to.include.ordered.members([1, 2])
   *       .but.not.include.ordered.members([2, 3]);
   *
   * @name ordered
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('ordered', function () {
    flag(this, 'ordered', true);
  });

  /**
   * ### .any
   *
   * Causes all `.keys` assertions that follow in the chain to only require that
   * the target have at least one of the given keys. This is the opposite of
   * `.all`, which requires that the target have all of the given keys.
   *
   *     expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
   *
   * See the `.keys` doc for guidance on when to use `.any` or `.all`.
   *
   * @name any
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('any', function () {
    flag(this, 'any', true);
    flag(this, 'all', false);
  });

  /**
   * ### .all
   *
   * Causes all `.keys` assertions that follow in the chain to require that the
   * target have all of the given keys. This is the opposite of `.any`, which
   * only requires that the target have at least one of the given keys.
   *
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *
   * Note that `.all` is used by default when neither `.all` nor `.any` are
   * added earlier in the chain. However, it's often best to add `.all` anyway
   * because it improves readability.
   *
   * See the `.keys` doc for guidance on when to use `.any` or `.all`.
   *
   * @name all
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('all', function () {
    flag(this, 'all', true);
    flag(this, 'any', false);
  });

  /**
   * ### .a(type[, msg])
   *
   * Asserts that the target's type is equal to the given string `type`. Types
   * are case insensitive. See the `type-detect` project page for info on the
   * type detection algorithm: https://github.com/chaijs/type-detect.
   *
   *     expect('foo').to.be.a('string');
   *     expect({a: 1}).to.be.an('object');
   *     expect(null).to.be.a('null');
   *     expect(undefined).to.be.an('undefined');
   *     expect(new Error).to.be.an('error');
   *     expect(Promise.resolve()).to.be.a('promise');
   *     expect(new Float32Array).to.be.a('float32array');
   *     expect(Symbol()).to.be.a('symbol');
   *
   * `.a` supports objects that have a custom type set via `Symbol.toStringTag`.
   *
   *     var myObj = {
   *       [Symbol.toStringTag]: 'myCustomType'
   *     };
   *
   *     expect(myObj).to.be.a('myCustomType').but.not.an('object');
   *
   * It's often best to use `.a` to check a target's type before making more
   * assertions on the same target. That way, you avoid unexpected behavior from
   * any assertion that does different things based on the target's type.
   *
   *     expect([1, 2, 3]).to.be.an('array').that.includes(2);
   *     expect([]).to.be.an('array').that.is.empty;
   *
   * Add `.not` earlier in the chain to negate `.a`. However, it's often best to
   * assert that the target is the expected type, rather than asserting that it
   * isn't one of many unexpected types.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.an('array'); // Not recommended
   *
   * `.a` accepts an optional `msg` argument which is a custom error message to
   * show when the assertion fails. The message can also be given as the second
   * argument to `expect`.
   *
   *     expect(1).to.be.a('string', 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.a('string');
   *
   * `.a` can also be used as a language chain to improve the readability of
   * your assertions.
   *
   *     expect({b: 2}).to.have.a.property('b');
   *
   * The alias `.an` can be used interchangeably with `.a`.
   *
   * @name a
   * @alias an
   * @param {String} type
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function an (type, msg) {
    if (msg) flag(this, 'message', msg);
    type = type.toLowerCase();
    var obj = flag(this, 'object')
      , article = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(type.charAt(0)) ? 'an ' : 'a ';

    this.assert(
        type === _.type(obj).toLowerCase()
      , 'expected #{this} to be ' + article + type
      , 'expected #{this} not to be ' + article + type
    );
  }

  Assertion.addChainableMethod('an', an);
  Assertion.addChainableMethod('a', an);

  /**
   * ### .include(val[, msg])
   *
   * When the target is a string, `.include` asserts that the given string `val`
   * is a substring of the target.
   *
   *     expect('foobar').to.include('foo');
   *
   * When the target is an array, `.include` asserts that the given `val` is a
   * member of the target.
   *
   *     expect([1, 2, 3]).to.include(2);
   *
   * When the target is an object, `.include` asserts that the given object
   * `val`'s properties are a subset of the target's properties.
   *
   *     expect({a: 1, b: 2, c: 3}).to.include({a: 1, b: 2});
   *
   * When the target is a Set or WeakSet, `.include` asserts that the given `val` is a
   * member of the target. SameValueZero equality algorithm is used.
   *
   *     expect(new Set([1, 2])).to.include(2);
   *
   * When the target is a Map, `.include` asserts that the given `val` is one of
   * the values of the target. SameValueZero equality algorithm is used.
   *
   *     expect(new Map([['a', 1], ['b', 2]])).to.include(2);
   *
   * Because `.include` does different things based on the target's type, it's
   * important to check the target's type before using `.include`. See the `.a`
   * doc for info on testing a target's type.
   *
   *     expect([1, 2, 3]).to.be.an('array').that.includes(2);
   *
   * By default, strict (`===`) equality is used to compare array members and
   * object properties. Add `.deep` earlier in the chain to use deep equality
   * instead (WeakSet targets are not supported). See the `deep-eql` project
   * page for info on the deep equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target array deeply (but not strictly) includes `{a: 1}`
   *     expect([{a: 1}]).to.deep.include({a: 1});
   *     expect([{a: 1}]).to.not.include({a: 1});
   *
   *     // Target object deeply (but not strictly) includes `x: {a: 1}`
   *     expect({x: {a: 1}}).to.deep.include({x: {a: 1}});
   *     expect({x: {a: 1}}).to.not.include({x: {a: 1}});
   *
   * By default, all of the target's properties are searched when working with
   * objects. This includes properties that are inherited and/or non-enumerable.
   * Add `.own` earlier in the chain to exclude the target's inherited
   * properties from the search.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.own.include({a: 1});
   *     expect({a: 1}).to.include({b: 2}).but.not.own.include({b: 2});
   *
   * Note that a target object is always only searched for `val`'s own
   * enumerable properties.
   *
   * `.deep` and `.own` can be combined.
   *
   *     expect({a: {b: 2}}).to.deep.own.include({a: {b: 2}});
   *
   * Add `.nested` earlier in the chain to enable dot- and bracket-notation when
   * referencing nested properties.
   *
   *     expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 2}}).to.nested.include({'\\.a.\\[b\\]': 2});
   *
   * `.deep` and `.nested` can be combined.
   *
   *     expect({a: {b: [{c: 3}]}}).to.deep.nested.include({'a.b[0]': {c: 3}});
   *
   * `.own` and `.nested` cannot be combined.
   *
   * Add `.not` earlier in the chain to negate `.include`.
   *
   *     expect('foobar').to.not.include('taco');
   *     expect([1, 2, 3]).to.not.include(4);
   *
   * However, it's dangerous to negate `.include` when the target is an object.
   * The problem is that it creates uncertain expectations by asserting that the
   * target object doesn't have all of `val`'s key/value pairs but may or may
   * not have some of them. It's often best to identify the exact output that's
   * expected, and then write an assertion that only accepts that exact output.
   *
   * When the target object isn't even expected to have `val`'s keys, it's
   * often best to assert exactly that.
   *
   *     expect({c: 3}).to.not.have.any.keys('a', 'b'); // Recommended
   *     expect({c: 3}).to.not.include({a: 1, b: 2}); // Not recommended
   *
   * When the target object is expected to have `val`'s keys, it's often best to
   * assert that each of the properties has its expected value, rather than
   * asserting that each property doesn't have one of many unexpected values.
   *
   *     expect({a: 3, b: 4}).to.include({a: 3, b: 4}); // Recommended
   *     expect({a: 3, b: 4}).to.not.include({a: 1, b: 2}); // Not recommended
   *
   * `.include` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2, 3]).to.include(4, 'nooo why fail??');
   *     expect([1, 2, 3], 'nooo why fail??').to.include(4);
   *
   * `.include` can also be used as a language chain, causing all `.members` and
   * `.keys` assertions that follow in the chain to require the target to be a
   * superset of the expected set, rather than an identical set. Note that
   * `.members` ignores duplicates in the subset when `.include` is added.
   *
   *     // Target object's keys are a superset of ['a', 'b'] but not identical
   *     expect({a: 1, b: 2, c: 3}).to.include.all.keys('a', 'b');
   *     expect({a: 1, b: 2, c: 3}).to.not.have.all.keys('a', 'b');
   *
   *     // Target array is a superset of [1, 2] but not identical
   *     expect([1, 2, 3]).to.include.members([1, 2]);
   *     expect([1, 2, 3]).to.not.have.members([1, 2]);
   *
   *     // Duplicates in the subset are ignored
   *     expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
   *
   * Note that adding `.any` earlier in the chain causes the `.keys` assertion
   * to ignore `.include`.
   *
   *     // Both assertions are identical
   *     expect({a: 1}).to.include.any.keys('a', 'b');
   *     expect({a: 1}).to.have.any.keys('a', 'b');
   *
   * The aliases `.includes`, `.contain`, and `.contains` can be used
   * interchangeably with `.include`.
   *
   * @name include
   * @alias contain
   * @alias includes
   * @alias contains
   * @param {Mixed} val
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function SameValueZero(a, b) {
    return (_.isNaN(a) && _.isNaN(b)) || a === b;
  }

  function includeChainingBehavior () {
    flag(this, 'contains', true);
  }

  function include (val, msg) {
    if (msg) flag(this, 'message', msg);

    var obj = flag(this, 'object')
      , objType = _.type(obj).toLowerCase()
      , flagMsg = flag(this, 'message')
      , negate = flag(this, 'negate')
      , ssfi = flag(this, 'ssfi')
      , isDeep = flag(this, 'deep')
      , descriptor = isDeep ? 'deep ' : '';

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    var included = false;

    switch (objType) {
      case 'string':
        included = obj.indexOf(val) !== -1;
        break;

      case 'weakset':
        if (isDeep) {
          throw new AssertionError(
            flagMsg + 'unable to use .deep.include with WeakSet',
            undefined,
            ssfi
          );
        }

        included = obj.has(val);
        break;

      case 'map':
        var isEql = isDeep ? _.eql : SameValueZero;
        obj.forEach(function (item) {
          included = included || isEql(item, val);
        });
        break;

      case 'set':
        if (isDeep) {
          obj.forEach(function (item) {
            included = included || _.eql(item, val);
          });
        } else {
          included = obj.has(val);
        }
        break;

      case 'array':
        if (isDeep) {
          included = obj.some(function (item) {
            return _.eql(item, val);
          })
        } else {
          included = obj.indexOf(val) !== -1;
        }
        break;

      default:
        // This block is for asserting a subset of properties in an object.
        // `_.expectTypes` isn't used here because `.include` should work with
        // objects with a custom `@@toStringTag`.
        if (val !== Object(val)) {
          throw new AssertionError(
            flagMsg + 'object tested must be an array, a map, an object,'
              + ' a set, a string, or a weakset, but ' + objType + ' given',
            undefined,
            ssfi
          );
        }

        var props = Object.keys(val)
          , firstErr = null
          , numErrs = 0;

        props.forEach(function (prop) {
          var propAssertion = new Assertion(obj);
          _.transferFlags(this, propAssertion, true);
          flag(propAssertion, 'lockSsfi', true);

          if (!negate || props.length === 1) {
            propAssertion.property(prop, val[prop]);
            return;
          }

          try {
            propAssertion.property(prop, val[prop]);
          } catch (err) {
            if (!_.checkError.compatibleConstructor(err, AssertionError)) {
              throw err;
            }
            if (firstErr === null) firstErr = err;
            numErrs++;
          }
        }, this);

        // When validating .not.include with multiple properties, we only want
        // to throw an assertion error if all of the properties are included,
        // in which case we throw the first property assertion error that we
        // encountered.
        if (negate && props.length > 1 && numErrs === props.length) {
          throw firstErr;
        }
        return;
    }

    // Assert inclusion in collection or substring in a string.
    this.assert(
      included
      , 'expected #{this} to ' + descriptor + 'include ' + _.inspect(val)
      , 'expected #{this} to not ' + descriptor + 'include ' + _.inspect(val));
  }

  Assertion.addChainableMethod('include', include, includeChainingBehavior);
  Assertion.addChainableMethod('contain', include, includeChainingBehavior);
  Assertion.addChainableMethod('contains', include, includeChainingBehavior);
  Assertion.addChainableMethod('includes', include, includeChainingBehavior);

  /**
   * ### .ok
   *
   * Asserts that the target is a truthy value (considered `true` in boolean context).
   * However, it's often best to assert that the target is strictly (`===`) or
   * deeply equal to its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.ok; // Not recommended
   *
   *     expect(true).to.be.true; // Recommended
   *     expect(true).to.be.ok; // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.ok`.
   *
   *     expect(0).to.equal(0); // Recommended
   *     expect(0).to.not.be.ok; // Not recommended
   *
   *     expect(false).to.be.false; // Recommended
   *     expect(false).to.not.be.ok; // Not recommended
   *
   *     expect(null).to.be.null; // Recommended
   *     expect(null).to.not.be.ok; // Not recommended
   *
   *     expect(undefined).to.be.undefined; // Recommended
   *     expect(undefined).to.not.be.ok; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(false, 'nooo why fail??').to.be.ok;
   *
   * @name ok
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('ok', function () {
    this.assert(
        flag(this, 'object')
      , 'expected #{this} to be truthy'
      , 'expected #{this} to be falsy');
  });

  /**
   * ### .true
   *
   * Asserts that the target is strictly (`===`) equal to `true`.
   *
   *     expect(true).to.be.true;
   *
   * Add `.not` earlier in the chain to negate `.true`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `true`.
   *
   *     expect(false).to.be.false; // Recommended
   *     expect(false).to.not.be.true; // Not recommended
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.true; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(false, 'nooo why fail??').to.be.true;
   *
   * @name true
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('true', function () {
    this.assert(
        true === flag(this, 'object')
      , 'expected #{this} to be true'
      , 'expected #{this} to be false'
      , flag(this, 'negate') ? false : true
    );
  });

  /**
   * ### .false
   *
   * Asserts that the target is strictly (`===`) equal to `false`.
   *
   *     expect(false).to.be.false;
   *
   * Add `.not` earlier in the chain to negate `.false`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to `false`.
   *
   *     expect(true).to.be.true; // Recommended
   *     expect(true).to.not.be.false; // Not recommended
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.false; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(true, 'nooo why fail??').to.be.false;
   *
   * @name false
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('false', function () {
    this.assert(
        false === flag(this, 'object')
      , 'expected #{this} to be false'
      , 'expected #{this} to be true'
      , flag(this, 'negate') ? true : false
    );
  });

  /**
   * ### .null
   *
   * Asserts that the target is strictly (`===`) equal to `null`.
   *
   *     expect(null).to.be.null;
   *
   * Add `.not` earlier in the chain to negate `.null`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `null`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.null; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.null;
   *
   * @name null
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('null', function () {
    this.assert(
        null === flag(this, 'object')
      , 'expected #{this} to be null'
      , 'expected #{this} not to be null'
    );
  });

  /**
   * ### .undefined
   *
   * Asserts that the target is strictly (`===`) equal to `undefined`.
   *
   *     expect(undefined).to.be.undefined;
   *
   * Add `.not` earlier in the chain to negate `.undefined`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to `undefined`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.undefined; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.undefined;
   *
   * @name undefined
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('undefined', function () {
    this.assert(
        undefined === flag(this, 'object')
      , 'expected #{this} to be undefined'
      , 'expected #{this} not to be undefined'
    );
  });

  /**
   * ### .NaN
   *
   * Asserts that the target is exactly `NaN`.
   *
   *     expect(NaN).to.be.NaN;
   *
   * Add `.not` earlier in the chain to negate `.NaN`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `NaN`.
   *
   *     expect('foo').to.equal('foo'); // Recommended
   *     expect('foo').to.not.be.NaN; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.NaN;
   *
   * @name NaN
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('NaN', function () {
    this.assert(
        _.isNaN(flag(this, 'object'))
        , 'expected #{this} to be NaN'
        , 'expected #{this} not to be NaN'
    );
  });

  /**
   * ### .exist
   *
   * Asserts that the target is not strictly (`===`) equal to either `null` or
   * `undefined`. However, it's often best to assert that the target is equal to
   * its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.exist; // Not recommended
   *
   *     expect(0).to.equal(0); // Recommended
   *     expect(0).to.exist; // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.exist`.
   *
   *     expect(null).to.be.null; // Recommended
   *     expect(null).to.not.exist; // Not recommended
   *
   *     expect(undefined).to.be.undefined; // Recommended
   *     expect(undefined).to.not.exist; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(null, 'nooo why fail??').to.exist;
   *
   * @name exist
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('exist', function () {
    var val = flag(this, 'object');
    this.assert(
        val !== null && val !== undefined
      , 'expected #{this} to exist'
      , 'expected #{this} to not exist'
    );
  });

  /**
   * ### .empty
   *
   * When the target is a string or array, `.empty` asserts that the target's
   * `length` property is strictly (`===`) equal to `0`.
   *
   *     expect([]).to.be.empty;
   *     expect('').to.be.empty;
   *
   * When the target is a map or set, `.empty` asserts that the target's `size`
   * property is strictly equal to `0`.
   *
   *     expect(new Set()).to.be.empty;
   *     expect(new Map()).to.be.empty;
   *
   * When the target is a non-function object, `.empty` asserts that the target
   * doesn't have any own enumerable properties. Properties with Symbol-based
   * keys are excluded from the count.
   *
   *     expect({}).to.be.empty;
   *
   * Because `.empty` does different things based on the target's type, it's
   * important to check the target's type before using `.empty`. See the `.a`
   * doc for info on testing a target's type.
   *
   *     expect([]).to.be.an('array').that.is.empty;
   *
   * Add `.not` earlier in the chain to negate `.empty`. However, it's often
   * best to assert that the target contains its expected number of values,
   * rather than asserting that it's not empty.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.not.be.empty; // Not recommended
   *
   *     expect(new Set([1, 2, 3])).to.have.property('size', 3); // Recommended
   *     expect(new Set([1, 2, 3])).to.not.be.empty; // Not recommended
   *
   *     expect(Object.keys({a: 1})).to.have.lengthOf(1); // Recommended
   *     expect({a: 1}).to.not.be.empty; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect([1, 2, 3], 'nooo why fail??').to.be.empty;
   *
   * @name empty
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('empty', function () {
    var val = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , flagMsg = flag(this, 'message')
      , itemsCount;

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    switch (_.type(val).toLowerCase()) {
      case 'array':
      case 'string':
        itemsCount = val.length;
        break;
      case 'map':
      case 'set':
        itemsCount = val.size;
        break;
      case 'weakmap':
      case 'weakset':
        throw new AssertionError(
          flagMsg + '.empty was passed a weak collection',
          undefined,
          ssfi
        );
      case 'function':
        var msg = flagMsg + '.empty was passed a function ' + _.getName(val);
        throw new AssertionError(msg.trim(), undefined, ssfi);
      default:
        if (val !== Object(val)) {
          throw new AssertionError(
            flagMsg + '.empty was passed non-string primitive ' + _.inspect(val),
            undefined,
            ssfi
          );
        }
        itemsCount = Object.keys(val).length;
    }

    this.assert(
        0 === itemsCount
      , 'expected #{this} to be empty'
      , 'expected #{this} not to be empty'
    );
  });

  /**
   * ### .arguments
   *
   * Asserts that the target is an `arguments` object.
   *
   *     function test () {
   *       expect(arguments).to.be.arguments;
   *     }
   *
   *     test();
   *
   * Add `.not` earlier in the chain to negate `.arguments`. However, it's often
   * best to assert which type the target is expected to be, rather than
   * asserting that its not an `arguments` object.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.arguments; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({}, 'nooo why fail??').to.be.arguments;
   *
   * The alias `.Arguments` can be used interchangeably with `.arguments`.
   *
   * @name arguments
   * @alias Arguments
   * @namespace BDD
   * @api public
   */

  function checkArguments () {
    var obj = flag(this, 'object')
      , type = _.type(obj);
    this.assert(
        'Arguments' === type
      , 'expected #{this} to be arguments but got ' + type
      , 'expected #{this} to not be arguments'
    );
  }

  Assertion.addProperty('arguments', checkArguments);
  Assertion.addProperty('Arguments', checkArguments);

  /**
   * ### .equal(val[, msg])
   *
   * Asserts that the target is strictly (`===`) equal to the given `val`.
   *
   *     expect(1).to.equal(1);
   *     expect('foo').to.equal('foo');
   *
   * Add `.deep` earlier in the chain to use deep equality instead. See the
   * `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) equals `{a: 1}`
   *     expect({a: 1}).to.deep.equal({a: 1});
   *     expect({a: 1}).to.not.equal({a: 1});
   *
   *     // Target array deeply (but not strictly) equals `[1, 2]`
   *     expect([1, 2]).to.deep.equal([1, 2]);
   *     expect([1, 2]).to.not.equal([1, 2]);
   *
   * Add `.not` earlier in the chain to negate `.equal`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to one of countless unexpected values.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.equal(2); // Not recommended
   *
   * `.equal` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.equal(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.equal(2);
   *
   * The aliases `.equals` and `eq` can be used interchangeably with `.equal`.
   *
   * @name equal
   * @alias equals
   * @alias eq
   * @param {Mixed} val
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertEqual (val, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'deep')) {
      var prevLockSsfi = flag(this, 'lockSsfi');
      flag(this, 'lockSsfi', true);
      this.eql(val);
      flag(this, 'lockSsfi', prevLockSsfi);
    } else {
      this.assert(
          val === obj
        , 'expected #{this} to equal #{exp}'
        , 'expected #{this} to not equal #{exp}'
        , val
        , this._obj
        , true
      );
    }
  }

  Assertion.addMethod('equal', assertEqual);
  Assertion.addMethod('equals', assertEqual);
  Assertion.addMethod('eq', assertEqual);

  /**
   * ### .eql(obj[, msg])
   *
   * Asserts that the target is deeply equal to the given `obj`. See the
   * `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target object is deeply (but not strictly) equal to {a: 1}
   *     expect({a: 1}).to.eql({a: 1}).but.not.equal({a: 1});
   *
   *     // Target array is deeply (but not strictly) equal to [1, 2]
   *     expect([1, 2]).to.eql([1, 2]).but.not.equal([1, 2]);
   *
   * Add `.not` earlier in the chain to negate `.eql`. However, it's often best
   * to assert that the target is deeply equal to its expected value, rather
   * than not deeply equal to one of countless unexpected values.
   *
   *     expect({a: 1}).to.eql({a: 1}); // Recommended
   *     expect({a: 1}).to.not.eql({b: 2}); // Not recommended
   *
   * `.eql` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect({a: 1}).to.eql({b: 2}, 'nooo why fail??');
   *     expect({a: 1}, 'nooo why fail??').to.eql({b: 2});
   *
   * The alias `.eqls` can be used interchangeably with `.eql`.
   *
   * The `.deep.equal` assertion is almost identical to `.eql` but with one
   * difference: `.deep.equal` causes deep equality comparisons to also be used
   * for any other assertions that follow in the chain.
   *
   * @name eql
   * @alias eqls
   * @param {Mixed} obj
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertEql(obj, msg) {
    if (msg) flag(this, 'message', msg);
    this.assert(
        _.eql(obj, flag(this, 'object'))
      , 'expected #{this} to deeply equal #{exp}'
      , 'expected #{this} to not deeply equal #{exp}'
      , obj
      , this._obj
      , true
    );
  }

  Assertion.addMethod('eql', assertEql);
  Assertion.addMethod('eqls', assertEql);

  /**
   * ### .above(n[, msg])
   *
   * Asserts that the target is a number or a date greater than the given number or date `n` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.above(1); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is greater than the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.above(2); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.above(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.above`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(1).to.not.be.above(2); // Not recommended
   *
   * `.above` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.above(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.above(2);
   *
   * The aliases `.gt` and `.greaterThan` can be used interchangeably with
   * `.above`.
   *
   * @name above
   * @alias gt
   * @alias greaterThan
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertAbove (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , errorMessage
      , shouldThrow = true;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to above must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to above must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount > n
        , 'expected #{this} to have a ' + descriptor + ' above #{exp} but got #{act}'
        , 'expected #{this} to not have a ' + descriptor + ' above #{exp}'
        , n
        , itemsCount
      );
    } else {
      this.assert(
          obj > n
        , 'expected #{this} to be above #{exp}'
        , 'expected #{this} to be at most #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('above', assertAbove);
  Assertion.addMethod('gt', assertAbove);
  Assertion.addMethod('greaterThan', assertAbove);

  /**
   * ### .least(n[, msg])
   *
   * Asserts that the target is a number or a date greater than or equal to the given
   * number or date `n` respectively. However, it's often best to assert that the target is equal to
   * its expected value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.at.least(1); // Not recommended
   *     expect(2).to.be.at.least(2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is greater than or equal to the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.at.least(2); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.at.least(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.least`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.at.least(2); // Not recommended
   *
   * `.least` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.at.least(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.at.least(2);
   *
   * The alias `.gte` can be used interchangeably with `.least`.
   *
   * @name least
   * @alias gte
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertLeast (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , errorMessage
      , shouldThrow = true;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to least must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to least must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount >= n
        , 'expected #{this} to have a ' + descriptor + ' at least #{exp} but got #{act}'
        , 'expected #{this} to have a ' + descriptor + ' below #{exp}'
        , n
        , itemsCount
      );
    } else {
      this.assert(
          obj >= n
        , 'expected #{this} to be at least #{exp}'
        , 'expected #{this} to be below #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('least', assertLeast);
  Assertion.addMethod('gte', assertLeast);

  /**
   * ### .below(n[, msg])
   *
   * Asserts that the target is a number or a date less than the given number or date `n` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.below(2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is less than the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.below(4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.length(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.below(4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.below`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.be.below(1); // Not recommended
   *
   * `.below` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(2).to.be.below(1, 'nooo why fail??');
   *     expect(2, 'nooo why fail??').to.be.below(1);
   *
   * The aliases `.lt` and `.lessThan` can be used interchangeably with
   * `.below`.
   *
   * @name below
   * @alias lt
   * @alias lessThan
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertBelow (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , errorMessage
      , shouldThrow = true;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to below must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to below must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount < n
        , 'expected #{this} to have a ' + descriptor + ' below #{exp} but got #{act}'
        , 'expected #{this} to not have a ' + descriptor + ' below #{exp}'
        , n
        , itemsCount
      );
    } else {
      this.assert(
          obj < n
        , 'expected #{this} to be below #{exp}'
        , 'expected #{this} to be at least #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('below', assertBelow);
  Assertion.addMethod('lt', assertBelow);
  Assertion.addMethod('lessThan', assertBelow);

  /**
   * ### .most(n[, msg])
   *
   * Asserts that the target is a number or a date less than or equal to the given number
   * or date `n` respectively. However, it's often best to assert that the target is equal to its
   * expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.at.most(2); // Not recommended
   *     expect(1).to.be.at.most(1); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is less than or equal to the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.at.most(4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.at.most(4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.most`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.be.at.most(1); // Not recommended
   *
   * `.most` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(2).to.be.at.most(1, 'nooo why fail??');
   *     expect(2, 'nooo why fail??').to.be.at.most(1);
   *
   * The alias `.lte` can be used interchangeably with `.most`.
   *
   * @name most
   * @alias lte
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertMost (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , errorMessage
      , shouldThrow = true;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to most must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to most must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount <= n
        , 'expected #{this} to have a ' + descriptor + ' at most #{exp} but got #{act}'
        , 'expected #{this} to have a ' + descriptor + ' above #{exp}'
        , n
        , itemsCount
      );
    } else {
      this.assert(
          obj <= n
        , 'expected #{this} to be at most #{exp}'
        , 'expected #{this} to be above #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('most', assertMost);
  Assertion.addMethod('lte', assertMost);

  /**
   * ### .within(start, finish[, msg])
   *
   * Asserts that the target is a number or a date greater than or equal to the given
   * number or date `start`, and less than or equal to the given number or date `finish` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.within(1, 3); // Not recommended
   *     expect(2).to.be.within(2, 3); // Not recommended
   *     expect(2).to.be.within(1, 2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is greater than or equal to the given number `start`, and less
   * than or equal to the given number `finish`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.within(2, 4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.within(2, 4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.within`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.within(2, 4); // Not recommended
   *
   * `.within` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(4).to.be.within(1, 3, 'nooo why fail??');
   *     expect(4, 'nooo why fail??').to.be.within(1, 3);
   *
   * @name within
   * @param {Number} start lower bound inclusive
   * @param {Number} finish upper bound inclusive
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('within', function (start, finish, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , startType = _.type(start).toLowerCase()
      , finishType = _.type(finish).toLowerCase()
      , errorMessage
      , shouldThrow = true
      , range = (startType === 'date' && finishType === 'date')
          ? start.toUTCString() + '..' + finish.toUTCString()
          : start + '..' + finish;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && (startType !== 'date' || finishType !== 'date'))) {
      errorMessage = msgPrefix + 'the arguments to within must be dates';
    } else if ((startType !== 'number' || finishType !== 'number') && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the arguments to within must be numbers';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount >= start && itemsCount <= finish
        , 'expected #{this} to have a ' + descriptor + ' within ' + range
        , 'expected #{this} to not have a ' + descriptor + ' within ' + range
      );
    } else {
      this.assert(
          obj >= start && obj <= finish
        , 'expected #{this} to be within ' + range
        , 'expected #{this} to not be within ' + range
      );
    }
  });

  /**
   * ### .instanceof(constructor[, msg])
   *
   * Asserts that the target is an instance of the given `constructor`.
   *
   *     function Cat () { }
   *
   *     expect(new Cat()).to.be.an.instanceof(Cat);
   *     expect([1, 2]).to.be.an.instanceof(Array);
   *
   * Add `.not` earlier in the chain to negate `.instanceof`.
   *
   *     expect({a: 1}).to.not.be.an.instanceof(Array);
   *
   * `.instanceof` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1).to.be.an.instanceof(Array, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.an.instanceof(Array);
   *
   * Due to limitations in ES5, `.instanceof` may not always work as expected
   * when using a transpiler such as Babel or TypeScript. In particular, it may
   * produce unexpected results when subclassing built-in object such as
   * `Array`, `Error`, and `Map`. See your transpiler's docs for details:
   *
   * - ([Babel](https://babeljs.io/docs/usage/caveats/#classes))
   * - ([TypeScript](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work))
   *
   * The alias `.instanceOf` can be used interchangeably with `.instanceof`.
   *
   * @name instanceof
   * @param {Constructor} constructor
   * @param {String} msg _optional_
   * @alias instanceOf
   * @namespace BDD
   * @api public
   */

  function assertInstanceOf (constructor, msg) {
    if (msg) flag(this, 'message', msg);

    var target = flag(this, 'object')
    var ssfi = flag(this, 'ssfi');
    var flagMsg = flag(this, 'message');

    try {
      var isInstanceOf = target instanceof constructor;
    } catch (err) {
      if (err instanceof TypeError) {
        flagMsg = flagMsg ? flagMsg + ': ' : '';
        throw new AssertionError(
          flagMsg + 'The instanceof assertion needs a constructor but '
            + _.type(constructor) + ' was given.',
          undefined,
          ssfi
        );
      }
      throw err;
    }

    var name = _.getName(constructor);
    if (name === null) {
      name = 'an unnamed constructor';
    }

    this.assert(
        isInstanceOf
      , 'expected #{this} to be an instance of ' + name
      , 'expected #{this} to not be an instance of ' + name
    );
  };

  Assertion.addMethod('instanceof', assertInstanceOf);
  Assertion.addMethod('instanceOf', assertInstanceOf);

  /**
   * ### .property(name[, val[, msg]])
   *
   * Asserts that the target has a property with the given key `name`.
   *
   *     expect({a: 1}).to.have.property('a');
   *
   * When `val` is provided, `.property` also asserts that the property's value
   * is equal to the given `val`.
   *
   *     expect({a: 1}).to.have.property('a', 1);
   *
   * By default, strict (`===`) equality is used. Add `.deep` earlier in the
   * chain to use deep equality instead. See the `deep-eql` project page for
   * info on the deep equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) has property `x: {a: 1}`
   *     expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});
   *     expect({x: {a: 1}}).to.not.have.property('x', {a: 1});
   *
   * The target's enumerable and non-enumerable properties are always included
   * in the search. By default, both own and inherited properties are included.
   * Add `.own` earlier in the chain to exclude inherited properties from the
   * search.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.have.own.property('a');
   *     expect({a: 1}).to.have.own.property('a', 1);
   *     expect({a: 1}).to.have.property('b');
   *     expect({a: 1}).to.not.have.own.property('b');
   *
   * `.deep` and `.own` can be combined.
   *
   *     expect({x: {a: 1}}).to.have.deep.own.property('x', {a: 1});
   *
   * Add `.nested` earlier in the chain to enable dot- and bracket-notation when
   * referencing nested properties.
   *
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]', 'y');
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 'x'}}).to.have.nested.property('\\.a.\\[b\\]');
   *
   * `.deep` and `.nested` can be combined.
   *
   *     expect({a: {b: [{c: 3}]}})
   *       .to.have.deep.nested.property('a.b[0]', {c: 3});
   *
   * `.own` and `.nested` cannot be combined.
   *
   * Add `.not` earlier in the chain to negate `.property`.
   *
   *     expect({a: 1}).to.not.have.property('b');
   *
   * However, it's dangerous to negate `.property` when providing `val`. The
   * problem is that it creates uncertain expectations by asserting that the
   * target either doesn't have a property with the given key `name`, or that it
   * does have a property with the given key `name` but its value isn't equal to
   * the given `val`. It's often best to identify the exact output that's
   * expected, and then write an assertion that only accepts that exact output.
   *
   * When the target isn't expected to have a property with the given key
   * `name`, it's often best to assert exactly that.
   *
   *     expect({b: 2}).to.not.have.property('a'); // Recommended
   *     expect({b: 2}).to.not.have.property('a', 1); // Not recommended
   *
   * When the target is expected to have a property with the given key `name`,
   * it's often best to assert that the property has its expected value, rather
   * than asserting that it doesn't have one of many unexpected values.
   *
   *     expect({a: 3}).to.have.property('a', 3); // Recommended
   *     expect({a: 3}).to.not.have.property('a', 1); // Not recommended
   *
   * `.property` changes the target of any assertions that follow in the chain
   * to be the value of the property from the original target object.
   *
   *     expect({a: 1}).to.have.property('a').that.is.a('number');
   *
   * `.property` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing `val`, only use the
   * second form.
   *
   *     // Recommended
   *     expect({a: 1}).to.have.property('a', 2, 'nooo why fail??');
   *     expect({a: 1}, 'nooo why fail??').to.have.property('a', 2);
   *     expect({a: 1}, 'nooo why fail??').to.have.property('b');
   *
   *     // Not recommended
   *     expect({a: 1}).to.have.property('b', undefined, 'nooo why fail??');
   *
   * The above assertion isn't the same thing as not providing `val`. Instead,
   * it's asserting that the target object has a `b` property that's equal to
   * `undefined`.
   *
   * The assertions `.ownProperty` and `.haveOwnProperty` can be used
   * interchangeably with `.own.property`.
   *
   * @name property
   * @param {String} name
   * @param {Mixed} val (optional)
   * @param {String} msg _optional_
   * @returns value of property for chaining
   * @namespace BDD
   * @api public
   */

  function assertProperty (name, val, msg) {
    if (msg) flag(this, 'message', msg);

    var isNested = flag(this, 'nested')
      , isOwn = flag(this, 'own')
      , flagMsg = flag(this, 'message')
      , obj = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , nameType = typeof name;

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    if (isNested) {
      if (nameType !== 'string') {
        throw new AssertionError(
          flagMsg + 'the argument to property must be a string when using nested syntax',
          undefined,
          ssfi
        );
      }
    } else {
      if (nameType !== 'string' && nameType !== 'number' && nameType !== 'symbol') {
        throw new AssertionError(
          flagMsg + 'the argument to property must be a string, number, or symbol',
          undefined,
          ssfi
        );
      }
    }

    if (isNested && isOwn) {
      throw new AssertionError(
        flagMsg + 'The "nested" and "own" flags cannot be combined.',
        undefined,
        ssfi
      );
    }

    if (obj === null || obj === undefined) {
      throw new AssertionError(
        flagMsg + 'Target cannot be null or undefined.',
        undefined,
        ssfi
      );
    }

    var isDeep = flag(this, 'deep')
      , negate = flag(this, 'negate')
      , pathInfo = isNested ? _.getPathInfo(obj, name) : null
      , value = isNested ? pathInfo.value : obj[name];

    var descriptor = '';
    if (isDeep) descriptor += 'deep ';
    if (isOwn) descriptor += 'own ';
    if (isNested) descriptor += 'nested ';
    descriptor += 'property ';

    var hasProperty;
    if (isOwn) hasProperty = Object.prototype.hasOwnProperty.call(obj, name);
    else if (isNested) hasProperty = pathInfo.exists;
    else hasProperty = _.hasProperty(obj, name);

    // When performing a negated assertion for both name and val, merely having
    // a property with the given name isn't enough to cause the assertion to
    // fail. It must both have a property with the given name, and the value of
    // that property must equal the given val. Therefore, skip this assertion in
    // favor of the next.
    if (!negate || arguments.length === 1) {
      this.assert(
          hasProperty
        , 'expected #{this} to have ' + descriptor + _.inspect(name)
        , 'expected #{this} to not have ' + descriptor + _.inspect(name));
    }

    if (arguments.length > 1) {
      this.assert(
          hasProperty && (isDeep ? _.eql(val, value) : val === value)
        , 'expected #{this} to have ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}'
        , 'expected #{this} to not have ' + descriptor + _.inspect(name) + ' of #{act}'
        , val
        , value
      );
    }

    flag(this, 'object', value);
  }

  Assertion.addMethod('property', assertProperty);

  function assertOwnProperty (name, value, msg) {
    flag(this, 'own', true);
    assertProperty.apply(this, arguments);
  }

  Assertion.addMethod('ownProperty', assertOwnProperty);
  Assertion.addMethod('haveOwnProperty', assertOwnProperty);

  /**
   * ### .ownPropertyDescriptor(name[, descriptor[, msg]])
   *
   * Asserts that the target has its own property descriptor with the given key
   * `name`. Enumerable and non-enumerable properties are included in the
   * search.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a');
   *
   * When `descriptor` is provided, `.ownPropertyDescriptor` also asserts that
   * the property's descriptor is deeply equal to the given `descriptor`. See
   * the `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * Add `.not` earlier in the chain to negate `.ownPropertyDescriptor`.
   *
   *     expect({a: 1}).to.not.have.ownPropertyDescriptor('b');
   *
   * However, it's dangerous to negate `.ownPropertyDescriptor` when providing
   * a `descriptor`. The problem is that it creates uncertain expectations by
   * asserting that the target either doesn't have a property descriptor with
   * the given key `name`, or that it does have a property descriptor with the
   * given key `name` but its not deeply equal to the given `descriptor`. It's
   * often best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to have a property descriptor with the given
   * key `name`, it's often best to assert exactly that.
   *
   *     // Recommended
   *     expect({b: 2}).to.not.have.ownPropertyDescriptor('a');
   *
   *     // Not recommended
   *     expect({b: 2}).to.not.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * When the target is expected to have a property descriptor with the given
   * key `name`, it's often best to assert that the property has its expected
   * descriptor, rather than asserting that it doesn't have one of many
   * unexpected descriptors.
   *
   *     // Recommended
   *     expect({a: 3}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 3,
   *     });
   *
   *     // Not recommended
   *     expect({a: 3}).to.not.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * `.ownPropertyDescriptor` changes the target of any assertions that follow
   * in the chain to be the value of the property descriptor from the original
   * target object.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a')
   *       .that.has.property('enumerable', true);
   *
   * `.ownPropertyDescriptor` accepts an optional `msg` argument which is a
   * custom error message to show when the assertion fails. The message can also
   * be given as the second argument to `expect`. When not providing
   * `descriptor`, only use the second form.
   *
   *     // Recommended
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 2,
   *     }, 'nooo why fail??');
   *
   *     // Recommended
   *     expect({a: 1}, 'nooo why fail??').to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 2,
   *     });
   *
   *     // Recommended
   *     expect({a: 1}, 'nooo why fail??').to.have.ownPropertyDescriptor('b');
   *
   *     // Not recommended
   *     expect({a: 1})
   *       .to.have.ownPropertyDescriptor('b', undefined, 'nooo why fail??');
   *
   * The above assertion isn't the same thing as not providing `descriptor`.
   * Instead, it's asserting that the target object has a `b` property
   * descriptor that's deeply equal to `undefined`.
   *
   * The alias `.haveOwnPropertyDescriptor` can be used interchangeably with
   * `.ownPropertyDescriptor`.
   *
   * @name ownPropertyDescriptor
   * @alias haveOwnPropertyDescriptor
   * @param {String} name
   * @param {Object} descriptor _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertOwnPropertyDescriptor (name, descriptor, msg) {
    if (typeof descriptor === 'string') {
      msg = descriptor;
      descriptor = null;
    }
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
    if (actualDescriptor && descriptor) {
      this.assert(
          _.eql(descriptor, actualDescriptor)
        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to match ' + _.inspect(descriptor) + ', got ' + _.inspect(actualDescriptor)
        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to not match ' + _.inspect(descriptor)
        , descriptor
        , actualDescriptor
        , true
      );
    } else {
      this.assert(
          actualDescriptor
        , 'expected #{this} to have an own property descriptor for ' + _.inspect(name)
        , 'expected #{this} to not have an own property descriptor for ' + _.inspect(name)
      );
    }
    flag(this, 'object', actualDescriptor);
  }

  Assertion.addMethod('ownPropertyDescriptor', assertOwnPropertyDescriptor);
  Assertion.addMethod('haveOwnPropertyDescriptor', assertOwnPropertyDescriptor);

  /**
   * ### .lengthOf(n[, msg])
   *
   * Asserts that the target's `length` or `size` is equal to the given number
   * `n`.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3);
   *     expect('foo').to.have.lengthOf(3);
   *     expect(new Set([1, 2, 3])).to.have.lengthOf(3);
   *     expect(new Map([['a', 1], ['b', 2], ['c', 3]])).to.have.lengthOf(3);
   *
   * Add `.not` earlier in the chain to negate `.lengthOf`. However, it's often
   * best to assert that the target's `length` property is equal to its expected
   * value, rather than not equal to one of many unexpected values.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.not.have.lengthOf(4); // Not recommended
   *
   * `.lengthOf` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(2, 'nooo why fail??');
   *     expect([1, 2, 3], 'nooo why fail??').to.have.lengthOf(2);
   *
   * `.lengthOf` can also be used as a language chain, causing all `.above`,
   * `.below`, `.least`, `.most`, and `.within` assertions that follow in the
   * chain to use the target's `length` property as the target. However, it's
   * often best to assert that the target's `length` property is equal to its
   * expected length, rather than asserting that its `length` property falls
   * within some range of values.
   *
   *     // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf(3);
   *
   *     // Not recommended
   *     expect([1, 2, 3]).to.have.lengthOf.above(2);
   *     expect([1, 2, 3]).to.have.lengthOf.below(4);
   *     expect([1, 2, 3]).to.have.lengthOf.at.least(3);
   *     expect([1, 2, 3]).to.have.lengthOf.at.most(3);
   *     expect([1, 2, 3]).to.have.lengthOf.within(2,4);
   *
   * Due to a compatibility issue, the alias `.length` can't be chained directly
   * off of an uninvoked method such as `.a`. Therefore, `.length` can't be used
   * interchangeably with `.lengthOf` in every situation. It's recommended to
   * always use `.lengthOf` instead of `.length`.
   *
   *     expect([1, 2, 3]).to.have.a.length(3); // incompatible; throws error
   *     expect([1, 2, 3]).to.have.a.lengthOf(3);  // passes as expected
   *
   * @name lengthOf
   * @alias length
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertLengthChain () {
    flag(this, 'doLength', true);
  }

  function assertLength (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , objType = _.type(obj).toLowerCase()
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi')
      , descriptor = 'length'
      , itemsCount;

    switch (objType) {
      case 'map':
      case 'set':
        descriptor = 'size';
        itemsCount = obj.size;
        break;
      default:
        new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
        itemsCount = obj.length;
    }

    this.assert(
        itemsCount == n
      , 'expected #{this} to have a ' + descriptor + ' of #{exp} but got #{act}'
      , 'expected #{this} to not have a ' + descriptor + ' of #{act}'
      , n
      , itemsCount
    );
  }

  Assertion.addChainableMethod('length', assertLength, assertLengthChain);
  Assertion.addChainableMethod('lengthOf', assertLength, assertLengthChain);

  /**
   * ### .match(re[, msg])
   *
   * Asserts that the target matches the given regular expression `re`.
   *
   *     expect('foobar').to.match(/^foo/);
   *
   * Add `.not` earlier in the chain to negate `.match`.
   *
   *     expect('foobar').to.not.match(/taco/);
   *
   * `.match` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect('foobar').to.match(/taco/, 'nooo why fail??');
   *     expect('foobar', 'nooo why fail??').to.match(/taco/);
   *
   * The alias `.matches` can be used interchangeably with `.match`.
   *
   * @name match
   * @alias matches
   * @param {RegExp} re
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */
  function assertMatch(re, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(
        re.exec(obj)
      , 'expected #{this} to match ' + re
      , 'expected #{this} not to match ' + re
    );
  }

  Assertion.addMethod('match', assertMatch);
  Assertion.addMethod('matches', assertMatch);

  /**
   * ### .string(str[, msg])
   *
   * Asserts that the target string contains the given substring `str`.
   *
   *     expect('foobar').to.have.string('bar');
   *
   * Add `.not` earlier in the chain to negate `.string`.
   *
   *     expect('foobar').to.not.have.string('taco');
   *
   * `.string` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect('foobar').to.have.string('taco', 'nooo why fail??');
   *     expect('foobar', 'nooo why fail??').to.have.string('taco');
   *
   * @name string
   * @param {String} str
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('string', function (str, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(obj, flagMsg, ssfi, true).is.a('string');

    this.assert(
        ~obj.indexOf(str)
      , 'expected #{this} to contain ' + _.inspect(str)
      , 'expected #{this} to not contain ' + _.inspect(str)
    );
  });

  /**
   * ### .keys(key1[, key2[, ...]])
   *
   * Asserts that the target object, array, map, or set has the given keys. Only
   * the target's own inherited properties are included in the search.
   *
   * When the target is an object or array, keys can be provided as one or more
   * string arguments, a single array argument, or a single object argument. In
   * the latter case, only the keys in the given object matter; the values are
   * ignored.
   *
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *     expect(['x', 'y']).to.have.all.keys(0, 1);
   *
   *     expect({a: 1, b: 2}).to.have.all.keys(['a', 'b']);
   *     expect(['x', 'y']).to.have.all.keys([0, 1]);
   *
   *     expect({a: 1, b: 2}).to.have.all.keys({a: 4, b: 5}); // ignore 4 and 5
   *     expect(['x', 'y']).to.have.all.keys({0: 4, 1: 5}); // ignore 4 and 5
   *
   * When the target is a map or set, each key must be provided as a separate
   * argument.
   *
   *     expect(new Map([['a', 1], ['b', 2]])).to.have.all.keys('a', 'b');
   *     expect(new Set(['a', 'b'])).to.have.all.keys('a', 'b');
   *
   * Because `.keys` does different things based on the target's type, it's
   * important to check the target's type before using `.keys`. See the `.a` doc
   * for info on testing a target's type.
   *
   *     expect({a: 1, b: 2}).to.be.an('object').that.has.all.keys('a', 'b');
   *
   * By default, strict (`===`) equality is used to compare keys of maps and
   * sets. Add `.deep` earlier in the chain to use deep equality instead. See
   * the `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target set deeply (but not strictly) has key `{a: 1}`
   *     expect(new Set([{a: 1}])).to.have.all.deep.keys([{a: 1}]);
   *     expect(new Set([{a: 1}])).to.not.have.all.keys([{a: 1}]);
   *
   * By default, the target must have all of the given keys and no more. Add
   * `.any` earlier in the chain to only require that the target have at least
   * one of the given keys. Also, add `.not` earlier in the chain to negate
   * `.keys`. It's often best to add `.any` when negating `.keys`, and to use
   * `.all` when asserting `.keys` without negation.
   *
   * When negating `.keys`, `.any` is preferred because `.not.any.keys` asserts
   * exactly what's expected of the output, whereas `.not.all.keys` creates
   * uncertain expectations.
   *
   *     // Recommended; asserts that target doesn't have any of the given keys
   *     expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
   *
   *     // Not recommended; asserts that target doesn't have all of the given
   *     // keys but may or may not have some of them
   *     expect({a: 1, b: 2}).to.not.have.all.keys('c', 'd');
   *
   * When asserting `.keys` without negation, `.all` is preferred because
   * `.all.keys` asserts exactly what's expected of the output, whereas
   * `.any.keys` creates uncertain expectations.
   *
   *     // Recommended; asserts that target has all the given keys
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *
   *     // Not recommended; asserts that target has at least one of the given
   *     // keys but may or may not have more of them
   *     expect({a: 1, b: 2}).to.have.any.keys('a', 'b');
   *
   * Note that `.all` is used by default when neither `.all` nor `.any` appear
   * earlier in the chain. However, it's often best to add `.all` anyway because
   * it improves readability.
   *
   *     // Both assertions are identical
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b'); // Recommended
   *     expect({a: 1, b: 2}).to.have.keys('a', 'b'); // Not recommended
   *
   * Add `.include` earlier in the chain to require that the target's keys be a
   * superset of the expected keys, rather than identical sets.
   *
   *     // Target object's keys are a superset of ['a', 'b'] but not identical
   *     expect({a: 1, b: 2, c: 3}).to.include.all.keys('a', 'b');
   *     expect({a: 1, b: 2, c: 3}).to.not.have.all.keys('a', 'b');
   *
   * However, if `.any` and `.include` are combined, only the `.any` takes
   * effect. The `.include` is ignored in this case.
   *
   *     // Both assertions are identical
   *     expect({a: 1}).to.have.any.keys('a', 'b');
   *     expect({a: 1}).to.include.any.keys('a', 'b');
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.have.key('b');
   *
   * The alias `.key` can be used interchangeably with `.keys`.
   *
   * @name keys
   * @alias key
   * @param {...String|Array|Object} keys
   * @namespace BDD
   * @api public
   */

  function assertKeys (keys) {
    var obj = flag(this, 'object')
      , objType = _.type(obj)
      , keysType = _.type(keys)
      , ssfi = flag(this, 'ssfi')
      , isDeep = flag(this, 'deep')
      , str
      , deepStr = ''
      , actual
      , ok = true
      , flagMsg = flag(this, 'message');

    flagMsg = flagMsg ? flagMsg + ': ' : '';
    var mixedArgsMsg = flagMsg + 'when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments';

    if (objType === 'Map' || objType === 'Set') {
      deepStr = isDeep ? 'deeply ' : '';
      actual = [];

      // Map and Set '.keys' aren't supported in IE 11. Therefore, use .forEach.
      obj.forEach(function (val, key) { actual.push(key) });

      if (keysType !== 'Array') {
        keys = Array.prototype.slice.call(arguments);
      }
    } else {
      actual = _.getOwnEnumerableProperties(obj);

      switch (keysType) {
        case 'Array':
          if (arguments.length > 1) {
            throw new AssertionError(mixedArgsMsg, undefined, ssfi);
          }
          break;
        case 'Object':
          if (arguments.length > 1) {
            throw new AssertionError(mixedArgsMsg, undefined, ssfi);
          }
          keys = Object.keys(keys);
          break;
        default:
          keys = Array.prototype.slice.call(arguments);
      }

      // Only stringify non-Symbols because Symbols would become "Symbol()"
      keys = keys.map(function (val) {
        return typeof val === 'symbol' ? val : String(val);
      });
    }

    if (!keys.length) {
      throw new AssertionError(flagMsg + 'keys required', undefined, ssfi);
    }

    var len = keys.length
      , any = flag(this, 'any')
      , all = flag(this, 'all')
      , expected = keys;

    if (!any && !all) {
      all = true;
    }

    // Has any
    if (any) {
      ok = expected.some(function(expectedKey) {
        return actual.some(function(actualKey) {
          if (isDeep) {
            return _.eql(expectedKey, actualKey);
          } else {
            return expectedKey === actualKey;
          }
        });
      });
    }

    // Has all
    if (all) {
      ok = expected.every(function(expectedKey) {
        return actual.some(function(actualKey) {
          if (isDeep) {
            return _.eql(expectedKey, actualKey);
          } else {
            return expectedKey === actualKey;
          }
        });
      });

      if (!flag(this, 'contains')) {
        ok = ok && keys.length == actual.length;
      }
    }

    // Key string
    if (len > 1) {
      keys = keys.map(function(key) {
        return _.inspect(key);
      });
      var last = keys.pop();
      if (all) {
        str = keys.join(', ') + ', and ' + last;
      }
      if (any) {
        str = keys.join(', ') + ', or ' + last;
      }
    } else {
      str = _.inspect(keys[0]);
    }

    // Form
    str = (len > 1 ? 'keys ' : 'key ') + str;

    // Have / include
    str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;

    // Assertion
    this.assert(
        ok
      , 'expected #{this} to ' + deepStr + str
      , 'expected #{this} to not ' + deepStr + str
      , expected.slice(0).sort(_.compareByInspect)
      , actual.sort(_.compareByInspect)
      , true
    );
  }

  Assertion.addMethod('keys', assertKeys);
  Assertion.addMethod('key', assertKeys);

  /**
   * ### .throw([errorLike], [errMsgMatcher], [msg])
   *
   * When no arguments are provided, `.throw` invokes the target function and
   * asserts that an error is thrown.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw();
   *
   * When one argument is provided, and it's an error constructor, `.throw`
   * invokes the target function and asserts that an error is thrown that's an
   * instance of that error constructor.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(TypeError);
   *
   * When one argument is provided, and it's an error instance, `.throw` invokes
   * the target function and asserts that an error is thrown that's strictly
   * (`===`) equal to that error instance.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(err);
   *
   * When one argument is provided, and it's a string, `.throw` invokes the
   * target function and asserts that an error is thrown with a message that
   * contains that string.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw('salmon');
   *
   * When one argument is provided, and it's a regular expression, `.throw`
   * invokes the target function and asserts that an error is thrown with a
   * message that matches that regular expression.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(/salmon/);
   *
   * When two arguments are provided, and the first is an error instance or
   * constructor, and the second is a string or regular expression, `.throw`
   * invokes the function and asserts that an error is thrown that fulfills both
   * conditions as described above.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(TypeError, 'salmon');
   *     expect(badFn).to.throw(TypeError, /salmon/);
   *     expect(badFn).to.throw(err, 'salmon');
   *     expect(badFn).to.throw(err, /salmon/);
   *
   * Add `.not` earlier in the chain to negate `.throw`.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.not.throw();
   *
   * However, it's dangerous to negate `.throw` when providing any arguments.
   * The problem is that it creates uncertain expectations by asserting that the
   * target either doesn't throw an error, or that it throws an error but of a
   * different type than the given type, or that it throws an error of the given
   * type but with a message that doesn't include the given string. It's often
   * best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to throw an error, it's often best to assert
   * exactly that.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.not.throw(); // Recommended
   *     expect(goodFn).to.not.throw(ReferenceError, 'x'); // Not recommended
   *
   * When the target is expected to throw an error, it's often best to assert
   * that the error is of its expected type, and has a message that includes an
   * expected string, rather than asserting that it doesn't have one of many
   * unexpected types, and doesn't have a message that includes some string.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(TypeError, 'salmon'); // Recommended
   *     expect(badFn).to.not.throw(ReferenceError, 'x'); // Not recommended
   *
   * `.throw` changes the target of any assertions that follow in the chain to
   * be the error object that's thrown.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     err.code = 42;
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(TypeError).with.property('code', 42);
   *
   * `.throw` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`. When not providing two arguments, always use
   * the second form.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.throw(TypeError, 'x', 'nooo why fail??');
   *     expect(goodFn, 'nooo why fail??').to.throw();
   *
   * Due to limitations in ES5, `.throw` may not always work as expected when
   * using a transpiler such as Babel or TypeScript. In particular, it may
   * produce unexpected results when subclassing the built-in `Error` object and
   * then passing the subclassed constructor to `.throw`. See your transpiler's
   * docs for details:
   *
   * - ([Babel](https://babeljs.io/docs/usage/caveats/#classes))
   * - ([TypeScript](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work))
   *
   * Beware of some common mistakes when using the `throw` assertion. One common
   * mistake is to accidentally invoke the function yourself instead of letting
   * the `throw` assertion invoke the function for you. For example, when
   * testing if a function named `fn` throws, provide `fn` instead of `fn()` as
   * the target for the assertion.
   *
   *     expect(fn).to.throw();     // Good! Tests `fn` as desired
   *     expect(fn()).to.throw();   // Bad! Tests result of `fn()`, not `fn`
   *
   * If you need to assert that your function `fn` throws when passed certain
   * arguments, then wrap a call to `fn` inside of another function.
   *
   *     expect(function () { fn(42); }).to.throw();  // Function expression
   *     expect(() => fn(42)).to.throw();             // ES6 arrow function
   *
   * Another common mistake is to provide an object method (or any stand-alone
   * function that relies on `this`) as the target of the assertion. Doing so is
   * problematic because the `this` context will be lost when the function is
   * invoked by `.throw`; there's no way for it to know what `this` is supposed
   * to be. There are two ways around this problem. One solution is to wrap the
   * method or function call inside of another function. Another solution is to
   * use `bind`.
   *
   *     expect(function () { cat.meow(); }).to.throw();  // Function expression
   *     expect(() => cat.meow()).to.throw();             // ES6 arrow function
   *     expect(cat.meow.bind(cat)).to.throw();           // Bind
   *
   * Finally, it's worth mentioning that it's a best practice in JavaScript to
   * only throw `Error` and derivatives of `Error` such as `ReferenceError`,
   * `TypeError`, and user-defined objects that extend `Error`. No other type of
   * value will generate a stack trace when initialized. With that said, the
   * `throw` assertion does technically support any type of value being thrown,
   * not just `Error` and its derivatives.
   *
   * The aliases `.throws` and `.Throw` can be used interchangeably with
   * `.throw`.
   *
   * @name throw
   * @alias throws
   * @alias Throw
   * @param {Error|ErrorConstructor} errorLike
   * @param {String|RegExp} errMsgMatcher error message
   * @param {String} msg _optional_
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @returns error for chaining (null if no error)
   * @namespace BDD
   * @api public
   */

  function assertThrows (errorLike, errMsgMatcher, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , flagMsg = flag(this, 'message')
      , negate = flag(this, 'negate') || false;
    new Assertion(obj, flagMsg, ssfi, true).is.a('function');

    if (errorLike instanceof RegExp || typeof errorLike === 'string') {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    var caughtErr;
    try {
      obj();
    } catch (err) {
      caughtErr = err;
    }

    // If we have the negate flag enabled and at least one valid argument it means we do expect an error
    // but we want it to match a given set of criteria
    var everyArgIsUndefined = errorLike === undefined && errMsgMatcher === undefined;

    // If we've got the negate flag enabled and both args, we should only fail if both aren't compatible
    // See Issue #551 and PR #683@GitHub
    var everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
    var errorLikeFail = false;
    var errMsgMatcherFail = false;

    // Checking if error was thrown
    if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
      // We need this to display results correctly according to their types
      var errorLikeString = 'an error';
      if (errorLike instanceof Error) {
        errorLikeString = '#{exp}';
      } else if (errorLike) {
        errorLikeString = _.checkError.getConstructorName(errorLike);
      }

      this.assert(
          caughtErr
        , 'expected #{this} to throw ' + errorLikeString
        , 'expected #{this} to not throw an error but #{act} was thrown'
        , errorLike && errorLike.toString()
        , (caughtErr instanceof Error ?
            caughtErr.toString() : (typeof caughtErr === 'string' ? caughtErr : caughtErr &&
                                    _.checkError.getConstructorName(caughtErr)))
      );
    }

    if (errorLike && caughtErr) {
      // We should compare instances only if `errorLike` is an instance of `Error`
      if (errorLike instanceof Error) {
        var isCompatibleInstance = _.checkError.compatibleInstance(caughtErr, errorLike);

        if (isCompatibleInstance === negate) {
          // These checks were created to ensure we won't fail too soon when we've got both args and a negate
          // See Issue #551 and PR #683@GitHub
          if (everyArgIsDefined && negate) {
            errorLikeFail = true;
          } else {
            this.assert(
                negate
              , 'expected #{this} to throw #{exp} but #{act} was thrown'
              , 'expected #{this} to not throw #{exp}' + (caughtErr && !negate ? ' but #{act} was thrown' : '')
              , errorLike.toString()
              , caughtErr.toString()
            );
          }
        }
      }

      var isCompatibleConstructor = _.checkError.compatibleConstructor(caughtErr, errorLike);
      if (isCompatibleConstructor === negate) {
        if (everyArgIsDefined && negate) {
            errorLikeFail = true;
        } else {
          this.assert(
              negate
            , 'expected #{this} to throw #{exp} but #{act} was thrown'
            , 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : '')
            , (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike))
            , (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr))
          );
        }
      }
    }

    if (caughtErr && errMsgMatcher !== undefined && errMsgMatcher !== null) {
      // Here we check compatible messages
      var placeholder = 'including';
      if (errMsgMatcher instanceof RegExp) {
        placeholder = 'matching'
      }

      var isCompatibleMessage = _.checkError.compatibleMessage(caughtErr, errMsgMatcher);
      if (isCompatibleMessage === negate) {
        if (everyArgIsDefined && negate) {
            errMsgMatcherFail = true;
        } else {
          this.assert(
            negate
            , 'expected #{this} to throw error ' + placeholder + ' #{exp} but got #{act}'
            , 'expected #{this} to throw error not ' + placeholder + ' #{exp}'
            ,  errMsgMatcher
            ,  _.checkError.getMessage(caughtErr)
          );
        }
      }
    }

    // If both assertions failed and both should've matched we throw an error
    if (errorLikeFail && errMsgMatcherFail) {
      this.assert(
        negate
        , 'expected #{this} to throw #{exp} but #{act} was thrown'
        , 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : '')
        , (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike))
        , (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr))
      );
    }

    flag(this, 'object', caughtErr);
  };

  Assertion.addMethod('throw', assertThrows);
  Assertion.addMethod('throws', assertThrows);
  Assertion.addMethod('Throw', assertThrows);

  /**
   * ### .respondTo(method[, msg])
   *
   * When the target is a non-function object, `.respondTo` asserts that the
   * target has a method with the given name `method`. The method can be own or
   * inherited, and it can be enumerable or non-enumerable.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(new Cat()).to.respondTo('meow');
   *
   * When the target is a function, `.respondTo` asserts that the target's
   * `prototype` property has a method with the given name `method`. Again, the
   * method can be own or inherited, and it can be enumerable or non-enumerable.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(Cat).to.respondTo('meow');
   *
   * Add `.itself` earlier in the chain to force `.respondTo` to treat the
   * target as a non-function object, even if it's a function. Thus, it asserts
   * that the target has a method with the given name `method`, rather than
   * asserting that the target's `prototype` property has a method with the
   * given name `method`.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *     Cat.hiss = function () {};
   *
   *     expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
   *
   * When not adding `.itself`, it's important to check the target's type before
   * using `.respondTo`. See the `.a` doc for info on checking a target's type.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(new Cat()).to.be.an('object').that.respondsTo('meow');
   *
   * Add `.not` earlier in the chain to negate `.respondTo`.
   *
   *     function Dog () {}
   *     Dog.prototype.bark = function () {};
   *
   *     expect(new Dog()).to.not.respondTo('meow');
   *
   * `.respondTo` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect({}).to.respondTo('meow', 'nooo why fail??');
   *     expect({}, 'nooo why fail??').to.respondTo('meow');
   *
   * The alias `.respondsTo` can be used interchangeably with `.respondTo`.
   *
   * @name respondTo
   * @alias respondsTo
   * @param {String} method
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function respondTo (method, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , itself = flag(this, 'itself')
      , context = ('function' === typeof obj && !itself)
        ? obj.prototype[method]
        : obj[method];

    this.assert(
        'function' === typeof context
      , 'expected #{this} to respond to ' + _.inspect(method)
      , 'expected #{this} to not respond to ' + _.inspect(method)
    );
  }

  Assertion.addMethod('respondTo', respondTo);
  Assertion.addMethod('respondsTo', respondTo);

  /**
   * ### .itself
   *
   * Forces all `.respondTo` assertions that follow in the chain to behave as if
   * the target is a non-function object, even if it's a function. Thus, it
   * causes `.respondTo` to assert that the target has a method with the given
   * name, rather than asserting that the target's `prototype` property has a
   * method with the given name.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *     Cat.hiss = function () {};
   *
   *     expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
   *
   * @name itself
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('itself', function () {
    flag(this, 'itself', true);
  });

  /**
   * ### .satisfy(matcher[, msg])
   *
   * Invokes the given `matcher` function with the target being passed as the
   * first argument, and asserts that the value returned is truthy.
   *
   *     expect(1).to.satisfy(function(num) {
   *       return num > 0;
   *     });
   *
   * Add `.not` earlier in the chain to negate `.satisfy`.
   *
   *     expect(1).to.not.satisfy(function(num) {
   *       return num > 2;
   *     });
   *
   * `.satisfy` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1).to.satisfy(function(num) {
   *       return num > 2;
   *     }, 'nooo why fail??');
   *
   *     expect(1, 'nooo why fail??').to.satisfy(function(num) {
   *       return num > 2;
   *     });
   *
   * The alias `.satisfies` can be used interchangeably with `.satisfy`.
   *
   * @name satisfy
   * @alias satisfies
   * @param {Function} matcher
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function satisfy (matcher, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    var result = matcher(obj);
    this.assert(
        result
      , 'expected #{this} to satisfy ' + _.objDisplay(matcher)
      , 'expected #{this} to not satisfy' + _.objDisplay(matcher)
      , flag(this, 'negate') ? false : true
      , result
    );
  }

  Assertion.addMethod('satisfy', satisfy);
  Assertion.addMethod('satisfies', satisfy);

  /**
   * ### .closeTo(expected, delta[, msg])
   *
   * Asserts that the target is a number that's within a given +/- `delta` range
   * of the given number `expected`. However, it's often best to assert that the
   * target is equal to its expected value.
   *
   *     // Recommended
   *     expect(1.5).to.equal(1.5);
   *
   *     // Not recommended
   *     expect(1.5).to.be.closeTo(1, 0.5);
   *     expect(1.5).to.be.closeTo(2, 0.5);
   *     expect(1.5).to.be.closeTo(1, 1);
   *
   * Add `.not` earlier in the chain to negate `.closeTo`.
   *
   *     expect(1.5).to.equal(1.5); // Recommended
   *     expect(1.5).to.not.be.closeTo(3, 1); // Not recommended
   *
   * `.closeTo` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1.5).to.be.closeTo(3, 1, 'nooo why fail??');
   *     expect(1.5, 'nooo why fail??').to.be.closeTo(3, 1);
   *
   * The alias `.approximately` can be used interchangeably with `.closeTo`.
   *
   * @name closeTo
   * @alias approximately
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function closeTo(expected, delta, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');

    new Assertion(obj, flagMsg, ssfi, true).is.a('number');
    if (typeof expected !== 'number' || typeof delta !== 'number') {
      flagMsg = flagMsg ? flagMsg + ': ' : '';
      throw new AssertionError(
          flagMsg + 'the arguments to closeTo or approximately must be numbers',
          undefined,
          ssfi
      );
    }

    this.assert(
        Math.abs(obj - expected) <= delta
      , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
      , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta
    );
  }

  Assertion.addMethod('closeTo', closeTo);
  Assertion.addMethod('approximately', closeTo);

  // Note: Duplicates are ignored if testing for inclusion instead of sameness.
  function isSubsetOf(subset, superset, cmp, contains, ordered) {
    if (!contains) {
      if (subset.length !== superset.length) return false;
      superset = superset.slice();
    }

    return subset.every(function(elem, idx) {
      if (ordered) return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];

      if (!cmp) {
        var matchIdx = superset.indexOf(elem);
        if (matchIdx === -1) return false;

        // Remove match from superset so not counted twice if duplicate in subset.
        if (!contains) superset.splice(matchIdx, 1);
        return true;
      }

      return superset.some(function(elem2, matchIdx) {
        if (!cmp(elem, elem2)) return false;

        // Remove match from superset so not counted twice if duplicate in subset.
        if (!contains) superset.splice(matchIdx, 1);
        return true;
      });
    });
  }

  /**
   * ### .members(set[, msg])
   *
   * Asserts that the target array has the same members as the given array
   * `set`.
   *
   *     expect([1, 2, 3]).to.have.members([2, 1, 3]);
   *     expect([1, 2, 2]).to.have.members([2, 1, 2]);
   *
   * By default, members are compared using strict (`===`) equality. Add `.deep`
   * earlier in the chain to use deep equality instead. See the `deep-eql`
   * project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target array deeply (but not strictly) has member `{a: 1}`
   *     expect([{a: 1}]).to.have.deep.members([{a: 1}]);
   *     expect([{a: 1}]).to.not.have.members([{a: 1}]);
   *
   * By default, order doesn't matter. Add `.ordered` earlier in the chain to
   * require that members appear in the same order.
   *
   *     expect([1, 2, 3]).to.have.ordered.members([1, 2, 3]);
   *     expect([1, 2, 3]).to.have.members([2, 1, 3])
   *       .but.not.ordered.members([2, 1, 3]);
   *
   * By default, both arrays must be the same size. Add `.include` earlier in
   * the chain to require that the target's members be a superset of the
   * expected members. Note that duplicates are ignored in the subset when
   * `.include` is added.
   *
   *     // Target array is a superset of [1, 2] but not identical
   *     expect([1, 2, 3]).to.include.members([1, 2]);
   *     expect([1, 2, 3]).to.not.have.members([1, 2]);
   *
   *     // Duplicates in the subset are ignored
   *     expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
   *
   * `.deep`, `.ordered`, and `.include` can all be combined. However, if
   * `.include` and `.ordered` are combined, the ordering begins at the start of
   * both arrays.
   *
   *     expect([{a: 1}, {b: 2}, {c: 3}])
   *       .to.include.deep.ordered.members([{a: 1}, {b: 2}])
   *       .but.not.include.deep.ordered.members([{b: 2}, {c: 3}]);
   *
   * Add `.not` earlier in the chain to negate `.members`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the target array doesn't have all of the same members as
   * the given array `set` but may or may not have some of them. It's often best
   * to identify the exact output that's expected, and then write an assertion
   * that only accepts that exact output.
   *
   *     expect([1, 2]).to.not.include(3).and.not.include(4); // Recommended
   *     expect([1, 2]).to.not.have.members([3, 4]); // Not recommended
   *
   * `.members` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2]).to.have.members([1, 2, 3], 'nooo why fail??');
   *     expect([1, 2], 'nooo why fail??').to.have.members([1, 2, 3]);
   *
   * @name members
   * @param {Array} set
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('members', function (subset, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');

    new Assertion(obj, flagMsg, ssfi, true).to.be.an('array');
    new Assertion(subset, flagMsg, ssfi, true).to.be.an('array');

    var contains = flag(this, 'contains');
    var ordered = flag(this, 'ordered');

    var subject, failMsg, failNegateMsg;

    if (contains) {
      subject = ordered ? 'an ordered superset' : 'a superset';
      failMsg = 'expected #{this} to be ' + subject + ' of #{exp}';
      failNegateMsg = 'expected #{this} to not be ' + subject + ' of #{exp}';
    } else {
      subject = ordered ? 'ordered members' : 'members';
      failMsg = 'expected #{this} to have the same ' + subject + ' as #{exp}';
      failNegateMsg = 'expected #{this} to not have the same ' + subject + ' as #{exp}';
    }

    var cmp = flag(this, 'deep') ? _.eql : undefined;

    this.assert(
        isSubsetOf(subset, obj, cmp, contains, ordered)
      , failMsg
      , failNegateMsg
      , subset
      , obj
      , true
    );
  });

  /**
   * ### .oneOf(list[, msg])
   *
   * Asserts that the target is a member of the given array `list`. However,
   * it's often best to assert that the target is equal to its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.oneOf([1, 2, 3]); // Not recommended
   *
   * Comparisons are performed using strict (`===`) equality.
   *
   * Add `.not` earlier in the chain to negate `.oneOf`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.oneOf([2, 3, 4]); // Not recommended
   *
   * `.oneOf` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.oneOf([2, 3, 4], 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.oneOf([2, 3, 4]);
   *
   * @name oneOf
   * @param {Array<*>} list
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function oneOf (list, msg) {
    if (msg) flag(this, 'message', msg);
    var expected = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(list, flagMsg, ssfi, true).to.be.an('array');

    this.assert(
        list.indexOf(expected) > -1
      , 'expected #{this} to be one of #{exp}'
      , 'expected #{this} to not be one of #{exp}'
      , list
      , expected
    );
  }

  Assertion.addMethod('oneOf', oneOf);

  /**
   * ### .change(subject[, prop[, msg]])
   *
   * When one argument is provided, `.change` asserts that the given function
   * `subject` returns a different value when it's invoked before the target
   * function compared to when it's invoked afterward. However, it's often best
   * to assert that `subject` is equal to its expected value.
   *
   *     var dots = ''
   *       , addDot = function () { dots += '.'; }
   *       , getDots = function () { return dots; };
   *
   *     // Recommended
   *     expect(getDots()).to.equal('');
   *     addDot();
   *     expect(getDots()).to.equal('.');
   *
   *     // Not recommended
   *     expect(addDot).to.change(getDots);
   *
   * When two arguments are provided, `.change` asserts that the value of the
   * given object `subject`'s `prop` property is different before invoking the
   * target function compared to afterward.
   *
   *     var myObj = {dots: ''}
   *       , addDot = function () { myObj.dots += '.'; };
   *
   *     // Recommended
   *     expect(myObj).to.have.property('dots', '');
   *     addDot();
   *     expect(myObj).to.have.property('dots', '.');
   *
   *     // Not recommended
   *     expect(addDot).to.change(myObj, 'dots');
   *
   * Strict (`===`) equality is used to compare before and after values.
   *
   * Add `.not` earlier in the chain to negate `.change`.
   *
   *     var dots = ''
   *       , noop = function () {}
   *       , getDots = function () { return dots; };
   *
   *     expect(noop).to.not.change(getDots);
   *
   *     var myObj = {dots: ''}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'dots');
   *
   * `.change` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {dots: ''}
   *       , addDot = function () { myObj.dots += '.'; };
   *
   *     expect(addDot).to.not.change(myObj, 'dots', 'nooo why fail??');
   *
   *     var dots = ''
   *       , addDot = function () { dots += '.'; }
   *       , getDots = function () { return dots; };
   *
   *     expect(addDot, 'nooo why fail??').to.not.change(getDots);
   *
   * `.change` also causes all `.by` assertions that follow in the chain to
   * assert how much a numeric subject was increased or decreased by. However,
   * it's dangerous to use `.change.by`. The problem is that it creates
   * uncertain expectations by asserting that the subject either increases by
   * the given delta, or that it decreases by the given delta. It's often best
   * to identify the exact output that's expected, and then write an assertion
   * that only accepts that exact output.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; }
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   * The alias `.changes` can be used interchangeably with `.change`.
   *
   * @name change
   * @alias changes
   * @param {String} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertChanges (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    // This gets flagged because of the .by(delta) assertion
    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'change');
    flag(this, 'realDelta', final !== initial);

    this.assert(
      initial !== final
      , 'expected ' + msgObj + ' to change'
      , 'expected ' + msgObj + ' to not change'
    );
  }

  Assertion.addMethod('change', assertChanges);
  Assertion.addMethod('changes', assertChanges);

  /**
   * ### .increase(subject[, prop[, msg]])
   *
   * When one argument is provided, `.increase` asserts that the given function
   * `subject` returns a greater number when it's invoked after invoking the
   * target function compared to when it's invoked beforehand. `.increase` also
   * causes all `.by` assertions that follow in the chain to assert how much
   * greater of a number is returned. It's often best to assert that the return
   * value increased by the expected amount, rather than asserting it increased
   * by any amount.
   *
   *     var val = 1
   *       , addTwo = function () { val += 2; }
   *       , getVal = function () { return val; };
   *
   *     expect(addTwo).to.increase(getVal).by(2); // Recommended
   *     expect(addTwo).to.increase(getVal); // Not recommended
   *
   * When two arguments are provided, `.increase` asserts that the value of the
   * given object `subject`'s `prop` property is greater after invoking the
   * target function compared to beforehand.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.increase(myObj, 'val'); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.increase`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either decreases, or that it stays the same.
   * It's often best to identify the exact output that's expected, and then
   * write an assertion that only accepts that exact output.
   *
   * When the subject is expected to decrease, it's often best to assert that it
   * decreased by the expected amount.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.not.increase(myObj, 'val'); // Not recommended
   *
   * When the subject is expected to stay the same, it's often best to assert
   * exactly that.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'val'); // Recommended
   *     expect(noop).to.not.increase(myObj, 'val'); // Not recommended
   *
   * `.increase` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.increase(myObj, 'val', 'nooo why fail??');
   *
   *     var val = 1
   *       , noop = function () {}
   *       , getVal = function () { return val; };
   *
   *     expect(noop, 'nooo why fail??').to.increase(getVal);
   *
   * The alias `.increases` can be used interchangeably with `.increase`.
   *
   * @name increase
   * @alias increases
   * @param {String|Function} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertIncreases (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    // Make sure that the target is a number
    new Assertion(initial, flagMsg, ssfi, true).is.a('number');

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'increase');
    flag(this, 'realDelta', final - initial);

    this.assert(
      final - initial > 0
      , 'expected ' + msgObj + ' to increase'
      , 'expected ' + msgObj + ' to not increase'
    );
  }

  Assertion.addMethod('increase', assertIncreases);
  Assertion.addMethod('increases', assertIncreases);

  /**
   * ### .decrease(subject[, prop[, msg]])
   *
   * When one argument is provided, `.decrease` asserts that the given function
   * `subject` returns a lesser number when it's invoked after invoking the
   * target function compared to when it's invoked beforehand. `.decrease` also
   * causes all `.by` assertions that follow in the chain to assert how much
   * lesser of a number is returned. It's often best to assert that the return
   * value decreased by the expected amount, rather than asserting it decreased
   * by any amount.
   *
   *     var val = 1
   *       , subtractTwo = function () { val -= 2; }
   *       , getVal = function () { return val; };
   *
   *     expect(subtractTwo).to.decrease(getVal).by(2); // Recommended
   *     expect(subtractTwo).to.decrease(getVal); // Not recommended
   *
   * When two arguments are provided, `.decrease` asserts that the value of the
   * given object `subject`'s `prop` property is lesser after invoking the
   * target function compared to beforehand.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.decrease(myObj, 'val'); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.decrease`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either increases, or that it stays the same.
   * It's often best to identify the exact output that's expected, and then
   * write an assertion that only accepts that exact output.
   *
   * When the subject is expected to increase, it's often best to assert that it
   * increased by the expected amount.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.not.decrease(myObj, 'val'); // Not recommended
   *
   * When the subject is expected to stay the same, it's often best to assert
   * exactly that.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'val'); // Recommended
   *     expect(noop).to.not.decrease(myObj, 'val'); // Not recommended
   *
   * `.decrease` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.decrease(myObj, 'val', 'nooo why fail??');
   *
   *     var val = 1
   *       , noop = function () {}
   *       , getVal = function () { return val; };
   *
   *     expect(noop, 'nooo why fail??').to.decrease(getVal);
   *
   * The alias `.decreases` can be used interchangeably with `.decrease`.
   *
   * @name decrease
   * @alias decreases
   * @param {String|Function} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertDecreases (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    // Make sure that the target is a number
    new Assertion(initial, flagMsg, ssfi, true).is.a('number');

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'decrease');
    flag(this, 'realDelta', initial - final);

    this.assert(
      final - initial < 0
      , 'expected ' + msgObj + ' to decrease'
      , 'expected ' + msgObj + ' to not decrease'
    );
  }

  Assertion.addMethod('decrease', assertDecreases);
  Assertion.addMethod('decreases', assertDecreases);

  /**
   * ### .by(delta[, msg])
   *
   * When following an `.increase` assertion in the chain, `.by` asserts that
   * the subject of the `.increase` assertion increased by the given `delta`.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2);
   *
   * When following a `.decrease` assertion in the chain, `.by` asserts that the
   * subject of the `.decrease` assertion decreased by the given `delta`.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2);
   *
   * When following a `.change` assertion in the chain, `.by` asserts that the
   * subject of the `.change` assertion either increased or decreased by the
   * given `delta`. However, it's dangerous to use `.change.by`. The problem is
   * that it creates uncertain expectations. It's often best to identify the
   * exact output that's expected, and then write an assertion that only accepts
   * that exact output.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; }
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.by`. However, it's often best
   * to assert that the subject changed by its expected delta, rather than
   * asserting that it didn't change by one of countless unexpected deltas.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     // Recommended
   *     expect(addTwo).to.increase(myObj, 'val').by(2);
   *
   *     // Not recommended
   *     expect(addTwo).to.increase(myObj, 'val').but.not.by(3);
   *
   * `.by` accepts an optional `msg` argument which is a custom error message to
   * show when the assertion fails. The message can also be given as the second
   * argument to `expect`.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(3, 'nooo why fail??');
   *     expect(addTwo, 'nooo why fail??').to.increase(myObj, 'val').by(3);
   *
   * @name by
   * @param {Number} delta
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertDelta(delta, msg) {
    if (msg) flag(this, 'message', msg);

    var msgObj = flag(this, 'deltaMsgObj');
    var initial = flag(this, 'initialDeltaValue');
    var final = flag(this, 'finalDeltaValue');
    var behavior = flag(this, 'deltaBehavior');
    var realDelta = flag(this, 'realDelta');

    var expression;
    if (behavior === 'change') {
      expression = Math.abs(final - initial) === Math.abs(delta);
    } else {
      expression = realDelta === Math.abs(delta);
    }

    this.assert(
      expression
      , 'expected ' + msgObj + ' to ' + behavior + ' by ' + delta
      , 'expected ' + msgObj + ' to not ' + behavior + ' by ' + delta
    );
  }

  Assertion.addMethod('by', assertDelta);

  /**
   * ### .extensible
   *
   * Asserts that the target is extensible, which means that new properties can
   * be added to it. Primitives are never extensible.
   *
   *     expect({a: 1}).to.be.extensible;
   *
   * Add `.not` earlier in the chain to negate `.extensible`.
   *
   *     var nonExtensibleObject = Object.preventExtensions({})
   *       , sealedObject = Object.seal({})
   *       , frozenObject = Object.freeze({});
   *
   *     expect(nonExtensibleObject).to.not.be.extensible;
   *     expect(sealedObject).to.not.be.extensible;
   *     expect(frozenObject).to.not.be.extensible;
   *     expect(1).to.not.be.extensible;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(1, 'nooo why fail??').to.be.extensible;
   *
   * @name extensible
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('extensible', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a non-extensible ordinary object, simply return false.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
    // The following provides ES6 behavior for ES5 environments.

    var isExtensible = obj === Object(obj) && Object.isExtensible(obj);

    this.assert(
      isExtensible
      , 'expected #{this} to be extensible'
      , 'expected #{this} to not be extensible'
    );
  });

  /**
   * ### .sealed
   *
   * Asserts that the target is sealed, which means that new properties can't be
   * added to it, and its existing properties can't be reconfigured or deleted.
   * However, it's possible that its existing properties can still be reassigned
   * to different values. Primitives are always sealed.
   *
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.freeze({});
   *
   *     expect(sealedObject).to.be.sealed;
   *     expect(frozenObject).to.be.sealed;
   *     expect(1).to.be.sealed;
   *
   * Add `.not` earlier in the chain to negate `.sealed`.
   *
   *     expect({a: 1}).to.not.be.sealed;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.be.sealed;
   *
   * @name sealed
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('sealed', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a sealed ordinary object, simply return true.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
    // The following provides ES6 behavior for ES5 environments.

    var isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;

    this.assert(
      isSealed
      , 'expected #{this} to be sealed'
      , 'expected #{this} to not be sealed'
    );
  });

  /**
   * ### .frozen
   *
   * Asserts that the target is frozen, which means that new properties can't be
   * added to it, and its existing properties can't be reassigned to different
   * values, reconfigured, or deleted. Primitives are always frozen.
   *
   *     var frozenObject = Object.freeze({});
   *
   *     expect(frozenObject).to.be.frozen;
   *     expect(1).to.be.frozen;
   *
   * Add `.not` earlier in the chain to negate `.frozen`.
   *
   *     expect({a: 1}).to.not.be.frozen;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.be.frozen;
   *
   * @name frozen
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('frozen', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a frozen ordinary object, simply return true.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
    // The following provides ES6 behavior for ES5 environments.

    var isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;

    this.assert(
      isFrozen
      , 'expected #{this} to be frozen'
      , 'expected #{this} to not be frozen'
    );
  });

  /**
   * ### .finite
   *
   * Asserts that the target is a number, and isn't `NaN` or positive/negative
   * `Infinity`.
   *
   *     expect(1).to.be.finite;
   *
   * Add `.not` earlier in the chain to negate `.finite`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either isn't a number, or that it's `NaN`, or
   * that it's positive `Infinity`, or that it's negative `Infinity`. It's often
   * best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to be a number, it's often best to assert
   * that it's the expected type, rather than asserting that it isn't one of
   * many unexpected types.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.finite; // Not recommended
   *
   * When the target is expected to be `NaN`, it's often best to assert exactly
   * that.
   *
   *     expect(NaN).to.be.NaN; // Recommended
   *     expect(NaN).to.not.be.finite; // Not recommended
   *
   * When the target is expected to be positive infinity, it's often best to
   * assert exactly that.
   *
   *     expect(Infinity).to.equal(Infinity); // Recommended
   *     expect(Infinity).to.not.be.finite; // Not recommended
   *
   * When the target is expected to be negative infinity, it's often best to
   * assert exactly that.
   *
   *     expect(-Infinity).to.equal(-Infinity); // Recommended
   *     expect(-Infinity).to.not.be.finite; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect('foo', 'nooo why fail??').to.be.finite;
   *
   * @name finite
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('finite', function(msg) {
    var obj = flag(this, 'object');

    this.assert(
        typeof obj === 'number' && isFinite(obj)
      , 'expected #{this} to be a finite number'
      , 'expected #{this} to not be a finite number'
    );
  });
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/interface/assert.js":
/*!********************************************************!*\
  !*** ./node_modules/chai/lib/chai/interface/assert.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  /*!
   * Chai dependencies.
   */

  var Assertion = chai.Assertion
    , flag = util.flag;

  /*!
   * Module export.
   */

  /**
   * ### assert(expression, message)
   *
   * Write your own test expressions.
   *
   *     assert('foo' !== 'bar', 'foo is not bar');
   *     assert(Array.isArray([]), 'empty arrays are arrays');
   *
   * @param {Mixed} expression to test for truthiness
   * @param {String} message to display on error
   * @name assert
   * @namespace Assert
   * @api public
   */

  var assert = chai.assert = function (express, errmsg) {
    var test = new Assertion(null, null, chai.assert, true);
    test.assert(
        express
      , errmsg
      , '[ negation message unavailable ]'
    );
  };

  /**
   * ### .fail([message])
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure. Node.js `assert` module-compatible.
   *
   *     assert.fail();
   *     assert.fail("custom error message");
   *     assert.fail(1, 2);
   *     assert.fail(1, 2, "custom error message");
   *     assert.fail(1, 2, "custom error message", ">");
   *     assert.fail(1, 2, undefined, ">");
   *
   * @name fail
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @param {String} operator
   * @namespace Assert
   * @api public
   */

  assert.fail = function (actual, expected, message, operator) {
    if (arguments.length < 2) {
        // Comply with Node's fail([message]) interface

        message = actual;
        actual = undefined;
    }

    message = message || 'assert.fail()';
    throw new chai.AssertionError(message, {
        actual: actual
      , expected: expected
      , operator: operator
    }, assert.fail);
  };

  /**
   * ### .isOk(object, [message])
   *
   * Asserts that `object` is truthy.
   *
   *     assert.isOk('everything', 'everything is ok');
   *     assert.isOk(false, 'this will fail');
   *
   * @name isOk
   * @alias ok
   * @param {Mixed} object to test
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isOk = function (val, msg) {
    new Assertion(val, msg, assert.isOk, true).is.ok;
  };

  /**
   * ### .isNotOk(object, [message])
   *
   * Asserts that `object` is falsy.
   *
   *     assert.isNotOk('everything', 'this will fail');
   *     assert.isNotOk(false, 'this will pass');
   *
   * @name isNotOk
   * @alias notOk
   * @param {Mixed} object to test
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotOk = function (val, msg) {
    new Assertion(val, msg, assert.isNotOk, true).is.not.ok;
  };

  /**
   * ### .equal(actual, expected, [message])
   *
   * Asserts non-strict equality (`==`) of `actual` and `expected`.
   *
   *     assert.equal(3, '3', '== coerces values to strings');
   *
   * @name equal
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.equal = function (act, exp, msg) {
    var test = new Assertion(act, msg, assert.equal, true);

    test.assert(
        exp == flag(test, 'object')
      , 'expected #{this} to equal #{exp}'
      , 'expected #{this} to not equal #{act}'
      , exp
      , act
      , true
    );
  };

  /**
   * ### .notEqual(actual, expected, [message])
   *
   * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
   *
   *     assert.notEqual(3, 4, 'these numbers are not equal');
   *
   * @name notEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notEqual = function (act, exp, msg) {
    var test = new Assertion(act, msg, assert.notEqual, true);

    test.assert(
        exp != flag(test, 'object')
      , 'expected #{this} to not equal #{exp}'
      , 'expected #{this} to equal #{act}'
      , exp
      , act
      , true
    );
  };

  /**
   * ### .strictEqual(actual, expected, [message])
   *
   * Asserts strict equality (`===`) of `actual` and `expected`.
   *
   *     assert.strictEqual(true, true, 'these booleans are strictly equal');
   *
   * @name strictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.strictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.strictEqual, true).to.equal(exp);
  };

  /**
   * ### .notStrictEqual(actual, expected, [message])
   *
   * Asserts strict inequality (`!==`) of `actual` and `expected`.
   *
   *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
   *
   * @name notStrictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.notStrictEqual, true).to.not.equal(exp);
  };

  /**
   * ### .deepEqual(actual, expected, [message])
   *
   * Asserts that `actual` is deeply equal to `expected`.
   *
   *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
   *
   * @name deepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @alias deepStrictEqual
   * @namespace Assert
   * @api public
   */

  assert.deepEqual = assert.deepStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.deepEqual, true).to.eql(exp);
  };

  /**
   * ### .notDeepEqual(actual, expected, [message])
   *
   * Assert that `actual` is not deeply equal to `expected`.
   *
   *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
   *
   * @name notDeepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.notDeepEqual, true).to.not.eql(exp);
  };

   /**
   * ### .isAbove(valueToCheck, valueToBeAbove, [message])
   *
   * Asserts `valueToCheck` is strictly greater than (>) `valueToBeAbove`.
   *
   *     assert.isAbove(5, 2, '5 is strictly greater than 2');
   *
   * @name isAbove
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAbove
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAbove = function (val, abv, msg) {
    new Assertion(val, msg, assert.isAbove, true).to.be.above(abv);
  };

   /**
   * ### .isAtLeast(valueToCheck, valueToBeAtLeast, [message])
   *
   * Asserts `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`.
   *
   *     assert.isAtLeast(5, 2, '5 is greater or equal to 2');
   *     assert.isAtLeast(3, 3, '3 is greater or equal to 3');
   *
   * @name isAtLeast
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAtLeast
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAtLeast = function (val, atlst, msg) {
    new Assertion(val, msg, assert.isAtLeast, true).to.be.least(atlst);
  };

   /**
   * ### .isBelow(valueToCheck, valueToBeBelow, [message])
   *
   * Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`.
   *
   *     assert.isBelow(3, 6, '3 is strictly less than 6');
   *
   * @name isBelow
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeBelow
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isBelow = function (val, blw, msg) {
    new Assertion(val, msg, assert.isBelow, true).to.be.below(blw);
  };

   /**
   * ### .isAtMost(valueToCheck, valueToBeAtMost, [message])
   *
   * Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`.
   *
   *     assert.isAtMost(3, 6, '3 is less than or equal to 6');
   *     assert.isAtMost(4, 4, '4 is less than or equal to 4');
   *
   * @name isAtMost
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAtMost
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAtMost = function (val, atmst, msg) {
    new Assertion(val, msg, assert.isAtMost, true).to.be.most(atmst);
  };

  /**
   * ### .isTrue(value, [message])
   *
   * Asserts that `value` is true.
   *
   *     var teaServed = true;
   *     assert.isTrue(teaServed, 'the tea has been served');
   *
   * @name isTrue
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isTrue = function (val, msg) {
    new Assertion(val, msg, assert.isTrue, true).is['true'];
  };

  /**
   * ### .isNotTrue(value, [message])
   *
   * Asserts that `value` is not true.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotTrue(tea, 'great, time for tea!');
   *
   * @name isNotTrue
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotTrue = function (val, msg) {
    new Assertion(val, msg, assert.isNotTrue, true).to.not.equal(true);
  };

  /**
   * ### .isFalse(value, [message])
   *
   * Asserts that `value` is false.
   *
   *     var teaServed = false;
   *     assert.isFalse(teaServed, 'no tea yet? hmm...');
   *
   * @name isFalse
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFalse = function (val, msg) {
    new Assertion(val, msg, assert.isFalse, true).is['false'];
  };

  /**
   * ### .isNotFalse(value, [message])
   *
   * Asserts that `value` is not false.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotFalse(tea, 'great, time for tea!');
   *
   * @name isNotFalse
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotFalse = function (val, msg) {
    new Assertion(val, msg, assert.isNotFalse, true).to.not.equal(false);
  };

  /**
   * ### .isNull(value, [message])
   *
   * Asserts that `value` is null.
   *
   *     assert.isNull(err, 'there was no error');
   *
   * @name isNull
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNull = function (val, msg) {
    new Assertion(val, msg, assert.isNull, true).to.equal(null);
  };

  /**
   * ### .isNotNull(value, [message])
   *
   * Asserts that `value` is not null.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotNull(tea, 'great, time for tea!');
   *
   * @name isNotNull
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotNull = function (val, msg) {
    new Assertion(val, msg, assert.isNotNull, true).to.not.equal(null);
  };

  /**
   * ### .isNaN
   *
   * Asserts that value is NaN.
   *
   *     assert.isNaN(NaN, 'NaN is NaN');
   *
   * @name isNaN
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNaN = function (val, msg) {
    new Assertion(val, msg, assert.isNaN, true).to.be.NaN;
  };

  /**
   * ### .isNotNaN
   *
   * Asserts that value is not NaN.
   *
   *     assert.isNotNaN(4, '4 is not NaN');
   *
   * @name isNotNaN
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */
  assert.isNotNaN = function (val, msg) {
    new Assertion(val, msg, assert.isNotNaN, true).not.to.be.NaN;
  };

  /**
   * ### .exists
   *
   * Asserts that the target is neither `null` nor `undefined`.
   *
   *     var foo = 'hi';
   *
   *     assert.exists(foo, 'foo is neither `null` nor `undefined`');
   *
   * @name exists
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.exists = function (val, msg) {
    new Assertion(val, msg, assert.exists, true).to.exist;
  };

  /**
   * ### .notExists
   *
   * Asserts that the target is either `null` or `undefined`.
   *
   *     var bar = null
   *       , baz;
   *
   *     assert.notExists(bar);
   *     assert.notExists(baz, 'baz is either null or undefined');
   *
   * @name notExists
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notExists = function (val, msg) {
    new Assertion(val, msg, assert.notExists, true).to.not.exist;
  };

  /**
   * ### .isUndefined(value, [message])
   *
   * Asserts that `value` is `undefined`.
   *
   *     var tea;
   *     assert.isUndefined(tea, 'no tea defined');
   *
   * @name isUndefined
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isUndefined = function (val, msg) {
    new Assertion(val, msg, assert.isUndefined, true).to.equal(undefined);
  };

  /**
   * ### .isDefined(value, [message])
   *
   * Asserts that `value` is not `undefined`.
   *
   *     var tea = 'cup of chai';
   *     assert.isDefined(tea, 'tea has been defined');
   *
   * @name isDefined
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isDefined = function (val, msg) {
    new Assertion(val, msg, assert.isDefined, true).to.not.equal(undefined);
  };

  /**
   * ### .isFunction(value, [message])
   *
   * Asserts that `value` is a function.
   *
   *     function serveTea() { return 'cup of tea'; };
   *     assert.isFunction(serveTea, 'great, we can have tea now');
   *
   * @name isFunction
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFunction = function (val, msg) {
    new Assertion(val, msg, assert.isFunction, true).to.be.a('function');
  };

  /**
   * ### .isNotFunction(value, [message])
   *
   * Asserts that `value` is _not_ a function.
   *
   *     var serveTea = [ 'heat', 'pour', 'sip' ];
   *     assert.isNotFunction(serveTea, 'great, we have listed the steps');
   *
   * @name isNotFunction
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotFunction = function (val, msg) {
    new Assertion(val, msg, assert.isNotFunction, true).to.not.be.a('function');
  };

  /**
   * ### .isObject(value, [message])
   *
   * Asserts that `value` is an object of type 'Object' (as revealed by `Object.prototype.toString`).
   * _The assertion does not match subclassed objects._
   *
   *     var selection = { name: 'Chai', serve: 'with spices' };
   *     assert.isObject(selection, 'tea selection is an object');
   *
   * @name isObject
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isObject = function (val, msg) {
    new Assertion(val, msg, assert.isObject, true).to.be.a('object');
  };

  /**
   * ### .isNotObject(value, [message])
   *
   * Asserts that `value` is _not_ an object of type 'Object' (as revealed by `Object.prototype.toString`).
   *
   *     var selection = 'chai'
   *     assert.isNotObject(selection, 'tea selection is not an object');
   *     assert.isNotObject(null, 'null is not an object');
   *
   * @name isNotObject
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotObject = function (val, msg) {
    new Assertion(val, msg, assert.isNotObject, true).to.not.be.a('object');
  };

  /**
   * ### .isArray(value, [message])
   *
   * Asserts that `value` is an array.
   *
   *     var menu = [ 'green', 'chai', 'oolong' ];
   *     assert.isArray(menu, 'what kind of tea do we want?');
   *
   * @name isArray
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isArray = function (val, msg) {
    new Assertion(val, msg, assert.isArray, true).to.be.an('array');
  };

  /**
   * ### .isNotArray(value, [message])
   *
   * Asserts that `value` is _not_ an array.
   *
   *     var menu = 'green|chai|oolong';
   *     assert.isNotArray(menu, 'what kind of tea do we want?');
   *
   * @name isNotArray
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotArray = function (val, msg) {
    new Assertion(val, msg, assert.isNotArray, true).to.not.be.an('array');
  };

  /**
   * ### .isString(value, [message])
   *
   * Asserts that `value` is a string.
   *
   *     var teaOrder = 'chai';
   *     assert.isString(teaOrder, 'order placed');
   *
   * @name isString
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isString = function (val, msg) {
    new Assertion(val, msg, assert.isString, true).to.be.a('string');
  };

  /**
   * ### .isNotString(value, [message])
   *
   * Asserts that `value` is _not_ a string.
   *
   *     var teaOrder = 4;
   *     assert.isNotString(teaOrder, 'order placed');
   *
   * @name isNotString
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotString = function (val, msg) {
    new Assertion(val, msg, assert.isNotString, true).to.not.be.a('string');
  };

  /**
   * ### .isNumber(value, [message])
   *
   * Asserts that `value` is a number.
   *
   *     var cups = 2;
   *     assert.isNumber(cups, 'how many cups');
   *
   * @name isNumber
   * @param {Number} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNumber = function (val, msg) {
    new Assertion(val, msg, assert.isNumber, true).to.be.a('number');
  };

  /**
   * ### .isNotNumber(value, [message])
   *
   * Asserts that `value` is _not_ a number.
   *
   *     var cups = '2 cups please';
   *     assert.isNotNumber(cups, 'how many cups');
   *
   * @name isNotNumber
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotNumber = function (val, msg) {
    new Assertion(val, msg, assert.isNotNumber, true).to.not.be.a('number');
  };

   /**
   * ### .isFinite(value, [message])
   *
   * Asserts that `value` is a finite number. Unlike `.isNumber`, this will fail for `NaN` and `Infinity`.
   *
   *     var cups = 2;
   *     assert.isFinite(cups, 'how many cups');
   *
   *     assert.isFinite(NaN); // throws
   *
   * @name isFinite
   * @param {Number} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFinite = function (val, msg) {
    new Assertion(val, msg, assert.isFinite, true).to.be.finite;
  };

  /**
   * ### .isBoolean(value, [message])
   *
   * Asserts that `value` is a boolean.
   *
   *     var teaReady = true
   *       , teaServed = false;
   *
   *     assert.isBoolean(teaReady, 'is the tea ready');
   *     assert.isBoolean(teaServed, 'has tea been served');
   *
   * @name isBoolean
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isBoolean = function (val, msg) {
    new Assertion(val, msg, assert.isBoolean, true).to.be.a('boolean');
  };

  /**
   * ### .isNotBoolean(value, [message])
   *
   * Asserts that `value` is _not_ a boolean.
   *
   *     var teaReady = 'yep'
   *       , teaServed = 'nope';
   *
   *     assert.isNotBoolean(teaReady, 'is the tea ready');
   *     assert.isNotBoolean(teaServed, 'has tea been served');
   *
   * @name isNotBoolean
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotBoolean = function (val, msg) {
    new Assertion(val, msg, assert.isNotBoolean, true).to.not.be.a('boolean');
  };

  /**
   * ### .typeOf(value, name, [message])
   *
   * Asserts that `value`'s type is `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
   *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
   *     assert.typeOf('tea', 'string', 'we have a string');
   *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
   *     assert.typeOf(null, 'null', 'we have a null');
   *     assert.typeOf(undefined, 'undefined', 'we have an undefined');
   *
   * @name typeOf
   * @param {Mixed} value
   * @param {String} name
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.typeOf = function (val, type, msg) {
    new Assertion(val, msg, assert.typeOf, true).to.be.a(type);
  };

  /**
   * ### .notTypeOf(value, name, [message])
   *
   * Asserts that `value`'s type is _not_ `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
   *
   * @name notTypeOf
   * @param {Mixed} value
   * @param {String} typeof name
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notTypeOf = function (val, type, msg) {
    new Assertion(val, msg, assert.notTypeOf, true).to.not.be.a(type);
  };

  /**
   * ### .instanceOf(object, constructor, [message])
   *
   * Asserts that `value` is an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new Tea('chai');
   *
   *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
   *
   * @name instanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.instanceOf = function (val, type, msg) {
    new Assertion(val, msg, assert.instanceOf, true).to.be.instanceOf(type);
  };

  /**
   * ### .notInstanceOf(object, constructor, [message])
   *
   * Asserts `value` is not an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new String('chai');
   *
   *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
   *
   * @name notInstanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notInstanceOf = function (val, type, msg) {
    new Assertion(val, msg, assert.notInstanceOf, true)
      .to.not.be.instanceOf(type);
  };

  /**
   * ### .include(haystack, needle, [message])
   *
   * Asserts that `haystack` includes `needle`. Can be used to assert the
   * inclusion of a value in an array, a substring in a string, or a subset of
   * properties in an object.
   *
   *     assert.include([1,2,3], 2, 'array contains value');
   *     assert.include('foobar', 'foo', 'string contains substring');
   *     assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property');
   *
   * Strict equality (===) is used. When asserting the inclusion of a value in
   * an array, the array is searched for an element that's strictly equal to the
   * given value. When asserting a subset of properties in an object, the object
   * is searched for the given property keys, checking that each one is present
   * and strictly equal to the given property value. For instance:
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.include([obj1, obj2], obj1);
   *     assert.include({foo: obj1, bar: obj2}, {foo: obj1});
   *     assert.include({foo: obj1, bar: obj2}, {foo: obj1, bar: obj2});
   *
   * @name include
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.include = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.include, true).include(inc);
  };

  /**
   * ### .notInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` does not include `needle`. Can be used to assert
   * the absence of a value in an array, a substring in a string, or a subset of
   * properties in an object.
   *
   *     assert.notInclude([1,2,3], 4, "array doesn't contain value");
   *     assert.notInclude('foobar', 'baz', "string doesn't contain substring");
   *     assert.notInclude({ foo: 'bar', hello: 'universe' }, { foo: 'baz' }, 'object doesn't contain property');
   *
   * Strict equality (===) is used. When asserting the absence of a value in an
   * array, the array is searched to confirm the absence of an element that's
   * strictly equal to the given value. When asserting a subset of properties in
   * an object, the object is searched to confirm that at least one of the given
   * property keys is either not present or not strictly equal to the given
   * property value. For instance:
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.notInclude([obj1, obj2], {a: 1});
   *     assert.notInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
   *     assert.notInclude({foo: obj1, bar: obj2}, {foo: obj1, bar: {b: 2}});
   *
   * @name notInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notInclude, true).not.include(inc);
  };

  /**
   * ### .deepInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` includes `needle`. Can be used to assert the
   * inclusion of a value in an array or a subset of properties in an object.
   * Deep equality is used.
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.deepInclude([obj1, obj2], {a: 1});
   *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
   *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 2}});
   *
   * @name deepInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.deepInclude, true).deep.include(inc);
  };

  /**
   * ### .notDeepInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` does not include `needle`. Can be used to assert
   * the absence of a value in an array or a subset of properties in an object.
   * Deep equality is used.
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.notDeepInclude([obj1, obj2], {a: 9});
   *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 9}});
   *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 9}});
   *
   * @name notDeepInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepInclude, true).not.deep.include(inc);
  };

  /**
   * ### .nestedInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an
   * object.
   * Enables the use of dot- and bracket-notation for referencing nested
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   *
   *     assert.nestedInclude({'.a': {'b': 'x'}}, {'\\.a.[b]': 'x'});
   *     assert.nestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'x'});
   *
   * @name nestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.nestedInclude, true).nested.include(inc);
  };

  /**
   * ### .notNestedInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' does not include 'needle'.
   * Can be used to assert the absence of a subset of properties in an
   * object.
   * Enables the use of dot- and bracket-notation for referencing nested
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   *
   *     assert.notNestedInclude({'.a': {'b': 'x'}}, {'\\.a.b': 'y'});
   *     assert.notNestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'y'});
   *
   * @name notNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notNestedInclude, true)
      .not.nested.include(inc);
  };

  /**
   * ### .deepNestedInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an
   * object while checking for deep equality.
   * Enables the use of dot- and bracket-notation for referencing nested
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   *
   *     assert.deepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {x: 1}});
   *     assert.deepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {x: 1}});
   *
   * @name deepNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepNestedInclude, true)
      .deep.nested.include(inc);
  };

  /**
   * ### .notDeepNestedInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' does not include 'needle'.
   * Can be used to assert the absence of a subset of properties in an
   * object while checking for deep equality.
   * Enables the use of dot- and bracket-notation for referencing nested
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   *
   *     assert.notDeepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {y: 1}})
   *     assert.notDeepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {y: 2}});
   *
   * @name notDeepNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepNestedInclude, true)
      .not.deep.nested.include(inc);
  };

  /**
   * ### .ownInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an
   * object while ignoring inherited properties.
   *
   *     assert.ownInclude({ a: 1 }, { a: 1 });
   *
   * @name ownInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.ownInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.ownInclude, true).own.include(inc);
  };

  /**
   * ### .notOwnInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the absence of a subset of properties in an
   * object while ignoring inherited properties.
   *
   *     Object.prototype.b = 2;
   *
   *     assert.notOwnInclude({ a: 1 }, { b: 2 });
   *
   * @name notOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notOwnInclude, true).not.own.include(inc);
  };

  /**
   * ### .deepOwnInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an
   * object while ignoring inherited properties and checking for deep equality.
   *
   *      assert.deepOwnInclude({a: {b: 2}}, {a: {b: 2}});
   *
   * @name deepOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepOwnInclude, true)
      .deep.own.include(inc);
  };

   /**
   * ### .notDeepOwnInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the absence of a subset of properties in an
   * object while ignoring inherited properties and checking for deep equality.
   *
   *      assert.notDeepOwnInclude({a: {b: 2}}, {a: {c: 3}});
   *
   * @name notDeepOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepOwnInclude, true)
      .not.deep.own.include(inc);
  };

  /**
   * ### .match(value, regexp, [message])
   *
   * Asserts that `value` matches the regular expression `regexp`.
   *
   *     assert.match('foobar', /^foo/, 'regexp matches');
   *
   * @name match
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.match = function (exp, re, msg) {
    new Assertion(exp, msg, assert.match, true).to.match(re);
  };

  /**
   * ### .notMatch(value, regexp, [message])
   *
   * Asserts that `value` does not match the regular expression `regexp`.
   *
   *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
   *
   * @name notMatch
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notMatch = function (exp, re, msg) {
    new Assertion(exp, msg, assert.notMatch, true).to.not.match(re);
  };

  /**
   * ### .property(object, property, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property`.
   *
   *     assert.property({ tea: { green: 'matcha' }}, 'tea');
   *     assert.property({ tea: { green: 'matcha' }}, 'toString');
   *
   * @name property
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.property = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.property, true).to.have.property(prop);
  };

  /**
   * ### .notProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property`.
   *
   *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
   *
   * @name notProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notProperty, true)
      .to.not.have.property(prop);
  };

  /**
   * ### .propertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property` with a value given by `value`. Uses a strict equality check
   * (===).
   *
   *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
   *
   * @name propertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.propertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.propertyVal, true)
      .to.have.property(prop, val);
  };

  /**
   * ### .notPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property` with value given by `value`. Uses a strict equality check
   * (===).
   *
   *     assert.notPropertyVal({ tea: 'is good' }, 'tea', 'is bad');
   *     assert.notPropertyVal({ tea: 'is good' }, 'coffee', 'is good');
   *
   * @name notPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notPropertyVal, true)
      .to.not.have.property(prop, val);
  };

  /**
   * ### .deepPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property` with a value given by `value`. Uses a deep equality check.
   *
   *     assert.deepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
   *
   * @name deepPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.deepPropertyVal, true)
      .to.have.deep.property(prop, val);
  };

  /**
   * ### .notDeepPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property` with value given by `value`. Uses a deep equality check.
   *
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
   *
   * @name notDeepPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notDeepPropertyVal, true)
      .to.not.have.deep.property(prop, val);
  };

  /**
   * ### .ownProperty(object, property, [message])
   *
   * Asserts that `object` has a direct property named by `property`. Inherited
   * properties aren't checked.
   *
   *     assert.ownProperty({ tea: { green: 'matcha' }}, 'tea');
   *
   * @name ownProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.ownProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.ownProperty, true)
      .to.have.own.property(prop);
  };

  /**
   * ### .notOwnProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by
   * `property`. Inherited properties aren't checked.
   *
   *     assert.notOwnProperty({ tea: { green: 'matcha' }}, 'coffee');
   *     assert.notOwnProperty({}, 'toString');
   *
   * @name notOwnProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.notOwnProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notOwnProperty, true)
      .to.not.have.own.property(prop);
  };

  /**
   * ### .ownPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct property named by `property` and a value
   * equal to the provided `value`. Uses a strict equality check (===).
   * Inherited properties aren't checked.
   *
   *     assert.ownPropertyVal({ coffee: 'is good'}, 'coffee', 'is good');
   *
   * @name ownPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.ownPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.ownPropertyVal, true)
      .to.have.own.property(prop, value);
  };

  /**
   * ### .notOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by `property`
   * with a value equal to the provided `value`. Uses a strict equality check
   * (===). Inherited properties aren't checked.
   *
   *     assert.notOwnPropertyVal({ tea: 'is better'}, 'tea', 'is worse');
   *     assert.notOwnPropertyVal({}, 'toString', Object.prototype.toString);
   *
   * @name notOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.notOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.notOwnPropertyVal, true)
      .to.not.have.own.property(prop, value);
  };

  /**
   * ### .deepOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct property named by `property` and a value
   * equal to the provided `value`. Uses a deep equality check. Inherited
   * properties aren't checked.
   *
   *     assert.deepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
   *
   * @name deepOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.deepOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.deepOwnPropertyVal, true)
      .to.have.deep.own.property(prop, value);
  };

  /**
   * ### .notDeepOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by `property`
   * with a value equal to the provided `value`. Uses a deep equality check.
   * Inherited properties aren't checked.
   *
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
   *     assert.notDeepOwnPropertyVal({}, 'toString', Object.prototype.toString);
   *
   * @name notDeepOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.notDeepOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.notDeepOwnPropertyVal, true)
      .to.not.have.deep.own.property(prop, value);
  };

  /**
   * ### .nestedProperty(object, property, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property`, which can be a string using dot- and bracket-notation for
   * nested reference.
   *
   *     assert.nestedProperty({ tea: { green: 'matcha' }}, 'tea.green');
   *
   * @name nestedProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.nestedProperty, true)
      .to.have.nested.property(prop);
  };

  /**
   * ### .notNestedProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property`, which
   * can be a string using dot- and bracket-notation for nested reference. The
   * property cannot exist on the object nor anywhere in its prototype chain.
   *
   *     assert.notNestedProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
   *
   * @name notNestedProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notNestedProperty, true)
      .to.not.have.nested.property(prop);
  };

  /**
   * ### .nestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with value given
   * by `value`. `property` can use dot- and bracket-notation for nested
   * reference. Uses a strict equality check (===).
   *
   *     assert.nestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
   *
   * @name nestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.nestedPropertyVal, true)
      .to.have.nested.property(prop, val);
  };

  /**
   * ### .notNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property` with
   * value given by `value`. `property` can use dot- and bracket-notation for
   * nested reference. Uses a strict equality check (===).
   *
   *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
   *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'coffee.green', 'matcha');
   *
   * @name notNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notNestedPropertyVal, true)
      .to.not.have.nested.property(prop, val);
  };

  /**
   * ### .deepNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with a value given
   * by `value`. `property` can use dot- and bracket-notation for nested
   * reference. Uses a deep equality check.
   *
   *     assert.deepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yum' });
   *
   * @name deepNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.deepNestedPropertyVal, true)
      .to.have.deep.nested.property(prop, val);
  };

  /**
   * ### .notDeepNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property` with
   * value given by `value`. `property` can use dot- and bracket-notation for
   * nested reference. Uses a deep equality check.
   *
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { oolong: 'yum' });
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yuck' });
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.black', { matcha: 'yum' });
   *
   * @name notDeepNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notDeepNestedPropertyVal, true)
      .to.not.have.deep.nested.property(prop, val);
  }

  /**
   * ### .lengthOf(object, length, [message])
   *
   * Asserts that `object` has a `length` or `size` with the expected value.
   *
   *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
   *     assert.lengthOf('foobar', 6, 'string has length of 6');
   *     assert.lengthOf(new Set([1,2,3]), 3, 'set has size of 3');
   *     assert.lengthOf(new Map([['a',1],['b',2],['c',3]]), 3, 'map has size of 3');
   *
   * @name lengthOf
   * @param {Mixed} object
   * @param {Number} length
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.lengthOf = function (exp, len, msg) {
    new Assertion(exp, msg, assert.lengthOf, true).to.have.lengthOf(len);
  };

  /**
   * ### .hasAnyKeys(object, [keys], [message])
   *
   * Asserts that `object` has at least one of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'iDontExist', 'baz']);
   *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, iDontExist: 99, baz: 1337});
   *     assert.hasAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.hasAnyKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
   *
   * @name hasAnyKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAnyKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAnyKeys, true).to.have.any.keys(keys);
  }

  /**
   * ### .hasAllKeys(object, [keys], [message])
   *
   * Asserts that `object` has all and only all of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
   *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337]);
   *     assert.hasAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.hasAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
   *
   * @name hasAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAllKeys, true).to.have.all.keys(keys);
  }

  /**
   * ### .containsAllKeys(object, [keys], [message])
   *
   * Asserts that `object` has all of the `keys` provided but may have more keys not listed.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'baz']);
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, baz: 1337});
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337});
   *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}]);
   *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}]);
   *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
   *
   * @name containsAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.containsAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.containsAllKeys, true)
      .to.contain.all.keys(keys);
  }

  /**
   * ### .doesNotHaveAnyKeys(object, [keys], [message])
   *
   * Asserts that `object` has none of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
   *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
   *     assert.doesNotHaveAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
   *     assert.doesNotHaveAnyKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
   *
   * @name doesNotHaveAnyKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAnyKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAnyKeys, true)
      .to.not.have.any.keys(keys);
  }

  /**
   * ### .doesNotHaveAllKeys(object, [keys], [message])
   *
   * Asserts that `object` does not have at least one of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
   *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
   *     assert.doesNotHaveAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
   *     assert.doesNotHaveAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
   *
   * @name doesNotHaveAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAllKeys, true)
      .to.not.have.all.keys(keys);
  }

  /**
   * ### .hasAnyDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has at least one of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {three: 'three'}]);
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name doesNotHaveAllKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAnyDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAnyDeepKeys, true)
      .to.have.any.deep.keys(keys);
  }

 /**
   * ### .hasAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has all and only all of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne']]), {one: 'one'});
   *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAllDeepKeys(new Set([{one: 'one'}]), {one: 'one'});
   *     assert.hasAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name hasAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAllDeepKeys, true)
      .to.have.all.deep.keys(keys);
  }

 /**
   * ### .containsAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` contains all of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
   *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
   *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name containsAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.containsAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.containsAllDeepKeys, true)
      .to.contain.all.deep.keys(keys);
  }

 /**
   * ### .doesNotHaveAnyDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has none of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
   *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
   *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
   *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
   *
   * @name doesNotHaveAnyDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAnyDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAnyDeepKeys, true)
      .to.not.have.any.deep.keys(keys);
  }

 /**
   * ### .doesNotHaveAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` does not have at least one of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
   *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {one: 'one'}]);
   *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
   *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {fifty: 'fifty'}]);
   *
   * @name doesNotHaveAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAllDeepKeys, true)
      .to.not.have.all.deep.keys(keys);
  }

 /**
   * ### .throws(fn, [errorLike/string/regexp], [string/regexp], [message])
   *
   * If `errorLike` is an `Error` constructor, asserts that `fn` will throw an error that is an
   * instance of `errorLike`.
   * If `errorLike` is an `Error` instance, asserts that the error thrown is the same
   * instance as `errorLike`.
   * If `errMsgMatcher` is provided, it also asserts that the error thrown will have a
   * message matching `errMsgMatcher`.
   *
   *     assert.throws(fn, 'Error thrown must have this msg');
   *     assert.throws(fn, /Error thrown must have a msg that matches this/);
   *     assert.throws(fn, ReferenceError);
   *     assert.throws(fn, errorInstance);
   *     assert.throws(fn, ReferenceError, 'Error thrown must be a ReferenceError and have this msg');
   *     assert.throws(fn, errorInstance, 'Error thrown must be the same errorInstance and have this msg');
   *     assert.throws(fn, ReferenceError, /Error thrown must be a ReferenceError and match this/);
   *     assert.throws(fn, errorInstance, /Error thrown must be the same errorInstance and match this/);
   *
   * @name throws
   * @alias throw
   * @alias Throw
   * @param {Function} fn
   * @param {ErrorConstructor|Error} errorLike
   * @param {RegExp|String} errMsgMatcher
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @namespace Assert
   * @api public
   */

  assert.throws = function (fn, errorLike, errMsgMatcher, msg) {
    if ('string' === typeof errorLike || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    var assertErr = new Assertion(fn, msg, assert.throws, true)
      .to.throw(errorLike, errMsgMatcher);
    return flag(assertErr, 'object');
  };

  /**
   * ### .doesNotThrow(fn, [errorLike/string/regexp], [string/regexp], [message])
   *
   * If `errorLike` is an `Error` constructor, asserts that `fn` will _not_ throw an error that is an
   * instance of `errorLike`.
   * If `errorLike` is an `Error` instance, asserts that the error thrown is _not_ the same
   * instance as `errorLike`.
   * If `errMsgMatcher` is provided, it also asserts that the error thrown will _not_ have a
   * message matching `errMsgMatcher`.
   *
   *     assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
   *     assert.doesNotThrow(fn, /Any Error thrown must not match this/);
   *     assert.doesNotThrow(fn, Error);
   *     assert.doesNotThrow(fn, errorInstance);
   *     assert.doesNotThrow(fn, Error, 'Error must not have this message');
   *     assert.doesNotThrow(fn, errorInstance, 'Error must not have this message');
   *     assert.doesNotThrow(fn, Error, /Error must not match this/);
   *     assert.doesNotThrow(fn, errorInstance, /Error must not match this/);
   *
   * @name doesNotThrow
   * @param {Function} fn
   * @param {ErrorConstructor} errorLike
   * @param {RegExp|String} errMsgMatcher
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @namespace Assert
   * @api public
   */

  assert.doesNotThrow = function (fn, errorLike, errMsgMatcher, msg) {
    if ('string' === typeof errorLike || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    new Assertion(fn, msg, assert.doesNotThrow, true)
      .to.not.throw(errorLike, errMsgMatcher);
  };

  /**
   * ### .operator(val1, operator, val2, [message])
   *
   * Compares two values using `operator`.
   *
   *     assert.operator(1, '<', 2, 'everything is ok');
   *     assert.operator(1, '>', 2, 'this will fail');
   *
   * @name operator
   * @param {Mixed} val1
   * @param {String} operator
   * @param {Mixed} val2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.operator = function (val, operator, val2, msg) {
    var ok;
    switch(operator) {
      case '==':
        ok = val == val2;
        break;
      case '===':
        ok = val === val2;
        break;
      case '>':
        ok = val > val2;
        break;
      case '>=':
        ok = val >= val2;
        break;
      case '<':
        ok = val < val2;
        break;
      case '<=':
        ok = val <= val2;
        break;
      case '!=':
        ok = val != val2;
        break;
      case '!==':
        ok = val !== val2;
        break;
      default:
        msg = msg ? msg + ': ' : msg;
        throw new chai.AssertionError(
          msg + 'Invalid operator "' + operator + '"',
          undefined,
          assert.operator
        );
    }
    var test = new Assertion(ok, msg, assert.operator, true);
    test.assert(
        true === flag(test, 'object')
      , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)
      , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );
  };

  /**
   * ### .closeTo(actual, expected, delta, [message])
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
   *
   * @name closeTo
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.closeTo = function (act, exp, delta, msg) {
    new Assertion(act, msg, assert.closeTo, true).to.be.closeTo(exp, delta);
  };

  /**
   * ### .approximately(actual, expected, delta, [message])
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     assert.approximately(1.5, 1, 0.5, 'numbers are close');
   *
   * @name approximately
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.approximately = function (act, exp, delta, msg) {
    new Assertion(act, msg, assert.approximately, true)
      .to.be.approximately(exp, delta);
  };

  /**
   * ### .sameMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in any order. Uses a
   * strict equality check (===).
   *
   *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
   *
   * @name sameMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameMembers, true)
      .to.have.same.members(set2);
  }

  /**
   * ### .notSameMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in any order.
   * Uses a strict equality check (===).
   *
   *     assert.notSameMembers([ 1, 2, 3 ], [ 5, 1, 3 ], 'not same members');
   *
   * @name notSameMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameMembers, true)
      .to.not.have.same.members(set2);
  }

  /**
   * ### .sameDeepMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in any order. Uses a
   * deep equality check.
   *
   *     assert.sameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members');
   *
   * @name sameDeepMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameDeepMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameDeepMembers, true)
      .to.have.same.deep.members(set2);
  }

  /**
   * ### .notSameDeepMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in any order.
   * Uses a deep equality check.
   *
   *     assert.notSameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { f: 5 }], 'not same deep members');
   *
   * @name notSameDeepMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameDeepMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameDeepMembers, true)
      .to.not.have.same.deep.members(set2);
  }

  /**
   * ### .sameOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in the same order.
   * Uses a strict equality check (===).
   *
   *     assert.sameOrderedMembers([ 1, 2, 3 ], [ 1, 2, 3 ], 'same ordered members');
   *
   * @name sameOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameOrderedMembers, true)
      .to.have.same.ordered.members(set2);
  }

  /**
   * ### .notSameOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in the same
   * order. Uses a strict equality check (===).
   *
   *     assert.notSameOrderedMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'not same ordered members');
   *
   * @name notSameOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameOrderedMembers, true)
      .to.not.have.same.ordered.members(set2);
  }

  /**
   * ### .sameDeepOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in the same order.
   * Uses a deep equality check.
   *
   * assert.sameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { c: 3 } ], 'same deep ordered members');
   *
   * @name sameDeepOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameDeepOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameDeepOrderedMembers, true)
      .to.have.same.deep.ordered.members(set2);
  }

  /**
   * ### .notSameDeepOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in the same
   * order. Uses a deep equality check.
   *
   * assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { z: 5 } ], 'not same deep ordered members');
   * assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { c: 3 } ], 'not same deep ordered members');
   *
   * @name notSameDeepOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameDeepOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameDeepOrderedMembers, true)
      .to.not.have.same.deep.ordered.members(set2);
  }

  /**
   * ### .includeMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in any order. Uses a
   * strict equality check (===). Duplicates are ignored.
   *
   *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1, 2 ], 'include members');
   *
   * @name includeMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeMembers, true)
      .to.include.members(subset);
  }

  /**
   * ### .notIncludeMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in any order. Uses a
   * strict equality check (===). Duplicates are ignored.
   *
   *     assert.notIncludeMembers([ 1, 2, 3 ], [ 5, 1 ], 'not include members');
   *
   * @name notIncludeMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeMembers, true)
      .to.not.include.members(subset);
  }

  /**
   * ### .includeDeepMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in any order. Uses a deep
   * equality check. Duplicates are ignored.
   *
   *     assert.includeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { b: 2 } ], 'include deep members');
   *
   * @name includeDeepMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeDeepMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeDeepMembers, true)
      .to.include.deep.members(subset);
  }

  /**
   * ### .notIncludeDeepMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in any order. Uses a
   * deep equality check. Duplicates are ignored.
   *
   *     assert.notIncludeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { f: 5 } ], 'not include deep members');
   *
   * @name notIncludeDeepMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeDeepMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeDeepMembers, true)
      .to.not.include.deep.members(subset);
  }

  /**
   * ### .includeOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a strict equality
   * check (===).
   *
   *     assert.includeOrderedMembers([ 1, 2, 3 ], [ 1, 2 ], 'include ordered members');
   *
   * @name includeOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeOrderedMembers, true)
      .to.include.ordered.members(subset);
  }

  /**
   * ### .notIncludeOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a strict equality
   * check (===).
   *
   *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 1 ], 'not include ordered members');
   *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 3 ], 'not include ordered members');
   *
   * @name notIncludeOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeOrderedMembers, true)
      .to.not.include.ordered.members(subset);
  }

  /**
   * ### .includeDeepOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a deep equality
   * check.
   *
   *     assert.includeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 } ], 'include deep ordered members');
   *
   * @name includeDeepOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeDeepOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeDeepOrderedMembers, true)
      .to.include.deep.ordered.members(subset);
  }

  /**
   * ### .notIncludeDeepOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a deep equality
   * check.
   *
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { f: 5 } ], 'not include deep ordered members');
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 } ], 'not include deep ordered members');
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { c: 3 } ], 'not include deep ordered members');
   *
   * @name notIncludeDeepOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeDeepOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeDeepOrderedMembers, true)
      .to.not.include.deep.ordered.members(subset);
  }

  /**
   * ### .oneOf(inList, list, [message])
   *
   * Asserts that non-object, non-array value `inList` appears in the flat array `list`.
   *
   *     assert.oneOf(1, [ 2, 1 ], 'Not found in list');
   *
   * @name oneOf
   * @param {*} inList
   * @param {Array<*>} list
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.oneOf = function (inList, list, msg) {
    new Assertion(inList, msg, assert.oneOf, true).to.be.oneOf(list);
  }

  /**
   * ### .changes(function, object, property, [message])
   *
   * Asserts that a function changes the value of a property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 22 };
   *     assert.changes(fn, obj, 'val');
   *
   * @name changes
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changes = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changes, true).to.change(obj, prop);
  }

   /**
   * ### .changesBy(function, object, property, delta, [message])
   *
   * Asserts that a function changes the value of a property by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 2 };
   *     assert.changesBy(fn, obj, 'val', 2);
   *
   * @name changesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changesBy, true)
      .to.change(obj, prop).by(delta);
  }

   /**
   * ### .doesNotChange(function, object, property, [message])
   *
   * Asserts that a function does not change the value of a property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { console.log('foo'); };
   *     assert.doesNotChange(fn, obj, 'val');
   *
   * @name doesNotChange
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotChange = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotChange, true)
      .to.not.change(obj, prop);
  }

  /**
   * ### .changesButNotBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not change the value of a property or of a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 10 };
   *     assert.changesButNotBy(fn, obj, 'val', 5);
   *
   * @name changesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changesButNotBy, true)
      .to.change(obj, prop).but.not.by(delta);
  }

  /**
   * ### .increases(function, object, property, [message])
   *
   * Asserts that a function increases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 13 };
   *     assert.increases(fn, obj, 'val');
   *
   * @name increases
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increases = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.increases, true)
      .to.increase(obj, prop);
  }

  /**
   * ### .increasesBy(function, object, property, delta, [message])
   *
   * Asserts that a function increases a numeric object property or a function's return value by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 10 };
   *     assert.increasesBy(fn, obj, 'val', 10);
   *
   * @name increasesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increasesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.increasesBy, true)
      .to.increase(obj, prop).by(delta);
  }

  /**
   * ### .doesNotIncrease(function, object, property, [message])
   *
   * Asserts that a function does not increase a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 8 };
   *     assert.doesNotIncrease(fn, obj, 'val');
   *
   * @name doesNotIncrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotIncrease = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotIncrease, true)
      .to.not.increase(obj, prop);
  }

  /**
   * ### .increasesButNotBy(function, object, property, [message])
   *
   * Asserts that a function does not increase a numeric object property or function's return value by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 15 };
   *     assert.increasesButNotBy(fn, obj, 'val', 10);
   *
   * @name increasesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increasesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.increasesButNotBy, true)
      .to.increase(obj, prop).but.not.by(delta);
  }

  /**
   * ### .decreases(function, object, property, [message])
   *
   * Asserts that a function decreases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.decreases(fn, obj, 'val');
   *
   * @name decreases
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreases = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.decreases, true)
      .to.decrease(obj, prop);
  }

  /**
   * ### .decreasesBy(function, object, property, delta, [message])
   *
   * Asserts that a function decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val -= 5 };
   *     assert.decreasesBy(fn, obj, 'val', 5);
   *
   * @name decreasesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreasesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.decreasesBy, true)
      .to.decrease(obj, prop).by(delta);
  }

  /**
   * ### .doesNotDecrease(function, object, property, [message])
   *
   * Asserts that a function does not decreases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 15 };
   *     assert.doesNotDecrease(fn, obj, 'val');
   *
   * @name doesNotDecrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotDecrease = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotDecrease, true)
      .to.not.decrease(obj, prop);
  }

  /**
   * ### .doesNotDecreaseBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.doesNotDecreaseBy(fn, obj, 'val', 1);
   *
   * @name doesNotDecrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotDecreaseBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotDecreaseBy, true)
      .to.not.decrease(obj, prop).by(delta);
  }

  /**
   * ### .decreasesButNotBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.decreasesButNotBy(fn, obj, 'val', 1);
   *
   * @name decreasesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreasesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.decreasesButNotBy, true)
      .to.decrease(obj, prop).but.not.by(delta);
  }

  /*!
   * ### .ifError(object)
   *
   * Asserts if value is not a false value, and throws if it is a true value.
   * This is added to allow for chai to be a drop-in replacement for Node's
   * assert class.
   *
   *     var err = new Error('I am a custom error');
   *     assert.ifError(err); // Rethrows err!
   *
   * @name ifError
   * @param {Object} object
   * @namespace Assert
   * @api public
   */

  assert.ifError = function (val) {
    if (val) {
      throw(val);
    }
  };

  /**
   * ### .isExtensible(object)
   *
   * Asserts that `object` is extensible (can have new properties added to it).
   *
   *     assert.isExtensible({});
   *
   * @name isExtensible
   * @alias extensible
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isExtensible = function (obj, msg) {
    new Assertion(obj, msg, assert.isExtensible, true).to.be.extensible;
  };

  /**
   * ### .isNotExtensible(object)
   *
   * Asserts that `object` is _not_ extensible.
   *
   *     var nonExtensibleObject = Object.preventExtensions({});
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.freeze({});
   *
   *     assert.isNotExtensible(nonExtensibleObject);
   *     assert.isNotExtensible(sealedObject);
   *     assert.isNotExtensible(frozenObject);
   *
   * @name isNotExtensible
   * @alias notExtensible
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotExtensible = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotExtensible, true).to.not.be.extensible;
  };

  /**
   * ### .isSealed(object)
   *
   * Asserts that `object` is sealed (cannot have new properties added to it
   * and its existing properties cannot be removed).
   *
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.seal({});
   *
   *     assert.isSealed(sealedObject);
   *     assert.isSealed(frozenObject);
   *
   * @name isSealed
   * @alias sealed
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isSealed = function (obj, msg) {
    new Assertion(obj, msg, assert.isSealed, true).to.be.sealed;
  };

  /**
   * ### .isNotSealed(object)
   *
   * Asserts that `object` is _not_ sealed.
   *
   *     assert.isNotSealed({});
   *
   * @name isNotSealed
   * @alias notSealed
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotSealed = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotSealed, true).to.not.be.sealed;
  };

  /**
   * ### .isFrozen(object)
   *
   * Asserts that `object` is frozen (cannot have new properties added to it
   * and its existing properties cannot be modified).
   *
   *     var frozenObject = Object.freeze({});
   *     assert.frozen(frozenObject);
   *
   * @name isFrozen
   * @alias frozen
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isFrozen = function (obj, msg) {
    new Assertion(obj, msg, assert.isFrozen, true).to.be.frozen;
  };

  /**
   * ### .isNotFrozen(object)
   *
   * Asserts that `object` is _not_ frozen.
   *
   *     assert.isNotFrozen({});
   *
   * @name isNotFrozen
   * @alias notFrozen
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotFrozen = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotFrozen, true).to.not.be.frozen;
  };

  /**
   * ### .isEmpty(target)
   *
   * Asserts that the target does not contain any values.
   * For arrays and strings, it checks the `length` property.
   * For `Map` and `Set` instances, it checks the `size` property.
   * For non-function objects, it gets the count of own
   * enumerable string keys.
   *
   *     assert.isEmpty([]);
   *     assert.isEmpty('');
   *     assert.isEmpty(new Map);
   *     assert.isEmpty({});
   *
   * @name isEmpty
   * @alias empty
   * @param {Object|Array|String|Map|Set} target
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isEmpty = function(val, msg) {
    new Assertion(val, msg, assert.isEmpty, true).to.be.empty;
  };

  /**
   * ### .isNotEmpty(target)
   *
   * Asserts that the target contains values.
   * For arrays and strings, it checks the `length` property.
   * For `Map` and `Set` instances, it checks the `size` property.
   * For non-function objects, it gets the count of own
   * enumerable string keys.
   *
   *     assert.isNotEmpty([1, 2]);
   *     assert.isNotEmpty('34');
   *     assert.isNotEmpty(new Set([5, 6]));
   *     assert.isNotEmpty({ key: 7 });
   *
   * @name isNotEmpty
   * @alias notEmpty
   * @param {Object|Array|String|Map|Set} target
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotEmpty = function(val, msg) {
    new Assertion(val, msg, assert.isNotEmpty, true).to.not.be.empty;
  };

  /*!
   * Aliases.
   */

  (function alias(name, as){
    assert[as] = assert[name];
    return alias;
  })
  ('isOk', 'ok')
  ('isNotOk', 'notOk')
  ('throws', 'throw')
  ('throws', 'Throw')
  ('isExtensible', 'extensible')
  ('isNotExtensible', 'notExtensible')
  ('isSealed', 'sealed')
  ('isNotSealed', 'notSealed')
  ('isFrozen', 'frozen')
  ('isNotFrozen', 'notFrozen')
  ('isEmpty', 'empty')
  ('isNotEmpty', 'notEmpty');
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/interface/expect.js":
/*!********************************************************!*\
  !*** ./node_modules/chai/lib/chai/interface/expect.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  chai.expect = function (val, message) {
    return new chai.Assertion(val, message);
  };

  /**
   * ### .fail([message])
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure.
   *
   *     expect.fail();
   *     expect.fail("custom error message");
   *     expect.fail(1, 2);
   *     expect.fail(1, 2, "custom error message");
   *     expect.fail(1, 2, "custom error message", ">");
   *     expect.fail(1, 2, undefined, ">");
   *
   * @name fail
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @param {String} operator
   * @namespace BDD
   * @api public
   */

  chai.expect.fail = function (actual, expected, message, operator) {
    if (arguments.length < 2) {
        message = actual;
        actual = undefined;
    }

    message = message || 'expect.fail()';
    throw new chai.AssertionError(message, {
        actual: actual
      , expected: expected
      , operator: operator
    }, chai.expect.fail);
  };
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/interface/should.js":
/*!********************************************************!*\
  !*** ./node_modules/chai/lib/chai/interface/should.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  var Assertion = chai.Assertion;

  function loadShould () {
    // explicitly define this method as function as to have it's name to include as `ssfi`
    function shouldGetter() {
      if (this instanceof String
          || this instanceof Number
          || this instanceof Boolean
          || typeof Symbol === 'function' && this instanceof Symbol) {
        return new Assertion(this.valueOf(), null, shouldGetter);
      }
      return new Assertion(this, null, shouldGetter);
    }
    function shouldSetter(value) {
      // See https://github.com/chaijs/chai/issues/86: this makes
      // `whatever.should = someValue` actually set `someValue`, which is
      // especially useful for `global.should = require('chai').should()`.
      //
      // Note that we have to use [[DefineProperty]] instead of [[Put]]
      // since otherwise we would trigger this very setter!
      Object.defineProperty(this, 'should', {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    }
    // modify Object.prototype to have `should`
    Object.defineProperty(Object.prototype, 'should', {
      set: shouldSetter
      , get: shouldGetter
      , configurable: true
    });

    var should = {};

    /**
     * ### .fail([message])
     * ### .fail(actual, expected, [message], [operator])
     *
     * Throw a failure.
     *
     *     should.fail();
     *     should.fail("custom error message");
     *     should.fail(1, 2);
     *     should.fail(1, 2, "custom error message");
     *     should.fail(1, 2, "custom error message", ">");
     *     should.fail(1, 2, undefined, ">");
     *
     *
     * @name fail
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @param {String} operator
     * @namespace BDD
     * @api public
     */

    should.fail = function (actual, expected, message, operator) {
      if (arguments.length < 2) {
          message = actual;
          actual = undefined;
      }

      message = message || 'should.fail()';
      throw new chai.AssertionError(message, {
          actual: actual
        , expected: expected
        , operator: operator
      }, should.fail);
    };

    /**
     * ### .equal(actual, expected, [message])
     *
     * Asserts non-strict equality (`==`) of `actual` and `expected`.
     *
     *     should.equal(3, '3', '== coerces values to strings');
     *
     * @name equal
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @namespace Should
     * @api public
     */

    should.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.equal(val2);
    };

    /**
     * ### .throw(function, [constructor/string/regexp], [string/regexp], [message])
     *
     * Asserts that `function` will throw an error that is an instance of
     * `constructor`, or alternately that it will throw an error with message
     * matching `regexp`.
     *
     *     should.throw(fn, 'function throws a reference error');
     *     should.throw(fn, /function throws a reference error/);
     *     should.throw(fn, ReferenceError);
     *     should.throw(fn, ReferenceError, 'function throws a reference error');
     *     should.throw(fn, ReferenceError, /function throws a reference error/);
     *
     * @name throw
     * @alias Throw
     * @param {Function} function
     * @param {ErrorConstructor} constructor
     * @param {RegExp} regexp
     * @param {String} message
     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
     * @namespace Should
     * @api public
     */

    should.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.Throw(errt, errs);
    };

    /**
     * ### .exist
     *
     * Asserts that the target is neither `null` nor `undefined`.
     *
     *     var foo = 'hi';
     *
     *     should.exist(foo, 'foo exists');
     *
     * @name exist
     * @namespace Should
     * @api public
     */

    should.exist = function (val, msg) {
      new Assertion(val, msg).to.exist;
    }

    // negation
    should.not = {}

    /**
     * ### .not.equal(actual, expected, [message])
     *
     * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
     *
     *     should.not.equal(3, 4, 'these numbers are not equal');
     *
     * @name not.equal
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @namespace Should
     * @api public
     */

    should.not.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.not.equal(val2);
    };

    /**
     * ### .throw(function, [constructor/regexp], [message])
     *
     * Asserts that `function` will _not_ throw an error that is an instance of
     * `constructor`, or alternately that it will not throw an error with message
     * matching `regexp`.
     *
     *     should.not.throw(fn, Error, 'function does not throw');
     *
     * @name not.throw
     * @alias not.Throw
     * @param {Function} function
     * @param {ErrorConstructor} constructor
     * @param {RegExp} regexp
     * @param {String} message
     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
     * @namespace Should
     * @api public
     */

    should.not.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.not.Throw(errt, errs);
    };

    /**
     * ### .not.exist
     *
     * Asserts that the target is neither `null` nor `undefined`.
     *
     *     var bar = null;
     *
     *     should.not.exist(bar, 'bar does not exist');
     *
     * @name not.exist
     * @namespace Should
     * @api public
     */

    should.not.exist = function (val, msg) {
      new Assertion(val, msg).to.not.exist;
    }

    should['throw'] = should['Throw'];
    should.not['throw'] = should.not['Throw'];

    return should;
  };

  chai.should = loadShould;
  chai.Should = loadShould;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/addChainableMethod.js":
/*!****************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/addChainableMethod.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var addLengthGuard = __webpack_require__(/*! ./addLengthGuard */ "./node_modules/chai/lib/chai/utils/addLengthGuard.js");
var chai = __webpack_require__(/*! ../../chai */ "./node_modules/chai/lib/chai.js");
var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");
var proxify = __webpack_require__(/*! ./proxify */ "./node_modules/chai/lib/chai/utils/proxify.js");
var transferFlags = __webpack_require__(/*! ./transferFlags */ "./node_modules/chai/lib/chai/utils/transferFlags.js");

/*!
 * Module variables
 */

// Check whether `Object.setPrototypeOf` is supported
var canSetPrototype = typeof Object.setPrototypeOf === 'function';

// Without `Object.setPrototypeOf` support, this module will need to add properties to a function.
// However, some of functions' own props are not configurable and should be skipped.
var testFn = function() {};
var excludeNames = Object.getOwnPropertyNames(testFn).filter(function(name) {
  var propDesc = Object.getOwnPropertyDescriptor(testFn, name);

  // Note: PhantomJS 1.x includes `callee` as one of `testFn`'s own properties,
  // but then returns `undefined` as the property descriptor for `callee`. As a
  // workaround, we perform an otherwise unnecessary type-check for `propDesc`,
  // and then filter it out if it's not an object as it should be.
  if (typeof propDesc !== 'object')
    return true;

  return !propDesc.configurable;
});

// Cache `Function` properties
var call  = Function.prototype.call,
    apply = Function.prototype.apply;

/**
 * ### .addChainableMethod(ctx, name, method, chainingBehavior)
 *
 * Adds a method to an object, such that the method can also be chained.
 *
 *     utils.addChainableMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addChainableMethod('foo', fn, chainingBehavior);
 *
 * The result can then be used as both a method assertion, executing both `method` and
 * `chainingBehavior`, or as a language chain, which only executes `chainingBehavior`.
 *
 *     expect(fooStr).to.be.foo('bar');
 *     expect(fooStr).to.be.foo.equal('foo');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for `name`, when called
 * @param {Function} chainingBehavior function to be called every time the property is accessed
 * @namespace Utils
 * @name addChainableMethod
 * @api public
 */

module.exports = function addChainableMethod(ctx, name, method, chainingBehavior) {
  if (typeof chainingBehavior !== 'function') {
    chainingBehavior = function () { };
  }

  var chainableBehavior = {
      method: method
    , chainingBehavior: chainingBehavior
  };

  // save the methods so we can overwrite them later, if we need to.
  if (!ctx.__methods) {
    ctx.__methods = {};
  }
  ctx.__methods[name] = chainableBehavior;

  Object.defineProperty(ctx, name,
    { get: function chainableMethodGetter() {
        chainableBehavior.chainingBehavior.call(this);

        var chainableMethodWrapper = function () {
          // Setting the `ssfi` flag to `chainableMethodWrapper` causes this
          // function to be the starting point for removing implementation
          // frames from the stack trace of a failed assertion.
          //
          // However, we only want to use this function as the starting point if
          // the `lockSsfi` flag isn't set.
          //
          // If the `lockSsfi` flag is set, then this assertion is being
          // invoked from inside of another assertion. In this case, the `ssfi`
          // flag has already been set by the outer assertion.
          //
          // Note that overwriting a chainable method merely replaces the saved
          // methods in `ctx.__methods` instead of completely replacing the
          // overwritten assertion. Therefore, an overwriting assertion won't
          // set the `ssfi` or `lockSsfi` flags.
          if (!flag(this, 'lockSsfi')) {
            flag(this, 'ssfi', chainableMethodWrapper);
          }

          var result = chainableBehavior.method.apply(this, arguments);
          if (result !== undefined) {
            return result;
          }

          var newAssertion = new chai.Assertion();
          transferFlags(this, newAssertion);
          return newAssertion;
        };

        addLengthGuard(chainableMethodWrapper, name, true);

        // Use `Object.setPrototypeOf` if available
        if (canSetPrototype) {
          // Inherit all properties from the object by replacing the `Function` prototype
          var prototype = Object.create(this);
          // Restore the `call` and `apply` methods from `Function`
          prototype.call = call;
          prototype.apply = apply;
          Object.setPrototypeOf(chainableMethodWrapper, prototype);
        }
        // Otherwise, redefine all properties (slow!)
        else {
          var asserterNames = Object.getOwnPropertyNames(ctx);
          asserterNames.forEach(function (asserterName) {
            if (excludeNames.indexOf(asserterName) !== -1) {
              return;
            }

            var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
            Object.defineProperty(chainableMethodWrapper, asserterName, pd);
          });
        }

        transferFlags(this, chainableMethodWrapper);
        return proxify(chainableMethodWrapper);
      }
    , configurable: true
  });
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/addLengthGuard.js":
/*!************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/addLengthGuard.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var fnLengthDesc = Object.getOwnPropertyDescriptor(function () {}, 'length');

/*!
 * Chai - addLengthGuard utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .addLengthGuard(fn, assertionName, isChainable)
 *
 * Define `length` as a getter on the given uninvoked method assertion. The
 * getter acts as a guard against chaining `length` directly off of an uninvoked
 * method assertion, which is a problem because it references `function`'s
 * built-in `length` property instead of Chai's `length` assertion. When the
 * getter catches the user making this mistake, it throws an error with a
 * helpful message.
 *
 * There are two ways in which this mistake can be made. The first way is by
 * chaining the `length` assertion directly off of an uninvoked chainable
 * method. In this case, Chai suggests that the user use `lengthOf` instead. The
 * second way is by chaining the `length` assertion directly off of an uninvoked
 * non-chainable method. Non-chainable methods must be invoked prior to
 * chaining. In this case, Chai suggests that the user consult the docs for the
 * given assertion.
 *
 * If the `length` property of functions is unconfigurable, then return `fn`
 * without modification.
 *
 * Note that in ES6, the function's `length` property is configurable, so once
 * support for legacy environments is dropped, Chai's `length` property can
 * replace the built-in function's `length` property, and this length guard will
 * no longer be necessary. In the mean time, maintaining consistency across all
 * environments is the priority.
 *
 * @param {Function} fn
 * @param {String} assertionName
 * @param {Boolean} isChainable
 * @namespace Utils
 * @name addLengthGuard
 */

module.exports = function addLengthGuard (fn, assertionName, isChainable) {
  if (!fnLengthDesc.configurable) return fn;

  Object.defineProperty(fn, 'length', {
    get: function () {
      if (isChainable) {
        throw Error('Invalid Chai property: ' + assertionName + '.length. Due' +
          ' to a compatibility issue, "length" cannot directly follow "' +
          assertionName + '". Use "' + assertionName + '.lengthOf" instead.');
      }

      throw Error('Invalid Chai property: ' + assertionName + '.length. See' +
        ' docs for proper usage of "' + assertionName + '".');
    }
  });

  return fn;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/addMethod.js":
/*!*******************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/addMethod.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var addLengthGuard = __webpack_require__(/*! ./addLengthGuard */ "./node_modules/chai/lib/chai/utils/addLengthGuard.js");
var chai = __webpack_require__(/*! ../../chai */ "./node_modules/chai/lib/chai.js");
var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");
var proxify = __webpack_require__(/*! ./proxify */ "./node_modules/chai/lib/chai/utils/proxify.js");
var transferFlags = __webpack_require__(/*! ./transferFlags */ "./node_modules/chai/lib/chai/utils/transferFlags.js");

/**
 * ### .addMethod(ctx, name, method)
 *
 * Adds a method to the prototype of an object.
 *
 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(fooStr).to.be.foo('bar');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for name
 * @namespace Utils
 * @name addMethod
 * @api public
 */

module.exports = function addMethod(ctx, name, method) {
  var methodWrapper = function () {
    // Setting the `ssfi` flag to `methodWrapper` causes this function to be the
    // starting point for removing implementation frames from the stack trace of
    // a failed assertion.
    //
    // However, we only want to use this function as the starting point if the
    // `lockSsfi` flag isn't set.
    //
    // If the `lockSsfi` flag is set, then either this assertion has been
    // overwritten by another assertion, or this assertion is being invoked from
    // inside of another assertion. In the first case, the `ssfi` flag has
    // already been set by the overwriting assertion. In the second case, the
    // `ssfi` flag has already been set by the outer assertion.
    if (!flag(this, 'lockSsfi')) {
      flag(this, 'ssfi', methodWrapper);
    }

    var result = method.apply(this, arguments);
    if (result !== undefined)
      return result;

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };

  addLengthGuard(methodWrapper, name, false);
  ctx[name] = proxify(methodWrapper, name);
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/addProperty.js":
/*!*********************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/addProperty.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var chai = __webpack_require__(/*! ../../chai */ "./node_modules/chai/lib/chai.js");
var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");
var isProxyEnabled = __webpack_require__(/*! ./isProxyEnabled */ "./node_modules/chai/lib/chai/utils/isProxyEnabled.js");
var transferFlags = __webpack_require__(/*! ./transferFlags */ "./node_modules/chai/lib/chai/utils/transferFlags.js");

/**
 * ### .addProperty(ctx, name, getter)
 *
 * Adds a property to the prototype of an object.
 *
 *     utils.addProperty(chai.Assertion.prototype, 'foo', function () {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.instanceof(Foo);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.foo;
 *
 * @param {Object} ctx object to which the property is added
 * @param {String} name of property to add
 * @param {Function} getter function to be used for name
 * @namespace Utils
 * @name addProperty
 * @api public
 */

module.exports = function addProperty(ctx, name, getter) {
  getter = getter === undefined ? function () {} : getter;

  Object.defineProperty(ctx, name,
    { get: function propertyGetter() {
        // Setting the `ssfi` flag to `propertyGetter` causes this function to
        // be the starting point for removing implementation frames from the
        // stack trace of a failed assertion.
        //
        // However, we only want to use this function as the starting point if
        // the `lockSsfi` flag isn't set and proxy protection is disabled.
        //
        // If the `lockSsfi` flag is set, then either this assertion has been
        // overwritten by another assertion, or this assertion is being invoked
        // from inside of another assertion. In the first case, the `ssfi` flag
        // has already been set by the overwriting assertion. In the second
        // case, the `ssfi` flag has already been set by the outer assertion.
        //
        // If proxy protection is enabled, then the `ssfi` flag has already been
        // set by the proxy getter.
        if (!isProxyEnabled() && !flag(this, 'lockSsfi')) {
          flag(this, 'ssfi', propertyGetter);
        }

        var result = getter.call(this);
        if (result !== undefined)
          return result;

        var newAssertion = new chai.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }
    , configurable: true
  });
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/compareByInspect.js":
/*!**************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/compareByInspect.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - compareByInspect utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var inspect = __webpack_require__(/*! ./inspect */ "./node_modules/chai/lib/chai/utils/inspect.js");

/**
 * ### .compareByInspect(mixed, mixed)
 *
 * To be used as a compareFunction with Array.prototype.sort. Compares elements
 * using inspect instead of default behavior of using toString so that Symbols
 * and objects with irregular/missing toString can still be sorted without a
 * TypeError.
 *
 * @param {Mixed} first element to compare
 * @param {Mixed} second element to compare
 * @returns {Number} -1 if 'a' should come before 'b'; otherwise 1
 * @name compareByInspect
 * @namespace Utils
 * @api public
 */

module.exports = function compareByInspect(a, b) {
  return inspect(a) < inspect(b) ? -1 : 1;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/expectTypes.js":
/*!*********************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/expectTypes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .expectTypes(obj, types)
 *
 * Ensures that the object being tested against is of a valid type.
 *
 *     utils.expectTypes(this, ['array', 'object', 'string']);
 *
 * @param {Mixed} obj constructed Assertion
 * @param {Array} type A list of allowed types for this assertion
 * @namespace Utils
 * @name expectTypes
 * @api public
 */

var AssertionError = __webpack_require__(/*! assertion-error */ "./node_modules/assertion-error/index.js");
var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");
var type = __webpack_require__(/*! type-detect */ "./node_modules/type-detect/type-detect.js");

module.exports = function expectTypes(obj, types) {
  var flagMsg = flag(obj, 'message');
  var ssfi = flag(obj, 'ssfi');

  flagMsg = flagMsg ? flagMsg + ': ' : '';

  obj = flag(obj, 'object');
  types = types.map(function (t) { return t.toLowerCase(); });
  types.sort();

  // Transforms ['lorem', 'ipsum'] into 'a lorem, or an ipsum'
  var str = types.map(function (t, index) {
    var art = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(t.charAt(0)) ? 'an' : 'a';
    var or = types.length > 1 && index === types.length - 1 ? 'or ' : '';
    return or + art + ' ' + t;
  }).join(', ');

  var objType = type(obj).toLowerCase();

  if (!types.some(function (expected) { return objType === expected; })) {
    throw new AssertionError(
      flagMsg + 'object tested must be ' + str + ', but ' + objType + ' given',
      undefined,
      ssfi
    );
  }
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/flag.js":
/*!**************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/flag.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .flag(object, key, [value])
 *
 * Get or set a flag value on an object. If a
 * value is provided it will be set, else it will
 * return the currently set value or `undefined` if
 * the value is not set.
 *
 *     utils.flag(this, 'foo', 'bar'); // setter
 *     utils.flag(this, 'foo'); // getter, returns `bar`
 *
 * @param {Object} object constructed Assertion
 * @param {String} key
 * @param {Mixed} value (optional)
 * @namespace Utils
 * @name flag
 * @api private
 */

module.exports = function flag(obj, key, value) {
  var flags = obj.__flags || (obj.__flags = Object.create(null));
  if (arguments.length === 3) {
    flags[key] = value;
  } else {
    return flags[key];
  }
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/getActual.js":
/*!*******************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/getActual.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Chai - getActual utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getActual(object, [actual])
 *
 * Returns the `actual` value for an Assertion.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name getActual
 */

module.exports = function getActual(obj, args) {
  return args.length > 4 ? args[4] : obj._obj;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/getEnumerableProperties.js":
/*!*********************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/getEnumerableProperties.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Chai - getEnumerableProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getEnumerableProperties(object)
 *
 * This allows the retrieval of enumerable property names of an object,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getEnumerableProperties
 * @api public
 */

module.exports = function getEnumerableProperties(object) {
  var result = [];
  for (var name in object) {
    result.push(name);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/getMessage.js":
/*!********************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/getMessage.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js")
  , getActual = __webpack_require__(/*! ./getActual */ "./node_modules/chai/lib/chai/utils/getActual.js")
  , objDisplay = __webpack_require__(/*! ./objDisplay */ "./node_modules/chai/lib/chai/utils/objDisplay.js");

/**
 * ### .getMessage(object, message, negateMessage)
 *
 * Construct the error message based on flags
 * and template tags. Template tags will return
 * a stringified inspection of the object referenced.
 *
 * Message template tags:
 * - `#{this}` current asserted object
 * - `#{act}` actual value
 * - `#{exp}` expected value
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name getMessage
 * @api public
 */

module.exports = function getMessage(obj, args) {
  var negate = flag(obj, 'negate')
    , val = flag(obj, 'object')
    , expected = args[3]
    , actual = getActual(obj, args)
    , msg = negate ? args[2] : args[1]
    , flagMsg = flag(obj, 'message');

  if(typeof msg === "function") msg = msg();
  msg = msg || '';
  msg = msg
    .replace(/#\{this\}/g, function () { return objDisplay(val); })
    .replace(/#\{act\}/g, function () { return objDisplay(actual); })
    .replace(/#\{exp\}/g, function () { return objDisplay(expected); });

  return flagMsg ? flagMsg + ': ' + msg : msg;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/getOwnEnumerableProperties.js":
/*!************************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/getOwnEnumerableProperties.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - getOwnEnumerableProperties utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var getOwnEnumerablePropertySymbols = __webpack_require__(/*! ./getOwnEnumerablePropertySymbols */ "./node_modules/chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js");

/**
 * ### .getOwnEnumerableProperties(object)
 *
 * This allows the retrieval of directly-owned enumerable property names and
 * symbols of an object. This function is necessary because Object.keys only
 * returns enumerable property names, not enumerable property symbols.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getOwnEnumerableProperties
 * @api public
 */

module.exports = function getOwnEnumerableProperties(obj) {
  return Object.keys(obj).concat(getOwnEnumerablePropertySymbols(obj));
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Chai - getOwnEnumerablePropertySymbols utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getOwnEnumerablePropertySymbols(object)
 *
 * This allows the retrieval of directly-owned enumerable property symbols of an
 * object. This function is necessary because Object.getOwnPropertySymbols
 * returns both enumerable and non-enumerable property symbols.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getOwnEnumerablePropertySymbols
 * @api public
 */

module.exports = function getOwnEnumerablePropertySymbols(obj) {
  if (typeof Object.getOwnPropertySymbols !== 'function') return [];

  return Object.getOwnPropertySymbols(obj).filter(function (sym) {
    return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
  });
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/getProperties.js":
/*!***********************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/getProperties.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getProperties(object)
 *
 * This allows the retrieval of property names of an object, enumerable or not,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getProperties
 * @api public
 */

module.exports = function getProperties(object) {
  var result = Object.getOwnPropertyNames(object);

  function addProperty(property) {
    if (result.indexOf(property) === -1) {
      result.push(property);
    }
  }

  var proto = Object.getPrototypeOf(object);
  while (proto !== null) {
    Object.getOwnPropertyNames(proto).forEach(addProperty);
    proto = Object.getPrototypeOf(proto);
  }

  return result;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/index.js":
/*!***************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Dependencies that are used for multiple exports are required here only once
 */

var pathval = __webpack_require__(/*! pathval */ "./node_modules/pathval/index.js");

/*!
 * test utility
 */

exports.test = __webpack_require__(/*! ./test */ "./node_modules/chai/lib/chai/utils/test.js");

/*!
 * type utility
 */

exports.type = __webpack_require__(/*! type-detect */ "./node_modules/type-detect/type-detect.js");

/*!
 * expectTypes utility
 */
exports.expectTypes = __webpack_require__(/*! ./expectTypes */ "./node_modules/chai/lib/chai/utils/expectTypes.js");

/*!
 * message utility
 */

exports.getMessage = __webpack_require__(/*! ./getMessage */ "./node_modules/chai/lib/chai/utils/getMessage.js");

/*!
 * actual utility
 */

exports.getActual = __webpack_require__(/*! ./getActual */ "./node_modules/chai/lib/chai/utils/getActual.js");

/*!
 * Inspect util
 */

exports.inspect = __webpack_require__(/*! ./inspect */ "./node_modules/chai/lib/chai/utils/inspect.js");

/*!
 * Object Display util
 */

exports.objDisplay = __webpack_require__(/*! ./objDisplay */ "./node_modules/chai/lib/chai/utils/objDisplay.js");

/*!
 * Flag utility
 */

exports.flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");

/*!
 * Flag transferring utility
 */

exports.transferFlags = __webpack_require__(/*! ./transferFlags */ "./node_modules/chai/lib/chai/utils/transferFlags.js");

/*!
 * Deep equal utility
 */

exports.eql = __webpack_require__(/*! deep-eql */ "./node_modules/deep-eql/index.js");

/*!
 * Deep path info
 */

exports.getPathInfo = pathval.getPathInfo;

/*!
 * Check if a property exists
 */

exports.hasProperty = pathval.hasProperty;

/*!
 * Function name
 */

exports.getName = __webpack_require__(/*! get-func-name */ "./node_modules/get-func-name/index.js");

/*!
 * add Property
 */

exports.addProperty = __webpack_require__(/*! ./addProperty */ "./node_modules/chai/lib/chai/utils/addProperty.js");

/*!
 * add Method
 */

exports.addMethod = __webpack_require__(/*! ./addMethod */ "./node_modules/chai/lib/chai/utils/addMethod.js");

/*!
 * overwrite Property
 */

exports.overwriteProperty = __webpack_require__(/*! ./overwriteProperty */ "./node_modules/chai/lib/chai/utils/overwriteProperty.js");

/*!
 * overwrite Method
 */

exports.overwriteMethod = __webpack_require__(/*! ./overwriteMethod */ "./node_modules/chai/lib/chai/utils/overwriteMethod.js");

/*!
 * Add a chainable method
 */

exports.addChainableMethod = __webpack_require__(/*! ./addChainableMethod */ "./node_modules/chai/lib/chai/utils/addChainableMethod.js");

/*!
 * Overwrite chainable method
 */

exports.overwriteChainableMethod = __webpack_require__(/*! ./overwriteChainableMethod */ "./node_modules/chai/lib/chai/utils/overwriteChainableMethod.js");

/*!
 * Compare by inspect method
 */

exports.compareByInspect = __webpack_require__(/*! ./compareByInspect */ "./node_modules/chai/lib/chai/utils/compareByInspect.js");

/*!
 * Get own enumerable property symbols method
 */

exports.getOwnEnumerablePropertySymbols = __webpack_require__(/*! ./getOwnEnumerablePropertySymbols */ "./node_modules/chai/lib/chai/utils/getOwnEnumerablePropertySymbols.js");

/*!
 * Get own enumerable properties method
 */

exports.getOwnEnumerableProperties = __webpack_require__(/*! ./getOwnEnumerableProperties */ "./node_modules/chai/lib/chai/utils/getOwnEnumerableProperties.js");

/*!
 * Checks error against a given set of criteria
 */

exports.checkError = __webpack_require__(/*! check-error */ "./node_modules/check-error/index.js");

/*!
 * Proxify util
 */

exports.proxify = __webpack_require__(/*! ./proxify */ "./node_modules/chai/lib/chai/utils/proxify.js");

/*!
 * addLengthGuard util
 */

exports.addLengthGuard = __webpack_require__(/*! ./addLengthGuard */ "./node_modules/chai/lib/chai/utils/addLengthGuard.js");

/*!
 * isProxyEnabled helper
 */

exports.isProxyEnabled = __webpack_require__(/*! ./isProxyEnabled */ "./node_modules/chai/lib/chai/utils/isProxyEnabled.js");

/*!
 * isNaN method
 */

exports.isNaN = __webpack_require__(/*! ./isNaN */ "./node_modules/chai/lib/chai/utils/isNaN.js");


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/inspect.js":
/*!*****************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/inspect.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// This is (almost) directly from Node.js utils
// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js

var getName = __webpack_require__(/*! get-func-name */ "./node_modules/get-func-name/index.js");
var getProperties = __webpack_require__(/*! ./getProperties */ "./node_modules/chai/lib/chai/utils/getProperties.js");
var getEnumerableProperties = __webpack_require__(/*! ./getEnumerableProperties */ "./node_modules/chai/lib/chai/utils/getEnumerableProperties.js");
var config = __webpack_require__(/*! ../config */ "./node_modules/chai/lib/chai/config.js");

module.exports = inspect;

/**
 * ### .inspect(obj, [showHidden], [depth], [colors])
 *
 * Echoes the value of a value. Tries to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)
 *    properties of objects. Default is false.
 * @param {Number} depth Depth in which to descend in object. Default is 2.
 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the
 *    output. Default is false (no coloring).
 * @namespace Utils
 * @name inspect
 */
function inspect(obj, showHidden, depth, colors) {
  var ctx = {
    showHidden: showHidden,
    seen: [],
    stylize: function (str) { return str; }
  };
  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
}

// Returns true if object is a DOM element.
var isDOMElement = function (object) {
  if (typeof HTMLElement === 'object') {
    return object instanceof HTMLElement;
  } else {
    return object &&
      typeof object === 'object' &&
      'nodeType' in object &&
      object.nodeType === 1 &&
      typeof object.nodeName === 'string';
  }
};

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (value && typeof value.inspect === 'function' &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (typeof ret !== 'string') {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // If this is a DOM element, try to get the outer HTML.
  if (isDOMElement(value)) {
    if ('outerHTML' in value) {
      return value.outerHTML;
      // This value does not have an outerHTML attribute,
      //   it could still be an XML element
    } else {
      // Attempt to serialize it
      try {
        if (document.xmlVersion) {
          var xmlSerializer = new XMLSerializer();
          return xmlSerializer.serializeToString(value);
        } else {
          // Firefox 11- do not support outerHTML
          //   It does, however, support innerHTML
          //   Use the following to render the element
          var ns = "http://www.w3.org/1999/xhtml";
          var container = document.createElementNS(ns, '_');

          container.appendChild(value.cloneNode(false));
          var html = container.innerHTML
            .replace('><', '>' + value.innerHTML + '<');
          container.innerHTML = '';
          return html;
        }
      } catch (err) {
        // This could be a non-native DOM implementation,
        //   continue with the normal flow:
        //   printing the element as if it is an object.
      }
    }
  }

  // Look up the keys of the object.
  var visibleKeys = getEnumerableProperties(value);
  var keys = ctx.showHidden ? getProperties(value) : visibleKeys;

  var name, nameSuffix;

  // Some type of object without properties can be shortcut.
  // In IE, errors have a single `stack` property, or if they are vanilla `Error`,
  // a `stack` plus `description` property; ignore those for consistency.
  if (keys.length === 0 || (isError(value) && (
      (keys.length === 1 && keys[0] === 'stack') ||
      (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')
     ))) {
    if (typeof value === 'function') {
      name = getName(value);
      nameSuffix = name ? ': ' + name : '';
      return ctx.stylize('[Function' + nameSuffix + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = ''
    , array = false
    , typedArray = false
    , braces = ['{', '}'];

  if (isTypedArray(value)) {
    typedArray = true;
    braces = ['[', ']'];
  }

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (typeof value === 'function') {
    name = getName(value);
    nameSuffix = name ? ': ' + name : '';
    base = ' [Function' + nameSuffix + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    return formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else if (typedArray) {
    return formatTypedArray(value);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  switch (typeof value) {
    case 'undefined':
      return ctx.stylize('undefined', 'undefined');

    case 'string':
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');

    case 'number':
      if (value === 0 && (1/value) === -Infinity) {
        return ctx.stylize('-0', 'number');
      }
      return ctx.stylize('' + value, 'number');

    case 'boolean':
      return ctx.stylize('' + value, 'boolean');

    case 'symbol':
      return ctx.stylize(value.toString(), 'symbol');
  }
  // For some reason typeof null is "object", so special case here.
  if (value === null) {
    return ctx.stylize('null', 'null');
  }
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}

function formatTypedArray(value) {
  var str = '[ ';

  for (var i = 0; i < value.length; ++i) {
    if (str.length >= config.truncateThreshold - 7) {
      str += '...';
      break;
    }
    str += value[i] + ', ';
  }
  str += ' ]';

  // Removing trailing `, ` if the array was not truncated
  if (str.indexOf(',  ]') !== -1) {
    str = str.replace(',  ]', ' ]');
  }

  return str;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name;
  var propDescriptor = Object.getOwnPropertyDescriptor(value, key);
  var str;

  if (propDescriptor) {
    if (propDescriptor.get) {
      if (propDescriptor.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (propDescriptor.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
  }
  if (visibleKeys.indexOf(key) < 0) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(value[key]) < 0) {
      if (recurseTimes === null) {
        str = formatValue(ctx, value[key], null);
      } else {
        str = formatValue(ctx, value[key], recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (typeof name === 'undefined') {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var length = output.reduce(function(prev, cur) {
    return prev + cur.length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

function isTypedArray(ar) {
  // Unfortunately there's no way to check if an object is a TypedArray
  // We have to check if it's one of these types
  return (typeof ar === 'object' && /\w+Array]$/.test(objectToString(ar)));
}

function isArray(ar) {
  return Array.isArray(ar) ||
         (typeof ar === 'object' && objectToString(ar) === '[object Array]');
}

function isRegExp(re) {
  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
}

function isDate(d) {
  return typeof d === 'object' && objectToString(d) === '[object Date]';
}

function isError(e) {
  return typeof e === 'object' && objectToString(e) === '[object Error]';
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/isNaN.js":
/*!***************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/isNaN.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Chai - isNaN utility
 * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
 * MIT Licensed
 */

/**
 * ### .isNaN(value)
 *
 * Checks if the given value is NaN or not.
 *
 *     utils.isNaN(NaN); // true
 *
 * @param {Value} The value which has to be checked if it is NaN
 * @name isNaN
 * @api private
 */

function isNaN(value) {
  // Refer http://www.ecma-international.org/ecma-262/6.0/#sec-isnan-number
  // section's NOTE.
  return value !== value;
}

// If ECMAScript 6's Number.isNaN is present, prefer that.
module.exports = Number.isNaN || isNaN;


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/isProxyEnabled.js":
/*!************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/isProxyEnabled.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(/*! ../config */ "./node_modules/chai/lib/chai/config.js");

/*!
 * Chai - isProxyEnabled helper
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .isProxyEnabled()
 *
 * Helper function to check if Chai's proxy protection feature is enabled. If
 * proxies are unsupported or disabled via the user's Chai config, then return
 * false. Otherwise, return true.
 *
 * @namespace Utils
 * @name isProxyEnabled
 */

module.exports = function isProxyEnabled() {
  return config.useProxy &&
    typeof Proxy !== 'undefined' &&
    typeof Reflect !== 'undefined';
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/objDisplay.js":
/*!********************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/objDisplay.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var inspect = __webpack_require__(/*! ./inspect */ "./node_modules/chai/lib/chai/utils/inspect.js");
var config = __webpack_require__(/*! ../config */ "./node_modules/chai/lib/chai/config.js");

/**
 * ### .objDisplay(object)
 *
 * Determines if an object or an array matches
 * criteria to be inspected in-line for error
 * messages or should be truncated.
 *
 * @param {Mixed} javascript object to inspect
 * @name objDisplay
 * @namespace Utils
 * @api public
 */

module.exports = function objDisplay(obj) {
  var str = inspect(obj)
    , type = Object.prototype.toString.call(obj);

  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
    if (type === '[object Function]') {
      return !obj.name || obj.name === ''
        ? '[Function]'
        : '[Function: ' + obj.name + ']';
    } else if (type === '[object Array]') {
      return '[ Array(' + obj.length + ') ]';
    } else if (type === '[object Object]') {
      var keys = Object.keys(obj)
        , kstr = keys.length > 2
          ? keys.splice(0, 2).join(', ') + ', ...'
          : keys.join(', ');
      return '{ Object (' + kstr + ') }';
    } else {
      return str;
    }
  } else {
    return str;
  }
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/overwriteChainableMethod.js":
/*!**********************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/overwriteChainableMethod.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var chai = __webpack_require__(/*! ../../chai */ "./node_modules/chai/lib/chai.js");
var transferFlags = __webpack_require__(/*! ./transferFlags */ "./node_modules/chai/lib/chai/utils/transferFlags.js");

/**
 * ### .overwriteChainableMethod(ctx, name, method, chainingBehavior)
 *
 * Overwrites an already existing chainable method
 * and provides access to the previous function or
 * property.  Must return functions to be used for
 * name.
 *
 *     utils.overwriteChainableMethod(chai.Assertion.prototype, 'lengthOf',
 *       function (_super) {
 *       }
 *     , function (_super) {
 *       }
 *     );
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteChainableMethod('foo', fn, fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.have.lengthOf(3);
 *     expect(myFoo).to.have.lengthOf.above(3);
 *
 * @param {Object} ctx object whose method / property is to be overwritten
 * @param {String} name of method / property to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @param {Function} chainingBehavior function that returns a function to be used for property
 * @namespace Utils
 * @name overwriteChainableMethod
 * @api public
 */

module.exports = function overwriteChainableMethod(ctx, name, method, chainingBehavior) {
  var chainableBehavior = ctx.__methods[name];

  var _chainingBehavior = chainableBehavior.chainingBehavior;
  chainableBehavior.chainingBehavior = function overwritingChainableMethodGetter() {
    var result = chainingBehavior(_chainingBehavior).call(this);
    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };

  var _method = chainableBehavior.method;
  chainableBehavior.method = function overwritingChainableMethodWrapper() {
    var result = method(_method).apply(this, arguments);
    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/overwriteMethod.js":
/*!*************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/overwriteMethod.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var addLengthGuard = __webpack_require__(/*! ./addLengthGuard */ "./node_modules/chai/lib/chai/utils/addLengthGuard.js");
var chai = __webpack_require__(/*! ../../chai */ "./node_modules/chai/lib/chai.js");
var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");
var proxify = __webpack_require__(/*! ./proxify */ "./node_modules/chai/lib/chai/utils/proxify.js");
var transferFlags = __webpack_require__(/*! ./transferFlags */ "./node_modules/chai/lib/chai/utils/transferFlags.js");

/**
 * ### .overwriteMethod(ctx, name, fn)
 *
 * Overwrites an already existing method and provides
 * access to previous function. Must return function
 * to be used for name.
 *
 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {
 *       return function (str) {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.value).to.equal(str);
 *         } else {
 *           _super.apply(this, arguments);
 *         }
 *       }
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.equal('bar');
 *
 * @param {Object} ctx object whose method is to be overwritten
 * @param {String} name of method to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @namespace Utils
 * @name overwriteMethod
 * @api public
 */

module.exports = function overwriteMethod(ctx, name, method) {
  var _method = ctx[name]
    , _super = function () {
      throw new Error(name + ' is not a function');
    };

  if (_method && 'function' === typeof _method)
    _super = _method;

  var overwritingMethodWrapper = function () {
    // Setting the `ssfi` flag to `overwritingMethodWrapper` causes this
    // function to be the starting point for removing implementation frames from
    // the stack trace of a failed assertion.
    //
    // However, we only want to use this function as the starting point if the
    // `lockSsfi` flag isn't set.
    //
    // If the `lockSsfi` flag is set, then either this assertion has been
    // overwritten by another assertion, or this assertion is being invoked from
    // inside of another assertion. In the first case, the `ssfi` flag has
    // already been set by the overwriting assertion. In the second case, the
    // `ssfi` flag has already been set by the outer assertion.
    if (!flag(this, 'lockSsfi')) {
      flag(this, 'ssfi', overwritingMethodWrapper);
    }

    // Setting the `lockSsfi` flag to `true` prevents the overwritten assertion
    // from changing the `ssfi` flag. By this point, the `ssfi` flag is already
    // set to the correct starting point for this assertion.
    var origLockSsfi = flag(this, 'lockSsfi');
    flag(this, 'lockSsfi', true);
    var result = method(_super).apply(this, arguments);
    flag(this, 'lockSsfi', origLockSsfi);

    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  }

  addLengthGuard(overwritingMethodWrapper, name, false);
  ctx[name] = proxify(overwritingMethodWrapper, name);
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/overwriteProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/overwriteProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var chai = __webpack_require__(/*! ../../chai */ "./node_modules/chai/lib/chai.js");
var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");
var isProxyEnabled = __webpack_require__(/*! ./isProxyEnabled */ "./node_modules/chai/lib/chai/utils/isProxyEnabled.js");
var transferFlags = __webpack_require__(/*! ./transferFlags */ "./node_modules/chai/lib/chai/utils/transferFlags.js");

/**
 * ### .overwriteProperty(ctx, name, fn)
 *
 * Overwrites an already existing property getter and provides
 * access to previous value. Must return function to use as getter.
 *
 *     utils.overwriteProperty(chai.Assertion.prototype, 'ok', function (_super) {
 *       return function () {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.name).to.equal('bar');
 *         } else {
 *           _super.call(this);
 *         }
 *       }
 *     });
 *
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.ok;
 *
 * @param {Object} ctx object whose property is to be overwritten
 * @param {String} name of property to overwrite
 * @param {Function} getter function that returns a getter function to be used for name
 * @namespace Utils
 * @name overwriteProperty
 * @api public
 */

module.exports = function overwriteProperty(ctx, name, getter) {
  var _get = Object.getOwnPropertyDescriptor(ctx, name)
    , _super = function () {};

  if (_get && 'function' === typeof _get.get)
    _super = _get.get

  Object.defineProperty(ctx, name,
    { get: function overwritingPropertyGetter() {
        // Setting the `ssfi` flag to `overwritingPropertyGetter` causes this
        // function to be the starting point for removing implementation frames
        // from the stack trace of a failed assertion.
        //
        // However, we only want to use this function as the starting point if
        // the `lockSsfi` flag isn't set and proxy protection is disabled.
        //
        // If the `lockSsfi` flag is set, then either this assertion has been
        // overwritten by another assertion, or this assertion is being invoked
        // from inside of another assertion. In the first case, the `ssfi` flag
        // has already been set by the overwriting assertion. In the second
        // case, the `ssfi` flag has already been set by the outer assertion.
        //
        // If proxy protection is enabled, then the `ssfi` flag has already been
        // set by the proxy getter.
        if (!isProxyEnabled() && !flag(this, 'lockSsfi')) {
          flag(this, 'ssfi', overwritingPropertyGetter);
        }

        // Setting the `lockSsfi` flag to `true` prevents the overwritten
        // assertion from changing the `ssfi` flag. By this point, the `ssfi`
        // flag is already set to the correct starting point for this assertion.
        var origLockSsfi = flag(this, 'lockSsfi');
        flag(this, 'lockSsfi', true);
        var result = getter(_super).call(this);
        flag(this, 'lockSsfi', origLockSsfi);

        if (result !== undefined) {
          return result;
        }

        var newAssertion = new chai.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }
    , configurable: true
  });
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/proxify.js":
/*!*****************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/proxify.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = __webpack_require__(/*! ../config */ "./node_modules/chai/lib/chai/config.js");
var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");
var getProperties = __webpack_require__(/*! ./getProperties */ "./node_modules/chai/lib/chai/utils/getProperties.js");
var isProxyEnabled = __webpack_require__(/*! ./isProxyEnabled */ "./node_modules/chai/lib/chai/utils/isProxyEnabled.js");

/*!
 * Chai - proxify utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .proxify(object)
 *
 * Return a proxy of given object that throws an error when a non-existent
 * property is read. By default, the root cause is assumed to be a misspelled
 * property, and thus an attempt is made to offer a reasonable suggestion from
 * the list of existing properties. However, if a nonChainableMethodName is
 * provided, then the root cause is instead a failure to invoke a non-chainable
 * method prior to reading the non-existent property.
 *
 * If proxies are unsupported or disabled via the user's Chai config, then
 * return object without modification.
 *
 * @param {Object} obj
 * @param {String} nonChainableMethodName
 * @namespace Utils
 * @name proxify
 */

var builtins = ['__flags', '__methods', '_obj', 'assert'];

module.exports = function proxify(obj, nonChainableMethodName) {
  if (!isProxyEnabled()) return obj;

  return new Proxy(obj, {
    get: function proxyGetter(target, property) {
      // This check is here because we should not throw errors on Symbol properties
      // such as `Symbol.toStringTag`.
      // The values for which an error should be thrown can be configured using
      // the `config.proxyExcludedKeys` setting.
      if (typeof property === 'string' &&
          config.proxyExcludedKeys.indexOf(property) === -1 &&
          !Reflect.has(target, property)) {
        // Special message for invalid property access of non-chainable methods.
        if (nonChainableMethodName) {
          throw Error('Invalid Chai property: ' + nonChainableMethodName + '.' +
            property + '. See docs for proper usage of "' +
            nonChainableMethodName + '".');
        }

        // If the property is reasonably close to an existing Chai property,
        // suggest that property to the user. Only suggest properties with a
        // distance less than 4.
        var suggestion = null;
        var suggestionDistance = 4;
        getProperties(target).forEach(function(prop) {
          if (
            !Object.prototype.hasOwnProperty(prop) &&
            builtins.indexOf(prop) === -1
          ) {
            var dist = stringDistanceCapped(
              property,
              prop,
              suggestionDistance
            );
            if (dist < suggestionDistance) {
              suggestion = prop;
              suggestionDistance = dist;
            }
          }
        });

        if (suggestion !== null) {
          throw Error('Invalid Chai property: ' + property +
            '. Did you mean "' + suggestion + '"?');
        } else {
          throw Error('Invalid Chai property: ' + property);
        }
      }

      // Use this proxy getter as the starting point for removing implementation
      // frames from the stack trace of a failed assertion. For property
      // assertions, this prevents the proxy getter from showing up in the stack
      // trace since it's invoked before the property getter. For method and
      // chainable method assertions, this flag will end up getting changed to
      // the method wrapper, which is good since this frame will no longer be in
      // the stack once the method is invoked. Note that Chai builtin assertion
      // properties such as `__flags` are skipped since this is only meant to
      // capture the starting point of an assertion. This step is also skipped
      // if the `lockSsfi` flag is set, thus indicating that this assertion is
      // being called from within another assertion. In that case, the `ssfi`
      // flag is already set to the outer assertion's starting point.
      if (builtins.indexOf(property) === -1 && !flag(target, 'lockSsfi')) {
        flag(target, 'ssfi', proxyGetter);
      }

      return Reflect.get(target, property);
    }
  });
};

/**
 * # stringDistanceCapped(strA, strB, cap)
 * Return the Levenshtein distance between two strings, but no more than cap.
 * @param {string} strA
 * @param {string} strB
 * @param {number} number
 * @return {number} min(string distance between strA and strB, cap)
 * @api private
 */

function stringDistanceCapped(strA, strB, cap) {
  if (Math.abs(strA.length - strB.length) >= cap) {
    return cap;
  }

  var memo = [];
  // `memo` is a two-dimensional array containing distances.
  // memo[i][j] is the distance between strA.slice(0, i) and
  // strB.slice(0, j).
  for (var i = 0; i <= strA.length; i++) {
    memo[i] = Array(strB.length + 1).fill(0);
    memo[i][0] = i;
  }
  for (var j = 0; j < strB.length; j++) {
    memo[0][j] = j;
  }

  for (var i = 1; i <= strA.length; i++) {
    var ch = strA.charCodeAt(i - 1);
    for (var j = 1; j <= strB.length; j++) {
      if (Math.abs(i - j) >= cap) {
        memo[i][j] = cap;
        continue;
      }
      memo[i][j] = Math.min(
        memo[i - 1][j] + 1,
        memo[i][j - 1] + 1,
        memo[i - 1][j - 1] +
          (ch === strB.charCodeAt(j - 1) ? 0 : 1)
      );
    }
  }

  return memo[strA.length][strB.length];
}


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/test.js":
/*!**************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/test.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var flag = __webpack_require__(/*! ./flag */ "./node_modules/chai/lib/chai/utils/flag.js");

/**
 * ### .test(object, expression)
 *
 * Test and object for expression.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name test
 */

module.exports = function test(obj, args) {
  var negate = flag(obj, 'negate')
    , expr = args[0];
  return negate ? !expr : expr;
};


/***/ }),

/***/ "./node_modules/chai/lib/chai/utils/transferFlags.js":
/*!***********************************************************!*\
  !*** ./node_modules/chai/lib/chai/utils/transferFlags.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .transferFlags(assertion, object, includeAll = true)
 *
 * Transfer all the flags for `assertion` to `object`. If
 * `includeAll` is set to `false`, then the base Chai
 * assertion flags (namely `object`, `ssfi`, `lockSsfi`,
 * and `message`) will not be transferred.
 *
 *
 *     var newAssertion = new Assertion();
 *     utils.transferFlags(assertion, newAssertion);
 *
 *     var anotherAssertion = new Assertion(myObj);
 *     utils.transferFlags(assertion, anotherAssertion, false);
 *
 * @param {Assertion} assertion the assertion to transfer the flags from
 * @param {Object} object the object to transfer the flags to; usually a new assertion
 * @param {Boolean} includeAll
 * @namespace Utils
 * @name transferFlags
 * @api private
 */

module.exports = function transferFlags(assertion, object, includeAll) {
  var flags = assertion.__flags || (assertion.__flags = Object.create(null));

  if (!object.__flags) {
    object.__flags = Object.create(null);
  }

  includeAll = arguments.length === 3 ? includeAll : true;

  for (var flag in flags) {
    if (includeAll ||
        (flag !== 'object' && flag !== 'ssfi' && flag !== 'lockSsfi' && flag != 'message')) {
      object.__flags[flag] = flags[flag];
    }
  }
};


/***/ }),

/***/ "./node_modules/check-error/index.js":
/*!*******************************************!*\
  !*** ./node_modules/check-error/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* !
 * Chai - checkError utility
 * Copyright(c) 2012-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .checkError
 *
 * Checks that an error conforms to a given set of criteria and/or retrieves information about it.
 *
 * @api public
 */

/**
 * ### .compatibleInstance(thrown, errorLike)
 *
 * Checks if two instances are compatible (strict equal).
 * Returns false if errorLike is not an instance of Error, because instances
 * can only be compatible if they're both error instances.
 *
 * @name compatibleInstance
 * @param {Error} thrown error
 * @param {Error|ErrorConstructor} errorLike object to compare against
 * @namespace Utils
 * @api public
 */

function compatibleInstance(thrown, errorLike) {
  return errorLike instanceof Error && thrown === errorLike;
}

/**
 * ### .compatibleConstructor(thrown, errorLike)
 *
 * Checks if two constructors are compatible.
 * This function can receive either an error constructor or
 * an error instance as the `errorLike` argument.
 * Constructors are compatible if they're the same or if one is
 * an instance of another.
 *
 * @name compatibleConstructor
 * @param {Error} thrown error
 * @param {Error|ErrorConstructor} errorLike object to compare against
 * @namespace Utils
 * @api public
 */

function compatibleConstructor(thrown, errorLike) {
  if (errorLike instanceof Error) {
    // If `errorLike` is an instance of any error we compare their constructors
    return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
  } else if (errorLike.prototype instanceof Error || errorLike === Error) {
    // If `errorLike` is a constructor that inherits from Error, we compare `thrown` to `errorLike` directly
    return thrown.constructor === errorLike || thrown instanceof errorLike;
  }

  return false;
}

/**
 * ### .compatibleMessage(thrown, errMatcher)
 *
 * Checks if an error's message is compatible with a matcher (String or RegExp).
 * If the message contains the String or passes the RegExp test,
 * it is considered compatible.
 *
 * @name compatibleMessage
 * @param {Error} thrown error
 * @param {String|RegExp} errMatcher to look for into the message
 * @namespace Utils
 * @api public
 */

function compatibleMessage(thrown, errMatcher) {
  var comparisonString = typeof thrown === 'string' ? thrown : thrown.message;
  if (errMatcher instanceof RegExp) {
    return errMatcher.test(comparisonString);
  } else if (typeof errMatcher === 'string') {
    return comparisonString.indexOf(errMatcher) !== -1; // eslint-disable-line no-magic-numbers
  }

  return false;
}

/**
 * ### .getFunctionName(constructorFn)
 *
 * Returns the name of a function.
 * This also includes a polyfill function if `constructorFn.name` is not defined.
 *
 * @name getFunctionName
 * @param {Function} constructorFn
 * @namespace Utils
 * @api private
 */

var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;
function getFunctionName(constructorFn) {
  var name = '';
  if (typeof constructorFn.name === 'undefined') {
    // Here we run a polyfill if constructorFn.name is not defined
    var match = String(constructorFn).match(functionNameMatch);
    if (match) {
      name = match[1];
    }
  } else {
    name = constructorFn.name;
  }

  return name;
}

/**
 * ### .getConstructorName(errorLike)
 *
 * Gets the constructor name for an Error instance or constructor itself.
 *
 * @name getConstructorName
 * @param {Error|ErrorConstructor} errorLike
 * @namespace Utils
 * @api public
 */

function getConstructorName(errorLike) {
  var constructorName = errorLike;
  if (errorLike instanceof Error) {
    constructorName = getFunctionName(errorLike.constructor);
  } else if (typeof errorLike === 'function') {
    // If `err` is not an instance of Error it is an error constructor itself or another function.
    // If we've got a common function we get its name, otherwise we may need to create a new instance
    // of the error just in case it's a poorly-constructed error. Please see chaijs/chai/issues/45 to know more.
    constructorName = getFunctionName(errorLike).trim() ||
        getFunctionName(new errorLike()); // eslint-disable-line new-cap
  }

  return constructorName;
}

/**
 * ### .getMessage(errorLike)
 *
 * Gets the error message from an error.
 * If `err` is a String itself, we return it.
 * If the error has no message, we return an empty string.
 *
 * @name getMessage
 * @param {Error|String} errorLike
 * @namespace Utils
 * @api public
 */

function getMessage(errorLike) {
  var msg = '';
  if (errorLike && errorLike.message) {
    msg = errorLike.message;
  } else if (typeof errorLike === 'string') {
    msg = errorLike;
  }

  return msg;
}

module.exports = {
  compatibleInstance: compatibleInstance,
  compatibleConstructor: compatibleConstructor,
  compatibleMessage: compatibleMessage,
  getMessage: getMessage,
  getConstructorName: getConstructorName,
};


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/mocha/mocha.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/mocha/mocha.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@charset \"utf-8\";\n\nbody {\n  margin:0;\n}\n\n#mocha {\n  font: 20px/1.5 \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  margin: 60px 50px;\n}\n\n#mocha ul,\n#mocha li {\n  margin: 0;\n  padding: 0;\n}\n\n#mocha ul {\n  list-style: none;\n}\n\n#mocha h1,\n#mocha h2 {\n  margin: 0;\n}\n\n#mocha h1 {\n  margin-top: 15px;\n  font-size: 1em;\n  font-weight: 200;\n}\n\n#mocha h1 a {\n  text-decoration: none;\n  color: inherit;\n}\n\n#mocha h1 a:hover {\n  text-decoration: underline;\n}\n\n#mocha .suite .suite h1 {\n  margin-top: 0;\n  font-size: .8em;\n}\n\n#mocha .hidden {\n  display: none;\n}\n\n#mocha h2 {\n  font-size: 12px;\n  font-weight: normal;\n  cursor: pointer;\n}\n\n#mocha .suite {\n  margin-left: 15px;\n}\n\n#mocha .test {\n  margin-left: 15px;\n  overflow: hidden;\n}\n\n#mocha .test.pending:hover h2::after {\n  content: '(pending)';\n  font-family: arial, sans-serif;\n}\n\n#mocha .test.pass.medium .duration {\n  background: #c09853;\n}\n\n#mocha .test.pass.slow .duration {\n  background: #b94a48;\n}\n\n#mocha .test.pass::before {\n  content: '\\2713';\n  font-size: 12px;\n  display: block;\n  float: left;\n  margin-right: 5px;\n  color: #00d6b2;\n}\n\n#mocha .test.pass .duration {\n  font-size: 9px;\n  margin-left: 5px;\n  padding: 2px 5px;\n  color: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.2);\n  -moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.2);\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.2);\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  -o-border-radius: 5px;\n  border-radius: 5px;\n}\n\n#mocha .test.pass.fast .duration {\n  display: none;\n}\n\n#mocha .test.pending {\n  color: #0b97c4;\n}\n\n#mocha .test.pending::before {\n  content: '\\25E6';\n  color: #0b97c4;\n}\n\n#mocha .test.fail {\n  color: #c00;\n}\n\n#mocha .test.fail pre {\n  color: black;\n}\n\n#mocha .test.fail::before {\n  content: '\\2716';\n  font-size: 12px;\n  display: block;\n  float: left;\n  margin-right: 5px;\n  color: #c00;\n}\n\n#mocha .test pre.error {\n  color: #c00;\n  max-height: 300px;\n  overflow: auto;\n}\n\n#mocha .test .html-error {\n  overflow: auto;\n  color: black;\n  line-height: 1.5;\n  display: block;\n  float: left;\n  clear: left;\n  font: 12px/1.5 monaco, monospace;\n  margin: 5px;\n  padding: 15px;\n  border: 1px solid #eee;\n  max-width: 85%; /*(1)*/\n  max-width: -webkit-calc(100% - 42px);\n  max-width: -moz-calc(100% - 42px);\n  max-width: calc(100% - 42px); /*(2)*/\n  max-height: 300px;\n  word-wrap: break-word;\n  border-bottom-color: #ddd;\n  -webkit-box-shadow: 0 1px 3px #eee;\n  -moz-box-shadow: 0 1px 3px #eee;\n  box-shadow: 0 1px 3px #eee;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n}\n\n#mocha .test .html-error pre.error {\n  border: none;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0;\n  -webkit-box-shadow: 0;\n  -moz-box-shadow: 0;\n  box-shadow: 0;\n  padding: 0;\n  margin: 0;\n  margin-top: 18px;\n  max-height: none;\n}\n\n/**\n * (1): approximate for browsers not supporting calc\n * (2): 42 = 2*15 + 2*10 + 2*1 (padding + margin + border)\n *      ^^ seriously\n */\n#mocha .test pre {\n  display: block;\n  float: left;\n  clear: left;\n  font: 12px/1.5 monaco, monospace;\n  margin: 5px;\n  padding: 15px;\n  border: 1px solid #eee;\n  max-width: 85%; /*(1)*/\n  max-width: -webkit-calc(100% - 42px);\n  max-width: -moz-calc(100% - 42px);\n  max-width: calc(100% - 42px); /*(2)*/\n  word-wrap: break-word;\n  border-bottom-color: #ddd;\n  -webkit-box-shadow: 0 1px 3px #eee;\n  -moz-box-shadow: 0 1px 3px #eee;\n  box-shadow: 0 1px 3px #eee;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n}\n\n#mocha .test h2 {\n  position: relative;\n}\n\n#mocha .test a.replay {\n  position: absolute;\n  top: 3px;\n  right: 0;\n  text-decoration: none;\n  vertical-align: middle;\n  display: block;\n  width: 15px;\n  height: 15px;\n  line-height: 15px;\n  text-align: center;\n  background: #eee;\n  font-size: 15px;\n  -webkit-border-radius: 15px;\n  -moz-border-radius: 15px;\n  border-radius: 15px;\n  -webkit-transition:opacity 200ms;\n  -moz-transition:opacity 200ms;\n  -o-transition:opacity 200ms;\n  transition: opacity 200ms;\n  opacity: 0.3;\n  color: #888;\n}\n\n#mocha .test:hover a.replay {\n  opacity: 1;\n}\n\n#mocha-report.pass .test.fail {\n  display: none;\n}\n\n#mocha-report.fail .test.pass {\n  display: none;\n}\n\n#mocha-report.pending .test.pass,\n#mocha-report.pending .test.fail {\n  display: none;\n}\n#mocha-report.pending .test.pass.pending {\n  display: block;\n}\n\n#mocha-error {\n  color: #c00;\n  font-size: 1.5em;\n  font-weight: 100;\n  letter-spacing: 1px;\n}\n\n#mocha-stats {\n  position: fixed;\n  top: 15px;\n  right: 10px;\n  font-size: 12px;\n  margin: 0;\n  color: #888;\n  z-index: 1;\n}\n\n#mocha-stats .progress {\n  float: right;\n  padding-top: 0;\n\n  /**\n   * Set safe initial values, so mochas .progress does not inherit these\n   * properties from Bootstrap .progress (which causes .progress height to\n   * equal line height set in Bootstrap).\n   */\n  height: auto;\n  -webkit-box-shadow: none;\n  -moz-box-shadow: none;\n  box-shadow: none;\n  background-color: initial;\n}\n\n#mocha-stats em {\n  color: black;\n}\n\n#mocha-stats a {\n  text-decoration: none;\n  color: inherit;\n}\n\n#mocha-stats a:hover {\n  border-bottom: 1px solid #eee;\n}\n\n#mocha-stats li {\n  display: inline-block;\n  margin: 0 5px;\n  list-style: none;\n  padding-top: 11px;\n}\n\n#mocha-stats canvas {\n  width: 40px;\n  height: 40px;\n}\n\n#mocha code .comment { color: #ddd; }\n#mocha code .init { color: #2f6fad; }\n#mocha code .string { color: #5890ad; }\n#mocha code .keyword { color: #8a6343; }\n#mocha code .number { color: #2f6fad; }\n\n@media screen and (max-device-width: 480px) {\n  #mocha {\n    margin: 60px 0px;\n  }\n\n  #mocha #stats {\n    position: absolute;\n  }\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/deep-eql/index.js":
/*!****************************************!*\
  !*** ./node_modules/deep-eql/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* globals Symbol: false, Uint8Array: false, WeakMap: false */
/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var type = __webpack_require__(/*! type-detect */ "./node_modules/type-detect/type-detect.js");
function FakeMap() {
  this._key = 'chai/deep-eql__' + Math.random() + Date.now();
}

FakeMap.prototype = {
  get: function getMap(key) {
    return key[this._key];
  },
  set: function setMap(key, value) {
    if (Object.isExtensible(key)) {
      Object.defineProperty(key, this._key, {
        value: value,
        configurable: true,
      });
    }
  },
};

var MemoizeMap = typeof WeakMap === 'function' ? WeakMap : FakeMap;
/*!
 * Check to see if the MemoizeMap has recorded a result of the two operands
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @returns {Boolean|null} result
*/
function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return null;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    var result = leftHandMap.get(rightHandOperand);
    if (typeof result === 'boolean') {
      return result;
    }
  }
  return null;
}

/*!
 * Set the result of the equality into the MemoizeMap
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @param {Boolean} result
*/
function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    leftHandMap.set(rightHandOperand, result);
  } else {
    leftHandMap = new MemoizeMap();
    leftHandMap.set(rightHandOperand, result);
    memoizeMap.set(leftHandOperand, leftHandMap);
  }
}

/*!
 * Primary Export
 */

module.exports = deepEqual;
module.exports.MemoizeMap = MemoizeMap;

/**
 * Assert deeply nested sameValue equality between two objects of any type.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
 */
function deepEqual(leftHandOperand, rightHandOperand, options) {
  // If we have a comparator, we can't assume anything; so bail to its check first.
  if (options && options.comparator) {
    return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
  }

  var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
  if (simpleResult !== null) {
    return simpleResult;
  }

  // Deeper comparisons are pushed through to a larger function
  return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}

/**
 * Many comparisons can be canceled out early via simple equality or primitive checks.
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @return {Boolean|null} equal match
 */
function simpleEqual(leftHandOperand, rightHandOperand) {
  // Equal references (except for Numbers) can be returned early
  if (leftHandOperand === rightHandOperand) {
    // Handle +-0 cases
    return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
  }

  // handle NaN cases
  if (
    leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
    rightHandOperand !== rightHandOperand // eslint-disable-line no-self-compare
  ) {
    return true;
  }

  // Anything that is not an 'object', i.e. symbols, functions, booleans, numbers,
  // strings, and undefined, can be compared by reference.
  if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    // Easy out b/c it would have passed the first equality check
    return false;
  }
  return null;
}

/*!
 * The main logic of the `deepEqual` function.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
*/
function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
  options = options || {};
  options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
  var comparator = options && options.comparator;

  // Check if a memoized result exists.
  var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
  if (memoizeResultLeft !== null) {
    return memoizeResultLeft;
  }
  var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
  if (memoizeResultRight !== null) {
    return memoizeResultRight;
  }

  // If a comparator is present, use it.
  if (comparator) {
    var comparatorResult = comparator(leftHandOperand, rightHandOperand);
    // Comparators may return null, in which case we want to go back to default behavior.
    if (comparatorResult === false || comparatorResult === true) {
      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
      return comparatorResult;
    }
    // To allow comparators to override *any* behavior, we ran them first. Since it didn't decide
    // what to do, we need to make sure to return the basic tests first before we move on.
    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
    if (simpleResult !== null) {
      // Don't memoize this, it takes longer to set/retrieve than to just compare.
      return simpleResult;
    }
  }

  var leftHandType = type(leftHandOperand);
  if (leftHandType !== type(rightHandOperand)) {
    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
    return false;
  }

  // Temporarily set the operands in the memoize object to prevent blowing the stack
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);

  var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
  return result;
}

function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
  switch (leftHandType) {
    case 'String':
    case 'Number':
    case 'Boolean':
    case 'Date':
      // If these types are their instance types (e.g. `new Number`) then re-deepEqual against their values
      return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
    case 'Promise':
    case 'Symbol':
    case 'function':
    case 'WeakMap':
    case 'WeakSet':
    case 'Error':
      return leftHandOperand === rightHandOperand;
    case 'Arguments':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'Array':
      return iterableEqual(leftHandOperand, rightHandOperand, options);
    case 'RegExp':
      return regexpEqual(leftHandOperand, rightHandOperand);
    case 'Generator':
      return generatorEqual(leftHandOperand, rightHandOperand, options);
    case 'DataView':
      return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
    case 'ArrayBuffer':
      return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
    case 'Set':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    case 'Map':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    default:
      return objectEqual(leftHandOperand, rightHandOperand, options);
  }
}

/*!
 * Compare two Regular Expressions for equality.
 *
 * @param {RegExp} leftHandOperand
 * @param {RegExp} rightHandOperand
 * @return {Boolean} result
 */

function regexpEqual(leftHandOperand, rightHandOperand) {
  return leftHandOperand.toString() === rightHandOperand.toString();
}

/*!
 * Compare two Sets/Maps for equality. Faster than other equality functions.
 *
 * @param {Set} leftHandOperand
 * @param {Set} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function entriesEqual(leftHandOperand, rightHandOperand, options) {
  // IE11 doesn't support Set#entries or Set#@@iterator, so we need manually populate using Set#forEach
  if (leftHandOperand.size !== rightHandOperand.size) {
    return false;
  }
  if (leftHandOperand.size === 0) {
    return true;
  }
  var leftHandItems = [];
  var rightHandItems = [];
  leftHandOperand.forEach(function gatherEntries(key, value) {
    leftHandItems.push([ key, value ]);
  });
  rightHandOperand.forEach(function gatherEntries(key, value) {
    rightHandItems.push([ key, value ]);
  });
  return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
}

/*!
 * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function iterableEqual(leftHandOperand, rightHandOperand, options) {
  var length = leftHandOperand.length;
  if (length !== rightHandOperand.length) {
    return false;
  }
  if (length === 0) {
    return true;
  }
  var index = -1;
  while (++index < length) {
    if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Simple equality for generator objects such as those returned by generator functions.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function generatorEqual(leftHandOperand, rightHandOperand, options) {
  return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
}

/*!
 * Determine if the given object has an @@iterator function.
 *
 * @param {Object} target
 * @return {Boolean} `true` if the object has an @@iterator function.
 */
function hasIteratorFunction(target) {
  return typeof Symbol !== 'undefined' &&
    typeof target === 'object' &&
    typeof Symbol.iterator !== 'undefined' &&
    typeof target[Symbol.iterator] === 'function';
}

/*!
 * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
 * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
 *
 * @param {Object} target
 * @returns {Array} an array of entries from the @@iterator function
 */
function getIteratorEntries(target) {
  if (hasIteratorFunction(target)) {
    try {
      return getGeneratorEntries(target[Symbol.iterator]());
    } catch (iteratorError) {
      return [];
    }
  }
  return [];
}

/*!
 * Gets all entries from a Generator. This will consume the generator - which could have side effects.
 *
 * @param {Generator} target
 * @returns {Array} an array of entries from the Generator.
 */
function getGeneratorEntries(generator) {
  var generatorResult = generator.next();
  var accumulator = [ generatorResult.value ];
  while (generatorResult.done === false) {
    generatorResult = generator.next();
    accumulator.push(generatorResult.value);
  }
  return accumulator;
}

/*!
 * Gets all own and inherited enumerable keys from a target.
 *
 * @param {Object} target
 * @returns {Array} an array of own and inherited enumerable keys from the target.
 */
function getEnumerableKeys(target) {
  var keys = [];
  for (var key in target) {
    keys.push(key);
  }
  return keys;
}

/*!
 * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
 * each key. If any value of the given key is not equal, the function will return false (early).
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */
function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
  var length = keys.length;
  if (length === 0) {
    return true;
  }
  for (var i = 0; i < length; i += 1) {
    if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
 * for each enumerable key in the object.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function objectEqual(leftHandOperand, rightHandOperand, options) {
  var leftHandKeys = getEnumerableKeys(leftHandOperand);
  var rightHandKeys = getEnumerableKeys(rightHandOperand);
  if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
    leftHandKeys.sort();
    rightHandKeys.sort();
    if (iterableEqual(leftHandKeys, rightHandKeys) === false) {
      return false;
    }
    return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
  }

  var leftHandEntries = getIteratorEntries(leftHandOperand);
  var rightHandEntries = getIteratorEntries(rightHandOperand);
  if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
    leftHandEntries.sort();
    rightHandEntries.sort();
    return iterableEqual(leftHandEntries, rightHandEntries, options);
  }

  if (leftHandKeys.length === 0 &&
      leftHandEntries.length === 0 &&
      rightHandKeys.length === 0 &&
      rightHandEntries.length === 0) {
    return true;
  }

  return false;
}

/*!
 * Returns true if the argument is a primitive.
 *
 * This intentionally returns true for all objects that can be compared by reference,
 * including functions and symbols.
 *
 * @param {Mixed} value
 * @return {Boolean} result
 */
function isPrimitive(value) {
  return value === null || typeof value !== 'object';
}


/***/ }),

/***/ "./node_modules/get-func-name/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-func-name/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* !
 * Chai - getFuncName utility
 * Copyright(c) 2012-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getFuncName(constructorFn)
 *
 * Returns the name of a function.
 * When a non-function instance is passed, returns `null`.
 * This also includes a polyfill function if `aFunc.name` is not defined.
 *
 * @name getFuncName
 * @param {Function} funct
 * @namespace Utils
 * @api public
 */

var toString = Function.prototype.toString;
var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
function getFuncName(aFunc) {
  if (typeof aFunc !== 'function') {
    return null;
  }

  var name = '';
  if (typeof Function.prototype.name === 'undefined' && typeof aFunc.name === 'undefined') {
    // Here we run a polyfill if Function does not support the `name` property and if aFunc.name is not defined
    var match = toString.call(aFunc).match(functionNameMatch);
    if (match) {
      name = match[1];
    }
  } else {
    // If we've got a `name` property we just use it
    name = aFunc.name;
  }

  return name;
}

module.exports = getFuncName;


/***/ }),

/***/ "./node_modules/mocha-loader/node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/mocha/mocha.css":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/mocha-loader/node_modules/style-loader!./node_modules/css-loader!./node_modules/mocha/mocha.css ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../css-loader!./mocha.css */ "./node_modules/css-loader/index.js!./node_modules/mocha/mocha.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../mocha-loader/node_modules/style-loader/lib/addStyles.js */ "./node_modules/mocha-loader/node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/mocha-loader/node_modules/style-loader/lib/addStyles.js":
/*!******************************************************************************!*\
  !*** ./node_modules/mocha-loader/node_modules/style-loader/lib/addStyles.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/mocha-loader/node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/mocha-loader/node_modules/style-loader/lib/urls.js":
/*!*************************************************************************!*\
  !*** ./node_modules/mocha-loader/node_modules/style-loader/lib/urls.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/mocha-loader/src/index.js!./test/index-test.js":
/*!************************************************************!*\
  !*** ./node_modules/mocha-loader/src!./test/index-test.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! !./node_modules/mocha-loader/src/web.js */ "./node_modules/mocha-loader/src/web.js");
if(typeof window !== 'undefined' && window.initMochaPhantomJS) { window.initMochaPhantomJS(); }
mocha.setup({"ui":"bdd"});
__webpack_require__(/*! !./node_modules/babel-loader/lib!./test/index-test.js */ "./node_modules/babel-loader/lib/index.js!./test/index-test.js")
__webpack_require__(/*! !./node_modules/mocha-loader/src/start.js */ "./node_modules/mocha-loader/src/start.js");
if(false) {}

/***/ }),

/***/ "./node_modules/mocha-loader/src/start.js":
/*!************************************************!*\
  !*** ./node_modules/mocha-loader/src/start.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* globals mochaPhantomJS: true, window: true */
// eslint-disable-next-line prefer-arrow-callback
process.nextTick(function tick() {
  delete __webpack_require__.c[module.i];
  if (typeof window !== 'undefined' && window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/mocha-loader/src/web.js":
/*!**********************************************!*\
  !*** ./node_modules/mocha-loader/src/web.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals document: true */
/* eslint import/no-unresolved: off, import/no-webpack-loader-syntax: off  */
if (!document.getElementById('mocha')) {
  document.write('<div id="mocha"></div>');
}

__webpack_require__(/*! style-loader!css-loader!mocha/mocha.css */ "./node_modules/mocha-loader/node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/mocha/mocha.css");
__webpack_require__(/*! script-loader!mocha/mocha.js */ "./node_modules/script-loader/index.js!./node_modules/mocha/mocha.js");


/***/ }),

/***/ "./node_modules/pathval/index.js":
/*!***************************************!*\
  !*** ./node_modules/pathval/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* !
 * Chai - pathval utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * @see https://github.com/logicalparadox/filtr
 * MIT Licensed
 */

/**
 * ### .hasProperty(object, name)
 *
 * This allows checking whether an object has own
 * or inherited from prototype chain named property.
 *
 * Basically does the same thing as the `in`
 * operator but works properly with null/undefined values
 * and other primitives.
 *
 *     var obj = {
 *         arr: ['a', 'b', 'c']
 *       , str: 'Hello'
 *     }
 *
 * The following would be the results.
 *
 *     hasProperty(obj, 'str');  // true
 *     hasProperty(obj, 'constructor');  // true
 *     hasProperty(obj, 'bar');  // false
 *
 *     hasProperty(obj.str, 'length'); // true
 *     hasProperty(obj.str, 1);  // true
 *     hasProperty(obj.str, 5);  // false
 *
 *     hasProperty(obj.arr, 'length');  // true
 *     hasProperty(obj.arr, 2);  // true
 *     hasProperty(obj.arr, 3);  // false
 *
 * @param {Object} object
 * @param {String|Symbol} name
 * @returns {Boolean} whether it exists
 * @namespace Utils
 * @name hasProperty
 * @api public
 */

function hasProperty(obj, name) {
  if (typeof obj === 'undefined' || obj === null) {
    return false;
  }

  // The `in` operator does not work with primitives.
  return name in Object(obj);
}

/* !
 * ## parsePath(path)
 *
 * Helper function used to parse string object
 * paths. Use in conjunction with `internalGetPathValue`.
 *
 *      var parsed = parsePath('myobject.property.subprop');
 *
 * ### Paths:
 *
 * * Can be infinitely deep and nested.
 * * Arrays are also valid using the formal `myobject.document[3].property`.
 * * Literal dots and brackets (not delimiter) must be backslash-escaped.
 *
 * @param {String} path
 * @returns {Object} parsed
 * @api private
 */

function parsePath(path) {
  var str = path.replace(/([^\\])\[/g, '$1.[');
  var parts = str.match(/(\\\.|[^.]+?)+/g);
  return parts.map(function mapMatches(value) {
    var regexp = /^\[(\d+)\]$/;
    var mArr = regexp.exec(value);
    var parsed = null;
    if (mArr) {
      parsed = { i: parseFloat(mArr[1]) };
    } else {
      parsed = { p: value.replace(/\\([.\[\]])/g, '$1') };
    }

    return parsed;
  });
}

/* !
 * ## internalGetPathValue(obj, parsed[, pathDepth])
 *
 * Helper companion function for `.parsePath` that returns
 * the value located at the parsed address.
 *
 *      var value = getPathValue(obj, parsed);
 *
 * @param {Object} object to search against
 * @param {Object} parsed definition from `parsePath`.
 * @param {Number} depth (nesting level) of the property we want to retrieve
 * @returns {Object|Undefined} value
 * @api private
 */

function internalGetPathValue(obj, parsed, pathDepth) {
  var temporaryValue = obj;
  var res = null;
  pathDepth = (typeof pathDepth === 'undefined' ? parsed.length : pathDepth);

  for (var i = 0; i < pathDepth; i++) {
    var part = parsed[i];
    if (temporaryValue) {
      if (typeof part.p === 'undefined') {
        temporaryValue = temporaryValue[part.i];
      } else {
        temporaryValue = temporaryValue[part.p];
      }

      if (i === (pathDepth - 1)) {
        res = temporaryValue;
      }
    }
  }

  return res;
}

/* !
 * ## internalSetPathValue(obj, value, parsed)
 *
 * Companion function for `parsePath` that sets
 * the value located at a parsed address.
 *
 *  internalSetPathValue(obj, 'value', parsed);
 *
 * @param {Object} object to search and define on
 * @param {*} value to use upon set
 * @param {Object} parsed definition from `parsePath`
 * @api private
 */

function internalSetPathValue(obj, val, parsed) {
  var tempObj = obj;
  var pathDepth = parsed.length;
  var part = null;
  // Here we iterate through every part of the path
  for (var i = 0; i < pathDepth; i++) {
    var propName = null;
    var propVal = null;
    part = parsed[i];

    // If it's the last part of the path, we set the 'propName' value with the property name
    if (i === (pathDepth - 1)) {
      propName = typeof part.p === 'undefined' ? part.i : part.p;
      // Now we set the property with the name held by 'propName' on object with the desired val
      tempObj[propName] = val;
    } else if (typeof part.p !== 'undefined' && tempObj[part.p]) {
      tempObj = tempObj[part.p];
    } else if (typeof part.i !== 'undefined' && tempObj[part.i]) {
      tempObj = tempObj[part.i];
    } else {
      // If the obj doesn't have the property we create one with that name to define it
      var next = parsed[i + 1];
      // Here we set the name of the property which will be defined
      propName = typeof part.p === 'undefined' ? part.i : part.p;
      // Here we decide if this property will be an array or a new object
      propVal = typeof next.p === 'undefined' ? [] : {};
      tempObj[propName] = propVal;
      tempObj = tempObj[propName];
    }
  }
}

/**
 * ### .getPathInfo(object, path)
 *
 * This allows the retrieval of property info in an
 * object given a string path.
 *
 * The path info consists of an object with the
 * following properties:
 *
 * * parent - The parent object of the property referenced by `path`
 * * name - The name of the final property, a number if it was an array indexer
 * * value - The value of the property, if it exists, otherwise `undefined`
 * * exists - Whether the property exists or not
 *
 * @param {Object} object
 * @param {String} path
 * @returns {Object} info
 * @namespace Utils
 * @name getPathInfo
 * @api public
 */

function getPathInfo(obj, path) {
  var parsed = parsePath(path);
  var last = parsed[parsed.length - 1];
  var info = {
    parent: parsed.length > 1 ? internalGetPathValue(obj, parsed, parsed.length - 1) : obj,
    name: last.p || last.i,
    value: internalGetPathValue(obj, parsed),
  };
  info.exists = hasProperty(info.parent, info.name);

  return info;
}

/**
 * ### .getPathValue(object, path)
 *
 * This allows the retrieval of values in an
 * object given a string path.
 *
 *     var obj = {
 *         prop1: {
 *             arr: ['a', 'b', 'c']
 *           , str: 'Hello'
 *         }
 *       , prop2: {
 *             arr: [ { nested: 'Universe' } ]
 *           , str: 'Hello again!'
 *         }
 *     }
 *
 * The following would be the results.
 *
 *     getPathValue(obj, 'prop1.str'); // Hello
 *     getPathValue(obj, 'prop1.att[2]'); // b
 *     getPathValue(obj, 'prop2.arr[0].nested'); // Universe
 *
 * @param {Object} object
 * @param {String} path
 * @returns {Object} value or `undefined`
 * @namespace Utils
 * @name getPathValue
 * @api public
 */

function getPathValue(obj, path) {
  var info = getPathInfo(obj, path);
  return info.value;
}

/**
 * ### .setPathValue(object, path, value)
 *
 * Define the value in an object at a given string path.
 *
 * ```js
 * var obj = {
 *     prop1: {
 *         arr: ['a', 'b', 'c']
 *       , str: 'Hello'
 *     }
 *   , prop2: {
 *         arr: [ { nested: 'Universe' } ]
 *       , str: 'Hello again!'
 *     }
 * };
 * ```
 *
 * The following would be acceptable.
 *
 * ```js
 * var properties = require('tea-properties');
 * properties.set(obj, 'prop1.str', 'Hello Universe!');
 * properties.set(obj, 'prop1.arr[2]', 'B');
 * properties.set(obj, 'prop2.arr[0].nested.value', { hello: 'universe' });
 * ```
 *
 * @param {Object} object
 * @param {String} path
 * @param {Mixed} value
 * @api private
 */

function setPathValue(obj, path, val) {
  var parsed = parsePath(path);
  internalSetPathValue(obj, val, parsed);
  return obj;
}

module.exports = {
  hasProperty: hasProperty,
  getPathInfo: getPathInfo,
  getPathValue: getPathValue,
  setPathValue: setPathValue,
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./node_modules/mocha/mocha.js":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./node_modules/mocha/mocha.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c=\"function\"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error(\"Cannot find module '\"+i+\"'\");throw a.code=\"MODULE_NOT_FOUND\",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u=\"function\"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){\n(function (process,global){\n'use strict';\n\n/* eslint no-unused-vars: off */\n/* eslint-env commonjs */\n\n/**\n * Shim process.stdout.\n */\n\nprocess.stdout = require('browser-stdout')({level: false});\n\nvar Mocha = require('./lib/mocha');\n\n/**\n * Create a Mocha instance.\n *\n * @return {undefined}\n */\n\nvar mocha = new Mocha({reporter: 'html'});\n\n/**\n * Save timer references to avoid Sinon interfering (see GH-237).\n */\n\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n\nvar uncaughtExceptionHandlers = [];\n\nvar originalOnerrorHandler = global.onerror;\n\n/**\n * Remove uncaughtException listener.\n * Revert to original onerror handler if previously defined.\n */\n\nprocess.removeListener = function(e, fn) {\n  if (e === 'uncaughtException') {\n    if (originalOnerrorHandler) {\n      global.onerror = originalOnerrorHandler;\n    } else {\n      global.onerror = function() {};\n    }\n    var i = uncaughtExceptionHandlers.indexOf(fn);\n    if (i !== -1) {\n      uncaughtExceptionHandlers.splice(i, 1);\n    }\n  }\n};\n\n/**\n * Implements uncaughtException listener.\n */\n\nprocess.on = function(e, fn) {\n  if (e === 'uncaughtException') {\n    global.onerror = function(err, url, line) {\n      fn(new Error(err + ' (' + url + ':' + line + ')'));\n      return !mocha.allowUncaught;\n    };\n    uncaughtExceptionHandlers.push(fn);\n  }\n};\n\n// The BDD UI is registered by default, but no UI will be functional in the\n// browser without an explicit call to the overridden `mocha.ui` (see below).\n// Ensure that this default UI does not expose its methods to the global scope.\nmocha.suite.removeAllListeners('pre-require');\n\nvar immediateQueue = [];\nvar immediateTimeout;\n\nfunction timeslice() {\n  var immediateStart = new Date().getTime();\n  while (immediateQueue.length && new Date().getTime() - immediateStart < 100) {\n    immediateQueue.shift()();\n  }\n  if (immediateQueue.length) {\n    immediateTimeout = setTimeout(timeslice, 0);\n  } else {\n    immediateTimeout = null;\n  }\n}\n\n/**\n * High-performance override of Runner.immediately.\n */\n\nMocha.Runner.immediately = function(callback) {\n  immediateQueue.push(callback);\n  if (!immediateTimeout) {\n    immediateTimeout = setTimeout(timeslice, 0);\n  }\n};\n\n/**\n * Function to allow assertion libraries to throw errors directly into mocha.\n * This is useful when running tests in a browser because window.onerror will\n * only receive the 'message' attribute of the Error.\n */\nmocha.throwError = function(err) {\n  uncaughtExceptionHandlers.forEach(function(fn) {\n    fn(err);\n  });\n  throw err;\n};\n\n/**\n * Override ui to ensure that the ui functions are initialized.\n * Normally this would happen in Mocha.prototype.loadFiles.\n */\n\nmocha.ui = function(ui) {\n  Mocha.prototype.ui.call(this, ui);\n  this.suite.emit('pre-require', global, null, this);\n  return this;\n};\n\n/**\n * Setup mocha with the given setting options.\n */\n\nmocha.setup = function(opts) {\n  if (typeof opts === 'string') {\n    opts = {ui: opts};\n  }\n  for (var opt in opts) {\n    if (opts.hasOwnProperty(opt)) {\n      this[opt](opts[opt]);\n    }\n  }\n  return this;\n};\n\n/**\n * Run mocha, returning the Runner.\n */\n\nmocha.run = function(fn) {\n  var options = mocha.options;\n  mocha.globals('location');\n\n  var query = Mocha.utils.parseQuery(global.location.search || '');\n  if (query.grep) {\n    mocha.grep(query.grep);\n  }\n  if (query.fgrep) {\n    mocha.fgrep(query.fgrep);\n  }\n  if (query.invert) {\n    mocha.invert();\n  }\n\n  return Mocha.prototype.run.call(mocha, function(err) {\n    // The DOM Document is not available in Web Workers.\n    var document = global.document;\n    if (\n      document &&\n      document.getElementById('mocha') &&\n      options.noHighlighting !== true\n    ) {\n      Mocha.utils.highlightTags('code');\n    }\n    if (fn) {\n      fn(err);\n    }\n  });\n};\n\n/**\n * Expose the process shim.\n * https://github.com/mochajs/mocha/pull/916\n */\n\nMocha.process = process;\n\n/**\n * Expose mocha.\n */\n\nglobal.Mocha = Mocha;\nglobal.mocha = mocha;\n\n// this allows test/acceptance/required-tokens.js to pass; thus,\n// you can now do `const describe = require('mocha').describe` in a\n// browser context (assuming browserification).  should fix #880\nmodule.exports = global;\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"./lib/mocha\":13,\"_process\":56,\"browser-stdout\":39}],2:[function(require,module,exports){\n'use strict';\n\n// just stub out growl\n\nmodule.exports = require('../utils').noop;\n\n},{\"../utils\":36}],3:[function(require,module,exports){\n'use strict';\n\n/**\n * Expose `Progress`.\n */\n\nmodule.exports = Progress;\n\n/**\n * Initialize a new `Progress` indicator.\n */\nfunction Progress() {\n  this.percent = 0;\n  this.size(0);\n  this.fontSize(11);\n  this.font('helvetica, arial, sans-serif');\n}\n\n/**\n * Set progress size to `size`.\n *\n * @api public\n * @param {number} size\n * @return {Progress} Progress instance.\n */\nProgress.prototype.size = function(size) {\n  this._size = size;\n  return this;\n};\n\n/**\n * Set text to `text`.\n *\n * @api public\n * @param {string} text\n * @return {Progress} Progress instance.\n */\nProgress.prototype.text = function(text) {\n  this._text = text;\n  return this;\n};\n\n/**\n * Set font size to `size`.\n *\n * @api public\n * @param {number} size\n * @return {Progress} Progress instance.\n */\nProgress.prototype.fontSize = function(size) {\n  this._fontSize = size;\n  return this;\n};\n\n/**\n * Set font to `family`.\n *\n * @param {string} family\n * @return {Progress} Progress instance.\n */\nProgress.prototype.font = function(family) {\n  this._font = family;\n  return this;\n};\n\n/**\n * Update percentage to `n`.\n *\n * @param {number} n\n * @return {Progress} Progress instance.\n */\nProgress.prototype.update = function(n) {\n  this.percent = n;\n  return this;\n};\n\n/**\n * Draw on `ctx`.\n *\n * @param {CanvasRenderingContext2d} ctx\n * @return {Progress} Progress instance.\n */\nProgress.prototype.draw = function(ctx) {\n  try {\n    var percent = Math.min(this.percent, 100);\n    var size = this._size;\n    var half = size / 2;\n    var x = half;\n    var y = half;\n    var rad = half - 1;\n    var fontSize = this._fontSize;\n\n    ctx.font = fontSize + 'px ' + this._font;\n\n    var angle = Math.PI * 2 * (percent / 100);\n    ctx.clearRect(0, 0, size, size);\n\n    // outer circle\n    ctx.strokeStyle = '#9f9f9f';\n    ctx.beginPath();\n    ctx.arc(x, y, rad, 0, angle, false);\n    ctx.stroke();\n\n    // inner circle\n    ctx.strokeStyle = '#eee';\n    ctx.beginPath();\n    ctx.arc(x, y, rad - 1, 0, angle, true);\n    ctx.stroke();\n\n    // text\n    var text = this._text || (percent | 0) + '%';\n    var w = ctx.measureText(text).width;\n\n    ctx.fillText(text, x - w / 2 + 1, y + fontSize / 2 - 1);\n  } catch (ignore) {\n    // don't fail if we can't render progress\n  }\n  return this;\n};\n\n},{}],4:[function(require,module,exports){\n(function (global){\n'use strict';\n\nexports.isatty = function isatty() {\n  return true;\n};\n\nexports.getWindowSize = function getWindowSize() {\n  if ('innerHeight' in global) {\n    return [global.innerHeight, global.innerWidth];\n  }\n  // In a Web Worker, the DOM Window is not available.\n  return [640, 480];\n};\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{}],5:[function(require,module,exports){\n'use strict';\n/**\n * @module Context\n */\n/**\n * Expose `Context`.\n */\n\nmodule.exports = Context;\n\n/**\n * Initialize a new `Context`.\n *\n * @api private\n */\nfunction Context() {}\n\n/**\n * Set or get the context `Runnable` to `runnable`.\n *\n * @api private\n * @param {Runnable} runnable\n * @return {Context} context\n */\nContext.prototype.runnable = function(runnable) {\n  if (!arguments.length) {\n    return this._runnable;\n  }\n  this.test = this._runnable = runnable;\n  return this;\n};\n\n/**\n * Set or get test timeout `ms`.\n *\n * @api private\n * @param {number} ms\n * @return {Context} self\n */\nContext.prototype.timeout = function(ms) {\n  if (!arguments.length) {\n    return this.runnable().timeout();\n  }\n  this.runnable().timeout(ms);\n  return this;\n};\n\n/**\n * Set test timeout `enabled`.\n *\n * @api private\n * @param {boolean} enabled\n * @return {Context} self\n */\nContext.prototype.enableTimeouts = function(enabled) {\n  if (!arguments.length) {\n    return this.runnable().enableTimeouts();\n  }\n  this.runnable().enableTimeouts(enabled);\n  return this;\n};\n\n/**\n * Set or get test slowness threshold `ms`.\n *\n * @api private\n * @param {number} ms\n * @return {Context} self\n */\nContext.prototype.slow = function(ms) {\n  if (!arguments.length) {\n    return this.runnable().slow();\n  }\n  this.runnable().slow(ms);\n  return this;\n};\n\n/**\n * Mark a test as skipped.\n *\n * @api private\n * @throws Pending\n */\nContext.prototype.skip = function() {\n  this.runnable().skip();\n};\n\n/**\n * Set or get a number of allowed retries on failed tests\n *\n * @api private\n * @param {number} n\n * @return {Context} self\n */\nContext.prototype.retries = function(n) {\n  if (!arguments.length) {\n    return this.runnable().retries();\n  }\n  this.runnable().retries(n);\n  return this;\n};\n\n},{}],6:[function(require,module,exports){\n'use strict';\n\nvar Runnable = require('./runnable');\nvar inherits = require('./utils').inherits;\n\n/**\n * Expose `Hook`.\n */\n\nmodule.exports = Hook;\n\n/**\n * Initialize a new `Hook` with the given `title` and callback `fn`\n *\n * @class\n * @extends Runnable\n * @param {String} title\n * @param {Function} fn\n */\nfunction Hook(title, fn) {\n  Runnable.call(this, title, fn);\n  this.type = 'hook';\n}\n\n/**\n * Inherit from `Runnable.prototype`.\n */\ninherits(Hook, Runnable);\n\n/**\n * Get or set the test `err`.\n *\n * @memberof Hook\n * @public\n * @param {Error} err\n * @return {Error}\n */\nHook.prototype.error = function(err) {\n  if (!arguments.length) {\n    err = this._error;\n    this._error = null;\n    return err;\n  }\n\n  this._error = err;\n};\n\n},{\"./runnable\":32,\"./utils\":36}],7:[function(require,module,exports){\n'use strict';\n\nvar Test = require('../test');\n\n/**\n * BDD-style interface:\n *\n *      describe('Array', function() {\n *        describe('#indexOf()', function() {\n *          it('should return -1 when not present', function() {\n *            // ...\n *          });\n *\n *          it('should return the index when present', function() {\n *            // ...\n *          });\n *        });\n *      });\n *\n * @param {Suite} suite Root suite.\n */\nmodule.exports = function bddInterface(suite) {\n  var suites = [suite];\n\n  suite.on('pre-require', function(context, file, mocha) {\n    var common = require('./common')(suites, context, mocha);\n\n    context.before = common.before;\n    context.after = common.after;\n    context.beforeEach = common.beforeEach;\n    context.afterEach = common.afterEach;\n    context.run = mocha.options.delay && common.runWithSuite(suite);\n    /**\n     * Describe a \"suite\" with the given `title`\n     * and callback `fn` containing nested suites\n     * and/or tests.\n     */\n\n    context.describe = context.context = function(title, fn) {\n      return common.suite.create({\n        title: title,\n        file: file,\n        fn: fn\n      });\n    };\n\n    /**\n     * Pending describe.\n     */\n\n    context.xdescribe = context.xcontext = context.describe.skip = function(\n      title,\n      fn\n    ) {\n      return common.suite.skip({\n        title: title,\n        file: file,\n        fn: fn\n      });\n    };\n\n    /**\n     * Exclusive suite.\n     */\n\n    context.describe.only = function(title, fn) {\n      return common.suite.only({\n        title: title,\n        file: file,\n        fn: fn\n      });\n    };\n\n    /**\n     * Describe a specification or test-case\n     * with the given `title` and callback `fn`\n     * acting as a thunk.\n     */\n\n    context.it = context.specify = function(title, fn) {\n      var suite = suites[0];\n      if (suite.isPending()) {\n        fn = null;\n      }\n      var test = new Test(title, fn);\n      test.file = file;\n      suite.addTest(test);\n      return test;\n    };\n\n    /**\n     * Exclusive test-case.\n     */\n\n    context.it.only = function(title, fn) {\n      return common.test.only(mocha, context.it(title, fn));\n    };\n\n    /**\n     * Pending test case.\n     */\n\n    context.xit = context.xspecify = context.it.skip = function(title) {\n      return context.it(title);\n    };\n\n    /**\n     * Number of attempts to retry.\n     */\n    context.it.retries = function(n) {\n      context.retries(n);\n    };\n  });\n};\n\n},{\"../test\":35,\"./common\":8}],8:[function(require,module,exports){\n'use strict';\n\nvar Suite = require('../suite');\n\n/**\n * Functions common to more than one interface.\n *\n * @param {Suite[]} suites\n * @param {Context} context\n * @param {Mocha} mocha\n * @return {Object} An object containing common functions.\n */\nmodule.exports = function(suites, context, mocha) {\n  return {\n    /**\n     * This is only present if flag --delay is passed into Mocha. It triggers\n     * root suite execution.\n     *\n     * @param {Suite} suite The root suite.\n     * @return {Function} A function which runs the root suite\n     */\n    runWithSuite: function runWithSuite(suite) {\n      return function run() {\n        suite.run();\n      };\n    },\n\n    /**\n     * Execute before running tests.\n     *\n     * @param {string} name\n     * @param {Function} fn\n     */\n    before: function(name, fn) {\n      suites[0].beforeAll(name, fn);\n    },\n\n    /**\n     * Execute after running tests.\n     *\n     * @param {string} name\n     * @param {Function} fn\n     */\n    after: function(name, fn) {\n      suites[0].afterAll(name, fn);\n    },\n\n    /**\n     * Execute before each test case.\n     *\n     * @param {string} name\n     * @param {Function} fn\n     */\n    beforeEach: function(name, fn) {\n      suites[0].beforeEach(name, fn);\n    },\n\n    /**\n     * Execute after each test case.\n     *\n     * @param {string} name\n     * @param {Function} fn\n     */\n    afterEach: function(name, fn) {\n      suites[0].afterEach(name, fn);\n    },\n\n    suite: {\n      /**\n       * Create an exclusive Suite; convenience function\n       * See docstring for create() below.\n       *\n       * @param {Object} opts\n       * @returns {Suite}\n       */\n      only: function only(opts) {\n        opts.isOnly = true;\n        return this.create(opts);\n      },\n\n      /**\n       * Create a Suite, but skip it; convenience function\n       * See docstring for create() below.\n       *\n       * @param {Object} opts\n       * @returns {Suite}\n       */\n      skip: function skip(opts) {\n        opts.pending = true;\n        return this.create(opts);\n      },\n\n      /**\n       * Creates a suite.\n       * @param {Object} opts Options\n       * @param {string} opts.title Title of Suite\n       * @param {Function} [opts.fn] Suite Function (not always applicable)\n       * @param {boolean} [opts.pending] Is Suite pending?\n       * @param {string} [opts.file] Filepath where this Suite resides\n       * @param {boolean} [opts.isOnly] Is Suite exclusive?\n       * @returns {Suite}\n       */\n      create: function create(opts) {\n        var suite = Suite.create(suites[0], opts.title);\n        suite.pending = Boolean(opts.pending);\n        suite.file = opts.file;\n        suites.unshift(suite);\n        if (opts.isOnly) {\n          suite.parent._onlySuites = suite.parent._onlySuites.concat(suite);\n        }\n        if (typeof opts.fn === 'function') {\n          opts.fn.call(suite);\n          suites.shift();\n        } else if (typeof opts.fn === 'undefined' && !suite.pending) {\n          throw new Error(\n            'Suite \"' +\n              suite.fullTitle() +\n              '\" was defined but no callback was supplied. Supply a callback or explicitly skip the suite.'\n          );\n        } else if (!opts.fn && suite.pending) {\n          suites.shift();\n        }\n\n        return suite;\n      }\n    },\n\n    test: {\n      /**\n       * Exclusive test-case.\n       *\n       * @param {Object} mocha\n       * @param {Function} test\n       * @returns {*}\n       */\n      only: function(mocha, test) {\n        test.parent._onlyTests = test.parent._onlyTests.concat(test);\n        return test;\n      },\n\n      /**\n       * Pending test case.\n       *\n       * @param {string} title\n       */\n      skip: function(title) {\n        context.test(title);\n      },\n\n      /**\n       * Number of retry attempts\n       *\n       * @param {number} n\n       */\n      retries: function(n) {\n        context.retries(n);\n      }\n    }\n  };\n};\n\n},{\"../suite\":34}],9:[function(require,module,exports){\n'use strict';\nvar Suite = require('../suite');\nvar Test = require('../test');\n\n/**\n * Exports-style (as Node.js module) interface:\n *\n *     exports.Array = {\n *       '#indexOf()': {\n *         'should return -1 when the value is not present': function() {\n *\n *         },\n *\n *         'should return the correct index when the value is present': function() {\n *\n *         }\n *       }\n *     };\n *\n * @param {Suite} suite Root suite.\n */\nmodule.exports = function(suite) {\n  var suites = [suite];\n\n  suite.on('require', visit);\n\n  function visit(obj, file) {\n    var suite;\n    for (var key in obj) {\n      if (typeof obj[key] === 'function') {\n        var fn = obj[key];\n        switch (key) {\n          case 'before':\n            suites[0].beforeAll(fn);\n            break;\n          case 'after':\n            suites[0].afterAll(fn);\n            break;\n          case 'beforeEach':\n            suites[0].beforeEach(fn);\n            break;\n          case 'afterEach':\n            suites[0].afterEach(fn);\n            break;\n          default:\n            var test = new Test(key, fn);\n            test.file = file;\n            suites[0].addTest(test);\n        }\n      } else {\n        suite = Suite.create(suites[0], key);\n        suites.unshift(suite);\n        visit(obj[key], file);\n        suites.shift();\n      }\n    }\n  }\n};\n\n},{\"../suite\":34,\"../test\":35}],10:[function(require,module,exports){\n'use strict';\n\nexports.bdd = require('./bdd');\nexports.tdd = require('./tdd');\nexports.qunit = require('./qunit');\nexports.exports = require('./exports');\n\n},{\"./bdd\":7,\"./exports\":9,\"./qunit\":11,\"./tdd\":12}],11:[function(require,module,exports){\n'use strict';\n\nvar Test = require('../test');\n\n/**\n * QUnit-style interface:\n *\n *     suite('Array');\n *\n *     test('#length', function() {\n *       var arr = [1,2,3];\n *       ok(arr.length == 3);\n *     });\n *\n *     test('#indexOf()', function() {\n *       var arr = [1,2,3];\n *       ok(arr.indexOf(1) == 0);\n *       ok(arr.indexOf(2) == 1);\n *       ok(arr.indexOf(3) == 2);\n *     });\n *\n *     suite('String');\n *\n *     test('#length', function() {\n *       ok('foo'.length == 3);\n *     });\n *\n * @param {Suite} suite Root suite.\n */\nmodule.exports = function qUnitInterface(suite) {\n  var suites = [suite];\n\n  suite.on('pre-require', function(context, file, mocha) {\n    var common = require('./common')(suites, context, mocha);\n\n    context.before = common.before;\n    context.after = common.after;\n    context.beforeEach = common.beforeEach;\n    context.afterEach = common.afterEach;\n    context.run = mocha.options.delay && common.runWithSuite(suite);\n    /**\n     * Describe a \"suite\" with the given `title`.\n     */\n\n    context.suite = function(title) {\n      if (suites.length > 1) {\n        suites.shift();\n      }\n      return common.suite.create({\n        title: title,\n        file: file,\n        fn: false\n      });\n    };\n\n    /**\n     * Exclusive Suite.\n     */\n\n    context.suite.only = function(title) {\n      if (suites.length > 1) {\n        suites.shift();\n      }\n      return common.suite.only({\n        title: title,\n        file: file,\n        fn: false\n      });\n    };\n\n    /**\n     * Describe a specification or test-case\n     * with the given `title` and callback `fn`\n     * acting as a thunk.\n     */\n\n    context.test = function(title, fn) {\n      var test = new Test(title, fn);\n      test.file = file;\n      suites[0].addTest(test);\n      return test;\n    };\n\n    /**\n     * Exclusive test-case.\n     */\n\n    context.test.only = function(title, fn) {\n      return common.test.only(mocha, context.test(title, fn));\n    };\n\n    context.test.skip = common.test.skip;\n    context.test.retries = common.test.retries;\n  });\n};\n\n},{\"../test\":35,\"./common\":8}],12:[function(require,module,exports){\n'use strict';\n\nvar Test = require('../test');\n\n/**\n * TDD-style interface:\n *\n *      suite('Array', function() {\n *        suite('#indexOf()', function() {\n *          suiteSetup(function() {\n *\n *          });\n *\n *          test('should return -1 when not present', function() {\n *\n *          });\n *\n *          test('should return the index when present', function() {\n *\n *          });\n *\n *          suiteTeardown(function() {\n *\n *          });\n *        });\n *      });\n *\n * @param {Suite} suite Root suite.\n */\nmodule.exports = function(suite) {\n  var suites = [suite];\n\n  suite.on('pre-require', function(context, file, mocha) {\n    var common = require('./common')(suites, context, mocha);\n\n    context.setup = common.beforeEach;\n    context.teardown = common.afterEach;\n    context.suiteSetup = common.before;\n    context.suiteTeardown = common.after;\n    context.run = mocha.options.delay && common.runWithSuite(suite);\n\n    /**\n     * Describe a \"suite\" with the given `title` and callback `fn` containing\n     * nested suites and/or tests.\n     */\n    context.suite = function(title, fn) {\n      return common.suite.create({\n        title: title,\n        file: file,\n        fn: fn\n      });\n    };\n\n    /**\n     * Pending suite.\n     */\n    context.suite.skip = function(title, fn) {\n      return common.suite.skip({\n        title: title,\n        file: file,\n        fn: fn\n      });\n    };\n\n    /**\n     * Exclusive test-case.\n     */\n    context.suite.only = function(title, fn) {\n      return common.suite.only({\n        title: title,\n        file: file,\n        fn: fn\n      });\n    };\n\n    /**\n     * Describe a specification or test-case with the given `title` and\n     * callback `fn` acting as a thunk.\n     */\n    context.test = function(title, fn) {\n      var suite = suites[0];\n      if (suite.isPending()) {\n        fn = null;\n      }\n      var test = new Test(title, fn);\n      test.file = file;\n      suite.addTest(test);\n      return test;\n    };\n\n    /**\n     * Exclusive test-case.\n     */\n\n    context.test.only = function(title, fn) {\n      return common.test.only(mocha, context.test(title, fn));\n    };\n\n    context.test.skip = common.test.skip;\n    context.test.retries = common.test.retries;\n  });\n};\n\n},{\"../test\":35,\"./common\":8}],13:[function(require,module,exports){\n(function (process,global,__dirname){\n'use strict';\n\n/*!\n * mocha\n * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>\n * MIT Licensed\n */\n\nvar escapeRe = require('escape-string-regexp');\nvar path = require('path');\nvar reporters = require('./reporters');\nvar utils = require('./utils');\n\nexports = module.exports = Mocha;\n\n/**\n * To require local UIs and reporters when running in node.\n */\n\nif (!process.browser) {\n  var cwd = process.cwd();\n  module.paths.push(cwd, path.join(cwd, 'node_modules'));\n}\n\n/**\n * Expose internals.\n */\n\n/**\n * @public\n * @class utils\n * @memberof Mocha\n */\nexports.utils = utils;\nexports.interfaces = require('./interfaces');\n/**\n *\n * @memberof Mocha\n * @public\n */\nexports.reporters = reporters;\nexports.Runnable = require('./runnable');\nexports.Context = require('./context');\n/**\n *\n * @memberof Mocha\n */\nexports.Runner = require('./runner');\nexports.Suite = require('./suite');\nexports.Hook = require('./hook');\nexports.Test = require('./test');\n\n/**\n * Return image `name` path.\n *\n * @private\n * @param {string} name\n * @return {string}\n */\nfunction image(name) {\n  return path.join(__dirname, '..', 'assets', 'growl', name + '.png');\n}\n\n/**\n * Set up mocha with `options`.\n *\n * Options:\n *\n *   - `ui` name \"bdd\", \"tdd\", \"exports\" etc\n *   - `reporter` reporter instance, defaults to `mocha.reporters.spec`\n *   - `globals` array of accepted globals\n *   - `timeout` timeout in milliseconds\n *   - `retries` number of times to retry failed tests\n *   - `bail` bail on the first test failure\n *   - `slow` milliseconds to wait before considering a test slow\n *   - `ignoreLeaks` ignore global leaks\n *   - `fullTrace` display the full stack-trace on failing\n *   - `grep` string or regexp to filter tests with\n *\n * @class Mocha\n * @param {Object} options\n */\nfunction Mocha(options) {\n  options = options || {};\n  this.files = [];\n  this.options = options;\n  if (options.grep) {\n    this.grep(new RegExp(options.grep));\n  }\n  if (options.fgrep) {\n    this.fgrep(options.fgrep);\n  }\n  this.suite = new exports.Suite('', new exports.Context());\n  this.ui(options.ui);\n  this.bail(options.bail);\n  this.reporter(options.reporter, options.reporterOptions);\n  if (typeof options.timeout !== 'undefined' && options.timeout !== null) {\n    this.timeout(options.timeout);\n  }\n  if (typeof options.retries !== 'undefined' && options.retries !== null) {\n    this.retries(options.retries);\n  }\n  this.useColors(options.useColors);\n  if (options.enableTimeouts !== null) {\n    this.enableTimeouts(options.enableTimeouts);\n  }\n  if (options.slow) {\n    this.slow(options.slow);\n  }\n}\n\n/**\n * Enable or disable bailing on the first failure.\n *\n * @public\n * @api public\n * @param {boolean} [bail]\n */\nMocha.prototype.bail = function(bail) {\n  if (!arguments.length) {\n    bail = true;\n  }\n  this.suite.bail(bail);\n  return this;\n};\n\n/**\n * Add test `file`.\n *\n * @public\n * @api public\n * @param {string} file\n */\nMocha.prototype.addFile = function(file) {\n  this.files.push(file);\n  return this;\n};\n\n/**\n * Set reporter to `reporter`, defaults to \"spec\".\n *\n * @public\n * @param {String|Function} reporter name or constructor\n * @param {Object} reporterOptions optional options\n * @api public\n * @param {string|Function} reporter name or constructor\n * @param {Object} reporterOptions optional options\n */\nMocha.prototype.reporter = function(reporter, reporterOptions) {\n  if (typeof reporter === 'function') {\n    this._reporter = reporter;\n  } else {\n    reporter = reporter || 'spec';\n    var _reporter;\n    // Try to load a built-in reporter.\n    if (reporters[reporter]) {\n      _reporter = reporters[reporter];\n    }\n    // Try to load reporters from process.cwd() and node_modules\n    if (!_reporter) {\n      try {\n        _reporter = require(reporter);\n      } catch (err) {\n        if (err.message.indexOf('Cannot find module') !== -1) {\n          // Try to load reporters from a path (absolute or relative)\n          try {\n            _reporter = require(path.resolve(process.cwd(), reporter));\n          } catch (_err) {\n            err.message.indexOf('Cannot find module') !== -1\n              ? console.warn('\"' + reporter + '\" reporter not found')\n              : console.warn(\n                  '\"' +\n                    reporter +\n                    '\" reporter blew up with error:\\n' +\n                    err.stack\n                );\n          }\n        } else {\n          console.warn(\n            '\"' + reporter + '\" reporter blew up with error:\\n' + err.stack\n          );\n        }\n      }\n    }\n    if (!_reporter && reporter === 'teamcity') {\n      console.warn(\n        'The Teamcity reporter was moved to a package named ' +\n          'mocha-teamcity-reporter ' +\n          '(https://npmjs.org/package/mocha-teamcity-reporter).'\n      );\n    }\n    if (!_reporter) {\n      throw new Error('invalid reporter \"' + reporter + '\"');\n    }\n    this._reporter = _reporter;\n  }\n  this.options.reporterOptions = reporterOptions;\n  return this;\n};\n\n/**\n * Set test UI `name`, defaults to \"bdd\".\n * @public\n * @api public\n * @param {string} bdd\n */\nMocha.prototype.ui = function(name) {\n  name = name || 'bdd';\n  this._ui = exports.interfaces[name];\n  if (!this._ui) {\n    try {\n      this._ui = require(name);\n    } catch (err) {\n      throw new Error('invalid interface \"' + name + '\"');\n    }\n  }\n  this._ui = this._ui(this.suite);\n\n  this.suite.on('pre-require', function(context) {\n    exports.afterEach = context.afterEach || context.teardown;\n    exports.after = context.after || context.suiteTeardown;\n    exports.beforeEach = context.beforeEach || context.setup;\n    exports.before = context.before || context.suiteSetup;\n    exports.describe = context.describe || context.suite;\n    exports.it = context.it || context.test;\n    exports.xit = context.xit || context.test.skip;\n    exports.setup = context.setup || context.beforeEach;\n    exports.suiteSetup = context.suiteSetup || context.before;\n    exports.suiteTeardown = context.suiteTeardown || context.after;\n    exports.suite = context.suite || context.describe;\n    exports.teardown = context.teardown || context.afterEach;\n    exports.test = context.test || context.it;\n    exports.run = context.run;\n  });\n\n  return this;\n};\n\n/**\n * Load registered files.\n *\n * @api private\n */\nMocha.prototype.loadFiles = function(fn) {\n  var self = this;\n  var suite = this.suite;\n  this.files.forEach(function(file) {\n    file = path.resolve(file);\n    suite.emit('pre-require', global, file, self);\n    suite.emit('require', require(file), file, self);\n    suite.emit('post-require', global, file, self);\n  });\n  fn && fn();\n};\n\n/**\n * Enable growl support.\n *\n * @api private\n */\nMocha.prototype._growl = function(runner, reporter) {\n  var notify = require('growl');\n\n  runner.on('end', function() {\n    var stats = reporter.stats;\n    if (stats.failures) {\n      var msg = stats.failures + ' of ' + runner.total + ' tests failed';\n      notify(msg, {name: 'mocha', title: 'Failed', image: image('error')});\n    } else {\n      notify(stats.passes + ' tests passed in ' + stats.duration + 'ms', {\n        name: 'mocha',\n        title: 'Passed',\n        image: image('ok')\n      });\n    }\n  });\n};\n\n/**\n * Escape string and add it to grep as a regexp.\n *\n * @public\n * @api public\n * @param str\n * @returns {Mocha}\n */\nMocha.prototype.fgrep = function(str) {\n  return this.grep(new RegExp(escapeRe(str)));\n};\n\n/**\n * Add regexp to grep, if `re` is a string it is escaped.\n *\n * @public\n * @param {RegExp|String} re\n * @return {Mocha}\n * @api public\n * @param {RegExp|string} re\n * @return {Mocha}\n */\nMocha.prototype.grep = function(re) {\n  if (utils.isString(re)) {\n    // extract args if it's regex-like, i.e: [string, pattern, flag]\n    var arg = re.match(/^\\/(.*)\\/(g|i|)$|.*/);\n    this.options.grep = new RegExp(arg[1] || arg[0], arg[2]);\n  } else {\n    this.options.grep = re;\n  }\n  return this;\n};\n/**\n * Invert `.grep()` matches.\n *\n * @public\n * @return {Mocha}\n * @api public\n */\nMocha.prototype.invert = function() {\n  this.options.invert = true;\n  return this;\n};\n\n/**\n * Ignore global leaks.\n *\n * @public\n * @param {Boolean} ignore\n * @return {Mocha}\n * @api public\n * @param {boolean} ignore\n * @return {Mocha}\n */\nMocha.prototype.ignoreLeaks = function(ignore) {\n  this.options.ignoreLeaks = Boolean(ignore);\n  return this;\n};\n\n/**\n * Enable global leak checking.\n *\n * @return {Mocha}\n * @api public\n * @public\n */\nMocha.prototype.checkLeaks = function() {\n  this.options.ignoreLeaks = false;\n  return this;\n};\n\n/**\n * Display long stack-trace on failing\n *\n * @return {Mocha}\n * @api public\n * @public\n */\nMocha.prototype.fullTrace = function() {\n  this.options.fullStackTrace = true;\n  return this;\n};\n\n/**\n * Enable growl support.\n *\n * @return {Mocha}\n * @api public\n * @public\n */\nMocha.prototype.growl = function() {\n  this.options.growl = true;\n  return this;\n};\n\n/**\n * Ignore `globals` array or string.\n *\n * @param {Array|String} globals\n * @return {Mocha}\n * @api public\n * @public\n * @param {Array|string} globals\n * @return {Mocha}\n */\nMocha.prototype.globals = function(globals) {\n  this.options.globals = (this.options.globals || []).concat(globals);\n  return this;\n};\n\n/**\n * Emit color output.\n *\n * @param {Boolean} colors\n * @return {Mocha}\n * @api public\n * @public\n * @param {boolean} colors\n * @return {Mocha}\n */\nMocha.prototype.useColors = function(colors) {\n  if (colors !== undefined) {\n    this.options.useColors = colors;\n  }\n  return this;\n};\n\n/**\n * Use inline diffs rather than +/-.\n *\n * @param {Boolean} inlineDiffs\n * @return {Mocha}\n * @api public\n * @public\n * @param {boolean} inlineDiffs\n * @return {Mocha}\n */\nMocha.prototype.useInlineDiffs = function(inlineDiffs) {\n  this.options.useInlineDiffs = inlineDiffs !== undefined && inlineDiffs;\n  return this;\n};\n\n/**\n * Do not show diffs at all.\n *\n * @param {Boolean} hideDiff\n * @return {Mocha}\n * @api public\n * @public\n * @param {boolean} hideDiff\n * @return {Mocha}\n */\nMocha.prototype.hideDiff = function(hideDiff) {\n  this.options.hideDiff = hideDiff !== undefined && hideDiff;\n  return this;\n};\n\n/**\n * Set the timeout in milliseconds.\n *\n * @param {Number} timeout\n * @return {Mocha}\n * @api public\n * @public\n * @param {number} timeout\n * @return {Mocha}\n */\nMocha.prototype.timeout = function(timeout) {\n  this.suite.timeout(timeout);\n  return this;\n};\n\n/**\n * Set the number of times to retry failed tests.\n *\n * @param {Number} retry times\n * @return {Mocha}\n * @api public\n * @public\n */\nMocha.prototype.retries = function(n) {\n  this.suite.retries(n);\n  return this;\n};\n\n/**\n * Set slowness threshold in milliseconds.\n *\n * @param {Number} slow\n * @return {Mocha}\n * @api public\n * @public\n * @param {number} slow\n * @return {Mocha}\n */\nMocha.prototype.slow = function(slow) {\n  this.suite.slow(slow);\n  return this;\n};\n\n/**\n * Enable timeouts.\n *\n * @param {Boolean} enabled\n * @return {Mocha}\n * @api public\n * @public\n * @param {boolean} enabled\n * @return {Mocha}\n */\nMocha.prototype.enableTimeouts = function(enabled) {\n  this.suite.enableTimeouts(\n    arguments.length && enabled !== undefined ? enabled : true\n  );\n  return this;\n};\n\n/**\n * Makes all tests async (accepting a callback)\n *\n * @return {Mocha}\n * @api public\n * @public\n */\nMocha.prototype.asyncOnly = function() {\n  this.options.asyncOnly = true;\n  return this;\n};\n\n/**\n * Disable syntax highlighting (in browser).\n *\n * @api public\n * @public\n */\nMocha.prototype.noHighlighting = function() {\n  this.options.noHighlighting = true;\n  return this;\n};\n\n/**\n * Enable uncaught errors to propagate (in browser).\n *\n * @return {Mocha}\n * @api public\n * @public\n */\nMocha.prototype.allowUncaught = function() {\n  this.options.allowUncaught = true;\n  return this;\n};\n\n/**\n * Delay root suite execution.\n * @returns {Mocha}\n */\nMocha.prototype.delay = function delay() {\n  this.options.delay = true;\n  return this;\n};\n\n/**\n * Tests marked only fail the suite\n * @returns {Mocha}\n */\nMocha.prototype.forbidOnly = function() {\n  this.options.forbidOnly = true;\n  return this;\n};\n\n/**\n * Pending tests and tests marked skip fail the suite\n * @returns {Mocha}\n */\nMocha.prototype.forbidPending = function() {\n  this.options.forbidPending = true;\n  return this;\n};\n\n/**\n * Run tests and invoke `fn()` when complete.\n *\n * Note that `loadFiles` relies on Node's `require` to execute\n * the test interface functions and will be subject to the\n * cache - if the files are already in the `require` cache,\n * they will effectively be skipped. Therefore, to run tests\n * multiple times or to run tests in files that are already\n * in the `require` cache, make sure to clear them from the\n * cache first in whichever manner best suits your needs.\n *\n * @api public\n * @public\n * @param {Function} fn\n * @return {Runner}\n */\nMocha.prototype.run = function(fn) {\n  if (this.files.length) {\n    this.loadFiles();\n  }\n  var suite = this.suite;\n  var options = this.options;\n  options.files = this.files;\n  var runner = new exports.Runner(suite, options.delay);\n  var reporter = new this._reporter(runner, options);\n  runner.ignoreLeaks = options.ignoreLeaks !== false;\n  runner.fullStackTrace = options.fullStackTrace;\n  runner.asyncOnly = options.asyncOnly;\n  runner.allowUncaught = options.allowUncaught;\n  runner.forbidOnly = options.forbidOnly;\n  runner.forbidPending = options.forbidPending;\n  if (options.grep) {\n    runner.grep(options.grep, options.invert);\n  }\n  if (options.globals) {\n    runner.globals(options.globals);\n  }\n  if (options.growl) {\n    this._growl(runner, reporter);\n  }\n  if (options.useColors !== undefined) {\n    exports.reporters.Base.useColors = options.useColors;\n  }\n  exports.reporters.Base.inlineDiffs = options.useInlineDiffs;\n  exports.reporters.Base.hideDiff = options.hideDiff;\n\n  function done(failures) {\n    if (reporter.done) {\n      reporter.done(failures, fn);\n    } else {\n      fn && fn(failures);\n    }\n  }\n\n  return runner.run(done);\n};\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {},\"/lib\")\n},{\"./context\":5,\"./hook\":6,\"./interfaces\":10,\"./reporters\":20,\"./runnable\":32,\"./runner\":33,\"./suite\":34,\"./test\":35,\"./utils\":36,\"_process\":56,\"escape-string-regexp\":46,\"growl\":2,\"path\":40}],14:[function(require,module,exports){\n'use strict';\n/**\n * @module milliseconds\n */\n/**\n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar y = d * 365.25;\n\n/**\n * Parse or format the given `val`.\n *\n * @memberof Mocha\n * @public\n * @api public\n * @param {string|number} val\n * @return {string|number}\n */\nmodule.exports = function(val) {\n  if (typeof val === 'string') {\n    return parse(val);\n  }\n  return format(val);\n};\n\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @api private\n * @param {string} str\n * @return {number}\n */\nfunction parse(str) {\n  var match = /^((?:\\d+)?\\.?\\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(\n    str\n  );\n  if (!match) {\n    return;\n  }\n  var n = parseFloat(match[1]);\n  var type = (match[2] || 'ms').toLowerCase();\n  switch (type) {\n    case 'years':\n    case 'year':\n    case 'y':\n      return n * y;\n    case 'days':\n    case 'day':\n    case 'd':\n      return n * d;\n    case 'hours':\n    case 'hour':\n    case 'h':\n      return n * h;\n    case 'minutes':\n    case 'minute':\n    case 'm':\n      return n * m;\n    case 'seconds':\n    case 'second':\n    case 's':\n      return n * s;\n    case 'ms':\n      return n;\n    default:\n    // No default case\n  }\n}\n\n/**\n * Format for `ms`.\n *\n * @api private\n * @param {number} ms\n * @return {string}\n */\nfunction format(ms) {\n  if (ms >= d) {\n    return Math.round(ms / d) + 'd';\n  }\n  if (ms >= h) {\n    return Math.round(ms / h) + 'h';\n  }\n  if (ms >= m) {\n    return Math.round(ms / m) + 'm';\n  }\n  if (ms >= s) {\n    return Math.round(ms / s) + 's';\n  }\n  return ms + 'ms';\n}\n\n},{}],15:[function(require,module,exports){\n'use strict';\n\nmodule.exports = Pending;\n\n/**\n * Initialize a new `Pending` error with the given message.\n *\n * @param {string} message\n */\nfunction Pending(message) {\n  this.message = message;\n}\n\n},{}],16:[function(require,module,exports){\n(function (process,global){\n'use strict';\n/**\n * @module Base\n */\n/**\n * Module dependencies.\n */\n\nvar tty = require('tty');\nvar diff = require('diff');\nvar ms = require('../ms');\nvar utils = require('../utils');\nvar supportsColor = process.browser ? null : require('supports-color');\n\n/**\n * Expose `Base`.\n */\n\nexports = module.exports = Base;\n\n/**\n * Save timer references to avoid Sinon interfering.\n * See: https://github.com/mochajs/mocha/issues/237\n */\n\n/* eslint-disable no-unused-vars, no-native-reassign */\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n/* eslint-enable no-unused-vars, no-native-reassign */\n\n/**\n * Check if both stdio streams are associated with a tty.\n */\n\nvar isatty = tty.isatty(1) && tty.isatty(2);\n\n/**\n * Enable coloring by default, except in the browser interface.\n */\n\nexports.useColors =\n  !process.browser &&\n  (supportsColor.stdout || process.env.MOCHA_COLORS !== undefined);\n\n/**\n * Inline diffs instead of +/-\n */\n\nexports.inlineDiffs = false;\n\n/**\n * Default color map.\n */\n\nexports.colors = {\n  pass: 90,\n  fail: 31,\n  'bright pass': 92,\n  'bright fail': 91,\n  'bright yellow': 93,\n  pending: 36,\n  suite: 0,\n  'error title': 0,\n  'error message': 31,\n  'error stack': 90,\n  checkmark: 32,\n  fast: 90,\n  medium: 33,\n  slow: 31,\n  green: 32,\n  light: 90,\n  'diff gutter': 90,\n  'diff added': 32,\n  'diff removed': 31\n};\n\n/**\n * Default symbol map.\n */\n\nexports.symbols = {\n  ok: '✓',\n  err: '✖',\n  dot: '․',\n  comma: ',',\n  bang: '!'\n};\n\n// With node.js on Windows: use symbols available in terminal default fonts\nif (process.platform === 'win32') {\n  exports.symbols.ok = '\\u221A';\n  exports.symbols.err = '\\u00D7';\n  exports.symbols.dot = '.';\n}\n\n/**\n * Color `str` with the given `type`,\n * allowing colors to be disabled,\n * as well as user-defined color\n * schemes.\n *\n * @param {string} type\n * @param {string} str\n * @return {string}\n * @api private\n */\nvar color = (exports.color = function(type, str) {\n  if (!exports.useColors) {\n    return String(str);\n  }\n  return '\\u001b[' + exports.colors[type] + 'm' + str + '\\u001b[0m';\n});\n\n/**\n * Expose term window size, with some defaults for when stderr is not a tty.\n */\n\nexports.window = {\n  width: 75\n};\n\nif (isatty) {\n  exports.window.width = process.stdout.getWindowSize\n    ? process.stdout.getWindowSize(1)[0]\n    : tty.getWindowSize()[1];\n}\n\n/**\n * Expose some basic cursor interactions that are common among reporters.\n */\n\nexports.cursor = {\n  hide: function() {\n    isatty && process.stdout.write('\\u001b[?25l');\n  },\n\n  show: function() {\n    isatty && process.stdout.write('\\u001b[?25h');\n  },\n\n  deleteLine: function() {\n    isatty && process.stdout.write('\\u001b[2K');\n  },\n\n  beginningOfLine: function() {\n    isatty && process.stdout.write('\\u001b[0G');\n  },\n\n  CR: function() {\n    if (isatty) {\n      exports.cursor.deleteLine();\n      exports.cursor.beginningOfLine();\n    } else {\n      process.stdout.write('\\r');\n    }\n  }\n};\n\nfunction showDiff(err) {\n  return (\n    err &&\n    err.showDiff !== false &&\n    sameType(err.actual, err.expected) &&\n    err.expected !== undefined\n  );\n}\n\nfunction stringifyDiffObjs(err) {\n  if (!utils.isString(err.actual) || !utils.isString(err.expected)) {\n    err.actual = utils.stringify(err.actual);\n    err.expected = utils.stringify(err.expected);\n  }\n}\n\n/**\n * Returns a diff between 2 strings with coloured ANSI output.\n *\n * The diff will be either inline or unified dependant on the value\n * of `Base.inlineDiff`.\n *\n * @param {string} actual\n * @param {string} expected\n * @return {string} Diff\n */\nvar generateDiff = (exports.generateDiff = function(actual, expected) {\n  return exports.inlineDiffs\n    ? inlineDiff(actual, expected)\n    : unifiedDiff(actual, expected);\n});\n\n/**\n * Output the given `failures` as a list.\n *\n * @public\n * @memberof Mocha.reporters.Base\n * @variation 1\n * @param {Array} failures\n * @api public\n */\n\nexports.list = function(failures) {\n  console.log();\n  failures.forEach(function(test, i) {\n    // format\n    var fmt =\n      color('error title', '  %s) %s:\\n') +\n      color('error message', '     %s') +\n      color('error stack', '\\n%s\\n');\n\n    // msg\n    var msg;\n    var err = test.err;\n    var message;\n    if (err.message && typeof err.message.toString === 'function') {\n      message = err.message + '';\n    } else if (typeof err.inspect === 'function') {\n      message = err.inspect() + '';\n    } else {\n      message = '';\n    }\n    var stack = err.stack || message;\n    var index = message ? stack.indexOf(message) : -1;\n\n    if (index === -1) {\n      msg = message;\n    } else {\n      index += message.length;\n      msg = stack.slice(0, index);\n      // remove msg from stack\n      stack = stack.slice(index + 1);\n    }\n\n    // uncaught\n    if (err.uncaught) {\n      msg = 'Uncaught ' + msg;\n    }\n    // explicitly show diff\n    if (!exports.hideDiff && showDiff(err)) {\n      stringifyDiffObjs(err);\n      fmt =\n        color('error title', '  %s) %s:\\n%s') + color('error stack', '\\n%s\\n');\n      var match = message.match(/^([^:]+): expected/);\n      msg = '\\n      ' + color('error message', match ? match[1] : msg);\n\n      msg += generateDiff(err.actual, err.expected);\n    }\n\n    // indent stack trace\n    stack = stack.replace(/^/gm, '  ');\n\n    // indented test title\n    var testTitle = '';\n    test.titlePath().forEach(function(str, index) {\n      if (index !== 0) {\n        testTitle += '\\n     ';\n      }\n      for (var i = 0; i < index; i++) {\n        testTitle += '  ';\n      }\n      testTitle += str;\n    });\n\n    console.log(fmt, i + 1, testTitle, msg, stack);\n  });\n};\n\n/**\n * Initialize a new `Base` reporter.\n *\n * All other reporters generally\n * inherit from this reporter, providing\n * stats such as test duration, number\n * of tests passed / failed etc.\n *\n * @memberof Mocha.reporters\n * @public\n * @class\n * @param {Runner} runner\n * @api public\n */\n\nfunction Base(runner) {\n  var stats = (this.stats = {\n    suites: 0,\n    tests: 0,\n    passes: 0,\n    pending: 0,\n    failures: 0\n  });\n  var failures = (this.failures = []);\n\n  if (!runner) {\n    return;\n  }\n  this.runner = runner;\n\n  runner.stats = stats;\n\n  runner.on('start', function() {\n    stats.start = new Date();\n  });\n\n  runner.on('suite', function(suite) {\n    stats.suites = stats.suites || 0;\n    suite.root || stats.suites++;\n  });\n\n  runner.on('test end', function() {\n    stats.tests = stats.tests || 0;\n    stats.tests++;\n  });\n\n  runner.on('pass', function(test) {\n    stats.passes = stats.passes || 0;\n\n    if (test.duration > test.slow()) {\n      test.speed = 'slow';\n    } else if (test.duration > test.slow() / 2) {\n      test.speed = 'medium';\n    } else {\n      test.speed = 'fast';\n    }\n\n    stats.passes++;\n  });\n\n  runner.on('fail', function(test, err) {\n    stats.failures = stats.failures || 0;\n    stats.failures++;\n    if (showDiff(err)) {\n      stringifyDiffObjs(err);\n    }\n    test.err = err;\n    failures.push(test);\n  });\n\n  runner.once('end', function() {\n    stats.end = new Date();\n    stats.duration = stats.end - stats.start;\n  });\n\n  runner.on('pending', function() {\n    stats.pending++;\n  });\n}\n\n/**\n * Output common epilogue used by many of\n * the bundled reporters.\n *\n * @memberof Mocha.reporters.Base\n * @public\n * @api public\n */\nBase.prototype.epilogue = function() {\n  var stats = this.stats;\n  var fmt;\n\n  console.log();\n\n  // passes\n  fmt =\n    color('bright pass', ' ') +\n    color('green', ' %d passing') +\n    color('light', ' (%s)');\n\n  console.log(fmt, stats.passes || 0, ms(stats.duration));\n\n  // pending\n  if (stats.pending) {\n    fmt = color('pending', ' ') + color('pending', ' %d pending');\n\n    console.log(fmt, stats.pending);\n  }\n\n  // failures\n  if (stats.failures) {\n    fmt = color('fail', '  %d failing');\n\n    console.log(fmt, stats.failures);\n\n    Base.list(this.failures);\n    console.log();\n  }\n\n  console.log();\n};\n\n/**\n * Pad the given `str` to `len`.\n *\n * @api private\n * @param {string} str\n * @param {string} len\n * @return {string}\n */\nfunction pad(str, len) {\n  str = String(str);\n  return Array(len - str.length + 1).join(' ') + str;\n}\n\n/**\n * Returns an inline diff between 2 strings with coloured ANSI output.\n *\n * @api private\n * @param {String} actual\n * @param {String} expected\n * @return {string} Diff\n */\nfunction inlineDiff(actual, expected) {\n  var msg = errorDiff(actual, expected);\n\n  // linenos\n  var lines = msg.split('\\n');\n  if (lines.length > 4) {\n    var width = String(lines.length).length;\n    msg = lines\n      .map(function(str, i) {\n        return pad(++i, width) + ' |' + ' ' + str;\n      })\n      .join('\\n');\n  }\n\n  // legend\n  msg =\n    '\\n' +\n    color('diff removed', 'actual') +\n    ' ' +\n    color('diff added', 'expected') +\n    '\\n\\n' +\n    msg +\n    '\\n';\n\n  // indent\n  msg = msg.replace(/^/gm, '      ');\n  return msg;\n}\n\n/**\n * Returns a unified diff between two strings with coloured ANSI output.\n *\n * @api private\n * @param {String} actual\n * @param {String} expected\n * @return {string} The diff.\n */\nfunction unifiedDiff(actual, expected) {\n  var indent = '      ';\n  function cleanUp(line) {\n    if (line[0] === '+') {\n      return indent + colorLines('diff added', line);\n    }\n    if (line[0] === '-') {\n      return indent + colorLines('diff removed', line);\n    }\n    if (line.match(/@@/)) {\n      return '--';\n    }\n    if (line.match(/\\\\ No newline/)) {\n      return null;\n    }\n    return indent + line;\n  }\n  function notBlank(line) {\n    return typeof line !== 'undefined' && line !== null;\n  }\n  var msg = diff.createPatch('string', actual, expected);\n  var lines = msg.split('\\n').splice(5);\n  return (\n    '\\n      ' +\n    colorLines('diff added', '+ expected') +\n    ' ' +\n    colorLines('diff removed', '- actual') +\n    '\\n\\n' +\n    lines\n      .map(cleanUp)\n      .filter(notBlank)\n      .join('\\n')\n  );\n}\n\n/**\n * Return a character diff for `err`.\n *\n * @api private\n * @param {String} actual\n * @param {String} expected\n * @return {string} the diff\n */\nfunction errorDiff(actual, expected) {\n  return diff\n    .diffWordsWithSpace(actual, expected)\n    .map(function(str) {\n      if (str.added) {\n        return colorLines('diff added', str.value);\n      }\n      if (str.removed) {\n        return colorLines('diff removed', str.value);\n      }\n      return str.value;\n    })\n    .join('');\n}\n\n/**\n * Color lines for `str`, using the color `name`.\n *\n * @api private\n * @param {string} name\n * @param {string} str\n * @return {string}\n */\nfunction colorLines(name, str) {\n  return str\n    .split('\\n')\n    .map(function(str) {\n      return color(name, str);\n    })\n    .join('\\n');\n}\n\n/**\n * Object#toString reference.\n */\nvar objToString = Object.prototype.toString;\n\n/**\n * Check that a / b have the same type.\n *\n * @api private\n * @param {Object} a\n * @param {Object} b\n * @return {boolean}\n */\nfunction sameType(a, b) {\n  return objToString.call(a) === objToString.call(b);\n}\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"../ms\":14,\"../utils\":36,\"_process\":56,\"diff\":45,\"supports-color\":40,\"tty\":4}],17:[function(require,module,exports){\n'use strict';\n/**\n * @module Doc\n */\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar utils = require('../utils');\n\n/**\n * Expose `Doc`.\n */\n\nexports = module.exports = Doc;\n\n/**\n * Initialize a new `Doc` reporter.\n *\n * @class\n * @memberof Mocha.reporters\n * @extends {Base}\n * @public\n * @param {Runner} runner\n * @api public\n */\nfunction Doc(runner) {\n  Base.call(this, runner);\n\n  var indents = 2;\n\n  function indent() {\n    return Array(indents).join('  ');\n  }\n\n  runner.on('suite', function(suite) {\n    if (suite.root) {\n      return;\n    }\n    ++indents;\n    console.log('%s<section class=\"suite\">', indent());\n    ++indents;\n    console.log('%s<h1>%s</h1>', indent(), utils.escape(suite.title));\n    console.log('%s<dl>', indent());\n  });\n\n  runner.on('suite end', function(suite) {\n    if (suite.root) {\n      return;\n    }\n    console.log('%s</dl>', indent());\n    --indents;\n    console.log('%s</section>', indent());\n    --indents;\n  });\n\n  runner.on('pass', function(test) {\n    console.log('%s  <dt>%s</dt>', indent(), utils.escape(test.title));\n    var code = utils.escape(utils.clean(test.body));\n    console.log('%s  <dd><pre><code>%s</code></pre></dd>', indent(), code);\n  });\n\n  runner.on('fail', function(test, err) {\n    console.log(\n      '%s  <dt class=\"error\">%s</dt>',\n      indent(),\n      utils.escape(test.title)\n    );\n    var code = utils.escape(utils.clean(test.body));\n    console.log(\n      '%s  <dd class=\"error\"><pre><code>%s</code></pre></dd>',\n      indent(),\n      code\n    );\n    console.log('%s  <dd class=\"error\">%s</dd>', indent(), utils.escape(err));\n  });\n}\n\n},{\"../utils\":36,\"./base\":16}],18:[function(require,module,exports){\n(function (process){\n'use strict';\n/**\n * @module Dot\n */\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar color = Base.color;\n\n/**\n * Expose `Dot`.\n */\n\nexports = module.exports = Dot;\n\n/**\n * Initialize a new `Dot` matrix test reporter.\n *\n * @class\n * @memberof Mocha.reporters\n * @extends Mocha.reporters.Base\n * @public\n * @api public\n * @param {Runner} runner\n */\nfunction Dot(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var width = (Base.window.width * 0.75) | 0;\n  var n = -1;\n\n  runner.on('start', function() {\n    process.stdout.write('\\n');\n  });\n\n  runner.on('pending', function() {\n    if (++n % width === 0) {\n      process.stdout.write('\\n  ');\n    }\n    process.stdout.write(color('pending', Base.symbols.comma));\n  });\n\n  runner.on('pass', function(test) {\n    if (++n % width === 0) {\n      process.stdout.write('\\n  ');\n    }\n    if (test.speed === 'slow') {\n      process.stdout.write(color('bright yellow', Base.symbols.dot));\n    } else {\n      process.stdout.write(color(test.speed, Base.symbols.dot));\n    }\n  });\n\n  runner.on('fail', function() {\n    if (++n % width === 0) {\n      process.stdout.write('\\n  ');\n    }\n    process.stdout.write(color('fail', Base.symbols.bang));\n  });\n\n  runner.once('end', function() {\n    console.log();\n    self.epilogue();\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Dot, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":36,\"./base\":16,\"_process\":56}],19:[function(require,module,exports){\n(function (global){\n'use strict';\n\n/* eslint-env browser */\n/**\n * @module HTML\n */\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar utils = require('../utils');\nvar Progress = require('../browser/progress');\nvar escapeRe = require('escape-string-regexp');\nvar escape = utils.escape;\n\n/**\n * Save timer references to avoid Sinon interfering (see GH-237).\n */\n\n/* eslint-disable no-unused-vars, no-native-reassign */\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n/* eslint-enable no-unused-vars, no-native-reassign */\n\n/**\n * Expose `HTML`.\n */\n\nexports = module.exports = HTML;\n\n/**\n * Stats template.\n */\n\nvar statsTemplate =\n  '<ul id=\"mocha-stats\">' +\n  '<li class=\"progress\"><canvas width=\"40\" height=\"40\"></canvas></li>' +\n  '<li class=\"passes\"><a href=\"javascript:void(0);\">passes:</a> <em>0</em></li>' +\n  '<li class=\"failures\"><a href=\"javascript:void(0);\">failures:</a> <em>0</em></li>' +\n  '<li class=\"duration\">duration: <em>0</em>s</li>' +\n  '</ul>';\n\nvar playIcon = '&#x2023;';\n\n/**\n * Initialize a new `HTML` reporter.\n *\n * @public\n * @class\n * @memberof Mocha.reporters\n * @extends Mocha.reporters.Base\n * @api public\n * @param {Runner} runner\n */\nfunction HTML(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var stats = this.stats;\n  var stat = fragment(statsTemplate);\n  var items = stat.getElementsByTagName('li');\n  var passes = items[1].getElementsByTagName('em')[0];\n  var passesLink = items[1].getElementsByTagName('a')[0];\n  var failures = items[2].getElementsByTagName('em')[0];\n  var failuresLink = items[2].getElementsByTagName('a')[0];\n  var duration = items[3].getElementsByTagName('em')[0];\n  var canvas = stat.getElementsByTagName('canvas')[0];\n  var report = fragment('<ul id=\"mocha-report\"></ul>');\n  var stack = [report];\n  var progress;\n  var ctx;\n  var root = document.getElementById('mocha');\n\n  if (canvas.getContext) {\n    var ratio = window.devicePixelRatio || 1;\n    canvas.style.width = canvas.width;\n    canvas.style.height = canvas.height;\n    canvas.width *= ratio;\n    canvas.height *= ratio;\n    ctx = canvas.getContext('2d');\n    ctx.scale(ratio, ratio);\n    progress = new Progress();\n  }\n\n  if (!root) {\n    return error('#mocha div missing, add it to your document');\n  }\n\n  // pass toggle\n  on(passesLink, 'click', function(evt) {\n    evt.preventDefault();\n    unhide();\n    var name = /pass/.test(report.className) ? '' : ' pass';\n    report.className = report.className.replace(/fail|pass/g, '') + name;\n    if (report.className.trim()) {\n      hideSuitesWithout('test pass');\n    }\n  });\n\n  // failure toggle\n  on(failuresLink, 'click', function(evt) {\n    evt.preventDefault();\n    unhide();\n    var name = /fail/.test(report.className) ? '' : ' fail';\n    report.className = report.className.replace(/fail|pass/g, '') + name;\n    if (report.className.trim()) {\n      hideSuitesWithout('test fail');\n    }\n  });\n\n  root.appendChild(stat);\n  root.appendChild(report);\n\n  if (progress) {\n    progress.size(40);\n  }\n\n  runner.on('suite', function(suite) {\n    if (suite.root) {\n      return;\n    }\n\n    // suite\n    var url = self.suiteURL(suite);\n    var el = fragment(\n      '<li class=\"suite\"><h1><a href=\"%s\">%s</a></h1></li>',\n      url,\n      escape(suite.title)\n    );\n\n    // container\n    stack[0].appendChild(el);\n    stack.unshift(document.createElement('ul'));\n    el.appendChild(stack[0]);\n  });\n\n  runner.on('suite end', function(suite) {\n    if (suite.root) {\n      updateStats();\n      return;\n    }\n    stack.shift();\n  });\n\n  runner.on('pass', function(test) {\n    var url = self.testURL(test);\n    var markup =\n      '<li class=\"test pass %e\"><h2>%e<span class=\"duration\">%ems</span> ' +\n      '<a href=\"%s\" class=\"replay\">' +\n      playIcon +\n      '</a></h2></li>';\n    var el = fragment(markup, test.speed, test.title, test.duration, url);\n    self.addCodeToggle(el, test.body);\n    appendToStack(el);\n    updateStats();\n  });\n\n  runner.on('fail', function(test) {\n    var el = fragment(\n      '<li class=\"test fail\"><h2>%e <a href=\"%e\" class=\"replay\">' +\n        playIcon +\n        '</a></h2></li>',\n      test.title,\n      self.testURL(test)\n    );\n    var stackString; // Note: Includes leading newline\n    var message = test.err.toString();\n\n    // <=IE7 stringifies to [Object Error]. Since it can be overloaded, we\n    // check for the result of the stringifying.\n    if (message === '[object Error]') {\n      message = test.err.message;\n    }\n\n    if (test.err.stack) {\n      var indexOfMessage = test.err.stack.indexOf(test.err.message);\n      if (indexOfMessage === -1) {\n        stackString = test.err.stack;\n      } else {\n        stackString = test.err.stack.substr(\n          test.err.message.length + indexOfMessage\n        );\n      }\n    } else if (test.err.sourceURL && test.err.line !== undefined) {\n      // Safari doesn't give you a stack. Let's at least provide a source line.\n      stackString = '\\n(' + test.err.sourceURL + ':' + test.err.line + ')';\n    }\n\n    stackString = stackString || '';\n\n    if (test.err.htmlMessage && stackString) {\n      el.appendChild(\n        fragment(\n          '<div class=\"html-error\">%s\\n<pre class=\"error\">%e</pre></div>',\n          test.err.htmlMessage,\n          stackString\n        )\n      );\n    } else if (test.err.htmlMessage) {\n      el.appendChild(\n        fragment('<div class=\"html-error\">%s</div>', test.err.htmlMessage)\n      );\n    } else {\n      el.appendChild(\n        fragment('<pre class=\"error\">%e%e</pre>', message, stackString)\n      );\n    }\n\n    self.addCodeToggle(el, test.body);\n    appendToStack(el);\n    updateStats();\n  });\n\n  runner.on('pending', function(test) {\n    var el = fragment(\n      '<li class=\"test pass pending\"><h2>%e</h2></li>',\n      test.title\n    );\n    appendToStack(el);\n    updateStats();\n  });\n\n  function appendToStack(el) {\n    // Don't call .appendChild if #mocha-report was already .shift()'ed off the stack.\n    if (stack[0]) {\n      stack[0].appendChild(el);\n    }\n  }\n\n  function updateStats() {\n    // TODO: add to stats\n    var percent = (stats.tests / runner.total * 100) | 0;\n    if (progress) {\n      progress.update(percent).draw(ctx);\n    }\n\n    // update stats\n    var ms = new Date() - stats.start;\n    text(passes, stats.passes);\n    text(failures, stats.failures);\n    text(duration, (ms / 1000).toFixed(2));\n  }\n}\n\n/**\n * Makes a URL, preserving querystring (\"search\") parameters.\n *\n * @param {string} s\n * @return {string} A new URL.\n */\nfunction makeUrl(s) {\n  var search = window.location.search;\n\n  // Remove previous grep query parameter if present\n  if (search) {\n    search = search.replace(/[?&]grep=[^&\\s]*/g, '').replace(/^&/, '?');\n  }\n\n  return (\n    window.location.pathname +\n    (search ? search + '&' : '?') +\n    'grep=' +\n    encodeURIComponent(escapeRe(s))\n  );\n}\n\n/**\n * Provide suite URL.\n *\n * @param {Object} [suite]\n */\nHTML.prototype.suiteURL = function(suite) {\n  return makeUrl(suite.fullTitle());\n};\n\n/**\n * Provide test URL.\n *\n * @param {Object} [test]\n */\nHTML.prototype.testURL = function(test) {\n  return makeUrl(test.fullTitle());\n};\n\n/**\n * Adds code toggle functionality for the provided test's list element.\n *\n * @param {HTMLLIElement} el\n * @param {string} contents\n */\nHTML.prototype.addCodeToggle = function(el, contents) {\n  var h2 = el.getElementsByTagName('h2')[0];\n\n  on(h2, 'click', function() {\n    pre.style.display = pre.style.display === 'none' ? 'block' : 'none';\n  });\n\n  var pre = fragment('<pre><code>%e</code></pre>', utils.clean(contents));\n  el.appendChild(pre);\n  pre.style.display = 'none';\n};\n\n/**\n * Display error `msg`.\n *\n * @param {string} msg\n */\nfunction error(msg) {\n  document.body.appendChild(fragment('<div id=\"mocha-error\">%s</div>', msg));\n}\n\n/**\n * Return a DOM fragment from `html`.\n *\n * @param {string} html\n */\nfunction fragment(html) {\n  var args = arguments;\n  var div = document.createElement('div');\n  var i = 1;\n\n  div.innerHTML = html.replace(/%([se])/g, function(_, type) {\n    switch (type) {\n      case 's':\n        return String(args[i++]);\n      case 'e':\n        return escape(args[i++]);\n      // no default\n    }\n  });\n\n  return div.firstChild;\n}\n\n/**\n * Check for suites that do not have elements\n * with `classname`, and hide them.\n *\n * @param {text} classname\n */\nfunction hideSuitesWithout(classname) {\n  var suites = document.getElementsByClassName('suite');\n  for (var i = 0; i < suites.length; i++) {\n    var els = suites[i].getElementsByClassName(classname);\n    if (!els.length) {\n      suites[i].className += ' hidden';\n    }\n  }\n}\n\n/**\n * Unhide .hidden suites.\n */\nfunction unhide() {\n  var els = document.getElementsByClassName('suite hidden');\n  for (var i = 0; i < els.length; ++i) {\n    els[i].className = els[i].className.replace('suite hidden', 'suite');\n  }\n}\n\n/**\n * Set an element's text contents.\n *\n * @param {HTMLElement} el\n * @param {string} contents\n */\nfunction text(el, contents) {\n  if (el.textContent) {\n    el.textContent = contents;\n  } else {\n    el.innerText = contents;\n  }\n}\n\n/**\n * Listen on `event` with callback `fn`.\n */\nfunction on(el, event, fn) {\n  if (el.addEventListener) {\n    el.addEventListener(event, fn, false);\n  } else {\n    el.attachEvent('on' + event, fn);\n  }\n}\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"../browser/progress\":3,\"../utils\":36,\"./base\":16,\"escape-string-regexp\":46}],20:[function(require,module,exports){\n'use strict';\n\n// Alias exports to a their normalized format Mocha#reporter to prevent a need\n// for dynamic (try/catch) requires, which Browserify doesn't handle.\nexports.Base = exports.base = require('./base');\nexports.Dot = exports.dot = require('./dot');\nexports.Doc = exports.doc = require('./doc');\nexports.TAP = exports.tap = require('./tap');\nexports.JSON = exports.json = require('./json');\nexports.HTML = exports.html = require('./html');\nexports.List = exports.list = require('./list');\nexports.Min = exports.min = require('./min');\nexports.Spec = exports.spec = require('./spec');\nexports.Nyan = exports.nyan = require('./nyan');\nexports.XUnit = exports.xunit = require('./xunit');\nexports.Markdown = exports.markdown = require('./markdown');\nexports.Progress = exports.progress = require('./progress');\nexports.Landing = exports.landing = require('./landing');\nexports.JSONStream = exports['json-stream'] = require('./json-stream');\n\n},{\"./base\":16,\"./doc\":17,\"./dot\":18,\"./html\":19,\"./json\":22,\"./json-stream\":21,\"./landing\":23,\"./list\":24,\"./markdown\":25,\"./min\":26,\"./nyan\":27,\"./progress\":28,\"./spec\":29,\"./tap\":30,\"./xunit\":31}],21:[function(require,module,exports){\n(function (process){\n'use strict';\n/**\n * @module JSONStream\n */\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\n\n/**\n * Expose `List`.\n */\n\nexports = module.exports = List;\n\n/**\n * Initialize a new `JSONStream` test reporter.\n *\n * @public\n * @name JSONStream\n * @class JSONStream\n * @memberof Mocha.reporters\n * @extends Mocha.reporters.Base\n * @api public\n * @param {Runner} runner\n */\nfunction List(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var total = runner.total;\n\n  runner.on('start', function() {\n    console.log(JSON.stringify(['start', {total: total}]));\n  });\n\n  runner.on('pass', function(test) {\n    console.log(JSON.stringify(['pass', clean(test)]));\n  });\n\n  runner.on('fail', function(test, err) {\n    test = clean(test);\n    test.err = err.message;\n    test.stack = err.stack || null;\n    console.log(JSON.stringify(['fail', test]));\n  });\n\n  runner.once('end', function() {\n    process.stdout.write(JSON.stringify(['end', self.stats]));\n  });\n}\n\n/**\n * Return a plain-object representation of `test`\n * free of cyclic properties etc.\n *\n * @api private\n * @param {Object} test\n * @return {Object}\n */\nfunction clean(test) {\n  return {\n    title: test.title,\n    fullTitle: test.fullTitle(),\n    duration: test.duration,\n    currentRetry: test.currentRetry()\n  };\n}\n\n}).call(this,require('_process'))\n},{\"./base\":16,\"_process\":56}],22:[function(require,module,exports){\n(function (process){\n'use strict';\n/**\n * @module JSON\n */\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\n\n/**\n * Expose `JSON`.\n */\n\nexports = module.exports = JSONReporter;\n\n/**\n * Initialize a new `JSON` reporter.\n *\n * @public\n * @class JSON\n * @memberof Mocha.reporters\n * @extends Mocha.reporters.Base\n * @api public\n * @param {Runner} runner\n */\nfunction JSONReporter(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var tests = [];\n  var pending = [];\n  var failures = [];\n  var passes = [];\n\n  runner.on('test end', function(test) {\n    tests.push(test);\n  });\n\n  runner.on('pass', function(test) {\n    passes.push(test);\n  });\n\n  runner.on('fail', function(test) {\n    failures.push(test);\n  });\n\n  runner.on('pending', function(test) {\n    pending.push(test);\n  });\n\n  runner.once('end', function() {\n    var obj = {\n      stats: self.stats,\n      tests: tests.map(clean),\n      pending: pending.map(clean),\n      failures: failures.map(clean),\n      passes: passes.map(clean)\n    };\n\n    runner.testResults = obj;\n\n    process.stdout.write(JSON.stringify(obj, null, 2));\n  });\n}\n\n/**\n * Return a plain-object representation of `test`\n * free of cyclic properties etc.\n *\n * @api private\n * @param {Object} test\n * @return {Object}\n */\nfunction clean(test) {\n  var err = test.err || {};\n  if (err instanceof Error) {\n    err = errorJSON(err);\n  }\n\n  return {\n    title: test.title,\n    fullTitle: test.fullTitle(),\n    duration: test.duration,\n    currentRetry: test.currentRetry(),\n    err: cleanCycles(err)\n  };\n}\n\n/**\n * Replaces any circular references inside `obj` with '[object Object]'\n *\n * @api private\n * @param {Object} obj\n * @return {Object}\n */\nfunction cleanCycles(obj) {\n  var cache = [];\n  return JSON.parse(\n    JSON.stringify(obj, function(key, value) {\n      if (typeof value === 'object' && value !== null) {\n        if (cache.indexOf(value) !== -1) {\n          // Instead of going in a circle, we'll print [object Object]\n          return '' + value;\n        }\n        cache.push(value);\n      }\n\n      return value;\n    })\n  );\n}\n\n/**\n * Transform an Error object into a JSON object.\n *\n * @api private\n * @param {Error} err\n * @return {Object}\n */\nfunction errorJSON(err) {\n  var res = {};\n  Object.getOwnPropertyNames(err).forEach(function(key) {\n    res[key] = err[key];\n  }, err);\n  return res;\n}\n\n}).call(this,require('_process'))\n},{\"./base\":16,\"_process\":56}],23:[function(require,module,exports){\n(function (process){\n'use strict';\n/**\n * @module Landing\n */\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar cursor = Base.cursor;\nvar color = Base.color;\n\n/**\n * Expose `Landing`.\n */\n\nexports = module.exports = Landing;\n\n/**\n * Airplane color.\n */\n\nBase.colors.plane = 0;\n\n/**\n * Airplane crash color.\n */\n\nBase.colors['plane crash'] = 31;\n\n/**\n * Runway color.\n */\n\nBase.colors.runway = 90;\n\n/**\n * Initialize a new `Landing` reporter.\n *\n * @public\n * @class\n * @memberof Mocha.reporters\n * @extends Mocha.reporters.Base\n * @api public\n * @param {Runner} runner\n */\nfunction Landing(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var width = (Base.window.width * 0.75) | 0;\n  var total = runner.total;\n  var stream = process.stdout;\n  var plane = color('plane', '✈');\n  var crashed = -1;\n  var n = 0;\n\n  function runway() {\n    var buf = Array(width).join('-');\n    return '  ' + color('runway', buf);\n  }\n\n  runner.on('start', function() {\n    stream.write('\\n\\n\\n  ');\n    cursor.hide();\n  });\n\n  runner.on('test end', function(test) {\n    // check if the plane crashed\n    var col = crashed === -1 ? (width * ++n / total) | 0 : crashed;\n\n    // show the crash\n    if (test.state === 'failed') {\n      plane = color('plane crash', '✈');\n      crashed = col;\n    }\n\n    // render landing strip\n    stream.write('\\u001b[' + (width + 1) + 'D\\u001b[2A');\n    stream.write(runway());\n    stream.write('\\n  ');\n    stream.write(color('runway', Array(col).join('⋅')));\n    stream.write(plane);\n    stream.write(color('runway', Array(width - col).join('⋅') + '\\n'));\n    stream.write(runway());\n    stream.write('\\u001b[0m');\n  });\n\n  runner.once('end', function() {\n    cursor.show();\n    console.log();\n    self.epilogue();\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Landing, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":36,\"./base\":16,\"_process\":56}],24:[function(require,module,exports){\n(function (process){\n'use strict';\n/**\n * @module List\n */\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar color = Base.color;\nvar cursor = Base.cursor;\n\n/**\n * Expose `List`.\n */\n\nexports = module.exports = List;\n\n/**\n * Initialize a new `List` test reporter.\n *\n * @public\n * @class\n * @memberof Mocha.reporters\n * @extends Mocha.reporters.Base\n * @api public\n * @param {Runner} runner\n */\nfunction List(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var n = 0;\n\n  runner.on('start', function() {\n    console.log();\n  });\n\n  runner.on('test', function(test) {\n    process.stdout.write(color('pass', '    ' + test.fullTitle() + ': '));\n  });\n\n  runner.on('pending', function(test) {\n    var fmt = color('checkmark', '  -') + color('pending', ' %s');\n    console.log(fmt, test.fullTitle());\n  });\n\n  runner.on('pass', function(test) {\n    var fmt =\n      color('checkmark', '  ' + Base.symbols.ok) +\n      color('pass', ' %s: ') +\n      color(test.speed, '%dms');\n    cursor.CR();\n    console.log(fmt, test.fullTitle(), test.duration);\n  });\n\n  runner.on('fail', function(test) {\n    cursor.CR();\n    console.log(color('fail', '  %d) %s'), ++n, test.fullTitle());\n  });\n\n  runner.once('end', self.epilogue.bind(self));\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(List, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":36,\"./base\":16,\"_process\":56}],25:[function(require,module,exports){\n(function (process){\n'use strict';\n/**\n * @module Markdown\n */\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar utils = require('../utils');\n\n/**\n * Constants\n */\n\nvar SUITE_PREFIX = '$';\n\n/**\n * Expose `Markdown`.\n */\n\nexports = module.exports = Markdown;\n\n/**\n * Initialize a new `Markdown` reporter.\n *\n * @public\n * @class\n * @memberof Mocha.reporters\n * @extends Mocha.reporters.Base\n * @api public\n * @param {Runner} runner\n */\nfunction Markdown(runner) {\n  Base.call(this, runner);\n\n  var level = 0;\n  var buf = '';\n\n  function title(str) {\n    return Array(level).join('#') + ' ' + str;\n  }\n\n  function mapTOC(suite, obj) {\n    var ret = obj;\n    var key = SUITE_PREFIX + suite.title;\n\n    obj = obj[key] = obj[key] || {suite: suite};\n    suite.suites.forEach(function(suite) {\n      mapTOC(suite, obj);\n    });\n\n    return ret;\n  }\n\n  function stringifyTOC(obj, level) {\n    ++level;\n    var buf = '';\n    var link;\n    for (var key in obj) {\n      if (key === 'suite') {\n        continue;\n      }\n      if (key !== SUITE_PREFIX) {\n        link = ' - [' + key.substring(1) + ']';\n        link += '(#' + utils.slug(obj[key].suite.fullTitle()) + ')\\n';\n        buf += Array(level).join('  ') + link;\n      }\n      buf += stringifyTOC(obj[key], level);\n    }\n    return buf;\n  }\n\n  function generateTOC(suite) {\n    var obj = mapTOC(suite, {});\n    return stringifyTOC(obj, 0);\n  }\n\n  generateTOC(runner.suite);\n\n  runner.on('suite', function(suite) {\n    ++level;\n    var slug = utils.slug(suite.fullTitle());\n    buf += '<a name=\"' + slug + '\"></a>' + '\\n';\n    buf += title(suite.title) + '\\n';\n  });\n\n  runner.on('suite end', function() {\n    --level;\n  });\n\n  runner.on('pass', function(test) {\n    var code = utils.clean(test.body);\n    buf += test.title + '.\\n';\n    buf += '\\n```js\\n';\n    buf += code + '\\n';\n    buf += '```\\n\\n';\n  });\n\n  runner.once('end', function() {\n    process.stdout.write('# TOC\\n');\n    process.stdout.write(generateTOC(runner.suite));\n    process.stdout.write(buf);\n  });\n}\n\n}).call(this,require('_process'))\n},{\"../utils\":36,\"./base\":16,\"_process\":56}],26:[function(require,module,exports){\n(function (process){\n'use strict';\n/**\n * @module Min\n */\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\n\n/**\n * Expose `Min`.\n */\n\nexports = module.exports = Min;\n\n/**\n * Initialize a new `Min` minimal test reporter (best used with --watch).\n *\n * @public\n * @class\n * @memberof Mocha.reporters\n * @extends Mocha.reporters.Base\n * @api public\n * @param {Runner} runner\n */\nfunction Min(runner) {\n  Base.call(this, runner);\n\n  runner.on('start', function() {\n    // clear screen\n    process.stdout.write('\\u001b[2J');\n    // set cursor position\n    process.stdout.write('\\u001b[1;3H');\n  });\n\n  runner.once('end', this.epilogue.bind(this));\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Min, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":36,\"./base\":16,\"_process\":56}],27:[function(require,module,exports){\n(function (process){\n'use strict';\n/**\n * @module Nyan\n */\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\n\n/**\n * Expose `Dot`.\n */\n\nexports = module.exports = NyanCat;\n\n/**\n * Initialize a new `Dot` matrix test reporter.\n *\n * @param {Runner} runner\n * @api public\n * @public\n * @class Nyan\n * @memberof Mocha.reporters\n * @extends Mocha.reporters.Base\n */\n\nfunction NyanCat(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var width = (Base.window.width * 0.75) | 0;\n  var nyanCatWidth = (this.nyanCatWidth = 11);\n\n  this.colorIndex = 0;\n  this.numberOfLines = 4;\n  this.rainbowColors = self.generateColors();\n  this.scoreboardWidth = 5;\n  this.tick = 0;\n  this.trajectories = [[], [], [], []];\n  this.trajectoryWidthMax = width - nyanCatWidth;\n\n  runner.on('start', function() {\n    Base.cursor.hide();\n    self.draw();\n  });\n\n  runner.on('pending', function() {\n    self.draw();\n  });\n\n  runner.on('pass', function() {\n    self.draw();\n  });\n\n  runner.on('fail', function() {\n    self.draw();\n  });\n\n  runner.once('end', function() {\n    Base.cursor.show();\n    for (var i = 0; i < self.numberOfLines; i++) {\n      write('\\n');\n    }\n    self.epilogue();\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(NyanCat, Base);\n\n/**\n * Draw the nyan cat\n *\n * @api private\n */\n\nNyanCat.prototype.draw = function() {\n  this.appendRainbow();\n  this.drawScoreboard();\n  this.drawRainbow();\n  this.drawNyanCat();\n  this.tick = !this.tick;\n};\n\n/**\n * Draw the \"scoreboard\" showing the number\n * of passes, failures and pending tests.\n *\n * @api private\n */\n\nNyanCat.prototype.drawScoreboard = function() {\n  var stats = this.stats;\n\n  function draw(type, n) {\n    write(' ');\n    write(Base.color(type, n));\n    write('\\n');\n  }\n\n  draw('green', stats.passes);\n  draw('fail', stats.failures);\n  draw('pending', stats.pending);\n  write('\\n');\n\n  this.cursorUp(this.numberOfLines);\n};\n\n/**\n * Append the rainbow.\n *\n * @api private\n */\n\nNyanCat.prototype.appendRainbow = function() {\n  var segment = this.tick ? '_' : '-';\n  var rainbowified = this.rainbowify(segment);\n\n  for (var index = 0; index < this.numberOfLines; index++) {\n    var trajectory = this.trajectories[index];\n    if (trajectory.length >= this.trajectoryWidthMax) {\n      trajectory.shift();\n    }\n    trajectory.push(rainbowified);\n  }\n};\n\n/**\n * Draw the rainbow.\n *\n * @api private\n */\n\nNyanCat.prototype.drawRainbow = function() {\n  var self = this;\n\n  this.trajectories.forEach(function(line) {\n    write('\\u001b[' + self.scoreboardWidth + 'C');\n    write(line.join(''));\n    write('\\n');\n  });\n\n  this.cursorUp(this.numberOfLines);\n};\n\n/**\n * Draw the nyan cat\n *\n * @api private\n */\nNyanCat.prototype.drawNyanCat = function() {\n  var self = this;\n  var startWidth = this.scoreboardWidth + this.trajectories[0].length;\n  var dist = '\\u001b[' + startWidth + 'C';\n  var padding = '';\n\n  write(dist);\n  write('_,------,');\n  write('\\n');\n\n  write(dist);\n  padding = self.tick ? '  ' : '   ';\n  write('_|' + padding + '/\\\\_/\\\\ ');\n  write('\\n');\n\n  write(dist);\n  padding = self.tick ? '_' : '__';\n  var tail = self.tick ? '~' : '^';\n  write(tail + '|' + padding + this.face() + ' ');\n  write('\\n');\n\n  write(dist);\n  padding = self.tick ? ' ' : '  ';\n  write(padding + '\"\"  \"\" ');\n  write('\\n');\n\n  this.cursorUp(this.numberOfLines);\n};\n\n/**\n * Draw nyan cat face.\n *\n * @api private\n * @return {string}\n */\n\nNyanCat.prototype.face = function() {\n  var stats = this.stats;\n  if (stats.failures) {\n    return '( x .x)';\n  } else if (stats.pending) {\n    return '( o .o)';\n  } else if (stats.passes) {\n    return '( ^ .^)';\n  }\n  return '( - .-)';\n};\n\n/**\n * Move cursor up `n`.\n *\n * @api private\n * @param {number} n\n */\n\nNyanCat.prototype.cursorUp = function(n) {\n  write('\\u001b[' + n + 'A');\n};\n\n/**\n * Move cursor down `n`.\n *\n * @api private\n * @param {number} n\n */\n\nNyanCat.prototype.cursorDown = function(n) {\n  write('\\u001b[' + n + 'B');\n};\n\n/**\n * Generate rainbow colors.\n *\n * @api private\n * @return {Array}\n */\nNyanCat.prototype.generateColors = function() {\n  var colors = [];\n\n  for (var i = 0; i < 6 * 7; i++) {\n    var pi3 = Math.floor(Math.PI / 3);\n    var n = i * (1.0 / 6);\n    var r = Math.floor(3 * Math.sin(n) + 3);\n    var g = Math.floor(3 * Math.sin(n + 2 * pi3) + 3);\n    var b = Math.floor(3 * Math.sin(n + 4 * pi3) + 3);\n    colors.push(36 * r + 6 * g + b + 16);\n  }\n\n  return colors;\n};\n\n/**\n * Apply rainbow to the given `str`.\n *\n * @api private\n * @param {string} str\n * @return {string}\n */\nNyanCat.prototype.rainbowify = function(str) {\n  if (!Base.useColors) {\n    return str;\n  }\n  var color = this.rainbowColors[this.colorIndex % this.rainbowColors.length];\n  this.colorIndex += 1;\n  return '\\u001b[38;5;' + color + 'm' + str + '\\u001b[0m';\n};\n\n/**\n * Stdout helper.\n *\n * @param {string} string A message to write to stdout.\n */\nfunction write(string) {\n  process.stdout.write(string);\n}\n\n}).call(this,require('_process'))\n},{\"../utils\":36,\"./base\":16,\"_process\":56}],28:[function(require,module,exports){\n(function (process){\n'use strict';\n/**\n * @module Progress\n */\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar color = Base.color;\nvar cursor = Base.cursor;\n\n/**\n * Expose `Progress`.\n */\n\nexports = module.exports = Progress;\n\n/**\n * General progress bar color.\n */\n\nBase.colors.progress = 90;\n\n/**\n * Initialize a new `Progress` bar test reporter.\n *\n * @public\n * @class\n * @memberof Mocha.reporters\n * @extends Mocha.reporters.Base\n * @api public\n * @param {Runner} runner\n * @param {Object} options\n */\nfunction Progress(runner, options) {\n  Base.call(this, runner);\n\n  var self = this;\n  var width = (Base.window.width * 0.5) | 0;\n  var total = runner.total;\n  var complete = 0;\n  var lastN = -1;\n\n  // default chars\n  options = options || {};\n  var reporterOptions = options.reporterOptions || {};\n\n  options.open = reporterOptions.open || '[';\n  options.complete = reporterOptions.complete || '▬';\n  options.incomplete = reporterOptions.incomplete || Base.symbols.dot;\n  options.close = reporterOptions.close || ']';\n  options.verbose = reporterOptions.verbose || false;\n\n  // tests started\n  runner.on('start', function() {\n    console.log();\n    cursor.hide();\n  });\n\n  // tests complete\n  runner.on('test end', function() {\n    complete++;\n\n    var percent = complete / total;\n    var n = (width * percent) | 0;\n    var i = width - n;\n\n    if (n === lastN && !options.verbose) {\n      // Don't re-render the line if it hasn't changed\n      return;\n    }\n    lastN = n;\n\n    cursor.CR();\n    process.stdout.write('\\u001b[J');\n    process.stdout.write(color('progress', '  ' + options.open));\n    process.stdout.write(Array(n).join(options.complete));\n    process.stdout.write(Array(i).join(options.incomplete));\n    process.stdout.write(color('progress', options.close));\n    if (options.verbose) {\n      process.stdout.write(color('progress', ' ' + complete + ' of ' + total));\n    }\n  });\n\n  // tests are complete, output some stats\n  // and the failures if any\n  runner.once('end', function() {\n    cursor.show();\n    console.log();\n    self.epilogue();\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Progress, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":36,\"./base\":16,\"_process\":56}],29:[function(require,module,exports){\n'use strict';\n/**\n * @module Spec\n */\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar color = Base.color;\n\n/**\n * Expose `Spec`.\n */\n\nexports = module.exports = Spec;\n\n/**\n * Initialize a new `Spec` test reporter.\n *\n * @public\n * @class\n * @memberof Mocha.reporters\n * @extends Mocha.reporters.Base\n * @api public\n * @param {Runner} runner\n */\nfunction Spec(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var indents = 0;\n  var n = 0;\n\n  function indent() {\n    return Array(indents).join('  ');\n  }\n\n  runner.on('start', function() {\n    console.log();\n  });\n\n  runner.on('suite', function(suite) {\n    ++indents;\n    console.log(color('suite', '%s%s'), indent(), suite.title);\n  });\n\n  runner.on('suite end', function() {\n    --indents;\n    if (indents === 1) {\n      console.log();\n    }\n  });\n\n  runner.on('pending', function(test) {\n    var fmt = indent() + color('pending', '  - %s');\n    console.log(fmt, test.title);\n  });\n\n  runner.on('pass', function(test) {\n    var fmt;\n    if (test.speed === 'fast') {\n      fmt =\n        indent() +\n        color('checkmark', '  ' + Base.symbols.ok) +\n        color('pass', ' %s');\n      console.log(fmt, test.title);\n    } else {\n      fmt =\n        indent() +\n        color('checkmark', '  ' + Base.symbols.ok) +\n        color('pass', ' %s') +\n        color(test.speed, ' (%dms)');\n      console.log(fmt, test.title, test.duration);\n    }\n  });\n\n  runner.on('fail', function(test) {\n    console.log(indent() + color('fail', '  %d) %s'), ++n, test.title);\n  });\n\n  runner.once('end', self.epilogue.bind(self));\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Spec, Base);\n\n},{\"../utils\":36,\"./base\":16}],30:[function(require,module,exports){\n'use strict';\n/**\n * @module TAP\n */\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\n\n/**\n * Expose `TAP`.\n */\n\nexports = module.exports = TAP;\n\n/**\n * Initialize a new `TAP` reporter.\n *\n * @public\n * @class\n * @memberof Mocha.reporters\n * @extends Mocha.reporters.Base\n * @api public\n * @param {Runner} runner\n */\nfunction TAP(runner) {\n  Base.call(this, runner);\n\n  var n = 1;\n  var passes = 0;\n  var failures = 0;\n\n  runner.on('start', function() {\n    var total = runner.grepTotal(runner.suite);\n    console.log('%d..%d', 1, total);\n  });\n\n  runner.on('test end', function() {\n    ++n;\n  });\n\n  runner.on('pending', function(test) {\n    console.log('ok %d %s # SKIP -', n, title(test));\n  });\n\n  runner.on('pass', function(test) {\n    passes++;\n    console.log('ok %d %s', n, title(test));\n  });\n\n  runner.on('fail', function(test, err) {\n    failures++;\n    console.log('not ok %d %s', n, title(test));\n    if (err.stack) {\n      console.log(err.stack.replace(/^/gm, '  '));\n    }\n  });\n\n  runner.once('end', function() {\n    console.log('# tests ' + (passes + failures));\n    console.log('# pass ' + passes);\n    console.log('# fail ' + failures);\n  });\n}\n\n/**\n * Return a TAP-safe title of `test`\n *\n * @api private\n * @param {Object} test\n * @return {String}\n */\nfunction title(test) {\n  return test.fullTitle().replace(/#/g, '');\n}\n\n},{\"./base\":16}],31:[function(require,module,exports){\n(function (process,global){\n'use strict';\n/**\n * @module XUnit\n */\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar utils = require('../utils');\nvar inherits = utils.inherits;\nvar fs = require('fs');\nvar escape = utils.escape;\nvar mkdirp = require('mkdirp');\nvar path = require('path');\n\n/**\n * Save timer references to avoid Sinon interfering (see GH-237).\n */\n\n/* eslint-disable no-unused-vars, no-native-reassign */\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n/* eslint-enable no-unused-vars, no-native-reassign */\n\n/**\n * Expose `XUnit`.\n */\n\nexports = module.exports = XUnit;\n\n/**\n * Initialize a new `XUnit` reporter.\n *\n * @public\n * @class\n * @memberof Mocha.reporters\n * @extends Mocha.reporters.Base\n * @api public\n * @param {Runner} runner\n */\nfunction XUnit(runner, options) {\n  Base.call(this, runner);\n\n  var stats = this.stats;\n  var tests = [];\n  var self = this;\n\n  // the name of the test suite, as it will appear in the resulting XML file\n  var suiteName;\n\n  // the default name of the test suite if none is provided\n  var DEFAULT_SUITE_NAME = 'Mocha Tests';\n\n  if (options && options.reporterOptions) {\n    if (options.reporterOptions.output) {\n      if (!fs.createWriteStream) {\n        throw new Error('file output not supported in browser');\n      }\n\n      mkdirp.sync(path.dirname(options.reporterOptions.output));\n      self.fileStream = fs.createWriteStream(options.reporterOptions.output);\n    }\n\n    // get the suite name from the reporter options (if provided)\n    suiteName = options.reporterOptions.suiteName;\n  }\n\n  // fall back to the default suite name\n  suiteName = suiteName || DEFAULT_SUITE_NAME;\n\n  runner.on('pending', function(test) {\n    tests.push(test);\n  });\n\n  runner.on('pass', function(test) {\n    tests.push(test);\n  });\n\n  runner.on('fail', function(test) {\n    tests.push(test);\n  });\n\n  runner.once('end', function() {\n    self.write(\n      tag(\n        'testsuite',\n        {\n          name: suiteName,\n          tests: stats.tests,\n          failures: stats.failures,\n          errors: stats.failures,\n          skipped: stats.tests - stats.failures - stats.passes,\n          timestamp: new Date().toUTCString(),\n          time: stats.duration / 1000 || 0\n        },\n        false\n      )\n    );\n\n    tests.forEach(function(t) {\n      self.test(t);\n    });\n\n    self.write('</testsuite>');\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(XUnit, Base);\n\n/**\n * Override done to close the stream (if it's a file).\n *\n * @param failures\n * @param {Function} fn\n */\nXUnit.prototype.done = function(failures, fn) {\n  if (this.fileStream) {\n    this.fileStream.end(function() {\n      fn(failures);\n    });\n  } else {\n    fn(failures);\n  }\n};\n\n/**\n * Write out the given line.\n *\n * @param {string} line\n */\nXUnit.prototype.write = function(line) {\n  if (this.fileStream) {\n    this.fileStream.write(line + '\\n');\n  } else if (typeof process === 'object' && process.stdout) {\n    process.stdout.write(line + '\\n');\n  } else {\n    console.log(line);\n  }\n};\n\n/**\n * Output tag for the given `test.`\n *\n * @param {Test} test\n */\nXUnit.prototype.test = function(test) {\n  var attrs = {\n    classname: test.parent.fullTitle(),\n    name: test.title,\n    time: test.duration / 1000 || 0\n  };\n\n  if (test.state === 'failed') {\n    var err = test.err;\n    this.write(\n      tag(\n        'testcase',\n        attrs,\n        false,\n        tag(\n          'failure',\n          {},\n          false,\n          escape(err.message) + '\\n' + escape(err.stack)\n        )\n      )\n    );\n  } else if (test.isPending()) {\n    this.write(tag('testcase', attrs, false, tag('skipped', {}, true)));\n  } else {\n    this.write(tag('testcase', attrs, true));\n  }\n};\n\n/**\n * HTML tag helper.\n *\n * @param name\n * @param attrs\n * @param close\n * @param content\n * @return {string}\n */\nfunction tag(name, attrs, close, content) {\n  var end = close ? '/>' : '>';\n  var pairs = [];\n  var tag;\n\n  for (var key in attrs) {\n    if (Object.prototype.hasOwnProperty.call(attrs, key)) {\n      pairs.push(key + '=\"' + escape(attrs[key]) + '\"');\n    }\n  }\n\n  tag = '<' + name + (pairs.length ? ' ' + pairs.join(' ') : '') + end;\n  if (content) {\n    tag += content + '</' + name + end;\n  }\n  return tag;\n}\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"../utils\":36,\"./base\":16,\"_process\":56,\"fs\":40,\"mkdirp\":53,\"path\":40}],32:[function(require,module,exports){\n(function (global){\n'use strict';\nvar EventEmitter = require('events').EventEmitter;\nvar Pending = require('./pending');\nvar debug = require('debug')('mocha:runnable');\nvar milliseconds = require('./ms');\nvar utils = require('./utils');\n\n/**\n * Save timer references to avoid Sinon interfering (see GH-237).\n */\n\n/* eslint-disable no-unused-vars, no-native-reassign */\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n/* eslint-enable no-unused-vars, no-native-reassign */\n\nvar toString = Object.prototype.toString;\n\nmodule.exports = Runnable;\n\n/**\n * Initialize a new `Runnable` with the given `title` and callback `fn`.  Derived from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)\n *\n * @class\n * @extends EventEmitter\n * @param {String} title\n * @param {Function} fn\n */\nfunction Runnable(title, fn) {\n  this.title = title;\n  this.fn = fn;\n  this.body = (fn || '').toString();\n  this.async = fn && fn.length;\n  this.sync = !this.async;\n  this._timeout = 2000;\n  this._slow = 75;\n  this._enableTimeouts = true;\n  this.timedOut = false;\n  this._retries = -1;\n  this._currentRetry = 0;\n  this.pending = false;\n}\n\n/**\n * Inherit from `EventEmitter.prototype`.\n */\nutils.inherits(Runnable, EventEmitter);\n\n/**\n * Set & get timeout `ms`.\n *\n * @api private\n * @param {number|string} ms\n * @return {Runnable|number} ms or Runnable instance.\n */\nRunnable.prototype.timeout = function(ms) {\n  if (!arguments.length) {\n    return this._timeout;\n  }\n  // see #1652 for reasoning\n  if (ms === 0 || ms > Math.pow(2, 31)) {\n    this._enableTimeouts = false;\n  }\n  if (typeof ms === 'string') {\n    ms = milliseconds(ms);\n  }\n  debug('timeout %d', ms);\n  this._timeout = ms;\n  if (this.timer) {\n    this.resetTimeout();\n  }\n  return this;\n};\n\n/**\n * Set or get slow `ms`.\n *\n * @api private\n * @param {number|string} ms\n * @return {Runnable|number} ms or Runnable instance.\n */\nRunnable.prototype.slow = function(ms) {\n  if (!arguments.length || typeof ms === 'undefined') {\n    return this._slow;\n  }\n  if (typeof ms === 'string') {\n    ms = milliseconds(ms);\n  }\n  debug('slow %d', ms);\n  this._slow = ms;\n  return this;\n};\n\n/**\n * Set and get whether timeout is `enabled`.\n *\n * @api private\n * @param {boolean} enabled\n * @return {Runnable|boolean} enabled or Runnable instance.\n */\nRunnable.prototype.enableTimeouts = function(enabled) {\n  if (!arguments.length) {\n    return this._enableTimeouts;\n  }\n  debug('enableTimeouts %s', enabled);\n  this._enableTimeouts = enabled;\n  return this;\n};\n\n/**\n * Halt and mark as pending.\n *\n * @memberof Mocha.Runnable\n * @public\n * @api public\n */\nRunnable.prototype.skip = function() {\n  throw new Pending('sync skip');\n};\n\n/**\n * Check if this runnable or its parent suite is marked as pending.\n *\n * @api private\n */\nRunnable.prototype.isPending = function() {\n  return this.pending || (this.parent && this.parent.isPending());\n};\n\n/**\n * Return `true` if this Runnable has failed.\n * @return {boolean}\n * @private\n */\nRunnable.prototype.isFailed = function() {\n  return !this.isPending() && this.state === 'failed';\n};\n\n/**\n * Return `true` if this Runnable has passed.\n * @return {boolean}\n * @private\n */\nRunnable.prototype.isPassed = function() {\n  return !this.isPending() && this.state === 'passed';\n};\n\n/**\n * Set or get number of retries.\n *\n * @api private\n */\nRunnable.prototype.retries = function(n) {\n  if (!arguments.length) {\n    return this._retries;\n  }\n  this._retries = n;\n};\n\n/**\n * Set or get current retry\n *\n * @api private\n */\nRunnable.prototype.currentRetry = function(n) {\n  if (!arguments.length) {\n    return this._currentRetry;\n  }\n  this._currentRetry = n;\n};\n\n/**\n * Return the full title generated by recursively concatenating the parent's\n * full title.\n *\n * @memberof Mocha.Runnable\n * @public\n * @api public\n * @return {string}\n */\nRunnable.prototype.fullTitle = function() {\n  return this.titlePath().join(' ');\n};\n\n/**\n * Return the title path generated by concatenating the parent's title path with the title.\n *\n * @memberof Mocha.Runnable\n * @public\n * @api public\n * @return {string}\n */\nRunnable.prototype.titlePath = function() {\n  return this.parent.titlePath().concat([this.title]);\n};\n\n/**\n * Clear the timeout.\n *\n * @api private\n */\nRunnable.prototype.clearTimeout = function() {\n  clearTimeout(this.timer);\n};\n\n/**\n * Inspect the runnable void of private properties.\n *\n * @api private\n * @return {string}\n */\nRunnable.prototype.inspect = function() {\n  return JSON.stringify(\n    this,\n    function(key, val) {\n      if (key[0] === '_') {\n        return;\n      }\n      if (key === 'parent') {\n        return '#<Suite>';\n      }\n      if (key === 'ctx') {\n        return '#<Context>';\n      }\n      return val;\n    },\n    2\n  );\n};\n\n/**\n * Reset the timeout.\n *\n * @api private\n */\nRunnable.prototype.resetTimeout = function() {\n  var self = this;\n  var ms = this.timeout() || 1e9;\n\n  if (!this._enableTimeouts) {\n    return;\n  }\n  this.clearTimeout();\n  this.timer = setTimeout(function() {\n    if (!self._enableTimeouts) {\n      return;\n    }\n    self.callback(self._timeoutError(ms));\n    self.timedOut = true;\n  }, ms);\n};\n\n/**\n * Set or get a list of whitelisted globals for this test run.\n *\n * @api private\n * @param {string[]} globals\n */\nRunnable.prototype.globals = function(globals) {\n  if (!arguments.length) {\n    return this._allowedGlobals;\n  }\n  this._allowedGlobals = globals;\n};\n\n/**\n * Run the test and invoke `fn(err)`.\n *\n * @param {Function} fn\n * @api private\n */\nRunnable.prototype.run = function(fn) {\n  var self = this;\n  var start = new Date();\n  var ctx = this.ctx;\n  var finished;\n  var emitted;\n\n  // Sometimes the ctx exists, but it is not runnable\n  if (ctx && ctx.runnable) {\n    ctx.runnable(this);\n  }\n\n  // called multiple times\n  function multiple(err) {\n    if (emitted) {\n      return;\n    }\n    emitted = true;\n    var msg = 'done() called multiple times';\n    if (err && err.message) {\n      err.message += \" (and Mocha's \" + msg + ')';\n      self.emit('error', err);\n    } else {\n      self.emit('error', new Error(msg));\n    }\n  }\n\n  // finished\n  function done(err) {\n    var ms = self.timeout();\n    if (self.timedOut) {\n      return;\n    }\n\n    if (finished) {\n      return multiple(err);\n    }\n\n    self.clearTimeout();\n    self.duration = new Date() - start;\n    finished = true;\n    if (!err && self.duration > ms && self._enableTimeouts) {\n      err = self._timeoutError(ms);\n    }\n    fn(err);\n  }\n\n  // for .resetTimeout()\n  this.callback = done;\n\n  // explicit async with `done` argument\n  if (this.async) {\n    this.resetTimeout();\n\n    // allows skip() to be used in an explicit async context\n    this.skip = function asyncSkip() {\n      done(new Pending('async skip call'));\n      // halt execution.  the Runnable will be marked pending\n      // by the previous call, and the uncaught handler will ignore\n      // the failure.\n      throw new Pending('async skip; aborting execution');\n    };\n\n    if (this.allowUncaught) {\n      return callFnAsync(this.fn);\n    }\n    try {\n      callFnAsync(this.fn);\n    } catch (err) {\n      emitted = true;\n      done(utils.getError(err));\n    }\n    return;\n  }\n\n  if (this.allowUncaught) {\n    if (this.isPending()) {\n      done();\n    } else {\n      callFn(this.fn);\n    }\n    return;\n  }\n\n  // sync or promise-returning\n  try {\n    if (this.isPending()) {\n      done();\n    } else {\n      callFn(this.fn);\n    }\n  } catch (err) {\n    emitted = true;\n    done(utils.getError(err));\n  }\n\n  function callFn(fn) {\n    var result = fn.call(ctx);\n    if (result && typeof result.then === 'function') {\n      self.resetTimeout();\n      result.then(\n        function() {\n          done();\n          // Return null so libraries like bluebird do not warn about\n          // subsequently constructed Promises.\n          return null;\n        },\n        function(reason) {\n          done(reason || new Error('Promise rejected with no or falsy reason'));\n        }\n      );\n    } else {\n      if (self.asyncOnly) {\n        return done(\n          new Error(\n            '--async-only option in use without declaring `done()` or returning a promise'\n          )\n        );\n      }\n\n      done();\n    }\n  }\n\n  function callFnAsync(fn) {\n    var result = fn.call(ctx, function(err) {\n      if (err instanceof Error || toString.call(err) === '[object Error]') {\n        return done(err);\n      }\n      if (err) {\n        if (Object.prototype.toString.call(err) === '[object Object]') {\n          return done(\n            new Error('done() invoked with non-Error: ' + JSON.stringify(err))\n          );\n        }\n        return done(new Error('done() invoked with non-Error: ' + err));\n      }\n      if (result && utils.isPromise(result)) {\n        return done(\n          new Error(\n            'Resolution method is overspecified. Specify a callback *or* return a Promise; not both.'\n          )\n        );\n      }\n\n      done();\n    });\n  }\n};\n\n/**\n * Instantiates a \"timeout\" error\n *\n * @param {number} ms - Timeout (in milliseconds)\n * @returns {Error} a \"timeout\" error\n * @private\n */\nRunnable.prototype._timeoutError = function(ms) {\n  var msg =\n    'Timeout of ' +\n    ms +\n    'ms exceeded. For async tests and hooks, ensure \"done()\" is called; if returning a Promise, ensure it resolves.';\n  if (this.file) {\n    msg += ' (' + this.file + ')';\n  }\n  return new Error(msg);\n};\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"./ms\":14,\"./pending\":15,\"./utils\":36,\"debug\":43,\"events\":47}],33:[function(require,module,exports){\n(function (process,global){\n'use strict';\n\n/**\n * @module Runner\n */\n/**\n * Module dependencies.\n */\nvar EventEmitter = require('events').EventEmitter;\nvar Pending = require('./pending');\nvar utils = require('./utils');\nvar inherits = utils.inherits;\nvar debug = require('debug')('mocha:runner');\nvar Runnable = require('./runnable');\nvar stackFilter = utils.stackTraceFilter();\nvar stringify = utils.stringify;\nvar type = utils.type;\nvar undefinedError = utils.undefinedError;\n\n/**\n * Non-enumerable globals.\n */\n\nvar globals = [\n  'setTimeout',\n  'clearTimeout',\n  'setInterval',\n  'clearInterval',\n  'XMLHttpRequest',\n  'Date',\n  'setImmediate',\n  'clearImmediate'\n];\n\n/**\n * Expose `Runner`.\n */\n\nmodule.exports = Runner;\n\n/**\n * Initialize a `Runner` for the given `suite`. Derived from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)\n *\n * Events:\n *\n *   - `start`  execution started\n *   - `end`  execution complete\n *   - `suite`  (suite) test suite execution started\n *   - `suite end`  (suite) all tests (and sub-suites) have finished\n *   - `test`  (test) test execution started\n *   - `test end`  (test) test completed\n *   - `hook`  (hook) hook execution started\n *   - `hook end`  (hook) hook complete\n *   - `pass`  (test) test passed\n *   - `fail`  (test, err) test failed\n *   - `pending`  (test) test pending\n *\n * @memberof Mocha\n * @public\n * @class\n * @api public\n * @param {Suite} [suite] Root suite\n * @param {boolean} [delay] Whether or not to delay execution of root suite\n * until ready.\n */\nfunction Runner(suite, delay) {\n  var self = this;\n  this._globals = [];\n  this._abort = false;\n  this._delay = delay;\n  this.suite = suite;\n  this.started = false;\n  this.total = suite.total();\n  this.failures = 0;\n  this.on('test end', function(test) {\n    self.checkGlobals(test);\n  });\n  this.on('hook end', function(hook) {\n    self.checkGlobals(hook);\n  });\n  this._defaultGrep = /.*/;\n  this.grep(this._defaultGrep);\n  this.globals(this.globalProps().concat(extraGlobals()));\n}\n\n/**\n * Wrapper for setImmediate, process.nextTick, or browser polyfill.\n *\n * @param {Function} fn\n * @api private\n */\nRunner.immediately = global.setImmediate || process.nextTick;\n\n/**\n * Inherit from `EventEmitter.prototype`.\n */\ninherits(Runner, EventEmitter);\n\n/**\n * Run tests with full titles matching `re`. Updates runner.total\n * with number of tests matched.\n *\n * @api public\n * @public\n * @memberof Mocha.Runner\n * @param {RegExp} re\n * @param {boolean} invert\n * @return {Runner} Runner instance.\n */\nRunner.prototype.grep = function(re, invert) {\n  debug('grep %s', re);\n  this._grep = re;\n  this._invert = invert;\n  this.total = this.grepTotal(this.suite);\n  return this;\n};\n\n/**\n * Returns the number of tests matching the grep search for the\n * given suite.\n *\n * @memberof Mocha.Runner\n * @api public\n * @public\n * @param {Suite} suite\n * @return {number}\n */\nRunner.prototype.grepTotal = function(suite) {\n  var self = this;\n  var total = 0;\n\n  suite.eachTest(function(test) {\n    var match = self._grep.test(test.fullTitle());\n    if (self._invert) {\n      match = !match;\n    }\n    if (match) {\n      total++;\n    }\n  });\n\n  return total;\n};\n\n/**\n * Return a list of global properties.\n *\n * @return {Array}\n * @api private\n */\nRunner.prototype.globalProps = function() {\n  var props = Object.keys(global);\n\n  // non-enumerables\n  for (var i = 0; i < globals.length; ++i) {\n    if (~props.indexOf(globals[i])) {\n      continue;\n    }\n    props.push(globals[i]);\n  }\n\n  return props;\n};\n\n/**\n * Allow the given `arr` of globals.\n *\n * @api public\n * @public\n * @memberof Mocha.Runner\n * @param {Array} arr\n * @return {Runner} Runner instance.\n */\nRunner.prototype.globals = function(arr) {\n  if (!arguments.length) {\n    return this._globals;\n  }\n  debug('globals %j', arr);\n  this._globals = this._globals.concat(arr);\n  return this;\n};\n\n/**\n * Check for global variable leaks.\n *\n * @api private\n */\nRunner.prototype.checkGlobals = function(test) {\n  if (this.ignoreLeaks) {\n    return;\n  }\n  var ok = this._globals;\n\n  var globals = this.globalProps();\n  var leaks;\n\n  if (test) {\n    ok = ok.concat(test._allowedGlobals || []);\n  }\n\n  if (this.prevGlobalsLength === globals.length) {\n    return;\n  }\n  this.prevGlobalsLength = globals.length;\n\n  leaks = filterLeaks(ok, globals);\n  this._globals = this._globals.concat(leaks);\n\n  if (leaks.length > 1) {\n    this.fail(\n      test,\n      new Error('global leaks detected: ' + leaks.join(', ') + '')\n    );\n  } else if (leaks.length) {\n    this.fail(test, new Error('global leak detected: ' + leaks[0]));\n  }\n};\n\n/**\n * Fail the given `test`.\n *\n * @api private\n * @param {Test} test\n * @param {Error} err\n */\nRunner.prototype.fail = function(test, err) {\n  if (test.isPending()) {\n    return;\n  }\n\n  ++this.failures;\n  test.state = 'failed';\n\n  if (!(err instanceof Error || (err && typeof err.message === 'string'))) {\n    err = new Error(\n      'the ' +\n        type(err) +\n        ' ' +\n        stringify(err) +\n        ' was thrown, throw an Error :)'\n    );\n  }\n\n  try {\n    err.stack =\n      this.fullStackTrace || !err.stack ? err.stack : stackFilter(err.stack);\n  } catch (ignore) {\n    // some environments do not take kindly to monkeying with the stack\n  }\n\n  this.emit('fail', test, err);\n  if (this.suite.bail()) {\n    this.emit('end');\n  }\n};\n\n/**\n * Fail the given `hook` with `err`.\n *\n * Hook failures work in the following pattern:\n * - If bail, then exit\n * - Failed `before` hook skips all tests in a suite and subsuites,\n *   but jumps to corresponding `after` hook\n * - Failed `before each` hook skips remaining tests in a\n *   suite and jumps to corresponding `after each` hook,\n *   which is run only once\n * - Failed `after` hook does not alter\n *   execution order\n * - Failed `after each` hook skips remaining tests in a\n *   suite and subsuites, but executes other `after each`\n *   hooks\n *\n * @api private\n * @param {Hook} hook\n * @param {Error} err\n */\nRunner.prototype.failHook = function(hook, err) {\n  if (hook.ctx && hook.ctx.currentTest) {\n    hook.originalTitle = hook.originalTitle || hook.title;\n    hook.title =\n      hook.originalTitle + ' for \"' + hook.ctx.currentTest.title + '\"';\n  }\n\n  this.fail(hook, err);\n};\n\n/**\n * Run hook `name` callbacks and then invoke `fn()`.\n *\n * @api private\n * @param {string} name\n * @param {Function} fn\n */\n\nRunner.prototype.hook = function(name, fn) {\n  var suite = this.suite;\n  var hooks = suite['_' + name];\n  var self = this;\n\n  function next(i) {\n    var hook = hooks[i];\n    if (!hook) {\n      return fn();\n    }\n    self.currentRunnable = hook;\n\n    hook.ctx.currentTest = self.test;\n\n    self.emit('hook', hook);\n\n    if (!hook.listeners('error').length) {\n      hook.on('error', function(err) {\n        self.failHook(hook, err);\n      });\n    }\n\n    hook.run(function(err) {\n      var testError = hook.error();\n      if (testError) {\n        self.fail(self.test, testError);\n      }\n      if (err) {\n        if (err instanceof Pending) {\n          if (name === 'beforeEach' || name === 'afterEach') {\n            self.test.pending = true;\n          } else {\n            suite.tests.forEach(function(test) {\n              test.pending = true;\n            });\n            // a pending hook won't be executed twice.\n            hook.pending = true;\n          }\n        } else {\n          self.failHook(hook, err);\n\n          // stop executing hooks, notify callee of hook err\n          return fn(err);\n        }\n      }\n      self.emit('hook end', hook);\n      delete hook.ctx.currentTest;\n      next(++i);\n    });\n  }\n\n  Runner.immediately(function() {\n    next(0);\n  });\n};\n\n/**\n * Run hook `name` for the given array of `suites`\n * in order, and callback `fn(err, errSuite)`.\n *\n * @api private\n * @param {string} name\n * @param {Array} suites\n * @param {Function} fn\n */\nRunner.prototype.hooks = function(name, suites, fn) {\n  var self = this;\n  var orig = this.suite;\n\n  function next(suite) {\n    self.suite = suite;\n\n    if (!suite) {\n      self.suite = orig;\n      return fn();\n    }\n\n    self.hook(name, function(err) {\n      if (err) {\n        var errSuite = self.suite;\n        self.suite = orig;\n        return fn(err, errSuite);\n      }\n\n      next(suites.pop());\n    });\n  }\n\n  next(suites.pop());\n};\n\n/**\n * Run hooks from the top level down.\n *\n * @param {String} name\n * @param {Function} fn\n * @api private\n */\nRunner.prototype.hookUp = function(name, fn) {\n  var suites = [this.suite].concat(this.parents()).reverse();\n  this.hooks(name, suites, fn);\n};\n\n/**\n * Run hooks from the bottom up.\n *\n * @param {String} name\n * @param {Function} fn\n * @api private\n */\nRunner.prototype.hookDown = function(name, fn) {\n  var suites = [this.suite].concat(this.parents());\n  this.hooks(name, suites, fn);\n};\n\n/**\n * Return an array of parent Suites from\n * closest to furthest.\n *\n * @return {Array}\n * @api private\n */\nRunner.prototype.parents = function() {\n  var suite = this.suite;\n  var suites = [];\n  while (suite.parent) {\n    suite = suite.parent;\n    suites.push(suite);\n  }\n  return suites;\n};\n\n/**\n * Run the current test and callback `fn(err)`.\n *\n * @param {Function} fn\n * @api private\n */\nRunner.prototype.runTest = function(fn) {\n  var self = this;\n  var test = this.test;\n\n  if (!test) {\n    return;\n  }\n  if (this.forbidOnly && hasOnly(this.parents().reverse()[0] || this.suite)) {\n    fn(new Error('`.only` forbidden'));\n    return;\n  }\n  if (this.asyncOnly) {\n    test.asyncOnly = true;\n  }\n  test.on('error', function(err) {\n    self.fail(test, err);\n  });\n  if (this.allowUncaught) {\n    test.allowUncaught = true;\n    return test.run(fn);\n  }\n  try {\n    test.run(fn);\n  } catch (err) {\n    fn(err);\n  }\n};\n\n/**\n * Run tests in the given `suite` and invoke the callback `fn()` when complete.\n *\n * @api private\n * @param {Suite} suite\n * @param {Function} fn\n */\nRunner.prototype.runTests = function(suite, fn) {\n  var self = this;\n  var tests = suite.tests.slice();\n  var test;\n\n  function hookErr(_, errSuite, after) {\n    // before/after Each hook for errSuite failed:\n    var orig = self.suite;\n\n    // for failed 'after each' hook start from errSuite parent,\n    // otherwise start from errSuite itself\n    self.suite = after ? errSuite.parent : errSuite;\n\n    if (self.suite) {\n      // call hookUp afterEach\n      self.hookUp('afterEach', function(err2, errSuite2) {\n        self.suite = orig;\n        // some hooks may fail even now\n        if (err2) {\n          return hookErr(err2, errSuite2, true);\n        }\n        // report error suite\n        fn(errSuite);\n      });\n    } else {\n      // there is no need calling other 'after each' hooks\n      self.suite = orig;\n      fn(errSuite);\n    }\n  }\n\n  function next(err, errSuite) {\n    // if we bail after first err\n    if (self.failures && suite._bail) {\n      return fn();\n    }\n\n    if (self._abort) {\n      return fn();\n    }\n\n    if (err) {\n      return hookErr(err, errSuite, true);\n    }\n\n    // next test\n    test = tests.shift();\n\n    // all done\n    if (!test) {\n      return fn();\n    }\n\n    // grep\n    var match = self._grep.test(test.fullTitle());\n    if (self._invert) {\n      match = !match;\n    }\n    if (!match) {\n      // Run immediately only if we have defined a grep. When we\n      // define a grep — It can cause maximum callstack error if\n      // the grep is doing a large recursive loop by neglecting\n      // all tests. The run immediately function also comes with\n      // a performance cost. So we don't want to run immediately\n      // if we run the whole test suite, because running the whole\n      // test suite don't do any immediate recursive loops. Thus,\n      // allowing a JS runtime to breathe.\n      if (self._grep !== self._defaultGrep) {\n        Runner.immediately(next);\n      } else {\n        next();\n      }\n      return;\n    }\n\n    if (test.isPending()) {\n      if (self.forbidPending) {\n        test.isPending = alwaysFalse;\n        self.fail(test, new Error('Pending test forbidden'));\n        delete test.isPending;\n      } else {\n        self.emit('pending', test);\n      }\n      self.emit('test end', test);\n      return next();\n    }\n\n    // execute test and hook(s)\n    self.emit('test', (self.test = test));\n    self.hookDown('beforeEach', function(err, errSuite) {\n      if (test.isPending()) {\n        if (self.forbidPending) {\n          test.isPending = alwaysFalse;\n          self.fail(test, new Error('Pending test forbidden'));\n          delete test.isPending;\n        } else {\n          self.emit('pending', test);\n        }\n        self.emit('test end', test);\n        return next();\n      }\n      if (err) {\n        return hookErr(err, errSuite, false);\n      }\n      self.currentRunnable = self.test;\n      self.runTest(function(err) {\n        test = self.test;\n        if (err) {\n          var retry = test.currentRetry();\n          if (err instanceof Pending && self.forbidPending) {\n            self.fail(test, new Error('Pending test forbidden'));\n          } else if (err instanceof Pending) {\n            test.pending = true;\n            self.emit('pending', test);\n          } else if (retry < test.retries()) {\n            var clonedTest = test.clone();\n            clonedTest.currentRetry(retry + 1);\n            tests.unshift(clonedTest);\n\n            // Early return + hook trigger so that it doesn't\n            // increment the count wrong\n            return self.hookUp('afterEach', next);\n          } else {\n            self.fail(test, err);\n          }\n          self.emit('test end', test);\n\n          if (err instanceof Pending) {\n            return next();\n          }\n\n          return self.hookUp('afterEach', next);\n        }\n\n        test.state = 'passed';\n        self.emit('pass', test);\n        self.emit('test end', test);\n        self.hookUp('afterEach', next);\n      });\n    });\n  }\n\n  this.next = next;\n  this.hookErr = hookErr;\n  next();\n};\n\nfunction alwaysFalse() {\n  return false;\n}\n\n/**\n * Run the given `suite` and invoke the callback `fn()` when complete.\n *\n * @api private\n * @param {Suite} suite\n * @param {Function} fn\n */\nRunner.prototype.runSuite = function(suite, fn) {\n  var i = 0;\n  var self = this;\n  var total = this.grepTotal(suite);\n  var afterAllHookCalled = false;\n\n  debug('run suite %s', suite.fullTitle());\n\n  if (!total || (self.failures && suite._bail)) {\n    return fn();\n  }\n\n  this.emit('suite', (this.suite = suite));\n\n  function next(errSuite) {\n    if (errSuite) {\n      // current suite failed on a hook from errSuite\n      if (errSuite === suite) {\n        // if errSuite is current suite\n        // continue to the next sibling suite\n        return done();\n      }\n      // errSuite is among the parents of current suite\n      // stop execution of errSuite and all sub-suites\n      return done(errSuite);\n    }\n\n    if (self._abort) {\n      return done();\n    }\n\n    var curr = suite.suites[i++];\n    if (!curr) {\n      return done();\n    }\n\n    // Avoid grep neglecting large number of tests causing a\n    // huge recursive loop and thus a maximum call stack error.\n    // See comment in `this.runTests()` for more information.\n    if (self._grep !== self._defaultGrep) {\n      Runner.immediately(function() {\n        self.runSuite(curr, next);\n      });\n    } else {\n      self.runSuite(curr, next);\n    }\n  }\n\n  function done(errSuite) {\n    self.suite = suite;\n    self.nextSuite = next;\n\n    if (afterAllHookCalled) {\n      fn(errSuite);\n    } else {\n      // mark that the afterAll block has been called once\n      // and so can be skipped if there is an error in it.\n      afterAllHookCalled = true;\n\n      // remove reference to test\n      delete self.test;\n\n      self.hook('afterAll', function() {\n        self.emit('suite end', suite);\n        fn(errSuite);\n      });\n    }\n  }\n\n  this.nextSuite = next;\n\n  this.hook('beforeAll', function(err) {\n    if (err) {\n      return done();\n    }\n    self.runTests(suite, next);\n  });\n};\n\n/**\n * Handle uncaught exceptions.\n *\n * @param {Error} err\n * @api private\n */\nRunner.prototype.uncaught = function(err) {\n  if (err) {\n    debug(\n      'uncaught exception %s',\n      err ===\n      function() {\n        return this;\n      }.call(err)\n        ? err.message || err\n        : err\n    );\n  } else {\n    debug('uncaught undefined exception');\n    err = undefinedError();\n  }\n  err.uncaught = true;\n\n  var runnable = this.currentRunnable;\n\n  if (!runnable) {\n    runnable = new Runnable('Uncaught error outside test suite');\n    runnable.parent = this.suite;\n\n    if (this.started) {\n      this.fail(runnable, err);\n    } else {\n      // Can't recover from this failure\n      this.emit('start');\n      this.fail(runnable, err);\n      this.emit('end');\n    }\n\n    return;\n  }\n\n  runnable.clearTimeout();\n\n  // Ignore errors if already failed or pending\n  // See #3226\n  if (runnable.isFailed() || runnable.isPending()) {\n    return;\n  }\n  // we cannot recover gracefully if a Runnable has already passed\n  // then fails asynchronously\n  var alreadyPassed = runnable.isPassed();\n  // this will change the state to \"failed\" regardless of the current value\n  this.fail(runnable, err);\n  if (!alreadyPassed) {\n    // recover from test\n    if (runnable.type === 'test') {\n      this.emit('test end', runnable);\n      this.hookUp('afterEach', this.next);\n      return;\n    }\n\n    // recover from hooks\n    var errSuite = this.suite;\n    // if hook failure is in afterEach block\n    if (runnable.fullTitle().indexOf('after each') > -1) {\n      return this.hookErr(err, errSuite, true);\n    }\n    // if hook failure is in beforeEach block\n    if (runnable.fullTitle().indexOf('before each') > -1) {\n      return this.hookErr(err, errSuite, false);\n    }\n    // if hook failure is in after or before blocks\n    return this.nextSuite(errSuite);\n  }\n\n  // bail\n  this.emit('end');\n};\n\n/**\n * Cleans up the references to all the deferred functions\n * (before/after/beforeEach/afterEach) and tests of a Suite.\n * These must be deleted otherwise a memory leak can happen,\n * as those functions may reference variables from closures,\n * thus those variables can never be garbage collected as long\n * as the deferred functions exist.\n *\n * @param {Suite} suite\n */\nfunction cleanSuiteReferences(suite) {\n  function cleanArrReferences(arr) {\n    for (var i = 0; i < arr.length; i++) {\n      delete arr[i].fn;\n    }\n  }\n\n  if (Array.isArray(suite._beforeAll)) {\n    cleanArrReferences(suite._beforeAll);\n  }\n\n  if (Array.isArray(suite._beforeEach)) {\n    cleanArrReferences(suite._beforeEach);\n  }\n\n  if (Array.isArray(suite._afterAll)) {\n    cleanArrReferences(suite._afterAll);\n  }\n\n  if (Array.isArray(suite._afterEach)) {\n    cleanArrReferences(suite._afterEach);\n  }\n\n  for (var i = 0; i < suite.tests.length; i++) {\n    delete suite.tests[i].fn;\n  }\n}\n\n/**\n * Run the root suite and invoke `fn(failures)`\n * on completion.\n *\n * @api public\n * @public\n * @memberof Mocha.Runner\n * @param {Function} fn\n * @return {Runner} Runner instance.\n */\nRunner.prototype.run = function(fn) {\n  var self = this;\n  var rootSuite = this.suite;\n\n  fn = fn || function() {};\n\n  function uncaught(err) {\n    self.uncaught(err);\n  }\n\n  function start() {\n    // If there is an `only` filter\n    if (hasOnly(rootSuite)) {\n      filterOnly(rootSuite);\n    }\n    self.started = true;\n    self.emit('start');\n    self.runSuite(rootSuite, function() {\n      debug('finished running');\n      self.emit('end');\n    });\n  }\n\n  debug('start');\n\n  // references cleanup to avoid memory leaks\n  this.on('suite end', cleanSuiteReferences);\n\n  // callback\n  this.on('end', function() {\n    debug('end');\n    process.removeListener('uncaughtException', uncaught);\n    fn(self.failures);\n  });\n\n  // uncaught exception\n  process.on('uncaughtException', uncaught);\n\n  if (this._delay) {\n    // for reporters, I guess.\n    // might be nice to debounce some dots while we wait.\n    this.emit('waiting', rootSuite);\n    rootSuite.once('run', start);\n  } else {\n    start();\n  }\n\n  return this;\n};\n\n/**\n * Cleanly abort execution.\n *\n * @memberof Mocha.Runner\n * @public\n * @api public\n * @return {Runner} Runner instance.\n */\nRunner.prototype.abort = function() {\n  debug('aborting');\n  this._abort = true;\n\n  return this;\n};\n\n/**\n * Filter suites based on `isOnly` logic.\n *\n * @param {Array} suite\n * @returns {Boolean}\n * @api private\n */\nfunction filterOnly(suite) {\n  if (suite._onlyTests.length) {\n    // If the suite contains `only` tests, run those and ignore any nested suites.\n    suite.tests = suite._onlyTests;\n    suite.suites = [];\n  } else {\n    // Otherwise, do not run any of the tests in this suite.\n    suite.tests = [];\n    suite._onlySuites.forEach(function(onlySuite) {\n      // If there are other `only` tests/suites nested in the current `only` suite, then filter that `only` suite.\n      // Otherwise, all of the tests on this `only` suite should be run, so don't filter it.\n      if (hasOnly(onlySuite)) {\n        filterOnly(onlySuite);\n      }\n    });\n    // Run the `only` suites, as well as any other suites that have `only` tests/suites as descendants.\n    suite.suites = suite.suites.filter(function(childSuite) {\n      return (\n        suite._onlySuites.indexOf(childSuite) !== -1 || filterOnly(childSuite)\n      );\n    });\n  }\n  // Keep the suite only if there is something to run\n  return suite.tests.length || suite.suites.length;\n}\n\n/**\n * Determines whether a suite has an `only` test or suite as a descendant.\n *\n * @param {Array} suite\n * @returns {Boolean}\n * @api private\n */\nfunction hasOnly(suite) {\n  return (\n    suite._onlyTests.length ||\n    suite._onlySuites.length ||\n    suite.suites.some(hasOnly)\n  );\n}\n\n/**\n * Filter leaks with the given globals flagged as `ok`.\n *\n * @api private\n * @param {Array} ok\n * @param {Array} globals\n * @return {Array}\n */\nfunction filterLeaks(ok, globals) {\n  return globals.filter(function(key) {\n    // Firefox and Chrome exposes iframes as index inside the window object\n    if (/^\\d+/.test(key)) {\n      return false;\n    }\n\n    // in firefox\n    // if runner runs in an iframe, this iframe's window.getInterface method\n    // not init at first it is assigned in some seconds\n    if (global.navigator && /^getInterface/.test(key)) {\n      return false;\n    }\n\n    // an iframe could be approached by window[iframeIndex]\n    // in ie6,7,8 and opera, iframeIndex is enumerable, this could cause leak\n    if (global.navigator && /^\\d+/.test(key)) {\n      return false;\n    }\n\n    // Opera and IE expose global variables for HTML element IDs (issue #243)\n    if (/^mocha-/.test(key)) {\n      return false;\n    }\n\n    var matched = ok.filter(function(ok) {\n      if (~ok.indexOf('*')) {\n        return key.indexOf(ok.split('*')[0]) === 0;\n      }\n      return key === ok;\n    });\n    return !matched.length && (!global.navigator || key !== 'onerror');\n  });\n}\n\n/**\n * Array of globals dependent on the environment.\n *\n * @return {Array}\n * @api private\n */\nfunction extraGlobals() {\n  if (typeof process === 'object' && typeof process.version === 'string') {\n    var parts = process.version.split('.');\n    var nodeVersion = parts.reduce(function(a, v) {\n      return (a << 8) | v;\n    });\n\n    // 'errno' was renamed to process._errno in v0.9.11.\n\n    if (nodeVersion < 0x00090b) {\n      return ['errno'];\n    }\n  }\n\n  return [];\n}\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"./pending\":15,\"./runnable\":32,\"./utils\":36,\"_process\":56,\"debug\":43,\"events\":47}],34:[function(require,module,exports){\n'use strict';\n/**\n * @module Suite\n */\n\n/**\n * Module dependencies.\n */\nvar EventEmitter = require('events').EventEmitter;\nvar Hook = require('./hook');\nvar utils = require('./utils');\nvar inherits = utils.inherits;\nvar debug = require('debug')('mocha:suite');\nvar milliseconds = require('./ms');\n\n/**\n * Expose `Suite`.\n */\n\nexports = module.exports = Suite;\n\n/**\n * Create a new `Suite` with the given `title` and parent `Suite`. When a suite\n * with the same title is already present, that suite is returned to provide\n * nicer reporter and more flexible meta-testing.\n *\n * @memberof Mocha\n * @public\n * @api public\n * @param {Suite} parent\n * @param {string} title\n * @return {Suite}\n */\nexports.create = function(parent, title) {\n  var suite = new Suite(title, parent.ctx);\n  suite.parent = parent;\n  title = suite.fullTitle();\n  parent.addSuite(suite);\n  return suite;\n};\n\n/**\n * Initialize a new `Suite` with the given `title` and `ctx`. Derived from [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)\n *\n * @memberof Mocha\n * @public\n * @class\n * @param {string} title\n * @param {Context} parentContext\n */\nfunction Suite(title, parentContext) {\n  if (!utils.isString(title)) {\n    throw new Error(\n      'Suite `title` should be a \"string\" but \"' +\n        typeof title +\n        '\" was given instead.'\n    );\n  }\n  this.title = title;\n  function Context() {}\n  Context.prototype = parentContext;\n  this.ctx = new Context();\n  this.suites = [];\n  this.tests = [];\n  this.pending = false;\n  this._beforeEach = [];\n  this._beforeAll = [];\n  this._afterEach = [];\n  this._afterAll = [];\n  this.root = !title;\n  this._timeout = 2000;\n  this._enableTimeouts = true;\n  this._slow = 75;\n  this._bail = false;\n  this._retries = -1;\n  this._onlyTests = [];\n  this._onlySuites = [];\n  this.delayed = false;\n}\n\n/**\n * Inherit from `EventEmitter.prototype`.\n */\ninherits(Suite, EventEmitter);\n\n/**\n * Return a clone of this `Suite`.\n *\n * @api private\n * @return {Suite}\n */\nSuite.prototype.clone = function() {\n  var suite = new Suite(this.title);\n  debug('clone');\n  suite.ctx = this.ctx;\n  suite.timeout(this.timeout());\n  suite.retries(this.retries());\n  suite.enableTimeouts(this.enableTimeouts());\n  suite.slow(this.slow());\n  suite.bail(this.bail());\n  return suite;\n};\n\n/**\n * Set or get timeout `ms` or short-hand such as \"2s\".\n *\n * @api private\n * @param {number|string} ms\n * @return {Suite|number} for chaining\n */\nSuite.prototype.timeout = function(ms) {\n  if (!arguments.length) {\n    return this._timeout;\n  }\n  if (ms.toString() === '0') {\n    this._enableTimeouts = false;\n  }\n  if (typeof ms === 'string') {\n    ms = milliseconds(ms);\n  }\n  debug('timeout %d', ms);\n  this._timeout = parseInt(ms, 10);\n  return this;\n};\n\n/**\n * Set or get number of times to retry a failed test.\n *\n * @api private\n * @param {number|string} n\n * @return {Suite|number} for chaining\n */\nSuite.prototype.retries = function(n) {\n  if (!arguments.length) {\n    return this._retries;\n  }\n  debug('retries %d', n);\n  this._retries = parseInt(n, 10) || 0;\n  return this;\n};\n\n/**\n * Set or get timeout to `enabled`.\n *\n * @api private\n * @param {boolean} enabled\n * @return {Suite|boolean} self or enabled\n */\nSuite.prototype.enableTimeouts = function(enabled) {\n  if (!arguments.length) {\n    return this._enableTimeouts;\n  }\n  debug('enableTimeouts %s', enabled);\n  this._enableTimeouts = enabled;\n  return this;\n};\n\n/**\n * Set or get slow `ms` or short-hand such as \"2s\".\n *\n * @api private\n * @param {number|string} ms\n * @return {Suite|number} for chaining\n */\nSuite.prototype.slow = function(ms) {\n  if (!arguments.length) {\n    return this._slow;\n  }\n  if (typeof ms === 'string') {\n    ms = milliseconds(ms);\n  }\n  debug('slow %d', ms);\n  this._slow = ms;\n  return this;\n};\n\n/**\n * Set or get whether to bail after first error.\n *\n * @api private\n * @param {boolean} bail\n * @return {Suite|number} for chaining\n */\nSuite.prototype.bail = function(bail) {\n  if (!arguments.length) {\n    return this._bail;\n  }\n  debug('bail %s', bail);\n  this._bail = bail;\n  return this;\n};\n\n/**\n * Check if this suite or its parent suite is marked as pending.\n *\n * @api private\n */\nSuite.prototype.isPending = function() {\n  return this.pending || (this.parent && this.parent.isPending());\n};\n\n/**\n * Generic hook-creator.\n * @private\n * @param {string} title - Title of hook\n * @param {Function} fn - Hook callback\n * @returns {Hook} A new hook\n */\nSuite.prototype._createHook = function(title, fn) {\n  var hook = new Hook(title, fn);\n  hook.parent = this;\n  hook.timeout(this.timeout());\n  hook.retries(this.retries());\n  hook.enableTimeouts(this.enableTimeouts());\n  hook.slow(this.slow());\n  hook.ctx = this.ctx;\n  hook.file = this.file;\n  return hook;\n};\n\n/**\n * Run `fn(test[, done])` before running tests.\n *\n * @api private\n * @param {string} title\n * @param {Function} fn\n * @return {Suite} for chaining\n */\nSuite.prototype.beforeAll = function(title, fn) {\n  if (this.isPending()) {\n    return this;\n  }\n  if (typeof title === 'function') {\n    fn = title;\n    title = fn.name;\n  }\n  title = '\"before all\" hook' + (title ? ': ' + title : '');\n\n  var hook = this._createHook(title, fn);\n  this._beforeAll.push(hook);\n  this.emit('beforeAll', hook);\n  return this;\n};\n\n/**\n * Run `fn(test[, done])` after running tests.\n *\n * @api private\n * @param {string} title\n * @param {Function} fn\n * @return {Suite} for chaining\n */\nSuite.prototype.afterAll = function(title, fn) {\n  if (this.isPending()) {\n    return this;\n  }\n  if (typeof title === 'function') {\n    fn = title;\n    title = fn.name;\n  }\n  title = '\"after all\" hook' + (title ? ': ' + title : '');\n\n  var hook = this._createHook(title, fn);\n  this._afterAll.push(hook);\n  this.emit('afterAll', hook);\n  return this;\n};\n\n/**\n * Run `fn(test[, done])` before each test case.\n *\n * @api private\n * @param {string} title\n * @param {Function} fn\n * @return {Suite} for chaining\n */\nSuite.prototype.beforeEach = function(title, fn) {\n  if (this.isPending()) {\n    return this;\n  }\n  if (typeof title === 'function') {\n    fn = title;\n    title = fn.name;\n  }\n  title = '\"before each\" hook' + (title ? ': ' + title : '');\n\n  var hook = this._createHook(title, fn);\n  this._beforeEach.push(hook);\n  this.emit('beforeEach', hook);\n  return this;\n};\n\n/**\n * Run `fn(test[, done])` after each test case.\n *\n * @api private\n * @param {string} title\n * @param {Function} fn\n * @return {Suite} for chaining\n */\nSuite.prototype.afterEach = function(title, fn) {\n  if (this.isPending()) {\n    return this;\n  }\n  if (typeof title === 'function') {\n    fn = title;\n    title = fn.name;\n  }\n  title = '\"after each\" hook' + (title ? ': ' + title : '');\n\n  var hook = this._createHook(title, fn);\n  this._afterEach.push(hook);\n  this.emit('afterEach', hook);\n  return this;\n};\n\n/**\n * Add a test `suite`.\n *\n * @api private\n * @param {Suite} suite\n * @return {Suite} for chaining\n */\nSuite.prototype.addSuite = function(suite) {\n  suite.parent = this;\n  suite.timeout(this.timeout());\n  suite.retries(this.retries());\n  suite.enableTimeouts(this.enableTimeouts());\n  suite.slow(this.slow());\n  suite.bail(this.bail());\n  this.suites.push(suite);\n  this.emit('suite', suite);\n  return this;\n};\n\n/**\n * Add a `test` to this suite.\n *\n * @api private\n * @param {Test} test\n * @return {Suite} for chaining\n */\nSuite.prototype.addTest = function(test) {\n  test.parent = this;\n  test.timeout(this.timeout());\n  test.retries(this.retries());\n  test.enableTimeouts(this.enableTimeouts());\n  test.slow(this.slow());\n  test.ctx = this.ctx;\n  this.tests.push(test);\n  this.emit('test', test);\n  return this;\n};\n\n/**\n * Return the full title generated by recursively concatenating the parent's\n * full title.\n *\n * @memberof Mocha.Suite\n * @public\n * @api public\n * @return {string}\n */\nSuite.prototype.fullTitle = function() {\n  return this.titlePath().join(' ');\n};\n\n/**\n * Return the title path generated by recursively concatenating the parent's\n * title path.\n *\n * @memberof Mocha.Suite\n * @public\n * @api public\n * @return {string}\n */\nSuite.prototype.titlePath = function() {\n  var result = [];\n  if (this.parent) {\n    result = result.concat(this.parent.titlePath());\n  }\n  if (!this.root) {\n    result.push(this.title);\n  }\n  return result;\n};\n\n/**\n * Return the total number of tests.\n *\n * @memberof Mocha.Suite\n * @public\n * @api public\n * @return {number}\n */\nSuite.prototype.total = function() {\n  return (\n    this.suites.reduce(function(sum, suite) {\n      return sum + suite.total();\n    }, 0) + this.tests.length\n  );\n};\n\n/**\n * Iterates through each suite recursively to find all tests. Applies a\n * function in the format `fn(test)`.\n *\n * @api private\n * @param {Function} fn\n * @return {Suite}\n */\nSuite.prototype.eachTest = function(fn) {\n  this.tests.forEach(fn);\n  this.suites.forEach(function(suite) {\n    suite.eachTest(fn);\n  });\n  return this;\n};\n\n/**\n * This will run the root suite if we happen to be running in delayed mode.\n */\nSuite.prototype.run = function run() {\n  if (this.root) {\n    this.emit('run');\n  }\n};\n\n},{\"./hook\":6,\"./ms\":14,\"./utils\":36,\"debug\":43,\"events\":47}],35:[function(require,module,exports){\n'use strict';\nvar Runnable = require('./runnable');\nvar utils = require('./utils');\nvar isString = utils.isString;\n\nmodule.exports = Test;\n\n/**\n * Initialize a new `Test` with the given `title` and callback `fn`.\n *\n * @class\n * @extends Runnable\n * @param {String} title\n * @param {Function} fn\n */\nfunction Test(title, fn) {\n  if (!isString(title)) {\n    throw new Error(\n      'Test `title` should be a \"string\" but \"' +\n        typeof title +\n        '\" was given instead.'\n    );\n  }\n  Runnable.call(this, title, fn);\n  this.pending = !fn;\n  this.type = 'test';\n}\n\n/**\n * Inherit from `Runnable.prototype`.\n */\nutils.inherits(Test, Runnable);\n\nTest.prototype.clone = function() {\n  var test = new Test(this.title, this.fn);\n  test.timeout(this.timeout());\n  test.slow(this.slow());\n  test.enableTimeouts(this.enableTimeouts());\n  test.retries(this.retries());\n  test.currentRetry(this.currentRetry());\n  test.globals(this.globals());\n  test.parent = this.parent;\n  test.file = this.file;\n  test.ctx = this.ctx;\n  return test;\n};\n\n},{\"./runnable\":32,\"./utils\":36}],36:[function(require,module,exports){\n(function (process,Buffer){\n'use strict';\n\n/**\n * @module\n */\n\n/**\n * Module dependencies.\n */\n\nvar debug = require('debug')('mocha:watch');\nvar fs = require('fs');\nvar glob = require('glob');\nvar path = require('path');\nvar join = path.join;\nvar he = require('he');\n\n/**\n * Ignored directories.\n */\n\nvar ignore = ['node_modules', '.git'];\n\nexports.inherits = require('util').inherits;\n\n/**\n * Escape special characters in the given string of html.\n *\n * @api private\n * @param  {string} html\n * @return {string}\n */\nexports.escape = function(html) {\n  return he.encode(String(html), {useNamedReferences: false});\n};\n\n/**\n * Test if the given obj is type of string.\n *\n * @api private\n * @param {Object} obj\n * @return {boolean}\n */\nexports.isString = function(obj) {\n  return typeof obj === 'string';\n};\n\n/**\n * Watch the given `files` for changes\n * and invoke `fn(file)` on modification.\n *\n * @api private\n * @param {Array} files\n * @param {Function} fn\n */\nexports.watch = function(files, fn) {\n  var options = {interval: 100};\n  files.forEach(function(file) {\n    debug('file %s', file);\n    fs.watchFile(file, options, function(curr, prev) {\n      if (prev.mtime < curr.mtime) {\n        fn(file);\n      }\n    });\n  });\n};\n\n/**\n * Ignored files.\n *\n * @api private\n * @param {string} path\n * @return {boolean}\n */\nfunction ignored(path) {\n  return !~ignore.indexOf(path);\n}\n\n/**\n * Lookup files in the given `dir`.\n *\n * @api private\n * @param {string} dir\n * @param {string[]} [ext=['.js']]\n * @param {Array} [ret=[]]\n * @return {Array}\n */\nexports.files = function(dir, ext, ret) {\n  ret = ret || [];\n  ext = ext || ['js'];\n\n  var re = new RegExp('\\\\.(' + ext.join('|') + ')$');\n\n  fs\n    .readdirSync(dir)\n    .filter(ignored)\n    .forEach(function(path) {\n      path = join(dir, path);\n      if (fs.lstatSync(path).isDirectory()) {\n        exports.files(path, ext, ret);\n      } else if (path.match(re)) {\n        ret.push(path);\n      }\n    });\n\n  return ret;\n};\n\n/**\n * Compute a slug from the given `str`.\n *\n * @api private\n * @param {string} str\n * @return {string}\n */\nexports.slug = function(str) {\n  return str\n    .toLowerCase()\n    .replace(/ +/g, '-')\n    .replace(/[^-\\w]/g, '');\n};\n\n/**\n * Strip the function definition from `str`, and re-indent for pre whitespace.\n *\n * @param {string} str\n * @return {string}\n */\nexports.clean = function(str) {\n  str = str\n    .replace(/\\r\\n?|[\\n\\u2028\\u2029]/g, '\\n')\n    .replace(/^\\uFEFF/, '')\n    // (traditional)->  space/name     parameters    body     (lambda)-> parameters       body   multi-statement/single          keep body content\n    .replace(\n      /^function(?:\\s*|\\s+[^(]*)\\([^)]*\\)\\s*\\{((?:.|\\n)*?)\\s*\\}$|^\\([^)]*\\)\\s*=>\\s*(?:\\{((?:.|\\n)*?)\\s*\\}|((?:.|\\n)*))$/,\n      '$1$2$3'\n    );\n\n  var spaces = str.match(/^\\n?( *)/)[1].length;\n  var tabs = str.match(/^\\n?(\\t*)/)[1].length;\n  var re = new RegExp(\n    '^\\n?' + (tabs ? '\\t' : ' ') + '{' + (tabs || spaces) + '}',\n    'gm'\n  );\n\n  str = str.replace(re, '');\n\n  return str.trim();\n};\n\n/**\n * Parse the given `qs`.\n *\n * @api private\n * @param {string} qs\n * @return {Object}\n */\nexports.parseQuery = function(qs) {\n  return qs\n    .replace('?', '')\n    .split('&')\n    .reduce(function(obj, pair) {\n      var i = pair.indexOf('=');\n      var key = pair.slice(0, i);\n      var val = pair.slice(++i);\n\n      // Due to how the URLSearchParams API treats spaces\n      obj[key] = decodeURIComponent(val.replace(/\\+/g, '%20'));\n\n      return obj;\n    }, {});\n};\n\n/**\n * Highlight the given string of `js`.\n *\n * @api private\n * @param {string} js\n * @return {string}\n */\nfunction highlight(js) {\n  return js\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;')\n    .replace(/\\/\\/(.*)/gm, '<span class=\"comment\">//$1</span>')\n    .replace(/('.*?')/gm, '<span class=\"string\">$1</span>')\n    .replace(/(\\d+\\.\\d+)/gm, '<span class=\"number\">$1</span>')\n    .replace(/(\\d+)/gm, '<span class=\"number\">$1</span>')\n    .replace(\n      /\\bnew[ \\t]+(\\w+)/gm,\n      '<span class=\"keyword\">new</span> <span class=\"init\">$1</span>'\n    )\n    .replace(\n      /\\b(function|new|throw|return|var|if|else)\\b/gm,\n      '<span class=\"keyword\">$1</span>'\n    );\n}\n\n/**\n * Highlight the contents of tag `name`.\n *\n * @api private\n * @param {string} name\n */\nexports.highlightTags = function(name) {\n  var code = document.getElementById('mocha').getElementsByTagName(name);\n  for (var i = 0, len = code.length; i < len; ++i) {\n    code[i].innerHTML = highlight(code[i].innerHTML);\n  }\n};\n\n/**\n * If a value could have properties, and has none, this function is called,\n * which returns a string representation of the empty value.\n *\n * Functions w/ no properties return `'[Function]'`\n * Arrays w/ length === 0 return `'[]'`\n * Objects w/ no properties return `'{}'`\n * All else: return result of `value.toString()`\n *\n * @api private\n * @param {*} value The value to inspect.\n * @param {string} typeHint The type of the value\n * @returns {string}\n */\nfunction emptyRepresentation(value, typeHint) {\n  switch (typeHint) {\n    case 'function':\n      return '[Function]';\n    case 'object':\n      return '{}';\n    case 'array':\n      return '[]';\n    default:\n      return value.toString();\n  }\n}\n\n/**\n * Takes some variable and asks `Object.prototype.toString()` what it thinks it\n * is.\n *\n * @api private\n * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString\n * @param {*} value The value to test.\n * @returns {string} Computed type\n * @example\n * type({}) // 'object'\n * type([]) // 'array'\n * type(1) // 'number'\n * type(false) // 'boolean'\n * type(Infinity) // 'number'\n * type(null) // 'null'\n * type(new Date()) // 'date'\n * type(/foo/) // 'regexp'\n * type('type') // 'string'\n * type(global) // 'global'\n * type(new String('foo') // 'object'\n */\nvar type = (exports.type = function type(value) {\n  if (value === undefined) {\n    return 'undefined';\n  } else if (value === null) {\n    return 'null';\n  } else if (Buffer.isBuffer(value)) {\n    return 'buffer';\n  }\n  return Object.prototype.toString\n    .call(value)\n    .replace(/^\\[.+\\s(.+?)]$/, '$1')\n    .toLowerCase();\n});\n\n/**\n * Stringify `value`. Different behavior depending on type of value:\n *\n * - If `value` is undefined or null, return `'[undefined]'` or `'[null]'`, respectively.\n * - If `value` is not an object, function or array, return result of `value.toString()` wrapped in double-quotes.\n * - If `value` is an *empty* object, function, or array, return result of function\n *   {@link emptyRepresentation}.\n * - If `value` has properties, call {@link exports.canonicalize} on it, then return result of\n *   JSON.stringify().\n *\n * @api private\n * @see exports.type\n * @param {*} value\n * @return {string}\n */\nexports.stringify = function(value) {\n  var typeHint = type(value);\n\n  if (!~['object', 'array', 'function'].indexOf(typeHint)) {\n    if (typeHint === 'buffer') {\n      var json = Buffer.prototype.toJSON.call(value);\n      // Based on the toJSON result\n      return jsonStringify(\n        json.data && json.type ? json.data : json,\n        2\n      ).replace(/,(\\n|$)/g, '$1');\n    }\n\n    // IE7/IE8 has a bizarre String constructor; needs to be coerced\n    // into an array and back to obj.\n    if (typeHint === 'string' && typeof value === 'object') {\n      value = value.split('').reduce(function(acc, char, idx) {\n        acc[idx] = char;\n        return acc;\n      }, {});\n      typeHint = 'object';\n    } else {\n      return jsonStringify(value);\n    }\n  }\n\n  for (var prop in value) {\n    if (Object.prototype.hasOwnProperty.call(value, prop)) {\n      return jsonStringify(\n        exports.canonicalize(value, null, typeHint),\n        2\n      ).replace(/,(\\n|$)/g, '$1');\n    }\n  }\n\n  return emptyRepresentation(value, typeHint);\n};\n\n/**\n * like JSON.stringify but more sense.\n *\n * @api private\n * @param {Object}  object\n * @param {number=} spaces\n * @param {number=} depth\n * @returns {*}\n */\nfunction jsonStringify(object, spaces, depth) {\n  if (typeof spaces === 'undefined') {\n    // primitive types\n    return _stringify(object);\n  }\n\n  depth = depth || 1;\n  var space = spaces * depth;\n  var str = Array.isArray(object) ? '[' : '{';\n  var end = Array.isArray(object) ? ']' : '}';\n  var length =\n    typeof object.length === 'number'\n      ? object.length\n      : Object.keys(object).length;\n  // `.repeat()` polyfill\n  function repeat(s, n) {\n    return new Array(n).join(s);\n  }\n\n  function _stringify(val) {\n    switch (type(val)) {\n      case 'null':\n      case 'undefined':\n        val = '[' + val + ']';\n        break;\n      case 'array':\n      case 'object':\n        val = jsonStringify(val, spaces, depth + 1);\n        break;\n      case 'boolean':\n      case 'regexp':\n      case 'symbol':\n      case 'number':\n        val =\n          val === 0 && 1 / val === -Infinity // `-0`\n            ? '-0'\n            : val.toString();\n        break;\n      case 'date':\n        var sDate = isNaN(val.getTime()) ? val.toString() : val.toISOString();\n        val = '[Date: ' + sDate + ']';\n        break;\n      case 'buffer':\n        var json = val.toJSON();\n        // Based on the toJSON result\n        json = json.data && json.type ? json.data : json;\n        val = '[Buffer: ' + jsonStringify(json, 2, depth + 1) + ']';\n        break;\n      default:\n        val =\n          val === '[Function]' || val === '[Circular]'\n            ? val\n            : JSON.stringify(val); // string\n    }\n    return val;\n  }\n\n  for (var i in object) {\n    if (!Object.prototype.hasOwnProperty.call(object, i)) {\n      continue; // not my business\n    }\n    --length;\n    str +=\n      '\\n ' +\n      repeat(' ', space) +\n      (Array.isArray(object) ? '' : '\"' + i + '\": ') + // key\n      _stringify(object[i]) + // value\n      (length ? ',' : ''); // comma\n  }\n\n  return (\n    str +\n    // [], {}\n    (str.length !== 1 ? '\\n' + repeat(' ', --space) + end : end)\n  );\n}\n\n/**\n * Return a new Thing that has the keys in sorted order. Recursive.\n *\n * If the Thing...\n * - has already been seen, return string `'[Circular]'`\n * - is `undefined`, return string `'[undefined]'`\n * - is `null`, return value `null`\n * - is some other primitive, return the value\n * - is not a primitive or an `Array`, `Object`, or `Function`, return the value of the Thing's `toString()` method\n * - is a non-empty `Array`, `Object`, or `Function`, return the result of calling this function again.\n * - is an empty `Array`, `Object`, or `Function`, return the result of calling `emptyRepresentation()`\n *\n * @api private\n * @see {@link exports.stringify}\n * @param {*} value Thing to inspect.  May or may not have properties.\n * @param {Array} [stack=[]] Stack of seen values\n * @param {string} [typeHint] Type hint\n * @return {(Object|Array|Function|string|undefined)}\n */\nexports.canonicalize = function canonicalize(value, stack, typeHint) {\n  var canonicalizedObj;\n  /* eslint-disable no-unused-vars */\n  var prop;\n  /* eslint-enable no-unused-vars */\n  typeHint = typeHint || type(value);\n  function withStack(value, fn) {\n    stack.push(value);\n    fn();\n    stack.pop();\n  }\n\n  stack = stack || [];\n\n  if (stack.indexOf(value) !== -1) {\n    return '[Circular]';\n  }\n\n  switch (typeHint) {\n    case 'undefined':\n    case 'buffer':\n    case 'null':\n      canonicalizedObj = value;\n      break;\n    case 'array':\n      withStack(value, function() {\n        canonicalizedObj = value.map(function(item) {\n          return exports.canonicalize(item, stack);\n        });\n      });\n      break;\n    case 'function':\n      /* eslint-disable guard-for-in */\n      for (prop in value) {\n        canonicalizedObj = {};\n        break;\n      }\n      /* eslint-enable guard-for-in */\n      if (!canonicalizedObj) {\n        canonicalizedObj = emptyRepresentation(value, typeHint);\n        break;\n      }\n    /* falls through */\n    case 'object':\n      canonicalizedObj = canonicalizedObj || {};\n      withStack(value, function() {\n        Object.keys(value)\n          .sort()\n          .forEach(function(key) {\n            canonicalizedObj[key] = exports.canonicalize(value[key], stack);\n          });\n      });\n      break;\n    case 'date':\n    case 'number':\n    case 'regexp':\n    case 'boolean':\n    case 'symbol':\n      canonicalizedObj = value;\n      break;\n    default:\n      canonicalizedObj = value + '';\n  }\n\n  return canonicalizedObj;\n};\n\n/**\n * Lookup file names at the given `path`.\n *\n * @memberof Mocha.utils\n * @public\n * @api public\n * @param {string} filepath Base path to start searching from.\n * @param {string[]} extensions File extensions to look for.\n * @param {boolean} recursive Whether or not to recurse into subdirectories.\n * @return {string[]} An array of paths.\n */\nexports.lookupFiles = function lookupFiles(filepath, extensions, recursive) {\n  var files = [];\n\n  if (!fs.existsSync(filepath)) {\n    if (fs.existsSync(filepath + '.js')) {\n      filepath += '.js';\n    } else {\n      files = glob.sync(filepath);\n      if (!files.length) {\n        throw new Error(\"cannot resolve path (or pattern) '\" + filepath + \"'\");\n      }\n      return files;\n    }\n  }\n\n  try {\n    var stat = fs.statSync(filepath);\n    if (stat.isFile()) {\n      return filepath;\n    }\n  } catch (err) {\n    // ignore error\n    return;\n  }\n\n  fs.readdirSync(filepath).forEach(function(file) {\n    file = path.join(filepath, file);\n    try {\n      var stat = fs.statSync(file);\n      if (stat.isDirectory()) {\n        if (recursive) {\n          files = files.concat(lookupFiles(file, extensions, recursive));\n        }\n        return;\n      }\n    } catch (err) {\n      // ignore error\n      return;\n    }\n    if (!extensions) {\n      throw new Error(\n        'extensions parameter required when filepath is a directory'\n      );\n    }\n    var re = new RegExp('\\\\.(?:' + extensions.join('|') + ')$');\n    if (!stat.isFile() || !re.test(file) || path.basename(file)[0] === '.') {\n      return;\n    }\n    files.push(file);\n  });\n\n  return files;\n};\n\n/**\n * Generate an undefined error with a message warning the user.\n *\n * @return {Error}\n */\n\nexports.undefinedError = function() {\n  return new Error(\n    'Caught undefined error, did you throw without specifying what?'\n  );\n};\n\n/**\n * Generate an undefined error if `err` is not defined.\n *\n * @param {Error} err\n * @return {Error}\n */\n\nexports.getError = function(err) {\n  return err || exports.undefinedError();\n};\n\n/**\n * @summary\n * This Filter based on `mocha-clean` module.(see: `github.com/rstacruz/mocha-clean`)\n * @description\n * When invoking this function you get a filter function that get the Error.stack as an input,\n * and return a prettify output.\n * (i.e: strip Mocha and internal node functions from stack trace).\n * @returns {Function}\n */\nexports.stackTraceFilter = function() {\n  // TODO: Replace with `process.browser`\n  var is = typeof document === 'undefined' ? {node: true} : {browser: true};\n  var slash = path.sep;\n  var cwd;\n  if (is.node) {\n    cwd = process.cwd() + slash;\n  } else {\n    cwd = (typeof location === 'undefined'\n      ? window.location\n      : location\n    ).href.replace(/\\/[^/]*$/, '/');\n    slash = '/';\n  }\n\n  function isMochaInternal(line) {\n    return (\n      ~line.indexOf('node_modules' + slash + 'mocha' + slash) ||\n      ~line.indexOf('node_modules' + slash + 'mocha.js') ||\n      ~line.indexOf('bower_components' + slash + 'mocha.js') ||\n      ~line.indexOf(slash + 'mocha.js')\n    );\n  }\n\n  function isNodeInternal(line) {\n    return (\n      ~line.indexOf('(timers.js:') ||\n      ~line.indexOf('(events.js:') ||\n      ~line.indexOf('(node.js:') ||\n      ~line.indexOf('(module.js:') ||\n      ~line.indexOf('GeneratorFunctionPrototype.next (native)') ||\n      false\n    );\n  }\n\n  return function(stack) {\n    stack = stack.split('\\n');\n\n    stack = stack.reduce(function(list, line) {\n      if (isMochaInternal(line)) {\n        return list;\n      }\n\n      if (is.node && isNodeInternal(line)) {\n        return list;\n      }\n\n      // Clean up cwd(absolute)\n      if (/\\(?.+:\\d+:\\d+\\)?$/.test(line)) {\n        line = line.replace('(' + cwd, '(');\n      }\n\n      list.push(line);\n      return list;\n    }, []);\n\n    return stack.join('\\n');\n  };\n};\n\n/**\n * Crude, but effective.\n * @api\n * @param {*} value\n * @returns {boolean} Whether or not `value` is a Promise\n */\nexports.isPromise = function isPromise(value) {\n  return typeof value === 'object' && typeof value.then === 'function';\n};\n\n/**\n * It's a noop.\n * @api\n */\nexports.noop = function() {};\n\n}).call(this,require('_process'),require(\"buffer\").Buffer)\n},{\"_process\":56,\"buffer\":41,\"debug\":43,\"fs\":40,\"glob\":40,\"he\":48,\"path\":40,\"util\":76}],37:[function(require,module,exports){\n'use strict'\n\nexports.byteLength = byteLength\nexports.toByteArray = toByteArray\nexports.fromByteArray = fromByteArray\n\nvar lookup = []\nvar revLookup = []\nvar Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array\n\nvar code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'\nfor (var i = 0, len = code.length; i < len; ++i) {\n  lookup[i] = code[i]\n  revLookup[code.charCodeAt(i)] = i\n}\n\n// Support decoding URL-safe base64 strings, as Node.js does.\n// See: https://en.wikipedia.org/wiki/Base64#URL_applications\nrevLookup['-'.charCodeAt(0)] = 62\nrevLookup['_'.charCodeAt(0)] = 63\n\nfunction getLens (b64) {\n  var len = b64.length\n\n  if (len % 4 > 0) {\n    throw new Error('Invalid string. Length must be a multiple of 4')\n  }\n\n  // Trim off extra bytes after placeholder bytes are found\n  // See: https://github.com/beatgammit/base64-js/issues/42\n  var validLen = b64.indexOf('=')\n  if (validLen === -1) validLen = len\n\n  var placeHoldersLen = validLen === len\n    ? 0\n    : 4 - (validLen % 4)\n\n  return [validLen, placeHoldersLen]\n}\n\n// base64 is 4/3 + up to two characters of the original data\nfunction byteLength (b64) {\n  var lens = getLens(b64)\n  var validLen = lens[0]\n  var placeHoldersLen = lens[1]\n  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen\n}\n\nfunction _byteLength (b64, validLen, placeHoldersLen) {\n  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen\n}\n\nfunction toByteArray (b64) {\n  var tmp\n  var lens = getLens(b64)\n  var validLen = lens[0]\n  var placeHoldersLen = lens[1]\n\n  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))\n\n  var curByte = 0\n\n  // if there are placeholders, only get up to the last complete 4 chars\n  var len = placeHoldersLen > 0\n    ? validLen - 4\n    : validLen\n\n  for (var i = 0; i < len; i += 4) {\n    tmp =\n      (revLookup[b64.charCodeAt(i)] << 18) |\n      (revLookup[b64.charCodeAt(i + 1)] << 12) |\n      (revLookup[b64.charCodeAt(i + 2)] << 6) |\n      revLookup[b64.charCodeAt(i + 3)]\n    arr[curByte++] = (tmp >> 16) & 0xFF\n    arr[curByte++] = (tmp >> 8) & 0xFF\n    arr[curByte++] = tmp & 0xFF\n  }\n\n  if (placeHoldersLen === 2) {\n    tmp =\n      (revLookup[b64.charCodeAt(i)] << 2) |\n      (revLookup[b64.charCodeAt(i + 1)] >> 4)\n    arr[curByte++] = tmp & 0xFF\n  }\n\n  if (placeHoldersLen === 1) {\n    tmp =\n      (revLookup[b64.charCodeAt(i)] << 10) |\n      (revLookup[b64.charCodeAt(i + 1)] << 4) |\n      (revLookup[b64.charCodeAt(i + 2)] >> 2)\n    arr[curByte++] = (tmp >> 8) & 0xFF\n    arr[curByte++] = tmp & 0xFF\n  }\n\n  return arr\n}\n\nfunction tripletToBase64 (num) {\n  return lookup[num >> 18 & 0x3F] +\n    lookup[num >> 12 & 0x3F] +\n    lookup[num >> 6 & 0x3F] +\n    lookup[num & 0x3F]\n}\n\nfunction encodeChunk (uint8, start, end) {\n  var tmp\n  var output = []\n  for (var i = start; i < end; i += 3) {\n    tmp =\n      ((uint8[i] << 16) & 0xFF0000) +\n      ((uint8[i + 1] << 8) & 0xFF00) +\n      (uint8[i + 2] & 0xFF)\n    output.push(tripletToBase64(tmp))\n  }\n  return output.join('')\n}\n\nfunction fromByteArray (uint8) {\n  var tmp\n  var len = uint8.length\n  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes\n  var parts = []\n  var maxChunkLength = 16383 // must be multiple of 3\n\n  // go through the array every three bytes, we'll deal with trailing stuff later\n  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {\n    parts.push(encodeChunk(\n      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)\n    ))\n  }\n\n  // pad the end with zeros, but make sure to not forget the extra bytes\n  if (extraBytes === 1) {\n    tmp = uint8[len - 1]\n    parts.push(\n      lookup[tmp >> 2] +\n      lookup[(tmp << 4) & 0x3F] +\n      '=='\n    )\n  } else if (extraBytes === 2) {\n    tmp = (uint8[len - 2] << 8) + uint8[len - 1]\n    parts.push(\n      lookup[tmp >> 10] +\n      lookup[(tmp >> 4) & 0x3F] +\n      lookup[(tmp << 2) & 0x3F] +\n      '='\n    )\n  }\n\n  return parts.join('')\n}\n\n},{}],38:[function(require,module,exports){\n\n},{}],39:[function(require,module,exports){\n(function (process){\nvar WritableStream = require('stream').Writable\nvar inherits = require('util').inherits\n\nmodule.exports = BrowserStdout\n\n\ninherits(BrowserStdout, WritableStream)\n\nfunction BrowserStdout(opts) {\n  if (!(this instanceof BrowserStdout)) return new BrowserStdout(opts)\n\n  opts = opts || {}\n  WritableStream.call(this, opts)\n  this.label = (opts.label !== undefined) ? opts.label : 'stdout'\n}\n\nBrowserStdout.prototype._write = function(chunks, encoding, cb) {\n  var output = chunks.toString ? chunks.toString() : chunks\n  if (this.label === false) {\n    console.log(output)\n  } else {\n    console.log(this.label+':', output)\n  }\n  process.nextTick(cb)\n}\n\n}).call(this,require('_process'))\n},{\"_process\":56,\"stream\":71,\"util\":76}],40:[function(require,module,exports){\narguments[4][38][0].apply(exports,arguments)\n},{\"dup\":38}],41:[function(require,module,exports){\n/*!\n * The buffer module from node.js, for the browser.\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n/* eslint-disable no-proto */\n\n'use strict'\n\nvar base64 = require('base64-js')\nvar ieee754 = require('ieee754')\n\nexports.Buffer = Buffer\nexports.SlowBuffer = SlowBuffer\nexports.INSPECT_MAX_BYTES = 50\n\nvar K_MAX_LENGTH = 0x7fffffff\nexports.kMaxLength = K_MAX_LENGTH\n\n/**\n * If `Buffer.TYPED_ARRAY_SUPPORT`:\n *   === true    Use Uint8Array implementation (fastest)\n *   === false   Print warning and recommend using `buffer` v4.x which has an Object\n *               implementation (most compatible, even IE6)\n *\n * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,\n * Opera 11.6+, iOS 4.2+.\n *\n * We report that the browser does not support typed arrays if the are not subclassable\n * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`\n * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support\n * for __proto__ and has a buggy typed array implementation.\n */\nBuffer.TYPED_ARRAY_SUPPORT = typedArraySupport()\n\nif (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&\n    typeof console.error === 'function') {\n  console.error(\n    'This browser lacks typed array (Uint8Array) support which is required by ' +\n    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'\n  )\n}\n\nfunction typedArraySupport () {\n  // Can typed array instances can be augmented?\n  try {\n    var arr = new Uint8Array(1)\n    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}\n    return arr.foo() === 42\n  } catch (e) {\n    return false\n  }\n}\n\nObject.defineProperty(Buffer.prototype, 'parent', {\n  get: function () {\n    if (!(this instanceof Buffer)) {\n      return undefined\n    }\n    return this.buffer\n  }\n})\n\nObject.defineProperty(Buffer.prototype, 'offset', {\n  get: function () {\n    if (!(this instanceof Buffer)) {\n      return undefined\n    }\n    return this.byteOffset\n  }\n})\n\nfunction createBuffer (length) {\n  if (length > K_MAX_LENGTH) {\n    throw new RangeError('Invalid typed array length')\n  }\n  // Return an augmented `Uint8Array` instance\n  var buf = new Uint8Array(length)\n  buf.__proto__ = Buffer.prototype\n  return buf\n}\n\n/**\n * The Buffer constructor returns instances of `Uint8Array` that have their\n * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of\n * `Uint8Array`, so the returned instances will have all the node `Buffer` methods\n * and the `Uint8Array` methods. Square bracket notation works as expected -- it\n * returns a single octet.\n *\n * The `Uint8Array` prototype remains unmodified.\n */\n\nfunction Buffer (arg, encodingOrOffset, length) {\n  // Common case.\n  if (typeof arg === 'number') {\n    if (typeof encodingOrOffset === 'string') {\n      throw new Error(\n        'If encoding is specified then the first argument must be a string'\n      )\n    }\n    return allocUnsafe(arg)\n  }\n  return from(arg, encodingOrOffset, length)\n}\n\n// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97\nif (typeof Symbol !== 'undefined' && Symbol.species &&\n    Buffer[Symbol.species] === Buffer) {\n  Object.defineProperty(Buffer, Symbol.species, {\n    value: null,\n    configurable: true,\n    enumerable: false,\n    writable: false\n  })\n}\n\nBuffer.poolSize = 8192 // not used by this implementation\n\nfunction from (value, encodingOrOffset, length) {\n  if (typeof value === 'number') {\n    throw new TypeError('\"value\" argument must not be a number')\n  }\n\n  if (isArrayBuffer(value) || (value && isArrayBuffer(value.buffer))) {\n    return fromArrayBuffer(value, encodingOrOffset, length)\n  }\n\n  if (typeof value === 'string') {\n    return fromString(value, encodingOrOffset)\n  }\n\n  return fromObject(value)\n}\n\n/**\n * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError\n * if value is a number.\n * Buffer.from(str[, encoding])\n * Buffer.from(array)\n * Buffer.from(buffer)\n * Buffer.from(arrayBuffer[, byteOffset[, length]])\n **/\nBuffer.from = function (value, encodingOrOffset, length) {\n  return from(value, encodingOrOffset, length)\n}\n\n// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:\n// https://github.com/feross/buffer/pull/148\nBuffer.prototype.__proto__ = Uint8Array.prototype\nBuffer.__proto__ = Uint8Array\n\nfunction assertSize (size) {\n  if (typeof size !== 'number') {\n    throw new TypeError('\"size\" argument must be of type number')\n  } else if (size < 0) {\n    throw new RangeError('\"size\" argument must not be negative')\n  }\n}\n\nfunction alloc (size, fill, encoding) {\n  assertSize(size)\n  if (size <= 0) {\n    return createBuffer(size)\n  }\n  if (fill !== undefined) {\n    // Only pay attention to encoding if it's a string. This\n    // prevents accidentally sending in a number that would\n    // be interpretted as a start offset.\n    return typeof encoding === 'string'\n      ? createBuffer(size).fill(fill, encoding)\n      : createBuffer(size).fill(fill)\n  }\n  return createBuffer(size)\n}\n\n/**\n * Creates a new filled Buffer instance.\n * alloc(size[, fill[, encoding]])\n **/\nBuffer.alloc = function (size, fill, encoding) {\n  return alloc(size, fill, encoding)\n}\n\nfunction allocUnsafe (size) {\n  assertSize(size)\n  return createBuffer(size < 0 ? 0 : checked(size) | 0)\n}\n\n/**\n * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.\n * */\nBuffer.allocUnsafe = function (size) {\n  return allocUnsafe(size)\n}\n/**\n * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.\n */\nBuffer.allocUnsafeSlow = function (size) {\n  return allocUnsafe(size)\n}\n\nfunction fromString (string, encoding) {\n  if (typeof encoding !== 'string' || encoding === '') {\n    encoding = 'utf8'\n  }\n\n  if (!Buffer.isEncoding(encoding)) {\n    throw new TypeError('Unknown encoding: ' + encoding)\n  }\n\n  var length = byteLength(string, encoding) | 0\n  var buf = createBuffer(length)\n\n  var actual = buf.write(string, encoding)\n\n  if (actual !== length) {\n    // Writing a hex string, for example, that contains invalid characters will\n    // cause everything after the first invalid character to be ignored. (e.g.\n    // 'abxxcd' will be treated as 'ab')\n    buf = buf.slice(0, actual)\n  }\n\n  return buf\n}\n\nfunction fromArrayLike (array) {\n  var length = array.length < 0 ? 0 : checked(array.length) | 0\n  var buf = createBuffer(length)\n  for (var i = 0; i < length; i += 1) {\n    buf[i] = array[i] & 255\n  }\n  return buf\n}\n\nfunction fromArrayBuffer (array, byteOffset, length) {\n  if (byteOffset < 0 || array.byteLength < byteOffset) {\n    throw new RangeError('\"offset\" is outside of buffer bounds')\n  }\n\n  if (array.byteLength < byteOffset + (length || 0)) {\n    throw new RangeError('\"length\" is outside of buffer bounds')\n  }\n\n  var buf\n  if (byteOffset === undefined && length === undefined) {\n    buf = new Uint8Array(array)\n  } else if (length === undefined) {\n    buf = new Uint8Array(array, byteOffset)\n  } else {\n    buf = new Uint8Array(array, byteOffset, length)\n  }\n\n  // Return an augmented `Uint8Array` instance\n  buf.__proto__ = Buffer.prototype\n  return buf\n}\n\nfunction fromObject (obj) {\n  if (Buffer.isBuffer(obj)) {\n    var len = checked(obj.length) | 0\n    var buf = createBuffer(len)\n\n    if (buf.length === 0) {\n      return buf\n    }\n\n    obj.copy(buf, 0, 0, len)\n    return buf\n  }\n\n  if (obj) {\n    if (ArrayBuffer.isView(obj) || 'length' in obj) {\n      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {\n        return createBuffer(0)\n      }\n      return fromArrayLike(obj)\n    }\n\n    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {\n      return fromArrayLike(obj.data)\n    }\n  }\n\n  throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object.')\n}\n\nfunction checked (length) {\n  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when\n  // length is NaN (which is otherwise coerced to zero.)\n  if (length >= K_MAX_LENGTH) {\n    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +\n                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')\n  }\n  return length | 0\n}\n\nfunction SlowBuffer (length) {\n  if (+length != length) { // eslint-disable-line eqeqeq\n    length = 0\n  }\n  return Buffer.alloc(+length)\n}\n\nBuffer.isBuffer = function isBuffer (b) {\n  return b != null && b._isBuffer === true\n}\n\nBuffer.compare = function compare (a, b) {\n  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {\n    throw new TypeError('Arguments must be Buffers')\n  }\n\n  if (a === b) return 0\n\n  var x = a.length\n  var y = b.length\n\n  for (var i = 0, len = Math.min(x, y); i < len; ++i) {\n    if (a[i] !== b[i]) {\n      x = a[i]\n      y = b[i]\n      break\n    }\n  }\n\n  if (x < y) return -1\n  if (y < x) return 1\n  return 0\n}\n\nBuffer.isEncoding = function isEncoding (encoding) {\n  switch (String(encoding).toLowerCase()) {\n    case 'hex':\n    case 'utf8':\n    case 'utf-8':\n    case 'ascii':\n    case 'latin1':\n    case 'binary':\n    case 'base64':\n    case 'ucs2':\n    case 'ucs-2':\n    case 'utf16le':\n    case 'utf-16le':\n      return true\n    default:\n      return false\n  }\n}\n\nBuffer.concat = function concat (list, length) {\n  if (!Array.isArray(list)) {\n    throw new TypeError('\"list\" argument must be an Array of Buffers')\n  }\n\n  if (list.length === 0) {\n    return Buffer.alloc(0)\n  }\n\n  var i\n  if (length === undefined) {\n    length = 0\n    for (i = 0; i < list.length; ++i) {\n      length += list[i].length\n    }\n  }\n\n  var buffer = Buffer.allocUnsafe(length)\n  var pos = 0\n  for (i = 0; i < list.length; ++i) {\n    var buf = list[i]\n    if (ArrayBuffer.isView(buf)) {\n      buf = Buffer.from(buf)\n    }\n    if (!Buffer.isBuffer(buf)) {\n      throw new TypeError('\"list\" argument must be an Array of Buffers')\n    }\n    buf.copy(buffer, pos)\n    pos += buf.length\n  }\n  return buffer\n}\n\nfunction byteLength (string, encoding) {\n  if (Buffer.isBuffer(string)) {\n    return string.length\n  }\n  if (ArrayBuffer.isView(string) || isArrayBuffer(string)) {\n    return string.byteLength\n  }\n  if (typeof string !== 'string') {\n    string = '' + string\n  }\n\n  var len = string.length\n  if (len === 0) return 0\n\n  // Use a for loop to avoid recursion\n  var loweredCase = false\n  for (;;) {\n    switch (encoding) {\n      case 'ascii':\n      case 'latin1':\n      case 'binary':\n        return len\n      case 'utf8':\n      case 'utf-8':\n      case undefined:\n        return utf8ToBytes(string).length\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return len * 2\n      case 'hex':\n        return len >>> 1\n      case 'base64':\n        return base64ToBytes(string).length\n      default:\n        if (loweredCase) return utf8ToBytes(string).length // assume utf8\n        encoding = ('' + encoding).toLowerCase()\n        loweredCase = true\n    }\n  }\n}\nBuffer.byteLength = byteLength\n\nfunction slowToString (encoding, start, end) {\n  var loweredCase = false\n\n  // No need to verify that \"this.length <= MAX_UINT32\" since it's a read-only\n  // property of a typed array.\n\n  // This behaves neither like String nor Uint8Array in that we set start/end\n  // to their upper/lower bounds if the value passed is out of range.\n  // undefined is handled specially as per ECMA-262 6th Edition,\n  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.\n  if (start === undefined || start < 0) {\n    start = 0\n  }\n  // Return early if start > this.length. Done here to prevent potential uint32\n  // coercion fail below.\n  if (start > this.length) {\n    return ''\n  }\n\n  if (end === undefined || end > this.length) {\n    end = this.length\n  }\n\n  if (end <= 0) {\n    return ''\n  }\n\n  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.\n  end >>>= 0\n  start >>>= 0\n\n  if (end <= start) {\n    return ''\n  }\n\n  if (!encoding) encoding = 'utf8'\n\n  while (true) {\n    switch (encoding) {\n      case 'hex':\n        return hexSlice(this, start, end)\n\n      case 'utf8':\n      case 'utf-8':\n        return utf8Slice(this, start, end)\n\n      case 'ascii':\n        return asciiSlice(this, start, end)\n\n      case 'latin1':\n      case 'binary':\n        return latin1Slice(this, start, end)\n\n      case 'base64':\n        return base64Slice(this, start, end)\n\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return utf16leSlice(this, start, end)\n\n      default:\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\n        encoding = (encoding + '').toLowerCase()\n        loweredCase = true\n    }\n  }\n}\n\n// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)\n// to detect a Buffer instance. It's not possible to use `instanceof Buffer`\n// reliably in a browserify context because there could be multiple different\n// copies of the 'buffer' package in use. This method works even for Buffer\n// instances that were created from another copy of the `buffer` package.\n// See: https://github.com/feross/buffer/issues/154\nBuffer.prototype._isBuffer = true\n\nfunction swap (b, n, m) {\n  var i = b[n]\n  b[n] = b[m]\n  b[m] = i\n}\n\nBuffer.prototype.swap16 = function swap16 () {\n  var len = this.length\n  if (len % 2 !== 0) {\n    throw new RangeError('Buffer size must be a multiple of 16-bits')\n  }\n  for (var i = 0; i < len; i += 2) {\n    swap(this, i, i + 1)\n  }\n  return this\n}\n\nBuffer.prototype.swap32 = function swap32 () {\n  var len = this.length\n  if (len % 4 !== 0) {\n    throw new RangeError('Buffer size must be a multiple of 32-bits')\n  }\n  for (var i = 0; i < len; i += 4) {\n    swap(this, i, i + 3)\n    swap(this, i + 1, i + 2)\n  }\n  return this\n}\n\nBuffer.prototype.swap64 = function swap64 () {\n  var len = this.length\n  if (len % 8 !== 0) {\n    throw new RangeError('Buffer size must be a multiple of 64-bits')\n  }\n  for (var i = 0; i < len; i += 8) {\n    swap(this, i, i + 7)\n    swap(this, i + 1, i + 6)\n    swap(this, i + 2, i + 5)\n    swap(this, i + 3, i + 4)\n  }\n  return this\n}\n\nBuffer.prototype.toString = function toString () {\n  var length = this.length\n  if (length === 0) return ''\n  if (arguments.length === 0) return utf8Slice(this, 0, length)\n  return slowToString.apply(this, arguments)\n}\n\nBuffer.prototype.toLocaleString = Buffer.prototype.toString\n\nBuffer.prototype.equals = function equals (b) {\n  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')\n  if (this === b) return true\n  return Buffer.compare(this, b) === 0\n}\n\nBuffer.prototype.inspect = function inspect () {\n  var str = ''\n  var max = exports.INSPECT_MAX_BYTES\n  if (this.length > 0) {\n    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')\n    if (this.length > max) str += ' ... '\n  }\n  return '<Buffer ' + str + '>'\n}\n\nBuffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {\n  if (!Buffer.isBuffer(target)) {\n    throw new TypeError('Argument must be a Buffer')\n  }\n\n  if (start === undefined) {\n    start = 0\n  }\n  if (end === undefined) {\n    end = target ? target.length : 0\n  }\n  if (thisStart === undefined) {\n    thisStart = 0\n  }\n  if (thisEnd === undefined) {\n    thisEnd = this.length\n  }\n\n  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {\n    throw new RangeError('out of range index')\n  }\n\n  if (thisStart >= thisEnd && start >= end) {\n    return 0\n  }\n  if (thisStart >= thisEnd) {\n    return -1\n  }\n  if (start >= end) {\n    return 1\n  }\n\n  start >>>= 0\n  end >>>= 0\n  thisStart >>>= 0\n  thisEnd >>>= 0\n\n  if (this === target) return 0\n\n  var x = thisEnd - thisStart\n  var y = end - start\n  var len = Math.min(x, y)\n\n  var thisCopy = this.slice(thisStart, thisEnd)\n  var targetCopy = target.slice(start, end)\n\n  for (var i = 0; i < len; ++i) {\n    if (thisCopy[i] !== targetCopy[i]) {\n      x = thisCopy[i]\n      y = targetCopy[i]\n      break\n    }\n  }\n\n  if (x < y) return -1\n  if (y < x) return 1\n  return 0\n}\n\n// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,\n// OR the last index of `val` in `buffer` at offset <= `byteOffset`.\n//\n// Arguments:\n// - buffer - a Buffer to search\n// - val - a string, Buffer, or number\n// - byteOffset - an index into `buffer`; will be clamped to an int32\n// - encoding - an optional encoding, relevant is val is a string\n// - dir - true for indexOf, false for lastIndexOf\nfunction bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {\n  // Empty buffer means no match\n  if (buffer.length === 0) return -1\n\n  // Normalize byteOffset\n  if (typeof byteOffset === 'string') {\n    encoding = byteOffset\n    byteOffset = 0\n  } else if (byteOffset > 0x7fffffff) {\n    byteOffset = 0x7fffffff\n  } else if (byteOffset < -0x80000000) {\n    byteOffset = -0x80000000\n  }\n  byteOffset = +byteOffset  // Coerce to Number.\n  if (numberIsNaN(byteOffset)) {\n    // byteOffset: it it's undefined, null, NaN, \"foo\", etc, search whole buffer\n    byteOffset = dir ? 0 : (buffer.length - 1)\n  }\n\n  // Normalize byteOffset: negative offsets start from the end of the buffer\n  if (byteOffset < 0) byteOffset = buffer.length + byteOffset\n  if (byteOffset >= buffer.length) {\n    if (dir) return -1\n    else byteOffset = buffer.length - 1\n  } else if (byteOffset < 0) {\n    if (dir) byteOffset = 0\n    else return -1\n  }\n\n  // Normalize val\n  if (typeof val === 'string') {\n    val = Buffer.from(val, encoding)\n  }\n\n  // Finally, search either indexOf (if dir is true) or lastIndexOf\n  if (Buffer.isBuffer(val)) {\n    // Special case: looking for empty string/buffer always fails\n    if (val.length === 0) {\n      return -1\n    }\n    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)\n  } else if (typeof val === 'number') {\n    val = val & 0xFF // Search for a byte value [0-255]\n    if (typeof Uint8Array.prototype.indexOf === 'function') {\n      if (dir) {\n        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)\n      } else {\n        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)\n      }\n    }\n    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)\n  }\n\n  throw new TypeError('val must be string, number or Buffer')\n}\n\nfunction arrayIndexOf (arr, val, byteOffset, encoding, dir) {\n  var indexSize = 1\n  var arrLength = arr.length\n  var valLength = val.length\n\n  if (encoding !== undefined) {\n    encoding = String(encoding).toLowerCase()\n    if (encoding === 'ucs2' || encoding === 'ucs-2' ||\n        encoding === 'utf16le' || encoding === 'utf-16le') {\n      if (arr.length < 2 || val.length < 2) {\n        return -1\n      }\n      indexSize = 2\n      arrLength /= 2\n      valLength /= 2\n      byteOffset /= 2\n    }\n  }\n\n  function read (buf, i) {\n    if (indexSize === 1) {\n      return buf[i]\n    } else {\n      return buf.readUInt16BE(i * indexSize)\n    }\n  }\n\n  var i\n  if (dir) {\n    var foundIndex = -1\n    for (i = byteOffset; i < arrLength; i++) {\n      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {\n        if (foundIndex === -1) foundIndex = i\n        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize\n      } else {\n        if (foundIndex !== -1) i -= i - foundIndex\n        foundIndex = -1\n      }\n    }\n  } else {\n    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength\n    for (i = byteOffset; i >= 0; i--) {\n      var found = true\n      for (var j = 0; j < valLength; j++) {\n        if (read(arr, i + j) !== read(val, j)) {\n          found = false\n          break\n        }\n      }\n      if (found) return i\n    }\n  }\n\n  return -1\n}\n\nBuffer.prototype.includes = function includes (val, byteOffset, encoding) {\n  return this.indexOf(val, byteOffset, encoding) !== -1\n}\n\nBuffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {\n  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)\n}\n\nBuffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {\n  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)\n}\n\nfunction hexWrite (buf, string, offset, length) {\n  offset = Number(offset) || 0\n  var remaining = buf.length - offset\n  if (!length) {\n    length = remaining\n  } else {\n    length = Number(length)\n    if (length > remaining) {\n      length = remaining\n    }\n  }\n\n  var strLen = string.length\n\n  if (length > strLen / 2) {\n    length = strLen / 2\n  }\n  for (var i = 0; i < length; ++i) {\n    var parsed = parseInt(string.substr(i * 2, 2), 16)\n    if (numberIsNaN(parsed)) return i\n    buf[offset + i] = parsed\n  }\n  return i\n}\n\nfunction utf8Write (buf, string, offset, length) {\n  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)\n}\n\nfunction asciiWrite (buf, string, offset, length) {\n  return blitBuffer(asciiToBytes(string), buf, offset, length)\n}\n\nfunction latin1Write (buf, string, offset, length) {\n  return asciiWrite(buf, string, offset, length)\n}\n\nfunction base64Write (buf, string, offset, length) {\n  return blitBuffer(base64ToBytes(string), buf, offset, length)\n}\n\nfunction ucs2Write (buf, string, offset, length) {\n  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)\n}\n\nBuffer.prototype.write = function write (string, offset, length, encoding) {\n  // Buffer#write(string)\n  if (offset === undefined) {\n    encoding = 'utf8'\n    length = this.length\n    offset = 0\n  // Buffer#write(string, encoding)\n  } else if (length === undefined && typeof offset === 'string') {\n    encoding = offset\n    length = this.length\n    offset = 0\n  // Buffer#write(string, offset[, length][, encoding])\n  } else if (isFinite(offset)) {\n    offset = offset >>> 0\n    if (isFinite(length)) {\n      length = length >>> 0\n      if (encoding === undefined) encoding = 'utf8'\n    } else {\n      encoding = length\n      length = undefined\n    }\n  } else {\n    throw new Error(\n      'Buffer.write(string, encoding, offset[, length]) is no longer supported'\n    )\n  }\n\n  var remaining = this.length - offset\n  if (length === undefined || length > remaining) length = remaining\n\n  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {\n    throw new RangeError('Attempt to write outside buffer bounds')\n  }\n\n  if (!encoding) encoding = 'utf8'\n\n  var loweredCase = false\n  for (;;) {\n    switch (encoding) {\n      case 'hex':\n        return hexWrite(this, string, offset, length)\n\n      case 'utf8':\n      case 'utf-8':\n        return utf8Write(this, string, offset, length)\n\n      case 'ascii':\n        return asciiWrite(this, string, offset, length)\n\n      case 'latin1':\n      case 'binary':\n        return latin1Write(this, string, offset, length)\n\n      case 'base64':\n        // Warning: maxLength not taken into account in base64Write\n        return base64Write(this, string, offset, length)\n\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return ucs2Write(this, string, offset, length)\n\n      default:\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\n        encoding = ('' + encoding).toLowerCase()\n        loweredCase = true\n    }\n  }\n}\n\nBuffer.prototype.toJSON = function toJSON () {\n  return {\n    type: 'Buffer',\n    data: Array.prototype.slice.call(this._arr || this, 0)\n  }\n}\n\nfunction base64Slice (buf, start, end) {\n  if (start === 0 && end === buf.length) {\n    return base64.fromByteArray(buf)\n  } else {\n    return base64.fromByteArray(buf.slice(start, end))\n  }\n}\n\nfunction utf8Slice (buf, start, end) {\n  end = Math.min(buf.length, end)\n  var res = []\n\n  var i = start\n  while (i < end) {\n    var firstByte = buf[i]\n    var codePoint = null\n    var bytesPerSequence = (firstByte > 0xEF) ? 4\n      : (firstByte > 0xDF) ? 3\n      : (firstByte > 0xBF) ? 2\n      : 1\n\n    if (i + bytesPerSequence <= end) {\n      var secondByte, thirdByte, fourthByte, tempCodePoint\n\n      switch (bytesPerSequence) {\n        case 1:\n          if (firstByte < 0x80) {\n            codePoint = firstByte\n          }\n          break\n        case 2:\n          secondByte = buf[i + 1]\n          if ((secondByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)\n            if (tempCodePoint > 0x7F) {\n              codePoint = tempCodePoint\n            }\n          }\n          break\n        case 3:\n          secondByte = buf[i + 1]\n          thirdByte = buf[i + 2]\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)\n            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {\n              codePoint = tempCodePoint\n            }\n          }\n          break\n        case 4:\n          secondByte = buf[i + 1]\n          thirdByte = buf[i + 2]\n          fourthByte = buf[i + 3]\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)\n            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {\n              codePoint = tempCodePoint\n            }\n          }\n      }\n    }\n\n    if (codePoint === null) {\n      // we did not generate a valid codePoint so insert a\n      // replacement char (U+FFFD) and advance only 1 byte\n      codePoint = 0xFFFD\n      bytesPerSequence = 1\n    } else if (codePoint > 0xFFFF) {\n      // encode to utf16 (surrogate pair dance)\n      codePoint -= 0x10000\n      res.push(codePoint >>> 10 & 0x3FF | 0xD800)\n      codePoint = 0xDC00 | codePoint & 0x3FF\n    }\n\n    res.push(codePoint)\n    i += bytesPerSequence\n  }\n\n  return decodeCodePointsArray(res)\n}\n\n// Based on http://stackoverflow.com/a/22747272/680742, the browser with\n// the lowest limit is Chrome, with 0x10000 args.\n// We go 1 magnitude less, for safety\nvar MAX_ARGUMENTS_LENGTH = 0x1000\n\nfunction decodeCodePointsArray (codePoints) {\n  var len = codePoints.length\n  if (len <= MAX_ARGUMENTS_LENGTH) {\n    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()\n  }\n\n  // Decode in chunks to avoid \"call stack size exceeded\".\n  var res = ''\n  var i = 0\n  while (i < len) {\n    res += String.fromCharCode.apply(\n      String,\n      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)\n    )\n  }\n  return res\n}\n\nfunction asciiSlice (buf, start, end) {\n  var ret = ''\n  end = Math.min(buf.length, end)\n\n  for (var i = start; i < end; ++i) {\n    ret += String.fromCharCode(buf[i] & 0x7F)\n  }\n  return ret\n}\n\nfunction latin1Slice (buf, start, end) {\n  var ret = ''\n  end = Math.min(buf.length, end)\n\n  for (var i = start; i < end; ++i) {\n    ret += String.fromCharCode(buf[i])\n  }\n  return ret\n}\n\nfunction hexSlice (buf, start, end) {\n  var len = buf.length\n\n  if (!start || start < 0) start = 0\n  if (!end || end < 0 || end > len) end = len\n\n  var out = ''\n  for (var i = start; i < end; ++i) {\n    out += toHex(buf[i])\n  }\n  return out\n}\n\nfunction utf16leSlice (buf, start, end) {\n  var bytes = buf.slice(start, end)\n  var res = ''\n  for (var i = 0; i < bytes.length; i += 2) {\n    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))\n  }\n  return res\n}\n\nBuffer.prototype.slice = function slice (start, end) {\n  var len = this.length\n  start = ~~start\n  end = end === undefined ? len : ~~end\n\n  if (start < 0) {\n    start += len\n    if (start < 0) start = 0\n  } else if (start > len) {\n    start = len\n  }\n\n  if (end < 0) {\n    end += len\n    if (end < 0) end = 0\n  } else if (end > len) {\n    end = len\n  }\n\n  if (end < start) end = start\n\n  var newBuf = this.subarray(start, end)\n  // Return an augmented `Uint8Array` instance\n  newBuf.__proto__ = Buffer.prototype\n  return newBuf\n}\n\n/*\n * Need to make sure that buffer isn't trying to write out of bounds.\n */\nfunction checkOffset (offset, ext, length) {\n  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')\n  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')\n}\n\nBuffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var val = this[offset]\n  var mul = 1\n  var i = 0\n  while (++i < byteLength && (mul *= 0x100)) {\n    val += this[offset + i] * mul\n  }\n\n  return val\n}\n\nBuffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) {\n    checkOffset(offset, byteLength, this.length)\n  }\n\n  var val = this[offset + --byteLength]\n  var mul = 1\n  while (byteLength > 0 && (mul *= 0x100)) {\n    val += this[offset + --byteLength] * mul\n  }\n\n  return val\n}\n\nBuffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 1, this.length)\n  return this[offset]\n}\n\nBuffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  return this[offset] | (this[offset + 1] << 8)\n}\n\nBuffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  return (this[offset] << 8) | this[offset + 1]\n}\n\nBuffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return ((this[offset]) |\n      (this[offset + 1] << 8) |\n      (this[offset + 2] << 16)) +\n      (this[offset + 3] * 0x1000000)\n}\n\nBuffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset] * 0x1000000) +\n    ((this[offset + 1] << 16) |\n    (this[offset + 2] << 8) |\n    this[offset + 3])\n}\n\nBuffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var val = this[offset]\n  var mul = 1\n  var i = 0\n  while (++i < byteLength && (mul *= 0x100)) {\n    val += this[offset + i] * mul\n  }\n  mul *= 0x80\n\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\n\n  return val\n}\n\nBuffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var i = byteLength\n  var mul = 1\n  var val = this[offset + --i]\n  while (i > 0 && (mul *= 0x100)) {\n    val += this[offset + --i] * mul\n  }\n  mul *= 0x80\n\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\n\n  return val\n}\n\nBuffer.prototype.readInt8 = function readInt8 (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 1, this.length)\n  if (!(this[offset] & 0x80)) return (this[offset])\n  return ((0xff - this[offset] + 1) * -1)\n}\n\nBuffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  var val = this[offset] | (this[offset + 1] << 8)\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\n}\n\nBuffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  var val = this[offset + 1] | (this[offset] << 8)\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\n}\n\nBuffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset]) |\n    (this[offset + 1] << 8) |\n    (this[offset + 2] << 16) |\n    (this[offset + 3] << 24)\n}\n\nBuffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset] << 24) |\n    (this[offset + 1] << 16) |\n    (this[offset + 2] << 8) |\n    (this[offset + 3])\n}\n\nBuffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n  return ieee754.read(this, offset, true, 23, 4)\n}\n\nBuffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 4, this.length)\n  return ieee754.read(this, offset, false, 23, 4)\n}\n\nBuffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 8, this.length)\n  return ieee754.read(this, offset, true, 52, 8)\n}\n\nBuffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {\n  offset = offset >>> 0\n  if (!noAssert) checkOffset(offset, 8, this.length)\n  return ieee754.read(this, offset, false, 52, 8)\n}\n\nfunction checkInt (buf, value, offset, ext, max, min) {\n  if (!Buffer.isBuffer(buf)) throw new TypeError('\"buffer\" argument must be a Buffer instance')\n  if (value > max || value < min) throw new RangeError('\"value\" argument is out of bounds')\n  if (offset + ext > buf.length) throw new RangeError('Index out of range')\n}\n\nBuffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) {\n    var maxBytes = Math.pow(2, 8 * byteLength) - 1\n    checkInt(this, value, offset, byteLength, maxBytes, 0)\n  }\n\n  var mul = 1\n  var i = 0\n  this[offset] = value & 0xFF\n  while (++i < byteLength && (mul *= 0x100)) {\n    this[offset + i] = (value / mul) & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  byteLength = byteLength >>> 0\n  if (!noAssert) {\n    var maxBytes = Math.pow(2, 8 * byteLength) - 1\n    checkInt(this, value, offset, byteLength, maxBytes, 0)\n  }\n\n  var i = byteLength - 1\n  var mul = 1\n  this[offset + i] = value & 0xFF\n  while (--i >= 0 && (mul *= 0x100)) {\n    this[offset + i] = (value / mul) & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)\n  this[offset] = (value & 0xff)\n  return offset + 1\n}\n\nBuffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\n  this[offset] = (value & 0xff)\n  this[offset + 1] = (value >>> 8)\n  return offset + 2\n}\n\nBuffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\n  this[offset] = (value >>> 8)\n  this[offset + 1] = (value & 0xff)\n  return offset + 2\n}\n\nBuffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\n  this[offset + 3] = (value >>> 24)\n  this[offset + 2] = (value >>> 16)\n  this[offset + 1] = (value >>> 8)\n  this[offset] = (value & 0xff)\n  return offset + 4\n}\n\nBuffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\n  this[offset] = (value >>> 24)\n  this[offset + 1] = (value >>> 16)\n  this[offset + 2] = (value >>> 8)\n  this[offset + 3] = (value & 0xff)\n  return offset + 4\n}\n\nBuffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) {\n    var limit = Math.pow(2, (8 * byteLength) - 1)\n\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\n  }\n\n  var i = 0\n  var mul = 1\n  var sub = 0\n  this[offset] = value & 0xFF\n  while (++i < byteLength && (mul *= 0x100)) {\n    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {\n      sub = 1\n    }\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) {\n    var limit = Math.pow(2, (8 * byteLength) - 1)\n\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\n  }\n\n  var i = byteLength - 1\n  var mul = 1\n  var sub = 0\n  this[offset + i] = value & 0xFF\n  while (--i >= 0 && (mul *= 0x100)) {\n    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {\n      sub = 1\n    }\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)\n  if (value < 0) value = 0xff + value + 1\n  this[offset] = (value & 0xff)\n  return offset + 1\n}\n\nBuffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\n  this[offset] = (value & 0xff)\n  this[offset + 1] = (value >>> 8)\n  return offset + 2\n}\n\nBuffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\n  this[offset] = (value >>> 8)\n  this[offset + 1] = (value & 0xff)\n  return offset + 2\n}\n\nBuffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\n  this[offset] = (value & 0xff)\n  this[offset + 1] = (value >>> 8)\n  this[offset + 2] = (value >>> 16)\n  this[offset + 3] = (value >>> 24)\n  return offset + 4\n}\n\nBuffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\n  if (value < 0) value = 0xffffffff + value + 1\n  this[offset] = (value >>> 24)\n  this[offset + 1] = (value >>> 16)\n  this[offset + 2] = (value >>> 8)\n  this[offset + 3] = (value & 0xff)\n  return offset + 4\n}\n\nfunction checkIEEE754 (buf, value, offset, ext, max, min) {\n  if (offset + ext > buf.length) throw new RangeError('Index out of range')\n  if (offset < 0) throw new RangeError('Index out of range')\n}\n\nfunction writeFloat (buf, value, offset, littleEndian, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) {\n    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)\n  }\n  ieee754.write(buf, value, offset, littleEndian, 23, 4)\n  return offset + 4\n}\n\nBuffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {\n  return writeFloat(this, value, offset, true, noAssert)\n}\n\nBuffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {\n  return writeFloat(this, value, offset, false, noAssert)\n}\n\nfunction writeDouble (buf, value, offset, littleEndian, noAssert) {\n  value = +value\n  offset = offset >>> 0\n  if (!noAssert) {\n    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)\n  }\n  ieee754.write(buf, value, offset, littleEndian, 52, 8)\n  return offset + 8\n}\n\nBuffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {\n  return writeDouble(this, value, offset, true, noAssert)\n}\n\nBuffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {\n  return writeDouble(this, value, offset, false, noAssert)\n}\n\n// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)\nBuffer.prototype.copy = function copy (target, targetStart, start, end) {\n  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')\n  if (!start) start = 0\n  if (!end && end !== 0) end = this.length\n  if (targetStart >= target.length) targetStart = target.length\n  if (!targetStart) targetStart = 0\n  if (end > 0 && end < start) end = start\n\n  // Copy 0 bytes; we're done\n  if (end === start) return 0\n  if (target.length === 0 || this.length === 0) return 0\n\n  // Fatal error conditions\n  if (targetStart < 0) {\n    throw new RangeError('targetStart out of bounds')\n  }\n  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')\n  if (end < 0) throw new RangeError('sourceEnd out of bounds')\n\n  // Are we oob?\n  if (end > this.length) end = this.length\n  if (target.length - targetStart < end - start) {\n    end = target.length - targetStart + start\n  }\n\n  var len = end - start\n\n  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {\n    // Use built-in when available, missing from IE11\n    this.copyWithin(targetStart, start, end)\n  } else if (this === target && start < targetStart && targetStart < end) {\n    // descending copy from end\n    for (var i = len - 1; i >= 0; --i) {\n      target[i + targetStart] = this[i + start]\n    }\n  } else {\n    Uint8Array.prototype.set.call(\n      target,\n      this.subarray(start, end),\n      targetStart\n    )\n  }\n\n  return len\n}\n\n// Usage:\n//    buffer.fill(number[, offset[, end]])\n//    buffer.fill(buffer[, offset[, end]])\n//    buffer.fill(string[, offset[, end]][, encoding])\nBuffer.prototype.fill = function fill (val, start, end, encoding) {\n  // Handle string cases:\n  if (typeof val === 'string') {\n    if (typeof start === 'string') {\n      encoding = start\n      start = 0\n      end = this.length\n    } else if (typeof end === 'string') {\n      encoding = end\n      end = this.length\n    }\n    if (encoding !== undefined && typeof encoding !== 'string') {\n      throw new TypeError('encoding must be a string')\n    }\n    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {\n      throw new TypeError('Unknown encoding: ' + encoding)\n    }\n    if (val.length === 1) {\n      var code = val.charCodeAt(0)\n      if ((encoding === 'utf8' && code < 128) ||\n          encoding === 'latin1') {\n        // Fast path: If `val` fits into a single byte, use that numeric value.\n        val = code\n      }\n    }\n  } else if (typeof val === 'number') {\n    val = val & 255\n  }\n\n  // Invalid ranges are not set to a default, so can range check early.\n  if (start < 0 || this.length < start || this.length < end) {\n    throw new RangeError('Out of range index')\n  }\n\n  if (end <= start) {\n    return this\n  }\n\n  start = start >>> 0\n  end = end === undefined ? this.length : end >>> 0\n\n  if (!val) val = 0\n\n  var i\n  if (typeof val === 'number') {\n    for (i = start; i < end; ++i) {\n      this[i] = val\n    }\n  } else {\n    var bytes = Buffer.isBuffer(val)\n      ? val\n      : new Buffer(val, encoding)\n    var len = bytes.length\n    if (len === 0) {\n      throw new TypeError('The value \"' + val +\n        '\" is invalid for argument \"value\"')\n    }\n    for (i = 0; i < end - start; ++i) {\n      this[i + start] = bytes[i % len]\n    }\n  }\n\n  return this\n}\n\n// HELPER FUNCTIONS\n// ================\n\nvar INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g\n\nfunction base64clean (str) {\n  // Node takes equal signs as end of the Base64 encoding\n  str = str.split('=')[0]\n  // Node strips out invalid characters like \\n and \\t from the string, base64-js does not\n  str = str.trim().replace(INVALID_BASE64_RE, '')\n  // Node converts strings with length < 2 to ''\n  if (str.length < 2) return ''\n  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not\n  while (str.length % 4 !== 0) {\n    str = str + '='\n  }\n  return str\n}\n\nfunction toHex (n) {\n  if (n < 16) return '0' + n.toString(16)\n  return n.toString(16)\n}\n\nfunction utf8ToBytes (string, units) {\n  units = units || Infinity\n  var codePoint\n  var length = string.length\n  var leadSurrogate = null\n  var bytes = []\n\n  for (var i = 0; i < length; ++i) {\n    codePoint = string.charCodeAt(i)\n\n    // is surrogate component\n    if (codePoint > 0xD7FF && codePoint < 0xE000) {\n      // last char was a lead\n      if (!leadSurrogate) {\n        // no lead yet\n        if (codePoint > 0xDBFF) {\n          // unexpected trail\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n          continue\n        } else if (i + 1 === length) {\n          // unpaired lead\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n          continue\n        }\n\n        // valid lead\n        leadSurrogate = codePoint\n\n        continue\n      }\n\n      // 2 leads in a row\n      if (codePoint < 0xDC00) {\n        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n        leadSurrogate = codePoint\n        continue\n      }\n\n      // valid surrogate pair\n      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000\n    } else if (leadSurrogate) {\n      // valid bmp char, but last char was a lead\n      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n    }\n\n    leadSurrogate = null\n\n    // encode utf8\n    if (codePoint < 0x80) {\n      if ((units -= 1) < 0) break\n      bytes.push(codePoint)\n    } else if (codePoint < 0x800) {\n      if ((units -= 2) < 0) break\n      bytes.push(\n        codePoint >> 0x6 | 0xC0,\n        codePoint & 0x3F | 0x80\n      )\n    } else if (codePoint < 0x10000) {\n      if ((units -= 3) < 0) break\n      bytes.push(\n        codePoint >> 0xC | 0xE0,\n        codePoint >> 0x6 & 0x3F | 0x80,\n        codePoint & 0x3F | 0x80\n      )\n    } else if (codePoint < 0x110000) {\n      if ((units -= 4) < 0) break\n      bytes.push(\n        codePoint >> 0x12 | 0xF0,\n        codePoint >> 0xC & 0x3F | 0x80,\n        codePoint >> 0x6 & 0x3F | 0x80,\n        codePoint & 0x3F | 0x80\n      )\n    } else {\n      throw new Error('Invalid code point')\n    }\n  }\n\n  return bytes\n}\n\nfunction asciiToBytes (str) {\n  var byteArray = []\n  for (var i = 0; i < str.length; ++i) {\n    // Node's code seems to be doing this and not & 0x7F..\n    byteArray.push(str.charCodeAt(i) & 0xFF)\n  }\n  return byteArray\n}\n\nfunction utf16leToBytes (str, units) {\n  var c, hi, lo\n  var byteArray = []\n  for (var i = 0; i < str.length; ++i) {\n    if ((units -= 2) < 0) break\n\n    c = str.charCodeAt(i)\n    hi = c >> 8\n    lo = c % 256\n    byteArray.push(lo)\n    byteArray.push(hi)\n  }\n\n  return byteArray\n}\n\nfunction base64ToBytes (str) {\n  return base64.toByteArray(base64clean(str))\n}\n\nfunction blitBuffer (src, dst, offset, length) {\n  for (var i = 0; i < length; ++i) {\n    if ((i + offset >= dst.length) || (i >= src.length)) break\n    dst[i + offset] = src[i]\n  }\n  return i\n}\n\n// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check\n// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166\nfunction isArrayBuffer (obj) {\n  return obj instanceof ArrayBuffer ||\n    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&\n      typeof obj.byteLength === 'number')\n}\n\nfunction numberIsNaN (obj) {\n  return obj !== obj // eslint-disable-line no-self-compare\n}\n\n},{\"base64-js\":37,\"ieee754\":49}],42:[function(require,module,exports){\n(function (Buffer){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// NOTE: These type checking functions intentionally don't use `instanceof`\n// because it is fragile and can be easily faked with `Object.create()`.\n\nfunction isArray(arg) {\n  if (Array.isArray) {\n    return Array.isArray(arg);\n  }\n  return objectToString(arg) === '[object Array]';\n}\nexports.isArray = isArray;\n\nfunction isBoolean(arg) {\n  return typeof arg === 'boolean';\n}\nexports.isBoolean = isBoolean;\n\nfunction isNull(arg) {\n  return arg === null;\n}\nexports.isNull = isNull;\n\nfunction isNullOrUndefined(arg) {\n  return arg == null;\n}\nexports.isNullOrUndefined = isNullOrUndefined;\n\nfunction isNumber(arg) {\n  return typeof arg === 'number';\n}\nexports.isNumber = isNumber;\n\nfunction isString(arg) {\n  return typeof arg === 'string';\n}\nexports.isString = isString;\n\nfunction isSymbol(arg) {\n  return typeof arg === 'symbol';\n}\nexports.isSymbol = isSymbol;\n\nfunction isUndefined(arg) {\n  return arg === void 0;\n}\nexports.isUndefined = isUndefined;\n\nfunction isRegExp(re) {\n  return objectToString(re) === '[object RegExp]';\n}\nexports.isRegExp = isRegExp;\n\nfunction isObject(arg) {\n  return typeof arg === 'object' && arg !== null;\n}\nexports.isObject = isObject;\n\nfunction isDate(d) {\n  return objectToString(d) === '[object Date]';\n}\nexports.isDate = isDate;\n\nfunction isError(e) {\n  return (objectToString(e) === '[object Error]' || e instanceof Error);\n}\nexports.isError = isError;\n\nfunction isFunction(arg) {\n  return typeof arg === 'function';\n}\nexports.isFunction = isFunction;\n\nfunction isPrimitive(arg) {\n  return arg === null ||\n         typeof arg === 'boolean' ||\n         typeof arg === 'number' ||\n         typeof arg === 'string' ||\n         typeof arg === 'symbol' ||  // ES6 symbol\n         typeof arg === 'undefined';\n}\nexports.isPrimitive = isPrimitive;\n\nexports.isBuffer = Buffer.isBuffer;\n\nfunction objectToString(o) {\n  return Object.prototype.toString.call(o);\n}\n\n}).call(this,{\"isBuffer\":require(\"../../is-buffer/index.js\")})\n},{\"../../is-buffer/index.js\":51}],43:[function(require,module,exports){\n(function (process){\n/**\n * This is the web browser implementation of `debug()`.\n *\n * Expose `debug()` as the module.\n */\n\nexports = module.exports = require('./debug');\nexports.log = log;\nexports.formatArgs = formatArgs;\nexports.save = save;\nexports.load = load;\nexports.useColors = useColors;\nexports.storage = 'undefined' != typeof chrome\n               && 'undefined' != typeof chrome.storage\n                  ? chrome.storage.local\n                  : localstorage();\n\n/**\n * Colors.\n */\n\nexports.colors = [\n  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',\n  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',\n  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',\n  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',\n  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',\n  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',\n  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',\n  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',\n  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',\n  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',\n  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'\n];\n\n/**\n * Currently only WebKit-based Web Inspectors, Firefox >= v31,\n * and the Firebug extension (any Firefox version) are known\n * to support \"%c\" CSS customizations.\n *\n * TODO: add a `localStorage` variable to explicitly enable/disable colors\n */\n\nfunction useColors() {\n  // NB: In an Electron preload script, document will be defined but not fully\n  // initialized. Since we know we're in Chrome, we'll just detect this case\n  // explicitly\n  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {\n    return true;\n  }\n\n  // Internet Explorer and Edge do not support colors.\n  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\\/(\\d+)/)) {\n    return false;\n  }\n\n  // is webkit? http://stackoverflow.com/a/16459606/376773\n  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632\n  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||\n    // is firebug? http://stackoverflow.com/a/398120/376773\n    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||\n    // is firefox >= v31?\n    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages\n    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\\/(\\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||\n    // double check webkit in userAgent just in case we are in a worker\n    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\\/(\\d+)/));\n}\n\n/**\n * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.\n */\n\nexports.formatters.j = function(v) {\n  try {\n    return JSON.stringify(v);\n  } catch (err) {\n    return '[UnexpectedJSONParseError]: ' + err.message;\n  }\n};\n\n\n/**\n * Colorize log arguments if enabled.\n *\n * @api public\n */\n\nfunction formatArgs(args) {\n  var useColors = this.useColors;\n\n  args[0] = (useColors ? '%c' : '')\n    + this.namespace\n    + (useColors ? ' %c' : ' ')\n    + args[0]\n    + (useColors ? '%c ' : ' ')\n    + '+' + exports.humanize(this.diff);\n\n  if (!useColors) return;\n\n  var c = 'color: ' + this.color;\n  args.splice(1, 0, c, 'color: inherit')\n\n  // the final \"%c\" is somewhat tricky, because there could be other\n  // arguments passed either before or after the %c, so we need to\n  // figure out the correct index to insert the CSS into\n  var index = 0;\n  var lastC = 0;\n  args[0].replace(/%[a-zA-Z%]/g, function(match) {\n    if ('%%' === match) return;\n    index++;\n    if ('%c' === match) {\n      // we only are interested in the *last* %c\n      // (the user may have provided their own)\n      lastC = index;\n    }\n  });\n\n  args.splice(lastC, 0, c);\n}\n\n/**\n * Invokes `console.log()` when available.\n * No-op when `console.log` is not a \"function\".\n *\n * @api public\n */\n\nfunction log() {\n  // this hackery is required for IE8/9, where\n  // the `console.log` function doesn't have 'apply'\n  return 'object' === typeof console\n    && console.log\n    && Function.prototype.apply.call(console.log, console, arguments);\n}\n\n/**\n * Save `namespaces`.\n *\n * @param {String} namespaces\n * @api private\n */\n\nfunction save(namespaces) {\n  try {\n    if (null == namespaces) {\n      exports.storage.removeItem('debug');\n    } else {\n      exports.storage.debug = namespaces;\n    }\n  } catch(e) {}\n}\n\n/**\n * Load `namespaces`.\n *\n * @return {String} returns the previously persisted debug modes\n * @api private\n */\n\nfunction load() {\n  var r;\n  try {\n    r = exports.storage.debug;\n  } catch(e) {}\n\n  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG\n  if (!r && typeof process !== 'undefined' && 'env' in process) {\n    r = process.env.DEBUG;\n  }\n\n  return r;\n}\n\n/**\n * Enable namespaces listed in `localStorage.debug` initially.\n */\n\nexports.enable(load());\n\n/**\n * Localstorage attempts to return the localstorage.\n *\n * This is necessary because safari throws\n * when a user disables cookies/localstorage\n * and you attempt to access it.\n *\n * @return {LocalStorage}\n * @api private\n */\n\nfunction localstorage() {\n  try {\n    return window.localStorage;\n  } catch (e) {}\n}\n\n}).call(this,require('_process'))\n},{\"./debug\":44,\"_process\":56}],44:[function(require,module,exports){\n\n/**\n * This is the common logic for both the Node.js and web browser\n * implementations of `debug()`.\n *\n * Expose `debug()` as the module.\n */\n\nexports = module.exports = createDebug.debug = createDebug['default'] = createDebug;\nexports.coerce = coerce;\nexports.disable = disable;\nexports.enable = enable;\nexports.enabled = enabled;\nexports.humanize = require('ms');\n\n/**\n * Active `debug` instances.\n */\nexports.instances = [];\n\n/**\n * The currently active debug mode names, and names to skip.\n */\n\nexports.names = [];\nexports.skips = [];\n\n/**\n * Map of special \"%n\" handling functions, for the debug \"format\" argument.\n *\n * Valid key names are a single, lower or upper-case letter, i.e. \"n\" and \"N\".\n */\n\nexports.formatters = {};\n\n/**\n * Select a color.\n * @param {String} namespace\n * @return {Number}\n * @api private\n */\n\nfunction selectColor(namespace) {\n  var hash = 0, i;\n\n  for (i in namespace) {\n    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);\n    hash |= 0; // Convert to 32bit integer\n  }\n\n  return exports.colors[Math.abs(hash) % exports.colors.length];\n}\n\n/**\n * Create a debugger with the given `namespace`.\n *\n * @param {String} namespace\n * @return {Function}\n * @api public\n */\n\nfunction createDebug(namespace) {\n\n  var prevTime;\n\n  function debug() {\n    // disabled?\n    if (!debug.enabled) return;\n\n    var self = debug;\n\n    // set `diff` timestamp\n    var curr = +new Date();\n    var ms = curr - (prevTime || curr);\n    self.diff = ms;\n    self.prev = prevTime;\n    self.curr = curr;\n    prevTime = curr;\n\n    // turn the `arguments` into a proper Array\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n\n    args[0] = exports.coerce(args[0]);\n\n    if ('string' !== typeof args[0]) {\n      // anything else let's inspect with %O\n      args.unshift('%O');\n    }\n\n    // apply any `formatters` transformations\n    var index = 0;\n    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {\n      // if we encounter an escaped % then don't increase the array index\n      if (match === '%%') return match;\n      index++;\n      var formatter = exports.formatters[format];\n      if ('function' === typeof formatter) {\n        var val = args[index];\n        match = formatter.call(self, val);\n\n        // now we need to remove `args[index]` since it's inlined in the `format`\n        args.splice(index, 1);\n        index--;\n      }\n      return match;\n    });\n\n    // apply env-specific formatting (colors, etc.)\n    exports.formatArgs.call(self, args);\n\n    var logFn = debug.log || exports.log || console.log.bind(console);\n    logFn.apply(self, args);\n  }\n\n  debug.namespace = namespace;\n  debug.enabled = exports.enabled(namespace);\n  debug.useColors = exports.useColors();\n  debug.color = selectColor(namespace);\n  debug.destroy = destroy;\n\n  // env-specific initialization logic for debug instances\n  if ('function' === typeof exports.init) {\n    exports.init(debug);\n  }\n\n  exports.instances.push(debug);\n\n  return debug;\n}\n\nfunction destroy () {\n  var index = exports.instances.indexOf(this);\n  if (index !== -1) {\n    exports.instances.splice(index, 1);\n    return true;\n  } else {\n    return false;\n  }\n}\n\n/**\n * Enables a debug mode by namespaces. This can include modes\n * separated by a colon and wildcards.\n *\n * @param {String} namespaces\n * @api public\n */\n\nfunction enable(namespaces) {\n  exports.save(namespaces);\n\n  exports.names = [];\n  exports.skips = [];\n\n  var i;\n  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\\s,]+/);\n  var len = split.length;\n\n  for (i = 0; i < len; i++) {\n    if (!split[i]) continue; // ignore empty strings\n    namespaces = split[i].replace(/\\*/g, '.*?');\n    if (namespaces[0] === '-') {\n      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));\n    } else {\n      exports.names.push(new RegExp('^' + namespaces + '$'));\n    }\n  }\n\n  for (i = 0; i < exports.instances.length; i++) {\n    var instance = exports.instances[i];\n    instance.enabled = exports.enabled(instance.namespace);\n  }\n}\n\n/**\n * Disable debug output.\n *\n * @api public\n */\n\nfunction disable() {\n  exports.enable('');\n}\n\n/**\n * Returns true if the given mode name is enabled, false otherwise.\n *\n * @param {String} name\n * @return {Boolean}\n * @api public\n */\n\nfunction enabled(name) {\n  if (name[name.length - 1] === '*') {\n    return true;\n  }\n  var i, len;\n  for (i = 0, len = exports.skips.length; i < len; i++) {\n    if (exports.skips[i].test(name)) {\n      return false;\n    }\n  }\n  for (i = 0, len = exports.names.length; i < len; i++) {\n    if (exports.names[i].test(name)) {\n      return true;\n    }\n  }\n  return false;\n}\n\n/**\n * Coerce `val`.\n *\n * @param {Mixed} val\n * @return {Mixed}\n * @api private\n */\n\nfunction coerce(val) {\n  if (val instanceof Error) return val.stack || val.message;\n  return val;\n}\n\n},{\"ms\":54}],45:[function(require,module,exports){\n/*!\n\n diff v3.5.0\n\nSoftware License Agreement (BSD License)\n\nCopyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>\n\nAll rights reserved.\n\nRedistribution and use of this software in source and binary forms, with or without modification,\nare permitted provided that the following conditions are met:\n\n* Redistributions of source code must retain the above\n  copyright notice, this list of conditions and the\n  following disclaimer.\n\n* Redistributions in binary form must reproduce the above\n  copyright notice, this list of conditions and the\n  following disclaimer in the documentation and/or other\n  materials provided with the distribution.\n\n* Neither the name of Kevin Decker nor the names of its\n  contributors may be used to endorse or promote products\n  derived from this software without specific prior\n  written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\" AND ANY EXPRESS OR\nIMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND\nFITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR\nCONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL\nDAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER\nIN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT\nOF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n@license\n*/\n(function webpackUniversalModuleDefinition(root, factory) {\n\tif(typeof exports === 'object' && typeof module === 'object')\n\t\tmodule.exports = factory();\n\telse if(false)\n\t\tdefine([], factory);\n\telse if(typeof exports === 'object')\n\t\texports[\"JsDiff\"] = factory();\n\telse\n\t\troot[\"JsDiff\"] = factory();\n})(this, function() {\nreturn /******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId])\n/******/ \t\t\treturn installedModules[moduleId].exports;\n\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\texports: {},\n/******/ \t\t\tid: moduleId,\n/******/ \t\t\tloaded: false\n/******/ \t\t};\n\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.loaded = true;\n\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n\n\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(0);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports.canonicalize = exports.convertChangesToXML = exports.convertChangesToDMP = exports.merge = exports.parsePatch = exports.applyPatches = exports.applyPatch = exports.createPatch = exports.createTwoFilesPatch = exports.structuredPatch = exports.diffArrays = exports.diffJson = exports.diffCss = exports.diffSentences = exports.diffTrimmedLines = exports.diffLines = exports.diffWordsWithSpace = exports.diffWords = exports.diffChars = exports.Diff = undefined;\n\n\t/*istanbul ignore end*/var /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);\n\n\t/*istanbul ignore end*/var /*istanbul ignore start*/_character = __webpack_require__(2) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_word = __webpack_require__(3) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_line = __webpack_require__(5) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_sentence = __webpack_require__(6) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_css = __webpack_require__(7) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_json = __webpack_require__(8) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_array = __webpack_require__(9) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_apply = __webpack_require__(10) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_parse = __webpack_require__(11) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_merge = __webpack_require__(13) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_create = __webpack_require__(14) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_dmp = __webpack_require__(16) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_xml = __webpack_require__(17) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\n\t/* See LICENSE file for terms of use */\n\n\t/*\n\t * Text diff implementation.\n\t *\n\t * This library supports the following APIS:\n\t * JsDiff.diffChars: Character by character diff\n\t * JsDiff.diffWords: Word (as defined by \\b regex) diff which ignores whitespace\n\t * JsDiff.diffLines: Line based diff\n\t *\n\t * JsDiff.diffCss: Diff targeted at CSS content\n\t *\n\t * These methods are based on the implementation proposed in\n\t * \"An O(ND) Difference Algorithm and its Variations\" (Myers, 1986).\n\t * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927\n\t */\n\texports. /*istanbul ignore end*/Diff = _base2['default'];\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/diffChars = _character.diffChars;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWords = _word.diffWords;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWordsWithSpace = _word.diffWordsWithSpace;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/diffLines = _line.diffLines;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/diffTrimmedLines = _line.diffTrimmedLines;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/diffSentences = _sentence.diffSentences;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/diffCss = _css.diffCss;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/diffJson = _json.diffJson;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/diffArrays = _array.diffArrays;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/structuredPatch = _create.structuredPatch;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/createTwoFilesPatch = _create.createTwoFilesPatch;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/createPatch = _create.createPatch;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatch = _apply.applyPatch;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatches = _apply.applyPatches;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/parsePatch = _parse.parsePatch;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/merge = _merge.merge;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/convertChangesToDMP = _dmp.convertChangesToDMP;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/convertChangesToXML = _xml.convertChangesToXML;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/canonicalize = _json.canonicalize;\n\n\n\n/***/ }),\n/* 1 */\n/***/ (function(module, exports) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports['default'] = /*istanbul ignore end*/Diff;\n\tfunction Diff() {}\n\n\tDiff.prototype = {\n\t  /*istanbul ignore start*/ /*istanbul ignore end*/diff: function diff(oldString, newString) {\n\t    /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n\t    var callback = options.callback;\n\t    if (typeof options === 'function') {\n\t      callback = options;\n\t      options = {};\n\t    }\n\t    this.options = options;\n\n\t    var self = this;\n\n\t    function done(value) {\n\t      if (callback) {\n\t        setTimeout(function () {\n\t          callback(undefined, value);\n\t        }, 0);\n\t        return true;\n\t      } else {\n\t        return value;\n\t      }\n\t    }\n\n\t    // Allow subclasses to massage the input prior to running\n\t    oldString = this.castInput(oldString);\n\t    newString = this.castInput(newString);\n\n\t    oldString = this.removeEmpty(this.tokenize(oldString));\n\t    newString = this.removeEmpty(this.tokenize(newString));\n\n\t    var newLen = newString.length,\n\t        oldLen = oldString.length;\n\t    var editLength = 1;\n\t    var maxEditLength = newLen + oldLen;\n\t    var bestPath = [{ newPos: -1, components: [] }];\n\n\t    // Seed editLength = 0, i.e. the content starts with the same values\n\t    var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);\n\t    if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {\n\t      // Identity per the equality and tokenizer\n\t      return done([{ value: this.join(newString), count: newString.length }]);\n\t    }\n\n\t    // Main worker method. checks all permutations of a given edit length for acceptance.\n\t    function execEditLength() {\n\t      for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {\n\t        var basePath = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;\n\t        var addPath = bestPath[diagonalPath - 1],\n\t            removePath = bestPath[diagonalPath + 1],\n\t            _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;\n\t        if (addPath) {\n\t          // No one else is going to attempt to use this value, clear it\n\t          bestPath[diagonalPath - 1] = undefined;\n\t        }\n\n\t        var canAdd = addPath && addPath.newPos + 1 < newLen,\n\t            canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;\n\t        if (!canAdd && !canRemove) {\n\t          // If this path is a terminal then prune\n\t          bestPath[diagonalPath] = undefined;\n\t          continue;\n\t        }\n\n\t        // Select the diagonal that we want to branch from. We select the prior\n\t        // path whose position in the new string is the farthest from the origin\n\t        // and does not pass the bounds of the diff graph\n\t        if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {\n\t          basePath = clonePath(removePath);\n\t          self.pushComponent(basePath.components, undefined, true);\n\t        } else {\n\t          basePath = addPath; // No need to clone, we've pulled it from the list\n\t          basePath.newPos++;\n\t          self.pushComponent(basePath.components, true, undefined);\n\t        }\n\n\t        _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);\n\n\t        // If we have hit the end of both strings, then we are done\n\t        if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {\n\t          return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));\n\t        } else {\n\t          // Otherwise track this path as a potential candidate and continue.\n\t          bestPath[diagonalPath] = basePath;\n\t        }\n\t      }\n\n\t      editLength++;\n\t    }\n\n\t    // Performs the length of edit iteration. Is a bit fugly as this has to support the\n\t    // sync and async mode which is never fun. Loops over execEditLength until a value\n\t    // is produced.\n\t    if (callback) {\n\t      (function exec() {\n\t        setTimeout(function () {\n\t          // This should not happen, but we want to be safe.\n\t          /* istanbul ignore next */\n\t          if (editLength > maxEditLength) {\n\t            return callback();\n\t          }\n\n\t          if (!execEditLength()) {\n\t            exec();\n\t          }\n\t        }, 0);\n\t      })();\n\t    } else {\n\t      while (editLength <= maxEditLength) {\n\t        var ret = execEditLength();\n\t        if (ret) {\n\t          return ret;\n\t        }\n\t      }\n\t    }\n\t  },\n\t  /*istanbul ignore start*/ /*istanbul ignore end*/pushComponent: function pushComponent(components, added, removed) {\n\t    var last = components[components.length - 1];\n\t    if (last && last.added === added && last.removed === removed) {\n\t      // We need to clone here as the component clone operation is just\n\t      // as shallow array clone\n\t      components[components.length - 1] = { count: last.count + 1, added: added, removed: removed };\n\t    } else {\n\t      components.push({ count: 1, added: added, removed: removed });\n\t    }\n\t  },\n\t  /*istanbul ignore start*/ /*istanbul ignore end*/extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {\n\t    var newLen = newString.length,\n\t        oldLen = oldString.length,\n\t        newPos = basePath.newPos,\n\t        oldPos = newPos - diagonalPath,\n\t        commonCount = 0;\n\t    while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {\n\t      newPos++;\n\t      oldPos++;\n\t      commonCount++;\n\t    }\n\n\t    if (commonCount) {\n\t      basePath.components.push({ count: commonCount });\n\t    }\n\n\t    basePath.newPos = newPos;\n\t    return oldPos;\n\t  },\n\t  /*istanbul ignore start*/ /*istanbul ignore end*/equals: function equals(left, right) {\n\t    if (this.options.comparator) {\n\t      return this.options.comparator(left, right);\n\t    } else {\n\t      return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();\n\t    }\n\t  },\n\t  /*istanbul ignore start*/ /*istanbul ignore end*/removeEmpty: function removeEmpty(array) {\n\t    var ret = [];\n\t    for (var i = 0; i < array.length; i++) {\n\t      if (array[i]) {\n\t        ret.push(array[i]);\n\t      }\n\t    }\n\t    return ret;\n\t  },\n\t  /*istanbul ignore start*/ /*istanbul ignore end*/castInput: function castInput(value) {\n\t    return value;\n\t  },\n\t  /*istanbul ignore start*/ /*istanbul ignore end*/tokenize: function tokenize(value) {\n\t    return value.split('');\n\t  },\n\t  /*istanbul ignore start*/ /*istanbul ignore end*/join: function join(chars) {\n\t    return chars.join('');\n\t  }\n\t};\n\n\tfunction buildValues(diff, components, newString, oldString, useLongestToken) {\n\t  var componentPos = 0,\n\t      componentLen = components.length,\n\t      newPos = 0,\n\t      oldPos = 0;\n\n\t  for (; componentPos < componentLen; componentPos++) {\n\t    var component = components[componentPos];\n\t    if (!component.removed) {\n\t      if (!component.added && useLongestToken) {\n\t        var value = newString.slice(newPos, newPos + component.count);\n\t        value = value.map(function (value, i) {\n\t          var oldValue = oldString[oldPos + i];\n\t          return oldValue.length > value.length ? oldValue : value;\n\t        });\n\n\t        component.value = diff.join(value);\n\t      } else {\n\t        component.value = diff.join(newString.slice(newPos, newPos + component.count));\n\t      }\n\t      newPos += component.count;\n\n\t      // Common case\n\t      if (!component.added) {\n\t        oldPos += component.count;\n\t      }\n\t    } else {\n\t      component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));\n\t      oldPos += component.count;\n\n\t      // Reverse add and remove so removes are output first to match common convention\n\t      // The diffing algorithm is tied to add then remove output and this is the simplest\n\t      // route to get the desired output with minimal overhead.\n\t      if (componentPos && components[componentPos - 1].added) {\n\t        var tmp = components[componentPos - 1];\n\t        components[componentPos - 1] = components[componentPos];\n\t        components[componentPos] = tmp;\n\t      }\n\t    }\n\t  }\n\n\t  // Special case handle for when one terminal is ignored (i.e. whitespace).\n\t  // For this case we merge the terminal into the prior string and drop the change.\n\t  // This is only available for string mode.\n\t  var lastComponent = components[componentLen - 1];\n\t  if (componentLen > 1 && typeof lastComponent.value === 'string' && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {\n\t    components[componentLen - 2].value += lastComponent.value;\n\t    components.pop();\n\t  }\n\n\t  return components;\n\t}\n\n\tfunction clonePath(path) {\n\t  return { newPos: path.newPos, components: path.components.slice(0) };\n\t}\n\n\n\n/***/ }),\n/* 2 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports.characterDiff = undefined;\n\texports. /*istanbul ignore end*/diffChars = diffChars;\n\n\tvar /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);\n\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\n\t/*istanbul ignore end*/var characterDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/characterDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();\n\tfunction diffChars(oldStr, newStr, options) {\n\t  return characterDiff.diff(oldStr, newStr, options);\n\t}\n\n\n\n/***/ }),\n/* 3 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports.wordDiff = undefined;\n\texports. /*istanbul ignore end*/diffWords = diffWords;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWordsWithSpace = diffWordsWithSpace;\n\n\tvar /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);\n\n\t/*istanbul ignore end*/var /*istanbul ignore start*/_params = __webpack_require__(4) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\n\t/*istanbul ignore end*/ // Based on https://en.wikipedia.org/wiki/Latin_script_in_Unicode\n\t//\n\t// Ranges and exceptions:\n\t// Latin-1 Supplement, 0080–00FF\n\t//  - U+00D7  × Multiplication sign\n\t//  - U+00F7  ÷ Division sign\n\t// Latin Extended-A, 0100–017F\n\t// Latin Extended-B, 0180–024F\n\t// IPA Extensions, 0250–02AF\n\t// Spacing Modifier Letters, 02B0–02FF\n\t//  - U+02C7  ˇ &#711;  Caron\n\t//  - U+02D8  ˘ &#728;  Breve\n\t//  - U+02D9  ˙ &#729;  Dot Above\n\t//  - U+02DA  ˚ &#730;  Ring Above\n\t//  - U+02DB  ˛ &#731;  Ogonek\n\t//  - U+02DC  ˜ &#732;  Small Tilde\n\t//  - U+02DD  ˝ &#733;  Double Acute Accent\n\t// Latin Extended Additional, 1E00–1EFF\n\tvar extendedWordChars = /^[A-Za-z\\xC0-\\u02C6\\u02C8-\\u02D7\\u02DE-\\u02FF\\u1E00-\\u1EFF]+$/;\n\n\tvar reWhitespace = /\\S/;\n\n\tvar wordDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/wordDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();\n\twordDiff.equals = function (left, right) {\n\t  if (this.options.ignoreCase) {\n\t    left = left.toLowerCase();\n\t    right = right.toLowerCase();\n\t  }\n\t  return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);\n\t};\n\twordDiff.tokenize = function (value) {\n\t  var tokens = value.split(/(\\s+|\\b)/);\n\n\t  // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.\n\t  for (var i = 0; i < tokens.length - 1; i++) {\n\t    // If we have an empty string in the next field and we have only word chars before and after, merge\n\t    if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {\n\t      tokens[i] += tokens[i + 2];\n\t      tokens.splice(i + 1, 2);\n\t      i--;\n\t    }\n\t  }\n\n\t  return tokens;\n\t};\n\n\tfunction diffWords(oldStr, newStr, options) {\n\t  options = /*istanbul ignore start*/(0, _params.generateOptions) /*istanbul ignore end*/(options, { ignoreWhitespace: true });\n\t  return wordDiff.diff(oldStr, newStr, options);\n\t}\n\n\tfunction diffWordsWithSpace(oldStr, newStr, options) {\n\t  return wordDiff.diff(oldStr, newStr, options);\n\t}\n\n\n\n/***/ }),\n/* 4 */\n/***/ (function(module, exports) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports. /*istanbul ignore end*/generateOptions = generateOptions;\n\tfunction generateOptions(options, defaults) {\n\t  if (typeof options === 'function') {\n\t    defaults.callback = options;\n\t  } else if (options) {\n\t    for (var name in options) {\n\t      /* istanbul ignore else */\n\t      if (options.hasOwnProperty(name)) {\n\t        defaults[name] = options[name];\n\t      }\n\t    }\n\t  }\n\t  return defaults;\n\t}\n\n\n\n/***/ }),\n/* 5 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports.lineDiff = undefined;\n\texports. /*istanbul ignore end*/diffLines = diffLines;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/diffTrimmedLines = diffTrimmedLines;\n\n\tvar /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);\n\n\t/*istanbul ignore end*/var /*istanbul ignore start*/_params = __webpack_require__(4) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\n\t/*istanbul ignore end*/var lineDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/lineDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();\n\tlineDiff.tokenize = function (value) {\n\t  var retLines = [],\n\t      linesAndNewlines = value.split(/(\\n|\\r\\n)/);\n\n\t  // Ignore the final empty token that occurs if the string ends with a new line\n\t  if (!linesAndNewlines[linesAndNewlines.length - 1]) {\n\t    linesAndNewlines.pop();\n\t  }\n\n\t  // Merge the content and line separators into single tokens\n\t  for (var i = 0; i < linesAndNewlines.length; i++) {\n\t    var line = linesAndNewlines[i];\n\n\t    if (i % 2 && !this.options.newlineIsToken) {\n\t      retLines[retLines.length - 1] += line;\n\t    } else {\n\t      if (this.options.ignoreWhitespace) {\n\t        line = line.trim();\n\t      }\n\t      retLines.push(line);\n\t    }\n\t  }\n\n\t  return retLines;\n\t};\n\n\tfunction diffLines(oldStr, newStr, callback) {\n\t  return lineDiff.diff(oldStr, newStr, callback);\n\t}\n\tfunction diffTrimmedLines(oldStr, newStr, callback) {\n\t  var options = /*istanbul ignore start*/(0, _params.generateOptions) /*istanbul ignore end*/(callback, { ignoreWhitespace: true });\n\t  return lineDiff.diff(oldStr, newStr, options);\n\t}\n\n\n\n/***/ }),\n/* 6 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports.sentenceDiff = undefined;\n\texports. /*istanbul ignore end*/diffSentences = diffSentences;\n\n\tvar /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);\n\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\n\t/*istanbul ignore end*/var sentenceDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/sentenceDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();\n\tsentenceDiff.tokenize = function (value) {\n\t  return value.split(/(\\S.+?[.!?])(?=\\s+|$)/);\n\t};\n\n\tfunction diffSentences(oldStr, newStr, callback) {\n\t  return sentenceDiff.diff(oldStr, newStr, callback);\n\t}\n\n\n\n/***/ }),\n/* 7 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports.cssDiff = undefined;\n\texports. /*istanbul ignore end*/diffCss = diffCss;\n\n\tvar /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);\n\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\n\t/*istanbul ignore end*/var cssDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/cssDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();\n\tcssDiff.tokenize = function (value) {\n\t  return value.split(/([{}:;,]|\\s+)/);\n\t};\n\n\tfunction diffCss(oldStr, newStr, callback) {\n\t  return cssDiff.diff(oldStr, newStr, callback);\n\t}\n\n\n\n/***/ }),\n/* 8 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports.jsonDiff = undefined;\n\n\tvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n\texports. /*istanbul ignore end*/diffJson = diffJson;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/canonicalize = canonicalize;\n\n\tvar /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);\n\n\t/*istanbul ignore end*/var /*istanbul ignore start*/_line = __webpack_require__(5) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\n\t/*istanbul ignore end*/var objectPrototypeToString = Object.prototype.toString;\n\n\tvar jsonDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/jsonDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();\n\t// Discriminate between two lines of pretty-printed, serialized JSON where one of them has a\n\t// dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:\n\tjsonDiff.useLongestToken = true;\n\n\tjsonDiff.tokenize = /*istanbul ignore start*/_line.lineDiff /*istanbul ignore end*/.tokenize;\n\tjsonDiff.castInput = function (value) {\n\t  /*istanbul ignore start*/var _options = /*istanbul ignore end*/this.options,\n\t      undefinedReplacement = _options.undefinedReplacement,\n\t      _options$stringifyRep = _options.stringifyReplacer,\n\t      stringifyReplacer = _options$stringifyRep === undefined ? function (k, v) /*istanbul ignore start*/{\n\t    return (/*istanbul ignore end*/typeof v === 'undefined' ? undefinedReplacement : v\n\t    );\n\t  } : _options$stringifyRep;\n\n\n\t  return typeof value === 'string' ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, '  ');\n\t};\n\tjsonDiff.equals = function (left, right) {\n\t  return (/*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/.prototype.equals.call(jsonDiff, left.replace(/,([\\r\\n])/g, '$1'), right.replace(/,([\\r\\n])/g, '$1'))\n\t  );\n\t};\n\n\tfunction diffJson(oldObj, newObj, options) {\n\t  return jsonDiff.diff(oldObj, newObj, options);\n\t}\n\n\t// This function handles the presence of circular references by bailing out when encountering an\n\t// object that is already on the \"stack\" of items being processed. Accepts an optional replacer\n\tfunction canonicalize(obj, stack, replacementStack, replacer, key) {\n\t  stack = stack || [];\n\t  replacementStack = replacementStack || [];\n\n\t  if (replacer) {\n\t    obj = replacer(key, obj);\n\t  }\n\n\t  var i = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;\n\n\t  for (i = 0; i < stack.length; i += 1) {\n\t    if (stack[i] === obj) {\n\t      return replacementStack[i];\n\t    }\n\t  }\n\n\t  var canonicalizedObj = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;\n\n\t  if ('[object Array]' === objectPrototypeToString.call(obj)) {\n\t    stack.push(obj);\n\t    canonicalizedObj = new Array(obj.length);\n\t    replacementStack.push(canonicalizedObj);\n\t    for (i = 0; i < obj.length; i += 1) {\n\t      canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);\n\t    }\n\t    stack.pop();\n\t    replacementStack.pop();\n\t    return canonicalizedObj;\n\t  }\n\n\t  if (obj && obj.toJSON) {\n\t    obj = obj.toJSON();\n\t  }\n\n\t  if ( /*istanbul ignore start*/(typeof /*istanbul ignore end*/obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {\n\t    stack.push(obj);\n\t    canonicalizedObj = {};\n\t    replacementStack.push(canonicalizedObj);\n\t    var sortedKeys = [],\n\t        _key = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;\n\t    for (_key in obj) {\n\t      /* istanbul ignore else */\n\t      if (obj.hasOwnProperty(_key)) {\n\t        sortedKeys.push(_key);\n\t      }\n\t    }\n\t    sortedKeys.sort();\n\t    for (i = 0; i < sortedKeys.length; i += 1) {\n\t      _key = sortedKeys[i];\n\t      canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);\n\t    }\n\t    stack.pop();\n\t    replacementStack.pop();\n\t  } else {\n\t    canonicalizedObj = obj;\n\t  }\n\t  return canonicalizedObj;\n\t}\n\n\n\n/***/ }),\n/* 9 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports.arrayDiff = undefined;\n\texports. /*istanbul ignore end*/diffArrays = diffArrays;\n\n\tvar /*istanbul ignore start*/_base = __webpack_require__(1) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/var _base2 = _interopRequireDefault(_base);\n\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\n\t/*istanbul ignore end*/var arrayDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/arrayDiff = new /*istanbul ignore start*/_base2['default'] /*istanbul ignore end*/();\n\tarrayDiff.tokenize = function (value) {\n\t  return value.slice();\n\t};\n\tarrayDiff.join = arrayDiff.removeEmpty = function (value) {\n\t  return value;\n\t};\n\n\tfunction diffArrays(oldArr, newArr, callback) {\n\t  return arrayDiff.diff(oldArr, newArr, callback);\n\t}\n\n\n\n/***/ }),\n/* 10 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports. /*istanbul ignore end*/applyPatch = applyPatch;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatches = applyPatches;\n\n\tvar /*istanbul ignore start*/_parse = __webpack_require__(11) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_distanceIterator = __webpack_require__(12) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/var _distanceIterator2 = _interopRequireDefault(_distanceIterator);\n\n\tfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\n\t/*istanbul ignore end*/function applyPatch(source, uniDiff) {\n\t  /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n\t  if (typeof uniDiff === 'string') {\n\t    uniDiff = /*istanbul ignore start*/(0, _parse.parsePatch) /*istanbul ignore end*/(uniDiff);\n\t  }\n\n\t  if (Array.isArray(uniDiff)) {\n\t    if (uniDiff.length > 1) {\n\t      throw new Error('applyPatch only works with a single input.');\n\t    }\n\n\t    uniDiff = uniDiff[0];\n\t  }\n\n\t  // Apply the diff to the input\n\t  var lines = source.split(/\\r\\n|[\\n\\v\\f\\r\\x85]/),\n\t      delimiters = source.match(/\\r\\n|[\\n\\v\\f\\r\\x85]/g) || [],\n\t      hunks = uniDiff.hunks,\n\t      compareLine = options.compareLine || function (lineNumber, line, operation, patchContent) /*istanbul ignore start*/{\n\t    return (/*istanbul ignore end*/line === patchContent\n\t    );\n\t  },\n\t      errorCount = 0,\n\t      fuzzFactor = options.fuzzFactor || 0,\n\t      minLine = 0,\n\t      offset = 0,\n\t      removeEOFNL = /*istanbul ignore start*/void 0 /*istanbul ignore end*/,\n\t      addEOFNL = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;\n\n\t  /**\n\t   * Checks if the hunk exactly fits on the provided location\n\t   */\n\t  function hunkFits(hunk, toPos) {\n\t    for (var j = 0; j < hunk.lines.length; j++) {\n\t      var line = hunk.lines[j],\n\t          operation = line.length > 0 ? line[0] : ' ',\n\t          content = line.length > 0 ? line.substr(1) : line;\n\n\t      if (operation === ' ' || operation === '-') {\n\t        // Context sanity check\n\t        if (!compareLine(toPos + 1, lines[toPos], operation, content)) {\n\t          errorCount++;\n\n\t          if (errorCount > fuzzFactor) {\n\t            return false;\n\t          }\n\t        }\n\t        toPos++;\n\t      }\n\t    }\n\n\t    return true;\n\t  }\n\n\t  // Search best fit offsets for each hunk based on the previous ones\n\t  for (var i = 0; i < hunks.length; i++) {\n\t    var hunk = hunks[i],\n\t        maxLine = lines.length - hunk.oldLines,\n\t        localOffset = 0,\n\t        toPos = offset + hunk.oldStart - 1;\n\n\t    var iterator = /*istanbul ignore start*/(0, _distanceIterator2['default']) /*istanbul ignore end*/(toPos, minLine, maxLine);\n\n\t    for (; localOffset !== undefined; localOffset = iterator()) {\n\t      if (hunkFits(hunk, toPos + localOffset)) {\n\t        hunk.offset = offset += localOffset;\n\t        break;\n\t      }\n\t    }\n\n\t    if (localOffset === undefined) {\n\t      return false;\n\t    }\n\n\t    // Set lower text limit to end of the current hunk, so next ones don't try\n\t    // to fit over already patched text\n\t    minLine = hunk.offset + hunk.oldStart + hunk.oldLines;\n\t  }\n\n\t  // Apply patch hunks\n\t  var diffOffset = 0;\n\t  for (var _i = 0; _i < hunks.length; _i++) {\n\t    var _hunk = hunks[_i],\n\t        _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;\n\t    diffOffset += _hunk.newLines - _hunk.oldLines;\n\n\t    if (_toPos < 0) {\n\t      // Creating a new file\n\t      _toPos = 0;\n\t    }\n\n\t    for (var j = 0; j < _hunk.lines.length; j++) {\n\t      var line = _hunk.lines[j],\n\t          operation = line.length > 0 ? line[0] : ' ',\n\t          content = line.length > 0 ? line.substr(1) : line,\n\t          delimiter = _hunk.linedelimiters[j];\n\n\t      if (operation === ' ') {\n\t        _toPos++;\n\t      } else if (operation === '-') {\n\t        lines.splice(_toPos, 1);\n\t        delimiters.splice(_toPos, 1);\n\t        /* istanbul ignore else */\n\t      } else if (operation === '+') {\n\t        lines.splice(_toPos, 0, content);\n\t        delimiters.splice(_toPos, 0, delimiter);\n\t        _toPos++;\n\t      } else if (operation === '\\\\') {\n\t        var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;\n\t        if (previousOperation === '+') {\n\t          removeEOFNL = true;\n\t        } else if (previousOperation === '-') {\n\t          addEOFNL = true;\n\t        }\n\t      }\n\t    }\n\t  }\n\n\t  // Handle EOFNL insertion/removal\n\t  if (removeEOFNL) {\n\t    while (!lines[lines.length - 1]) {\n\t      lines.pop();\n\t      delimiters.pop();\n\t    }\n\t  } else if (addEOFNL) {\n\t    lines.push('');\n\t    delimiters.push('\\n');\n\t  }\n\t  for (var _k = 0; _k < lines.length - 1; _k++) {\n\t    lines[_k] = lines[_k] + delimiters[_k];\n\t  }\n\t  return lines.join('');\n\t}\n\n\t// Wrapper that supports multiple file patches via callbacks.\n\tfunction applyPatches(uniDiff, options) {\n\t  if (typeof uniDiff === 'string') {\n\t    uniDiff = /*istanbul ignore start*/(0, _parse.parsePatch) /*istanbul ignore end*/(uniDiff);\n\t  }\n\n\t  var currentIndex = 0;\n\t  function processIndex() {\n\t    var index = uniDiff[currentIndex++];\n\t    if (!index) {\n\t      return options.complete();\n\t    }\n\n\t    options.loadFile(index, function (err, data) {\n\t      if (err) {\n\t        return options.complete(err);\n\t      }\n\n\t      var updatedContent = applyPatch(data, index, options);\n\t      options.patched(index, updatedContent, function (err) {\n\t        if (err) {\n\t          return options.complete(err);\n\t        }\n\n\t        processIndex();\n\t      });\n\t    });\n\t  }\n\t  processIndex();\n\t}\n\n\n\n/***/ }),\n/* 11 */\n/***/ (function(module, exports) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports. /*istanbul ignore end*/parsePatch = parsePatch;\n\tfunction parsePatch(uniDiff) {\n\t  /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n\t  var diffstr = uniDiff.split(/\\r\\n|[\\n\\v\\f\\r\\x85]/),\n\t      delimiters = uniDiff.match(/\\r\\n|[\\n\\v\\f\\r\\x85]/g) || [],\n\t      list = [],\n\t      i = 0;\n\n\t  function parseIndex() {\n\t    var index = {};\n\t    list.push(index);\n\n\t    // Parse diff metadata\n\t    while (i < diffstr.length) {\n\t      var line = diffstr[i];\n\n\t      // File header found, end parsing diff metadata\n\t      if (/^(\\-\\-\\-|\\+\\+\\+|@@)\\s/.test(line)) {\n\t        break;\n\t      }\n\n\t      // Diff index\n\t      var header = /^(?:Index:|diff(?: -r \\w+)+)\\s+(.+?)\\s*$/.exec(line);\n\t      if (header) {\n\t        index.index = header[1];\n\t      }\n\n\t      i++;\n\t    }\n\n\t    // Parse file headers if they are defined. Unified diff requires them, but\n\t    // there's no technical issues to have an isolated hunk without file header\n\t    parseFileHeader(index);\n\t    parseFileHeader(index);\n\n\t    // Parse hunks\n\t    index.hunks = [];\n\n\t    while (i < diffstr.length) {\n\t      var _line = diffstr[i];\n\n\t      if (/^(Index:|diff|\\-\\-\\-|\\+\\+\\+)\\s/.test(_line)) {\n\t        break;\n\t      } else if (/^@@/.test(_line)) {\n\t        index.hunks.push(parseHunk());\n\t      } else if (_line && options.strict) {\n\t        // Ignore unexpected content unless in strict mode\n\t        throw new Error('Unknown line ' + (i + 1) + ' ' + JSON.stringify(_line));\n\t      } else {\n\t        i++;\n\t      }\n\t    }\n\t  }\n\n\t  // Parses the --- and +++ headers, if none are found, no lines\n\t  // are consumed.\n\t  function parseFileHeader(index) {\n\t    var fileHeader = /^(---|\\+\\+\\+)\\s+(.*)$/.exec(diffstr[i]);\n\t    if (fileHeader) {\n\t      var keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';\n\t      var data = fileHeader[2].split('\\t', 2);\n\t      var fileName = data[0].replace(/\\\\\\\\/g, '\\\\');\n\t      if (/^\".*\"$/.test(fileName)) {\n\t        fileName = fileName.substr(1, fileName.length - 2);\n\t      }\n\t      index[keyPrefix + 'FileName'] = fileName;\n\t      index[keyPrefix + 'Header'] = (data[1] || '').trim();\n\n\t      i++;\n\t    }\n\t  }\n\n\t  // Parses a hunk\n\t  // This assumes that we are at the start of a hunk.\n\t  function parseHunk() {\n\t    var chunkHeaderIndex = i,\n\t        chunkHeaderLine = diffstr[i++],\n\t        chunkHeader = chunkHeaderLine.split(/@@ -(\\d+)(?:,(\\d+))? \\+(\\d+)(?:,(\\d+))? @@/);\n\n\t    var hunk = {\n\t      oldStart: +chunkHeader[1],\n\t      oldLines: +chunkHeader[2] || 1,\n\t      newStart: +chunkHeader[3],\n\t      newLines: +chunkHeader[4] || 1,\n\t      lines: [],\n\t      linedelimiters: []\n\t    };\n\n\t    var addCount = 0,\n\t        removeCount = 0;\n\t    for (; i < diffstr.length; i++) {\n\t      // Lines starting with '---' could be mistaken for the \"remove line\" operation\n\t      // But they could be the header for the next file. Therefore prune such cases out.\n\t      if (diffstr[i].indexOf('--- ') === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf('+++ ') === 0 && diffstr[i + 2].indexOf('@@') === 0) {\n\t        break;\n\t      }\n\t      var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? ' ' : diffstr[i][0];\n\n\t      if (operation === '+' || operation === '-' || operation === ' ' || operation === '\\\\') {\n\t        hunk.lines.push(diffstr[i]);\n\t        hunk.linedelimiters.push(delimiters[i] || '\\n');\n\n\t        if (operation === '+') {\n\t          addCount++;\n\t        } else if (operation === '-') {\n\t          removeCount++;\n\t        } else if (operation === ' ') {\n\t          addCount++;\n\t          removeCount++;\n\t        }\n\t      } else {\n\t        break;\n\t      }\n\t    }\n\n\t    // Handle the empty block count case\n\t    if (!addCount && hunk.newLines === 1) {\n\t      hunk.newLines = 0;\n\t    }\n\t    if (!removeCount && hunk.oldLines === 1) {\n\t      hunk.oldLines = 0;\n\t    }\n\n\t    // Perform optional sanity checking\n\t    if (options.strict) {\n\t      if (addCount !== hunk.newLines) {\n\t        throw new Error('Added line count did not match for hunk at line ' + (chunkHeaderIndex + 1));\n\t      }\n\t      if (removeCount !== hunk.oldLines) {\n\t        throw new Error('Removed line count did not match for hunk at line ' + (chunkHeaderIndex + 1));\n\t      }\n\t    }\n\n\t    return hunk;\n\t  }\n\n\t  while (i < diffstr.length) {\n\t    parseIndex();\n\t  }\n\n\t  return list;\n\t}\n\n\n\n/***/ }),\n/* 12 */\n/***/ (function(module, exports) {\n\n\t/*istanbul ignore start*/\"use strict\";\n\n\texports.__esModule = true;\n\n\texports[\"default\"] = /*istanbul ignore end*/function (start, minLine, maxLine) {\n\t  var wantForward = true,\n\t      backwardExhausted = false,\n\t      forwardExhausted = false,\n\t      localOffset = 1;\n\n\t  return function iterator() {\n\t    if (wantForward && !forwardExhausted) {\n\t      if (backwardExhausted) {\n\t        localOffset++;\n\t      } else {\n\t        wantForward = false;\n\t      }\n\n\t      // Check if trying to fit beyond text length, and if not, check it fits\n\t      // after offset location (or desired location on first iteration)\n\t      if (start + localOffset <= maxLine) {\n\t        return localOffset;\n\t      }\n\n\t      forwardExhausted = true;\n\t    }\n\n\t    if (!backwardExhausted) {\n\t      if (!forwardExhausted) {\n\t        wantForward = true;\n\t      }\n\n\t      // Check if trying to fit before text beginning, and if not, check it fits\n\t      // before offset location\n\t      if (minLine <= start - localOffset) {\n\t        return -localOffset++;\n\t      }\n\n\t      backwardExhausted = true;\n\t      return iterator();\n\t    }\n\n\t    // We tried to fit hunk before text beginning and beyond text length, then\n\t    // hunk can't fit on the text. Return undefined\n\t  };\n\t};\n\n\n\n/***/ }),\n/* 13 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports. /*istanbul ignore end*/calcLineCount = calcLineCount;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/merge = merge;\n\n\tvar /*istanbul ignore start*/_create = __webpack_require__(14) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_parse = __webpack_require__(11) /*istanbul ignore end*/;\n\n\tvar /*istanbul ignore start*/_array = __webpack_require__(15) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n\t/*istanbul ignore end*/function calcLineCount(hunk) {\n\t  /*istanbul ignore start*/var _calcOldNewLineCount = /*istanbul ignore end*/calcOldNewLineCount(hunk.lines),\n\t      oldLines = _calcOldNewLineCount.oldLines,\n\t      newLines = _calcOldNewLineCount.newLines;\n\n\t  if (oldLines !== undefined) {\n\t    hunk.oldLines = oldLines;\n\t  } else {\n\t    delete hunk.oldLines;\n\t  }\n\n\t  if (newLines !== undefined) {\n\t    hunk.newLines = newLines;\n\t  } else {\n\t    delete hunk.newLines;\n\t  }\n\t}\n\n\tfunction merge(mine, theirs, base) {\n\t  mine = loadPatch(mine, base);\n\t  theirs = loadPatch(theirs, base);\n\n\t  var ret = {};\n\n\t  // For index we just let it pass through as it doesn't have any necessary meaning.\n\t  // Leaving sanity checks on this to the API consumer that may know more about the\n\t  // meaning in their own context.\n\t  if (mine.index || theirs.index) {\n\t    ret.index = mine.index || theirs.index;\n\t  }\n\n\t  if (mine.newFileName || theirs.newFileName) {\n\t    if (!fileNameChanged(mine)) {\n\t      // No header or no change in ours, use theirs (and ours if theirs does not exist)\n\t      ret.oldFileName = theirs.oldFileName || mine.oldFileName;\n\t      ret.newFileName = theirs.newFileName || mine.newFileName;\n\t      ret.oldHeader = theirs.oldHeader || mine.oldHeader;\n\t      ret.newHeader = theirs.newHeader || mine.newHeader;\n\t    } else if (!fileNameChanged(theirs)) {\n\t      // No header or no change in theirs, use ours\n\t      ret.oldFileName = mine.oldFileName;\n\t      ret.newFileName = mine.newFileName;\n\t      ret.oldHeader = mine.oldHeader;\n\t      ret.newHeader = mine.newHeader;\n\t    } else {\n\t      // Both changed... figure it out\n\t      ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);\n\t      ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);\n\t      ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);\n\t      ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);\n\t    }\n\t  }\n\n\t  ret.hunks = [];\n\n\t  var mineIndex = 0,\n\t      theirsIndex = 0,\n\t      mineOffset = 0,\n\t      theirsOffset = 0;\n\n\t  while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {\n\t    var mineCurrent = mine.hunks[mineIndex] || { oldStart: Infinity },\n\t        theirsCurrent = theirs.hunks[theirsIndex] || { oldStart: Infinity };\n\n\t    if (hunkBefore(mineCurrent, theirsCurrent)) {\n\t      // This patch does not overlap with any of the others, yay.\n\t      ret.hunks.push(cloneHunk(mineCurrent, mineOffset));\n\t      mineIndex++;\n\t      theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;\n\t    } else if (hunkBefore(theirsCurrent, mineCurrent)) {\n\t      // This patch does not overlap with any of the others, yay.\n\t      ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));\n\t      theirsIndex++;\n\t      mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;\n\t    } else {\n\t      // Overlap, merge as best we can\n\t      var mergedHunk = {\n\t        oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),\n\t        oldLines: 0,\n\t        newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),\n\t        newLines: 0,\n\t        lines: []\n\t      };\n\t      mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);\n\t      theirsIndex++;\n\t      mineIndex++;\n\n\t      ret.hunks.push(mergedHunk);\n\t    }\n\t  }\n\n\t  return ret;\n\t}\n\n\tfunction loadPatch(param, base) {\n\t  if (typeof param === 'string') {\n\t    if (/^@@/m.test(param) || /^Index:/m.test(param)) {\n\t      return (/*istanbul ignore start*/(0, _parse.parsePatch) /*istanbul ignore end*/(param)[0]\n\t      );\n\t    }\n\n\t    if (!base) {\n\t      throw new Error('Must provide a base reference or pass in a patch');\n\t    }\n\t    return (/*istanbul ignore start*/(0, _create.structuredPatch) /*istanbul ignore end*/(undefined, undefined, base, param)\n\t    );\n\t  }\n\n\t  return param;\n\t}\n\n\tfunction fileNameChanged(patch) {\n\t  return patch.newFileName && patch.newFileName !== patch.oldFileName;\n\t}\n\n\tfunction selectField(index, mine, theirs) {\n\t  if (mine === theirs) {\n\t    return mine;\n\t  } else {\n\t    index.conflict = true;\n\t    return { mine: mine, theirs: theirs };\n\t  }\n\t}\n\n\tfunction hunkBefore(test, check) {\n\t  return test.oldStart < check.oldStart && test.oldStart + test.oldLines < check.oldStart;\n\t}\n\n\tfunction cloneHunk(hunk, offset) {\n\t  return {\n\t    oldStart: hunk.oldStart, oldLines: hunk.oldLines,\n\t    newStart: hunk.newStart + offset, newLines: hunk.newLines,\n\t    lines: hunk.lines\n\t  };\n\t}\n\n\tfunction mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {\n\t  // This will generally result in a conflicted hunk, but there are cases where the context\n\t  // is the only overlap where we can successfully merge the content here.\n\t  var mine = { offset: mineOffset, lines: mineLines, index: 0 },\n\t      their = { offset: theirOffset, lines: theirLines, index: 0 };\n\n\t  // Handle any leading content\n\t  insertLeading(hunk, mine, their);\n\t  insertLeading(hunk, their, mine);\n\n\t  // Now in the overlap content. Scan through and select the best changes from each.\n\t  while (mine.index < mine.lines.length && their.index < their.lines.length) {\n\t    var mineCurrent = mine.lines[mine.index],\n\t        theirCurrent = their.lines[their.index];\n\n\t    if ((mineCurrent[0] === '-' || mineCurrent[0] === '+') && (theirCurrent[0] === '-' || theirCurrent[0] === '+')) {\n\t      // Both modified ...\n\t      mutualChange(hunk, mine, their);\n\t    } else if (mineCurrent[0] === '+' && theirCurrent[0] === ' ') {\n\t      /*istanbul ignore start*/var _hunk$lines;\n\n\t      /*istanbul ignore end*/ // Mine inserted\n\t      /*istanbul ignore start*/(_hunk$lines = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/collectChange(mine)));\n\t    } else if (theirCurrent[0] === '+' && mineCurrent[0] === ' ') {\n\t      /*istanbul ignore start*/var _hunk$lines2;\n\n\t      /*istanbul ignore end*/ // Theirs inserted\n\t      /*istanbul ignore start*/(_hunk$lines2 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines2 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/collectChange(their)));\n\t    } else if (mineCurrent[0] === '-' && theirCurrent[0] === ' ') {\n\t      // Mine removed or edited\n\t      removal(hunk, mine, their);\n\t    } else if (theirCurrent[0] === '-' && mineCurrent[0] === ' ') {\n\t      // Their removed or edited\n\t      removal(hunk, their, mine, true);\n\t    } else if (mineCurrent === theirCurrent) {\n\t      // Context identity\n\t      hunk.lines.push(mineCurrent);\n\t      mine.index++;\n\t      their.index++;\n\t    } else {\n\t      // Context mismatch\n\t      conflict(hunk, collectChange(mine), collectChange(their));\n\t    }\n\t  }\n\n\t  // Now push anything that may be remaining\n\t  insertTrailing(hunk, mine);\n\t  insertTrailing(hunk, their);\n\n\t  calcLineCount(hunk);\n\t}\n\n\tfunction mutualChange(hunk, mine, their) {\n\t  var myChanges = collectChange(mine),\n\t      theirChanges = collectChange(their);\n\n\t  if (allRemoves(myChanges) && allRemoves(theirChanges)) {\n\t    // Special case for remove changes that are supersets of one another\n\t    if ( /*istanbul ignore start*/(0, _array.arrayStartsWith) /*istanbul ignore end*/(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)) {\n\t      /*istanbul ignore start*/var _hunk$lines3;\n\n\t      /*istanbul ignore end*/ /*istanbul ignore start*/(_hunk$lines3 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines3 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/myChanges));\n\t      return;\n\t    } else if ( /*istanbul ignore start*/(0, _array.arrayStartsWith) /*istanbul ignore end*/(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)) {\n\t      /*istanbul ignore start*/var _hunk$lines4;\n\n\t      /*istanbul ignore end*/ /*istanbul ignore start*/(_hunk$lines4 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines4 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/theirChanges));\n\t      return;\n\t    }\n\t  } else if ( /*istanbul ignore start*/(0, _array.arrayEqual) /*istanbul ignore end*/(myChanges, theirChanges)) {\n\t    /*istanbul ignore start*/var _hunk$lines5;\n\n\t    /*istanbul ignore end*/ /*istanbul ignore start*/(_hunk$lines5 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines5 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/myChanges));\n\t    return;\n\t  }\n\n\t  conflict(hunk, myChanges, theirChanges);\n\t}\n\n\tfunction removal(hunk, mine, their, swap) {\n\t  var myChanges = collectChange(mine),\n\t      theirChanges = collectContext(their, myChanges);\n\t  if (theirChanges.merged) {\n\t    /*istanbul ignore start*/var _hunk$lines6;\n\n\t    /*istanbul ignore end*/ /*istanbul ignore start*/(_hunk$lines6 = /*istanbul ignore end*/hunk.lines).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_hunk$lines6 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/theirChanges.merged));\n\t  } else {\n\t    conflict(hunk, swap ? theirChanges : myChanges, swap ? myChanges : theirChanges);\n\t  }\n\t}\n\n\tfunction conflict(hunk, mine, their) {\n\t  hunk.conflict = true;\n\t  hunk.lines.push({\n\t    conflict: true,\n\t    mine: mine,\n\t    theirs: their\n\t  });\n\t}\n\n\tfunction insertLeading(hunk, insert, their) {\n\t  while (insert.offset < their.offset && insert.index < insert.lines.length) {\n\t    var line = insert.lines[insert.index++];\n\t    hunk.lines.push(line);\n\t    insert.offset++;\n\t  }\n\t}\n\tfunction insertTrailing(hunk, insert) {\n\t  while (insert.index < insert.lines.length) {\n\t    var line = insert.lines[insert.index++];\n\t    hunk.lines.push(line);\n\t  }\n\t}\n\n\tfunction collectChange(state) {\n\t  var ret = [],\n\t      operation = state.lines[state.index][0];\n\t  while (state.index < state.lines.length) {\n\t    var line = state.lines[state.index];\n\n\t    // Group additions that are immediately after subtractions and treat them as one \"atomic\" modify change.\n\t    if (operation === '-' && line[0] === '+') {\n\t      operation = '+';\n\t    }\n\n\t    if (operation === line[0]) {\n\t      ret.push(line);\n\t      state.index++;\n\t    } else {\n\t      break;\n\t    }\n\t  }\n\n\t  return ret;\n\t}\n\tfunction collectContext(state, matchChanges) {\n\t  var changes = [],\n\t      merged = [],\n\t      matchIndex = 0,\n\t      contextChanges = false,\n\t      conflicted = false;\n\t  while (matchIndex < matchChanges.length && state.index < state.lines.length) {\n\t    var change = state.lines[state.index],\n\t        match = matchChanges[matchIndex];\n\n\t    // Once we've hit our add, then we are done\n\t    if (match[0] === '+') {\n\t      break;\n\t    }\n\n\t    contextChanges = contextChanges || change[0] !== ' ';\n\n\t    merged.push(match);\n\t    matchIndex++;\n\n\t    // Consume any additions in the other block as a conflict to attempt\n\t    // to pull in the remaining context after this\n\t    if (change[0] === '+') {\n\t      conflicted = true;\n\n\t      while (change[0] === '+') {\n\t        changes.push(change);\n\t        change = state.lines[++state.index];\n\t      }\n\t    }\n\n\t    if (match.substr(1) === change.substr(1)) {\n\t      changes.push(change);\n\t      state.index++;\n\t    } else {\n\t      conflicted = true;\n\t    }\n\t  }\n\n\t  if ((matchChanges[matchIndex] || '')[0] === '+' && contextChanges) {\n\t    conflicted = true;\n\t  }\n\n\t  if (conflicted) {\n\t    return changes;\n\t  }\n\n\t  while (matchIndex < matchChanges.length) {\n\t    merged.push(matchChanges[matchIndex++]);\n\t  }\n\n\t  return {\n\t    merged: merged,\n\t    changes: changes\n\t  };\n\t}\n\n\tfunction allRemoves(changes) {\n\t  return changes.reduce(function (prev, change) {\n\t    return prev && change[0] === '-';\n\t  }, true);\n\t}\n\tfunction skipRemoveSuperset(state, removeChanges, delta) {\n\t  for (var i = 0; i < delta; i++) {\n\t    var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);\n\t    if (state.lines[state.index + i] !== ' ' + changeContent) {\n\t      return false;\n\t    }\n\t  }\n\n\t  state.index += delta;\n\t  return true;\n\t}\n\n\tfunction calcOldNewLineCount(lines) {\n\t  var oldLines = 0;\n\t  var newLines = 0;\n\n\t  lines.forEach(function (line) {\n\t    if (typeof line !== 'string') {\n\t      var myCount = calcOldNewLineCount(line.mine);\n\t      var theirCount = calcOldNewLineCount(line.theirs);\n\n\t      if (oldLines !== undefined) {\n\t        if (myCount.oldLines === theirCount.oldLines) {\n\t          oldLines += myCount.oldLines;\n\t        } else {\n\t          oldLines = undefined;\n\t        }\n\t      }\n\n\t      if (newLines !== undefined) {\n\t        if (myCount.newLines === theirCount.newLines) {\n\t          newLines += myCount.newLines;\n\t        } else {\n\t          newLines = undefined;\n\t        }\n\t      }\n\t    } else {\n\t      if (newLines !== undefined && (line[0] === '+' || line[0] === ' ')) {\n\t        newLines++;\n\t      }\n\t      if (oldLines !== undefined && (line[0] === '-' || line[0] === ' ')) {\n\t        oldLines++;\n\t      }\n\t    }\n\t  });\n\n\t  return { oldLines: oldLines, newLines: newLines };\n\t}\n\n\n\n/***/ }),\n/* 14 */\n/***/ (function(module, exports, __webpack_require__) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports. /*istanbul ignore end*/structuredPatch = structuredPatch;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/createTwoFilesPatch = createTwoFilesPatch;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/createPatch = createPatch;\n\n\tvar /*istanbul ignore start*/_line = __webpack_require__(5) /*istanbul ignore end*/;\n\n\t/*istanbul ignore start*/function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n\t/*istanbul ignore end*/function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {\n\t  if (!options) {\n\t    options = {};\n\t  }\n\t  if (typeof options.context === 'undefined') {\n\t    options.context = 4;\n\t  }\n\n\t  var diff = /*istanbul ignore start*/(0, _line.diffLines) /*istanbul ignore end*/(oldStr, newStr, options);\n\t  diff.push({ value: '', lines: [] }); // Append an empty value to make cleanup easier\n\n\t  function contextLines(lines) {\n\t    return lines.map(function (entry) {\n\t      return ' ' + entry;\n\t    });\n\t  }\n\n\t  var hunks = [];\n\t  var oldRangeStart = 0,\n\t      newRangeStart = 0,\n\t      curRange = [],\n\t      oldLine = 1,\n\t      newLine = 1;\n\n\t  /*istanbul ignore start*/var _loop = function _loop( /*istanbul ignore end*/i) {\n\t    var current = diff[i],\n\t        lines = current.lines || current.value.replace(/\\n$/, '').split('\\n');\n\t    current.lines = lines;\n\n\t    if (current.added || current.removed) {\n\t      /*istanbul ignore start*/var _curRange;\n\n\t      /*istanbul ignore end*/ // If we have previous context, start with that\n\t      if (!oldRangeStart) {\n\t        var prev = diff[i - 1];\n\t        oldRangeStart = oldLine;\n\t        newRangeStart = newLine;\n\n\t        if (prev) {\n\t          curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];\n\t          oldRangeStart -= curRange.length;\n\t          newRangeStart -= curRange.length;\n\t        }\n\t      }\n\n\t      // Output our changes\n\t      /*istanbul ignore start*/(_curRange = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/lines.map(function (entry) {\n\t        return (current.added ? '+' : '-') + entry;\n\t      })));\n\n\t      // Track the updated file position\n\t      if (current.added) {\n\t        newLine += lines.length;\n\t      } else {\n\t        oldLine += lines.length;\n\t      }\n\t    } else {\n\t      // Identical context lines. Track line changes\n\t      if (oldRangeStart) {\n\t        // Close out any changes that have been output (or join overlapping)\n\t        if (lines.length <= options.context * 2 && i < diff.length - 2) {\n\t          /*istanbul ignore start*/var _curRange2;\n\n\t          /*istanbul ignore end*/ // Overlapping\n\t          /*istanbul ignore start*/(_curRange2 = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange2 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/contextLines(lines)));\n\t        } else {\n\t          /*istanbul ignore start*/var _curRange3;\n\n\t          /*istanbul ignore end*/ // end the range and output\n\t          var contextSize = Math.min(lines.length, options.context);\n\t          /*istanbul ignore start*/(_curRange3 = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange3 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/contextLines(lines.slice(0, contextSize))));\n\n\t          var hunk = {\n\t            oldStart: oldRangeStart,\n\t            oldLines: oldLine - oldRangeStart + contextSize,\n\t            newStart: newRangeStart,\n\t            newLines: newLine - newRangeStart + contextSize,\n\t            lines: curRange\n\t          };\n\t          if (i >= diff.length - 2 && lines.length <= options.context) {\n\t            // EOF is inside this hunk\n\t            var oldEOFNewline = /\\n$/.test(oldStr);\n\t            var newEOFNewline = /\\n$/.test(newStr);\n\t            if (lines.length == 0 && !oldEOFNewline) {\n\t              // special case: old has no eol and no trailing context; no-nl can end up before adds\n\t              curRange.splice(hunk.oldLines, 0, '\\\\ No newline at end of file');\n\t            } else if (!oldEOFNewline || !newEOFNewline) {\n\t              curRange.push('\\\\ No newline at end of file');\n\t            }\n\t          }\n\t          hunks.push(hunk);\n\n\t          oldRangeStart = 0;\n\t          newRangeStart = 0;\n\t          curRange = [];\n\t        }\n\t      }\n\t      oldLine += lines.length;\n\t      newLine += lines.length;\n\t    }\n\t  };\n\n\t  for (var i = 0; i < diff.length; i++) {\n\t    /*istanbul ignore start*/_loop( /*istanbul ignore end*/i);\n\t  }\n\n\t  return {\n\t    oldFileName: oldFileName, newFileName: newFileName,\n\t    oldHeader: oldHeader, newHeader: newHeader,\n\t    hunks: hunks\n\t  };\n\t}\n\n\tfunction createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {\n\t  var diff = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);\n\n\t  var ret = [];\n\t  if (oldFileName == newFileName) {\n\t    ret.push('Index: ' + oldFileName);\n\t  }\n\t  ret.push('===================================================================');\n\t  ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\\t' + diff.oldHeader));\n\t  ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\\t' + diff.newHeader));\n\n\t  for (var i = 0; i < diff.hunks.length; i++) {\n\t    var hunk = diff.hunks[i];\n\t    ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');\n\t    ret.push.apply(ret, hunk.lines);\n\t  }\n\n\t  return ret.join('\\n') + '\\n';\n\t}\n\n\tfunction createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {\n\t  return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);\n\t}\n\n\n\n/***/ }),\n/* 15 */\n/***/ (function(module, exports) {\n\n\t/*istanbul ignore start*/\"use strict\";\n\n\texports.__esModule = true;\n\texports. /*istanbul ignore end*/arrayEqual = arrayEqual;\n\t/*istanbul ignore start*/exports. /*istanbul ignore end*/arrayStartsWith = arrayStartsWith;\n\tfunction arrayEqual(a, b) {\n\t  if (a.length !== b.length) {\n\t    return false;\n\t  }\n\n\t  return arrayStartsWith(a, b);\n\t}\n\n\tfunction arrayStartsWith(array, start) {\n\t  if (start.length > array.length) {\n\t    return false;\n\t  }\n\n\t  for (var i = 0; i < start.length; i++) {\n\t    if (start[i] !== array[i]) {\n\t      return false;\n\t    }\n\t  }\n\n\t  return true;\n\t}\n\n\n\n/***/ }),\n/* 16 */\n/***/ (function(module, exports) {\n\n\t/*istanbul ignore start*/\"use strict\";\n\n\texports.__esModule = true;\n\texports. /*istanbul ignore end*/convertChangesToDMP = convertChangesToDMP;\n\t// See: http://code.google.com/p/google-diff-match-patch/wiki/API\n\tfunction convertChangesToDMP(changes) {\n\t  var ret = [],\n\t      change = /*istanbul ignore start*/void 0 /*istanbul ignore end*/,\n\t      operation = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;\n\t  for (var i = 0; i < changes.length; i++) {\n\t    change = changes[i];\n\t    if (change.added) {\n\t      operation = 1;\n\t    } else if (change.removed) {\n\t      operation = -1;\n\t    } else {\n\t      operation = 0;\n\t    }\n\n\t    ret.push([operation, change.value]);\n\t  }\n\t  return ret;\n\t}\n\n\n\n/***/ }),\n/* 17 */\n/***/ (function(module, exports) {\n\n\t/*istanbul ignore start*/'use strict';\n\n\texports.__esModule = true;\n\texports. /*istanbul ignore end*/convertChangesToXML = convertChangesToXML;\n\tfunction convertChangesToXML(changes) {\n\t  var ret = [];\n\t  for (var i = 0; i < changes.length; i++) {\n\t    var change = changes[i];\n\t    if (change.added) {\n\t      ret.push('<ins>');\n\t    } else if (change.removed) {\n\t      ret.push('<del>');\n\t    }\n\n\t    ret.push(escapeHTML(change.value));\n\n\t    if (change.added) {\n\t      ret.push('</ins>');\n\t    } else if (change.removed) {\n\t      ret.push('</del>');\n\t    }\n\t  }\n\t  return ret.join('');\n\t}\n\n\tfunction escapeHTML(s) {\n\t  var n = s;\n\t  n = n.replace(/&/g, '&amp;');\n\t  n = n.replace(/</g, '&lt;');\n\t  n = n.replace(/>/g, '&gt;');\n\t  n = n.replace(/\"/g, '&quot;');\n\n\t  return n;\n\t}\n\n\n\n/***/ })\n/******/ ])\n});\n;\n},{}],46:[function(require,module,exports){\n'use strict';\n\nvar matchOperatorsRe = /[|\\\\{}()[\\]^$+*?.]/g;\n\nmodule.exports = function (str) {\n\tif (typeof str !== 'string') {\n\t\tthrow new TypeError('Expected a string');\n\t}\n\n\treturn str.replace(matchOperatorsRe, '\\\\$&');\n};\n\n},{}],47:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nvar objectCreate = Object.create || objectCreatePolyfill\nvar objectKeys = Object.keys || objectKeysPolyfill\nvar bind = Function.prototype.bind || functionBindPolyfill\n\nfunction EventEmitter() {\n  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {\n    this._events = objectCreate(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n}\nmodule.exports = EventEmitter;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nvar defaultMaxListeners = 10;\n\nvar hasDefineProperty;\ntry {\n  var o = {};\n  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });\n  hasDefineProperty = o.x === 0;\n} catch (err) { hasDefineProperty = false }\nif (hasDefineProperty) {\n  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {\n    enumerable: true,\n    get: function() {\n      return defaultMaxListeners;\n    },\n    set: function(arg) {\n      // check whether the input is a positive number (whose value is zero or\n      // greater and not a NaN).\n      if (typeof arg !== 'number' || arg < 0 || arg !== arg)\n        throw new TypeError('\"defaultMaxListeners\" must be a positive number');\n      defaultMaxListeners = arg;\n    }\n  });\n} else {\n  EventEmitter.defaultMaxListeners = defaultMaxListeners;\n}\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || isNaN(n))\n    throw new TypeError('\"n\" argument must be a positive number');\n  this._maxListeners = n;\n  return this;\n};\n\nfunction $getMaxListeners(that) {\n  if (that._maxListeners === undefined)\n    return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return $getMaxListeners(this);\n};\n\n// These standalone emit* functions are used to optimize calling of event\n// handlers for fast cases because emit() itself often has a variable number of\n// arguments and can be deoptimized because of that. These functions always have\n// the same number of arguments and thus do not get deoptimized, so the code\n// inside them can execute faster.\nfunction emitNone(handler, isFn, self) {\n  if (isFn)\n    handler.call(self);\n  else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      listeners[i].call(self);\n  }\n}\nfunction emitOne(handler, isFn, self, arg1) {\n  if (isFn)\n    handler.call(self, arg1);\n  else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      listeners[i].call(self, arg1);\n  }\n}\nfunction emitTwo(handler, isFn, self, arg1, arg2) {\n  if (isFn)\n    handler.call(self, arg1, arg2);\n  else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      listeners[i].call(self, arg1, arg2);\n  }\n}\nfunction emitThree(handler, isFn, self, arg1, arg2, arg3) {\n  if (isFn)\n    handler.call(self, arg1, arg2, arg3);\n  else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      listeners[i].call(self, arg1, arg2, arg3);\n  }\n}\n\nfunction emitMany(handler, isFn, self, args) {\n  if (isFn)\n    handler.apply(self, args);\n  else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      listeners[i].apply(self, args);\n  }\n}\n\nEventEmitter.prototype.emit = function emit(type) {\n  var er, handler, len, args, i, events;\n  var doError = (type === 'error');\n\n  events = this._events;\n  if (events)\n    doError = (doError && events.error == null);\n  else if (!doError)\n    return false;\n\n  // If there is no 'error' event listener then throw.\n  if (doError) {\n    if (arguments.length > 1)\n      er = arguments[1];\n    if (er instanceof Error) {\n      throw er; // Unhandled 'error' event\n    } else {\n      // At least give some kind of context to the user\n      var err = new Error('Unhandled \"error\" event. (' + er + ')');\n      err.context = er;\n      throw err;\n    }\n    return false;\n  }\n\n  handler = events[type];\n\n  if (!handler)\n    return false;\n\n  var isFn = typeof handler === 'function';\n  len = arguments.length;\n  switch (len) {\n      // fast cases\n    case 1:\n      emitNone(handler, isFn, this);\n      break;\n    case 2:\n      emitOne(handler, isFn, this, arguments[1]);\n      break;\n    case 3:\n      emitTwo(handler, isFn, this, arguments[1], arguments[2]);\n      break;\n    case 4:\n      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);\n      break;\n      // slower\n    default:\n      args = new Array(len - 1);\n      for (i = 1; i < len; i++)\n        args[i - 1] = arguments[i];\n      emitMany(handler, isFn, this, args);\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  if (typeof listener !== 'function')\n    throw new TypeError('\"listener\" argument must be a function');\n\n  events = target._events;\n  if (!events) {\n    events = target._events = objectCreate(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener) {\n      target.emit('newListener', type,\n          listener.listener ? listener.listener : listener);\n\n      // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n      events = target._events;\n    }\n    existing = events[type];\n  }\n\n  if (!existing) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] =\n          prepend ? [listener, existing] : [existing, listener];\n    } else {\n      // If we've already got an array, just append.\n      if (prepend) {\n        existing.unshift(listener);\n      } else {\n        existing.push(listener);\n      }\n    }\n\n    // Check for listener leak\n    if (!existing.warned) {\n      m = $getMaxListeners(target);\n      if (m && m > 0 && existing.length > m) {\n        existing.warned = true;\n        var w = new Error('Possible EventEmitter memory leak detected. ' +\n            existing.length + ' \"' + String(type) + '\" listeners ' +\n            'added. Use emitter.setMaxListeners() to ' +\n            'increase limit.');\n        w.name = 'MaxListenersExceededWarning';\n        w.emitter = target;\n        w.type = type;\n        w.count = existing.length;\n        if (typeof console === 'object' && console.warn) {\n          console.warn('%s: %s', w.name, w.message);\n        }\n      }\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener =\n    function prependListener(type, listener) {\n      return _addListener(this, type, listener, true);\n    };\n\nfunction onceWrapper() {\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    switch (arguments.length) {\n      case 0:\n        return this.listener.call(this.target);\n      case 1:\n        return this.listener.call(this.target, arguments[0]);\n      case 2:\n        return this.listener.call(this.target, arguments[0], arguments[1]);\n      case 3:\n        return this.listener.call(this.target, arguments[0], arguments[1],\n            arguments[2]);\n      default:\n        var args = new Array(arguments.length);\n        for (var i = 0; i < args.length; ++i)\n          args[i] = arguments[i];\n        this.listener.apply(this.target, args);\n    }\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };\n  var wrapped = bind.call(onceWrapper, state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  if (typeof listener !== 'function')\n    throw new TypeError('\"listener\" argument must be a function');\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener =\n    function prependOnceListener(type, listener) {\n      if (typeof listener !== 'function')\n        throw new TypeError('\"listener\" argument must be a function');\n      this.prependListener(type, _onceWrap(this, type, listener));\n      return this;\n    };\n\n// Emits a 'removeListener' event if and only if the listener was removed.\nEventEmitter.prototype.removeListener =\n    function removeListener(type, listener) {\n      var list, events, position, i, originalListener;\n\n      if (typeof listener !== 'function')\n        throw new TypeError('\"listener\" argument must be a function');\n\n      events = this._events;\n      if (!events)\n        return this;\n\n      list = events[type];\n      if (!list)\n        return this;\n\n      if (list === listener || list.listener === listener) {\n        if (--this._eventsCount === 0)\n          this._events = objectCreate(null);\n        else {\n          delete events[type];\n          if (events.removeListener)\n            this.emit('removeListener', type, list.listener || listener);\n        }\n      } else if (typeof list !== 'function') {\n        position = -1;\n\n        for (i = list.length - 1; i >= 0; i--) {\n          if (list[i] === listener || list[i].listener === listener) {\n            originalListener = list[i].listener;\n            position = i;\n            break;\n          }\n        }\n\n        if (position < 0)\n          return this;\n\n        if (position === 0)\n          list.shift();\n        else\n          spliceOne(list, position);\n\n        if (list.length === 1)\n          events[type] = list[0];\n\n        if (events.removeListener)\n          this.emit('removeListener', type, originalListener || listener);\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.removeAllListeners =\n    function removeAllListeners(type) {\n      var listeners, events, i;\n\n      events = this._events;\n      if (!events)\n        return this;\n\n      // not listening for removeListener, no need to emit\n      if (!events.removeListener) {\n        if (arguments.length === 0) {\n          this._events = objectCreate(null);\n          this._eventsCount = 0;\n        } else if (events[type]) {\n          if (--this._eventsCount === 0)\n            this._events = objectCreate(null);\n          else\n            delete events[type];\n        }\n        return this;\n      }\n\n      // emit removeListener for all listeners on all events\n      if (arguments.length === 0) {\n        var keys = objectKeys(events);\n        var key;\n        for (i = 0; i < keys.length; ++i) {\n          key = keys[i];\n          if (key === 'removeListener') continue;\n          this.removeAllListeners(key);\n        }\n        this.removeAllListeners('removeListener');\n        this._events = objectCreate(null);\n        this._eventsCount = 0;\n        return this;\n      }\n\n      listeners = events[type];\n\n      if (typeof listeners === 'function') {\n        this.removeListener(type, listeners);\n      } else if (listeners) {\n        // LIFO order\n        for (i = listeners.length - 1; i >= 0; i--) {\n          this.removeListener(type, listeners[i]);\n        }\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  var evlistener;\n  var ret;\n  var events = this._events;\n\n  if (!events)\n    ret = [];\n  else {\n    evlistener = events[type];\n    if (!evlistener)\n      ret = [];\n    else if (typeof evlistener === 'function')\n      ret = [evlistener.listener || evlistener];\n    else\n      ret = unwrapListeners(evlistener);\n  }\n\n  return ret;\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];\n};\n\n// About 1.5x faster than the two-arg version of Array#splice().\nfunction spliceOne(list, index) {\n  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)\n    list[i] = list[k];\n  list.pop();\n}\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n  for (var i = 0; i < n; ++i)\n    copy[i] = arr[i];\n  return copy;\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n  return ret;\n}\n\nfunction objectCreatePolyfill(proto) {\n  var F = function() {};\n  F.prototype = proto;\n  return new F;\n}\nfunction objectKeysPolyfill(obj) {\n  var keys = [];\n  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {\n    keys.push(k);\n  }\n  return k;\n}\nfunction functionBindPolyfill(context) {\n  var fn = this;\n  return function () {\n    return fn.apply(context, arguments);\n  };\n}\n\n},{}],48:[function(require,module,exports){\n(function (global){\n/*! https://mths.be/he v1.1.1 by @mathias | MIT license */\n;(function(root) {\n\n\t// Detect free variables `exports`.\n\tvar freeExports = typeof exports == 'object' && exports;\n\n\t// Detect free variable `module`.\n\tvar freeModule = typeof module == 'object' && module &&\n\t\tmodule.exports == freeExports && module;\n\n\t// Detect free variable `global`, from Node.js or Browserified code,\n\t// and use it as `root`.\n\tvar freeGlobal = typeof global == 'object' && global;\n\tif (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {\n\t\troot = freeGlobal;\n\t}\n\n\t/*--------------------------------------------------------------------------*/\n\n\t// All astral symbols.\n\tvar regexAstralSymbols = /[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]/g;\n\t// All ASCII symbols (not just printable ASCII) except those listed in the\n\t// first column of the overrides table.\n\t// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides\n\tvar regexAsciiWhitelist = /[\\x01-\\x7F]/g;\n\t// All BMP symbols that are not ASCII newlines, printable ASCII symbols, or\n\t// code points listed in the first column of the overrides table on\n\t// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.\n\tvar regexBmpWhitelist = /[\\x01-\\t\\x0B\\f\\x0E-\\x1F\\x7F\\x81\\x8D\\x8F\\x90\\x9D\\xA0-\\uFFFF]/g;\n\n\tvar regexEncodeNonAscii = /<\\u20D2|=\\u20E5|>\\u20D2|\\u205F\\u200A|\\u219D\\u0338|\\u2202\\u0338|\\u2220\\u20D2|\\u2229\\uFE00|\\u222A\\uFE00|\\u223C\\u20D2|\\u223D\\u0331|\\u223E\\u0333|\\u2242\\u0338|\\u224B\\u0338|\\u224D\\u20D2|\\u224E\\u0338|\\u224F\\u0338|\\u2250\\u0338|\\u2261\\u20E5|\\u2264\\u20D2|\\u2265\\u20D2|\\u2266\\u0338|\\u2267\\u0338|\\u2268\\uFE00|\\u2269\\uFE00|\\u226A\\u0338|\\u226A\\u20D2|\\u226B\\u0338|\\u226B\\u20D2|\\u227F\\u0338|\\u2282\\u20D2|\\u2283\\u20D2|\\u228A\\uFE00|\\u228B\\uFE00|\\u228F\\u0338|\\u2290\\u0338|\\u2293\\uFE00|\\u2294\\uFE00|\\u22B4\\u20D2|\\u22B5\\u20D2|\\u22D8\\u0338|\\u22D9\\u0338|\\u22DA\\uFE00|\\u22DB\\uFE00|\\u22F5\\u0338|\\u22F9\\u0338|\\u2933\\u0338|\\u29CF\\u0338|\\u29D0\\u0338|\\u2A6D\\u0338|\\u2A70\\u0338|\\u2A7D\\u0338|\\u2A7E\\u0338|\\u2AA1\\u0338|\\u2AA2\\u0338|\\u2AAC\\uFE00|\\u2AAD\\uFE00|\\u2AAF\\u0338|\\u2AB0\\u0338|\\u2AC5\\u0338|\\u2AC6\\u0338|\\u2ACB\\uFE00|\\u2ACC\\uFE00|\\u2AFD\\u20E5|[\\xA0-\\u0113\\u0116-\\u0122\\u0124-\\u012B\\u012E-\\u014D\\u0150-\\u017E\\u0192\\u01B5\\u01F5\\u0237\\u02C6\\u02C7\\u02D8-\\u02DD\\u0311\\u0391-\\u03A1\\u03A3-\\u03A9\\u03B1-\\u03C9\\u03D1\\u03D2\\u03D5\\u03D6\\u03DC\\u03DD\\u03F0\\u03F1\\u03F5\\u03F6\\u0401-\\u040C\\u040E-\\u044F\\u0451-\\u045C\\u045E\\u045F\\u2002-\\u2005\\u2007-\\u2010\\u2013-\\u2016\\u2018-\\u201A\\u201C-\\u201E\\u2020-\\u2022\\u2025\\u2026\\u2030-\\u2035\\u2039\\u203A\\u203E\\u2041\\u2043\\u2044\\u204F\\u2057\\u205F-\\u2063\\u20AC\\u20DB\\u20DC\\u2102\\u2105\\u210A-\\u2113\\u2115-\\u211E\\u2122\\u2124\\u2127-\\u2129\\u212C\\u212D\\u212F-\\u2131\\u2133-\\u2138\\u2145-\\u2148\\u2153-\\u215E\\u2190-\\u219B\\u219D-\\u21A7\\u21A9-\\u21AE\\u21B0-\\u21B3\\u21B5-\\u21B7\\u21BA-\\u21DB\\u21DD\\u21E4\\u21E5\\u21F5\\u21FD-\\u2205\\u2207-\\u2209\\u220B\\u220C\\u220F-\\u2214\\u2216-\\u2218\\u221A\\u221D-\\u2238\\u223A-\\u2257\\u2259\\u225A\\u225C\\u225F-\\u2262\\u2264-\\u228B\\u228D-\\u229B\\u229D-\\u22A5\\u22A7-\\u22B0\\u22B2-\\u22BB\\u22BD-\\u22DB\\u22DE-\\u22E3\\u22E6-\\u22F7\\u22F9-\\u22FE\\u2305\\u2306\\u2308-\\u2310\\u2312\\u2313\\u2315\\u2316\\u231C-\\u231F\\u2322\\u2323\\u232D\\u232E\\u2336\\u233D\\u233F\\u237C\\u23B0\\u23B1\\u23B4-\\u23B6\\u23DC-\\u23DF\\u23E2\\u23E7\\u2423\\u24C8\\u2500\\u2502\\u250C\\u2510\\u2514\\u2518\\u251C\\u2524\\u252C\\u2534\\u253C\\u2550-\\u256C\\u2580\\u2584\\u2588\\u2591-\\u2593\\u25A1\\u25AA\\u25AB\\u25AD\\u25AE\\u25B1\\u25B3-\\u25B5\\u25B8\\u25B9\\u25BD-\\u25BF\\u25C2\\u25C3\\u25CA\\u25CB\\u25EC\\u25EF\\u25F8-\\u25FC\\u2605\\u2606\\u260E\\u2640\\u2642\\u2660\\u2663\\u2665\\u2666\\u266A\\u266D-\\u266F\\u2713\\u2717\\u2720\\u2736\\u2758\\u2772\\u2773\\u27C8\\u27C9\\u27E6-\\u27ED\\u27F5-\\u27FA\\u27FC\\u27FF\\u2902-\\u2905\\u290C-\\u2913\\u2916\\u2919-\\u2920\\u2923-\\u292A\\u2933\\u2935-\\u2939\\u293C\\u293D\\u2945\\u2948-\\u294B\\u294E-\\u2976\\u2978\\u2979\\u297B-\\u297F\\u2985\\u2986\\u298B-\\u2996\\u299A\\u299C\\u299D\\u29A4-\\u29B7\\u29B9\\u29BB\\u29BC\\u29BE-\\u29C5\\u29C9\\u29CD-\\u29D0\\u29DC-\\u29DE\\u29E3-\\u29E5\\u29EB\\u29F4\\u29F6\\u2A00-\\u2A02\\u2A04\\u2A06\\u2A0C\\u2A0D\\u2A10-\\u2A17\\u2A22-\\u2A27\\u2A29\\u2A2A\\u2A2D-\\u2A31\\u2A33-\\u2A3C\\u2A3F\\u2A40\\u2A42-\\u2A4D\\u2A50\\u2A53-\\u2A58\\u2A5A-\\u2A5D\\u2A5F\\u2A66\\u2A6A\\u2A6D-\\u2A75\\u2A77-\\u2A9A\\u2A9D-\\u2AA2\\u2AA4-\\u2AB0\\u2AB3-\\u2AC8\\u2ACB\\u2ACC\\u2ACF-\\u2ADB\\u2AE4\\u2AE6-\\u2AE9\\u2AEB-\\u2AF3\\u2AFD\\uFB00-\\uFB04]|\\uD835[\\uDC9C\\uDC9E\\uDC9F\\uDCA2\\uDCA5\\uDCA6\\uDCA9-\\uDCAC\\uDCAE-\\uDCB9\\uDCBB\\uDCBD-\\uDCC3\\uDCC5-\\uDCCF\\uDD04\\uDD05\\uDD07-\\uDD0A\\uDD0D-\\uDD14\\uDD16-\\uDD1C\\uDD1E-\\uDD39\\uDD3B-\\uDD3E\\uDD40-\\uDD44\\uDD46\\uDD4A-\\uDD50\\uDD52-\\uDD6B]/g;\n\tvar encodeMap = {'\\xAD':'shy','\\u200C':'zwnj','\\u200D':'zwj','\\u200E':'lrm','\\u2063':'ic','\\u2062':'it','\\u2061':'af','\\u200F':'rlm','\\u200B':'ZeroWidthSpace','\\u2060':'NoBreak','\\u0311':'DownBreve','\\u20DB':'tdot','\\u20DC':'DotDot','\\t':'Tab','\\n':'NewLine','\\u2008':'puncsp','\\u205F':'MediumSpace','\\u2009':'thinsp','\\u200A':'hairsp','\\u2004':'emsp13','\\u2002':'ensp','\\u2005':'emsp14','\\u2003':'emsp','\\u2007':'numsp','\\xA0':'nbsp','\\u205F\\u200A':'ThickSpace','\\u203E':'oline','_':'lowbar','\\u2010':'dash','\\u2013':'ndash','\\u2014':'mdash','\\u2015':'horbar',',':'comma',';':'semi','\\u204F':'bsemi',':':'colon','\\u2A74':'Colone','!':'excl','\\xA1':'iexcl','?':'quest','\\xBF':'iquest','.':'period','\\u2025':'nldr','\\u2026':'mldr','\\xB7':'middot','\\'':'apos','\\u2018':'lsquo','\\u2019':'rsquo','\\u201A':'sbquo','\\u2039':'lsaquo','\\u203A':'rsaquo','\"':'quot','\\u201C':'ldquo','\\u201D':'rdquo','\\u201E':'bdquo','\\xAB':'laquo','\\xBB':'raquo','(':'lpar',')':'rpar','[':'lsqb',']':'rsqb','{':'lcub','}':'rcub','\\u2308':'lceil','\\u2309':'rceil','\\u230A':'lfloor','\\u230B':'rfloor','\\u2985':'lopar','\\u2986':'ropar','\\u298B':'lbrke','\\u298C':'rbrke','\\u298D':'lbrkslu','\\u298E':'rbrksld','\\u298F':'lbrksld','\\u2990':'rbrkslu','\\u2991':'langd','\\u2992':'rangd','\\u2993':'lparlt','\\u2994':'rpargt','\\u2995':'gtlPar','\\u2996':'ltrPar','\\u27E6':'lobrk','\\u27E7':'robrk','\\u27E8':'lang','\\u27E9':'rang','\\u27EA':'Lang','\\u27EB':'Rang','\\u27EC':'loang','\\u27ED':'roang','\\u2772':'lbbrk','\\u2773':'rbbrk','\\u2016':'Vert','\\xA7':'sect','\\xB6':'para','@':'commat','*':'ast','/':'sol','undefined':null,'&':'amp','#':'num','%':'percnt','\\u2030':'permil','\\u2031':'pertenk','\\u2020':'dagger','\\u2021':'Dagger','\\u2022':'bull','\\u2043':'hybull','\\u2032':'prime','\\u2033':'Prime','\\u2034':'tprime','\\u2057':'qprime','\\u2035':'bprime','\\u2041':'caret','`':'grave','\\xB4':'acute','\\u02DC':'tilde','^':'Hat','\\xAF':'macr','\\u02D8':'breve','\\u02D9':'dot','\\xA8':'die','\\u02DA':'ring','\\u02DD':'dblac','\\xB8':'cedil','\\u02DB':'ogon','\\u02C6':'circ','\\u02C7':'caron','\\xB0':'deg','\\xA9':'copy','\\xAE':'reg','\\u2117':'copysr','\\u2118':'wp','\\u211E':'rx','\\u2127':'mho','\\u2129':'iiota','\\u2190':'larr','\\u219A':'nlarr','\\u2192':'rarr','\\u219B':'nrarr','\\u2191':'uarr','\\u2193':'darr','\\u2194':'harr','\\u21AE':'nharr','\\u2195':'varr','\\u2196':'nwarr','\\u2197':'nearr','\\u2198':'searr','\\u2199':'swarr','\\u219D':'rarrw','\\u219D\\u0338':'nrarrw','\\u219E':'Larr','\\u219F':'Uarr','\\u21A0':'Rarr','\\u21A1':'Darr','\\u21A2':'larrtl','\\u21A3':'rarrtl','\\u21A4':'mapstoleft','\\u21A5':'mapstoup','\\u21A6':'map','\\u21A7':'mapstodown','\\u21A9':'larrhk','\\u21AA':'rarrhk','\\u21AB':'larrlp','\\u21AC':'rarrlp','\\u21AD':'harrw','\\u21B0':'lsh','\\u21B1':'rsh','\\u21B2':'ldsh','\\u21B3':'rdsh','\\u21B5':'crarr','\\u21B6':'cularr','\\u21B7':'curarr','\\u21BA':'olarr','\\u21BB':'orarr','\\u21BC':'lharu','\\u21BD':'lhard','\\u21BE':'uharr','\\u21BF':'uharl','\\u21C0':'rharu','\\u21C1':'rhard','\\u21C2':'dharr','\\u21C3':'dharl','\\u21C4':'rlarr','\\u21C5':'udarr','\\u21C6':'lrarr','\\u21C7':'llarr','\\u21C8':'uuarr','\\u21C9':'rrarr','\\u21CA':'ddarr','\\u21CB':'lrhar','\\u21CC':'rlhar','\\u21D0':'lArr','\\u21CD':'nlArr','\\u21D1':'uArr','\\u21D2':'rArr','\\u21CF':'nrArr','\\u21D3':'dArr','\\u21D4':'iff','\\u21CE':'nhArr','\\u21D5':'vArr','\\u21D6':'nwArr','\\u21D7':'neArr','\\u21D8':'seArr','\\u21D9':'swArr','\\u21DA':'lAarr','\\u21DB':'rAarr','\\u21DD':'zigrarr','\\u21E4':'larrb','\\u21E5':'rarrb','\\u21F5':'duarr','\\u21FD':'loarr','\\u21FE':'roarr','\\u21FF':'hoarr','\\u2200':'forall','\\u2201':'comp','\\u2202':'part','\\u2202\\u0338':'npart','\\u2203':'exist','\\u2204':'nexist','\\u2205':'empty','\\u2207':'Del','\\u2208':'in','\\u2209':'notin','\\u220B':'ni','\\u220C':'notni','\\u03F6':'bepsi','\\u220F':'prod','\\u2210':'coprod','\\u2211':'sum','+':'plus','\\xB1':'pm','\\xF7':'div','\\xD7':'times','<':'lt','\\u226E':'nlt','<\\u20D2':'nvlt','=':'equals','\\u2260':'ne','=\\u20E5':'bne','\\u2A75':'Equal','>':'gt','\\u226F':'ngt','>\\u20D2':'nvgt','\\xAC':'not','|':'vert','\\xA6':'brvbar','\\u2212':'minus','\\u2213':'mp','\\u2214':'plusdo','\\u2044':'frasl','\\u2216':'setmn','\\u2217':'lowast','\\u2218':'compfn','\\u221A':'Sqrt','\\u221D':'prop','\\u221E':'infin','\\u221F':'angrt','\\u2220':'ang','\\u2220\\u20D2':'nang','\\u2221':'angmsd','\\u2222':'angsph','\\u2223':'mid','\\u2224':'nmid','\\u2225':'par','\\u2226':'npar','\\u2227':'and','\\u2228':'or','\\u2229':'cap','\\u2229\\uFE00':'caps','\\u222A':'cup','\\u222A\\uFE00':'cups','\\u222B':'int','\\u222C':'Int','\\u222D':'tint','\\u2A0C':'qint','\\u222E':'oint','\\u222F':'Conint','\\u2230':'Cconint','\\u2231':'cwint','\\u2232':'cwconint','\\u2233':'awconint','\\u2234':'there4','\\u2235':'becaus','\\u2236':'ratio','\\u2237':'Colon','\\u2238':'minusd','\\u223A':'mDDot','\\u223B':'homtht','\\u223C':'sim','\\u2241':'nsim','\\u223C\\u20D2':'nvsim','\\u223D':'bsim','\\u223D\\u0331':'race','\\u223E':'ac','\\u223E\\u0333':'acE','\\u223F':'acd','\\u2240':'wr','\\u2242':'esim','\\u2242\\u0338':'nesim','\\u2243':'sime','\\u2244':'nsime','\\u2245':'cong','\\u2247':'ncong','\\u2246':'simne','\\u2248':'ap','\\u2249':'nap','\\u224A':'ape','\\u224B':'apid','\\u224B\\u0338':'napid','\\u224C':'bcong','\\u224D':'CupCap','\\u226D':'NotCupCap','\\u224D\\u20D2':'nvap','\\u224E':'bump','\\u224E\\u0338':'nbump','\\u224F':'bumpe','\\u224F\\u0338':'nbumpe','\\u2250':'doteq','\\u2250\\u0338':'nedot','\\u2251':'eDot','\\u2252':'efDot','\\u2253':'erDot','\\u2254':'colone','\\u2255':'ecolon','\\u2256':'ecir','\\u2257':'cire','\\u2259':'wedgeq','\\u225A':'veeeq','\\u225C':'trie','\\u225F':'equest','\\u2261':'equiv','\\u2262':'nequiv','\\u2261\\u20E5':'bnequiv','\\u2264':'le','\\u2270':'nle','\\u2264\\u20D2':'nvle','\\u2265':'ge','\\u2271':'nge','\\u2265\\u20D2':'nvge','\\u2266':'lE','\\u2266\\u0338':'nlE','\\u2267':'gE','\\u2267\\u0338':'ngE','\\u2268\\uFE00':'lvnE','\\u2268':'lnE','\\u2269':'gnE','\\u2269\\uFE00':'gvnE','\\u226A':'ll','\\u226A\\u0338':'nLtv','\\u226A\\u20D2':'nLt','\\u226B':'gg','\\u226B\\u0338':'nGtv','\\u226B\\u20D2':'nGt','\\u226C':'twixt','\\u2272':'lsim','\\u2274':'nlsim','\\u2273':'gsim','\\u2275':'ngsim','\\u2276':'lg','\\u2278':'ntlg','\\u2277':'gl','\\u2279':'ntgl','\\u227A':'pr','\\u2280':'npr','\\u227B':'sc','\\u2281':'nsc','\\u227C':'prcue','\\u22E0':'nprcue','\\u227D':'sccue','\\u22E1':'nsccue','\\u227E':'prsim','\\u227F':'scsim','\\u227F\\u0338':'NotSucceedsTilde','\\u2282':'sub','\\u2284':'nsub','\\u2282\\u20D2':'vnsub','\\u2283':'sup','\\u2285':'nsup','\\u2283\\u20D2':'vnsup','\\u2286':'sube','\\u2288':'nsube','\\u2287':'supe','\\u2289':'nsupe','\\u228A\\uFE00':'vsubne','\\u228A':'subne','\\u228B\\uFE00':'vsupne','\\u228B':'supne','\\u228D':'cupdot','\\u228E':'uplus','\\u228F':'sqsub','\\u228F\\u0338':'NotSquareSubset','\\u2290':'sqsup','\\u2290\\u0338':'NotSquareSuperset','\\u2291':'sqsube','\\u22E2':'nsqsube','\\u2292':'sqsupe','\\u22E3':'nsqsupe','\\u2293':'sqcap','\\u2293\\uFE00':'sqcaps','\\u2294':'sqcup','\\u2294\\uFE00':'sqcups','\\u2295':'oplus','\\u2296':'ominus','\\u2297':'otimes','\\u2298':'osol','\\u2299':'odot','\\u229A':'ocir','\\u229B':'oast','\\u229D':'odash','\\u229E':'plusb','\\u229F':'minusb','\\u22A0':'timesb','\\u22A1':'sdotb','\\u22A2':'vdash','\\u22AC':'nvdash','\\u22A3':'dashv','\\u22A4':'top','\\u22A5':'bot','\\u22A7':'models','\\u22A8':'vDash','\\u22AD':'nvDash','\\u22A9':'Vdash','\\u22AE':'nVdash','\\u22AA':'Vvdash','\\u22AB':'VDash','\\u22AF':'nVDash','\\u22B0':'prurel','\\u22B2':'vltri','\\u22EA':'nltri','\\u22B3':'vrtri','\\u22EB':'nrtri','\\u22B4':'ltrie','\\u22EC':'nltrie','\\u22B4\\u20D2':'nvltrie','\\u22B5':'rtrie','\\u22ED':'nrtrie','\\u22B5\\u20D2':'nvrtrie','\\u22B6':'origof','\\u22B7':'imof','\\u22B8':'mumap','\\u22B9':'hercon','\\u22BA':'intcal','\\u22BB':'veebar','\\u22BD':'barvee','\\u22BE':'angrtvb','\\u22BF':'lrtri','\\u22C0':'Wedge','\\u22C1':'Vee','\\u22C2':'xcap','\\u22C3':'xcup','\\u22C4':'diam','\\u22C5':'sdot','\\u22C6':'Star','\\u22C7':'divonx','\\u22C8':'bowtie','\\u22C9':'ltimes','\\u22CA':'rtimes','\\u22CB':'lthree','\\u22CC':'rthree','\\u22CD':'bsime','\\u22CE':'cuvee','\\u22CF':'cuwed','\\u22D0':'Sub','\\u22D1':'Sup','\\u22D2':'Cap','\\u22D3':'Cup','\\u22D4':'fork','\\u22D5':'epar','\\u22D6':'ltdot','\\u22D7':'gtdot','\\u22D8':'Ll','\\u22D8\\u0338':'nLl','\\u22D9':'Gg','\\u22D9\\u0338':'nGg','\\u22DA\\uFE00':'lesg','\\u22DA':'leg','\\u22DB':'gel','\\u22DB\\uFE00':'gesl','\\u22DE':'cuepr','\\u22DF':'cuesc','\\u22E6':'lnsim','\\u22E7':'gnsim','\\u22E8':'prnsim','\\u22E9':'scnsim','\\u22EE':'vellip','\\u22EF':'ctdot','\\u22F0':'utdot','\\u22F1':'dtdot','\\u22F2':'disin','\\u22F3':'isinsv','\\u22F4':'isins','\\u22F5':'isindot','\\u22F5\\u0338':'notindot','\\u22F6':'notinvc','\\u22F7':'notinvb','\\u22F9':'isinE','\\u22F9\\u0338':'notinE','\\u22FA':'nisd','\\u22FB':'xnis','\\u22FC':'nis','\\u22FD':'notnivc','\\u22FE':'notnivb','\\u2305':'barwed','\\u2306':'Barwed','\\u230C':'drcrop','\\u230D':'dlcrop','\\u230E':'urcrop','\\u230F':'ulcrop','\\u2310':'bnot','\\u2312':'profline','\\u2313':'profsurf','\\u2315':'telrec','\\u2316':'target','\\u231C':'ulcorn','\\u231D':'urcorn','\\u231E':'dlcorn','\\u231F':'drcorn','\\u2322':'frown','\\u2323':'smile','\\u232D':'cylcty','\\u232E':'profalar','\\u2336':'topbot','\\u233D':'ovbar','\\u233F':'solbar','\\u237C':'angzarr','\\u23B0':'lmoust','\\u23B1':'rmoust','\\u23B4':'tbrk','\\u23B5':'bbrk','\\u23B6':'bbrktbrk','\\u23DC':'OverParenthesis','\\u23DD':'UnderParenthesis','\\u23DE':'OverBrace','\\u23DF':'UnderBrace','\\u23E2':'trpezium','\\u23E7':'elinters','\\u2423':'blank','\\u2500':'boxh','\\u2502':'boxv','\\u250C':'boxdr','\\u2510':'boxdl','\\u2514':'boxur','\\u2518':'boxul','\\u251C':'boxvr','\\u2524':'boxvl','\\u252C':'boxhd','\\u2534':'boxhu','\\u253C':'boxvh','\\u2550':'boxH','\\u2551':'boxV','\\u2552':'boxdR','\\u2553':'boxDr','\\u2554':'boxDR','\\u2555':'boxdL','\\u2556':'boxDl','\\u2557':'boxDL','\\u2558':'boxuR','\\u2559':'boxUr','\\u255A':'boxUR','\\u255B':'boxuL','\\u255C':'boxUl','\\u255D':'boxUL','\\u255E':'boxvR','\\u255F':'boxVr','\\u2560':'boxVR','\\u2561':'boxvL','\\u2562':'boxVl','\\u2563':'boxVL','\\u2564':'boxHd','\\u2565':'boxhD','\\u2566':'boxHD','\\u2567':'boxHu','\\u2568':'boxhU','\\u2569':'boxHU','\\u256A':'boxvH','\\u256B':'boxVh','\\u256C':'boxVH','\\u2580':'uhblk','\\u2584':'lhblk','\\u2588':'block','\\u2591':'blk14','\\u2592':'blk12','\\u2593':'blk34','\\u25A1':'squ','\\u25AA':'squf','\\u25AB':'EmptyVerySmallSquare','\\u25AD':'rect','\\u25AE':'marker','\\u25B1':'fltns','\\u25B3':'xutri','\\u25B4':'utrif','\\u25B5':'utri','\\u25B8':'rtrif','\\u25B9':'rtri','\\u25BD':'xdtri','\\u25BE':'dtrif','\\u25BF':'dtri','\\u25C2':'ltrif','\\u25C3':'ltri','\\u25CA':'loz','\\u25CB':'cir','\\u25EC':'tridot','\\u25EF':'xcirc','\\u25F8':'ultri','\\u25F9':'urtri','\\u25FA':'lltri','\\u25FB':'EmptySmallSquare','\\u25FC':'FilledSmallSquare','\\u2605':'starf','\\u2606':'star','\\u260E':'phone','\\u2640':'female','\\u2642':'male','\\u2660':'spades','\\u2663':'clubs','\\u2665':'hearts','\\u2666':'diams','\\u266A':'sung','\\u2713':'check','\\u2717':'cross','\\u2720':'malt','\\u2736':'sext','\\u2758':'VerticalSeparator','\\u27C8':'bsolhsub','\\u27C9':'suphsol','\\u27F5':'xlarr','\\u27F6':'xrarr','\\u27F7':'xharr','\\u27F8':'xlArr','\\u27F9':'xrArr','\\u27FA':'xhArr','\\u27FC':'xmap','\\u27FF':'dzigrarr','\\u2902':'nvlArr','\\u2903':'nvrArr','\\u2904':'nvHarr','\\u2905':'Map','\\u290C':'lbarr','\\u290D':'rbarr','\\u290E':'lBarr','\\u290F':'rBarr','\\u2910':'RBarr','\\u2911':'DDotrahd','\\u2912':'UpArrowBar','\\u2913':'DownArrowBar','\\u2916':'Rarrtl','\\u2919':'latail','\\u291A':'ratail','\\u291B':'lAtail','\\u291C':'rAtail','\\u291D':'larrfs','\\u291E':'rarrfs','\\u291F':'larrbfs','\\u2920':'rarrbfs','\\u2923':'nwarhk','\\u2924':'nearhk','\\u2925':'searhk','\\u2926':'swarhk','\\u2927':'nwnear','\\u2928':'toea','\\u2929':'tosa','\\u292A':'swnwar','\\u2933':'rarrc','\\u2933\\u0338':'nrarrc','\\u2935':'cudarrr','\\u2936':'ldca','\\u2937':'rdca','\\u2938':'cudarrl','\\u2939':'larrpl','\\u293C':'curarrm','\\u293D':'cularrp','\\u2945':'rarrpl','\\u2948':'harrcir','\\u2949':'Uarrocir','\\u294A':'lurdshar','\\u294B':'ldrushar','\\u294E':'LeftRightVector','\\u294F':'RightUpDownVector','\\u2950':'DownLeftRightVector','\\u2951':'LeftUpDownVector','\\u2952':'LeftVectorBar','\\u2953':'RightVectorBar','\\u2954':'RightUpVectorBar','\\u2955':'RightDownVectorBar','\\u2956':'DownLeftVectorBar','\\u2957':'DownRightVectorBar','\\u2958':'LeftUpVectorBar','\\u2959':'LeftDownVectorBar','\\u295A':'LeftTeeVector','\\u295B':'RightTeeVector','\\u295C':'RightUpTeeVector','\\u295D':'RightDownTeeVector','\\u295E':'DownLeftTeeVector','\\u295F':'DownRightTeeVector','\\u2960':'LeftUpTeeVector','\\u2961':'LeftDownTeeVector','\\u2962':'lHar','\\u2963':'uHar','\\u2964':'rHar','\\u2965':'dHar','\\u2966':'luruhar','\\u2967':'ldrdhar','\\u2968':'ruluhar','\\u2969':'rdldhar','\\u296A':'lharul','\\u296B':'llhard','\\u296C':'rharul','\\u296D':'lrhard','\\u296E':'udhar','\\u296F':'duhar','\\u2970':'RoundImplies','\\u2971':'erarr','\\u2972':'simrarr','\\u2973':'larrsim','\\u2974':'rarrsim','\\u2975':'rarrap','\\u2976':'ltlarr','\\u2978':'gtrarr','\\u2979':'subrarr','\\u297B':'suplarr','\\u297C':'lfisht','\\u297D':'rfisht','\\u297E':'ufisht','\\u297F':'dfisht','\\u299A':'vzigzag','\\u299C':'vangrt','\\u299D':'angrtvbd','\\u29A4':'ange','\\u29A5':'range','\\u29A6':'dwangle','\\u29A7':'uwangle','\\u29A8':'angmsdaa','\\u29A9':'angmsdab','\\u29AA':'angmsdac','\\u29AB':'angmsdad','\\u29AC':'angmsdae','\\u29AD':'angmsdaf','\\u29AE':'angmsdag','\\u29AF':'angmsdah','\\u29B0':'bemptyv','\\u29B1':'demptyv','\\u29B2':'cemptyv','\\u29B3':'raemptyv','\\u29B4':'laemptyv','\\u29B5':'ohbar','\\u29B6':'omid','\\u29B7':'opar','\\u29B9':'operp','\\u29BB':'olcross','\\u29BC':'odsold','\\u29BE':'olcir','\\u29BF':'ofcir','\\u29C0':'olt','\\u29C1':'ogt','\\u29C2':'cirscir','\\u29C3':'cirE','\\u29C4':'solb','\\u29C5':'bsolb','\\u29C9':'boxbox','\\u29CD':'trisb','\\u29CE':'rtriltri','\\u29CF':'LeftTriangleBar','\\u29CF\\u0338':'NotLeftTriangleBar','\\u29D0':'RightTriangleBar','\\u29D0\\u0338':'NotRightTriangleBar','\\u29DC':'iinfin','\\u29DD':'infintie','\\u29DE':'nvinfin','\\u29E3':'eparsl','\\u29E4':'smeparsl','\\u29E5':'eqvparsl','\\u29EB':'lozf','\\u29F4':'RuleDelayed','\\u29F6':'dsol','\\u2A00':'xodot','\\u2A01':'xoplus','\\u2A02':'xotime','\\u2A04':'xuplus','\\u2A06':'xsqcup','\\u2A0D':'fpartint','\\u2A10':'cirfnint','\\u2A11':'awint','\\u2A12':'rppolint','\\u2A13':'scpolint','\\u2A14':'npolint','\\u2A15':'pointint','\\u2A16':'quatint','\\u2A17':'intlarhk','\\u2A22':'pluscir','\\u2A23':'plusacir','\\u2A24':'simplus','\\u2A25':'plusdu','\\u2A26':'plussim','\\u2A27':'plustwo','\\u2A29':'mcomma','\\u2A2A':'minusdu','\\u2A2D':'loplus','\\u2A2E':'roplus','\\u2A2F':'Cross','\\u2A30':'timesd','\\u2A31':'timesbar','\\u2A33':'smashp','\\u2A34':'lotimes','\\u2A35':'rotimes','\\u2A36':'otimesas','\\u2A37':'Otimes','\\u2A38':'odiv','\\u2A39':'triplus','\\u2A3A':'triminus','\\u2A3B':'tritime','\\u2A3C':'iprod','\\u2A3F':'amalg','\\u2A40':'capdot','\\u2A42':'ncup','\\u2A43':'ncap','\\u2A44':'capand','\\u2A45':'cupor','\\u2A46':'cupcap','\\u2A47':'capcup','\\u2A48':'cupbrcap','\\u2A49':'capbrcup','\\u2A4A':'cupcup','\\u2A4B':'capcap','\\u2A4C':'ccups','\\u2A4D':'ccaps','\\u2A50':'ccupssm','\\u2A53':'And','\\u2A54':'Or','\\u2A55':'andand','\\u2A56':'oror','\\u2A57':'orslope','\\u2A58':'andslope','\\u2A5A':'andv','\\u2A5B':'orv','\\u2A5C':'andd','\\u2A5D':'ord','\\u2A5F':'wedbar','\\u2A66':'sdote','\\u2A6A':'simdot','\\u2A6D':'congdot','\\u2A6D\\u0338':'ncongdot','\\u2A6E':'easter','\\u2A6F':'apacir','\\u2A70':'apE','\\u2A70\\u0338':'napE','\\u2A71':'eplus','\\u2A72':'pluse','\\u2A73':'Esim','\\u2A77':'eDDot','\\u2A78':'equivDD','\\u2A79':'ltcir','\\u2A7A':'gtcir','\\u2A7B':'ltquest','\\u2A7C':'gtquest','\\u2A7D':'les','\\u2A7D\\u0338':'nles','\\u2A7E':'ges','\\u2A7E\\u0338':'nges','\\u2A7F':'lesdot','\\u2A80':'gesdot','\\u2A81':'lesdoto','\\u2A82':'gesdoto','\\u2A83':'lesdotor','\\u2A84':'gesdotol','\\u2A85':'lap','\\u2A86':'gap','\\u2A87':'lne','\\u2A88':'gne','\\u2A89':'lnap','\\u2A8A':'gnap','\\u2A8B':'lEg','\\u2A8C':'gEl','\\u2A8D':'lsime','\\u2A8E':'gsime','\\u2A8F':'lsimg','\\u2A90':'gsiml','\\u2A91':'lgE','\\u2A92':'glE','\\u2A93':'lesges','\\u2A94':'gesles','\\u2A95':'els','\\u2A96':'egs','\\u2A97':'elsdot','\\u2A98':'egsdot','\\u2A99':'el','\\u2A9A':'eg','\\u2A9D':'siml','\\u2A9E':'simg','\\u2A9F':'simlE','\\u2AA0':'simgE','\\u2AA1':'LessLess','\\u2AA1\\u0338':'NotNestedLessLess','\\u2AA2':'GreaterGreater','\\u2AA2\\u0338':'NotNestedGreaterGreater','\\u2AA4':'glj','\\u2AA5':'gla','\\u2AA6':'ltcc','\\u2AA7':'gtcc','\\u2AA8':'lescc','\\u2AA9':'gescc','\\u2AAA':'smt','\\u2AAB':'lat','\\u2AAC':'smte','\\u2AAC\\uFE00':'smtes','\\u2AAD':'late','\\u2AAD\\uFE00':'lates','\\u2AAE':'bumpE','\\u2AAF':'pre','\\u2AAF\\u0338':'npre','\\u2AB0':'sce','\\u2AB0\\u0338':'nsce','\\u2AB3':'prE','\\u2AB4':'scE','\\u2AB5':'prnE','\\u2AB6':'scnE','\\u2AB7':'prap','\\u2AB8':'scap','\\u2AB9':'prnap','\\u2ABA':'scnap','\\u2ABB':'Pr','\\u2ABC':'Sc','\\u2ABD':'subdot','\\u2ABE':'supdot','\\u2ABF':'subplus','\\u2AC0':'supplus','\\u2AC1':'submult','\\u2AC2':'supmult','\\u2AC3':'subedot','\\u2AC4':'supedot','\\u2AC5':'subE','\\u2AC5\\u0338':'nsubE','\\u2AC6':'supE','\\u2AC6\\u0338':'nsupE','\\u2AC7':'subsim','\\u2AC8':'supsim','\\u2ACB\\uFE00':'vsubnE','\\u2ACB':'subnE','\\u2ACC\\uFE00':'vsupnE','\\u2ACC':'supnE','\\u2ACF':'csub','\\u2AD0':'csup','\\u2AD1':'csube','\\u2AD2':'csupe','\\u2AD3':'subsup','\\u2AD4':'supsub','\\u2AD5':'subsub','\\u2AD6':'supsup','\\u2AD7':'suphsub','\\u2AD8':'supdsub','\\u2AD9':'forkv','\\u2ADA':'topfork','\\u2ADB':'mlcp','\\u2AE4':'Dashv','\\u2AE6':'Vdashl','\\u2AE7':'Barv','\\u2AE8':'vBar','\\u2AE9':'vBarv','\\u2AEB':'Vbar','\\u2AEC':'Not','\\u2AED':'bNot','\\u2AEE':'rnmid','\\u2AEF':'cirmid','\\u2AF0':'midcir','\\u2AF1':'topcir','\\u2AF2':'nhpar','\\u2AF3':'parsim','\\u2AFD':'parsl','\\u2AFD\\u20E5':'nparsl','\\u266D':'flat','\\u266E':'natur','\\u266F':'sharp','\\xA4':'curren','\\xA2':'cent','$':'dollar','\\xA3':'pound','\\xA5':'yen','\\u20AC':'euro','\\xB9':'sup1','\\xBD':'half','\\u2153':'frac13','\\xBC':'frac14','\\u2155':'frac15','\\u2159':'frac16','\\u215B':'frac18','\\xB2':'sup2','\\u2154':'frac23','\\u2156':'frac25','\\xB3':'sup3','\\xBE':'frac34','\\u2157':'frac35','\\u215C':'frac38','\\u2158':'frac45','\\u215A':'frac56','\\u215D':'frac58','\\u215E':'frac78','\\uD835\\uDCB6':'ascr','\\uD835\\uDD52':'aopf','\\uD835\\uDD1E':'afr','\\uD835\\uDD38':'Aopf','\\uD835\\uDD04':'Afr','\\uD835\\uDC9C':'Ascr','\\xAA':'ordf','\\xE1':'aacute','\\xC1':'Aacute','\\xE0':'agrave','\\xC0':'Agrave','\\u0103':'abreve','\\u0102':'Abreve','\\xE2':'acirc','\\xC2':'Acirc','\\xE5':'aring','\\xC5':'angst','\\xE4':'auml','\\xC4':'Auml','\\xE3':'atilde','\\xC3':'Atilde','\\u0105':'aogon','\\u0104':'Aogon','\\u0101':'amacr','\\u0100':'Amacr','\\xE6':'aelig','\\xC6':'AElig','\\uD835\\uDCB7':'bscr','\\uD835\\uDD53':'bopf','\\uD835\\uDD1F':'bfr','\\uD835\\uDD39':'Bopf','\\u212C':'Bscr','\\uD835\\uDD05':'Bfr','\\uD835\\uDD20':'cfr','\\uD835\\uDCB8':'cscr','\\uD835\\uDD54':'copf','\\u212D':'Cfr','\\uD835\\uDC9E':'Cscr','\\u2102':'Copf','\\u0107':'cacute','\\u0106':'Cacute','\\u0109':'ccirc','\\u0108':'Ccirc','\\u010D':'ccaron','\\u010C':'Ccaron','\\u010B':'cdot','\\u010A':'Cdot','\\xE7':'ccedil','\\xC7':'Ccedil','\\u2105':'incare','\\uD835\\uDD21':'dfr','\\u2146':'dd','\\uD835\\uDD55':'dopf','\\uD835\\uDCB9':'dscr','\\uD835\\uDC9F':'Dscr','\\uD835\\uDD07':'Dfr','\\u2145':'DD','\\uD835\\uDD3B':'Dopf','\\u010F':'dcaron','\\u010E':'Dcaron','\\u0111':'dstrok','\\u0110':'Dstrok','\\xF0':'eth','\\xD0':'ETH','\\u2147':'ee','\\u212F':'escr','\\uD835\\uDD22':'efr','\\uD835\\uDD56':'eopf','\\u2130':'Escr','\\uD835\\uDD08':'Efr','\\uD835\\uDD3C':'Eopf','\\xE9':'eacute','\\xC9':'Eacute','\\xE8':'egrave','\\xC8':'Egrave','\\xEA':'ecirc','\\xCA':'Ecirc','\\u011B':'ecaron','\\u011A':'Ecaron','\\xEB':'euml','\\xCB':'Euml','\\u0117':'edot','\\u0116':'Edot','\\u0119':'eogon','\\u0118':'Eogon','\\u0113':'emacr','\\u0112':'Emacr','\\uD835\\uDD23':'ffr','\\uD835\\uDD57':'fopf','\\uD835\\uDCBB':'fscr','\\uD835\\uDD09':'Ffr','\\uD835\\uDD3D':'Fopf','\\u2131':'Fscr','\\uFB00':'fflig','\\uFB03':'ffilig','\\uFB04':'ffllig','\\uFB01':'filig','fj':'fjlig','\\uFB02':'fllig','\\u0192':'fnof','\\u210A':'gscr','\\uD835\\uDD58':'gopf','\\uD835\\uDD24':'gfr','\\uD835\\uDCA2':'Gscr','\\uD835\\uDD3E':'Gopf','\\uD835\\uDD0A':'Gfr','\\u01F5':'gacute','\\u011F':'gbreve','\\u011E':'Gbreve','\\u011D':'gcirc','\\u011C':'Gcirc','\\u0121':'gdot','\\u0120':'Gdot','\\u0122':'Gcedil','\\uD835\\uDD25':'hfr','\\u210E':'planckh','\\uD835\\uDCBD':'hscr','\\uD835\\uDD59':'hopf','\\u210B':'Hscr','\\u210C':'Hfr','\\u210D':'Hopf','\\u0125':'hcirc','\\u0124':'Hcirc','\\u210F':'hbar','\\u0127':'hstrok','\\u0126':'Hstrok','\\uD835\\uDD5A':'iopf','\\uD835\\uDD26':'ifr','\\uD835\\uDCBE':'iscr','\\u2148':'ii','\\uD835\\uDD40':'Iopf','\\u2110':'Iscr','\\u2111':'Im','\\xED':'iacute','\\xCD':'Iacute','\\xEC':'igrave','\\xCC':'Igrave','\\xEE':'icirc','\\xCE':'Icirc','\\xEF':'iuml','\\xCF':'Iuml','\\u0129':'itilde','\\u0128':'Itilde','\\u0130':'Idot','\\u012F':'iogon','\\u012E':'Iogon','\\u012B':'imacr','\\u012A':'Imacr','\\u0133':'ijlig','\\u0132':'IJlig','\\u0131':'imath','\\uD835\\uDCBF':'jscr','\\uD835\\uDD5B':'jopf','\\uD835\\uDD27':'jfr','\\uD835\\uDCA5':'Jscr','\\uD835\\uDD0D':'Jfr','\\uD835\\uDD41':'Jopf','\\u0135':'jcirc','\\u0134':'Jcirc','\\u0237':'jmath','\\uD835\\uDD5C':'kopf','\\uD835\\uDCC0':'kscr','\\uD835\\uDD28':'kfr','\\uD835\\uDCA6':'Kscr','\\uD835\\uDD42':'Kopf','\\uD835\\uDD0E':'Kfr','\\u0137':'kcedil','\\u0136':'Kcedil','\\uD835\\uDD29':'lfr','\\uD835\\uDCC1':'lscr','\\u2113':'ell','\\uD835\\uDD5D':'lopf','\\u2112':'Lscr','\\uD835\\uDD0F':'Lfr','\\uD835\\uDD43':'Lopf','\\u013A':'lacute','\\u0139':'Lacute','\\u013E':'lcaron','\\u013D':'Lcaron','\\u013C':'lcedil','\\u013B':'Lcedil','\\u0142':'lstrok','\\u0141':'Lstrok','\\u0140':'lmidot','\\u013F':'Lmidot','\\uD835\\uDD2A':'mfr','\\uD835\\uDD5E':'mopf','\\uD835\\uDCC2':'mscr','\\uD835\\uDD10':'Mfr','\\uD835\\uDD44':'Mopf','\\u2133':'Mscr','\\uD835\\uDD2B':'nfr','\\uD835\\uDD5F':'nopf','\\uD835\\uDCC3':'nscr','\\u2115':'Nopf','\\uD835\\uDCA9':'Nscr','\\uD835\\uDD11':'Nfr','\\u0144':'nacute','\\u0143':'Nacute','\\u0148':'ncaron','\\u0147':'Ncaron','\\xF1':'ntilde','\\xD1':'Ntilde','\\u0146':'ncedil','\\u0145':'Ncedil','\\u2116':'numero','\\u014B':'eng','\\u014A':'ENG','\\uD835\\uDD60':'oopf','\\uD835\\uDD2C':'ofr','\\u2134':'oscr','\\uD835\\uDCAA':'Oscr','\\uD835\\uDD12':'Ofr','\\uD835\\uDD46':'Oopf','\\xBA':'ordm','\\xF3':'oacute','\\xD3':'Oacute','\\xF2':'ograve','\\xD2':'Ograve','\\xF4':'ocirc','\\xD4':'Ocirc','\\xF6':'ouml','\\xD6':'Ouml','\\u0151':'odblac','\\u0150':'Odblac','\\xF5':'otilde','\\xD5':'Otilde','\\xF8':'oslash','\\xD8':'Oslash','\\u014D':'omacr','\\u014C':'Omacr','\\u0153':'oelig','\\u0152':'OElig','\\uD835\\uDD2D':'pfr','\\uD835\\uDCC5':'pscr','\\uD835\\uDD61':'popf','\\u2119':'Popf','\\uD835\\uDD13':'Pfr','\\uD835\\uDCAB':'Pscr','\\uD835\\uDD62':'qopf','\\uD835\\uDD2E':'qfr','\\uD835\\uDCC6':'qscr','\\uD835\\uDCAC':'Qscr','\\uD835\\uDD14':'Qfr','\\u211A':'Qopf','\\u0138':'kgreen','\\uD835\\uDD2F':'rfr','\\uD835\\uDD63':'ropf','\\uD835\\uDCC7':'rscr','\\u211B':'Rscr','\\u211C':'Re','\\u211D':'Ropf','\\u0155':'racute','\\u0154':'Racute','\\u0159':'rcaron','\\u0158':'Rcaron','\\u0157':'rcedil','\\u0156':'Rcedil','\\uD835\\uDD64':'sopf','\\uD835\\uDCC8':'sscr','\\uD835\\uDD30':'sfr','\\uD835\\uDD4A':'Sopf','\\uD835\\uDD16':'Sfr','\\uD835\\uDCAE':'Sscr','\\u24C8':'oS','\\u015B':'sacute','\\u015A':'Sacute','\\u015D':'scirc','\\u015C':'Scirc','\\u0161':'scaron','\\u0160':'Scaron','\\u015F':'scedil','\\u015E':'Scedil','\\xDF':'szlig','\\uD835\\uDD31':'tfr','\\uD835\\uDCC9':'tscr','\\uD835\\uDD65':'topf','\\uD835\\uDCAF':'Tscr','\\uD835\\uDD17':'Tfr','\\uD835\\uDD4B':'Topf','\\u0165':'tcaron','\\u0164':'Tcaron','\\u0163':'tcedil','\\u0162':'Tcedil','\\u2122':'trade','\\u0167':'tstrok','\\u0166':'Tstrok','\\uD835\\uDCCA':'uscr','\\uD835\\uDD66':'uopf','\\uD835\\uDD32':'ufr','\\uD835\\uDD4C':'Uopf','\\uD835\\uDD18':'Ufr','\\uD835\\uDCB0':'Uscr','\\xFA':'uacute','\\xDA':'Uacute','\\xF9':'ugrave','\\xD9':'Ugrave','\\u016D':'ubreve','\\u016C':'Ubreve','\\xFB':'ucirc','\\xDB':'Ucirc','\\u016F':'uring','\\u016E':'Uring','\\xFC':'uuml','\\xDC':'Uuml','\\u0171':'udblac','\\u0170':'Udblac','\\u0169':'utilde','\\u0168':'Utilde','\\u0173':'uogon','\\u0172':'Uogon','\\u016B':'umacr','\\u016A':'Umacr','\\uD835\\uDD33':'vfr','\\uD835\\uDD67':'vopf','\\uD835\\uDCCB':'vscr','\\uD835\\uDD19':'Vfr','\\uD835\\uDD4D':'Vopf','\\uD835\\uDCB1':'Vscr','\\uD835\\uDD68':'wopf','\\uD835\\uDCCC':'wscr','\\uD835\\uDD34':'wfr','\\uD835\\uDCB2':'Wscr','\\uD835\\uDD4E':'Wopf','\\uD835\\uDD1A':'Wfr','\\u0175':'wcirc','\\u0174':'Wcirc','\\uD835\\uDD35':'xfr','\\uD835\\uDCCD':'xscr','\\uD835\\uDD69':'xopf','\\uD835\\uDD4F':'Xopf','\\uD835\\uDD1B':'Xfr','\\uD835\\uDCB3':'Xscr','\\uD835\\uDD36':'yfr','\\uD835\\uDCCE':'yscr','\\uD835\\uDD6A':'yopf','\\uD835\\uDCB4':'Yscr','\\uD835\\uDD1C':'Yfr','\\uD835\\uDD50':'Yopf','\\xFD':'yacute','\\xDD':'Yacute','\\u0177':'ycirc','\\u0176':'Ycirc','\\xFF':'yuml','\\u0178':'Yuml','\\uD835\\uDCCF':'zscr','\\uD835\\uDD37':'zfr','\\uD835\\uDD6B':'zopf','\\u2128':'Zfr','\\u2124':'Zopf','\\uD835\\uDCB5':'Zscr','\\u017A':'zacute','\\u0179':'Zacute','\\u017E':'zcaron','\\u017D':'Zcaron','\\u017C':'zdot','\\u017B':'Zdot','\\u01B5':'imped','\\xFE':'thorn','\\xDE':'THORN','\\u0149':'napos','\\u03B1':'alpha','\\u0391':'Alpha','\\u03B2':'beta','\\u0392':'Beta','\\u03B3':'gamma','\\u0393':'Gamma','\\u03B4':'delta','\\u0394':'Delta','\\u03B5':'epsi','\\u03F5':'epsiv','\\u0395':'Epsilon','\\u03DD':'gammad','\\u03DC':'Gammad','\\u03B6':'zeta','\\u0396':'Zeta','\\u03B7':'eta','\\u0397':'Eta','\\u03B8':'theta','\\u03D1':'thetav','\\u0398':'Theta','\\u03B9':'iota','\\u0399':'Iota','\\u03BA':'kappa','\\u03F0':'kappav','\\u039A':'Kappa','\\u03BB':'lambda','\\u039B':'Lambda','\\u03BC':'mu','\\xB5':'micro','\\u039C':'Mu','\\u03BD':'nu','\\u039D':'Nu','\\u03BE':'xi','\\u039E':'Xi','\\u03BF':'omicron','\\u039F':'Omicron','\\u03C0':'pi','\\u03D6':'piv','\\u03A0':'Pi','\\u03C1':'rho','\\u03F1':'rhov','\\u03A1':'Rho','\\u03C3':'sigma','\\u03A3':'Sigma','\\u03C2':'sigmaf','\\u03C4':'tau','\\u03A4':'Tau','\\u03C5':'upsi','\\u03A5':'Upsilon','\\u03D2':'Upsi','\\u03C6':'phi','\\u03D5':'phiv','\\u03A6':'Phi','\\u03C7':'chi','\\u03A7':'Chi','\\u03C8':'psi','\\u03A8':'Psi','\\u03C9':'omega','\\u03A9':'ohm','\\u0430':'acy','\\u0410':'Acy','\\u0431':'bcy','\\u0411':'Bcy','\\u0432':'vcy','\\u0412':'Vcy','\\u0433':'gcy','\\u0413':'Gcy','\\u0453':'gjcy','\\u0403':'GJcy','\\u0434':'dcy','\\u0414':'Dcy','\\u0452':'djcy','\\u0402':'DJcy','\\u0435':'iecy','\\u0415':'IEcy','\\u0451':'iocy','\\u0401':'IOcy','\\u0454':'jukcy','\\u0404':'Jukcy','\\u0436':'zhcy','\\u0416':'ZHcy','\\u0437':'zcy','\\u0417':'Zcy','\\u0455':'dscy','\\u0405':'DScy','\\u0438':'icy','\\u0418':'Icy','\\u0456':'iukcy','\\u0406':'Iukcy','\\u0457':'yicy','\\u0407':'YIcy','\\u0439':'jcy','\\u0419':'Jcy','\\u0458':'jsercy','\\u0408':'Jsercy','\\u043A':'kcy','\\u041A':'Kcy','\\u045C':'kjcy','\\u040C':'KJcy','\\u043B':'lcy','\\u041B':'Lcy','\\u0459':'ljcy','\\u0409':'LJcy','\\u043C':'mcy','\\u041C':'Mcy','\\u043D':'ncy','\\u041D':'Ncy','\\u045A':'njcy','\\u040A':'NJcy','\\u043E':'ocy','\\u041E':'Ocy','\\u043F':'pcy','\\u041F':'Pcy','\\u0440':'rcy','\\u0420':'Rcy','\\u0441':'scy','\\u0421':'Scy','\\u0442':'tcy','\\u0422':'Tcy','\\u045B':'tshcy','\\u040B':'TSHcy','\\u0443':'ucy','\\u0423':'Ucy','\\u045E':'ubrcy','\\u040E':'Ubrcy','\\u0444':'fcy','\\u0424':'Fcy','\\u0445':'khcy','\\u0425':'KHcy','\\u0446':'tscy','\\u0426':'TScy','\\u0447':'chcy','\\u0427':'CHcy','\\u045F':'dzcy','\\u040F':'DZcy','\\u0448':'shcy','\\u0428':'SHcy','\\u0449':'shchcy','\\u0429':'SHCHcy','\\u044A':'hardcy','\\u042A':'HARDcy','\\u044B':'ycy','\\u042B':'Ycy','\\u044C':'softcy','\\u042C':'SOFTcy','\\u044D':'ecy','\\u042D':'Ecy','\\u044E':'yucy','\\u042E':'YUcy','\\u044F':'yacy','\\u042F':'YAcy','\\u2135':'aleph','\\u2136':'beth','\\u2137':'gimel','\\u2138':'daleth'};\n\n\tvar regexEscape = /[\"&'<>`]/g;\n\tvar escapeMap = {\n\t\t'\"': '&quot;',\n\t\t'&': '&amp;',\n\t\t'\\'': '&#x27;',\n\t\t'<': '&lt;',\n\t\t// See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the\n\t\t// following is not strictly necessary unless it’s part of a tag or an\n\t\t// unquoted attribute value. We’re only escaping it to support those\n\t\t// situations, and for XML support.\n\t\t'>': '&gt;',\n\t\t// In Internet Explorer ≤ 8, the backtick character can be used\n\t\t// to break out of (un)quoted attribute values or HTML comments.\n\t\t// See http://html5sec.org/#102, http://html5sec.org/#108, and\n\t\t// http://html5sec.org/#133.\n\t\t'`': '&#x60;'\n\t};\n\n\tvar regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;\n\tvar regexInvalidRawCodePoint = /[\\0-\\x08\\x0B\\x0E-\\x1F\\x7F-\\x9F\\uFDD0-\\uFDEF\\uFFFE\\uFFFF]|[\\uD83F\\uD87F\\uD8BF\\uD8FF\\uD93F\\uD97F\\uD9BF\\uD9FF\\uDA3F\\uDA7F\\uDABF\\uDAFF\\uDB3F\\uDB7F\\uDBBF\\uDBFF][\\uDFFE\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]/;\n\tvar regexDecode = /&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)([=a-zA-Z0-9])?/g;\n\tvar decodeMap = {'aacute':'\\xE1','Aacute':'\\xC1','abreve':'\\u0103','Abreve':'\\u0102','ac':'\\u223E','acd':'\\u223F','acE':'\\u223E\\u0333','acirc':'\\xE2','Acirc':'\\xC2','acute':'\\xB4','acy':'\\u0430','Acy':'\\u0410','aelig':'\\xE6','AElig':'\\xC6','af':'\\u2061','afr':'\\uD835\\uDD1E','Afr':'\\uD835\\uDD04','agrave':'\\xE0','Agrave':'\\xC0','alefsym':'\\u2135','aleph':'\\u2135','alpha':'\\u03B1','Alpha':'\\u0391','amacr':'\\u0101','Amacr':'\\u0100','amalg':'\\u2A3F','amp':'&','AMP':'&','and':'\\u2227','And':'\\u2A53','andand':'\\u2A55','andd':'\\u2A5C','andslope':'\\u2A58','andv':'\\u2A5A','ang':'\\u2220','ange':'\\u29A4','angle':'\\u2220','angmsd':'\\u2221','angmsdaa':'\\u29A8','angmsdab':'\\u29A9','angmsdac':'\\u29AA','angmsdad':'\\u29AB','angmsdae':'\\u29AC','angmsdaf':'\\u29AD','angmsdag':'\\u29AE','angmsdah':'\\u29AF','angrt':'\\u221F','angrtvb':'\\u22BE','angrtvbd':'\\u299D','angsph':'\\u2222','angst':'\\xC5','angzarr':'\\u237C','aogon':'\\u0105','Aogon':'\\u0104','aopf':'\\uD835\\uDD52','Aopf':'\\uD835\\uDD38','ap':'\\u2248','apacir':'\\u2A6F','ape':'\\u224A','apE':'\\u2A70','apid':'\\u224B','apos':'\\'','ApplyFunction':'\\u2061','approx':'\\u2248','approxeq':'\\u224A','aring':'\\xE5','Aring':'\\xC5','ascr':'\\uD835\\uDCB6','Ascr':'\\uD835\\uDC9C','Assign':'\\u2254','ast':'*','asymp':'\\u2248','asympeq':'\\u224D','atilde':'\\xE3','Atilde':'\\xC3','auml':'\\xE4','Auml':'\\xC4','awconint':'\\u2233','awint':'\\u2A11','backcong':'\\u224C','backepsilon':'\\u03F6','backprime':'\\u2035','backsim':'\\u223D','backsimeq':'\\u22CD','Backslash':'\\u2216','Barv':'\\u2AE7','barvee':'\\u22BD','barwed':'\\u2305','Barwed':'\\u2306','barwedge':'\\u2305','bbrk':'\\u23B5','bbrktbrk':'\\u23B6','bcong':'\\u224C','bcy':'\\u0431','Bcy':'\\u0411','bdquo':'\\u201E','becaus':'\\u2235','because':'\\u2235','Because':'\\u2235','bemptyv':'\\u29B0','bepsi':'\\u03F6','bernou':'\\u212C','Bernoullis':'\\u212C','beta':'\\u03B2','Beta':'\\u0392','beth':'\\u2136','between':'\\u226C','bfr':'\\uD835\\uDD1F','Bfr':'\\uD835\\uDD05','bigcap':'\\u22C2','bigcirc':'\\u25EF','bigcup':'\\u22C3','bigodot':'\\u2A00','bigoplus':'\\u2A01','bigotimes':'\\u2A02','bigsqcup':'\\u2A06','bigstar':'\\u2605','bigtriangledown':'\\u25BD','bigtriangleup':'\\u25B3','biguplus':'\\u2A04','bigvee':'\\u22C1','bigwedge':'\\u22C0','bkarow':'\\u290D','blacklozenge':'\\u29EB','blacksquare':'\\u25AA','blacktriangle':'\\u25B4','blacktriangledown':'\\u25BE','blacktriangleleft':'\\u25C2','blacktriangleright':'\\u25B8','blank':'\\u2423','blk12':'\\u2592','blk14':'\\u2591','blk34':'\\u2593','block':'\\u2588','bne':'=\\u20E5','bnequiv':'\\u2261\\u20E5','bnot':'\\u2310','bNot':'\\u2AED','bopf':'\\uD835\\uDD53','Bopf':'\\uD835\\uDD39','bot':'\\u22A5','bottom':'\\u22A5','bowtie':'\\u22C8','boxbox':'\\u29C9','boxdl':'\\u2510','boxdL':'\\u2555','boxDl':'\\u2556','boxDL':'\\u2557','boxdr':'\\u250C','boxdR':'\\u2552','boxDr':'\\u2553','boxDR':'\\u2554','boxh':'\\u2500','boxH':'\\u2550','boxhd':'\\u252C','boxhD':'\\u2565','boxHd':'\\u2564','boxHD':'\\u2566','boxhu':'\\u2534','boxhU':'\\u2568','boxHu':'\\u2567','boxHU':'\\u2569','boxminus':'\\u229F','boxplus':'\\u229E','boxtimes':'\\u22A0','boxul':'\\u2518','boxuL':'\\u255B','boxUl':'\\u255C','boxUL':'\\u255D','boxur':'\\u2514','boxuR':'\\u2558','boxUr':'\\u2559','boxUR':'\\u255A','boxv':'\\u2502','boxV':'\\u2551','boxvh':'\\u253C','boxvH':'\\u256A','boxVh':'\\u256B','boxVH':'\\u256C','boxvl':'\\u2524','boxvL':'\\u2561','boxVl':'\\u2562','boxVL':'\\u2563','boxvr':'\\u251C','boxvR':'\\u255E','boxVr':'\\u255F','boxVR':'\\u2560','bprime':'\\u2035','breve':'\\u02D8','Breve':'\\u02D8','brvbar':'\\xA6','bscr':'\\uD835\\uDCB7','Bscr':'\\u212C','bsemi':'\\u204F','bsim':'\\u223D','bsime':'\\u22CD','bsol':'\\\\','bsolb':'\\u29C5','bsolhsub':'\\u27C8','bull':'\\u2022','bullet':'\\u2022','bump':'\\u224E','bumpe':'\\u224F','bumpE':'\\u2AAE','bumpeq':'\\u224F','Bumpeq':'\\u224E','cacute':'\\u0107','Cacute':'\\u0106','cap':'\\u2229','Cap':'\\u22D2','capand':'\\u2A44','capbrcup':'\\u2A49','capcap':'\\u2A4B','capcup':'\\u2A47','capdot':'\\u2A40','CapitalDifferentialD':'\\u2145','caps':'\\u2229\\uFE00','caret':'\\u2041','caron':'\\u02C7','Cayleys':'\\u212D','ccaps':'\\u2A4D','ccaron':'\\u010D','Ccaron':'\\u010C','ccedil':'\\xE7','Ccedil':'\\xC7','ccirc':'\\u0109','Ccirc':'\\u0108','Cconint':'\\u2230','ccups':'\\u2A4C','ccupssm':'\\u2A50','cdot':'\\u010B','Cdot':'\\u010A','cedil':'\\xB8','Cedilla':'\\xB8','cemptyv':'\\u29B2','cent':'\\xA2','centerdot':'\\xB7','CenterDot':'\\xB7','cfr':'\\uD835\\uDD20','Cfr':'\\u212D','chcy':'\\u0447','CHcy':'\\u0427','check':'\\u2713','checkmark':'\\u2713','chi':'\\u03C7','Chi':'\\u03A7','cir':'\\u25CB','circ':'\\u02C6','circeq':'\\u2257','circlearrowleft':'\\u21BA','circlearrowright':'\\u21BB','circledast':'\\u229B','circledcirc':'\\u229A','circleddash':'\\u229D','CircleDot':'\\u2299','circledR':'\\xAE','circledS':'\\u24C8','CircleMinus':'\\u2296','CirclePlus':'\\u2295','CircleTimes':'\\u2297','cire':'\\u2257','cirE':'\\u29C3','cirfnint':'\\u2A10','cirmid':'\\u2AEF','cirscir':'\\u29C2','ClockwiseContourIntegral':'\\u2232','CloseCurlyDoubleQuote':'\\u201D','CloseCurlyQuote':'\\u2019','clubs':'\\u2663','clubsuit':'\\u2663','colon':':','Colon':'\\u2237','colone':'\\u2254','Colone':'\\u2A74','coloneq':'\\u2254','comma':',','commat':'@','comp':'\\u2201','compfn':'\\u2218','complement':'\\u2201','complexes':'\\u2102','cong':'\\u2245','congdot':'\\u2A6D','Congruent':'\\u2261','conint':'\\u222E','Conint':'\\u222F','ContourIntegral':'\\u222E','copf':'\\uD835\\uDD54','Copf':'\\u2102','coprod':'\\u2210','Coproduct':'\\u2210','copy':'\\xA9','COPY':'\\xA9','copysr':'\\u2117','CounterClockwiseContourIntegral':'\\u2233','crarr':'\\u21B5','cross':'\\u2717','Cross':'\\u2A2F','cscr':'\\uD835\\uDCB8','Cscr':'\\uD835\\uDC9E','csub':'\\u2ACF','csube':'\\u2AD1','csup':'\\u2AD0','csupe':'\\u2AD2','ctdot':'\\u22EF','cudarrl':'\\u2938','cudarrr':'\\u2935','cuepr':'\\u22DE','cuesc':'\\u22DF','cularr':'\\u21B6','cularrp':'\\u293D','cup':'\\u222A','Cup':'\\u22D3','cupbrcap':'\\u2A48','cupcap':'\\u2A46','CupCap':'\\u224D','cupcup':'\\u2A4A','cupdot':'\\u228D','cupor':'\\u2A45','cups':'\\u222A\\uFE00','curarr':'\\u21B7','curarrm':'\\u293C','curlyeqprec':'\\u22DE','curlyeqsucc':'\\u22DF','curlyvee':'\\u22CE','curlywedge':'\\u22CF','curren':'\\xA4','curvearrowleft':'\\u21B6','curvearrowright':'\\u21B7','cuvee':'\\u22CE','cuwed':'\\u22CF','cwconint':'\\u2232','cwint':'\\u2231','cylcty':'\\u232D','dagger':'\\u2020','Dagger':'\\u2021','daleth':'\\u2138','darr':'\\u2193','dArr':'\\u21D3','Darr':'\\u21A1','dash':'\\u2010','dashv':'\\u22A3','Dashv':'\\u2AE4','dbkarow':'\\u290F','dblac':'\\u02DD','dcaron':'\\u010F','Dcaron':'\\u010E','dcy':'\\u0434','Dcy':'\\u0414','dd':'\\u2146','DD':'\\u2145','ddagger':'\\u2021','ddarr':'\\u21CA','DDotrahd':'\\u2911','ddotseq':'\\u2A77','deg':'\\xB0','Del':'\\u2207','delta':'\\u03B4','Delta':'\\u0394','demptyv':'\\u29B1','dfisht':'\\u297F','dfr':'\\uD835\\uDD21','Dfr':'\\uD835\\uDD07','dHar':'\\u2965','dharl':'\\u21C3','dharr':'\\u21C2','DiacriticalAcute':'\\xB4','DiacriticalDot':'\\u02D9','DiacriticalDoubleAcute':'\\u02DD','DiacriticalGrave':'`','DiacriticalTilde':'\\u02DC','diam':'\\u22C4','diamond':'\\u22C4','Diamond':'\\u22C4','diamondsuit':'\\u2666','diams':'\\u2666','die':'\\xA8','DifferentialD':'\\u2146','digamma':'\\u03DD','disin':'\\u22F2','div':'\\xF7','divide':'\\xF7','divideontimes':'\\u22C7','divonx':'\\u22C7','djcy':'\\u0452','DJcy':'\\u0402','dlcorn':'\\u231E','dlcrop':'\\u230D','dollar':'$','dopf':'\\uD835\\uDD55','Dopf':'\\uD835\\uDD3B','dot':'\\u02D9','Dot':'\\xA8','DotDot':'\\u20DC','doteq':'\\u2250','doteqdot':'\\u2251','DotEqual':'\\u2250','dotminus':'\\u2238','dotplus':'\\u2214','dotsquare':'\\u22A1','doublebarwedge':'\\u2306','DoubleContourIntegral':'\\u222F','DoubleDot':'\\xA8','DoubleDownArrow':'\\u21D3','DoubleLeftArrow':'\\u21D0','DoubleLeftRightArrow':'\\u21D4','DoubleLeftTee':'\\u2AE4','DoubleLongLeftArrow':'\\u27F8','DoubleLongLeftRightArrow':'\\u27FA','DoubleLongRightArrow':'\\u27F9','DoubleRightArrow':'\\u21D2','DoubleRightTee':'\\u22A8','DoubleUpArrow':'\\u21D1','DoubleUpDownArrow':'\\u21D5','DoubleVerticalBar':'\\u2225','downarrow':'\\u2193','Downarrow':'\\u21D3','DownArrow':'\\u2193','DownArrowBar':'\\u2913','DownArrowUpArrow':'\\u21F5','DownBreve':'\\u0311','downdownarrows':'\\u21CA','downharpoonleft':'\\u21C3','downharpoonright':'\\u21C2','DownLeftRightVector':'\\u2950','DownLeftTeeVector':'\\u295E','DownLeftVector':'\\u21BD','DownLeftVectorBar':'\\u2956','DownRightTeeVector':'\\u295F','DownRightVector':'\\u21C1','DownRightVectorBar':'\\u2957','DownTee':'\\u22A4','DownTeeArrow':'\\u21A7','drbkarow':'\\u2910','drcorn':'\\u231F','drcrop':'\\u230C','dscr':'\\uD835\\uDCB9','Dscr':'\\uD835\\uDC9F','dscy':'\\u0455','DScy':'\\u0405','dsol':'\\u29F6','dstrok':'\\u0111','Dstrok':'\\u0110','dtdot':'\\u22F1','dtri':'\\u25BF','dtrif':'\\u25BE','duarr':'\\u21F5','duhar':'\\u296F','dwangle':'\\u29A6','dzcy':'\\u045F','DZcy':'\\u040F','dzigrarr':'\\u27FF','eacute':'\\xE9','Eacute':'\\xC9','easter':'\\u2A6E','ecaron':'\\u011B','Ecaron':'\\u011A','ecir':'\\u2256','ecirc':'\\xEA','Ecirc':'\\xCA','ecolon':'\\u2255','ecy':'\\u044D','Ecy':'\\u042D','eDDot':'\\u2A77','edot':'\\u0117','eDot':'\\u2251','Edot':'\\u0116','ee':'\\u2147','efDot':'\\u2252','efr':'\\uD835\\uDD22','Efr':'\\uD835\\uDD08','eg':'\\u2A9A','egrave':'\\xE8','Egrave':'\\xC8','egs':'\\u2A96','egsdot':'\\u2A98','el':'\\u2A99','Element':'\\u2208','elinters':'\\u23E7','ell':'\\u2113','els':'\\u2A95','elsdot':'\\u2A97','emacr':'\\u0113','Emacr':'\\u0112','empty':'\\u2205','emptyset':'\\u2205','EmptySmallSquare':'\\u25FB','emptyv':'\\u2205','EmptyVerySmallSquare':'\\u25AB','emsp':'\\u2003','emsp13':'\\u2004','emsp14':'\\u2005','eng':'\\u014B','ENG':'\\u014A','ensp':'\\u2002','eogon':'\\u0119','Eogon':'\\u0118','eopf':'\\uD835\\uDD56','Eopf':'\\uD835\\uDD3C','epar':'\\u22D5','eparsl':'\\u29E3','eplus':'\\u2A71','epsi':'\\u03B5','epsilon':'\\u03B5','Epsilon':'\\u0395','epsiv':'\\u03F5','eqcirc':'\\u2256','eqcolon':'\\u2255','eqsim':'\\u2242','eqslantgtr':'\\u2A96','eqslantless':'\\u2A95','Equal':'\\u2A75','equals':'=','EqualTilde':'\\u2242','equest':'\\u225F','Equilibrium':'\\u21CC','equiv':'\\u2261','equivDD':'\\u2A78','eqvparsl':'\\u29E5','erarr':'\\u2971','erDot':'\\u2253','escr':'\\u212F','Escr':'\\u2130','esdot':'\\u2250','esim':'\\u2242','Esim':'\\u2A73','eta':'\\u03B7','Eta':'\\u0397','eth':'\\xF0','ETH':'\\xD0','euml':'\\xEB','Euml':'\\xCB','euro':'\\u20AC','excl':'!','exist':'\\u2203','Exists':'\\u2203','expectation':'\\u2130','exponentiale':'\\u2147','ExponentialE':'\\u2147','fallingdotseq':'\\u2252','fcy':'\\u0444','Fcy':'\\u0424','female':'\\u2640','ffilig':'\\uFB03','fflig':'\\uFB00','ffllig':'\\uFB04','ffr':'\\uD835\\uDD23','Ffr':'\\uD835\\uDD09','filig':'\\uFB01','FilledSmallSquare':'\\u25FC','FilledVerySmallSquare':'\\u25AA','fjlig':'fj','flat':'\\u266D','fllig':'\\uFB02','fltns':'\\u25B1','fnof':'\\u0192','fopf':'\\uD835\\uDD57','Fopf':'\\uD835\\uDD3D','forall':'\\u2200','ForAll':'\\u2200','fork':'\\u22D4','forkv':'\\u2AD9','Fouriertrf':'\\u2131','fpartint':'\\u2A0D','frac12':'\\xBD','frac13':'\\u2153','frac14':'\\xBC','frac15':'\\u2155','frac16':'\\u2159','frac18':'\\u215B','frac23':'\\u2154','frac25':'\\u2156','frac34':'\\xBE','frac35':'\\u2157','frac38':'\\u215C','frac45':'\\u2158','frac56':'\\u215A','frac58':'\\u215D','frac78':'\\u215E','frasl':'\\u2044','frown':'\\u2322','fscr':'\\uD835\\uDCBB','Fscr':'\\u2131','gacute':'\\u01F5','gamma':'\\u03B3','Gamma':'\\u0393','gammad':'\\u03DD','Gammad':'\\u03DC','gap':'\\u2A86','gbreve':'\\u011F','Gbreve':'\\u011E','Gcedil':'\\u0122','gcirc':'\\u011D','Gcirc':'\\u011C','gcy':'\\u0433','Gcy':'\\u0413','gdot':'\\u0121','Gdot':'\\u0120','ge':'\\u2265','gE':'\\u2267','gel':'\\u22DB','gEl':'\\u2A8C','geq':'\\u2265','geqq':'\\u2267','geqslant':'\\u2A7E','ges':'\\u2A7E','gescc':'\\u2AA9','gesdot':'\\u2A80','gesdoto':'\\u2A82','gesdotol':'\\u2A84','gesl':'\\u22DB\\uFE00','gesles':'\\u2A94','gfr':'\\uD835\\uDD24','Gfr':'\\uD835\\uDD0A','gg':'\\u226B','Gg':'\\u22D9','ggg':'\\u22D9','gimel':'\\u2137','gjcy':'\\u0453','GJcy':'\\u0403','gl':'\\u2277','gla':'\\u2AA5','glE':'\\u2A92','glj':'\\u2AA4','gnap':'\\u2A8A','gnapprox':'\\u2A8A','gne':'\\u2A88','gnE':'\\u2269','gneq':'\\u2A88','gneqq':'\\u2269','gnsim':'\\u22E7','gopf':'\\uD835\\uDD58','Gopf':'\\uD835\\uDD3E','grave':'`','GreaterEqual':'\\u2265','GreaterEqualLess':'\\u22DB','GreaterFullEqual':'\\u2267','GreaterGreater':'\\u2AA2','GreaterLess':'\\u2277','GreaterSlantEqual':'\\u2A7E','GreaterTilde':'\\u2273','gscr':'\\u210A','Gscr':'\\uD835\\uDCA2','gsim':'\\u2273','gsime':'\\u2A8E','gsiml':'\\u2A90','gt':'>','Gt':'\\u226B','GT':'>','gtcc':'\\u2AA7','gtcir':'\\u2A7A','gtdot':'\\u22D7','gtlPar':'\\u2995','gtquest':'\\u2A7C','gtrapprox':'\\u2A86','gtrarr':'\\u2978','gtrdot':'\\u22D7','gtreqless':'\\u22DB','gtreqqless':'\\u2A8C','gtrless':'\\u2277','gtrsim':'\\u2273','gvertneqq':'\\u2269\\uFE00','gvnE':'\\u2269\\uFE00','Hacek':'\\u02C7','hairsp':'\\u200A','half':'\\xBD','hamilt':'\\u210B','hardcy':'\\u044A','HARDcy':'\\u042A','harr':'\\u2194','hArr':'\\u21D4','harrcir':'\\u2948','harrw':'\\u21AD','Hat':'^','hbar':'\\u210F','hcirc':'\\u0125','Hcirc':'\\u0124','hearts':'\\u2665','heartsuit':'\\u2665','hellip':'\\u2026','hercon':'\\u22B9','hfr':'\\uD835\\uDD25','Hfr':'\\u210C','HilbertSpace':'\\u210B','hksearow':'\\u2925','hkswarow':'\\u2926','hoarr':'\\u21FF','homtht':'\\u223B','hookleftarrow':'\\u21A9','hookrightarrow':'\\u21AA','hopf':'\\uD835\\uDD59','Hopf':'\\u210D','horbar':'\\u2015','HorizontalLine':'\\u2500','hscr':'\\uD835\\uDCBD','Hscr':'\\u210B','hslash':'\\u210F','hstrok':'\\u0127','Hstrok':'\\u0126','HumpDownHump':'\\u224E','HumpEqual':'\\u224F','hybull':'\\u2043','hyphen':'\\u2010','iacute':'\\xED','Iacute':'\\xCD','ic':'\\u2063','icirc':'\\xEE','Icirc':'\\xCE','icy':'\\u0438','Icy':'\\u0418','Idot':'\\u0130','iecy':'\\u0435','IEcy':'\\u0415','iexcl':'\\xA1','iff':'\\u21D4','ifr':'\\uD835\\uDD26','Ifr':'\\u2111','igrave':'\\xEC','Igrave':'\\xCC','ii':'\\u2148','iiiint':'\\u2A0C','iiint':'\\u222D','iinfin':'\\u29DC','iiota':'\\u2129','ijlig':'\\u0133','IJlig':'\\u0132','Im':'\\u2111','imacr':'\\u012B','Imacr':'\\u012A','image':'\\u2111','ImaginaryI':'\\u2148','imagline':'\\u2110','imagpart':'\\u2111','imath':'\\u0131','imof':'\\u22B7','imped':'\\u01B5','Implies':'\\u21D2','in':'\\u2208','incare':'\\u2105','infin':'\\u221E','infintie':'\\u29DD','inodot':'\\u0131','int':'\\u222B','Int':'\\u222C','intcal':'\\u22BA','integers':'\\u2124','Integral':'\\u222B','intercal':'\\u22BA','Intersection':'\\u22C2','intlarhk':'\\u2A17','intprod':'\\u2A3C','InvisibleComma':'\\u2063','InvisibleTimes':'\\u2062','iocy':'\\u0451','IOcy':'\\u0401','iogon':'\\u012F','Iogon':'\\u012E','iopf':'\\uD835\\uDD5A','Iopf':'\\uD835\\uDD40','iota':'\\u03B9','Iota':'\\u0399','iprod':'\\u2A3C','iquest':'\\xBF','iscr':'\\uD835\\uDCBE','Iscr':'\\u2110','isin':'\\u2208','isindot':'\\u22F5','isinE':'\\u22F9','isins':'\\u22F4','isinsv':'\\u22F3','isinv':'\\u2208','it':'\\u2062','itilde':'\\u0129','Itilde':'\\u0128','iukcy':'\\u0456','Iukcy':'\\u0406','iuml':'\\xEF','Iuml':'\\xCF','jcirc':'\\u0135','Jcirc':'\\u0134','jcy':'\\u0439','Jcy':'\\u0419','jfr':'\\uD835\\uDD27','Jfr':'\\uD835\\uDD0D','jmath':'\\u0237','jopf':'\\uD835\\uDD5B','Jopf':'\\uD835\\uDD41','jscr':'\\uD835\\uDCBF','Jscr':'\\uD835\\uDCA5','jsercy':'\\u0458','Jsercy':'\\u0408','jukcy':'\\u0454','Jukcy':'\\u0404','kappa':'\\u03BA','Kappa':'\\u039A','kappav':'\\u03F0','kcedil':'\\u0137','Kcedil':'\\u0136','kcy':'\\u043A','Kcy':'\\u041A','kfr':'\\uD835\\uDD28','Kfr':'\\uD835\\uDD0E','kgreen':'\\u0138','khcy':'\\u0445','KHcy':'\\u0425','kjcy':'\\u045C','KJcy':'\\u040C','kopf':'\\uD835\\uDD5C','Kopf':'\\uD835\\uDD42','kscr':'\\uD835\\uDCC0','Kscr':'\\uD835\\uDCA6','lAarr':'\\u21DA','lacute':'\\u013A','Lacute':'\\u0139','laemptyv':'\\u29B4','lagran':'\\u2112','lambda':'\\u03BB','Lambda':'\\u039B','lang':'\\u27E8','Lang':'\\u27EA','langd':'\\u2991','langle':'\\u27E8','lap':'\\u2A85','Laplacetrf':'\\u2112','laquo':'\\xAB','larr':'\\u2190','lArr':'\\u21D0','Larr':'\\u219E','larrb':'\\u21E4','larrbfs':'\\u291F','larrfs':'\\u291D','larrhk':'\\u21A9','larrlp':'\\u21AB','larrpl':'\\u2939','larrsim':'\\u2973','larrtl':'\\u21A2','lat':'\\u2AAB','latail':'\\u2919','lAtail':'\\u291B','late':'\\u2AAD','lates':'\\u2AAD\\uFE00','lbarr':'\\u290C','lBarr':'\\u290E','lbbrk':'\\u2772','lbrace':'{','lbrack':'[','lbrke':'\\u298B','lbrksld':'\\u298F','lbrkslu':'\\u298D','lcaron':'\\u013E','Lcaron':'\\u013D','lcedil':'\\u013C','Lcedil':'\\u013B','lceil':'\\u2308','lcub':'{','lcy':'\\u043B','Lcy':'\\u041B','ldca':'\\u2936','ldquo':'\\u201C','ldquor':'\\u201E','ldrdhar':'\\u2967','ldrushar':'\\u294B','ldsh':'\\u21B2','le':'\\u2264','lE':'\\u2266','LeftAngleBracket':'\\u27E8','leftarrow':'\\u2190','Leftarrow':'\\u21D0','LeftArrow':'\\u2190','LeftArrowBar':'\\u21E4','LeftArrowRightArrow':'\\u21C6','leftarrowtail':'\\u21A2','LeftCeiling':'\\u2308','LeftDoubleBracket':'\\u27E6','LeftDownTeeVector':'\\u2961','LeftDownVector':'\\u21C3','LeftDownVectorBar':'\\u2959','LeftFloor':'\\u230A','leftharpoondown':'\\u21BD','leftharpoonup':'\\u21BC','leftleftarrows':'\\u21C7','leftrightarrow':'\\u2194','Leftrightarrow':'\\u21D4','LeftRightArrow':'\\u2194','leftrightarrows':'\\u21C6','leftrightharpoons':'\\u21CB','leftrightsquigarrow':'\\u21AD','LeftRightVector':'\\u294E','LeftTee':'\\u22A3','LeftTeeArrow':'\\u21A4','LeftTeeVector':'\\u295A','leftthreetimes':'\\u22CB','LeftTriangle':'\\u22B2','LeftTriangleBar':'\\u29CF','LeftTriangleEqual':'\\u22B4','LeftUpDownVector':'\\u2951','LeftUpTeeVector':'\\u2960','LeftUpVector':'\\u21BF','LeftUpVectorBar':'\\u2958','LeftVector':'\\u21BC','LeftVectorBar':'\\u2952','leg':'\\u22DA','lEg':'\\u2A8B','leq':'\\u2264','leqq':'\\u2266','leqslant':'\\u2A7D','les':'\\u2A7D','lescc':'\\u2AA8','lesdot':'\\u2A7F','lesdoto':'\\u2A81','lesdotor':'\\u2A83','lesg':'\\u22DA\\uFE00','lesges':'\\u2A93','lessapprox':'\\u2A85','lessdot':'\\u22D6','lesseqgtr':'\\u22DA','lesseqqgtr':'\\u2A8B','LessEqualGreater':'\\u22DA','LessFullEqual':'\\u2266','LessGreater':'\\u2276','lessgtr':'\\u2276','LessLess':'\\u2AA1','lesssim':'\\u2272','LessSlantEqual':'\\u2A7D','LessTilde':'\\u2272','lfisht':'\\u297C','lfloor':'\\u230A','lfr':'\\uD835\\uDD29','Lfr':'\\uD835\\uDD0F','lg':'\\u2276','lgE':'\\u2A91','lHar':'\\u2962','lhard':'\\u21BD','lharu':'\\u21BC','lharul':'\\u296A','lhblk':'\\u2584','ljcy':'\\u0459','LJcy':'\\u0409','ll':'\\u226A','Ll':'\\u22D8','llarr':'\\u21C7','llcorner':'\\u231E','Lleftarrow':'\\u21DA','llhard':'\\u296B','lltri':'\\u25FA','lmidot':'\\u0140','Lmidot':'\\u013F','lmoust':'\\u23B0','lmoustache':'\\u23B0','lnap':'\\u2A89','lnapprox':'\\u2A89','lne':'\\u2A87','lnE':'\\u2268','lneq':'\\u2A87','lneqq':'\\u2268','lnsim':'\\u22E6','loang':'\\u27EC','loarr':'\\u21FD','lobrk':'\\u27E6','longleftarrow':'\\u27F5','Longleftarrow':'\\u27F8','LongLeftArrow':'\\u27F5','longleftrightarrow':'\\u27F7','Longleftrightarrow':'\\u27FA','LongLeftRightArrow':'\\u27F7','longmapsto':'\\u27FC','longrightarrow':'\\u27F6','Longrightarrow':'\\u27F9','LongRightArrow':'\\u27F6','looparrowleft':'\\u21AB','looparrowright':'\\u21AC','lopar':'\\u2985','lopf':'\\uD835\\uDD5D','Lopf':'\\uD835\\uDD43','loplus':'\\u2A2D','lotimes':'\\u2A34','lowast':'\\u2217','lowbar':'_','LowerLeftArrow':'\\u2199','LowerRightArrow':'\\u2198','loz':'\\u25CA','lozenge':'\\u25CA','lozf':'\\u29EB','lpar':'(','lparlt':'\\u2993','lrarr':'\\u21C6','lrcorner':'\\u231F','lrhar':'\\u21CB','lrhard':'\\u296D','lrm':'\\u200E','lrtri':'\\u22BF','lsaquo':'\\u2039','lscr':'\\uD835\\uDCC1','Lscr':'\\u2112','lsh':'\\u21B0','Lsh':'\\u21B0','lsim':'\\u2272','lsime':'\\u2A8D','lsimg':'\\u2A8F','lsqb':'[','lsquo':'\\u2018','lsquor':'\\u201A','lstrok':'\\u0142','Lstrok':'\\u0141','lt':'<','Lt':'\\u226A','LT':'<','ltcc':'\\u2AA6','ltcir':'\\u2A79','ltdot':'\\u22D6','lthree':'\\u22CB','ltimes':'\\u22C9','ltlarr':'\\u2976','ltquest':'\\u2A7B','ltri':'\\u25C3','ltrie':'\\u22B4','ltrif':'\\u25C2','ltrPar':'\\u2996','lurdshar':'\\u294A','luruhar':'\\u2966','lvertneqq':'\\u2268\\uFE00','lvnE':'\\u2268\\uFE00','macr':'\\xAF','male':'\\u2642','malt':'\\u2720','maltese':'\\u2720','map':'\\u21A6','Map':'\\u2905','mapsto':'\\u21A6','mapstodown':'\\u21A7','mapstoleft':'\\u21A4','mapstoup':'\\u21A5','marker':'\\u25AE','mcomma':'\\u2A29','mcy':'\\u043C','Mcy':'\\u041C','mdash':'\\u2014','mDDot':'\\u223A','measuredangle':'\\u2221','MediumSpace':'\\u205F','Mellintrf':'\\u2133','mfr':'\\uD835\\uDD2A','Mfr':'\\uD835\\uDD10','mho':'\\u2127','micro':'\\xB5','mid':'\\u2223','midast':'*','midcir':'\\u2AF0','middot':'\\xB7','minus':'\\u2212','minusb':'\\u229F','minusd':'\\u2238','minusdu':'\\u2A2A','MinusPlus':'\\u2213','mlcp':'\\u2ADB','mldr':'\\u2026','mnplus':'\\u2213','models':'\\u22A7','mopf':'\\uD835\\uDD5E','Mopf':'\\uD835\\uDD44','mp':'\\u2213','mscr':'\\uD835\\uDCC2','Mscr':'\\u2133','mstpos':'\\u223E','mu':'\\u03BC','Mu':'\\u039C','multimap':'\\u22B8','mumap':'\\u22B8','nabla':'\\u2207','nacute':'\\u0144','Nacute':'\\u0143','nang':'\\u2220\\u20D2','nap':'\\u2249','napE':'\\u2A70\\u0338','napid':'\\u224B\\u0338','napos':'\\u0149','napprox':'\\u2249','natur':'\\u266E','natural':'\\u266E','naturals':'\\u2115','nbsp':'\\xA0','nbump':'\\u224E\\u0338','nbumpe':'\\u224F\\u0338','ncap':'\\u2A43','ncaron':'\\u0148','Ncaron':'\\u0147','ncedil':'\\u0146','Ncedil':'\\u0145','ncong':'\\u2247','ncongdot':'\\u2A6D\\u0338','ncup':'\\u2A42','ncy':'\\u043D','Ncy':'\\u041D','ndash':'\\u2013','ne':'\\u2260','nearhk':'\\u2924','nearr':'\\u2197','neArr':'\\u21D7','nearrow':'\\u2197','nedot':'\\u2250\\u0338','NegativeMediumSpace':'\\u200B','NegativeThickSpace':'\\u200B','NegativeThinSpace':'\\u200B','NegativeVeryThinSpace':'\\u200B','nequiv':'\\u2262','nesear':'\\u2928','nesim':'\\u2242\\u0338','NestedGreaterGreater':'\\u226B','NestedLessLess':'\\u226A','NewLine':'\\n','nexist':'\\u2204','nexists':'\\u2204','nfr':'\\uD835\\uDD2B','Nfr':'\\uD835\\uDD11','nge':'\\u2271','ngE':'\\u2267\\u0338','ngeq':'\\u2271','ngeqq':'\\u2267\\u0338','ngeqslant':'\\u2A7E\\u0338','nges':'\\u2A7E\\u0338','nGg':'\\u22D9\\u0338','ngsim':'\\u2275','ngt':'\\u226F','nGt':'\\u226B\\u20D2','ngtr':'\\u226F','nGtv':'\\u226B\\u0338','nharr':'\\u21AE','nhArr':'\\u21CE','nhpar':'\\u2AF2','ni':'\\u220B','nis':'\\u22FC','nisd':'\\u22FA','niv':'\\u220B','njcy':'\\u045A','NJcy':'\\u040A','nlarr':'\\u219A','nlArr':'\\u21CD','nldr':'\\u2025','nle':'\\u2270','nlE':'\\u2266\\u0338','nleftarrow':'\\u219A','nLeftarrow':'\\u21CD','nleftrightarrow':'\\u21AE','nLeftrightarrow':'\\u21CE','nleq':'\\u2270','nleqq':'\\u2266\\u0338','nleqslant':'\\u2A7D\\u0338','nles':'\\u2A7D\\u0338','nless':'\\u226E','nLl':'\\u22D8\\u0338','nlsim':'\\u2274','nlt':'\\u226E','nLt':'\\u226A\\u20D2','nltri':'\\u22EA','nltrie':'\\u22EC','nLtv':'\\u226A\\u0338','nmid':'\\u2224','NoBreak':'\\u2060','NonBreakingSpace':'\\xA0','nopf':'\\uD835\\uDD5F','Nopf':'\\u2115','not':'\\xAC','Not':'\\u2AEC','NotCongruent':'\\u2262','NotCupCap':'\\u226D','NotDoubleVerticalBar':'\\u2226','NotElement':'\\u2209','NotEqual':'\\u2260','NotEqualTilde':'\\u2242\\u0338','NotExists':'\\u2204','NotGreater':'\\u226F','NotGreaterEqual':'\\u2271','NotGreaterFullEqual':'\\u2267\\u0338','NotGreaterGreater':'\\u226B\\u0338','NotGreaterLess':'\\u2279','NotGreaterSlantEqual':'\\u2A7E\\u0338','NotGreaterTilde':'\\u2275','NotHumpDownHump':'\\u224E\\u0338','NotHumpEqual':'\\u224F\\u0338','notin':'\\u2209','notindot':'\\u22F5\\u0338','notinE':'\\u22F9\\u0338','notinva':'\\u2209','notinvb':'\\u22F7','notinvc':'\\u22F6','NotLeftTriangle':'\\u22EA','NotLeftTriangleBar':'\\u29CF\\u0338','NotLeftTriangleEqual':'\\u22EC','NotLess':'\\u226E','NotLessEqual':'\\u2270','NotLessGreater':'\\u2278','NotLessLess':'\\u226A\\u0338','NotLessSlantEqual':'\\u2A7D\\u0338','NotLessTilde':'\\u2274','NotNestedGreaterGreater':'\\u2AA2\\u0338','NotNestedLessLess':'\\u2AA1\\u0338','notni':'\\u220C','notniva':'\\u220C','notnivb':'\\u22FE','notnivc':'\\u22FD','NotPrecedes':'\\u2280','NotPrecedesEqual':'\\u2AAF\\u0338','NotPrecedesSlantEqual':'\\u22E0','NotReverseElement':'\\u220C','NotRightTriangle':'\\u22EB','NotRightTriangleBar':'\\u29D0\\u0338','NotRightTriangleEqual':'\\u22ED','NotSquareSubset':'\\u228F\\u0338','NotSquareSubsetEqual':'\\u22E2','NotSquareSuperset':'\\u2290\\u0338','NotSquareSupersetEqual':'\\u22E3','NotSubset':'\\u2282\\u20D2','NotSubsetEqual':'\\u2288','NotSucceeds':'\\u2281','NotSucceedsEqual':'\\u2AB0\\u0338','NotSucceedsSlantEqual':'\\u22E1','NotSucceedsTilde':'\\u227F\\u0338','NotSuperset':'\\u2283\\u20D2','NotSupersetEqual':'\\u2289','NotTilde':'\\u2241','NotTildeEqual':'\\u2244','NotTildeFullEqual':'\\u2247','NotTildeTilde':'\\u2249','NotVerticalBar':'\\u2224','npar':'\\u2226','nparallel':'\\u2226','nparsl':'\\u2AFD\\u20E5','npart':'\\u2202\\u0338','npolint':'\\u2A14','npr':'\\u2280','nprcue':'\\u22E0','npre':'\\u2AAF\\u0338','nprec':'\\u2280','npreceq':'\\u2AAF\\u0338','nrarr':'\\u219B','nrArr':'\\u21CF','nrarrc':'\\u2933\\u0338','nrarrw':'\\u219D\\u0338','nrightarrow':'\\u219B','nRightarrow':'\\u21CF','nrtri':'\\u22EB','nrtrie':'\\u22ED','nsc':'\\u2281','nsccue':'\\u22E1','nsce':'\\u2AB0\\u0338','nscr':'\\uD835\\uDCC3','Nscr':'\\uD835\\uDCA9','nshortmid':'\\u2224','nshortparallel':'\\u2226','nsim':'\\u2241','nsime':'\\u2244','nsimeq':'\\u2244','nsmid':'\\u2224','nspar':'\\u2226','nsqsube':'\\u22E2','nsqsupe':'\\u22E3','nsub':'\\u2284','nsube':'\\u2288','nsubE':'\\u2AC5\\u0338','nsubset':'\\u2282\\u20D2','nsubseteq':'\\u2288','nsubseteqq':'\\u2AC5\\u0338','nsucc':'\\u2281','nsucceq':'\\u2AB0\\u0338','nsup':'\\u2285','nsupe':'\\u2289','nsupE':'\\u2AC6\\u0338','nsupset':'\\u2283\\u20D2','nsupseteq':'\\u2289','nsupseteqq':'\\u2AC6\\u0338','ntgl':'\\u2279','ntilde':'\\xF1','Ntilde':'\\xD1','ntlg':'\\u2278','ntriangleleft':'\\u22EA','ntrianglelefteq':'\\u22EC','ntriangleright':'\\u22EB','ntrianglerighteq':'\\u22ED','nu':'\\u03BD','Nu':'\\u039D','num':'#','numero':'\\u2116','numsp':'\\u2007','nvap':'\\u224D\\u20D2','nvdash':'\\u22AC','nvDash':'\\u22AD','nVdash':'\\u22AE','nVDash':'\\u22AF','nvge':'\\u2265\\u20D2','nvgt':'>\\u20D2','nvHarr':'\\u2904','nvinfin':'\\u29DE','nvlArr':'\\u2902','nvle':'\\u2264\\u20D2','nvlt':'<\\u20D2','nvltrie':'\\u22B4\\u20D2','nvrArr':'\\u2903','nvrtrie':'\\u22B5\\u20D2','nvsim':'\\u223C\\u20D2','nwarhk':'\\u2923','nwarr':'\\u2196','nwArr':'\\u21D6','nwarrow':'\\u2196','nwnear':'\\u2927','oacute':'\\xF3','Oacute':'\\xD3','oast':'\\u229B','ocir':'\\u229A','ocirc':'\\xF4','Ocirc':'\\xD4','ocy':'\\u043E','Ocy':'\\u041E','odash':'\\u229D','odblac':'\\u0151','Odblac':'\\u0150','odiv':'\\u2A38','odot':'\\u2299','odsold':'\\u29BC','oelig':'\\u0153','OElig':'\\u0152','ofcir':'\\u29BF','ofr':'\\uD835\\uDD2C','Ofr':'\\uD835\\uDD12','ogon':'\\u02DB','ograve':'\\xF2','Ograve':'\\xD2','ogt':'\\u29C1','ohbar':'\\u29B5','ohm':'\\u03A9','oint':'\\u222E','olarr':'\\u21BA','olcir':'\\u29BE','olcross':'\\u29BB','oline':'\\u203E','olt':'\\u29C0','omacr':'\\u014D','Omacr':'\\u014C','omega':'\\u03C9','Omega':'\\u03A9','omicron':'\\u03BF','Omicron':'\\u039F','omid':'\\u29B6','ominus':'\\u2296','oopf':'\\uD835\\uDD60','Oopf':'\\uD835\\uDD46','opar':'\\u29B7','OpenCurlyDoubleQuote':'\\u201C','OpenCurlyQuote':'\\u2018','operp':'\\u29B9','oplus':'\\u2295','or':'\\u2228','Or':'\\u2A54','orarr':'\\u21BB','ord':'\\u2A5D','order':'\\u2134','orderof':'\\u2134','ordf':'\\xAA','ordm':'\\xBA','origof':'\\u22B6','oror':'\\u2A56','orslope':'\\u2A57','orv':'\\u2A5B','oS':'\\u24C8','oscr':'\\u2134','Oscr':'\\uD835\\uDCAA','oslash':'\\xF8','Oslash':'\\xD8','osol':'\\u2298','otilde':'\\xF5','Otilde':'\\xD5','otimes':'\\u2297','Otimes':'\\u2A37','otimesas':'\\u2A36','ouml':'\\xF6','Ouml':'\\xD6','ovbar':'\\u233D','OverBar':'\\u203E','OverBrace':'\\u23DE','OverBracket':'\\u23B4','OverParenthesis':'\\u23DC','par':'\\u2225','para':'\\xB6','parallel':'\\u2225','parsim':'\\u2AF3','parsl':'\\u2AFD','part':'\\u2202','PartialD':'\\u2202','pcy':'\\u043F','Pcy':'\\u041F','percnt':'%','period':'.','permil':'\\u2030','perp':'\\u22A5','pertenk':'\\u2031','pfr':'\\uD835\\uDD2D','Pfr':'\\uD835\\uDD13','phi':'\\u03C6','Phi':'\\u03A6','phiv':'\\u03D5','phmmat':'\\u2133','phone':'\\u260E','pi':'\\u03C0','Pi':'\\u03A0','pitchfork':'\\u22D4','piv':'\\u03D6','planck':'\\u210F','planckh':'\\u210E','plankv':'\\u210F','plus':'+','plusacir':'\\u2A23','plusb':'\\u229E','pluscir':'\\u2A22','plusdo':'\\u2214','plusdu':'\\u2A25','pluse':'\\u2A72','PlusMinus':'\\xB1','plusmn':'\\xB1','plussim':'\\u2A26','plustwo':'\\u2A27','pm':'\\xB1','Poincareplane':'\\u210C','pointint':'\\u2A15','popf':'\\uD835\\uDD61','Popf':'\\u2119','pound':'\\xA3','pr':'\\u227A','Pr':'\\u2ABB','prap':'\\u2AB7','prcue':'\\u227C','pre':'\\u2AAF','prE':'\\u2AB3','prec':'\\u227A','precapprox':'\\u2AB7','preccurlyeq':'\\u227C','Precedes':'\\u227A','PrecedesEqual':'\\u2AAF','PrecedesSlantEqual':'\\u227C','PrecedesTilde':'\\u227E','preceq':'\\u2AAF','precnapprox':'\\u2AB9','precneqq':'\\u2AB5','precnsim':'\\u22E8','precsim':'\\u227E','prime':'\\u2032','Prime':'\\u2033','primes':'\\u2119','prnap':'\\u2AB9','prnE':'\\u2AB5','prnsim':'\\u22E8','prod':'\\u220F','Product':'\\u220F','profalar':'\\u232E','profline':'\\u2312','profsurf':'\\u2313','prop':'\\u221D','Proportion':'\\u2237','Proportional':'\\u221D','propto':'\\u221D','prsim':'\\u227E','prurel':'\\u22B0','pscr':'\\uD835\\uDCC5','Pscr':'\\uD835\\uDCAB','psi':'\\u03C8','Psi':'\\u03A8','puncsp':'\\u2008','qfr':'\\uD835\\uDD2E','Qfr':'\\uD835\\uDD14','qint':'\\u2A0C','qopf':'\\uD835\\uDD62','Qopf':'\\u211A','qprime':'\\u2057','qscr':'\\uD835\\uDCC6','Qscr':'\\uD835\\uDCAC','quaternions':'\\u210D','quatint':'\\u2A16','quest':'?','questeq':'\\u225F','quot':'\"','QUOT':'\"','rAarr':'\\u21DB','race':'\\u223D\\u0331','racute':'\\u0155','Racute':'\\u0154','radic':'\\u221A','raemptyv':'\\u29B3','rang':'\\u27E9','Rang':'\\u27EB','rangd':'\\u2992','range':'\\u29A5','rangle':'\\u27E9','raquo':'\\xBB','rarr':'\\u2192','rArr':'\\u21D2','Rarr':'\\u21A0','rarrap':'\\u2975','rarrb':'\\u21E5','rarrbfs':'\\u2920','rarrc':'\\u2933','rarrfs':'\\u291E','rarrhk':'\\u21AA','rarrlp':'\\u21AC','rarrpl':'\\u2945','rarrsim':'\\u2974','rarrtl':'\\u21A3','Rarrtl':'\\u2916','rarrw':'\\u219D','ratail':'\\u291A','rAtail':'\\u291C','ratio':'\\u2236','rationals':'\\u211A','rbarr':'\\u290D','rBarr':'\\u290F','RBarr':'\\u2910','rbbrk':'\\u2773','rbrace':'}','rbrack':']','rbrke':'\\u298C','rbrksld':'\\u298E','rbrkslu':'\\u2990','rcaron':'\\u0159','Rcaron':'\\u0158','rcedil':'\\u0157','Rcedil':'\\u0156','rceil':'\\u2309','rcub':'}','rcy':'\\u0440','Rcy':'\\u0420','rdca':'\\u2937','rdldhar':'\\u2969','rdquo':'\\u201D','rdquor':'\\u201D','rdsh':'\\u21B3','Re':'\\u211C','real':'\\u211C','realine':'\\u211B','realpart':'\\u211C','reals':'\\u211D','rect':'\\u25AD','reg':'\\xAE','REG':'\\xAE','ReverseElement':'\\u220B','ReverseEquilibrium':'\\u21CB','ReverseUpEquilibrium':'\\u296F','rfisht':'\\u297D','rfloor':'\\u230B','rfr':'\\uD835\\uDD2F','Rfr':'\\u211C','rHar':'\\u2964','rhard':'\\u21C1','rharu':'\\u21C0','rharul':'\\u296C','rho':'\\u03C1','Rho':'\\u03A1','rhov':'\\u03F1','RightAngleBracket':'\\u27E9','rightarrow':'\\u2192','Rightarrow':'\\u21D2','RightArrow':'\\u2192','RightArrowBar':'\\u21E5','RightArrowLeftArrow':'\\u21C4','rightarrowtail':'\\u21A3','RightCeiling':'\\u2309','RightDoubleBracket':'\\u27E7','RightDownTeeVector':'\\u295D','RightDownVector':'\\u21C2','RightDownVectorBar':'\\u2955','RightFloor':'\\u230B','rightharpoondown':'\\u21C1','rightharpoonup':'\\u21C0','rightleftarrows':'\\u21C4','rightleftharpoons':'\\u21CC','rightrightarrows':'\\u21C9','rightsquigarrow':'\\u219D','RightTee':'\\u22A2','RightTeeArrow':'\\u21A6','RightTeeVector':'\\u295B','rightthreetimes':'\\u22CC','RightTriangle':'\\u22B3','RightTriangleBar':'\\u29D0','RightTriangleEqual':'\\u22B5','RightUpDownVector':'\\u294F','RightUpTeeVector':'\\u295C','RightUpVector':'\\u21BE','RightUpVectorBar':'\\u2954','RightVector':'\\u21C0','RightVectorBar':'\\u2953','ring':'\\u02DA','risingdotseq':'\\u2253','rlarr':'\\u21C4','rlhar':'\\u21CC','rlm':'\\u200F','rmoust':'\\u23B1','rmoustache':'\\u23B1','rnmid':'\\u2AEE','roang':'\\u27ED','roarr':'\\u21FE','robrk':'\\u27E7','ropar':'\\u2986','ropf':'\\uD835\\uDD63','Ropf':'\\u211D','roplus':'\\u2A2E','rotimes':'\\u2A35','RoundImplies':'\\u2970','rpar':')','rpargt':'\\u2994','rppolint':'\\u2A12','rrarr':'\\u21C9','Rrightarrow':'\\u21DB','rsaquo':'\\u203A','rscr':'\\uD835\\uDCC7','Rscr':'\\u211B','rsh':'\\u21B1','Rsh':'\\u21B1','rsqb':']','rsquo':'\\u2019','rsquor':'\\u2019','rthree':'\\u22CC','rtimes':'\\u22CA','rtri':'\\u25B9','rtrie':'\\u22B5','rtrif':'\\u25B8','rtriltri':'\\u29CE','RuleDelayed':'\\u29F4','ruluhar':'\\u2968','rx':'\\u211E','sacute':'\\u015B','Sacute':'\\u015A','sbquo':'\\u201A','sc':'\\u227B','Sc':'\\u2ABC','scap':'\\u2AB8','scaron':'\\u0161','Scaron':'\\u0160','sccue':'\\u227D','sce':'\\u2AB0','scE':'\\u2AB4','scedil':'\\u015F','Scedil':'\\u015E','scirc':'\\u015D','Scirc':'\\u015C','scnap':'\\u2ABA','scnE':'\\u2AB6','scnsim':'\\u22E9','scpolint':'\\u2A13','scsim':'\\u227F','scy':'\\u0441','Scy':'\\u0421','sdot':'\\u22C5','sdotb':'\\u22A1','sdote':'\\u2A66','searhk':'\\u2925','searr':'\\u2198','seArr':'\\u21D8','searrow':'\\u2198','sect':'\\xA7','semi':';','seswar':'\\u2929','setminus':'\\u2216','setmn':'\\u2216','sext':'\\u2736','sfr':'\\uD835\\uDD30','Sfr':'\\uD835\\uDD16','sfrown':'\\u2322','sharp':'\\u266F','shchcy':'\\u0449','SHCHcy':'\\u0429','shcy':'\\u0448','SHcy':'\\u0428','ShortDownArrow':'\\u2193','ShortLeftArrow':'\\u2190','shortmid':'\\u2223','shortparallel':'\\u2225','ShortRightArrow':'\\u2192','ShortUpArrow':'\\u2191','shy':'\\xAD','sigma':'\\u03C3','Sigma':'\\u03A3','sigmaf':'\\u03C2','sigmav':'\\u03C2','sim':'\\u223C','simdot':'\\u2A6A','sime':'\\u2243','simeq':'\\u2243','simg':'\\u2A9E','simgE':'\\u2AA0','siml':'\\u2A9D','simlE':'\\u2A9F','simne':'\\u2246','simplus':'\\u2A24','simrarr':'\\u2972','slarr':'\\u2190','SmallCircle':'\\u2218','smallsetminus':'\\u2216','smashp':'\\u2A33','smeparsl':'\\u29E4','smid':'\\u2223','smile':'\\u2323','smt':'\\u2AAA','smte':'\\u2AAC','smtes':'\\u2AAC\\uFE00','softcy':'\\u044C','SOFTcy':'\\u042C','sol':'/','solb':'\\u29C4','solbar':'\\u233F','sopf':'\\uD835\\uDD64','Sopf':'\\uD835\\uDD4A','spades':'\\u2660','spadesuit':'\\u2660','spar':'\\u2225','sqcap':'\\u2293','sqcaps':'\\u2293\\uFE00','sqcup':'\\u2294','sqcups':'\\u2294\\uFE00','Sqrt':'\\u221A','sqsub':'\\u228F','sqsube':'\\u2291','sqsubset':'\\u228F','sqsubseteq':'\\u2291','sqsup':'\\u2290','sqsupe':'\\u2292','sqsupset':'\\u2290','sqsupseteq':'\\u2292','squ':'\\u25A1','square':'\\u25A1','Square':'\\u25A1','SquareIntersection':'\\u2293','SquareSubset':'\\u228F','SquareSubsetEqual':'\\u2291','SquareSuperset':'\\u2290','SquareSupersetEqual':'\\u2292','SquareUnion':'\\u2294','squarf':'\\u25AA','squf':'\\u25AA','srarr':'\\u2192','sscr':'\\uD835\\uDCC8','Sscr':'\\uD835\\uDCAE','ssetmn':'\\u2216','ssmile':'\\u2323','sstarf':'\\u22C6','star':'\\u2606','Star':'\\u22C6','starf':'\\u2605','straightepsilon':'\\u03F5','straightphi':'\\u03D5','strns':'\\xAF','sub':'\\u2282','Sub':'\\u22D0','subdot':'\\u2ABD','sube':'\\u2286','subE':'\\u2AC5','subedot':'\\u2AC3','submult':'\\u2AC1','subne':'\\u228A','subnE':'\\u2ACB','subplus':'\\u2ABF','subrarr':'\\u2979','subset':'\\u2282','Subset':'\\u22D0','subseteq':'\\u2286','subseteqq':'\\u2AC5','SubsetEqual':'\\u2286','subsetneq':'\\u228A','subsetneqq':'\\u2ACB','subsim':'\\u2AC7','subsub':'\\u2AD5','subsup':'\\u2AD3','succ':'\\u227B','succapprox':'\\u2AB8','succcurlyeq':'\\u227D','Succeeds':'\\u227B','SucceedsEqual':'\\u2AB0','SucceedsSlantEqual':'\\u227D','SucceedsTilde':'\\u227F','succeq':'\\u2AB0','succnapprox':'\\u2ABA','succneqq':'\\u2AB6','succnsim':'\\u22E9','succsim':'\\u227F','SuchThat':'\\u220B','sum':'\\u2211','Sum':'\\u2211','sung':'\\u266A','sup':'\\u2283','Sup':'\\u22D1','sup1':'\\xB9','sup2':'\\xB2','sup3':'\\xB3','supdot':'\\u2ABE','supdsub':'\\u2AD8','supe':'\\u2287','supE':'\\u2AC6','supedot':'\\u2AC4','Superset':'\\u2283','SupersetEqual':'\\u2287','suphsol':'\\u27C9','suphsub':'\\u2AD7','suplarr':'\\u297B','supmult':'\\u2AC2','supne':'\\u228B','supnE':'\\u2ACC','supplus':'\\u2AC0','supset':'\\u2283','Supset':'\\u22D1','supseteq':'\\u2287','supseteqq':'\\u2AC6','supsetneq':'\\u228B','supsetneqq':'\\u2ACC','supsim':'\\u2AC8','supsub':'\\u2AD4','supsup':'\\u2AD6','swarhk':'\\u2926','swarr':'\\u2199','swArr':'\\u21D9','swarrow':'\\u2199','swnwar':'\\u292A','szlig':'\\xDF','Tab':'\\t','target':'\\u2316','tau':'\\u03C4','Tau':'\\u03A4','tbrk':'\\u23B4','tcaron':'\\u0165','Tcaron':'\\u0164','tcedil':'\\u0163','Tcedil':'\\u0162','tcy':'\\u0442','Tcy':'\\u0422','tdot':'\\u20DB','telrec':'\\u2315','tfr':'\\uD835\\uDD31','Tfr':'\\uD835\\uDD17','there4':'\\u2234','therefore':'\\u2234','Therefore':'\\u2234','theta':'\\u03B8','Theta':'\\u0398','thetasym':'\\u03D1','thetav':'\\u03D1','thickapprox':'\\u2248','thicksim':'\\u223C','ThickSpace':'\\u205F\\u200A','thinsp':'\\u2009','ThinSpace':'\\u2009','thkap':'\\u2248','thksim':'\\u223C','thorn':'\\xFE','THORN':'\\xDE','tilde':'\\u02DC','Tilde':'\\u223C','TildeEqual':'\\u2243','TildeFullEqual':'\\u2245','TildeTilde':'\\u2248','times':'\\xD7','timesb':'\\u22A0','timesbar':'\\u2A31','timesd':'\\u2A30','tint':'\\u222D','toea':'\\u2928','top':'\\u22A4','topbot':'\\u2336','topcir':'\\u2AF1','topf':'\\uD835\\uDD65','Topf':'\\uD835\\uDD4B','topfork':'\\u2ADA','tosa':'\\u2929','tprime':'\\u2034','trade':'\\u2122','TRADE':'\\u2122','triangle':'\\u25B5','triangledown':'\\u25BF','triangleleft':'\\u25C3','trianglelefteq':'\\u22B4','triangleq':'\\u225C','triangleright':'\\u25B9','trianglerighteq':'\\u22B5','tridot':'\\u25EC','trie':'\\u225C','triminus':'\\u2A3A','TripleDot':'\\u20DB','triplus':'\\u2A39','trisb':'\\u29CD','tritime':'\\u2A3B','trpezium':'\\u23E2','tscr':'\\uD835\\uDCC9','Tscr':'\\uD835\\uDCAF','tscy':'\\u0446','TScy':'\\u0426','tshcy':'\\u045B','TSHcy':'\\u040B','tstrok':'\\u0167','Tstrok':'\\u0166','twixt':'\\u226C','twoheadleftarrow':'\\u219E','twoheadrightarrow':'\\u21A0','uacute':'\\xFA','Uacute':'\\xDA','uarr':'\\u2191','uArr':'\\u21D1','Uarr':'\\u219F','Uarrocir':'\\u2949','ubrcy':'\\u045E','Ubrcy':'\\u040E','ubreve':'\\u016D','Ubreve':'\\u016C','ucirc':'\\xFB','Ucirc':'\\xDB','ucy':'\\u0443','Ucy':'\\u0423','udarr':'\\u21C5','udblac':'\\u0171','Udblac':'\\u0170','udhar':'\\u296E','ufisht':'\\u297E','ufr':'\\uD835\\uDD32','Ufr':'\\uD835\\uDD18','ugrave':'\\xF9','Ugrave':'\\xD9','uHar':'\\u2963','uharl':'\\u21BF','uharr':'\\u21BE','uhblk':'\\u2580','ulcorn':'\\u231C','ulcorner':'\\u231C','ulcrop':'\\u230F','ultri':'\\u25F8','umacr':'\\u016B','Umacr':'\\u016A','uml':'\\xA8','UnderBar':'_','UnderBrace':'\\u23DF','UnderBracket':'\\u23B5','UnderParenthesis':'\\u23DD','Union':'\\u22C3','UnionPlus':'\\u228E','uogon':'\\u0173','Uogon':'\\u0172','uopf':'\\uD835\\uDD66','Uopf':'\\uD835\\uDD4C','uparrow':'\\u2191','Uparrow':'\\u21D1','UpArrow':'\\u2191','UpArrowBar':'\\u2912','UpArrowDownArrow':'\\u21C5','updownarrow':'\\u2195','Updownarrow':'\\u21D5','UpDownArrow':'\\u2195','UpEquilibrium':'\\u296E','upharpoonleft':'\\u21BF','upharpoonright':'\\u21BE','uplus':'\\u228E','UpperLeftArrow':'\\u2196','UpperRightArrow':'\\u2197','upsi':'\\u03C5','Upsi':'\\u03D2','upsih':'\\u03D2','upsilon':'\\u03C5','Upsilon':'\\u03A5','UpTee':'\\u22A5','UpTeeArrow':'\\u21A5','upuparrows':'\\u21C8','urcorn':'\\u231D','urcorner':'\\u231D','urcrop':'\\u230E','uring':'\\u016F','Uring':'\\u016E','urtri':'\\u25F9','uscr':'\\uD835\\uDCCA','Uscr':'\\uD835\\uDCB0','utdot':'\\u22F0','utilde':'\\u0169','Utilde':'\\u0168','utri':'\\u25B5','utrif':'\\u25B4','uuarr':'\\u21C8','uuml':'\\xFC','Uuml':'\\xDC','uwangle':'\\u29A7','vangrt':'\\u299C','varepsilon':'\\u03F5','varkappa':'\\u03F0','varnothing':'\\u2205','varphi':'\\u03D5','varpi':'\\u03D6','varpropto':'\\u221D','varr':'\\u2195','vArr':'\\u21D5','varrho':'\\u03F1','varsigma':'\\u03C2','varsubsetneq':'\\u228A\\uFE00','varsubsetneqq':'\\u2ACB\\uFE00','varsupsetneq':'\\u228B\\uFE00','varsupsetneqq':'\\u2ACC\\uFE00','vartheta':'\\u03D1','vartriangleleft':'\\u22B2','vartriangleright':'\\u22B3','vBar':'\\u2AE8','Vbar':'\\u2AEB','vBarv':'\\u2AE9','vcy':'\\u0432','Vcy':'\\u0412','vdash':'\\u22A2','vDash':'\\u22A8','Vdash':'\\u22A9','VDash':'\\u22AB','Vdashl':'\\u2AE6','vee':'\\u2228','Vee':'\\u22C1','veebar':'\\u22BB','veeeq':'\\u225A','vellip':'\\u22EE','verbar':'|','Verbar':'\\u2016','vert':'|','Vert':'\\u2016','VerticalBar':'\\u2223','VerticalLine':'|','VerticalSeparator':'\\u2758','VerticalTilde':'\\u2240','VeryThinSpace':'\\u200A','vfr':'\\uD835\\uDD33','Vfr':'\\uD835\\uDD19','vltri':'\\u22B2','vnsub':'\\u2282\\u20D2','vnsup':'\\u2283\\u20D2','vopf':'\\uD835\\uDD67','Vopf':'\\uD835\\uDD4D','vprop':'\\u221D','vrtri':'\\u22B3','vscr':'\\uD835\\uDCCB','Vscr':'\\uD835\\uDCB1','vsubne':'\\u228A\\uFE00','vsubnE':'\\u2ACB\\uFE00','vsupne':'\\u228B\\uFE00','vsupnE':'\\u2ACC\\uFE00','Vvdash':'\\u22AA','vzigzag':'\\u299A','wcirc':'\\u0175','Wcirc':'\\u0174','wedbar':'\\u2A5F','wedge':'\\u2227','Wedge':'\\u22C0','wedgeq':'\\u2259','weierp':'\\u2118','wfr':'\\uD835\\uDD34','Wfr':'\\uD835\\uDD1A','wopf':'\\uD835\\uDD68','Wopf':'\\uD835\\uDD4E','wp':'\\u2118','wr':'\\u2240','wreath':'\\u2240','wscr':'\\uD835\\uDCCC','Wscr':'\\uD835\\uDCB2','xcap':'\\u22C2','xcirc':'\\u25EF','xcup':'\\u22C3','xdtri':'\\u25BD','xfr':'\\uD835\\uDD35','Xfr':'\\uD835\\uDD1B','xharr':'\\u27F7','xhArr':'\\u27FA','xi':'\\u03BE','Xi':'\\u039E','xlarr':'\\u27F5','xlArr':'\\u27F8','xmap':'\\u27FC','xnis':'\\u22FB','xodot':'\\u2A00','xopf':'\\uD835\\uDD69','Xopf':'\\uD835\\uDD4F','xoplus':'\\u2A01','xotime':'\\u2A02','xrarr':'\\u27F6','xrArr':'\\u27F9','xscr':'\\uD835\\uDCCD','Xscr':'\\uD835\\uDCB3','xsqcup':'\\u2A06','xuplus':'\\u2A04','xutri':'\\u25B3','xvee':'\\u22C1','xwedge':'\\u22C0','yacute':'\\xFD','Yacute':'\\xDD','yacy':'\\u044F','YAcy':'\\u042F','ycirc':'\\u0177','Ycirc':'\\u0176','ycy':'\\u044B','Ycy':'\\u042B','yen':'\\xA5','yfr':'\\uD835\\uDD36','Yfr':'\\uD835\\uDD1C','yicy':'\\u0457','YIcy':'\\u0407','yopf':'\\uD835\\uDD6A','Yopf':'\\uD835\\uDD50','yscr':'\\uD835\\uDCCE','Yscr':'\\uD835\\uDCB4','yucy':'\\u044E','YUcy':'\\u042E','yuml':'\\xFF','Yuml':'\\u0178','zacute':'\\u017A','Zacute':'\\u0179','zcaron':'\\u017E','Zcaron':'\\u017D','zcy':'\\u0437','Zcy':'\\u0417','zdot':'\\u017C','Zdot':'\\u017B','zeetrf':'\\u2128','ZeroWidthSpace':'\\u200B','zeta':'\\u03B6','Zeta':'\\u0396','zfr':'\\uD835\\uDD37','Zfr':'\\u2128','zhcy':'\\u0436','ZHcy':'\\u0416','zigrarr':'\\u21DD','zopf':'\\uD835\\uDD6B','Zopf':'\\u2124','zscr':'\\uD835\\uDCCF','Zscr':'\\uD835\\uDCB5','zwj':'\\u200D','zwnj':'\\u200C'};\n\tvar decodeMapLegacy = {'aacute':'\\xE1','Aacute':'\\xC1','acirc':'\\xE2','Acirc':'\\xC2','acute':'\\xB4','aelig':'\\xE6','AElig':'\\xC6','agrave':'\\xE0','Agrave':'\\xC0','amp':'&','AMP':'&','aring':'\\xE5','Aring':'\\xC5','atilde':'\\xE3','Atilde':'\\xC3','auml':'\\xE4','Auml':'\\xC4','brvbar':'\\xA6','ccedil':'\\xE7','Ccedil':'\\xC7','cedil':'\\xB8','cent':'\\xA2','copy':'\\xA9','COPY':'\\xA9','curren':'\\xA4','deg':'\\xB0','divide':'\\xF7','eacute':'\\xE9','Eacute':'\\xC9','ecirc':'\\xEA','Ecirc':'\\xCA','egrave':'\\xE8','Egrave':'\\xC8','eth':'\\xF0','ETH':'\\xD0','euml':'\\xEB','Euml':'\\xCB','frac12':'\\xBD','frac14':'\\xBC','frac34':'\\xBE','gt':'>','GT':'>','iacute':'\\xED','Iacute':'\\xCD','icirc':'\\xEE','Icirc':'\\xCE','iexcl':'\\xA1','igrave':'\\xEC','Igrave':'\\xCC','iquest':'\\xBF','iuml':'\\xEF','Iuml':'\\xCF','laquo':'\\xAB','lt':'<','LT':'<','macr':'\\xAF','micro':'\\xB5','middot':'\\xB7','nbsp':'\\xA0','not':'\\xAC','ntilde':'\\xF1','Ntilde':'\\xD1','oacute':'\\xF3','Oacute':'\\xD3','ocirc':'\\xF4','Ocirc':'\\xD4','ograve':'\\xF2','Ograve':'\\xD2','ordf':'\\xAA','ordm':'\\xBA','oslash':'\\xF8','Oslash':'\\xD8','otilde':'\\xF5','Otilde':'\\xD5','ouml':'\\xF6','Ouml':'\\xD6','para':'\\xB6','plusmn':'\\xB1','pound':'\\xA3','quot':'\"','QUOT':'\"','raquo':'\\xBB','reg':'\\xAE','REG':'\\xAE','sect':'\\xA7','shy':'\\xAD','sup1':'\\xB9','sup2':'\\xB2','sup3':'\\xB3','szlig':'\\xDF','thorn':'\\xFE','THORN':'\\xDE','times':'\\xD7','uacute':'\\xFA','Uacute':'\\xDA','ucirc':'\\xFB','Ucirc':'\\xDB','ugrave':'\\xF9','Ugrave':'\\xD9','uml':'\\xA8','uuml':'\\xFC','Uuml':'\\xDC','yacute':'\\xFD','Yacute':'\\xDD','yen':'\\xA5','yuml':'\\xFF'};\n\tvar decodeMapNumeric = {'0':'\\uFFFD','128':'\\u20AC','130':'\\u201A','131':'\\u0192','132':'\\u201E','133':'\\u2026','134':'\\u2020','135':'\\u2021','136':'\\u02C6','137':'\\u2030','138':'\\u0160','139':'\\u2039','140':'\\u0152','142':'\\u017D','145':'\\u2018','146':'\\u2019','147':'\\u201C','148':'\\u201D','149':'\\u2022','150':'\\u2013','151':'\\u2014','152':'\\u02DC','153':'\\u2122','154':'\\u0161','155':'\\u203A','156':'\\u0153','158':'\\u017E','159':'\\u0178'};\n\tvar invalidReferenceCodePoints = [1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65000,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111];\n\n\t/*--------------------------------------------------------------------------*/\n\n\tvar stringFromCharCode = String.fromCharCode;\n\n\tvar object = {};\n\tvar hasOwnProperty = object.hasOwnProperty;\n\tvar has = function(object, propertyName) {\n\t\treturn hasOwnProperty.call(object, propertyName);\n\t};\n\n\tvar contains = function(array, value) {\n\t\tvar index = -1;\n\t\tvar length = array.length;\n\t\twhile (++index < length) {\n\t\t\tif (array[index] == value) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\treturn false;\n\t};\n\n\tvar merge = function(options, defaults) {\n\t\tif (!options) {\n\t\t\treturn defaults;\n\t\t}\n\t\tvar result = {};\n\t\tvar key;\n\t\tfor (key in defaults) {\n\t\t\t// A `hasOwnProperty` check is not needed here, since only recognized\n\t\t\t// option names are used anyway. Any others are ignored.\n\t\t\tresult[key] = has(options, key) ? options[key] : defaults[key];\n\t\t}\n\t\treturn result;\n\t};\n\n\t// Modified version of `ucs2encode`; see https://mths.be/punycode.\n\tvar codePointToSymbol = function(codePoint, strict) {\n\t\tvar output = '';\n\t\tif ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {\n\t\t\t// See issue #4:\n\t\t\t// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is\n\t\t\t// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD\n\t\t\t// REPLACEMENT CHARACTER.”\n\t\t\tif (strict) {\n\t\t\t\tparseError('character reference outside the permissible Unicode range');\n\t\t\t}\n\t\t\treturn '\\uFFFD';\n\t\t}\n\t\tif (has(decodeMapNumeric, codePoint)) {\n\t\t\tif (strict) {\n\t\t\t\tparseError('disallowed character reference');\n\t\t\t}\n\t\t\treturn decodeMapNumeric[codePoint];\n\t\t}\n\t\tif (strict && contains(invalidReferenceCodePoints, codePoint)) {\n\t\t\tparseError('disallowed character reference');\n\t\t}\n\t\tif (codePoint > 0xFFFF) {\n\t\t\tcodePoint -= 0x10000;\n\t\t\toutput += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);\n\t\t\tcodePoint = 0xDC00 | codePoint & 0x3FF;\n\t\t}\n\t\toutput += stringFromCharCode(codePoint);\n\t\treturn output;\n\t};\n\n\tvar hexEscape = function(codePoint) {\n\t\treturn '&#x' + codePoint.toString(16).toUpperCase() + ';';\n\t};\n\n\tvar decEscape = function(codePoint) {\n\t\treturn '&#' + codePoint + ';';\n\t};\n\n\tvar parseError = function(message) {\n\t\tthrow Error('Parse error: ' + message);\n\t};\n\n\t/*--------------------------------------------------------------------------*/\n\n\tvar encode = function(string, options) {\n\t\toptions = merge(options, encode.options);\n\t\tvar strict = options.strict;\n\t\tif (strict && regexInvalidRawCodePoint.test(string)) {\n\t\t\tparseError('forbidden code point');\n\t\t}\n\t\tvar encodeEverything = options.encodeEverything;\n\t\tvar useNamedReferences = options.useNamedReferences;\n\t\tvar allowUnsafeSymbols = options.allowUnsafeSymbols;\n\t\tvar escapeCodePoint = options.decimal ? decEscape : hexEscape;\n\n\t\tvar escapeBmpSymbol = function(symbol) {\n\t\t\treturn escapeCodePoint(symbol.charCodeAt(0));\n\t\t};\n\n\t\tif (encodeEverything) {\n\t\t\t// Encode ASCII symbols.\n\t\t\tstring = string.replace(regexAsciiWhitelist, function(symbol) {\n\t\t\t\t// Use named references if requested & possible.\n\t\t\t\tif (useNamedReferences && has(encodeMap, symbol)) {\n\t\t\t\t\treturn '&' + encodeMap[symbol] + ';';\n\t\t\t\t}\n\t\t\t\treturn escapeBmpSymbol(symbol);\n\t\t\t});\n\t\t\t// Shorten a few escapes that represent two symbols, of which at least one\n\t\t\t// is within the ASCII range.\n\t\t\tif (useNamedReferences) {\n\t\t\t\tstring = string\n\t\t\t\t\t.replace(/&gt;\\u20D2/g, '&nvgt;')\n\t\t\t\t\t.replace(/&lt;\\u20D2/g, '&nvlt;')\n\t\t\t\t\t.replace(/&#x66;&#x6A;/g, '&fjlig;');\n\t\t\t}\n\t\t\t// Encode non-ASCII symbols.\n\t\t\tif (useNamedReferences) {\n\t\t\t\t// Encode non-ASCII symbols that can be replaced with a named reference.\n\t\t\t\tstring = string.replace(regexEncodeNonAscii, function(string) {\n\t\t\t\t\t// Note: there is no need to check `has(encodeMap, string)` here.\n\t\t\t\t\treturn '&' + encodeMap[string] + ';';\n\t\t\t\t});\n\t\t\t}\n\t\t\t// Note: any remaining non-ASCII symbols are handled outside of the `if`.\n\t\t} else if (useNamedReferences) {\n\t\t\t// Apply named character references.\n\t\t\t// Encode `<>\"'&` using named character references.\n\t\t\tif (!allowUnsafeSymbols) {\n\t\t\t\tstring = string.replace(regexEscape, function(string) {\n\t\t\t\t\treturn '&' + encodeMap[string] + ';'; // no need to check `has()` here\n\t\t\t\t});\n\t\t\t}\n\t\t\t// Shorten escapes that represent two symbols, of which at least one is\n\t\t\t// `<>\"'&`.\n\t\t\tstring = string\n\t\t\t\t.replace(/&gt;\\u20D2/g, '&nvgt;')\n\t\t\t\t.replace(/&lt;\\u20D2/g, '&nvlt;');\n\t\t\t// Encode non-ASCII symbols that can be replaced with a named reference.\n\t\t\tstring = string.replace(regexEncodeNonAscii, function(string) {\n\t\t\t\t// Note: there is no need to check `has(encodeMap, string)` here.\n\t\t\t\treturn '&' + encodeMap[string] + ';';\n\t\t\t});\n\t\t} else if (!allowUnsafeSymbols) {\n\t\t\t// Encode `<>\"'&` using hexadecimal escapes, now that they’re not handled\n\t\t\t// using named character references.\n\t\t\tstring = string.replace(regexEscape, escapeBmpSymbol);\n\t\t}\n\t\treturn string\n\t\t\t// Encode astral symbols.\n\t\t\t.replace(regexAstralSymbols, function($0) {\n\t\t\t\t// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae\n\t\t\t\tvar high = $0.charCodeAt(0);\n\t\t\t\tvar low = $0.charCodeAt(1);\n\t\t\t\tvar codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;\n\t\t\t\treturn escapeCodePoint(codePoint);\n\t\t\t})\n\t\t\t// Encode any remaining BMP symbols that are not printable ASCII symbols\n\t\t\t// using a hexadecimal escape.\n\t\t\t.replace(regexBmpWhitelist, escapeBmpSymbol);\n\t};\n\t// Expose default options (so they can be overridden globally).\n\tencode.options = {\n\t\t'allowUnsafeSymbols': false,\n\t\t'encodeEverything': false,\n\t\t'strict': false,\n\t\t'useNamedReferences': false,\n\t\t'decimal' : false\n\t};\n\n\tvar decode = function(html, options) {\n\t\toptions = merge(options, decode.options);\n\t\tvar strict = options.strict;\n\t\tif (strict && regexInvalidEntity.test(html)) {\n\t\t\tparseError('malformed character reference');\n\t\t}\n\t\treturn html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7) {\n\t\t\tvar codePoint;\n\t\t\tvar semicolon;\n\t\t\tvar decDigits;\n\t\t\tvar hexDigits;\n\t\t\tvar reference;\n\t\t\tvar next;\n\t\t\tif ($1) {\n\t\t\t\t// Decode decimal escapes, e.g. `&#119558;`.\n\t\t\t\tdecDigits = $1;\n\t\t\t\tsemicolon = $2;\n\t\t\t\tif (strict && !semicolon) {\n\t\t\t\t\tparseError('character reference was not terminated by a semicolon');\n\t\t\t\t}\n\t\t\t\tcodePoint = parseInt(decDigits, 10);\n\t\t\t\treturn codePointToSymbol(codePoint, strict);\n\t\t\t}\n\t\t\tif ($3) {\n\t\t\t\t// Decode hexadecimal escapes, e.g. `&#x1D306;`.\n\t\t\t\thexDigits = $3;\n\t\t\t\tsemicolon = $4;\n\t\t\t\tif (strict && !semicolon) {\n\t\t\t\t\tparseError('character reference was not terminated by a semicolon');\n\t\t\t\t}\n\t\t\t\tcodePoint = parseInt(hexDigits, 16);\n\t\t\t\treturn codePointToSymbol(codePoint, strict);\n\t\t\t}\n\t\t\tif ($5) {\n\t\t\t\t// Decode named character references with trailing `;`, e.g. `&copy;`.\n\t\t\t\treference = $5;\n\t\t\t\tif (has(decodeMap, reference)) {\n\t\t\t\t\treturn decodeMap[reference];\n\t\t\t\t} else {\n\t\t\t\t\t// Ambiguous ampersand. https://mths.be/notes/ambiguous-ampersands\n\t\t\t\t\tif (strict) {\n\t\t\t\t\t\tparseError(\n\t\t\t\t\t\t\t'named character reference was not terminated by a semicolon'\n\t\t\t\t\t\t);\n\t\t\t\t\t}\n\t\t\t\t\treturn $0;\n\t\t\t\t}\n\t\t\t}\n\t\t\t// If we’re still here, it’s a legacy reference for sure. No need for an\n\t\t\t// extra `if` check.\n\t\t\t// Decode named character references without trailing `;`, e.g. `&amp`\n\t\t\t// This is only a parse error if it gets converted to `&`, or if it is\n\t\t\t// followed by `=` in an attribute context.\n\t\t\treference = $6;\n\t\t\tnext = $7;\n\t\t\tif (next && options.isAttributeValue) {\n\t\t\t\tif (strict && next == '=') {\n\t\t\t\t\tparseError('`&` did not start a character reference');\n\t\t\t\t}\n\t\t\t\treturn $0;\n\t\t\t} else {\n\t\t\t\tif (strict) {\n\t\t\t\t\tparseError(\n\t\t\t\t\t\t'named character reference was not terminated by a semicolon'\n\t\t\t\t\t);\n\t\t\t\t}\n\t\t\t\t// Note: there is no need to check `has(decodeMapLegacy, reference)`.\n\t\t\t\treturn decodeMapLegacy[reference] + (next || '');\n\t\t\t}\n\t\t});\n\t};\n\t// Expose default options (so they can be overridden globally).\n\tdecode.options = {\n\t\t'isAttributeValue': false,\n\t\t'strict': false\n\t};\n\n\tvar escape = function(string) {\n\t\treturn string.replace(regexEscape, function($0) {\n\t\t\t// Note: there is no need to check `has(escapeMap, $0)` here.\n\t\t\treturn escapeMap[$0];\n\t\t});\n\t};\n\n\t/*--------------------------------------------------------------------------*/\n\n\tvar he = {\n\t\t'version': '1.1.1',\n\t\t'encode': encode,\n\t\t'decode': decode,\n\t\t'escape': escape,\n\t\t'unescape': decode\n\t};\n\n\t// Some AMD build optimizers, like r.js, check for specific condition patterns\n\t// like the following:\n\tif (\n\t\tfalse\n\t) {\n\t\tdefine(function() {\n\t\t\treturn he;\n\t\t});\n\t}\telse if (freeExports && !freeExports.nodeType) {\n\t\tif (freeModule) { // in Node.js, io.js, or RingoJS v0.8.0+\n\t\t\tfreeModule.exports = he;\n\t\t} else { // in Narwhal or RingoJS v0.7.0-\n\t\t\tfor (var key in he) {\n\t\t\t\thas(he, key) && (freeExports[key] = he[key]);\n\t\t\t}\n\t\t}\n\t} else { // in Rhino or a web browser\n\t\troot.he = he;\n\t}\n\n}(this));\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{}],49:[function(require,module,exports){\nexports.read = function (buffer, offset, isLE, mLen, nBytes) {\n  var e, m\n  var eLen = (nBytes * 8) - mLen - 1\n  var eMax = (1 << eLen) - 1\n  var eBias = eMax >> 1\n  var nBits = -7\n  var i = isLE ? (nBytes - 1) : 0\n  var d = isLE ? -1 : 1\n  var s = buffer[offset + i]\n\n  i += d\n\n  e = s & ((1 << (-nBits)) - 1)\n  s >>= (-nBits)\n  nBits += eLen\n  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}\n\n  m = e & ((1 << (-nBits)) - 1)\n  e >>= (-nBits)\n  nBits += mLen\n  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}\n\n  if (e === 0) {\n    e = 1 - eBias\n  } else if (e === eMax) {\n    return m ? NaN : ((s ? -1 : 1) * Infinity)\n  } else {\n    m = m + Math.pow(2, mLen)\n    e = e - eBias\n  }\n  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)\n}\n\nexports.write = function (buffer, value, offset, isLE, mLen, nBytes) {\n  var e, m, c\n  var eLen = (nBytes * 8) - mLen - 1\n  var eMax = (1 << eLen) - 1\n  var eBias = eMax >> 1\n  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)\n  var i = isLE ? 0 : (nBytes - 1)\n  var d = isLE ? 1 : -1\n  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0\n\n  value = Math.abs(value)\n\n  if (isNaN(value) || value === Infinity) {\n    m = isNaN(value) ? 1 : 0\n    e = eMax\n  } else {\n    e = Math.floor(Math.log(value) / Math.LN2)\n    if (value * (c = Math.pow(2, -e)) < 1) {\n      e--\n      c *= 2\n    }\n    if (e + eBias >= 1) {\n      value += rt / c\n    } else {\n      value += rt * Math.pow(2, 1 - eBias)\n    }\n    if (value * c >= 2) {\n      e++\n      c /= 2\n    }\n\n    if (e + eBias >= eMax) {\n      m = 0\n      e = eMax\n    } else if (e + eBias >= 1) {\n      m = ((value * c) - 1) * Math.pow(2, mLen)\n      e = e + eBias\n    } else {\n      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)\n      e = 0\n    }\n  }\n\n  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}\n\n  e = (e << mLen) | m\n  eLen += mLen\n  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}\n\n  buffer[offset + i - d] |= s * 128\n}\n\n},{}],50:[function(require,module,exports){\nif (typeof Object.create === 'function') {\n  // implementation from standard node.js 'util' module\n  module.exports = function inherits(ctor, superCtor) {\n    ctor.super_ = superCtor\n    ctor.prototype = Object.create(superCtor.prototype, {\n      constructor: {\n        value: ctor,\n        enumerable: false,\n        writable: true,\n        configurable: true\n      }\n    });\n  };\n} else {\n  // old school shim for old browsers\n  module.exports = function inherits(ctor, superCtor) {\n    ctor.super_ = superCtor\n    var TempCtor = function () {}\n    TempCtor.prototype = superCtor.prototype\n    ctor.prototype = new TempCtor()\n    ctor.prototype.constructor = ctor\n  }\n}\n\n},{}],51:[function(require,module,exports){\n/*!\n * Determine if an object is a Buffer\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n\n// The _isBuffer check is for Safari 5-7 support, because it's missing\n// Object.prototype.constructor. Remove this eventually\nmodule.exports = function (obj) {\n  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)\n}\n\nfunction isBuffer (obj) {\n  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)\n}\n\n// For Node v0.10 support. Remove this eventually.\nfunction isSlowBuffer (obj) {\n  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))\n}\n\n},{}],52:[function(require,module,exports){\nvar toString = {}.toString;\n\nmodule.exports = Array.isArray || function (arr) {\n  return toString.call(arr) == '[object Array]';\n};\n\n},{}],53:[function(require,module,exports){\n(function (process){\nvar path = require('path');\nvar fs = require('fs');\nvar _0777 = parseInt('0777', 8);\n\nmodule.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;\n\nfunction mkdirP (p, opts, f, made) {\n    if (typeof opts === 'function') {\n        f = opts;\n        opts = {};\n    }\n    else if (!opts || typeof opts !== 'object') {\n        opts = { mode: opts };\n    }\n    \n    var mode = opts.mode;\n    var xfs = opts.fs || fs;\n    \n    if (mode === undefined) {\n        mode = _0777 & (~process.umask());\n    }\n    if (!made) made = null;\n    \n    var cb = f || function () {};\n    p = path.resolve(p);\n    \n    xfs.mkdir(p, mode, function (er) {\n        if (!er) {\n            made = made || p;\n            return cb(null, made);\n        }\n        switch (er.code) {\n            case 'ENOENT':\n                mkdirP(path.dirname(p), opts, function (er, made) {\n                    if (er) cb(er, made);\n                    else mkdirP(p, opts, cb, made);\n                });\n                break;\n\n            // In the case of any other error, just see if there's a dir\n            // there already.  If so, then hooray!  If not, then something\n            // is borked.\n            default:\n                xfs.stat(p, function (er2, stat) {\n                    // if the stat fails, then that's super weird.\n                    // let the original error be the failure reason.\n                    if (er2 || !stat.isDirectory()) cb(er, made)\n                    else cb(null, made);\n                });\n                break;\n        }\n    });\n}\n\nmkdirP.sync = function sync (p, opts, made) {\n    if (!opts || typeof opts !== 'object') {\n        opts = { mode: opts };\n    }\n    \n    var mode = opts.mode;\n    var xfs = opts.fs || fs;\n    \n    if (mode === undefined) {\n        mode = _0777 & (~process.umask());\n    }\n    if (!made) made = null;\n\n    p = path.resolve(p);\n\n    try {\n        xfs.mkdirSync(p, mode);\n        made = made || p;\n    }\n    catch (err0) {\n        switch (err0.code) {\n            case 'ENOENT' :\n                made = sync(path.dirname(p), opts, made);\n                sync(p, opts, made);\n                break;\n\n            // In the case of any other error, just see if there's a dir\n            // there already.  If so, then hooray!  If not, then something\n            // is borked.\n            default:\n                var stat;\n                try {\n                    stat = xfs.statSync(p);\n                }\n                catch (err1) {\n                    throw err0;\n                }\n                if (!stat.isDirectory()) throw err0;\n                break;\n        }\n    }\n\n    return made;\n};\n\n}).call(this,require('_process'))\n},{\"_process\":56,\"fs\":40,\"path\":40}],54:[function(require,module,exports){\n/**\n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar y = d * 365.25;\n\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @param {String|Number} val\n * @param {Object} [options]\n * @throws {Error} throw an error if val is not a non-empty string or a number\n * @return {String|Number}\n * @api public\n */\n\nmodule.exports = function(val, options) {\n  options = options || {};\n  var type = typeof val;\n  if (type === 'string' && val.length > 0) {\n    return parse(val);\n  } else if (type === 'number' && isNaN(val) === false) {\n    return options.long ? fmtLong(val) : fmtShort(val);\n  }\n  throw new Error(\n    'val is not a non-empty string or a valid number. val=' +\n      JSON.stringify(val)\n  );\n};\n\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @param {String} str\n * @return {Number}\n * @api private\n */\n\nfunction parse(str) {\n  str = String(str);\n  if (str.length > 100) {\n    return;\n  }\n  var match = /^((?:\\d+)?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(\n    str\n  );\n  if (!match) {\n    return;\n  }\n  var n = parseFloat(match[1]);\n  var type = (match[2] || 'ms').toLowerCase();\n  switch (type) {\n    case 'years':\n    case 'year':\n    case 'yrs':\n    case 'yr':\n    case 'y':\n      return n * y;\n    case 'days':\n    case 'day':\n    case 'd':\n      return n * d;\n    case 'hours':\n    case 'hour':\n    case 'hrs':\n    case 'hr':\n    case 'h':\n      return n * h;\n    case 'minutes':\n    case 'minute':\n    case 'mins':\n    case 'min':\n    case 'm':\n      return n * m;\n    case 'seconds':\n    case 'second':\n    case 'secs':\n    case 'sec':\n    case 's':\n      return n * s;\n    case 'milliseconds':\n    case 'millisecond':\n    case 'msecs':\n    case 'msec':\n    case 'ms':\n      return n;\n    default:\n      return undefined;\n  }\n}\n\n/**\n * Short format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction fmtShort(ms) {\n  if (ms >= d) {\n    return Math.round(ms / d) + 'd';\n  }\n  if (ms >= h) {\n    return Math.round(ms / h) + 'h';\n  }\n  if (ms >= m) {\n    return Math.round(ms / m) + 'm';\n  }\n  if (ms >= s) {\n    return Math.round(ms / s) + 's';\n  }\n  return ms + 'ms';\n}\n\n/**\n * Long format for `ms`.\n *\n * @param {Number} ms\n * @return {String}\n * @api private\n */\n\nfunction fmtLong(ms) {\n  return plural(ms, d, 'day') ||\n    plural(ms, h, 'hour') ||\n    plural(ms, m, 'minute') ||\n    plural(ms, s, 'second') ||\n    ms + ' ms';\n}\n\n/**\n * Pluralization helper.\n */\n\nfunction plural(ms, n, name) {\n  if (ms < n) {\n    return;\n  }\n  if (ms < n * 1.5) {\n    return Math.floor(ms / n) + ' ' + name;\n  }\n  return Math.ceil(ms / n) + ' ' + name + 's';\n}\n\n},{}],55:[function(require,module,exports){\n(function (process){\n'use strict';\n\nif (!process.version ||\n    process.version.indexOf('v0.') === 0 ||\n    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {\n  module.exports = { nextTick: nextTick };\n} else {\n  module.exports = process\n}\n\nfunction nextTick(fn, arg1, arg2, arg3) {\n  if (typeof fn !== 'function') {\n    throw new TypeError('\"callback\" argument must be a function');\n  }\n  var len = arguments.length;\n  var args, i;\n  switch (len) {\n  case 0:\n  case 1:\n    return process.nextTick(fn);\n  case 2:\n    return process.nextTick(function afterTickOne() {\n      fn.call(null, arg1);\n    });\n  case 3:\n    return process.nextTick(function afterTickTwo() {\n      fn.call(null, arg1, arg2);\n    });\n  case 4:\n    return process.nextTick(function afterTickThree() {\n      fn.call(null, arg1, arg2, arg3);\n    });\n  default:\n    args = new Array(len - 1);\n    i = 0;\n    while (i < args.length) {\n      args[i++] = arguments[i];\n    }\n    return process.nextTick(function afterTick() {\n      fn.apply(null, args);\n    });\n  }\n}\n\n\n}).call(this,require('_process'))\n},{\"_process\":56}],56:[function(require,module,exports){\n// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n},{}],57:[function(require,module,exports){\nmodule.exports = require('./lib/_stream_duplex.js');\n\n},{\"./lib/_stream_duplex.js\":58}],58:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// a duplex stream is just a stream that is both readable and writable.\n// Since JS doesn't have multiple prototypal inheritance, this class\n// prototypally inherits from Readable, and then parasitically from\n// Writable.\n\n'use strict';\n\n/*<replacement>*/\n\nvar pna = require('process-nextick-args');\n/*</replacement>*/\n\n/*<replacement>*/\nvar objectKeys = Object.keys || function (obj) {\n  var keys = [];\n  for (var key in obj) {\n    keys.push(key);\n  }return keys;\n};\n/*</replacement>*/\n\nmodule.exports = Duplex;\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nvar Readable = require('./_stream_readable');\nvar Writable = require('./_stream_writable');\n\nutil.inherits(Duplex, Readable);\n\n{\n  // avoid scope creep, the keys array can then be collected\n  var keys = objectKeys(Writable.prototype);\n  for (var v = 0; v < keys.length; v++) {\n    var method = keys[v];\n    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];\n  }\n}\n\nfunction Duplex(options) {\n  if (!(this instanceof Duplex)) return new Duplex(options);\n\n  Readable.call(this, options);\n  Writable.call(this, options);\n\n  if (options && options.readable === false) this.readable = false;\n\n  if (options && options.writable === false) this.writable = false;\n\n  this.allowHalfOpen = true;\n  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;\n\n  this.once('end', onend);\n}\n\nObject.defineProperty(Duplex.prototype, 'writableHighWaterMark', {\n  // making it explicit this property is not enumerable\n  // because otherwise some prototype manipulation in\n  // userland will fail\n  enumerable: false,\n  get: function () {\n    return this._writableState.highWaterMark;\n  }\n});\n\n// the no-half-open enforcer\nfunction onend() {\n  // if we allow half-open state, or if the writable side ended,\n  // then we're ok.\n  if (this.allowHalfOpen || this._writableState.ended) return;\n\n  // no more data can be written.\n  // But allow more writes to happen in this tick.\n  pna.nextTick(onEndNT, this);\n}\n\nfunction onEndNT(self) {\n  self.end();\n}\n\nObject.defineProperty(Duplex.prototype, 'destroyed', {\n  get: function () {\n    if (this._readableState === undefined || this._writableState === undefined) {\n      return false;\n    }\n    return this._readableState.destroyed && this._writableState.destroyed;\n  },\n  set: function (value) {\n    // we ignore the value if the stream\n    // has not been initialized yet\n    if (this._readableState === undefined || this._writableState === undefined) {\n      return;\n    }\n\n    // backward compatibility, the user is explicitly\n    // managing destroyed\n    this._readableState.destroyed = value;\n    this._writableState.destroyed = value;\n  }\n});\n\nDuplex.prototype._destroy = function (err, cb) {\n  this.push(null);\n  this.end();\n\n  pna.nextTick(cb, err);\n};\n},{\"./_stream_readable\":60,\"./_stream_writable\":62,\"core-util-is\":42,\"inherits\":50,\"process-nextick-args\":55}],59:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// a passthrough stream.\n// basically just the most minimal sort of Transform stream.\n// Every written chunk gets output as-is.\n\n'use strict';\n\nmodule.exports = PassThrough;\n\nvar Transform = require('./_stream_transform');\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nutil.inherits(PassThrough, Transform);\n\nfunction PassThrough(options) {\n  if (!(this instanceof PassThrough)) return new PassThrough(options);\n\n  Transform.call(this, options);\n}\n\nPassThrough.prototype._transform = function (chunk, encoding, cb) {\n  cb(null, chunk);\n};\n},{\"./_stream_transform\":61,\"core-util-is\":42,\"inherits\":50}],60:[function(require,module,exports){\n(function (process,global){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n'use strict';\n\n/*<replacement>*/\n\nvar pna = require('process-nextick-args');\n/*</replacement>*/\n\nmodule.exports = Readable;\n\n/*<replacement>*/\nvar isArray = require('isarray');\n/*</replacement>*/\n\n/*<replacement>*/\nvar Duplex;\n/*</replacement>*/\n\nReadable.ReadableState = ReadableState;\n\n/*<replacement>*/\nvar EE = require('events').EventEmitter;\n\nvar EElistenerCount = function (emitter, type) {\n  return emitter.listeners(type).length;\n};\n/*</replacement>*/\n\n/*<replacement>*/\nvar Stream = require('./internal/streams/stream');\n/*</replacement>*/\n\n/*<replacement>*/\n\nvar Buffer = require('safe-buffer').Buffer;\nvar OurUint8Array = global.Uint8Array || function () {};\nfunction _uint8ArrayToBuffer(chunk) {\n  return Buffer.from(chunk);\n}\nfunction _isUint8Array(obj) {\n  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;\n}\n\n/*</replacement>*/\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\n/*<replacement>*/\nvar debugUtil = require('util');\nvar debug = void 0;\nif (debugUtil && debugUtil.debuglog) {\n  debug = debugUtil.debuglog('stream');\n} else {\n  debug = function () {};\n}\n/*</replacement>*/\n\nvar BufferList = require('./internal/streams/BufferList');\nvar destroyImpl = require('./internal/streams/destroy');\nvar StringDecoder;\n\nutil.inherits(Readable, Stream);\n\nvar kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];\n\nfunction prependListener(emitter, event, fn) {\n  // Sadly this is not cacheable as some libraries bundle their own\n  // event emitter implementation with them.\n  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);\n\n  // This is a hack to make sure that our error handler is attached before any\n  // userland ones.  NEVER DO THIS. This is here only because this code needs\n  // to continue to work with older versions of Node.js that do not include\n  // the prependListener() method. The goal is to eventually remove this hack.\n  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];\n}\n\nfunction ReadableState(options, stream) {\n  Duplex = Duplex || require('./_stream_duplex');\n\n  options = options || {};\n\n  // Duplex streams are both readable and writable, but share\n  // the same options object.\n  // However, some cases require setting options to different\n  // values for the readable and the writable sides of the duplex stream.\n  // These options can be provided separately as readableXXX and writableXXX.\n  var isDuplex = stream instanceof Duplex;\n\n  // object stream flag. Used to make read(n) ignore n and to\n  // make all the buffer merging and length checks go away\n  this.objectMode = !!options.objectMode;\n\n  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;\n\n  // the point at which it stops calling _read() to fill the buffer\n  // Note: 0 is a valid value, means \"don't call _read preemptively ever\"\n  var hwm = options.highWaterMark;\n  var readableHwm = options.readableHighWaterMark;\n  var defaultHwm = this.objectMode ? 16 : 16 * 1024;\n\n  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;\n\n  // cast to ints.\n  this.highWaterMark = Math.floor(this.highWaterMark);\n\n  // A linked list is used to store data chunks instead of an array because the\n  // linked list can remove elements from the beginning faster than\n  // array.shift()\n  this.buffer = new BufferList();\n  this.length = 0;\n  this.pipes = null;\n  this.pipesCount = 0;\n  this.flowing = null;\n  this.ended = false;\n  this.endEmitted = false;\n  this.reading = false;\n\n  // a flag to be able to tell if the event 'readable'/'data' is emitted\n  // immediately, or on a later tick.  We set this to true at first, because\n  // any actions that shouldn't happen until \"later\" should generally also\n  // not happen before the first read call.\n  this.sync = true;\n\n  // whenever we return null, then we set a flag to say\n  // that we're awaiting a 'readable' event emission.\n  this.needReadable = false;\n  this.emittedReadable = false;\n  this.readableListening = false;\n  this.resumeScheduled = false;\n\n  // has it been destroyed\n  this.destroyed = false;\n\n  // Crypto is kind of old and crusty.  Historically, its default string\n  // encoding is 'binary' so we have to make this configurable.\n  // Everything else in the universe uses 'utf8', though.\n  this.defaultEncoding = options.defaultEncoding || 'utf8';\n\n  // the number of writers that are awaiting a drain event in .pipe()s\n  this.awaitDrain = 0;\n\n  // if true, a maybeReadMore has been scheduled\n  this.readingMore = false;\n\n  this.decoder = null;\n  this.encoding = null;\n  if (options.encoding) {\n    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;\n    this.decoder = new StringDecoder(options.encoding);\n    this.encoding = options.encoding;\n  }\n}\n\nfunction Readable(options) {\n  Duplex = Duplex || require('./_stream_duplex');\n\n  if (!(this instanceof Readable)) return new Readable(options);\n\n  this._readableState = new ReadableState(options, this);\n\n  // legacy\n  this.readable = true;\n\n  if (options) {\n    if (typeof options.read === 'function') this._read = options.read;\n\n    if (typeof options.destroy === 'function') this._destroy = options.destroy;\n  }\n\n  Stream.call(this);\n}\n\nObject.defineProperty(Readable.prototype, 'destroyed', {\n  get: function () {\n    if (this._readableState === undefined) {\n      return false;\n    }\n    return this._readableState.destroyed;\n  },\n  set: function (value) {\n    // we ignore the value if the stream\n    // has not been initialized yet\n    if (!this._readableState) {\n      return;\n    }\n\n    // backward compatibility, the user is explicitly\n    // managing destroyed\n    this._readableState.destroyed = value;\n  }\n});\n\nReadable.prototype.destroy = destroyImpl.destroy;\nReadable.prototype._undestroy = destroyImpl.undestroy;\nReadable.prototype._destroy = function (err, cb) {\n  this.push(null);\n  cb(err);\n};\n\n// Manually shove something into the read() buffer.\n// This returns true if the highWaterMark has not been hit yet,\n// similar to how Writable.write() returns true if you should\n// write() some more.\nReadable.prototype.push = function (chunk, encoding) {\n  var state = this._readableState;\n  var skipChunkCheck;\n\n  if (!state.objectMode) {\n    if (typeof chunk === 'string') {\n      encoding = encoding || state.defaultEncoding;\n      if (encoding !== state.encoding) {\n        chunk = Buffer.from(chunk, encoding);\n        encoding = '';\n      }\n      skipChunkCheck = true;\n    }\n  } else {\n    skipChunkCheck = true;\n  }\n\n  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);\n};\n\n// Unshift should *always* be something directly out of read()\nReadable.prototype.unshift = function (chunk) {\n  return readableAddChunk(this, chunk, null, true, false);\n};\n\nfunction readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {\n  var state = stream._readableState;\n  if (chunk === null) {\n    state.reading = false;\n    onEofChunk(stream, state);\n  } else {\n    var er;\n    if (!skipChunkCheck) er = chunkInvalid(state, chunk);\n    if (er) {\n      stream.emit('error', er);\n    } else if (state.objectMode || chunk && chunk.length > 0) {\n      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {\n        chunk = _uint8ArrayToBuffer(chunk);\n      }\n\n      if (addToFront) {\n        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);\n      } else if (state.ended) {\n        stream.emit('error', new Error('stream.push() after EOF'));\n      } else {\n        state.reading = false;\n        if (state.decoder && !encoding) {\n          chunk = state.decoder.write(chunk);\n          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);\n        } else {\n          addChunk(stream, state, chunk, false);\n        }\n      }\n    } else if (!addToFront) {\n      state.reading = false;\n    }\n  }\n\n  return needMoreData(state);\n}\n\nfunction addChunk(stream, state, chunk, addToFront) {\n  if (state.flowing && state.length === 0 && !state.sync) {\n    stream.emit('data', chunk);\n    stream.read(0);\n  } else {\n    // update the buffer info.\n    state.length += state.objectMode ? 1 : chunk.length;\n    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);\n\n    if (state.needReadable) emitReadable(stream);\n  }\n  maybeReadMore(stream, state);\n}\n\nfunction chunkInvalid(state, chunk) {\n  var er;\n  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {\n    er = new TypeError('Invalid non-string/buffer chunk');\n  }\n  return er;\n}\n\n// if it's past the high water mark, we can push in some more.\n// Also, if we have no data yet, we can stand some\n// more bytes.  This is to work around cases where hwm=0,\n// such as the repl.  Also, if the push() triggered a\n// readable event, and the user called read(largeNumber) such that\n// needReadable was set, then we ought to push more, so that another\n// 'readable' event will be triggered.\nfunction needMoreData(state) {\n  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);\n}\n\nReadable.prototype.isPaused = function () {\n  return this._readableState.flowing === false;\n};\n\n// backwards compatibility.\nReadable.prototype.setEncoding = function (enc) {\n  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;\n  this._readableState.decoder = new StringDecoder(enc);\n  this._readableState.encoding = enc;\n  return this;\n};\n\n// Don't raise the hwm > 8MB\nvar MAX_HWM = 0x800000;\nfunction computeNewHighWaterMark(n) {\n  if (n >= MAX_HWM) {\n    n = MAX_HWM;\n  } else {\n    // Get the next highest power of 2 to prevent increasing hwm excessively in\n    // tiny amounts\n    n--;\n    n |= n >>> 1;\n    n |= n >>> 2;\n    n |= n >>> 4;\n    n |= n >>> 8;\n    n |= n >>> 16;\n    n++;\n  }\n  return n;\n}\n\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction howMuchToRead(n, state) {\n  if (n <= 0 || state.length === 0 && state.ended) return 0;\n  if (state.objectMode) return 1;\n  if (n !== n) {\n    // Only flow one buffer at a time\n    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;\n  }\n  // If we're asking for more than the current hwm, then raise the hwm.\n  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);\n  if (n <= state.length) return n;\n  // Don't have enough\n  if (!state.ended) {\n    state.needReadable = true;\n    return 0;\n  }\n  return state.length;\n}\n\n// you can override either this method, or the async _read(n) below.\nReadable.prototype.read = function (n) {\n  debug('read', n);\n  n = parseInt(n, 10);\n  var state = this._readableState;\n  var nOrig = n;\n\n  if (n !== 0) state.emittedReadable = false;\n\n  // if we're doing read(0) to trigger a readable event, but we\n  // already have a bunch of data in the buffer, then just trigger\n  // the 'readable' event and move on.\n  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {\n    debug('read: emitReadable', state.length, state.ended);\n    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);\n    return null;\n  }\n\n  n = howMuchToRead(n, state);\n\n  // if we've ended, and we're now clear, then finish it up.\n  if (n === 0 && state.ended) {\n    if (state.length === 0) endReadable(this);\n    return null;\n  }\n\n  // All the actual chunk generation logic needs to be\n  // *below* the call to _read.  The reason is that in certain\n  // synthetic stream cases, such as passthrough streams, _read\n  // may be a completely synchronous operation which may change\n  // the state of the read buffer, providing enough data when\n  // before there was *not* enough.\n  //\n  // So, the steps are:\n  // 1. Figure out what the state of things will be after we do\n  // a read from the buffer.\n  //\n  // 2. If that resulting state will trigger a _read, then call _read.\n  // Note that this may be asynchronous, or synchronous.  Yes, it is\n  // deeply ugly to write APIs this way, but that still doesn't mean\n  // that the Readable class should behave improperly, as streams are\n  // designed to be sync/async agnostic.\n  // Take note if the _read call is sync or async (ie, if the read call\n  // has returned yet), so that we know whether or not it's safe to emit\n  // 'readable' etc.\n  //\n  // 3. Actually pull the requested chunks out of the buffer and return.\n\n  // if we need a readable event, then we need to do some reading.\n  var doRead = state.needReadable;\n  debug('need readable', doRead);\n\n  // if we currently have less than the highWaterMark, then also read some\n  if (state.length === 0 || state.length - n < state.highWaterMark) {\n    doRead = true;\n    debug('length less than watermark', doRead);\n  }\n\n  // however, if we've ended, then there's no point, and if we're already\n  // reading, then it's unnecessary.\n  if (state.ended || state.reading) {\n    doRead = false;\n    debug('reading or ended', doRead);\n  } else if (doRead) {\n    debug('do read');\n    state.reading = true;\n    state.sync = true;\n    // if the length is currently zero, then we *need* a readable event.\n    if (state.length === 0) state.needReadable = true;\n    // call internal read method\n    this._read(state.highWaterMark);\n    state.sync = false;\n    // If _read pushed data synchronously, then `reading` will be false,\n    // and we need to re-evaluate how much data we can return to the user.\n    if (!state.reading) n = howMuchToRead(nOrig, state);\n  }\n\n  var ret;\n  if (n > 0) ret = fromList(n, state);else ret = null;\n\n  if (ret === null) {\n    state.needReadable = true;\n    n = 0;\n  } else {\n    state.length -= n;\n  }\n\n  if (state.length === 0) {\n    // If we have nothing in the buffer, then we want to know\n    // as soon as we *do* get something into the buffer.\n    if (!state.ended) state.needReadable = true;\n\n    // If we tried to read() past the EOF, then emit end on the next tick.\n    if (nOrig !== n && state.ended) endReadable(this);\n  }\n\n  if (ret !== null) this.emit('data', ret);\n\n  return ret;\n};\n\nfunction onEofChunk(stream, state) {\n  if (state.ended) return;\n  if (state.decoder) {\n    var chunk = state.decoder.end();\n    if (chunk && chunk.length) {\n      state.buffer.push(chunk);\n      state.length += state.objectMode ? 1 : chunk.length;\n    }\n  }\n  state.ended = true;\n\n  // emit 'readable' now to make sure it gets picked up.\n  emitReadable(stream);\n}\n\n// Don't emit readable right away in sync mode, because this can trigger\n// another read() call => stack overflow.  This way, it might trigger\n// a nextTick recursion warning, but that's not so bad.\nfunction emitReadable(stream) {\n  var state = stream._readableState;\n  state.needReadable = false;\n  if (!state.emittedReadable) {\n    debug('emitReadable', state.flowing);\n    state.emittedReadable = true;\n    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);\n  }\n}\n\nfunction emitReadable_(stream) {\n  debug('emit readable');\n  stream.emit('readable');\n  flow(stream);\n}\n\n// at this point, the user has presumably seen the 'readable' event,\n// and called read() to consume some data.  that may have triggered\n// in turn another _read(n) call, in which case reading = true if\n// it's in progress.\n// However, if we're not ended, or reading, and the length < hwm,\n// then go ahead and try to read some more preemptively.\nfunction maybeReadMore(stream, state) {\n  if (!state.readingMore) {\n    state.readingMore = true;\n    pna.nextTick(maybeReadMore_, stream, state);\n  }\n}\n\nfunction maybeReadMore_(stream, state) {\n  var len = state.length;\n  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {\n    debug('maybeReadMore read 0');\n    stream.read(0);\n    if (len === state.length)\n      // didn't get any data, stop spinning.\n      break;else len = state.length;\n  }\n  state.readingMore = false;\n}\n\n// abstract method.  to be overridden in specific implementation classes.\n// call cb(er, data) where data is <= n in length.\n// for virtual (non-string, non-buffer) streams, \"length\" is somewhat\n// arbitrary, and perhaps not very meaningful.\nReadable.prototype._read = function (n) {\n  this.emit('error', new Error('_read() is not implemented'));\n};\n\nReadable.prototype.pipe = function (dest, pipeOpts) {\n  var src = this;\n  var state = this._readableState;\n\n  switch (state.pipesCount) {\n    case 0:\n      state.pipes = dest;\n      break;\n    case 1:\n      state.pipes = [state.pipes, dest];\n      break;\n    default:\n      state.pipes.push(dest);\n      break;\n  }\n  state.pipesCount += 1;\n  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);\n\n  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;\n\n  var endFn = doEnd ? onend : unpipe;\n  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);\n\n  dest.on('unpipe', onunpipe);\n  function onunpipe(readable, unpipeInfo) {\n    debug('onunpipe');\n    if (readable === src) {\n      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {\n        unpipeInfo.hasUnpiped = true;\n        cleanup();\n      }\n    }\n  }\n\n  function onend() {\n    debug('onend');\n    dest.end();\n  }\n\n  // when the dest drains, it reduces the awaitDrain counter\n  // on the source.  This would be more elegant with a .once()\n  // handler in flow(), but adding and removing repeatedly is\n  // too slow.\n  var ondrain = pipeOnDrain(src);\n  dest.on('drain', ondrain);\n\n  var cleanedUp = false;\n  function cleanup() {\n    debug('cleanup');\n    // cleanup event handlers once the pipe is broken\n    dest.removeListener('close', onclose);\n    dest.removeListener('finish', onfinish);\n    dest.removeListener('drain', ondrain);\n    dest.removeListener('error', onerror);\n    dest.removeListener('unpipe', onunpipe);\n    src.removeListener('end', onend);\n    src.removeListener('end', unpipe);\n    src.removeListener('data', ondata);\n\n    cleanedUp = true;\n\n    // if the reader is waiting for a drain event from this\n    // specific writer, then it would cause it to never start\n    // flowing again.\n    // So, if this is awaiting a drain, then we just call it now.\n    // If we don't know, then assume that we are waiting for one.\n    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();\n  }\n\n  // If the user pushes more data while we're writing to dest then we'll end up\n  // in ondata again. However, we only want to increase awaitDrain once because\n  // dest will only emit one 'drain' event for the multiple writes.\n  // => Introduce a guard on increasing awaitDrain.\n  var increasedAwaitDrain = false;\n  src.on('data', ondata);\n  function ondata(chunk) {\n    debug('ondata');\n    increasedAwaitDrain = false;\n    var ret = dest.write(chunk);\n    if (false === ret && !increasedAwaitDrain) {\n      // If the user unpiped during `dest.write()`, it is possible\n      // to get stuck in a permanently paused state if that write\n      // also returned false.\n      // => Check whether `dest` is still a piping destination.\n      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {\n        debug('false write response, pause', src._readableState.awaitDrain);\n        src._readableState.awaitDrain++;\n        increasedAwaitDrain = true;\n      }\n      src.pause();\n    }\n  }\n\n  // if the dest has an error, then stop piping into it.\n  // however, don't suppress the throwing behavior for this.\n  function onerror(er) {\n    debug('onerror', er);\n    unpipe();\n    dest.removeListener('error', onerror);\n    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);\n  }\n\n  // Make sure our error handler is attached before userland ones.\n  prependListener(dest, 'error', onerror);\n\n  // Both close and finish should trigger unpipe, but only once.\n  function onclose() {\n    dest.removeListener('finish', onfinish);\n    unpipe();\n  }\n  dest.once('close', onclose);\n  function onfinish() {\n    debug('onfinish');\n    dest.removeListener('close', onclose);\n    unpipe();\n  }\n  dest.once('finish', onfinish);\n\n  function unpipe() {\n    debug('unpipe');\n    src.unpipe(dest);\n  }\n\n  // tell the dest that it's being piped to\n  dest.emit('pipe', src);\n\n  // start the flow if it hasn't been started already.\n  if (!state.flowing) {\n    debug('pipe resume');\n    src.resume();\n  }\n\n  return dest;\n};\n\nfunction pipeOnDrain(src) {\n  return function () {\n    var state = src._readableState;\n    debug('pipeOnDrain', state.awaitDrain);\n    if (state.awaitDrain) state.awaitDrain--;\n    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {\n      state.flowing = true;\n      flow(src);\n    }\n  };\n}\n\nReadable.prototype.unpipe = function (dest) {\n  var state = this._readableState;\n  var unpipeInfo = { hasUnpiped: false };\n\n  // if we're not piping anywhere, then do nothing.\n  if (state.pipesCount === 0) return this;\n\n  // just one destination.  most common case.\n  if (state.pipesCount === 1) {\n    // passed in one, but it's not the right one.\n    if (dest && dest !== state.pipes) return this;\n\n    if (!dest) dest = state.pipes;\n\n    // got a match.\n    state.pipes = null;\n    state.pipesCount = 0;\n    state.flowing = false;\n    if (dest) dest.emit('unpipe', this, unpipeInfo);\n    return this;\n  }\n\n  // slow case. multiple pipe destinations.\n\n  if (!dest) {\n    // remove all.\n    var dests = state.pipes;\n    var len = state.pipesCount;\n    state.pipes = null;\n    state.pipesCount = 0;\n    state.flowing = false;\n\n    for (var i = 0; i < len; i++) {\n      dests[i].emit('unpipe', this, unpipeInfo);\n    }return this;\n  }\n\n  // try to find the right one.\n  var index = indexOf(state.pipes, dest);\n  if (index === -1) return this;\n\n  state.pipes.splice(index, 1);\n  state.pipesCount -= 1;\n  if (state.pipesCount === 1) state.pipes = state.pipes[0];\n\n  dest.emit('unpipe', this, unpipeInfo);\n\n  return this;\n};\n\n// set up data events if they are asked for\n// Ensure readable listeners eventually get something\nReadable.prototype.on = function (ev, fn) {\n  var res = Stream.prototype.on.call(this, ev, fn);\n\n  if (ev === 'data') {\n    // Start flowing on next tick if stream isn't explicitly paused\n    if (this._readableState.flowing !== false) this.resume();\n  } else if (ev === 'readable') {\n    var state = this._readableState;\n    if (!state.endEmitted && !state.readableListening) {\n      state.readableListening = state.needReadable = true;\n      state.emittedReadable = false;\n      if (!state.reading) {\n        pna.nextTick(nReadingNextTick, this);\n      } else if (state.length) {\n        emitReadable(this);\n      }\n    }\n  }\n\n  return res;\n};\nReadable.prototype.addListener = Readable.prototype.on;\n\nfunction nReadingNextTick(self) {\n  debug('readable nexttick read 0');\n  self.read(0);\n}\n\n// pause() and resume() are remnants of the legacy readable stream API\n// If the user uses them, then switch into old mode.\nReadable.prototype.resume = function () {\n  var state = this._readableState;\n  if (!state.flowing) {\n    debug('resume');\n    state.flowing = true;\n    resume(this, state);\n  }\n  return this;\n};\n\nfunction resume(stream, state) {\n  if (!state.resumeScheduled) {\n    state.resumeScheduled = true;\n    pna.nextTick(resume_, stream, state);\n  }\n}\n\nfunction resume_(stream, state) {\n  if (!state.reading) {\n    debug('resume read 0');\n    stream.read(0);\n  }\n\n  state.resumeScheduled = false;\n  state.awaitDrain = 0;\n  stream.emit('resume');\n  flow(stream);\n  if (state.flowing && !state.reading) stream.read(0);\n}\n\nReadable.prototype.pause = function () {\n  debug('call pause flowing=%j', this._readableState.flowing);\n  if (false !== this._readableState.flowing) {\n    debug('pause');\n    this._readableState.flowing = false;\n    this.emit('pause');\n  }\n  return this;\n};\n\nfunction flow(stream) {\n  var state = stream._readableState;\n  debug('flow', state.flowing);\n  while (state.flowing && stream.read() !== null) {}\n}\n\n// wrap an old-style stream as the async data source.\n// This is *not* part of the readable stream interface.\n// It is an ugly unfortunate mess of history.\nReadable.prototype.wrap = function (stream) {\n  var _this = this;\n\n  var state = this._readableState;\n  var paused = false;\n\n  stream.on('end', function () {\n    debug('wrapped end');\n    if (state.decoder && !state.ended) {\n      var chunk = state.decoder.end();\n      if (chunk && chunk.length) _this.push(chunk);\n    }\n\n    _this.push(null);\n  });\n\n  stream.on('data', function (chunk) {\n    debug('wrapped data');\n    if (state.decoder) chunk = state.decoder.write(chunk);\n\n    // don't skip over falsy values in objectMode\n    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;\n\n    var ret = _this.push(chunk);\n    if (!ret) {\n      paused = true;\n      stream.pause();\n    }\n  });\n\n  // proxy all the other methods.\n  // important when wrapping filters and duplexes.\n  for (var i in stream) {\n    if (this[i] === undefined && typeof stream[i] === 'function') {\n      this[i] = function (method) {\n        return function () {\n          return stream[method].apply(stream, arguments);\n        };\n      }(i);\n    }\n  }\n\n  // proxy certain important events.\n  for (var n = 0; n < kProxyEvents.length; n++) {\n    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));\n  }\n\n  // when we try to consume some more bytes, simply unpause the\n  // underlying stream.\n  this._read = function (n) {\n    debug('wrapped _read', n);\n    if (paused) {\n      paused = false;\n      stream.resume();\n    }\n  };\n\n  return this;\n};\n\nObject.defineProperty(Readable.prototype, 'readableHighWaterMark', {\n  // making it explicit this property is not enumerable\n  // because otherwise some prototype manipulation in\n  // userland will fail\n  enumerable: false,\n  get: function () {\n    return this._readableState.highWaterMark;\n  }\n});\n\n// exposed for testing purposes only.\nReadable._fromList = fromList;\n\n// Pluck off n bytes from an array of buffers.\n// Length is the combined lengths of all the buffers in the list.\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction fromList(n, state) {\n  // nothing buffered\n  if (state.length === 0) return null;\n\n  var ret;\n  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {\n    // read it all, truncate the list\n    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);\n    state.buffer.clear();\n  } else {\n    // read part of list\n    ret = fromListPartial(n, state.buffer, state.decoder);\n  }\n\n  return ret;\n}\n\n// Extracts only enough buffered data to satisfy the amount requested.\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction fromListPartial(n, list, hasStrings) {\n  var ret;\n  if (n < list.head.data.length) {\n    // slice is the same for buffers and strings\n    ret = list.head.data.slice(0, n);\n    list.head.data = list.head.data.slice(n);\n  } else if (n === list.head.data.length) {\n    // first chunk is a perfect match\n    ret = list.shift();\n  } else {\n    // result spans more than one buffer\n    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);\n  }\n  return ret;\n}\n\n// Copies a specified amount of characters from the list of buffered data\n// chunks.\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction copyFromBufferString(n, list) {\n  var p = list.head;\n  var c = 1;\n  var ret = p.data;\n  n -= ret.length;\n  while (p = p.next) {\n    var str = p.data;\n    var nb = n > str.length ? str.length : n;\n    if (nb === str.length) ret += str;else ret += str.slice(0, n);\n    n -= nb;\n    if (n === 0) {\n      if (nb === str.length) {\n        ++c;\n        if (p.next) list.head = p.next;else list.head = list.tail = null;\n      } else {\n        list.head = p;\n        p.data = str.slice(nb);\n      }\n      break;\n    }\n    ++c;\n  }\n  list.length -= c;\n  return ret;\n}\n\n// Copies a specified amount of bytes from the list of buffered data chunks.\n// This function is designed to be inlinable, so please take care when making\n// changes to the function body.\nfunction copyFromBuffer(n, list) {\n  var ret = Buffer.allocUnsafe(n);\n  var p = list.head;\n  var c = 1;\n  p.data.copy(ret);\n  n -= p.data.length;\n  while (p = p.next) {\n    var buf = p.data;\n    var nb = n > buf.length ? buf.length : n;\n    buf.copy(ret, ret.length - n, 0, nb);\n    n -= nb;\n    if (n === 0) {\n      if (nb === buf.length) {\n        ++c;\n        if (p.next) list.head = p.next;else list.head = list.tail = null;\n      } else {\n        list.head = p;\n        p.data = buf.slice(nb);\n      }\n      break;\n    }\n    ++c;\n  }\n  list.length -= c;\n  return ret;\n}\n\nfunction endReadable(stream) {\n  var state = stream._readableState;\n\n  // If we get here before consuming all the bytes, then that is a\n  // bug in node.  Should never happen.\n  if (state.length > 0) throw new Error('\"endReadable()\" called on non-empty stream');\n\n  if (!state.endEmitted) {\n    state.ended = true;\n    pna.nextTick(endReadableNT, state, stream);\n  }\n}\n\nfunction endReadableNT(state, stream) {\n  // Check that we didn't get one last unshift.\n  if (!state.endEmitted && state.length === 0) {\n    state.endEmitted = true;\n    stream.readable = false;\n    stream.emit('end');\n  }\n}\n\nfunction indexOf(xs, x) {\n  for (var i = 0, l = xs.length; i < l; i++) {\n    if (xs[i] === x) return i;\n  }\n  return -1;\n}\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"./_stream_duplex\":58,\"./internal/streams/BufferList\":63,\"./internal/streams/destroy\":64,\"./internal/streams/stream\":65,\"_process\":56,\"core-util-is\":42,\"events\":47,\"inherits\":50,\"isarray\":52,\"process-nextick-args\":55,\"safe-buffer\":70,\"string_decoder/\":72,\"util\":38}],61:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// a transform stream is a readable/writable stream where you do\n// something with the data.  Sometimes it's called a \"filter\",\n// but that's not a great name for it, since that implies a thing where\n// some bits pass through, and others are simply ignored.  (That would\n// be a valid example of a transform, of course.)\n//\n// While the output is causally related to the input, it's not a\n// necessarily symmetric or synchronous transformation.  For example,\n// a zlib stream might take multiple plain-text writes(), and then\n// emit a single compressed chunk some time in the future.\n//\n// Here's how this works:\n//\n// The Transform stream has all the aspects of the readable and writable\n// stream classes.  When you write(chunk), that calls _write(chunk,cb)\n// internally, and returns false if there's a lot of pending writes\n// buffered up.  When you call read(), that calls _read(n) until\n// there's enough pending readable data buffered up.\n//\n// In a transform stream, the written data is placed in a buffer.  When\n// _read(n) is called, it transforms the queued up data, calling the\n// buffered _write cb's as it consumes chunks.  If consuming a single\n// written chunk would result in multiple output chunks, then the first\n// outputted bit calls the readcb, and subsequent chunks just go into\n// the read buffer, and will cause it to emit 'readable' if necessary.\n//\n// This way, back-pressure is actually determined by the reading side,\n// since _read has to be called to start processing a new chunk.  However,\n// a pathological inflate type of transform can cause excessive buffering\n// here.  For example, imagine a stream where every byte of input is\n// interpreted as an integer from 0-255, and then results in that many\n// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in\n// 1kb of data being output.  In this case, you could write a very small\n// amount of input, and end up with a very large amount of output.  In\n// such a pathological inflating mechanism, there'd be no way to tell\n// the system to stop doing the transform.  A single 4MB write could\n// cause the system to run out of memory.\n//\n// However, even in such a pathological case, only a single written chunk\n// would be consumed, and then the rest would wait (un-transformed) until\n// the results of the previous transformed chunk were consumed.\n\n'use strict';\n\nmodule.exports = Transform;\n\nvar Duplex = require('./_stream_duplex');\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nutil.inherits(Transform, Duplex);\n\nfunction afterTransform(er, data) {\n  var ts = this._transformState;\n  ts.transforming = false;\n\n  var cb = ts.writecb;\n\n  if (!cb) {\n    return this.emit('error', new Error('write callback called multiple times'));\n  }\n\n  ts.writechunk = null;\n  ts.writecb = null;\n\n  if (data != null) // single equals check for both `null` and `undefined`\n    this.push(data);\n\n  cb(er);\n\n  var rs = this._readableState;\n  rs.reading = false;\n  if (rs.needReadable || rs.length < rs.highWaterMark) {\n    this._read(rs.highWaterMark);\n  }\n}\n\nfunction Transform(options) {\n  if (!(this instanceof Transform)) return new Transform(options);\n\n  Duplex.call(this, options);\n\n  this._transformState = {\n    afterTransform: afterTransform.bind(this),\n    needTransform: false,\n    transforming: false,\n    writecb: null,\n    writechunk: null,\n    writeencoding: null\n  };\n\n  // start out asking for a readable event once data is transformed.\n  this._readableState.needReadable = true;\n\n  // we have implemented the _read method, and done the other things\n  // that Readable wants before the first _read call, so unset the\n  // sync guard flag.\n  this._readableState.sync = false;\n\n  if (options) {\n    if (typeof options.transform === 'function') this._transform = options.transform;\n\n    if (typeof options.flush === 'function') this._flush = options.flush;\n  }\n\n  // When the writable side finishes, then flush out anything remaining.\n  this.on('prefinish', prefinish);\n}\n\nfunction prefinish() {\n  var _this = this;\n\n  if (typeof this._flush === 'function') {\n    this._flush(function (er, data) {\n      done(_this, er, data);\n    });\n  } else {\n    done(this, null, null);\n  }\n}\n\nTransform.prototype.push = function (chunk, encoding) {\n  this._transformState.needTransform = false;\n  return Duplex.prototype.push.call(this, chunk, encoding);\n};\n\n// This is the part where you do stuff!\n// override this function in implementation classes.\n// 'chunk' is an input chunk.\n//\n// Call `push(newChunk)` to pass along transformed output\n// to the readable side.  You may call 'push' zero or more times.\n//\n// Call `cb(err)` when you are done with this chunk.  If you pass\n// an error, then that'll put the hurt on the whole operation.  If you\n// never call cb(), then you'll never get another chunk.\nTransform.prototype._transform = function (chunk, encoding, cb) {\n  throw new Error('_transform() is not implemented');\n};\n\nTransform.prototype._write = function (chunk, encoding, cb) {\n  var ts = this._transformState;\n  ts.writecb = cb;\n  ts.writechunk = chunk;\n  ts.writeencoding = encoding;\n  if (!ts.transforming) {\n    var rs = this._readableState;\n    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);\n  }\n};\n\n// Doesn't matter what the args are here.\n// _transform does all the work.\n// That we got here means that the readable side wants more data.\nTransform.prototype._read = function (n) {\n  var ts = this._transformState;\n\n  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {\n    ts.transforming = true;\n    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);\n  } else {\n    // mark that we need a transform, so that any data that comes in\n    // will get processed, now that we've asked for it.\n    ts.needTransform = true;\n  }\n};\n\nTransform.prototype._destroy = function (err, cb) {\n  var _this2 = this;\n\n  Duplex.prototype._destroy.call(this, err, function (err2) {\n    cb(err2);\n    _this2.emit('close');\n  });\n};\n\nfunction done(stream, er, data) {\n  if (er) return stream.emit('error', er);\n\n  if (data != null) // single equals check for both `null` and `undefined`\n    stream.push(data);\n\n  // if there's nothing in the write buffer, then that means\n  // that nothing more will ever be provided\n  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');\n\n  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');\n\n  return stream.push(null);\n}\n},{\"./_stream_duplex\":58,\"core-util-is\":42,\"inherits\":50}],62:[function(require,module,exports){\n(function (process,global){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// A bit simpler than readable streams.\n// Implement an async ._write(chunk, encoding, cb), and it'll handle all\n// the drain event emission and buffering.\n\n'use strict';\n\n/*<replacement>*/\n\nvar pna = require('process-nextick-args');\n/*</replacement>*/\n\nmodule.exports = Writable;\n\n/* <replacement> */\nfunction WriteReq(chunk, encoding, cb) {\n  this.chunk = chunk;\n  this.encoding = encoding;\n  this.callback = cb;\n  this.next = null;\n}\n\n// It seems a linked list but it is not\n// there will be only 2 of these for each stream\nfunction CorkedRequest(state) {\n  var _this = this;\n\n  this.next = null;\n  this.entry = null;\n  this.finish = function () {\n    onCorkedFinish(_this, state);\n  };\n}\n/* </replacement> */\n\n/*<replacement>*/\nvar asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;\n/*</replacement>*/\n\n/*<replacement>*/\nvar Duplex;\n/*</replacement>*/\n\nWritable.WritableState = WritableState;\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\n/*<replacement>*/\nvar internalUtil = {\n  deprecate: require('util-deprecate')\n};\n/*</replacement>*/\n\n/*<replacement>*/\nvar Stream = require('./internal/streams/stream');\n/*</replacement>*/\n\n/*<replacement>*/\n\nvar Buffer = require('safe-buffer').Buffer;\nvar OurUint8Array = global.Uint8Array || function () {};\nfunction _uint8ArrayToBuffer(chunk) {\n  return Buffer.from(chunk);\n}\nfunction _isUint8Array(obj) {\n  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;\n}\n\n/*</replacement>*/\n\nvar destroyImpl = require('./internal/streams/destroy');\n\nutil.inherits(Writable, Stream);\n\nfunction nop() {}\n\nfunction WritableState(options, stream) {\n  Duplex = Duplex || require('./_stream_duplex');\n\n  options = options || {};\n\n  // Duplex streams are both readable and writable, but share\n  // the same options object.\n  // However, some cases require setting options to different\n  // values for the readable and the writable sides of the duplex stream.\n  // These options can be provided separately as readableXXX and writableXXX.\n  var isDuplex = stream instanceof Duplex;\n\n  // object stream flag to indicate whether or not this stream\n  // contains buffers or objects.\n  this.objectMode = !!options.objectMode;\n\n  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;\n\n  // the point at which write() starts returning false\n  // Note: 0 is a valid value, means that we always return false if\n  // the entire buffer is not flushed immediately on write()\n  var hwm = options.highWaterMark;\n  var writableHwm = options.writableHighWaterMark;\n  var defaultHwm = this.objectMode ? 16 : 16 * 1024;\n\n  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;\n\n  // cast to ints.\n  this.highWaterMark = Math.floor(this.highWaterMark);\n\n  // if _final has been called\n  this.finalCalled = false;\n\n  // drain event flag.\n  this.needDrain = false;\n  // at the start of calling end()\n  this.ending = false;\n  // when end() has been called, and returned\n  this.ended = false;\n  // when 'finish' is emitted\n  this.finished = false;\n\n  // has it been destroyed\n  this.destroyed = false;\n\n  // should we decode strings into buffers before passing to _write?\n  // this is here so that some node-core streams can optimize string\n  // handling at a lower level.\n  var noDecode = options.decodeStrings === false;\n  this.decodeStrings = !noDecode;\n\n  // Crypto is kind of old and crusty.  Historically, its default string\n  // encoding is 'binary' so we have to make this configurable.\n  // Everything else in the universe uses 'utf8', though.\n  this.defaultEncoding = options.defaultEncoding || 'utf8';\n\n  // not an actual buffer we keep track of, but a measurement\n  // of how much we're waiting to get pushed to some underlying\n  // socket or file.\n  this.length = 0;\n\n  // a flag to see when we're in the middle of a write.\n  this.writing = false;\n\n  // when true all writes will be buffered until .uncork() call\n  this.corked = 0;\n\n  // a flag to be able to tell if the onwrite cb is called immediately,\n  // or on a later tick.  We set this to true at first, because any\n  // actions that shouldn't happen until \"later\" should generally also\n  // not happen before the first write call.\n  this.sync = true;\n\n  // a flag to know if we're processing previously buffered items, which\n  // may call the _write() callback in the same tick, so that we don't\n  // end up in an overlapped onwrite situation.\n  this.bufferProcessing = false;\n\n  // the callback that's passed to _write(chunk,cb)\n  this.onwrite = function (er) {\n    onwrite(stream, er);\n  };\n\n  // the callback that the user supplies to write(chunk,encoding,cb)\n  this.writecb = null;\n\n  // the amount that is being written when _write is called.\n  this.writelen = 0;\n\n  this.bufferedRequest = null;\n  this.lastBufferedRequest = null;\n\n  // number of pending user-supplied write callbacks\n  // this must be 0 before 'finish' can be emitted\n  this.pendingcb = 0;\n\n  // emit prefinish if the only thing we're waiting for is _write cbs\n  // This is relevant for synchronous Transform streams\n  this.prefinished = false;\n\n  // True if the error was already emitted and should not be thrown again\n  this.errorEmitted = false;\n\n  // count buffered requests\n  this.bufferedRequestCount = 0;\n\n  // allocate the first CorkedRequest, there is always\n  // one allocated and free to use, and we maintain at most two\n  this.corkedRequestsFree = new CorkedRequest(this);\n}\n\nWritableState.prototype.getBuffer = function getBuffer() {\n  var current = this.bufferedRequest;\n  var out = [];\n  while (current) {\n    out.push(current);\n    current = current.next;\n  }\n  return out;\n};\n\n(function () {\n  try {\n    Object.defineProperty(WritableState.prototype, 'buffer', {\n      get: internalUtil.deprecate(function () {\n        return this.getBuffer();\n      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')\n    });\n  } catch (_) {}\n})();\n\n// Test _writableState for inheritance to account for Duplex streams,\n// whose prototype chain only points to Readable.\nvar realHasInstance;\nif (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {\n  realHasInstance = Function.prototype[Symbol.hasInstance];\n  Object.defineProperty(Writable, Symbol.hasInstance, {\n    value: function (object) {\n      if (realHasInstance.call(this, object)) return true;\n      if (this !== Writable) return false;\n\n      return object && object._writableState instanceof WritableState;\n    }\n  });\n} else {\n  realHasInstance = function (object) {\n    return object instanceof this;\n  };\n}\n\nfunction Writable(options) {\n  Duplex = Duplex || require('./_stream_duplex');\n\n  // Writable ctor is applied to Duplexes, too.\n  // `realHasInstance` is necessary because using plain `instanceof`\n  // would return false, as no `_writableState` property is attached.\n\n  // Trying to use the custom `instanceof` for Writable here will also break the\n  // Node.js LazyTransform implementation, which has a non-trivial getter for\n  // `_writableState` that would lead to infinite recursion.\n  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {\n    return new Writable(options);\n  }\n\n  this._writableState = new WritableState(options, this);\n\n  // legacy.\n  this.writable = true;\n\n  if (options) {\n    if (typeof options.write === 'function') this._write = options.write;\n\n    if (typeof options.writev === 'function') this._writev = options.writev;\n\n    if (typeof options.destroy === 'function') this._destroy = options.destroy;\n\n    if (typeof options.final === 'function') this._final = options.final;\n  }\n\n  Stream.call(this);\n}\n\n// Otherwise people can pipe Writable streams, which is just wrong.\nWritable.prototype.pipe = function () {\n  this.emit('error', new Error('Cannot pipe, not readable'));\n};\n\nfunction writeAfterEnd(stream, cb) {\n  var er = new Error('write after end');\n  // TODO: defer error events consistently everywhere, not just the cb\n  stream.emit('error', er);\n  pna.nextTick(cb, er);\n}\n\n// Checks that a user-supplied chunk is valid, especially for the particular\n// mode the stream is in. Currently this means that `null` is never accepted\n// and undefined/non-string values are only allowed in object mode.\nfunction validChunk(stream, state, chunk, cb) {\n  var valid = true;\n  var er = false;\n\n  if (chunk === null) {\n    er = new TypeError('May not write null values to stream');\n  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {\n    er = new TypeError('Invalid non-string/buffer chunk');\n  }\n  if (er) {\n    stream.emit('error', er);\n    pna.nextTick(cb, er);\n    valid = false;\n  }\n  return valid;\n}\n\nWritable.prototype.write = function (chunk, encoding, cb) {\n  var state = this._writableState;\n  var ret = false;\n  var isBuf = !state.objectMode && _isUint8Array(chunk);\n\n  if (isBuf && !Buffer.isBuffer(chunk)) {\n    chunk = _uint8ArrayToBuffer(chunk);\n  }\n\n  if (typeof encoding === 'function') {\n    cb = encoding;\n    encoding = null;\n  }\n\n  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;\n\n  if (typeof cb !== 'function') cb = nop;\n\n  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {\n    state.pendingcb++;\n    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);\n  }\n\n  return ret;\n};\n\nWritable.prototype.cork = function () {\n  var state = this._writableState;\n\n  state.corked++;\n};\n\nWritable.prototype.uncork = function () {\n  var state = this._writableState;\n\n  if (state.corked) {\n    state.corked--;\n\n    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);\n  }\n};\n\nWritable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {\n  // node::ParseEncoding() requires lower case.\n  if (typeof encoding === 'string') encoding = encoding.toLowerCase();\n  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);\n  this._writableState.defaultEncoding = encoding;\n  return this;\n};\n\nfunction decodeChunk(state, chunk, encoding) {\n  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {\n    chunk = Buffer.from(chunk, encoding);\n  }\n  return chunk;\n}\n\nObject.defineProperty(Writable.prototype, 'writableHighWaterMark', {\n  // making it explicit this property is not enumerable\n  // because otherwise some prototype manipulation in\n  // userland will fail\n  enumerable: false,\n  get: function () {\n    return this._writableState.highWaterMark;\n  }\n});\n\n// if we're already writing something, then just put this\n// in the queue, and wait our turn.  Otherwise, call _write\n// If we return false, then we need a drain event, so set that flag.\nfunction writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {\n  if (!isBuf) {\n    var newChunk = decodeChunk(state, chunk, encoding);\n    if (chunk !== newChunk) {\n      isBuf = true;\n      encoding = 'buffer';\n      chunk = newChunk;\n    }\n  }\n  var len = state.objectMode ? 1 : chunk.length;\n\n  state.length += len;\n\n  var ret = state.length < state.highWaterMark;\n  // we must ensure that previous needDrain will not be reset to false.\n  if (!ret) state.needDrain = true;\n\n  if (state.writing || state.corked) {\n    var last = state.lastBufferedRequest;\n    state.lastBufferedRequest = {\n      chunk: chunk,\n      encoding: encoding,\n      isBuf: isBuf,\n      callback: cb,\n      next: null\n    };\n    if (last) {\n      last.next = state.lastBufferedRequest;\n    } else {\n      state.bufferedRequest = state.lastBufferedRequest;\n    }\n    state.bufferedRequestCount += 1;\n  } else {\n    doWrite(stream, state, false, len, chunk, encoding, cb);\n  }\n\n  return ret;\n}\n\nfunction doWrite(stream, state, writev, len, chunk, encoding, cb) {\n  state.writelen = len;\n  state.writecb = cb;\n  state.writing = true;\n  state.sync = true;\n  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);\n  state.sync = false;\n}\n\nfunction onwriteError(stream, state, sync, er, cb) {\n  --state.pendingcb;\n\n  if (sync) {\n    // defer the callback if we are being called synchronously\n    // to avoid piling up things on the stack\n    pna.nextTick(cb, er);\n    // this can emit finish, and it will always happen\n    // after error\n    pna.nextTick(finishMaybe, stream, state);\n    stream._writableState.errorEmitted = true;\n    stream.emit('error', er);\n  } else {\n    // the caller expect this to happen before if\n    // it is async\n    cb(er);\n    stream._writableState.errorEmitted = true;\n    stream.emit('error', er);\n    // this can emit finish, but finish must\n    // always follow error\n    finishMaybe(stream, state);\n  }\n}\n\nfunction onwriteStateUpdate(state) {\n  state.writing = false;\n  state.writecb = null;\n  state.length -= state.writelen;\n  state.writelen = 0;\n}\n\nfunction onwrite(stream, er) {\n  var state = stream._writableState;\n  var sync = state.sync;\n  var cb = state.writecb;\n\n  onwriteStateUpdate(state);\n\n  if (er) onwriteError(stream, state, sync, er, cb);else {\n    // Check if we're actually ready to finish, but don't emit yet\n    var finished = needFinish(state);\n\n    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {\n      clearBuffer(stream, state);\n    }\n\n    if (sync) {\n      /*<replacement>*/\n      asyncWrite(afterWrite, stream, state, finished, cb);\n      /*</replacement>*/\n    } else {\n      afterWrite(stream, state, finished, cb);\n    }\n  }\n}\n\nfunction afterWrite(stream, state, finished, cb) {\n  if (!finished) onwriteDrain(stream, state);\n  state.pendingcb--;\n  cb();\n  finishMaybe(stream, state);\n}\n\n// Must force callback to be called on nextTick, so that we don't\n// emit 'drain' before the write() consumer gets the 'false' return\n// value, and has a chance to attach a 'drain' listener.\nfunction onwriteDrain(stream, state) {\n  if (state.length === 0 && state.needDrain) {\n    state.needDrain = false;\n    stream.emit('drain');\n  }\n}\n\n// if there's something in the buffer waiting, then process it\nfunction clearBuffer(stream, state) {\n  state.bufferProcessing = true;\n  var entry = state.bufferedRequest;\n\n  if (stream._writev && entry && entry.next) {\n    // Fast case, write everything using _writev()\n    var l = state.bufferedRequestCount;\n    var buffer = new Array(l);\n    var holder = state.corkedRequestsFree;\n    holder.entry = entry;\n\n    var count = 0;\n    var allBuffers = true;\n    while (entry) {\n      buffer[count] = entry;\n      if (!entry.isBuf) allBuffers = false;\n      entry = entry.next;\n      count += 1;\n    }\n    buffer.allBuffers = allBuffers;\n\n    doWrite(stream, state, true, state.length, buffer, '', holder.finish);\n\n    // doWrite is almost always async, defer these to save a bit of time\n    // as the hot path ends with doWrite\n    state.pendingcb++;\n    state.lastBufferedRequest = null;\n    if (holder.next) {\n      state.corkedRequestsFree = holder.next;\n      holder.next = null;\n    } else {\n      state.corkedRequestsFree = new CorkedRequest(state);\n    }\n    state.bufferedRequestCount = 0;\n  } else {\n    // Slow case, write chunks one-by-one\n    while (entry) {\n      var chunk = entry.chunk;\n      var encoding = entry.encoding;\n      var cb = entry.callback;\n      var len = state.objectMode ? 1 : chunk.length;\n\n      doWrite(stream, state, false, len, chunk, encoding, cb);\n      entry = entry.next;\n      state.bufferedRequestCount--;\n      // if we didn't call the onwrite immediately, then\n      // it means that we need to wait until it does.\n      // also, that means that the chunk and cb are currently\n      // being processed, so move the buffer counter past them.\n      if (state.writing) {\n        break;\n      }\n    }\n\n    if (entry === null) state.lastBufferedRequest = null;\n  }\n\n  state.bufferedRequest = entry;\n  state.bufferProcessing = false;\n}\n\nWritable.prototype._write = function (chunk, encoding, cb) {\n  cb(new Error('_write() is not implemented'));\n};\n\nWritable.prototype._writev = null;\n\nWritable.prototype.end = function (chunk, encoding, cb) {\n  var state = this._writableState;\n\n  if (typeof chunk === 'function') {\n    cb = chunk;\n    chunk = null;\n    encoding = null;\n  } else if (typeof encoding === 'function') {\n    cb = encoding;\n    encoding = null;\n  }\n\n  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);\n\n  // .end() fully uncorks\n  if (state.corked) {\n    state.corked = 1;\n    this.uncork();\n  }\n\n  // ignore unnecessary end() calls.\n  if (!state.ending && !state.finished) endWritable(this, state, cb);\n};\n\nfunction needFinish(state) {\n  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;\n}\nfunction callFinal(stream, state) {\n  stream._final(function (err) {\n    state.pendingcb--;\n    if (err) {\n      stream.emit('error', err);\n    }\n    state.prefinished = true;\n    stream.emit('prefinish');\n    finishMaybe(stream, state);\n  });\n}\nfunction prefinish(stream, state) {\n  if (!state.prefinished && !state.finalCalled) {\n    if (typeof stream._final === 'function') {\n      state.pendingcb++;\n      state.finalCalled = true;\n      pna.nextTick(callFinal, stream, state);\n    } else {\n      state.prefinished = true;\n      stream.emit('prefinish');\n    }\n  }\n}\n\nfunction finishMaybe(stream, state) {\n  var need = needFinish(state);\n  if (need) {\n    prefinish(stream, state);\n    if (state.pendingcb === 0) {\n      state.finished = true;\n      stream.emit('finish');\n    }\n  }\n  return need;\n}\n\nfunction endWritable(stream, state, cb) {\n  state.ending = true;\n  finishMaybe(stream, state);\n  if (cb) {\n    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);\n  }\n  state.ended = true;\n  stream.writable = false;\n}\n\nfunction onCorkedFinish(corkReq, state, err) {\n  var entry = corkReq.entry;\n  corkReq.entry = null;\n  while (entry) {\n    var cb = entry.callback;\n    state.pendingcb--;\n    cb(err);\n    entry = entry.next;\n  }\n  if (state.corkedRequestsFree) {\n    state.corkedRequestsFree.next = corkReq;\n  } else {\n    state.corkedRequestsFree = corkReq;\n  }\n}\n\nObject.defineProperty(Writable.prototype, 'destroyed', {\n  get: function () {\n    if (this._writableState === undefined) {\n      return false;\n    }\n    return this._writableState.destroyed;\n  },\n  set: function (value) {\n    // we ignore the value if the stream\n    // has not been initialized yet\n    if (!this._writableState) {\n      return;\n    }\n\n    // backward compatibility, the user is explicitly\n    // managing destroyed\n    this._writableState.destroyed = value;\n  }\n});\n\nWritable.prototype.destroy = destroyImpl.destroy;\nWritable.prototype._undestroy = destroyImpl.undestroy;\nWritable.prototype._destroy = function (err, cb) {\n  this.end();\n  cb(err);\n};\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"./_stream_duplex\":58,\"./internal/streams/destroy\":64,\"./internal/streams/stream\":65,\"_process\":56,\"core-util-is\":42,\"inherits\":50,\"process-nextick-args\":55,\"safe-buffer\":70,\"util-deprecate\":73}],63:[function(require,module,exports){\n'use strict';\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Buffer = require('safe-buffer').Buffer;\nvar util = require('util');\n\nfunction copyBuffer(src, target, offset) {\n  src.copy(target, offset);\n}\n\nmodule.exports = function () {\n  function BufferList() {\n    _classCallCheck(this, BufferList);\n\n    this.head = null;\n    this.tail = null;\n    this.length = 0;\n  }\n\n  BufferList.prototype.push = function push(v) {\n    var entry = { data: v, next: null };\n    if (this.length > 0) this.tail.next = entry;else this.head = entry;\n    this.tail = entry;\n    ++this.length;\n  };\n\n  BufferList.prototype.unshift = function unshift(v) {\n    var entry = { data: v, next: this.head };\n    if (this.length === 0) this.tail = entry;\n    this.head = entry;\n    ++this.length;\n  };\n\n  BufferList.prototype.shift = function shift() {\n    if (this.length === 0) return;\n    var ret = this.head.data;\n    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;\n    --this.length;\n    return ret;\n  };\n\n  BufferList.prototype.clear = function clear() {\n    this.head = this.tail = null;\n    this.length = 0;\n  };\n\n  BufferList.prototype.join = function join(s) {\n    if (this.length === 0) return '';\n    var p = this.head;\n    var ret = '' + p.data;\n    while (p = p.next) {\n      ret += s + p.data;\n    }return ret;\n  };\n\n  BufferList.prototype.concat = function concat(n) {\n    if (this.length === 0) return Buffer.alloc(0);\n    if (this.length === 1) return this.head.data;\n    var ret = Buffer.allocUnsafe(n >>> 0);\n    var p = this.head;\n    var i = 0;\n    while (p) {\n      copyBuffer(p.data, ret, i);\n      i += p.data.length;\n      p = p.next;\n    }\n    return ret;\n  };\n\n  return BufferList;\n}();\n\nif (util && util.inspect && util.inspect.custom) {\n  module.exports.prototype[util.inspect.custom] = function () {\n    var obj = util.inspect({ length: this.length });\n    return this.constructor.name + ' ' + obj;\n  };\n}\n},{\"safe-buffer\":70,\"util\":38}],64:[function(require,module,exports){\n'use strict';\n\n/*<replacement>*/\n\nvar pna = require('process-nextick-args');\n/*</replacement>*/\n\n// undocumented cb() API, needed for core, not for public API\nfunction destroy(err, cb) {\n  var _this = this;\n\n  var readableDestroyed = this._readableState && this._readableState.destroyed;\n  var writableDestroyed = this._writableState && this._writableState.destroyed;\n\n  if (readableDestroyed || writableDestroyed) {\n    if (cb) {\n      cb(err);\n    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {\n      pna.nextTick(emitErrorNT, this, err);\n    }\n    return this;\n  }\n\n  // we set destroyed to true before firing error callbacks in order\n  // to make it re-entrance safe in case destroy() is called within callbacks\n\n  if (this._readableState) {\n    this._readableState.destroyed = true;\n  }\n\n  // if this is a duplex stream mark the writable part as destroyed as well\n  if (this._writableState) {\n    this._writableState.destroyed = true;\n  }\n\n  this._destroy(err || null, function (err) {\n    if (!cb && err) {\n      pna.nextTick(emitErrorNT, _this, err);\n      if (_this._writableState) {\n        _this._writableState.errorEmitted = true;\n      }\n    } else if (cb) {\n      cb(err);\n    }\n  });\n\n  return this;\n}\n\nfunction undestroy() {\n  if (this._readableState) {\n    this._readableState.destroyed = false;\n    this._readableState.reading = false;\n    this._readableState.ended = false;\n    this._readableState.endEmitted = false;\n  }\n\n  if (this._writableState) {\n    this._writableState.destroyed = false;\n    this._writableState.ended = false;\n    this._writableState.ending = false;\n    this._writableState.finished = false;\n    this._writableState.errorEmitted = false;\n  }\n}\n\nfunction emitErrorNT(self, err) {\n  self.emit('error', err);\n}\n\nmodule.exports = {\n  destroy: destroy,\n  undestroy: undestroy\n};\n},{\"process-nextick-args\":55}],65:[function(require,module,exports){\nmodule.exports = require('events').EventEmitter;\n\n},{\"events\":47}],66:[function(require,module,exports){\nmodule.exports = require('./readable').PassThrough\n\n},{\"./readable\":67}],67:[function(require,module,exports){\nexports = module.exports = require('./lib/_stream_readable.js');\nexports.Stream = exports;\nexports.Readable = exports;\nexports.Writable = require('./lib/_stream_writable.js');\nexports.Duplex = require('./lib/_stream_duplex.js');\nexports.Transform = require('./lib/_stream_transform.js');\nexports.PassThrough = require('./lib/_stream_passthrough.js');\n\n},{\"./lib/_stream_duplex.js\":58,\"./lib/_stream_passthrough.js\":59,\"./lib/_stream_readable.js\":60,\"./lib/_stream_transform.js\":61,\"./lib/_stream_writable.js\":62}],68:[function(require,module,exports){\nmodule.exports = require('./readable').Transform\n\n},{\"./readable\":67}],69:[function(require,module,exports){\nmodule.exports = require('./lib/_stream_writable.js');\n\n},{\"./lib/_stream_writable.js\":62}],70:[function(require,module,exports){\n/* eslint-disable node/no-deprecated-api */\nvar buffer = require('buffer')\nvar Buffer = buffer.Buffer\n\n// alternative to using Object.keys for old browsers\nfunction copyProps (src, dst) {\n  for (var key in src) {\n    dst[key] = src[key]\n  }\n}\nif (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {\n  module.exports = buffer\n} else {\n  // Copy properties from require('buffer')\n  copyProps(buffer, exports)\n  exports.Buffer = SafeBuffer\n}\n\nfunction SafeBuffer (arg, encodingOrOffset, length) {\n  return Buffer(arg, encodingOrOffset, length)\n}\n\n// Copy static methods from Buffer\ncopyProps(Buffer, SafeBuffer)\n\nSafeBuffer.from = function (arg, encodingOrOffset, length) {\n  if (typeof arg === 'number') {\n    throw new TypeError('Argument must not be a number')\n  }\n  return Buffer(arg, encodingOrOffset, length)\n}\n\nSafeBuffer.alloc = function (size, fill, encoding) {\n  if (typeof size !== 'number') {\n    throw new TypeError('Argument must be a number')\n  }\n  var buf = Buffer(size)\n  if (fill !== undefined) {\n    if (typeof encoding === 'string') {\n      buf.fill(fill, encoding)\n    } else {\n      buf.fill(fill)\n    }\n  } else {\n    buf.fill(0)\n  }\n  return buf\n}\n\nSafeBuffer.allocUnsafe = function (size) {\n  if (typeof size !== 'number') {\n    throw new TypeError('Argument must be a number')\n  }\n  return Buffer(size)\n}\n\nSafeBuffer.allocUnsafeSlow = function (size) {\n  if (typeof size !== 'number') {\n    throw new TypeError('Argument must be a number')\n  }\n  return buffer.SlowBuffer(size)\n}\n\n},{\"buffer\":41}],71:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nmodule.exports = Stream;\n\nvar EE = require('events').EventEmitter;\nvar inherits = require('inherits');\n\ninherits(Stream, EE);\nStream.Readable = require('readable-stream/readable.js');\nStream.Writable = require('readable-stream/writable.js');\nStream.Duplex = require('readable-stream/duplex.js');\nStream.Transform = require('readable-stream/transform.js');\nStream.PassThrough = require('readable-stream/passthrough.js');\n\n// Backwards-compat with node 0.4.x\nStream.Stream = Stream;\n\n\n\n// old-style streams.  Note that the pipe method (the only relevant\n// part of this class) is overridden in the Readable class.\n\nfunction Stream() {\n  EE.call(this);\n}\n\nStream.prototype.pipe = function(dest, options) {\n  var source = this;\n\n  function ondata(chunk) {\n    if (dest.writable) {\n      if (false === dest.write(chunk) && source.pause) {\n        source.pause();\n      }\n    }\n  }\n\n  source.on('data', ondata);\n\n  function ondrain() {\n    if (source.readable && source.resume) {\n      source.resume();\n    }\n  }\n\n  dest.on('drain', ondrain);\n\n  // If the 'end' option is not supplied, dest.end() will be called when\n  // source gets the 'end' or 'close' events.  Only dest.end() once.\n  if (!dest._isStdio && (!options || options.end !== false)) {\n    source.on('end', onend);\n    source.on('close', onclose);\n  }\n\n  var didOnEnd = false;\n  function onend() {\n    if (didOnEnd) return;\n    didOnEnd = true;\n\n    dest.end();\n  }\n\n\n  function onclose() {\n    if (didOnEnd) return;\n    didOnEnd = true;\n\n    if (typeof dest.destroy === 'function') dest.destroy();\n  }\n\n  // don't leave dangling pipes when there are errors.\n  function onerror(er) {\n    cleanup();\n    if (EE.listenerCount(this, 'error') === 0) {\n      throw er; // Unhandled stream error in pipe.\n    }\n  }\n\n  source.on('error', onerror);\n  dest.on('error', onerror);\n\n  // remove all the event listeners that were added.\n  function cleanup() {\n    source.removeListener('data', ondata);\n    dest.removeListener('drain', ondrain);\n\n    source.removeListener('end', onend);\n    source.removeListener('close', onclose);\n\n    source.removeListener('error', onerror);\n    dest.removeListener('error', onerror);\n\n    source.removeListener('end', cleanup);\n    source.removeListener('close', cleanup);\n\n    dest.removeListener('close', cleanup);\n  }\n\n  source.on('end', cleanup);\n  source.on('close', cleanup);\n\n  dest.on('close', cleanup);\n\n  dest.emit('pipe', source);\n\n  // Allow for unix-like usage: A.pipe(B).pipe(C)\n  return dest;\n};\n\n},{\"events\":47,\"inherits\":50,\"readable-stream/duplex.js\":57,\"readable-stream/passthrough.js\":66,\"readable-stream/readable.js\":67,\"readable-stream/transform.js\":68,\"readable-stream/writable.js\":69}],72:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n'use strict';\n\n/*<replacement>*/\n\nvar Buffer = require('safe-buffer').Buffer;\n/*</replacement>*/\n\nvar isEncoding = Buffer.isEncoding || function (encoding) {\n  encoding = '' + encoding;\n  switch (encoding && encoding.toLowerCase()) {\n    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':\n      return true;\n    default:\n      return false;\n  }\n};\n\nfunction _normalizeEncoding(enc) {\n  if (!enc) return 'utf8';\n  var retried;\n  while (true) {\n    switch (enc) {\n      case 'utf8':\n      case 'utf-8':\n        return 'utf8';\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return 'utf16le';\n      case 'latin1':\n      case 'binary':\n        return 'latin1';\n      case 'base64':\n      case 'ascii':\n      case 'hex':\n        return enc;\n      default:\n        if (retried) return; // undefined\n        enc = ('' + enc).toLowerCase();\n        retried = true;\n    }\n  }\n};\n\n// Do not cache `Buffer.isEncoding` when checking encoding names as some\n// modules monkey-patch it to support additional encodings\nfunction normalizeEncoding(enc) {\n  var nenc = _normalizeEncoding(enc);\n  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);\n  return nenc || enc;\n}\n\n// StringDecoder provides an interface for efficiently splitting a series of\n// buffers into a series of JS strings without breaking apart multi-byte\n// characters.\nexports.StringDecoder = StringDecoder;\nfunction StringDecoder(encoding) {\n  this.encoding = normalizeEncoding(encoding);\n  var nb;\n  switch (this.encoding) {\n    case 'utf16le':\n      this.text = utf16Text;\n      this.end = utf16End;\n      nb = 4;\n      break;\n    case 'utf8':\n      this.fillLast = utf8FillLast;\n      nb = 4;\n      break;\n    case 'base64':\n      this.text = base64Text;\n      this.end = base64End;\n      nb = 3;\n      break;\n    default:\n      this.write = simpleWrite;\n      this.end = simpleEnd;\n      return;\n  }\n  this.lastNeed = 0;\n  this.lastTotal = 0;\n  this.lastChar = Buffer.allocUnsafe(nb);\n}\n\nStringDecoder.prototype.write = function (buf) {\n  if (buf.length === 0) return '';\n  var r;\n  var i;\n  if (this.lastNeed) {\n    r = this.fillLast(buf);\n    if (r === undefined) return '';\n    i = this.lastNeed;\n    this.lastNeed = 0;\n  } else {\n    i = 0;\n  }\n  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);\n  return r || '';\n};\n\nStringDecoder.prototype.end = utf8End;\n\n// Returns only complete characters in a Buffer\nStringDecoder.prototype.text = utf8Text;\n\n// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer\nStringDecoder.prototype.fillLast = function (buf) {\n  if (this.lastNeed <= buf.length) {\n    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);\n    return this.lastChar.toString(this.encoding, 0, this.lastTotal);\n  }\n  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);\n  this.lastNeed -= buf.length;\n};\n\n// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a\n// continuation byte. If an invalid byte is detected, -2 is returned.\nfunction utf8CheckByte(byte) {\n  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;\n  return byte >> 6 === 0x02 ? -1 : -2;\n}\n\n// Checks at most 3 bytes at the end of a Buffer in order to detect an\n// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)\n// needed to complete the UTF-8 character (if applicable) are returned.\nfunction utf8CheckIncomplete(self, buf, i) {\n  var j = buf.length - 1;\n  if (j < i) return 0;\n  var nb = utf8CheckByte(buf[j]);\n  if (nb >= 0) {\n    if (nb > 0) self.lastNeed = nb - 1;\n    return nb;\n  }\n  if (--j < i || nb === -2) return 0;\n  nb = utf8CheckByte(buf[j]);\n  if (nb >= 0) {\n    if (nb > 0) self.lastNeed = nb - 2;\n    return nb;\n  }\n  if (--j < i || nb === -2) return 0;\n  nb = utf8CheckByte(buf[j]);\n  if (nb >= 0) {\n    if (nb > 0) {\n      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;\n    }\n    return nb;\n  }\n  return 0;\n}\n\n// Validates as many continuation bytes for a multi-byte UTF-8 character as\n// needed or are available. If we see a non-continuation byte where we expect\n// one, we \"replace\" the validated continuation bytes we've seen so far with\n// a single UTF-8 replacement character ('\\ufffd'), to match v8's UTF-8 decoding\n// behavior. The continuation byte check is included three times in the case\n// where all of the continuation bytes for a character exist in the same buffer.\n// It is also done this way as a slight performance increase instead of using a\n// loop.\nfunction utf8CheckExtraBytes(self, buf, p) {\n  if ((buf[0] & 0xC0) !== 0x80) {\n    self.lastNeed = 0;\n    return '\\ufffd';\n  }\n  if (self.lastNeed > 1 && buf.length > 1) {\n    if ((buf[1] & 0xC0) !== 0x80) {\n      self.lastNeed = 1;\n      return '\\ufffd';\n    }\n    if (self.lastNeed > 2 && buf.length > 2) {\n      if ((buf[2] & 0xC0) !== 0x80) {\n        self.lastNeed = 2;\n        return '\\ufffd';\n      }\n    }\n  }\n}\n\n// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.\nfunction utf8FillLast(buf) {\n  var p = this.lastTotal - this.lastNeed;\n  var r = utf8CheckExtraBytes(this, buf, p);\n  if (r !== undefined) return r;\n  if (this.lastNeed <= buf.length) {\n    buf.copy(this.lastChar, p, 0, this.lastNeed);\n    return this.lastChar.toString(this.encoding, 0, this.lastTotal);\n  }\n  buf.copy(this.lastChar, p, 0, buf.length);\n  this.lastNeed -= buf.length;\n}\n\n// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a\n// partial character, the character's bytes are buffered until the required\n// number of bytes are available.\nfunction utf8Text(buf, i) {\n  var total = utf8CheckIncomplete(this, buf, i);\n  if (!this.lastNeed) return buf.toString('utf8', i);\n  this.lastTotal = total;\n  var end = buf.length - (total - this.lastNeed);\n  buf.copy(this.lastChar, 0, end);\n  return buf.toString('utf8', i, end);\n}\n\n// For UTF-8, a replacement character is added when ending on a partial\n// character.\nfunction utf8End(buf) {\n  var r = buf && buf.length ? this.write(buf) : '';\n  if (this.lastNeed) return r + '\\ufffd';\n  return r;\n}\n\n// UTF-16LE typically needs two bytes per character, but even if we have an even\n// number of bytes available, we need to check if we end on a leading/high\n// surrogate. In that case, we need to wait for the next two bytes in order to\n// decode the last character properly.\nfunction utf16Text(buf, i) {\n  if ((buf.length - i) % 2 === 0) {\n    var r = buf.toString('utf16le', i);\n    if (r) {\n      var c = r.charCodeAt(r.length - 1);\n      if (c >= 0xD800 && c <= 0xDBFF) {\n        this.lastNeed = 2;\n        this.lastTotal = 4;\n        this.lastChar[0] = buf[buf.length - 2];\n        this.lastChar[1] = buf[buf.length - 1];\n        return r.slice(0, -1);\n      }\n    }\n    return r;\n  }\n  this.lastNeed = 1;\n  this.lastTotal = 2;\n  this.lastChar[0] = buf[buf.length - 1];\n  return buf.toString('utf16le', i, buf.length - 1);\n}\n\n// For UTF-16LE we do not explicitly append special replacement characters if we\n// end on a partial character, we simply let v8 handle that.\nfunction utf16End(buf) {\n  var r = buf && buf.length ? this.write(buf) : '';\n  if (this.lastNeed) {\n    var end = this.lastTotal - this.lastNeed;\n    return r + this.lastChar.toString('utf16le', 0, end);\n  }\n  return r;\n}\n\nfunction base64Text(buf, i) {\n  var n = (buf.length - i) % 3;\n  if (n === 0) return buf.toString('base64', i);\n  this.lastNeed = 3 - n;\n  this.lastTotal = 3;\n  if (n === 1) {\n    this.lastChar[0] = buf[buf.length - 1];\n  } else {\n    this.lastChar[0] = buf[buf.length - 2];\n    this.lastChar[1] = buf[buf.length - 1];\n  }\n  return buf.toString('base64', i, buf.length - n);\n}\n\nfunction base64End(buf) {\n  var r = buf && buf.length ? this.write(buf) : '';\n  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);\n  return r;\n}\n\n// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)\nfunction simpleWrite(buf) {\n  return buf.toString(this.encoding);\n}\n\nfunction simpleEnd(buf) {\n  return buf && buf.length ? this.write(buf) : '';\n}\n},{\"safe-buffer\":70}],73:[function(require,module,exports){\n(function (global){\n\n/**\n * Module exports.\n */\n\nmodule.exports = deprecate;\n\n/**\n * Mark that a method should not be used.\n * Returns a modified function which warns once by default.\n *\n * If `localStorage.noDeprecation = true` is set, then it is a no-op.\n *\n * If `localStorage.throwDeprecation = true` is set, then deprecated functions\n * will throw an Error when invoked.\n *\n * If `localStorage.traceDeprecation = true` is set, then deprecated functions\n * will invoke `console.trace()` instead of `console.error()`.\n *\n * @param {Function} fn - the function to deprecate\n * @param {String} msg - the string to print to the console when `fn` is invoked\n * @returns {Function} a new \"deprecated\" version of `fn`\n * @api public\n */\n\nfunction deprecate (fn, msg) {\n  if (config('noDeprecation')) {\n    return fn;\n  }\n\n  var warned = false;\n  function deprecated() {\n    if (!warned) {\n      if (config('throwDeprecation')) {\n        throw new Error(msg);\n      } else if (config('traceDeprecation')) {\n        console.trace(msg);\n      } else {\n        console.warn(msg);\n      }\n      warned = true;\n    }\n    return fn.apply(this, arguments);\n  }\n\n  return deprecated;\n}\n\n/**\n * Checks `localStorage` for boolean values for the given `name`.\n *\n * @param {String} name\n * @returns {Boolean}\n * @api private\n */\n\nfunction config (name) {\n  // accessing global.localStorage can trigger a DOMException in sandboxed iframes\n  try {\n    if (!global.localStorage) return false;\n  } catch (_) {\n    return false;\n  }\n  var val = global.localStorage[name];\n  if (null == val) return false;\n  return String(val).toLowerCase() === 'true';\n}\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{}],74:[function(require,module,exports){\narguments[4][50][0].apply(exports,arguments)\n},{\"dup\":50}],75:[function(require,module,exports){\nmodule.exports = function isBuffer(arg) {\n  return arg && typeof arg === 'object'\n    && typeof arg.copy === 'function'\n    && typeof arg.fill === 'function'\n    && typeof arg.readUInt8 === 'function';\n}\n},{}],76:[function(require,module,exports){\n(function (process,global){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nvar formatRegExp = /%[sdj%]/g;\nexports.format = function(f) {\n  if (!isString(f)) {\n    var objects = [];\n    for (var i = 0; i < arguments.length; i++) {\n      objects.push(inspect(arguments[i]));\n    }\n    return objects.join(' ');\n  }\n\n  var i = 1;\n  var args = arguments;\n  var len = args.length;\n  var str = String(f).replace(formatRegExp, function(x) {\n    if (x === '%%') return '%';\n    if (i >= len) return x;\n    switch (x) {\n      case '%s': return String(args[i++]);\n      case '%d': return Number(args[i++]);\n      case '%j':\n        try {\n          return JSON.stringify(args[i++]);\n        } catch (_) {\n          return '[Circular]';\n        }\n      default:\n        return x;\n    }\n  });\n  for (var x = args[i]; i < len; x = args[++i]) {\n    if (isNull(x) || !isObject(x)) {\n      str += ' ' + x;\n    } else {\n      str += ' ' + inspect(x);\n    }\n  }\n  return str;\n};\n\n\n// Mark that a method should not be used.\n// Returns a modified function which warns once by default.\n// If --no-deprecation is set, then it is a no-op.\nexports.deprecate = function(fn, msg) {\n  // Allow for deprecating things in the process of starting up.\n  if (isUndefined(global.process)) {\n    return function() {\n      return exports.deprecate(fn, msg).apply(this, arguments);\n    };\n  }\n\n  if (process.noDeprecation === true) {\n    return fn;\n  }\n\n  var warned = false;\n  function deprecated() {\n    if (!warned) {\n      if (process.throwDeprecation) {\n        throw new Error(msg);\n      } else if (process.traceDeprecation) {\n        console.trace(msg);\n      } else {\n        console.error(msg);\n      }\n      warned = true;\n    }\n    return fn.apply(this, arguments);\n  }\n\n  return deprecated;\n};\n\n\nvar debugs = {};\nvar debugEnviron;\nexports.debuglog = function(set) {\n  if (isUndefined(debugEnviron))\n    debugEnviron = process.env.NODE_DEBUG || '';\n  set = set.toUpperCase();\n  if (!debugs[set]) {\n    if (new RegExp('\\\\b' + set + '\\\\b', 'i').test(debugEnviron)) {\n      var pid = process.pid;\n      debugs[set] = function() {\n        var msg = exports.format.apply(exports, arguments);\n        console.error('%s %d: %s', set, pid, msg);\n      };\n    } else {\n      debugs[set] = function() {};\n    }\n  }\n  return debugs[set];\n};\n\n\n/**\n * Echos the value of a value. Trys to print the value out\n * in the best way possible given the different types.\n *\n * @param {Object} obj The object to print out.\n * @param {Object} opts Optional options object that alters the output.\n */\n/* legacy: obj, showHidden, depth, colors*/\nfunction inspect(obj, opts) {\n  // default options\n  var ctx = {\n    seen: [],\n    stylize: stylizeNoColor\n  };\n  // legacy...\n  if (arguments.length >= 3) ctx.depth = arguments[2];\n  if (arguments.length >= 4) ctx.colors = arguments[3];\n  if (isBoolean(opts)) {\n    // legacy...\n    ctx.showHidden = opts;\n  } else if (opts) {\n    // got an \"options\" object\n    exports._extend(ctx, opts);\n  }\n  // set default options\n  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;\n  if (isUndefined(ctx.depth)) ctx.depth = 2;\n  if (isUndefined(ctx.colors)) ctx.colors = false;\n  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;\n  if (ctx.colors) ctx.stylize = stylizeWithColor;\n  return formatValue(ctx, obj, ctx.depth);\n}\nexports.inspect = inspect;\n\n\n// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics\ninspect.colors = {\n  'bold' : [1, 22],\n  'italic' : [3, 23],\n  'underline' : [4, 24],\n  'inverse' : [7, 27],\n  'white' : [37, 39],\n  'grey' : [90, 39],\n  'black' : [30, 39],\n  'blue' : [34, 39],\n  'cyan' : [36, 39],\n  'green' : [32, 39],\n  'magenta' : [35, 39],\n  'red' : [31, 39],\n  'yellow' : [33, 39]\n};\n\n// Don't use 'blue' not visible on cmd.exe\ninspect.styles = {\n  'special': 'cyan',\n  'number': 'yellow',\n  'boolean': 'yellow',\n  'undefined': 'grey',\n  'null': 'bold',\n  'string': 'green',\n  'date': 'magenta',\n  // \"name\": intentionally not styling\n  'regexp': 'red'\n};\n\n\nfunction stylizeWithColor(str, styleType) {\n  var style = inspect.styles[styleType];\n\n  if (style) {\n    return '\\u001b[' + inspect.colors[style][0] + 'm' + str +\n           '\\u001b[' + inspect.colors[style][1] + 'm';\n  } else {\n    return str;\n  }\n}\n\n\nfunction stylizeNoColor(str, styleType) {\n  return str;\n}\n\n\nfunction arrayToHash(array) {\n  var hash = {};\n\n  array.forEach(function(val, idx) {\n    hash[val] = true;\n  });\n\n  return hash;\n}\n\n\nfunction formatValue(ctx, value, recurseTimes) {\n  // Provide a hook for user-specified inspect functions.\n  // Check that value is an object with an inspect function on it\n  if (ctx.customInspect &&\n      value &&\n      isFunction(value.inspect) &&\n      // Filter out the util module, it's inspect function is special\n      value.inspect !== exports.inspect &&\n      // Also filter out any prototype objects using the circular check.\n      !(value.constructor && value.constructor.prototype === value)) {\n    var ret = value.inspect(recurseTimes, ctx);\n    if (!isString(ret)) {\n      ret = formatValue(ctx, ret, recurseTimes);\n    }\n    return ret;\n  }\n\n  // Primitive types cannot have properties\n  var primitive = formatPrimitive(ctx, value);\n  if (primitive) {\n    return primitive;\n  }\n\n  // Look up the keys of the object.\n  var keys = Object.keys(value);\n  var visibleKeys = arrayToHash(keys);\n\n  if (ctx.showHidden) {\n    keys = Object.getOwnPropertyNames(value);\n  }\n\n  // IE doesn't make error fields non-enumerable\n  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx\n  if (isError(value)\n      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {\n    return formatError(value);\n  }\n\n  // Some type of object without properties can be shortcutted.\n  if (keys.length === 0) {\n    if (isFunction(value)) {\n      var name = value.name ? ': ' + value.name : '';\n      return ctx.stylize('[Function' + name + ']', 'special');\n    }\n    if (isRegExp(value)) {\n      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');\n    }\n    if (isDate(value)) {\n      return ctx.stylize(Date.prototype.toString.call(value), 'date');\n    }\n    if (isError(value)) {\n      return formatError(value);\n    }\n  }\n\n  var base = '', array = false, braces = ['{', '}'];\n\n  // Make Array say that they are Array\n  if (isArray(value)) {\n    array = true;\n    braces = ['[', ']'];\n  }\n\n  // Make functions say that they are functions\n  if (isFunction(value)) {\n    var n = value.name ? ': ' + value.name : '';\n    base = ' [Function' + n + ']';\n  }\n\n  // Make RegExps say that they are RegExps\n  if (isRegExp(value)) {\n    base = ' ' + RegExp.prototype.toString.call(value);\n  }\n\n  // Make dates with properties first say the date\n  if (isDate(value)) {\n    base = ' ' + Date.prototype.toUTCString.call(value);\n  }\n\n  // Make error with message first say the error\n  if (isError(value)) {\n    base = ' ' + formatError(value);\n  }\n\n  if (keys.length === 0 && (!array || value.length == 0)) {\n    return braces[0] + base + braces[1];\n  }\n\n  if (recurseTimes < 0) {\n    if (isRegExp(value)) {\n      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');\n    } else {\n      return ctx.stylize('[Object]', 'special');\n    }\n  }\n\n  ctx.seen.push(value);\n\n  var output;\n  if (array) {\n    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);\n  } else {\n    output = keys.map(function(key) {\n      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);\n    });\n  }\n\n  ctx.seen.pop();\n\n  return reduceToSingleString(output, base, braces);\n}\n\n\nfunction formatPrimitive(ctx, value) {\n  if (isUndefined(value))\n    return ctx.stylize('undefined', 'undefined');\n  if (isString(value)) {\n    var simple = '\\'' + JSON.stringify(value).replace(/^\"|\"$/g, '')\n                                             .replace(/'/g, \"\\\\'\")\n                                             .replace(/\\\\\"/g, '\"') + '\\'';\n    return ctx.stylize(simple, 'string');\n  }\n  if (isNumber(value))\n    return ctx.stylize('' + value, 'number');\n  if (isBoolean(value))\n    return ctx.stylize('' + value, 'boolean');\n  // For some reason typeof null is \"object\", so special case here.\n  if (isNull(value))\n    return ctx.stylize('null', 'null');\n}\n\n\nfunction formatError(value) {\n  return '[' + Error.prototype.toString.call(value) + ']';\n}\n\n\nfunction formatArray(ctx, value, recurseTimes, visibleKeys, keys) {\n  var output = [];\n  for (var i = 0, l = value.length; i < l; ++i) {\n    if (hasOwnProperty(value, String(i))) {\n      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,\n          String(i), true));\n    } else {\n      output.push('');\n    }\n  }\n  keys.forEach(function(key) {\n    if (!key.match(/^\\d+$/)) {\n      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,\n          key, true));\n    }\n  });\n  return output;\n}\n\n\nfunction formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {\n  var name, str, desc;\n  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };\n  if (desc.get) {\n    if (desc.set) {\n      str = ctx.stylize('[Getter/Setter]', 'special');\n    } else {\n      str = ctx.stylize('[Getter]', 'special');\n    }\n  } else {\n    if (desc.set) {\n      str = ctx.stylize('[Setter]', 'special');\n    }\n  }\n  if (!hasOwnProperty(visibleKeys, key)) {\n    name = '[' + key + ']';\n  }\n  if (!str) {\n    if (ctx.seen.indexOf(desc.value) < 0) {\n      if (isNull(recurseTimes)) {\n        str = formatValue(ctx, desc.value, null);\n      } else {\n        str = formatValue(ctx, desc.value, recurseTimes - 1);\n      }\n      if (str.indexOf('\\n') > -1) {\n        if (array) {\n          str = str.split('\\n').map(function(line) {\n            return '  ' + line;\n          }).join('\\n').substr(2);\n        } else {\n          str = '\\n' + str.split('\\n').map(function(line) {\n            return '   ' + line;\n          }).join('\\n');\n        }\n      }\n    } else {\n      str = ctx.stylize('[Circular]', 'special');\n    }\n  }\n  if (isUndefined(name)) {\n    if (array && key.match(/^\\d+$/)) {\n      return str;\n    }\n    name = JSON.stringify('' + key);\n    if (name.match(/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)) {\n      name = name.substr(1, name.length - 2);\n      name = ctx.stylize(name, 'name');\n    } else {\n      name = name.replace(/'/g, \"\\\\'\")\n                 .replace(/\\\\\"/g, '\"')\n                 .replace(/(^\"|\"$)/g, \"'\");\n      name = ctx.stylize(name, 'string');\n    }\n  }\n\n  return name + ': ' + str;\n}\n\n\nfunction reduceToSingleString(output, base, braces) {\n  var numLinesEst = 0;\n  var length = output.reduce(function(prev, cur) {\n    numLinesEst++;\n    if (cur.indexOf('\\n') >= 0) numLinesEst++;\n    return prev + cur.replace(/\\u001b\\[\\d\\d?m/g, '').length + 1;\n  }, 0);\n\n  if (length > 60) {\n    return braces[0] +\n           (base === '' ? '' : base + '\\n ') +\n           ' ' +\n           output.join(',\\n  ') +\n           ' ' +\n           braces[1];\n  }\n\n  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];\n}\n\n\n// NOTE: These type checking functions intentionally don't use `instanceof`\n// because it is fragile and can be easily faked with `Object.create()`.\nfunction isArray(ar) {\n  return Array.isArray(ar);\n}\nexports.isArray = isArray;\n\nfunction isBoolean(arg) {\n  return typeof arg === 'boolean';\n}\nexports.isBoolean = isBoolean;\n\nfunction isNull(arg) {\n  return arg === null;\n}\nexports.isNull = isNull;\n\nfunction isNullOrUndefined(arg) {\n  return arg == null;\n}\nexports.isNullOrUndefined = isNullOrUndefined;\n\nfunction isNumber(arg) {\n  return typeof arg === 'number';\n}\nexports.isNumber = isNumber;\n\nfunction isString(arg) {\n  return typeof arg === 'string';\n}\nexports.isString = isString;\n\nfunction isSymbol(arg) {\n  return typeof arg === 'symbol';\n}\nexports.isSymbol = isSymbol;\n\nfunction isUndefined(arg) {\n  return arg === void 0;\n}\nexports.isUndefined = isUndefined;\n\nfunction isRegExp(re) {\n  return isObject(re) && objectToString(re) === '[object RegExp]';\n}\nexports.isRegExp = isRegExp;\n\nfunction isObject(arg) {\n  return typeof arg === 'object' && arg !== null;\n}\nexports.isObject = isObject;\n\nfunction isDate(d) {\n  return isObject(d) && objectToString(d) === '[object Date]';\n}\nexports.isDate = isDate;\n\nfunction isError(e) {\n  return isObject(e) &&\n      (objectToString(e) === '[object Error]' || e instanceof Error);\n}\nexports.isError = isError;\n\nfunction isFunction(arg) {\n  return typeof arg === 'function';\n}\nexports.isFunction = isFunction;\n\nfunction isPrimitive(arg) {\n  return arg === null ||\n         typeof arg === 'boolean' ||\n         typeof arg === 'number' ||\n         typeof arg === 'string' ||\n         typeof arg === 'symbol' ||  // ES6 symbol\n         typeof arg === 'undefined';\n}\nexports.isPrimitive = isPrimitive;\n\nexports.isBuffer = require('./support/isBuffer');\n\nfunction objectToString(o) {\n  return Object.prototype.toString.call(o);\n}\n\n\nfunction pad(n) {\n  return n < 10 ? '0' + n.toString(10) : n.toString(10);\n}\n\n\nvar months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',\n              'Oct', 'Nov', 'Dec'];\n\n// 26 Feb 16:19:34\nfunction timestamp() {\n  var d = new Date();\n  var time = [pad(d.getHours()),\n              pad(d.getMinutes()),\n              pad(d.getSeconds())].join(':');\n  return [d.getDate(), months[d.getMonth()], time].join(' ');\n}\n\n\n// log is just a thin wrapper to console.log that prepends a timestamp\nexports.log = function() {\n  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));\n};\n\n\n/**\n * Inherit the prototype methods from one constructor into another.\n *\n * The Function.prototype.inherits from lang.js rewritten as a standalone\n * function (not on Function.prototype). NOTE: If this file is to be loaded\n * during bootstrapping this function needs to be rewritten using some native\n * functions as prototype setup using normal JavaScript does not work as\n * expected during bootstrapping (see mirror.js in r114903).\n *\n * @param {function} ctor Constructor function which needs to inherit the\n *     prototype.\n * @param {function} superCtor Constructor function to inherit prototype from.\n */\nexports.inherits = require('inherits');\n\nexports._extend = function(origin, add) {\n  // Don't do anything if add isn't an object\n  if (!add || !isObject(add)) return origin;\n\n  var keys = Object.keys(add);\n  var i = keys.length;\n  while (i--) {\n    origin[keys[i]] = add[keys[i]];\n  }\n  return origin;\n};\n\nfunction hasOwnProperty(obj, prop) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"./support/isBuffer\":75,\"_process\":56,\"inherits\":74}]},{},[1]);\n"

/***/ }),

/***/ "./node_modules/script-loader/addScript.js":
/*!*************************************************!*\
  !*** ./node_modules/script-loader/addScript.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	function log(error) {
		(typeof console !== "undefined")
		&& (console.error || console.log)("[Script Loader]", error);
	}

	// Check for IE =< 8
	function isIE() {
		return typeof attachEvent !== "undefined" && typeof addEventListener === "undefined";
	}

	try {
		if (typeof execScript !== "undefined" && isIE()) {
			execScript(src);
		} else if (typeof eval !== "undefined") {
			eval.call(null, src);
		} else {
			log("EvalError: No eval function available");
		}
	} catch (error) {
		log(error);
	}
}


/***/ }),

/***/ "./node_modules/script-loader/index.js!./node_modules/mocha/mocha.js":
/*!******************************************************************!*\
  !*** ./node_modules/script-loader!./node_modules/mocha/mocha.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! !./node_modules/script-loader/addScript.js */ "./node_modules/script-loader/addScript.js")(__webpack_require__(/*! !./node_modules/raw-loader!./node_modules/mocha/mocha.js */ "./node_modules/raw-loader/index.js!./node_modules/mocha/mocha.js"))

/***/ }),

/***/ "./node_modules/type-detect/type-detect.js":
/*!*************************************************!*\
  !*** ./node_modules/type-detect/type-detect.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

/* !
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var promiseExists = typeof Promise === 'function';

/* eslint-disable no-undef */
var globalObject = typeof self === 'object' ? self : global; // eslint-disable-line id-blacklist

var symbolExists = typeof Symbol !== 'undefined';
var mapExists = typeof Map !== 'undefined';
var setExists = typeof Set !== 'undefined';
var weakMapExists = typeof WeakMap !== 'undefined';
var weakSetExists = typeof WeakSet !== 'undefined';
var dataViewExists = typeof DataView !== 'undefined';
var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
var toStringLeftSliceLength = 8;
var toStringRightSliceLength = -1;
/**
 * ### typeOf (obj)
 *
 * Uses `Object.prototype.toString` to determine the type of an object,
 * normalising behaviour across engine versions & well optimised.
 *
 * @param {Mixed} object
 * @return {String} object type
 * @api public
 */
function typeDetect(obj) {
  /* ! Speed optimisation
   * Pre:
   *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
   *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
   *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
   *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
   *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
   * Post:
   *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
   *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
   *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
   *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
   *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
   */
  var typeofObj = typeof obj;
  if (typeofObj !== 'object') {
    return typeofObj;
  }

  /* ! Speed optimisation
   * Pre:
   *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
   * Post:
   *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
   */
  if (obj === null) {
    return 'null';
  }

  /* ! Spec Conformance
   * Test: `Object.prototype.toString.call(window)``
   *  - Node === "[object global]"
   *  - Chrome === "[object global]"
   *  - Firefox === "[object Window]"
   *  - PhantomJS === "[object Window]"
   *  - Safari === "[object Window]"
   *  - IE 11 === "[object Window]"
   *  - IE Edge === "[object Window]"
   * Test: `Object.prototype.toString.call(this)``
   *  - Chrome Worker === "[object global]"
   *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
   *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
   *  - IE 11 Worker === "[object WorkerGlobalScope]"
   *  - IE Edge Worker === "[object WorkerGlobalScope]"
   */
  if (obj === globalObject) {
    return 'global';
  }

  /* ! Speed optimisation
   * Pre:
   *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
   * Post:
   *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
   */
  if (
    Array.isArray(obj) &&
    (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))
  ) {
    return 'Array';
  }

  // Not caching existence of `window` and related properties due to potential
  // for `window` to be unset before tests in quasi-browser environments.
  if (typeof window === 'object' && window !== null) {
    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/browsers.html#location)
     * WhatWG HTML$7.7.3 - The `Location` interface
     * Test: `Object.prototype.toString.call(window.location)``
     *  - IE <=11 === "[object Object]"
     *  - IE Edge <=13 === "[object Object]"
     */
    if (typeof window.location === 'object' && obj === window.location) {
      return 'Location';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/#document)
     * WhatWG HTML$3.1.1 - The `Document` object
     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
     *       which suggests that browsers should use HTMLTableCellElement for
     *       both TD and TH elements. WhatWG separates these.
     *       WhatWG HTML states:
     *         > For historical reasons, Window objects must also have a
     *         > writable, configurable, non-enumerable property named
     *         > HTMLDocument whose value is the Document interface object.
     * Test: `Object.prototype.toString.call(document)``
     *  - Chrome === "[object HTMLDocument]"
     *  - Firefox === "[object HTMLDocument]"
     *  - Safari === "[object HTMLDocument]"
     *  - IE <=10 === "[object Document]"
     *  - IE 11 === "[object HTMLDocument]"
     *  - IE Edge <=13 === "[object HTMLDocument]"
     */
    if (typeof window.document === 'object' && obj === window.document) {
      return 'Document';
    }

    if (typeof window.navigator === 'object') {
      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
       * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
       *  - IE <=10 === "[object MSMimeTypesCollection]"
       */
      if (typeof window.navigator.mimeTypes === 'object' &&
          obj === window.navigator.mimeTypes) {
        return 'MimeTypeArray';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
       * Test: `Object.prototype.toString.call(navigator.plugins)``
       *  - IE <=10 === "[object MSPluginsCollection]"
       */
      if (typeof window.navigator.plugins === 'object' &&
          obj === window.navigator.plugins) {
        return 'PluginArray';
      }
    }

    if ((typeof window.HTMLElement === 'function' ||
        typeof window.HTMLElement === 'object') &&
        obj instanceof window.HTMLElement) {
      /* ! Spec Conformance
      * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
      * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
      * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
      *  - IE <=10 === "[object HTMLBlockElement]"
      */
      if (obj.tagName === 'BLOCKQUOTE') {
        return 'HTMLQuoteElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltabledatacellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('td'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TD') {
        return 'HTMLTableDataCellElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltableheadercellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('th'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TH') {
        return 'HTMLTableHeaderCellElement';
      }
    }
  }

  /* ! Speed optimisation
  * Pre:
  *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
  *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
  *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
  *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
  *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
  *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
  *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
  *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
  *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
  * Post:
  *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
  *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
  *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
  *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
  *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
  *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
  *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
  *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
  *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
  */
  var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
  if (typeof stringTag === 'string') {
    return stringTag;
  }

  var objPrototype = Object.getPrototypeOf(obj);
  /* ! Speed optimisation
  * Pre:
  *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
  *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
  * Post:
  *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
  *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
  */
  if (objPrototype === RegExp.prototype) {
    return 'RegExp';
  }

  /* ! Speed optimisation
  * Pre:
  *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
  * Post:
  *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
  */
  if (objPrototype === Date.prototype) {
    return 'Date';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
   * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
   * Test: `Object.prototype.toString.call(Promise.resolve())``
   *  - Chrome <=47 === "[object Object]"
   *  - Edge <=20 === "[object Object]"
   *  - Firefox 29-Latest === "[object Promise]"
   *  - Safari 7.1-Latest === "[object Promise]"
   */
  if (promiseExists && objPrototype === Promise.prototype) {
    return 'Promise';
  }

  /* ! Speed optimisation
  * Pre:
  *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
  * Post:
  *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
  */
  if (setExists && objPrototype === Set.prototype) {
    return 'Set';
  }

  /* ! Speed optimisation
  * Pre:
  *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
  * Post:
  *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
  */
  if (mapExists && objPrototype === Map.prototype) {
    return 'Map';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
  * Post:
  *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
  */
  if (weakSetExists && objPrototype === WeakSet.prototype) {
    return 'WeakSet';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
  * Post:
  *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
  */
  if (weakMapExists && objPrototype === WeakMap.prototype) {
    return 'WeakMap';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
   * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
   * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
   *  - Edge <=13 === "[object Object]"
   */
  if (dataViewExists && objPrototype === DataView.prototype) {
    return 'DataView';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
   * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
   * Test: `Object.prototype.toString.call(new Map().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (mapExists && objPrototype === mapIteratorPrototype) {
    return 'Map Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
   * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
   * Test: `Object.prototype.toString.call(new Set().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (setExists && objPrototype === setIteratorPrototype) {
    return 'Set Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
   * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
   * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
    return 'Array Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
   * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
   * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
    return 'String Iterator';
  }

  /* ! Speed optimisation
  * Pre:
  *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
  * Post:
  *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
  */
  if (objPrototype === null) {
    return 'Object';
  }

  return Object
    .prototype
    .toString
    .call(obj)
    .slice(toStringLeftSliceLength, toStringRightSliceLength);
}

return typeDetect;

})));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });