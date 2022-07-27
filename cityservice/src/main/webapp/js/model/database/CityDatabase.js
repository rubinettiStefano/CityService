class CityDatabase
{//MOCK
	constructor()
	{
		this.cities = [];
		// Qui farò AJAX. Qui chiederò i dati al servizio
		// .getJSON richiama il metodo AJAX, ma mette in automatico GET come verbo
		// e traduce in JSON
		$.getJSON
		(
			"../cities",
			(function(data)
			{
				// SPORCO! PROBLEMATICO! MA funzionerà.
				// metto i dati che mi servivano in questo vettore in cityDatabase
				// questo this è la FUNZIONE IN CUI SONO!!
				// BINDING DEL THIS - DEVO DIRGLI CHI PERDINDINDINA E' THIS
				this.cities = data;	
				console.log(data);			
			}).bind(this)				// devo dirgli chi è il suo THIS
										// devo dirgli che THIS è l'oggetto in cui si trova
										// quale oggetto? cityDatabase
		);
	}
		
	getCityByName(name)
	{
		name = name.toLowerCase().trim();
		for(const city of this.cities)
			if(city.name.toLowerCase().trim()==name)
				return true;
		
		return false;
	}
	
	getCityIdForCitizen(citizenid)
	{
		for(let i=0;i<this.cities.length;i++)
			for(let k=0;k<this.cities[i].buildings.length;k++)
				for(let j=0;j<this.cities[i].buildings[k].citizens.length;j++)
					if(this.cities[i].buildings[k].citizens[j].id==citizenid)
						return this.cities[i].id;
		throw "City not found";
	}

	removeCitizen(citizenid)
	{
		alert("TODO");
	}
	
	
	getCity(id)
	{
		for(let i=0;i<this.cities.length;i++)
			if(this.cities[i].id==id)
				return this.cities[i];
		return null;
	}
	
	insertCity(name,picture)
	{
		if(name=="" || picture=="")
			throw "Name and picture required";
			
		let city = {"name":name, "picture":picture};
		
		$.ajax
		(
			{
				type:"POST",			
				url:"../cities",
				contentType:'application/json',
				data: JSON.stringify(city),  	// Una specie di toString in JSON di city
				async: false,					// scelta comoda ma poco efficiente... aspetto che il service mi risponda
				success:(function(data)
				{
					// mi hai inserito la città? Me la hai rimandata con l'id? AGGIORNO LA MIA LISTA
					// mi aspetto che il servizio mi mandi la nuova città, con tanto di id. La aggiungo alla mia lista
					console.log(data);
					this.cities.push(eval(data));
				}).bind(this)
				,
				statusCode:
				{
					"400": function(){console.log("Bad request")},	
					"403": function(){console.log("Forbidden")}
				}
			}
		);
	}
	
	
	insertBuilding(name,type,address,cityid)
	{
		if(name==''||type==''||address=='')
			throw "Invalid data, cannot save";
		
		let building = {"name":name, "type":type, "address":address};
		
		$.ajax
		(
			{
				type:"POST",			
				url:"../cities/"+cityid+"/buildings",
				contentType:'application/json',
				data: JSON.stringify(building),  	// Una specie di toString in JSON di city
				async: false,					// scelta comoda ma poco efficiente... aspetto che il service mi risponda
				success:(function(data)
				{
					// mi hai inserito la città? Me la hai rimandata con l'id? AGGIORNO LA MIA LISTA
					// mi aspetto che il servizio mi mandi la nuova città, con tanto di id. La aggiungo alla mia lista
					this.getCity(cityid).buildings.push(eval(data));
					// eval = trasforma la response in JSON
					// alternativa a JSON.parse
				}).bind(this)
				,
				statusCode:
				{
					"400": function(){console.log("Bad request")},	
					"403": function(){console.log("Forbidden")}
				}
			}
		);
		
	}
	
	deleteCity(id)
	{
		$.ajax
		(
			{
				type:"DELETE",			
				url:"../cities/"+id,
				contentType:'application/json',
				async:false,
				success:(function(data)
				{
					let pos = -1;
					for(let i=0;i<this.cities.length;i++)
						if(this.cities[i].id==id)
						{
							pos = i;
							break;
						}
						
					this.cities.splice(pos,1);	
				}).bind(this)
				,
				statusCode:
				{
					"400": function(){alert("Bad request")},	
					"403": function(){alert("Forbidden")},
					"404":function(){alert("Not found")}
				}
			}
		);
	}
	
}