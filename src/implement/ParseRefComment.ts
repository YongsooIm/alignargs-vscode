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
          args[-1] = '/';
          state = STATE.CHECK_COMMENT;
        } else if (curr === '#') {  // for python compatibility
          args[-1] = '#';
          state = STATE.ARG_START;
        } else {
          state = STATE.FAIL;
        } break;

      case STATE.CHECK_COMMENT:
        if (curr === '/' || curr === '*') {
          args[-1] += curr;
          state = STATE.ARG_START;
        } else {
          state = STATE.FAIL;
        } break;

      case STATE.ARG_START:
        args[++argIndex] = curr;
        state = STATE.ARG_MIDDLE;
        break;

      case STATE.ARG_MIDDLE:
        if (curr === ',') {
          state = STATE.ARG_START;
        } else{
          args[argIndex] += curr;
        }
        break;
    }
  }

  if (state===STATE.FAIL) {
    return [];
  } else {
    return args;
  }
}