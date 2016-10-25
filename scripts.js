var digits = new Array(15);
var digitsOriginal = new Array(15);
var MyInterval, timer = 0;
var nick = "";

var click = new Audio("click.wav");
var winning = new Audio("winning.wav");

for (i=0; i<=14; i++)
{
	digits[i] = i+1;
	digitsOriginal[i] = i+1;
}
digits[15] = 0;
digitsOriginal[15] = 0;

function randomDigits() {
    digits.sort(function(a, b){return 0.5 - Math.random()});
}

function sortDigits() {
    digits.sort(function(a, b){return a - b});
}

function moveDigits(x) {
	var emptyIndex = digits.indexOf(0);
	var digitValue = Number(x.innerHTML);
	var digitIndex =  digits.indexOf(digitValue);
	
	if ((digitIndex-1 == emptyIndex) && (digitIndex % 4 != 0))
	{
		digits[emptyIndex] = digitValue;
		digits[digitIndex] = 0;
		gameboard();
		click.play();
	} else if((digitIndex+1 == emptyIndex) && ((digitIndex+1) % 4 != 0))
	{
		digits[emptyIndex] = digitValue;
		digits[digitIndex] = 0;
		gameboard();
		click.play();
	} else if((digitIndex-4 == emptyIndex))
	{
		digits[emptyIndex] = digitValue;
		digits[digitIndex] = 0;
		gameboard();
		click.play();
	} else if((digitIndex+4 == emptyIndex))
	{
		digits[emptyIndex] = digitValue;
		digits[digitIndex] = 0;
		gameboard();
		click.play();
	}
	
	var i = digits.length;
	var isEqual = true;
	
    while (i--) {
        if (digits[i] != digitsOriginal[i]) isEqual = false;
    }
	
	if (isEqual)
	{
		winning.play();
		clearInterval(MyInterval);
		document.getElementById('btn_save').style = "visibility: visible;";
		$( "#border" ).effect("highlight", {}, 200);
		$( "#border" ).effect("highlight", {}, 200);
	}
}

function gameboard()
{
	var board = "";
	
	for (i=0; i<=15; i++)
	{
		if (digits[i] == 0) {
			board = board + '<div id="empty"></div>';
		} else {
			board = board + '<div class="digit" id="digit' + (i+1) + '" onclick="moveDigits(this);">' + digits[i] + '</div>';
		}
		if ((i+1) % 4 == 0) board = board + '<div style="clear:both;"></div>';
	}
	
	document.getElementById('border').innerHTML = board;
}

function startTimer(display) {
    var minutes, seconds;
    MyInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        ++timer;
    }, 1000);
}

function startGame()
{
	click.play();
	
	if (nick == "")
		nick = document.getElementById('edt_nick').value;
	timer = 0;
	
	$( "#border" ).effect("shake");
	randomDigits();
	gameboard();
	document.getElementById('left_box').innerHTML = 
		'<br /> <span>'+nick+'</span><br /><br /> <span id="timer">00:00</span> <br /><br />'
		+'<span class="button" id="btn_save" style="visibility:hidden;">Zapisz wynik</span> <br /><br />'
		+'<span class="button" id="btn_again" onclick="startGame();">Jeszcze raz</span>';
	clearInterval(MyInterval);
	startTimer(document.querySelector('#timer'));
}