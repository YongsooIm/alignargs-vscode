import { FuncCall } from "./../class/FuncCall";

enum STATE {
  INDENT,
  FUNC_NAME,
  FUNC_NAME_END,
  ARG_START,
  ARG_MIDDLE,
  ARG_MIDDLE_STRING_SINGLE_QUOTE,
  ARG_MIDDLE_STRING_DOUBLE_QUOTE,
  ARG_MIDDLE_STRING_ESCAPE,
  ARG_END,
  COMMENT_START,
  COMMENT,
  DONE,
  FAIL,
}

export function ParseFunc(line: string): FuncCall {

  var indent = '';
  var funcName = '';
  var args: string[] = [];
  var comment = '';
  var argIndex = -1;
  var curr: string;
  var state = STATE.INDENT;

  for (var i = 0; i < line.length; i++) {
    curr = line.charAt(i);

    switch (state) {
      case STATE.INDENT:
        if (curr.match(/\s/)) { // whitespace
          indent += curr;
        } else if (curr.match(/[a-zA-Z_]/)) { // first character of identifier (alphabet, underscore)
          funcName = curr;
          state = STATE.FUNC_NAME;
        } else {
          state = STATE.FAIL;
        } break;

      case STATE.FUNC_NAME:
        if (curr.match(/[\w_]/)) { // alphanumeric, underscore
          funcName += curr;
        } else if (curr.match(/\s/)) {  // whitespace
          state = STATE.FUNC_NAME_END;
        } else if (curr === '(') {
          state = STATE.ARG_START;
        } else {
          state = STATE.FAIL;
        } break;

      case STATE.FUNC_NAME_END:
        if (curr === '(') {
          state = STATE.ARG_START;
        } else if (curr.match(/\S/)) {  // non-whitespace
          state = STATE.FAIL;
        } break;                        // ignore whitespace

      case STATE.ARG_START:
        if (curr === ')') {
          state = STATE.COMMENT_START;
        } else if(curr==='\''){
          args[++argIndex] = curr;
          state = STATE.ARG_MIDDLE_STRING_SINGLE_QUOTE;
        } else if(curr==='\"'){
          args[++argIndex] = curr;
          state = STATE.ARG_MIDDLE_STRING_DOUBLE_QUOTE;
        } else {
          args[++argIndex] = curr;
          state = STATE.ARG_MIDDLE;
        } break;

      case STATE.ARG_MIDDLE:
        if (curr.match(/[\w_]/)) { // alphanumeric, underscore
          args[argIndex] += curr;
        } else if (curr === ',') {
          state = STATE.ARG_START;
        } else if (curr === ')') {
          state = STATE.COMMENT_START;
        } else if (curr === '\''){
          state = STATE.ARG_MIDDLE_STRING_SINGLE_QUOTE;
          args[argIndex] += curr;
        } else if (curr === '\"'){
          state = STATE.ARG_MIDDLE_STRING_DOUBLE_QUOTE;
          args[argIndex] += curr;
        } else {
          args[argIndex] += curr;
        } break;

      case STATE.ARG_MIDDLE_STRING_SINGLE_QUOTE:
        if (curr === '\''){
          state = STATE.ARG_MIDDLE;
          args[argIndex] += curr;
        } else if (curr === '\\'){
          state = STATE.ARG_MIDDLE_STRING_ESCAPE;
          args[argIndex] += curr;
        } else {
          args[argIndex] += curr;
        } break;

        
      case STATE.ARG_MIDDLE_STRING_DOUBLE_QUOTE:
        if (curr === '\"'){
          state = STATE.ARG_MIDDLE;
          args[argIndex] += curr;
        } else if (curr === '\\'){
          state = STATE.ARG_MIDDLE_STRING_ESCAPE;
          args[argIndex] += curr;
        } else {
          args[argIndex] += curr;
        } break;

      case STATE.ARG_MIDDLE_STRING_SINGLE_QUOTE:
        if (curr === '\"'){
          state = STATE.ARG_MIDDLE;
          args[argIndex] += curr;
        } else if (curr === '\\'){
          state = STATE.ARG_MIDDLE_STRING_ESCAPE;
          args[argIndex] += curr;
        } else {
          args[argIndex] += curr;
        } break;

      case STATE.ARG_MIDDLE_STRING_ESCAPE:
        args[argIndex] += curr;
        break;

      case STATE.COMMENT_START:
        comment = line.substr(i, line.length);
        state = STATE.DONE;
        break;

      default:
        state = STATE.FAIL;
        break;
    }

    if (state === STATE.DONE || state === STATE.FAIL) {
      break;
    }
  }

  return new FuncCall(indent, funcName, args, comment);

  /*
  if ((state === STATE.DONE || state === STATE.COMMENT_START) && argIndex !== -1) {
    return new FuncCall(indent, funcName, args, comment);
  } else {
    return new FuncCall('', '', [], '');
  }
  */
}

