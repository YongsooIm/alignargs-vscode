// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {DoAlign} from './implement/AlignArgs';
import { Config } from './class/Config';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	//	vscode.ConfigurationTarget.Global.toString.arguments

	let disposable = vscode.commands.registerCommand('alignargs.alignargs', () => {
		// The code you place here will be executed every time your command is executed

		var	wsConfig = vscode.workspace.getConfiguration("alignargs");

		var rightAlignDecimal: boolean|undefined = wsConfig.get('rightAlignDecimal');
		var replaceArg :{[key: string]: string} | undefined = wsConfig.get('replaceArg');
		var trimTrail : boolean | undefined = wsConfig.get('trimTrail');
		var formatHex : boolean | undefined = wsConfig.get('formatHex');
		var padType : string | undefined = wsConfig.get('padType');

		var config = new Config(
			rightAlignDecimal !== undefined ? rightAlignDecimal : true, 
			replaceArg !== undefined ? replaceArg : {},
			trimTrail !== undefined? trimTrail : true,
			formatHex !== undefined? formatHex : true,
			padType !== undefined? padType : "space");

		var editor = vscode.window.activeTextEditor;
		
		if (!editor) {
			return; // No open text editor
		} else {
			var selection = editor.selection;

			var startPos = new vscode.Position(selection.start.line, 0);
			var endPos = new vscode.Position(selection.end.line + 1, 0);

			selection = new vscode.Selection(startPos,endPos);

			var selectedText = editor.document.getText(selection);
			var outputText = DoAlign(selectedText, config);

			editor.edit(editBuilder => editBuilder.replace(selection, outputText));
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
