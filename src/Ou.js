/*!
 * OuJS is simple wrapper for Vanilla Js.
 *
 * Version: %%GULP_INJECT_VERSION%%
 * Author: Dmitri Smirnov <http://www.whoop.ee>
 * Licence: MIT
 */

// Check if Ou is already defined.
if (typeof Ou !== 'undefined') {
  console.warn('$Ou was already defined');
}

/**
 * Ou library main class. Used ES5 to support ugly IE.
 *
 * @class
 * @public
 */
function __Ou__() {

  /**
   * Get a document Element. If not found returns null.
   * Wrapper of document.querySelector()
   *
   * @param {string} selector Standard selector like in document.querySelector
   * @public
   * @return {Element|null}
   */
  this.g = function (selector) {
    return document.querySelector(selector);
  };

  /**
   * Get HTML Elements.
   * Wrapper of document.querySelectorAll()
   *
   * @public
   * @param {string}
   * @return {Array}
   */
  this.gal = function (selector) {
    return document.querySelectorAll(selector);
  };

  /**
   * Checks that current broswers suppors given feature.
   *
   * @public
   * @param  {string}
   * @return {boolean}
   */
  this.supports = function (feature) {
    return feature in window && window[feature] !== null;
  };

  /**
   * Makes ajax request wrapper. Simple AJAX wrapper
   *
   * TODO: https://blog.garstasio.com/you-dont-need-jquery/ajax/
   *
   * @public
   * @param  {Object} params
   * @return {void}
   */
  this.ajax = function (params) {
    var opts = {},     // Options
        self = this,   // Self reference
        query = '',    // Query string
        xhr;           // Variable for XMLHttpRequest

    // AJAX Params.
    // URL to be requested.
    opts.url     = params.url;

    // HTTP Method
    opts.method  = params.method   || 'GET';

    // Success callback
    opts.success = params.success  || function (xhr) {};

    // Error callback
    opts.error   = params.error    ||
           function (xhr) { throw self.exception('AJAX error ' + xhr.status); };

    // Is request asynchronized
    opts.async   = params.async    || true;

    // Request data. Should be object
    opts.data    = params.data     || {};

    // Auth user
    opts.user    = params.user     || null;

    // Auth password
    opts.pwd     = params.password || null;

    // Content type of request. Accepts values 'html', 'json', 'file'.
    // Default is 'html'.
    // I really don't want to make support for JSONP, due to security issue.
    // Use other librarier to make JSONP work.
    opts.type    = params.type     || 'html';

    // IF content type is file. Send file field.
    opts.file    = params.file     || null;

    // CORS. Cross Origin Resource Sharing enabled/disabled
    // To make old IE 8/9 to work with CORS. Use XDomainRequest, but I don't
    // want ot support ancient IEs.
    opts.cors    = params.cors     || false;

    // Crete XMLHttpRequest instance.
    xhr = new XMLHttpRequest();

    // Check the status of XMLHttpRequest. Does request succeded or failed.
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          opts.success(xhr);
        } else {
          opts.error(xhr);
        }
      }
    };

    // Open XMLHttpRequest
    xhr.open(opts.method, opts.url, opts.async, opts.user, opts.pwd);

    // Set POST request related HTTP header.
    if ('POST' === opts.method.toUpperCase() && opts.type !== 'file' && opts.type !== 'json') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    // If CORS is enabled set creditials to true.
    if (opts.cors) {
      xhr.withCredentials = true;
    }

    // Make assignments dependings on data types.
    if (opts.type === 'json') {
      xhr.setRequestHeader('Content-Type', 'application/json');
      query = JSON.stringify(opts.data);
    }
    else if (opts.type === 'file') {
      if (opts.file !== null) {
        query = opts.file;
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      }
    }
    else {
      query = Object.keys(opts.data).map(
      function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(opts.data[key]);
      }).join('&');
    }

    // Server should know that request id one with XMLHttpRequest.
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // Send XMLHttpRequest
    xhr.send(query);
  };

  this.exception = function(msg) {
    return 'OuJS Exception: ' + msg;
  };
}

/*
 ========================  Extensions of Element.
*/
/**
 * Toggle class of HTMLElement.
 *
 * @param  {string}
 * @return {void}
 */
HTMLElement.prototype.tcls = function (clsname) {
  this.classList.toggle(clsname);
};

/**
 * Add class(es) to HTMLElement, arguments can be passed comma
 * separated.
 *
 * @param  {Array<string>}
 * @return {void}
 */
HTMLElement.prototype.acls = function (cls) {
  var i = arguments.length;
  while(i--) {
    this.classList.add(arguments[i]);
  }
};

/**
 * Remove class(es) to HTMLElement, arguments can be passed comma
 * separated.
 *
 * @param  {Array<string>}
 * @return {void}
 */
HTMLElement.prototype.rcls = function (cls) {
  var i = arguments.length;
  while(i--) {
    this.classList.remove(arguments[i]);
  }
};

/**
 * Checks that HTMLElement has class
 *
 * @param  {string}
 * @return {boolean}
 */
HTMLElement.prototype.hcls = function (cls) {
  return this.classList.contains(cls);
};

/**
 * Add attribure to HTMLElement.
 *
 * @param  {string}
 * @param  {string|number|boolean}
 * @return {void}
 */
HTMLElement.prototype.aatr = function (n, v) {
  this.setAttribute(n, v);
};

/**
 * Remove attribute from HTMLElement.
 *
 * @param  {string}
 * @return {void}
 */
HTMLElement.prototype.ratr = function (n) {
  this.removeAttribute(n);
};

/**
 * Get value of attribute of HTMLElement.
 *
 * @param  {string}
 * @return {string}
 */
HTMLElement.prototype.gatr = function (n) {
  return this.getAttribute(n);
};

/**
 * Checks that HTMLElement has attribute.
 *
 * @param  {string}
 * @return {boolean}
 */
HTMLElement.prototype.hatr = function (n) {
  return this.hasAttribute(n);
};

/**
 * Remove current element.
 * Due to IE doesn't support remove() method. Use work around
 * through parentNode.
 *
 * @param  {string}
 * @return {void}
 */
HTMLElement.prototype.relm = function () {
  return this.parentNode.removeChild(this);
};