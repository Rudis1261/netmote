function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

// Onload event
function onDeviceReady() {
    // Register the event listener
    document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);
    document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);
}

// Handle the volume down button
function onVolumeDownKeyDown() {
    $("#vol-down").click();
}

// Handle the volume up button
function onVolumeUpKeyDown() {
   $("#vol-up").click();
}

// Clear the activity display 
function clear() {	
	$(".activity").removeClass("btn-primary btn-danger");
	$(".activity-icon").removeClass("icon-white");
};     

// Lets get some shortcuts going
$(document).keypress(function(event) {
	event.preventDefault();
	$(".btn").blur();
	//alert(event.which); // Keep this to check the keys, just uncomment the first section
	$('[data-keycode="' + event.which + '"]').click();  
});

function showAlert(title, message) {
    navigator.notification.alert(
	message,  // message
	title,            			// title
	'OK, let me try again'             // buttonName
    );
}

function vibrate(long) {
    navigator.notification.vibrate(long);
}

function checkConnection() {
    var networkState = navigator.connection.type;
    var failure = false;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    if (networkState == Connection.UNKNOWN)
    {
	failure = true;
    }
    if (networkState == Connection.NONE)
    {
	failure = true;
    }
    if (failure == true)
    {
	alert("No signal, unable to relay commands!");
	return false;
    }
    if (networkState == Connection.WIFI)
    {
		alert("WIFI, so nice!");
    }
}

var defaultServer = "http://192.168.1.4:8080";

// When the key is pressed, set it in the DB by running the AJAX
$(".remoteKeys").click(function(event) {   
    event.preventDefault();        
   	var keyPressed = $(this).attr('id');
	$.get(defaultServer, { command: keyPressed },
	function(data){
		if (data == 1)
		{
			$(".activity").addClass("btn-primary");
			$(".activity-icon").addClass("icon-white");
		} else {
			$(".activity").addClass("btn-danger");
			$(".activity-icon").addClass("icon-white");
		}
		setTimeout(clear, 200);
	});
});
