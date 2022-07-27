let controller =
{
	cityDatabase: new CityDatabase(),
	cityView:new CityView(),
	cityList:function()
	{
		controller.hideAllTabs();
		controller.show('divcitydetaillist');
		controller.fill
		(
			'divcitydetaillist',
			"<h2 style='margin-left:10px'>Managed Cities</h2>"+controller.cityView.renderCities(controller.cityDatabase.cities,true)
		);
		
	},
	formNewCity:function()
	{
		controller.hideAllTabs();
		controller.refreshCitiesList();
		controller.show('divnewcity');
		
	},
	insertCity:function(name,picture)
	{
		try
		{
			controller.cityDatabase.insertCity(name,picture);
			
			controller.fill('insertcityresult', "<b style='color:green'>SAVED</b>");
			controller.refreshCitiesList();
		}
		catch(error)
		{
			controller.fill('insertcityresult', "<b style='color:green'>"+error+"</b>");
		}
	},
	deleteCity:function(id)
	{
		controller.hideAllTabs();
		controller.cityDatabase.deleteCity(id);
		controller.fill('insertcityresult', "<b style='color:green'>DELETED</b>");
		controller.cityList();
	},
	cityDetail:function(id)
	{
		controller.hideAllTabs();
		controller.fill
		(
			'divcitydetail', 
			controller.cityView.renderCityDetail
			(
				controller.cityDatabase.getCity(id)
			)
		);
		controller.show('divcitydetail');
	},
	insertNewBuilding: function(name,type,address,cityid)
	{
		try
		{
			controller.cityDatabase.insertBuilding(name,type,address,cityid);
			controller.cityDetail(cityid);
			controller.fill('insertbuildingresult', "<b style='color:green'>SAVED</b>");
			controller.show('insertbuildingresult')
		}
		catch(error)
		{
			controller.fill('insertbuildingresult', "<b style='color:red'>"+error+"</b>");
			controller.show('insertbuildingresult')
		}
		
	},
	formNewCitizen:function()
	{
		alert('Not yer implemented');
	},
	removeCitizen:function(id)
	{
		if(confirm('Do you want to delete citizen with id '+id))
		{
			let cityid = controller.cityDatabase.getCityIdForCitizen(id);
			controller.cityDatabase.removeCitizen(id);
			controller.cityDetail(cityid);
		}	
	},
	hide:function(id)
	{
		document.getElementById(id).style.display = 'none';
	},
	show:function(id)
	{
		document.getElementById(id).style.display = 'block';
	},
	fill:function(id,content)
	{
		document.getElementById(id).innerHTML = content;
	},
	refreshCitiesList:function()
	{
		controller.fill("citynameslist","<h3> Cities already present </h3>"+controller.cityView.renderCities(controller.cityDatabase.cities));
	},
	hideAllTabs:function()
	{
		let tabs = document.getElementsByClassName("tab");
		for(let i=0;i<tabs.length;i++)
			tabs[i].style.display = 'none';
	},
	init:function()
	{
		
				
	}
}