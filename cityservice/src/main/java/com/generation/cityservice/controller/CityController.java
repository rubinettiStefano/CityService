package com.generation.cityservice.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.generation.cityservice.model.entities.City;
import com.generation.cityservice.model.repositories.CitiesRepository;

@RestController
public class CityController
{
	//Inietto la dipendenza di cui ho bisogno
	@Autowired
	CitiesRepository citiesRepository;
	
	//Mappatura: a che URI sono collegato, che indirizzo va chiamato per "attivarmi"
	@GetMapping("/cities/{id}")
			//Di default le response prodotte da SpringBoot sono in formato JSON
			//In questo caso il JSON può contenere qualsiasi Object, nel nostro caso
			//una città o una Stringa(messaggio di errore)
	public ResponseEntity<Object> getOne(@PathVariable int id)
	{
		Optional<City> city = citiesRepository.findById(id);
		
		return 		city.isPresent()										?
					ResponseEntity.ok(city.get())							:
					ResponseEntity.status(HttpStatus.NOT_FOUND).body("") 	;
		
	}
	
	@GetMapping("/cities")
	public ResponseEntity<Object> getAll()
	{
		try
		{
			List<City> cities = citiesRepository.findAll();
			return ResponseEntity.ok(cities);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("");
		}
	}
	
	@PostMapping("/cities")
	public ResponseEntity<Object> insertCity(@RequestBody City city)
	{
		if
		(
			city.getName()==null 	|| city.getName().isEmpty()
			||
			city.getPicture()==null || city.getPicture().isEmpty()
		)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("");
		
		if(citiesRepository.findByName(city.getName()).isPresent())
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("");
		
		citiesRepository.save(city);
		
		return ResponseEntity.ok(city);
		
	}
	
	@DeleteMapping("/cities/{id}")
	public ResponseEntity<Object> deleteCity(@PathVariable int id)
	{
		citiesRepository.deleteById(id);
		return ResponseEntity.ok("");
	}
	
	
	
	
	
}
