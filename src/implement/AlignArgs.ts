import { FuncCall } from "./../class/FuncCall";
import { ParseFunc } from "./ParseFunc";
import { Config } from "./../class/Config"

export function DoAlign(input: string, config: Config): string {
  var parsedLines: FuncCall[] = [];
  var maxArgLengthArr = [0];
  var minIndentLength = 100;
  var maxFuncNameLength = 0;
  var outputLines: string[] = [];
  var findingRefComment = true;
  var lines = input.split(/\r?\n/);

  lines.forEach((line, index) => {
    parsedLines[index] = ParseFunc(line);

    var currentParsedLine = parsedLines[index];

    if (currentParsedLine.funcName !== '') {
      if (currentParsedLine.indent.length < minIndentLength) {
        minIndentLength = currentParsedLine.indent.length;
      }

      if (currentParsedLine.funcName.length > maxFuncNameLength) {  // calc max func name
        maxFuncNameLength = currentParsedLine.funcName.length;
      }

      if (config.trimTrail) { // check trim option
        currentParsedLine.args = currentParsedLine.args.map((arg) => arg.trim());
      }

      currentParsedLine.args.forEach((arg, index, args) => {

        if (arg.trim() in config.replace) {  // check replace object has key
          var from = arg.trim();
          var to = config.replace[from];
          args[index] = args[index].replace(from, to);
        }

        if (config.formatHex) { // check format hex option
          var temp = arg.trim().toUpperCase();
          if (temp.match(/\b0[X][0-9A-F]+[U]?\b/)) {  // check hex expression
            temp = temp.replace('X', 'x').replace('U', 'u');
            args[index] = args[index].replace(args[index].trim(), temp);
          }
        }

      });

      maxArgLengthArr = calcMaxArgLengthArr(maxArgLengthArr, currentParsedLine.args.map((arg) => arg.length));
    }
  });

  var joinString = ' , ';

  parsedLines.forEach(function (line, index) {
    if (line.funcName === '') {
      outputLines.push(lines[index]);
    } else {
      line.args = line.args.map((arg, argIndex) => {

        if (config.padType === 'space') { // pad type is space
          if (config.rightAlignDecimal && !arg.trim().match(/\D/)) {  // right align decimal
            return arg.padStart(maxArgLengthArr[argIndex], ' ');
          }
          else {
            return arg.padEnd(maxArgLengthArr[argIndex], ' ');
          }
        } else { // pad type is tab

          const tabSize = 4;
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

          if (argIndex === 0){ // first argument, calculate function name length
            var targetWidth = Math.ceil((maxFuncNameLength + 1 + maxArgLengthArr[argIndex])/4)*4;

            if (config.rightAlignDecimal && !arg.trim().match(/\D/)) {  // right align decimal
              return arg.padStart(targetWidth - maxFuncNameLength - 1, ' ') + '\t';
            }
            else {
              return arg + '\t'.repeat(Math.ceil((targetWidth - arg.length - maxFuncNameLength - 1) / 4) + 1);
            }
          }
          else {
            var targetWidth = Math.ceil(maxArgLengthArr[argIndex] / tabSize) * tabSize;  // target width 

            if (config.rightAlignDecimal && !arg.trim().match(/\D/)) {  // right align decimal
              return arg.padStart(targetWidth, ' ') + '\t';
            }
            else {
              return arg + '\t'.repeat(Math.ceil((targetWidth - arg.length - joinString.length) / 4) + 1);  // after second argument including join string (', ')
            }
          }
        }
      });
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      if (config.padType === 'space')
        outputLines.push(' '.repeat(minIndentLength) + line.funcName.padEnd(maxFuncNameLength) + '(' + line.args.join(joinString) + ');' + line.comment);

      else
        outputLines.push(' '.repeat(minIndentLength) + line.funcName.padEnd(maxFuncNameLength) + '(' + line.args.join(joinString) + ');' + line.comment);

    }

  });

  return outputLines.join('\r\n');
}


function calcMaxArgLengthArr(args1: number[], args2: number[]): number[] {

  var arg1Length: number;
  var arg2Length: number;

  var argLengthArr: number[] = [];

  var index = 0;

  while (args1[index] || args2[index]) {

    arg1Length = args1[index] ? args1[index] : 0;
    arg2Length = args2[index] ? args2[index] : 0;

    if (arg1Length > arg2Length) {
      argLengthArr[index] = arg1Length;
    } else {
      argLengthArr[index] = arg2Length;
    }
    index++;
  }

  return argLengthArr;
}
