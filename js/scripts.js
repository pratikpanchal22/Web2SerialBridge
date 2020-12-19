var x = 0,
    y = 0;
var newX = 0,
    newY = 0;
var lm = 0,
    rm = 0;
var ampPer = 0;
var xCoordinateChanged = false,
    yCoordinateChanged = false;
var previousLm = 0,
    previousRm = 0;
var request = "";
var requestCounter = 0,
    responseCounter = 0;


window.onload = function () {
    var w = window.innerWidth;
    var h = window.innerHeight;
    document.getElementById("idCurrentFrameSize").innerHTML = w + " X " + h;

    var mouseIsDown = false;
    document.body.onmousedown = function (e) {
        console.log("Mouse is down");
        mouseIsDown = true;
        captureCoordinates(e);
    }
    document.body.onmouseup = function () {
        console.log("Mouse is up");
        mouseIsDown = false;
        document.getElementById('id_unitCircleCoordinates')
            .innerHTML = 'Released<br>(Non-capturing mode)';
    }
    document.body.onmousemove = function (e) {
        if (mouseIsDown) {
            console.log("mouse: isDown?:" + mouseIsDown + " location:", e.clientX, e.clientY);
            captureCoordinates(e);
        }
    }
}

/*var joystick = new VirtualJoystick({
    container: document.getElementById('container'),
    mouseSupport: true,
    limitStickTravel: true,
    stickRadius: 255,
});

joystick.addEventListener('touchStart', function() {
    console.log('down')
})

joystick.addEventListener('touchEnd', function() {
    console.log('up')
})*/


function captureCoordinates(e) {
    newX = e.clientX;
    newY = e.clientY;
    document.getElementById('id_unitCircleCoordinates')
        .innerHTML = '<b>(' + e.clientX + ', ' + e.clientY + ')</b>';

    var w = window.innerWidth;
    var h = window.innerHeight;

    var scaledX = Math.round((e.clientX * 255) / w);
    var scaledY = Math.round((e.clientY * 255) / h);
    document.getElementById('coordinates')
        .innerHTML = '<b>(' + scaledX + ', ' + scaledY + ')</b>';

    document.getElementById('idXaxisCorrected')
        .innerHTML = scaledX;

    document.getElementById('idYaxisCorrected')
        .innerHTML = (255 - scaledY);
}

//setInterval(pollCall, 5000);

setInterval(function () {

    newX = document.getElementById('idXaxisCorrected').innerHTML;
    newY = document.getElementById('idYaxisCorrected').innerHTML;

    // Flag if the values changed
    if (x != newX) {
        x = newX;
        xCoordinateChanged = true;
    }
    if (y != newY) {
        y = newY;
        yCoordinateChanged = true;
    }

    // If values changed, compute other parameters
    if (!xCoordinateChanged && !yCoordinateChanged) {
        console.log("Coordinates unchanged");
        return;
    }

    console.log(' >>> x=' + newX + '; y=' + newY);

    // Send request to Server
    request = "x="+newX+"&y="+newY;

    // Send request to server
    sendRequestToServer(request);

    var color = 'red';

    // reset flag for next loop
    xCoordinateChanged = false;
    yCoordinateChanged = false;

}, 100);


function sendRequestToServer(request) {

    if (request == "") {
        console.log("Empty request. Returning ..");
        return;
    }

    // Create XHR object and set callback function
    var xhrObj = new XMLHttpRequest();
    xhrObj.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Received data: " + this.responseText);
            responseCounter++;
            document.getElementById('noOfResponses')
                .innerHTML = responseCounter;
            document.getElementById('queueLength')
                .innerHTML = requestCounter - responseCounter;

            consumeJsonResponseObj(this.response);
        }
    };
    var req = "phpBridge.php?" + "state=getFromDb&" + request + "&t=" + Math.random();
    console.log("Sending request: " + req);
    console.log(" now() call: " + window.performance.now());
    xhrObj.open("GET", req, true);
    xhrObj.send();
    requestCounter++;

    document.getElementById('noOfRequests')
        .innerHTML = requestCounter;
    document.getElementById('queueLength')
        .innerHTML = requestCounter - responseCounter;
    document.getElementById('latestSentParms')
        .innerHTML = '(' + previousLm + ', ' + previousRm + ')';
}

function consumeJsonResponseObj(jsonObj) {
    var jsJson = JSON.parse(jsonObj);

    // Set UI components
    document.getElementById('id_scql')
        .innerHTML = jsJson.cmdFileCount;
}

function pollCall() {
    sendRequestToServer("getstats=true" + ";&");
}