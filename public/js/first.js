window.onload = function(){
	ga('send', 'event', 'Arcelik', 'Klima', 'Masthead');
}
//All Function
function onOff(){
	if($('#onoff').css('display') == 'none'){
		$('#bgeffect').fadeIn('slow');
		$('#onoff').fadeIn('slow');
		$('#airdegree').fadeIn('slow');
	}
	else{
		$('#bgeffect').fadeOut('slow');
		$('#onoff').fadeOut('slow');
		$('#airdegree').fadeOut('slow');
	}
	
}


var socketMove = function(options){
	//Make connection
	var socket = io.connect('https://arcelik.onedio.com/', {secure: true});

	//Query DOM
	var code = document.getElementById('code');
	var refresh = document.getElementById('refresh');
	var airdegree = document.getElementById('airdegree');


	generateCode();
	
	function generateCode(){
		//socket.leave(code.innerText);

		var codeValue = Math.floor((Math.random() * 8999) + 1000);
		code.innerHTML = codeValue;

		socket.emit('joinRoom', {
			code: codeValue,
			user: options.player,
		});
	}
	
	refresh.addEventListener('click', function(){
		generateCode();
	});
	
	//Listen for events
	socket.on('turnOnOff', function(data){
		onOff();
	});	

	socket.on('changeTemp', function(data){
		airdegree.innerHTML = data.value;

		if(data.value>25){
			parent.arcelikMastheadMsg("sicak"); 
		}
		else if(data.value<=25 && data.value>22){
			parent.arcelikMastheadMsg("normal"); 
		}
		else{
			parent.arcelikMastheadMsg("soguk"); 
		}	
	});
}

