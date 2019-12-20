"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _unirest = _interopRequireDefault(require("unirest"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _v = _interopRequireDefault(require("uuid/v4"));

function parsePost(_x, _x2) {
  return _parsePost.apply(this, arguments);
}

function _parsePost() {
  _parsePost = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(url, elems) {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return new Promise(function (resolve, reject) {
              _unirest.default.get(url).then(
              /*#__PURE__*/
              function () {
                var _ref = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee(_ref2) {
                  var body, error, domen, $, title, image, description, view, regions, id, post;
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          body = _ref2.body, error = _ref2.error;
                          if (error) reject(error);
                          domen = url.slice(0, url.indexOf('.ru') + 3);
                          $ = _cheerio.default.load(body);
                          title = $(elems.title).text().trim();
                          image = $(elems.image).attr('src');
                          if (!(image === undefined)) image = image.indexOf('.ru') < 0 ? domen + image : image;else image = "https://via.placeholder.com/150x100";
                          description = $(elems.text).text().trim();
                          view = $(elems.view).text().trim();
                          regions = '';
                          _context.t0 = domen;
                          _context.next = _context.t0 === 'https://www.riadagestan.ru' ? 13 : _context.t0 === 'https://grozny-inform.ru' ? 15 : _context.t0 === 'http://magastimes.ru' ? 17 : 19;
                          break;

                        case 13:
                          regions = 'DAG';
                          return _context.abrupt("break", 19);

                        case 15:
                          regions = 'CHE';
                          return _context.abrupt("break", 19);

                        case 17:
                          regions = 'ING';
                          return _context.abrupt("break", 19);

                        case 19:
                          id = (0, _v.default)();
                          post = {
                            title: title,
                            image: image,
                            description: description,
                            view: view,
                            regions: regions,
                            id: id
                          };
                          resolve(post);

                        case 22:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x5) {
                  return _ref.apply(this, arguments);
                };
              }());
            });

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _parsePost.apply(this, arguments);
}

function getLinks(_x3, _x4) {
  return _getLinks.apply(this, arguments);
}

function _getLinks() {
  _getLinks = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(url, classLinks) {
    var count,
        _args3 = arguments;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            count = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 5;
            _context3.next = 3;
            return new Promise(function (resolve, reject) {
              _unirest.default.get(url).then(function (_ref3) {
                var body = _ref3.body;

                var $ = _cheerio.default.load(body);

                var tmp = [];
                var domen = url.slice(0, url.indexOf('.ru') + 3);
                var links = $(classLinks);

                for (var i = 0; i < count; i++) {
                  var lst = links[i].attribs.href.indexOf('.ru') < 0 ? domen + links[i].attribs.href : links[i].attribs.href;
                  tmp.push(lst);
                }

                resolve(tmp);
              });
            });

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getLinks.apply(this, arguments);
}

module.exports = {
  parsePost: parsePost,
  getLinks: getLinks
};