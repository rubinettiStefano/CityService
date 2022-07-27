<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
	<html>
		<head>
			<meta charset="ISO-8859-1">
			<title> Test caricamento dati da service </title>
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
			
			<script>
			console.log("Sto provando a caricare i dati dal web service /cities");
			// $ = jQuery, oggetto jQuery, il dollaro è la vostra LIBRERIA	
			$.getJSON
			(
				"../cities",		// indirizzo da cui voglio andare a leggere
									// il MIO SERVICE SPRING BOOT!
				function(data)		// funzione che verrà eseguita QUANDO avremo LETTO. CALLBACK
				{
					console.log(data);
				}
			);
				
			
			</script>
				
			
		</head>
		<body>
				Aprite la console...
		</body>
</html>