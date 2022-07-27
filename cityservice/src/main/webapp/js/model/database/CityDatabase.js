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
	
	refreshDB()
	{
		let json = JSON.stringify(this.cities);
		localStorage.setItem("javacities", json);
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
		let citypos = null;
		let buildingpos = null;
		let citizenpos = null;
		for(let i=0;i<this.cities.length;i++)
			for(let k=0;k<this.cities[i].buildings.length;k++)
				for(let j=0;j<this.cities[i].buildings[k].citizens.length;j++)
					if(this.cities[i].buildings[k].citizens[j].id==citizenid)
					{
						citypos 		= i;	
						buildingpos 	= k;
						citizenpos 		= j;
						break;
					}
		if(citypos==null)
			throw "Citizen not found";
		else
			this.cities[citypos].buildings[buildingpos].citizens.splice(citizenpos, 1);
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
			
		if(this.getCityByName(name))
			throw "City already present";
		
		let res = 1;
		for(let i=0;i<this.cities.length;i++)
			if(this.cities[i].id>=res)
				res=this.cities[i].id+1;
				
		let newCity = new City(res,name,picture,[]);
		this.cities.push(newCity);
		
		this.refreshDB();
		
		return true;
	}
	
	
	insertBuilding(name,type,address,cityid)
	{
		if(name==''||type==''||address=='')
			throw "Invalid data, cannot save";
		
		
		let newid = -1;
		for(let i=0;i<this.cities.length;i++)
			for(let k=0;k<this.cities[i].buildings.length;k++)
				if(this.cities[i].buildings[k].id>=newid)
					newid = this.cities[i].buildings[k].id+1;
				
		let b = new Building(newid, name, type, address, []);		
				
		let city = this.getCity(cityid);
		if(!city)
			throw "Cannot find city with id: "+cityid;
		city.buildings.push(b);
		this.refreshDB();
	}
	
	deleteCity(id)
	{
		let pos = -1;
		for(let i=0;i<this.cities.length;i++)
			if(this.cities[i].id==id)
			{
				pos = i;
				break;
			}
			
		if(pos>-1)
		{
			this.cities.splice(pos,1);
			this.refreshDB();
			return true;
		}
		else
			return false;
		
	}
	
	makeFakeData()
	{
		
		let b1 = new Building
		(
			1,
			"Java Academy",
			"Office",
			"Via Lecco, 20",
			this.getRandomCitizens(1,10)
		);
		
		let b2 = new Building
		(
			2,
			"Salsa Academy",
			"Office",
			"Via Bergamo, 20",
			this.getRandomCitizens(11,20)
		);
		
		let b3 = new Building
		(
			3,
			"Casterly Rock",
			"Fortification",
			"Via dell'oro, 10",
			this.getRandomCitizens(21,30)
		);
		
		let monza = new City
		(
			1,
			"Monza",
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx3j29k0O2xtb-IBeyy1uTCnreCDrdz8hwnw&usqp=CAU",
			[b1,b2]
		);
		
		let milano = new City
		(
			2,
			"Milano",
			"https://static.wikia.nocookie.net/lotr/images/b/b0/Fotr6.jpg/revision/latest?cb=20130419144638",
			[b3]
		);
		
		this.cities = [monza,milano];
	}
	
	
	getRandomCitizen(id)
	{
		let names = ["Lorenzo","Ferdinando","Giuseppe","Nicolò","Eleonora","Cosimo","Diego","Simone","Stefano"];
		let surnames = ["Rossi","Bianchi","Verdi","Gialli","Fumagalli","Brambilla","Piddu","Primerano","Rubinetti","Ienco","Arostoi"];
		let jobs = ["Teacher","Programmer","Student","Traveler","Blogger","Influencer","Artist","Fighter"];

		return new Citizen(id, this.random(names),this.random(surnames), this.randomDob(), this.random(jobs))
	}
	
	getRandomCitizens(minID,maxID)
	{
		let citizens = [];
		for(let i=minID;i<=maxID;i++)
			citizens.push(this.getRandomCitizen(i));
		return citizens;
	}
	
	random(v)
	{
		return v[parseInt(v.length * Math.random())];
	}
	
	randomDob()
	{
		let day = parseInt(Math.random() * 28)+1;
		let month = parseInt(Math.random() * 12)+1;
		let year = 1970 + parseInt(Math.random() * 30);
		
		if(day<10) 		day="0"+day;
		if(month<10) 	month="0"+month;
		return day+"/"+month+"/"+year;
	}
	
}