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
				let id = prompt('Inserire id');				
				
				$.ajax
				(
					{
						type:"DELETE",			
						url:"../cities/"+id,
						contentType:'application/json',
						success:function(data)
						{
							console.log(data);
						},
						statusCode:
						{
							"400": function(){console.log("Bad request")},	
							"403": function(){console.log("Forbidden")},
							"404":function(){console.log("Not found")}
						}
					}
				);
			
			
			</script>
				
			
		</head>
		<body>
				Aprite la console...
		</body>
</html>