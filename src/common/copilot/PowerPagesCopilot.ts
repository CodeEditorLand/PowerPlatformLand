/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import * as vscode from "vscode";
// import { createAiWebpage } from "./Utils";
import { sendApiRequest } from "./IntelligenceApi";


declare const IS_DESKTOP: boolean;



export class PowerPagesCopilot implements vscode.WebviewViewProvider {
    public static readonly viewType = "powerpages.copilot";
    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) { }

    private isDesktop: boolean = vscode.env.uiKind === vscode.UIKind.Desktop;

    public async resolveWebviewView(
        webviewView: vscode.WebviewView,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        context: vscode.WebviewViewResolveContext,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;


        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,

            localResourceRoots: [this._extensionUri],
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);


        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "webViewLoaded": {
                    console.log("webview loaded");
                    this.sendMessageToWebview({ type: 'env', value: this.isDesktop });
                    break;
                }
                case "newUserPrompt": {
                    const engineeredPrompt = this.promptEngine(data.value);
                    const apiResponse = await sendApiRequest(engineeredPrompt);
                    this.sendMessageToWebview({ type: 'apiResponse', value: apiResponse });
                    break;
                }
                case "insertCode": {
                    console.log("code ready to be inserted " + data.value);
                    vscode.window.activeTextEditor?.insertSnippet(
                        new vscode.SnippetString(`${data.value}`)
                    );
                    break;
                }
                case "copyCodeToClipboard": {
                    console.log(
                        "code ready to be copied to clipboard " + data.value
                    );
                    vscode.env.clipboard.writeText(data.value);
                    break;
                }
                case "createWebpage": {
                    console.log("create webpage with code = " + data.value);

                    if (IS_DESKTOP) {
                        try {
                            const { createAiWebpage } = await import("./Utils");
                            createAiWebpage(data.value);
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    break;
                }
                case "createWebfile": {
                    console.log("create webfile with image = " + data.value);
                    break;
                }
                case "createTablePermission": {
                    console.log(
                        "create table permission with code = " + data.value
                    );
                    break;
                }
                case "createNewFile": {
                    console.log("create new file with code = " + data.value);
                    //createNewFile(data.value);
                    break;
                }
                case "hello": {
                    vscode.window.showInformationMessage(data.value)
                    break;
                }
            }
        });
    }

    public promptEngine(message: string) {
        //const entityList=  `The list gets its data asynchronously, and when it's complete it will trigger an event 'loaded' that your custom JavaScript can listen for and do something with items in the grid. The following code is a sample javascript code: \`+"${"```"}" +\` $(document).ready(function () { $(".entitylist.entity-grid").on("loaded", function () { $(this).children(".view-grid").find("tr").each(function () { // do something with each row $(this).css("background-color", "yellow"); }); }); }); \`+"${"```"}" +\` Find a particular attribute field and get its value to possibly modify the rendering of the value. The following code gets each table cell that contains the value of the accountnumber attribute. Replace accountnumber with an attribute appropriate for your table and view. \`+"${"```"}" +\` $(document).ready(function (){ $(".entitylist.entity-grid").on("loaded", function () { $(this).children(".view-grid").find("td[data-attribute='accountnumber']").each(function (i, e){ var value = $(this).data(value); \`+"${"```"}" +\` // now that you have the value you can do something to the value }); }); });`
        const activeEditorContent = this.getActiveEditorContent();

        const enigneeredPrompt = message + " " + activeEditorContent; // modify the user prompt here

        return enigneeredPrompt;
    }


    private getActiveEditorContent() {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            return activeEditor.document.getText();
        }
        return "";
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public sendMessageToWebview(message: any) {
        if (this._view) {
            this._view.webview.postMessage(message);
        } else {
            console.log("webview not found");
        }
    }

    private _getHtmlForWebview(webview: vscode.Webview) {

        
        // const copilotScriptPath = vscode.Uri.joinPath(this._extensionUri, 'src', 'common', 'copilot', 'assets', 'scripts', 'copilot.js');
       // const copilotScriptUri = webview.asWebviewUri(copilotScriptPath);
        const webviewPath = vscode.Uri.joinPath(this._extensionUri, "dist", "webview.js");
        const webviewUri = webview.asWebviewUri(webviewPath);


        const copilotStylePath = vscode.Uri.joinPath(
            this._extensionUri,
            'src',
            "common",
            "copilot",
            "assets",
            "styles",
            "copilot.css"
        );
        const copilotStyleUri = webview.asWebviewUri(copilotStylePath);

        const codiconStylePath = vscode.Uri.joinPath(
            this._extensionUri,
            'src',
            "common",
            "copilot",
            "assets",
            "styles",
            "codicon.css"
        );
        const codiconStyleUri = webview.asWebviewUri(codiconStylePath);

        // Use a nonce to only allow specific scripts to be run
        const nonce = getNonce();


        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="${copilotStyleUri}" rel="stylesheet"></link>
            <link href="${codiconStyleUri}" rel="stylesheet"></link>
          <title>Chat View</title>
        </head>
        <body>
          <div class="chat-container">
            <div class="chat-messages" id="chat-messages"></div>
            <vscode-link href="#">How to use fetchXML?</vscode-link> 
        
            <!-- Note: Using Visual Studio Code Codicon Library -->
        
            <vscode-text-field placeholder="Ask Copilot a question or type '/' for tables" id="chat-input">
              <section slot="end" style="display:flex; align-items: center;">
                <vscode-button appearance="icon" aria-label="Match Case" id="send-icon">
                  <span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.17683 1.1185C1.32953 0.989145 1.54464 0.963297 1.72363 1.05279L14.7236 7.55279C14.893 7.63748 15 7.81061 15 8C15 8.18939 14.893 8.36252 14.7236 8.44721L1.72363 14.9472C1.54464 15.0367 1.32953 15.0109 1.17683 14.8815C1.02414 14.7522 0.96328 14.5442 1.02213 14.353L2.97688 8L1.02213 1.64705C0.96328 1.45578 1.02414 1.24785 1.17683 1.1185ZM3.8693 8.5L2.32155 13.5302L13.382 8L2.32155 2.46979L3.8693 7.5H9.50001C9.77615 7.5 10 7.72386 10 8C10 8.27614 9.77615 8.5 9.50001 8.5H3.8693Z" fill="#F3F2F1"/>
                    </svg>
                  </span>
                </vscode-button>
              </section>
            </vscode-text-field>
            <br>
            <div class="chat-input">
              <input type="text" id="chat-input" placeholder="Ask Copilot a question or type '/' for tables" />
              <button id="send-button"></button>
            </div>
          </div>
          
          <script type="module" nonce="${nonce}" src="${webviewUri}"></script>
        </body>
        </html>`;
    }
}

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
