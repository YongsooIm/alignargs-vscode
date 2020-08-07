enum STATE {
  INDENT,
  CHECK_COMMENT,
  ARG_START,
  ARG_MIDDLE,
  ARG_END,
  DONE,
  FAIL,
}

export function ParseRefComment(line: string): string[] { // returns args

  var curr: string;
  var state = STATE.INDENT;
  var indent = '';
  var args: string[] = [];
  var argIndex = -1;

  for (var i = 0; i < line.length; i++) {
    curr = line.charAt(i);

    switch (state) {
      case STATE.INDENT:
        if (curr.match(/\s/)) { // whitespace
          indent += curr;
        } else if (curr === '/') {
          state = STATE.CHECK_COMMENT;
        } else {
          state = STATE.FAIL;
        } break;

      case STATE.CHECK_COMMENT:
        if (curr === '/' || curr === '*') {
          state = STATE.ARG_START;
        } else {
          state = STATE.FAIL;
        } break;

      case STATE.ARG_START:
        if (curr.match(/\w/)) {  // alphanumeric
          args[++argIndex] = curr;
          state = STATE.ARG_MIDDLE;
        } else if (curr.match(/[\s(]/)) {  // ignore whitespace and '('
          // Do nothing
        } else {
          state = STATE.FAIL;
        }
        break;

      case STATE.ARG_MIDDLE:
        if (curr.match(/[\w_]/)) {  // alphanumeric, underscore
          args[argIndex] += curr;
        } else if (curr.match(/\s/)) { // whitespace
          state = STATE.ARG_END;
        } else if (curr === ',') {
          state = STATE.ARG_START
        } else if (curr === '*') {
          // comment end;
        }
        break;

      case STATE.ARG_END:
        if (curr === ',') {
          state = STATE.ARG_START;
        } else if (curr.match(/\s/)) {
          // ignore whitespace
        }
        break;
    }
  }

  if (argIndex === 0)
    return [];
  else
    return args;
}