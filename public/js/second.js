
var status = false;

var tempStart = 16;
var tempEnd = 24;
var fanStart = 1;
var fanEnd = 4;

var mode = 'cold';


$(document).ready(function(){
	$('#code1').focus();
	//changeContainer('container-2');
});

function changeContainer(id){
	$('.container').fadeOut('fast');
	$('#'+id).fadeIn('slow');
}

$('.form-control').on('keyup', function(){
	if($(this).attr('id') == 'code1'){
		$('#code2').focus();
	}
	else if($(this).attr('id') == 'code2'){
		$('#code3').focus();
	}
	else if($(this).attr('id') == 'code3'){
		$('#code4').focus();
	}

	var btnTamam = true;

	$('.form-control').each(function(){
		if($(this).val() == ''){
			btnTamam = false;
		}
	});

	if(btnTamam == true){
		$('.btn-okey').css('opacity','1');
	}
	else{
		$('.btn-okey').css('opacity','0.7');
	}

});


$('#inputFan').on('change',function(){
	var val = fanStart + Math.round(Math.round($('#inputFan').val() * (fanEnd - fanStart)) / 100);
	$('#fanInfo').text(val);
});



$('#btnFan').on('click', function(){
	if(status == 'true'){
		changeActiveButton('btnFan');

		$('#inputFan').val(Math.round($('#inputFan').val()) + (100/(fanEnd - fanStart)));

		var val = fanStart + Math.round(Math.round($('#inputFan').val() * (fanEnd - fanStart)) / 100);
		$('#fanInfo').text(val);
	}
	
});

function changeActiveButton(id){
	$('div[group=btn]').removeClass('active');
	$('#'+id).addClass('active');

	$('label[group=btn]').removeClass('active');
	$('#lbl'+id).addClass('active');
}



var socketMove = function(options){
	//Make connection
	var socket = io.connect('http://'+location.host+'/');

	//Query DOM
	var code1 = document.getElementById('code1');
	var code2 = document.getElementById('code2');
	var code3 = document.getElementById('code3');
	var code4 = document.getElementById('code4');

	

	//Emit events
	$('.btn-okey').on('click', function(){
		if($('.btn-okey').css('opacity') == '1'){
			changeContainer('container-2');

			socket.emit('joinRoom', {
				code: code1.value + code2.value + code3.value + code4.value,
				user: options.player,
			});
		}
	});

	$('#btnTurnOnOff').on('click', function(){
		if (status == 'true') {
			status = false;
			$('.turnonoff').text('Klimayı Aç');
			$('.opacity').css('opacity','0.3');
			$('#inputTemprature').attr('disabled','');
			$('#inputFan').attr('disabled','');

			socket.emit('turnOnOff', {
				value: true,
			});
		}
		else{
			status = true;
			$('.turnonoff').text('Klimayı Kapat');
			$('.opacity').css('opacity','1');
			$('#inputTemprature').removeAttr('disabled');
			$('#inputFan').removeAttr('disabled');

			socket.emit('turnOnOff', {
				value: false,
			});
		}
		
	});

	$('#inputTemprature').on('change',function(){
		var val = tempStart + Math.round(Math.round($('#inputTemprature').val() * (tempEnd - tempStart)) / 100);
		$('#tempInfo').text(val + '°C');
		$('#tempVal').text(val + '°C');

		socket.emit('changeTemp', {
			value: val,
		});
	});

	$('#btnCold').on('click', function(){
		if(status == 'true'){
			changeActiveButton('btnCold');

			tempStart = 16;
			tempEnd = 24;

			var val = tempStart + Math.round(Math.round($('#inputTemprature').val() * (tempEnd - tempStart)) / 100);
			$('#tempInfo').text(val + '°C');
			$('#tempVal').text(val + '°C');

			socket.emit('changeTemp', {
				value: val,
			});

			mode = 'cold';
		}
	});

	$('#btnHot').on('click', function(){
		if(status == 'true'){
			changeActiveButton('btnHot');

			tempStart = 25;
			tempEnd = 35;

			var val = tempStart + Math.round(Math.round($('#inputTemprature').val() * (tempEnd - tempStart)) / 100);
			$('#tempInfo').text(val + '°C');
			$('#tempVal').text(val + '°C');

			socket.emit('changeTemp', {
				value: val,
			});

			mode = 'hot';
		}
		
	});

	$('#btnJetMod').on('click', function(){
		if(status == 'true'){
			changeActiveButton('btnJetMod');

			

			if(mode == 'hot'){
				$('#inputTemprature').val(100);
				$('#inputFan').val(100);

				var val = tempStart + Math.round(Math.round($('#inputTemprature').val() * (tempEnd - tempStart)) / 100);
				
				$('#tempInfo').text(val + '°C');
				$('#tempVal').text(val + '°C');
				$('#fanInfo').text('4');

				socket.emit('changeTemp', {
					value: val,
				});
			}
			else{
				$('#inputTemprature').val(0);
				$('#inputFan').val(100);

				var val = tempStart + Math.round(Math.round($('#inputTemprature').val() * (tempEnd - tempStart)) / 100);

				$('#tempInfo').text(val + '°C');
				$('#tempVal').text(val + '°C');
				$('#fanInfo').text('4');

				socket.emit('changeTemp', {
					value: val,
				});
			}
		}
		
		
	});



	

	
	
	//Listen for events
	
}

