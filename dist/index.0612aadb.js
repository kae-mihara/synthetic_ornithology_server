// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"j0yVw":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "2b54850c0612aadb";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else if ('reload' in location) location.reload();
            else {
                // Web extension context
                var ext = typeof chrome === 'undefined' ? typeof browser === 'undefined' ? null : browser : chrome;
                if (ext && ext.runtime && ext.runtime.reload) ext.runtime.reload();
            }
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"h3bXz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MarkerCluster", ()=>MarkerCluster
);
var MarkerCluster = L.MarkerCluster = L.Marker.extend({
    options: L.Icon.prototype.options,
    initialize: function(group, zoom, a, b) {
        L.Marker.prototype.initialize.call(this, a ? a._cLatLng || a.getLatLng() : new L.LatLng(0, 0), {
            icon: this,
            pane: group.options.clusterPane
        });
        this._group = group;
        this._zoom = zoom;
        this._markers = [];
        this._childClusters = [];
        this._childCount = 0;
        this._iconNeedsUpdate = true;
        this._boundsNeedUpdate = true;
        this._bounds = new L.LatLngBounds();
        if (a) this._addChild(a);
        if (b) this._addChild(b);
    },
    //Recursively retrieve all child markers of this cluster
    getAllChildMarkers: function(storageArray, ignoreDraggedMarker) {
        storageArray = storageArray || [];
        for(var i = this._childClusters.length - 1; i >= 0; i--)this._childClusters[i].getAllChildMarkers(storageArray, ignoreDraggedMarker);
        for(var j = this._markers.length - 1; j >= 0; j--){
            if (ignoreDraggedMarker && this._markers[j].__dragStart) continue;
            storageArray.push(this._markers[j]);
        }
        return storageArray;
    },
    //Returns the count of how many child markers we have
    getChildCount: function() {
        return this._childCount;
    },
    //Zoom to the minimum of showing all of the child markers, or the extents of this cluster
    zoomToBounds: function(fitBoundsOptions) {
        var childClusters = this._childClusters.slice(), map = this._group._map, boundsZoom = map.getBoundsZoom(this._bounds), zoom = this._zoom + 1, mapZoom = map.getZoom(), i;
        //calculate how far we need to zoom down to see all of the markers
        while(childClusters.length > 0 && boundsZoom > zoom){
            zoom++;
            var newClusters = [];
            for(i = 0; i < childClusters.length; i++)newClusters = newClusters.concat(childClusters[i]._childClusters);
            childClusters = newClusters;
        }
        if (boundsZoom > zoom) this._group._map.setView(this._latlng, zoom);
        else if (boundsZoom <= mapZoom) this._group._map.setView(this._latlng, mapZoom + 1);
        else this._group._map.fitBounds(this._bounds, fitBoundsOptions);
    },
    getBounds: function() {
        var bounds = new L.LatLngBounds();
        bounds.extend(this._bounds);
        return bounds;
    },
    _updateIcon: function() {
        this._iconNeedsUpdate = true;
        if (this._icon) this.setIcon(this);
    },
    //Cludge for Icon, we pretend to be an icon for performance
    createIcon: function() {
        if (this._iconNeedsUpdate) {
            this._iconObj = this._group.options.iconCreateFunction(this);
            this._iconNeedsUpdate = false;
        }
        return this._iconObj.createIcon();
    },
    createShadow: function() {
        return this._iconObj.createShadow();
    },
    _addChild: function(new1, isNotificationFromChild) {
        this._iconNeedsUpdate = true;
        this._boundsNeedUpdate = true;
        this._setClusterCenter(new1);
        if (new1 instanceof L.MarkerCluster) {
            if (!isNotificationFromChild) {
                this._childClusters.push(new1);
                new1.__parent = this;
            }
            this._childCount += new1._childCount;
        } else {
            if (!isNotificationFromChild) this._markers.push(new1);
            this._childCount++;
        }
        if (this.__parent) this.__parent._addChild(new1, true);
    },
    /**
	 * Makes sure the cluster center is set. If not, uses the child center if it is a cluster, or the marker position.
	 * @param child L.MarkerCluster|L.Marker that will be used as cluster center if not defined yet.
	 * @private
	 */ _setClusterCenter: function(child) {
        if (!this._cLatLng) // when clustering, take position of the first point as the cluster center
        this._cLatLng = child._cLatLng || child._latlng;
    },
    /**
	 * Assigns impossible bounding values so that the next extend entirely determines the new bounds.
	 * This method avoids having to trash the previous L.LatLngBounds object and to create a new one, which is much slower for this class.
	 * As long as the bounds are not extended, most other methods would probably fail, as they would with bounds initialized but not extended.
	 * @private
	 */ _resetBounds: function() {
        var bounds = this._bounds;
        if (bounds._southWest) {
            bounds._southWest.lat = Infinity;
            bounds._southWest.lng = Infinity;
        }
        if (bounds._northEast) {
            bounds._northEast.lat = -Infinity;
            bounds._northEast.lng = -Infinity;
        }
    },
    _recalculateBounds: function() {
        var markers = this._markers, childClusters = this._childClusters, latSum = 0, lngSum = 0, totalCount = this._childCount, i, child, childLatLng, childCount;
        // Case where all markers are removed from the map and we are left with just an empty _topClusterLevel.
        if (totalCount === 0) return;
        // Reset rather than creating a new object, for performance.
        this._resetBounds();
        // Child markers.
        for(i = 0; i < markers.length; i++){
            childLatLng = markers[i]._latlng;
            this._bounds.extend(childLatLng);
            latSum += childLatLng.lat;
            lngSum += childLatLng.lng;
        }
        // Child clusters.
        for(i = 0; i < childClusters.length; i++){
            child = childClusters[i];
            // Re-compute child bounds and weighted position first if necessary.
            if (child._boundsNeedUpdate) child._recalculateBounds();
            this._bounds.extend(child._bounds);
            childLatLng = child._wLatLng;
            childCount = child._childCount;
            latSum += childLatLng.lat * childCount;
            lngSum += childLatLng.lng * childCount;
        }
        this._latlng = this._wLatLng = new L.LatLng(latSum / totalCount, lngSum / totalCount);
        // Reset dirty flag.
        this._boundsNeedUpdate = false;
    },
    //Set our markers position as given and add it to the map
    _addToMap: function(startPos) {
        if (startPos) {
            this._backupLatlng = this._latlng;
            this.setLatLng(startPos);
        }
        this._group._featureGroup.addLayer(this);
    },
    _recursivelyAnimateChildrenIn: function(bounds, center, maxZoom) {
        this._recursively(bounds, this._group._map.getMinZoom(), maxZoom - 1, function(c) {
            var markers = c._markers, i, m;
            for(i = markers.length - 1; i >= 0; i--){
                m = markers[i];
                //Only do it if the icon is still on the map
                if (m._icon) {
                    m._setPos(center);
                    m.clusterHide();
                }
            }
        }, function(c) {
            var childClusters = c._childClusters, j, cm;
            for(j = childClusters.length - 1; j >= 0; j--){
                cm = childClusters[j];
                if (cm._icon) {
                    cm._setPos(center);
                    cm.clusterHide();
                }
            }
        });
    },
    _recursivelyAnimateChildrenInAndAddSelfToMap: function(bounds, mapMinZoom, previousZoomLevel, newZoomLevel) {
        this._recursively(bounds, newZoomLevel, mapMinZoom, function(c) {
            c._recursivelyAnimateChildrenIn(bounds, c._group._map.latLngToLayerPoint(c.getLatLng()).round(), previousZoomLevel);
            //TODO: depthToAnimateIn affects _isSingleParent, if there is a multizoom we may/may not be.
            //As a hack we only do a animation free zoom on a single level zoom, if someone does multiple levels then we always animate
            if (c._isSingleParent() && previousZoomLevel - 1 === newZoomLevel) {
                c.clusterShow();
                c._recursivelyRemoveChildrenFromMap(bounds, mapMinZoom, previousZoomLevel); //Immediately remove our children as we are replacing them. TODO previousBounds not bounds
            } else c.clusterHide();
            c._addToMap();
        });
    },
    _recursivelyBecomeVisible: function(bounds, zoomLevel) {
        this._recursively(bounds, this._group._map.getMinZoom(), zoomLevel, null, function(c) {
            c.clusterShow();
        });
    },
    _recursivelyAddChildrenToMap: function(startPos, zoomLevel, bounds) {
        this._recursively(bounds, this._group._map.getMinZoom() - 1, zoomLevel, function(c) {
            if (zoomLevel === c._zoom) return;
            //Add our child markers at startPos (so they can be animated out)
            for(var i = c._markers.length - 1; i >= 0; i--){
                var nm = c._markers[i];
                if (!bounds.contains(nm._latlng)) continue;
                if (startPos) {
                    nm._backupLatlng = nm.getLatLng();
                    nm.setLatLng(startPos);
                    if (nm.clusterHide) nm.clusterHide();
                }
                c._group._featureGroup.addLayer(nm);
            }
        }, function(c) {
            c._addToMap(startPos);
        });
    },
    _recursivelyRestoreChildPositions: function(zoomLevel) {
        //Fix positions of child markers
        for(var i = this._markers.length - 1; i >= 0; i--){
            var nm = this._markers[i];
            if (nm._backupLatlng) {
                nm.setLatLng(nm._backupLatlng);
                delete nm._backupLatlng;
            }
        }
        if (zoomLevel - 1 === this._zoom) //Reposition child clusters
        for(var j = this._childClusters.length - 1; j >= 0; j--)this._childClusters[j]._restorePosition();
        else for(var k = this._childClusters.length - 1; k >= 0; k--)this._childClusters[k]._recursivelyRestoreChildPositions(zoomLevel);
    },
    _restorePosition: function() {
        if (this._backupLatlng) {
            this.setLatLng(this._backupLatlng);
            delete this._backupLatlng;
        }
    },
    //exceptBounds: If set, don't remove any markers/clusters in it
    _recursivelyRemoveChildrenFromMap: function(previousBounds, mapMinZoom, zoomLevel, exceptBounds) {
        var m, i;
        this._recursively(previousBounds, mapMinZoom - 1, zoomLevel - 1, function(c) {
            //Remove markers at every level
            for(i = c._markers.length - 1; i >= 0; i--){
                m = c._markers[i];
                if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
                    c._group._featureGroup.removeLayer(m);
                    if (m.clusterShow) m.clusterShow();
                }
            }
        }, function(c) {
            //Remove child clusters at just the bottom level
            for(i = c._childClusters.length - 1; i >= 0; i--){
                m = c._childClusters[i];
                if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
                    c._group._featureGroup.removeLayer(m);
                    if (m.clusterShow) m.clusterShow();
                }
            }
        });
    },
    //Run the given functions recursively to this and child clusters
    // boundsToApplyTo: a L.LatLngBounds representing the bounds of what clusters to recurse in to
    // zoomLevelToStart: zoom level to start running functions (inclusive)
    // zoomLevelToStop: zoom level to stop running functions (inclusive)
    // runAtEveryLevel: function that takes an L.MarkerCluster as an argument that should be applied on every level
    // runAtBottomLevel: function that takes an L.MarkerCluster as an argument that should be applied at only the bottom level
    _recursively: function(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel) {
        var childClusters = this._childClusters, zoom = this._zoom, i, c;
        if (zoomLevelToStart <= zoom) {
            if (runAtEveryLevel) runAtEveryLevel(this);
            if (runAtBottomLevel && zoom === zoomLevelToStop) runAtBottomLevel(this);
        }
        if (zoom < zoomLevelToStart || zoom < zoomLevelToStop) for(i = childClusters.length - 1; i >= 0; i--){
            c = childClusters[i];
            if (c._boundsNeedUpdate) c._recalculateBounds();
            if (boundsToApplyTo.intersects(c._bounds)) c._recursively(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel);
        }
    },
    //Returns true if we are the parent of only one cluster and that cluster is the same as us
    _isSingleParent: function() {
        //Don't need to check this._markers as the rest won't work if there are any
        return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount;
    }
});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["j0yVw","h3bXz"], "h3bXz", "parcelRequire2ac3")

//# sourceMappingURL=index.0612aadb.js.map
