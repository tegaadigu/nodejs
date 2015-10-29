<?php 
	$text = $_GET['text'];
	$room = $_GET['room'];
	
	$data = array(
					'room'=> $room,
					'msg' => $text
				);

	//Use Curl to communicate  
	$ch = curl_init('http://127.0.0.1:3000/message/?'.http_build_query($data));
	curl_exec($ch);
	curl_close($ch);
	echo "hello";
?>