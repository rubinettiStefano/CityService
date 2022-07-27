/**
 * 
 */
class CityView
{
	constructor()
	{
		
	}
		
	renderCity(city,complete)
	{
		return  !complete	?
					`
						<div class="w3-row city">
							<div class="w3-third">
								${city.name}
							</div>
							<div class="w3-third">
								<input
									 type=button 
									 value="delete" 
									 class="menubutton w3-btn"
									 onClick="controller.deleteCity(${city.id})"
								 />
							</div>
							<div class="w3-third">
								<input 
									type=button 
									value="see detail" 
									class="menubutton w3-btn"
									onClick="controller.cityDetail(${city.id})"
							    />
							</div>
						  </div>
					   `			
					   :
					  `
					  	<div class="w3-quarter">
						  	 <div class="city">
						  	 		<center>
									<h3><b>${city.name}</b></h3> 
									<p>
										<img src="${city.picture}" width="300" height="150" />
									</p>
									<p >
										Currently <b>${city.buildings.length}</b> 
										building${city.buildings.length!=1 ? 's' : ''}
									<p>
									<p>
										<input 
											type=button 
											value="see detail" 
											class="menubutton w3-btn"
											onClick="controller.cityDetail(${city.id})"
								   		/> <br />
										<input 
											type=button 
											value="delete" 
											class="menubutton w3-btn"
											 onClick="controller.deleteCity(${city.id})"
										/>
									</p>
									</center>
							  </div>
						 </div>`
				  ;
	}
	
	renderCities(cities,complete)
	{
		let res="<div class='w3-row'>";
		for(const city of cities)
			res+=this.renderCity(city,complete);
		
		res+="</div>";
		
		return res;
	}
	
	renderCityDetail(city)
	{
		return 	`
					<div class="city">
						<h2>
							<b> ${city.name}</b>  
							
						 </h2>
						 <h3> Add new building </h3>
						 <div class="w3-row">
						 	<div class="w3-half">
								<form name="formnewbuilding">
									<input 
										type="text" 
										name="buildingname"
										placeholder="Insert building name" 
									/>
									<select name="type">
										<option value=""> Select a type </option>
										<option value="Residential"> Residential </option>
										<option value="Office"> Office </option>
										<option value="Industry"> Industry </option>
										<option value="Park"> Park </option>
									</select>								
									<input 
										type="text" 
										name="address" 
										placeholder="Insert building address" 

									/>	
									<input type="hidden" name="cityid" value="${city.id}" />

									<input 	type="button" 
											class="w3-btn menubutton" 
											value="insert" 
											style="width:100px !important;"	
											onClick="controller.insertNewBuilding(
												formnewbuilding.buildingname.value,
												formnewbuilding.type.value,
												formnewbuilding.address.value,
												formnewbuilding.cityid.value
											)"											
												
									/>
								</form>										
						 	</div>
						 	<div id="insertbuildingresult"></div>
						 </div>
						<img 
							src="${city.picture}" 
							style="width:1000px;height:400px;border:3px solid black;margin-top:10px;display:block"	
						 />
						<h3> Buildings </h3>
						${this.renderCityBuildings(city)}
					</div>
				`;
	}
	
	renderCityBuildings(city)
	{
		let res = ``;
					
		
		for(let i=0;i<city.buildings.length;i++)
			res+= this.renderBuilding(city.buildings[i]);
		return res;
	}
	
	renderBuilding(building)
	{
		return  `
					<div class=building>
						<h4> ${building.name} - ${building.type}, ${building.address} </h4>
						<div class="residents">
							${this.renderCitizens(building)}
						</div>
					</div>
				`;
	}
	
	renderCitizens(building)
	{
		let res = "";
		for(let i=0;i<building.citizens.length;i++)
			res+=this.renderCitizen(building.citizens[i]);
		return res;
	}
	
	renderCitizen(citizen)
	{
		return `<div class="citizen " >
					${citizen.name} ${citizen.surname}, ${citizen.job} <br /> born on ${citizen.dob},
					 ${2022 - parseInt(citizen.dob.split("/")[2])} years old 
					 	<input 
					 		type="button" 
					 		value="x" 
					 		class="menubutton" 
					 		style="width:30px !important"
					 		onClick="controller.removeCitizen(${citizen.id})" 
					 	/>
					 
				</div>
		`;
	}
	
	
	
	
}

//Più comune: 1920 * 1080
//Portatile: 1378 *1024
//4k :       3980 * 2100
//2k tablet: 2000 * 1200



