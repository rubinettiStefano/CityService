package com.generation.cityservice.model.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.generation.cityservice.model.entities.Building;

@Repository
public interface BuildingsRepository extends JpaRepository<Building,Integer>
{

}
