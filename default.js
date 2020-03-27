let wsUri = 'ws://echo.websocket.org/'
let ws

//$(document).ready(function())
$(()=>{
    if (UnterstuetzBrowserWebSocket()){
        Verbinden()
        $('#btnSend').click(NachrichtSenden)
    }
})

function Verbinden(){
ws = new WebSocket(wsUri);
ws.onmessage = function (ereignisObjekt) {Ausgeben('Server:' + ereignisObjekt.data)}
ws.onerror = function (ereignisObjekt) {Ausgeben('Error:' + ereignisObjekt.data)}
ws.onclose = function (ereignisObjekt) {Ausgeben('Disconnected')}
ws.onopen = function (ereignisObjekt) {Ausgeben('Connected')}

}

//mit !window.WebSocket testen
function UnterstuetzBrowserWebSocket(){
    if (window.WebSocket){
        Ausgeben('WS suppported')
    return true
    }
    else{
        Ausgeben('WS NOT supported')
        $('#btnSend').attr('disabled', true);
        return false
        }
}

function NachrichtSenden(){
    // Ausgeben ($('#txtMessage').val())
    let text = $('#txtMessage').val()
    Ausgeben(text)
    ws.send(text)
}

function Ausgeben(message){
    let output = $('#divOutput')
    output.html(output.html() + '<br>' + message)
    console.log(message)
}
