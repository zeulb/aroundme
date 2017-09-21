"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require('prop-types');
var isEqual = require('deep-equal');
var diff_1 = require("./util/diff");
var uid_1 = require("./util/uid");
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hover = [];
        _this.isDragging = false;
        _this.draggedChildren = undefined;
        _this.id = _this.props.id || "layer-" + uid_1.generateID();
        _this.source = __assign({ type: 'geojson' }, _this.props.sourceOptions, { data: {
                type: 'FeatureCollection',
                features: []
            } });
        _this.geometry = function (coordinates) {
            switch (_this.props.type) {
                case 'symbol':
                case 'circle':
                    return {
                        type: 'Point',
                        coordinates: coordinates
                    };
                case 'fill':
                    return {
                        type: coordinates.length > 1 ? 'MultiPolygon' : 'Polygon',
                        coordinates: coordinates
                    };
                case 'line':
                    return {
                        type: 'LineString',
                        coordinates: coordinates
                    };
                default:
                    return {
                        type: 'Point',
                        coordinates: coordinates
                    };
            }
        };
        _this.makeFeature = function (props, id) { return ({
            type: 'Feature',
            geometry: _this.geometry(props.coordinates),
            properties: __assign({}, props.properties, { id: id })
        }); };
        _this.onClick = function (evt) {
            var features = evt.features;
            var children = _this.getChildren();
            var map = _this.context.map;
            if (features) {
                features.forEach(function (feature) {
                    var id = feature.properties.id;
                    if (children) {
                        var child = children[id];
                        var onClick = child && child.props.onClick;
                        if (onClick) {
                            onClick(__assign({}, evt, { feature: feature, map: map }));
                        }
                    }
                });
            }
        };
        _this.getChildren = function () {
            return [].concat(_this.props.children);
        };
        _this.isHoverDraggable = function (children) {
            return !!_this.hover
                .map(function (id) { return (children[id] ? children[id].props.draggable : false); })
                .filter(Boolean).length;
        };
        _this.onMouseEnter = function (evt) {
            var children = _this.getChildren();
            var map = _this.context.map;
            _this.hover = [];
            evt.features.forEach(function (feature) {
                var id = feature.properties.id;
                if (children) {
                    var child = children[id];
                    _this.hover.push(id);
                    var onMouseEnter = child && child.props.onMouseEnter;
                    if (onMouseEnter) {
                        onMouseEnter(__assign({}, evt, { feature: feature, map: map }));
                    }
                }
            });
            if (_this.isHoverDraggable(children)) {
                map.dragPan.disable();
            }
        };
        _this.onTouchStart = function (evt) {
            evt.originalEvent.preventDefault();
            var children = _this.getChildren();
            var map = _this.context.map;
            _this.hover = [];
            evt.features.forEach(function (feature) {
                var id = feature.properties.id;
                if (children) {
                    var child = children[id];
                    _this.hover.push(id);
                }
            });
            if (_this.isHoverDraggable(children)) {
                _this.isDragging = true;
                map.on('touchmove', _this.onDragMove);
                map.once('touchcancel', _this.onDragUp);
                map.once('touchend', _this.onDragUp);
            }
        };
        _this.onMouseLeave = function (evt) {
            var children = _this.getChildren();
            var map = _this.context.map;
            _this.hover.forEach(function (id) {
                var child = children[id];
                var onMouseLeave = child && child.props.onMouseLeave;
                if (onMouseLeave) {
                    onMouseLeave(__assign({}, evt, { map: map }));
                }
            });
            if (!_this.isDragging) {
                _this.hover = [];
            }
        };
        _this.onMouseDown = function () {
            var map = _this.context.map;
            var children = _this.getChildren();
            var isHoverDraggable = _this.isHoverDraggable(children);
            if (!isHoverDraggable) {
                return;
            }
            _this.isDragging = true;
            map.on('mousemove', _this.onDragMove);
            map.once('mouseup', _this.onDragUp);
        };
        _this.onDragMove = function (_a) {
            var lngLat = _a.lngLat;
            if (!_this.isDragging) {
                return;
            }
            var children = _this.getChildren();
            _this.draggedChildren = children.map(function (child, index) {
                if (_this.hover.includes(index) && child.props.draggable) {
                    return React.cloneElement(child, {
                        coordinates: [lngLat.lng, lngLat.lat]
                    });
                }
                return child;
            });
            _this.forceUpdate();
        };
        _this.onDragUp = function (evt) {
            var map = _this.context.map;
            var children = _this.getChildren();
            _this.isDragging = false;
            _this.draggedChildren = undefined;
            _this.hover.map(function (id) {
                var child = children[id];
                var onDragEnd = child && child.props.onDragEnd;
                if (onDragEnd) {
                    onDragEnd(__assign({}, evt, { map: map }));
                }
            });
            map.off('mousemove', _this.onDragMove);
            map.off('touchmove', _this.onDragMove);
        };
        _this.initialize = function () {
            var _a = _this.props, type = _a.type, layout = _a.layout, paint = _a.paint, layerOptions = _a.layerOptions, sourceId = _a.sourceId, before = _a.before, images = _a.images;
            var map = _this.context.map;
            var layer = __assign({ id: _this.id, source: sourceId || _this.id, type: type,
                layout: layout,
                paint: paint }, layerOptions);
            if (images) {
                var normalizedImages = !Array.isArray(images[0]) ? [images] : images;
                normalizedImages.forEach(function (image) {
                    map.addImage(image[0], image[1], image[2]);
                });
            }
            if (!sourceId) {
                map.addSource(_this.id, _this.source);
            }
            map.addLayer(layer, before);
        };
        _this.onStyleDataChange = function () {
            if (!_this.context.map.getLayer(_this.id)) {
                _this.initialize();
                _this.forceUpdate();
            }
        };
        return _this;
    }
    Layer.prototype.componentWillMount = function () {
        var map = this.context.map;
        this.initialize();
        map.on('click', this.id, this.onClick);
        map.on('mouseenter', this.id, this.onMouseEnter);
        map.on('mouseleave', this.id, this.onMouseLeave);
        map.on('mousedown', this.id, this.onMouseDown);
        map.on('touchstart', this.id, this.onTouchStart);
        map.on('touchcancel', this.id, this.onMouseLeave);
        map.on('touchleave', this.id, this.onMouseLeave);
        map.on('styledata', this.onStyleDataChange);
    };
    Layer.prototype.componentWillUnmount = function () {
        var map = this.context.map;
        var images = this.props.images;
        if (!map || !map.getStyle()) {
            return;
        }
        map.removeLayer(this.id);
        if (!this.props.sourceId) {
            map.removeSource(this.id);
        }
        if (images) {
            var normalizedImages = !Array.isArray(images[0]) ? [images] : images;
            normalizedImages
                .map(function (_a) {
                var key = _a[0], rest = _a.slice(1);
                return key;
            })
                .forEach(map.removeImage);
        }
        map.off('click', this.onClick);
        map.off('mouseenter', this.onMouseEnter);
        map.off('mouseleave', this.onMouseLeave);
        map.off('touchstart', this.onTouchStart);
        map.off('touchcancel', this.onMouseLeave);
        map.off('styledata', this.onStyleDataChange);
    };
    Layer.prototype.componentWillReceiveProps = function (props) {
        var _this = this;
        var _a = this.props, paint = _a.paint, layout = _a.layout, before = _a.before, layerOptions = _a.layerOptions;
        var map = this.context.map;
        if (!isEqual(props.paint, paint)) {
            var paintDiff_1 = diff_1.default(paint, props.paint);
            Object.keys(paintDiff_1).forEach(function (key) {
                map.setPaintProperty(_this.id, key, paintDiff_1[key]);
            });
        }
        if (!isEqual(props.layout, layout)) {
            var layoutDiff_1 = diff_1.default(layout, props.layout);
            Object.keys(layoutDiff_1).forEach(function (key) {
                map.setLayoutProperty(_this.id, key, layoutDiff_1[key]);
            });
        }
        if (props.layerOptions &&
            layerOptions &&
            !isEqual(props.layerOptions.filter, layerOptions.filter)) {
            map.setFilter(this.id, props.layerOptions.filter);
        }
        if (before !== props.before) {
            map.moveLayer(this.id, props.before);
        }
    };
    Layer.prototype.render = function () {
        var _this = this;
        var map = this.context.map;
        var sourceId = this.props.sourceId;
        var children = this.props.children;
        if (!children) {
            children = [];
        }
        if (this.draggedChildren) {
            children = this.draggedChildren;
        }
        else {
            children = Array.isArray(children)
                ? children.reduce(function (arr, next) { return arr.concat(next); }, [])
                : [children];
        }
        var features = children
            .map(function (_a, id) {
            var props = _a.props;
            return _this.makeFeature(props, id);
        })
            .filter(Boolean);
        var source = map.getSource(sourceId || this.id);
        if (source && !sourceId && source.setData) {
            source.setData({
                type: 'FeatureCollection',
                features: features
            });
        }
        return null;
    };
    Layer.contextTypes = {
        map: PropTypes.object
    };
    Layer.defaultProps = {
        type: 'symbol',
        layout: {},
        paint: {}
    };
    return Layer;
}(React.Component));
exports.default = Layer;
//# sourceMappingURL=layer.js.map