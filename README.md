# AlignArgs README

Align arguments in function calls.

Works for c-style, single line, non-nested function calls.  
ex) f(a, b, c);

Valid types for argument : decimal expression, hex expression, c identifier  
Invalid types for argument : function call, quoted string 


# Usage

1) Select function calls


2-1) Open command pallete, type 'align args' and press enter.
![Demo](./images/commandpalette.gif?raw=true)


2-2) Right click on selected text, and click 'align args'.
![Demo](./images/contextmenu.gif?raw=true)


(optional) Reference comment line   
You can list argument names in the first comment line.

# Features
Format hex ( 0XabU => 0xABu)
Right align decimal
Replace arguments

### 0.1.1
Add semicolon tolerance

### 0.1.0

Initial release
