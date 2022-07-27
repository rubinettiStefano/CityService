package com.generation.cityservice.model.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generation.cityservice.model.entities.City;

@Repository
public interface CitiesRepository extends JpaRepository<City,Integer>
{
	
	// SELECT * from City WHERE name= nameParameter
	public Optional<City> findByName(String name);
}
