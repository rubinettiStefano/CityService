<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
	<html>
		<head>
			<meta charset="ISO-8859-1">
			<title> Test invio dati a service </title>
			<!-- 
				jQuery, la libreria che uso per fare AJAX, per parlare col server			
			 -->
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
			
			<script>
				let city = 
				{
					"name":prompt('Inserire nome'), 
					"picture":prompt('Inserire immagine')
				};
				
				
				$.ajax
				(
					{
						type:"POST",			
						url:"../cities",
						contentType:'application/json',
						data: JSON.stringify(city),  //Una specie di toString in JSON di city
						success:function(data)
						{
							console.log(data);
						},
						statusCode:
						{
							"400": function(){console.log("Bad request")},	
							"403": function(){console.log("Forbidden")}
						}
					}
				);
			
			
			</script>
				
			
		</head>
		<body>
				Aprite la console...
		</body>
</html>