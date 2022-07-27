package com.generation.cityservice.model.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generation.cityservice.model.entities.City;

@Repository
public interface CitiesRepository extends JpaRepository<City,Integer>
{

}
