# AlignArgs README

Align arguments in function calls.

Works for c-style, single line, non-nested function calls.  

Invalid expression for argument : function call, etc


# Usage

Select function calls, 

option 1) Open command palette, type 'align args' and press enter.
![Demo](./images/commandpalette.gif?raw=true)


option 2) Right click on selected text, and click 'align args' on context menu.
![Demo](./images/contextmenu.gif?raw=true)


(optional) Reference comment line   
You can list argument names in the first comment line which will align together.

# Features
Format hex ( 0XabU => 0xABu)  
Right align decimal  
Replace arguments  

# Known issue
Parser is very greedy, it might not be accurate.
Feel free to open an issue!
