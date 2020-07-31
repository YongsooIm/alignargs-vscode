// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as alignArgs from './implement/AlignArgs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "alignargs" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('alignargs.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		} else {
			var selection = editor.selection;

			var start = new vscode.Position(selection.start.line, 0);
			var end = new vscode.Position(selection.end.line + 1, 0);

			selection = new vscode.Selection(start,end);

			var selectedText = editor.document.getText(selection);
			var outputText = alignArgs.AlignArgs.Do(selectedText);

			editor.edit(editBuilder => editBuilder.replace(selection, outputText));
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }