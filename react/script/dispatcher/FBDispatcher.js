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

function Dispatcher() {
    _classCallCheck(this, Dispatcher);
    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
	this._prefix=0;
	

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */

	this.register=function (callback) {
      var id = this._prefix + this._lastID++;
      this._callbacks[id] = callback;
      return id;
    };
	this.unregister=function(id) {
      invariant(this._callbacks[id], 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id);
      delete this._callbacks[id];
    };

    /**
     * Waits for the callbacks specified to be invoked before continuing execution
     * of the current callback. This method should only be used by a callback in
     * response to a dispatched payload.
     */
	this.waitFor=function (ids) {
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
	this.dispatch=function(payload) {
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
    };

    /**
     * Is this Dispatcher currently dispatching.
     */
	this.isDispatching = function() {
      return this._isDispatching;
    };

    /**
     * Call the callback stored with the given id. Also do some internal
     * bookkeeping.
     *
     * @internal
     */
	this._invokeCallback=function(id) {
      this._isPending[id] = true;
      this._callbacks[id](this._pendingPayload);
      this._isHandled[id] = true;
    }

    /**
     * Set up bookkeeping needed when dispatching.
     *
     * @internal
     */
	this._startDispatching=function(payload) {
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
	this._stopDispatching=function() {
      delete this._pendingPayload;
      this._isDispatching = false;
    };
};