var uniqueId = 'null';

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

// Onload event
function onDeviceReady() {
    // Register the event listener
    document.addEventListener("volumedownbutton", onVolumeDownKeyDown, false);
    document.addEventListener("volumeupbutton", onVolumeUpKeyDown, false);
    uniqueId = device.uuid;
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
    $(".activity").removeClass("alert alert-info alert-warning");       
};

//$(".activity").addClass("alert alert-info");       

// Lets get some shortcuts going
$(document).keypress(function(event) {
	event.preventDefault();
	$(".btn").blur();
	//alert(event.which); // Keep this to check the keys, just uncomment the first section
	$('[data-keycode="' + event.which + '"]').click();  
});

function playBeep() {
    navigator.notification.beep(1);
}

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


// When the key is pressed, set it in the DB by running the AJAX
$(".remoteKeys").click(function(event) {   
        event.preventDefault();        
        var keyPressed = $(this).attr('id');
	checkConnection();
        //alert(keyPressed);
        //alert(uniqueId);
        $.get("http://www.thatguy.co.za/remote.php", { action: 'set', key: keyPressed, uuid: uniqueId },
        function(data){
                //alert(data);
                if (data == 1)
                {
		    vibrate(100);
                } else {
                    showAlert('Error', 'Command could not be completed');                    
                }
                setTimeout(clear, 200);
        });
});