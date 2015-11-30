'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      FunctionDeclaration: function FunctionDeclaration(path) {
        if (!Array.isArray(path.node.leadingComments)) {
          return;
        }

        var lastComment = path.node.leadingComments[path.node.leadingComments.length - 1];

        if (!/@exportForTesting/m.test(lastComment.value)) {
          return;
        }

        if (path.parent.type === 'Program') {
          path.replaceWith(t.exportNamedDeclaration(path.node, []));
        }
      }
    }
  };
};