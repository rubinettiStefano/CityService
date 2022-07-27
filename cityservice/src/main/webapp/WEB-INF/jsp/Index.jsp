<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="ISO-8859-1">
		<title>City Manager</title>
		<script src="/js/model/entities/City.js" ></script>
		<script src="/js/model/entities/Building.js" ></script>
		<script src="/js/model/entities/Citizen.js"></script>
		<script src="/js/model/database/CityDatabase.js"> </script>
		<script src="/js/view/CityView.js"> </script>
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
		<link rel="stylesheet" href="/css/main.css">
		<!--  INCLUDO jQuery, lo scarico da web, libreria web -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	</head>
	<body>
		<div id="menu" style="padding-bottom:10px">
			<img src="/img/logo.png" />
			<div style="padding-left:10px">
				<input type="button" class="w3-btn menubutton" value="cities" onClick="controller.cityList()" />
				<input type="button" class="w3-btn menubutton" value="newcity" onClick="controller.formNewCity()" />
				<input type="button" class="w3-btn menubutton" value="newcitizen" onClick="controller.formNewCitizen()" />
			</div>
		</div>
		
		<div class="tab" id="divcitydetaillist"></div>
		
		<div class="tab" id="divcitydetail"></div>
		
		<div class="w3-row tab" style="display:none" id="divnewcity">
			<div class="w3-half" id="citynameslist">
				Lista città presenti
			</div>
			<div class="w3-half">
				<form name="formnewcity">
					<h3>Insert New City</h3>
					Name
					<input type="text" class="w3-input" name="cityname"/>
					Picture
					<input type="text" class="w3-input" name="picture"/>
					<input 
						type="button" 
						value="Insert" 
						class="w3-btn menubutton" 
						style="width:100%"
						onClick="controller.insertCity(formnewcity.cityname.value,formnewcity.picture.value)"
					/>
					<div id="insertcityresult"></div>
				</form>
			</div>
		</div>
		
	</body>
		<script src="/js/controller/citycontroller.js"></script>
		<script> controller.init(); // VIENE ESEGUITO UNA VOLTA SOLA </script>
</html>