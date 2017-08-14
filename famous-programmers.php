<?php

	//connect to db
	$mysqli = new mysqli("dbbox", "root", "password", "angular-workshop-2");

	//grab everything from our table
	$result = $mysqli->query("SELECT * FROM famous_programmers;");

	//we'll add each row to this array
	$resultsArray = [];

	//return an associative array for each results
	while( $row = $result->fetch_assoc() )
	{
		array_push( $resultsArray, $row );
	}

	//set the correct content type of the response
	header("Content-Type", "application/json");

	//encode the array as a correctly formatted json string
	$jsonContent = json_encode( $resultsArray );

	//add the content to the response
	echo $jsonContent;