function parse() {
	var xmlhttp = new XMLHttpRequest();
	//var url = 'data.json';
	var url = 'http://messagehub.herokuapp.com/messages.json';
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			var messages = JSON.parse(xmlhttp.responseText);
			output(messages);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
function output(messages) {
	var output = '';
	for (i = 0; i < messages.length; i++) {
		output = output + '<p>' + messages[i].content + '</p>';
	}
	document.getElementById("messages").innerHTML = output;
}
