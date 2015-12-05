function _createClass() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true; 
			if ('value' in descriptor) 
				descriptor.writable = true; 
			Object.defineProperty(target, descriptor.key, descriptor); 
			} 
		} 
	return function (Constructor, protoProps, staticProps) {
		if (protoProps) 
			defineProperties(Constructor.prototype, protoProps); 
		if (staticProps) defineProperties(Constructor, staticProps); 
			return Constructor; 
	}; 
	};
_createClass();
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);
    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */

  function register(){
  _createClass(Dispatcher, [{
    key: 'register',
    value: function register(callback) {
      var id = _prefix + this._lastID++;
      this._callbacks[id] = callback;
      return id;
    }

    /**
     * Removes a callback based on its token.
     */
  }])};
  _createClass(Dispatcher, [{
    key: 'unregister',
    value: function unregister(id) {
      invariant(this._callbacks[id], 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id);
      delete this._callbacks[id];
    }

    /**
     * Waits for the callbacks specified to be invoked before continuing execution
     * of the current callback. This method should only be used by a callback in
     * response to a dispatched payload.
     */
  }, {
    key: 'waitFor',
    value: function waitFor(ids) {
      invariant(this._isDispatching, 'Dispatcher.waitFor(...): Must be invoked while dispatching.');
      for (var ii = 0; ii < ids.length; ii++) {
        var id = ids[ii];
        if (this._isPending[id]) {
          invariant(this._isHandled[id], 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id);
          continue;
        }
        invariant(this._callbacks[id], 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id);
        this._invokeCallback(id);
      }
    }

    /**
     * Dispatches a payload to all registered callbacks.
     */
  }, {
    key: 'dispatch',
    value: function dispatch(payload) {
      invariant(!this._isDispatching, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.');
      this._startDispatching(payload);
      try {
        for (var id in this._callbacks) {
          if (this._isPending[id]) {
            continue;
          }
          this._invokeCallback(id);
        }
      } finally {
        this._stopDispatching();
      }
    }

    /**
     * Is this Dispatcher currently dispatching.
     */
  }, {
    key: 'isDispatching',
    value: function isDispatching() {
      return this._isDispatching;
    }

    /**
     * Call the callback stored with the given id. Also do some internal
     * bookkeeping.
     *
     * @internal
     */
  }, {
    key: '_invokeCallback',
    value: function _invokeCallback(id) {
      this._isPending[id] = true;
      this._callbacks[id](this._pendingPayload);
      this._isHandled[id] = true;
    }

    /**
     * Set up bookkeeping needed when dispatching.
     *
     * @internal
     */
  }, {
    key: '_startDispatching',
    value: function _startDispatching(payload) {
      for (var id in this._callbacks) {
        this._isPending[id] = false;
        this._isHandled[id] = false;
      }
      this._pendingPayload = payload;
      this._isDispatching = true;
    }

    /**
     * Clear bookkeeping used for dispatching.
     *
     * @internal
     */
  }, {
    key: '_stopDispatching',
    value: function _stopDispatching() {
      delete this._pendingPayload;
      this._isDispatching = false;
    }
  }]);

  return Dispatcher;
})();