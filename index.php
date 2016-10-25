<!DOCTYPE HTML>
<html lang="pl">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<title>Układanka - gra przeglądarkowa</title>
	
	<link rel="stylesheet" href="style.css" type="text/css" />
	<script src="scripts.js"></script>
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script>
		$( function() {	
			$( "#btn_start" ).on( "click", function() {
				var str = $( "#edt_nick" ).val();
				var regex = new RegExp("^[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]+$");
				
				if (str.length >= 2 && str.length <=20) {
					if (regex.test(str) == true) {
						$( "#border" ).effect("shake");
						startGame();
					} else {
						notify("Nick może zawierać tylko litery i cyfry");
					}
				} else {
					notify("Nick może mieć długość od 2 do 20 znaków");
				}
				
				return false;
			});
			
			function notify(msg) {
				$( "<div>" )
					.appendTo( document.body )
					.text( msg )
					.addClass( "notification ui-state-default ui-corner-bottom" )
					.position({
					  my: "left top",
					  at: "left bottom",
					  of: "#edt_nick"
					})
					.show({
						effect: "blind",
						duration: "slow"
					})
					.delay( 5000 )
					.hide({
						effect: "blind",
						duration: "slow"
					}, function() {
					  $( this ).remove();
					});
			}
			
			$('#edt_nick').bind('keypress', function (event) {
				var regex = new RegExp("^[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]+$");
				var key = !event.charCode ? event.which : event.charCode;
				var keyChar = String.fromCharCode(key);
				
				// control keys
				if ((key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27) )
					return true;
			
				if (!regex.test(keyChar)) {
				   event.preventDefault();
				   notify("Nick może zawierać tylko litery i cyfry");
				   return false;
				}
			});
		});
	</script>
</head>
<body>
	<div id="container">
		<div id="top_box">Układanka</div>
		<div id="left_box">
			<br /><br />
			Podaj swój nick:<br />
			<input type="text" id="edt_nick" maxlength="20" size="20" />
			<br /><br />
			<span class="button" id="btn_start">START</span>
		</div>
		<div id="right_box">
			<div id="border"></div>
		</div>
	</div> 
	<script>gameboard();</script>
</body>
</html>