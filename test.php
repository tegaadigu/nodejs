<html>
	<head>
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">
		<script type="text/javascript" src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js">
		</script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" integrity="sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ==" crossorigin="anonymous"></script>
		<style type="text/css">
			ul li {
				padding: 8px 3px;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<h2>Chat Test</h2>
			<div style="margin-top:10px;padding:10px;border:1px solid #ddd;">
				<ul class="list-unstyled">
				</ul>
				<form>
					<div class="form-group">
						<input type="text" name="text" class="form-control" autocomplete="off">
					</div>
						<button type="send">Submit</button>
				</form>
			</div>
		</div>
	</body>
</html>
<script type="text/javascript">
	var socket = io('http://127.0.0.1:3000/');
	var room   = Math.floor((Math.random() * 2) +1);

	socket.on('connect', function(){
		socket.emit('join', room);
	})

	$('form').submit(function(e){
		e.preventDefault();
		var cur = $(this);
		
		$.ajax({
			url: "process.php",
			data: {text: cur.find('input').val(), room: room}
		}).done(function(res){
			console.log('done...');
		});


		var li = '<li class="clearfix"><div style="float:right">You : '+cur.find('input').val()+'</div></li>';
		$('ul').append($(li));

		socket.emit('chat-message', cur.find('input').val());

		cur.find('input').val('');
	})

	socket.on('chat-message', function(msg){
		console.log('hi there...');
		var li = '<li class="clearfix"><div style="float:left">User : '+msg+'</div></li>';
		$('ul').append($(li));
	})
</script>