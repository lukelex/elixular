import Utils from "./utils";

var markAtRange = function(string, index, range) {
  return string.substr(0, index) +
          '<mark>' +
          string.substr(index, range) +
          '</mark>' +
          string.substr(index + range);
}

class ColorMarker {
  constructor(options) {
    options || (options = {});

    var _this = this;

    Utils.objExtend(_this, options);

    var selector = _this.el;

    if (!selector) return _this;

    _this.el = document.querySelectorAll(selector)[0];

    if (!_this.el) return _this;

    _this.initialize && _this.initialize();
  }

  update(value, matches) {
    var colorRanges = this._getRanges(matches);
    var markup = value;
    colorRanges.forEach(function(range) {
      markup = markAtRange(markup, range[0], range[1]);
    });

    this.el.innerHTML = markup;
  }

  clean() {
    this.el.innerHTML = '';
  }

  _getRanges(matches) {
    var colorRanges = [];

    matches.reverse().forEach(function(match) {
      var fromIndex = match.range[0];
      var toIndex = match.range[0] + (match.range[1] - 1);
      var lastRangeIndex = (colorRanges.length - 1);

      if (lastRangeIndex >= 0 && colorRanges[lastRangeIndex][0] <= toIndex) {
        colorRanges[lastRangeIndex][0] = fromIndex;
        colorRanges[lastRangeIndex][1] += match.range[1];
        return false;
      }

      colorRanges.push(match.range);
    });

    return colorRanges;
  }

  _colorRanges(value, ranges) {

  }
}

export default ColorMarker;
