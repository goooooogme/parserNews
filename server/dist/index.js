"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _parsePost = require("./parsePost");

var _config = _interopRequireDefault(require("./config"));

var _fs = _interopRequireDefault(require("fs"));

var dag = _config.default.dag,
    ing = _config.default.ing,
    che = _config.default.che;
var links = {
  dag: {
    link: 'https://www.riadagestan.ru/news/politics/',
    classLinkPosts: '.b-mid-col__layout li a',
    elems: dag
  },
  che: {
    link: 'https://grozny-inform.ru/news/politic/',
    classLinkPosts: '.partition_news p a',
    elems: che
  },
  ing: {
    link: 'http://magastimes.ru/category/novosti/',
    classLinkPosts: '.td-main-content .item-details a',
    elems: ing
  }
};

function getParser(links) {
  (0, _parsePost.getLinks)(links.link, links.classLinkPosts).then(
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(data) {
      var tmp, i;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tmp = [];
              i = 0;

            case 2:
              if (!(i < data.length)) {
                _context.next = 11;
                break;
              }

              _context.t0 = tmp;
              _context.next = 6;
              return (0, _parsePost.parsePost)(data[i], links.elems);

            case 6:
              _context.t1 = _context.sent;

              _context.t0.push.call(_context.t0, _context.t1);

            case 8:
              i++;
              _context.next = 2;
              break;

            case 11:
              _fs.default.writeFile("./server/parse.txt", JSON.stringify(tmp), function (error) {
                if (error) throw error; // если возникла ошибка
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}

getParser(links.ing);