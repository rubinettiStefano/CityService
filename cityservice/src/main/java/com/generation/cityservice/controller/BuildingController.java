package com.generation.cityservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.generation.cityservice.model.entities.Building;
import com.generation.cityservice.model.entities.City;
import com.generation.cityservice.model.repositories.BuildingsRepository;
import com.generation.cityservice.model.repositories.CitiesRepository;

@RestController
public class BuildingController
{
	@Autowired
	CitiesRepository citiesRepository;
	@Autowired
	BuildingsRepository buildingsRepository;
	
	
	@PostMapping("/cities/{cityid}/buildings")
	public ResponseEntity<Object> insertBuilding
	(
			@PathVariable int cityid, 
			@RequestBody Building building
	)
	{
		City city = citiesRepository.findById(cityid).get();
		city.addBuilding(building);
		buildingsRepository.save(building);
		return ResponseEntity.ok(building);
	}
}
