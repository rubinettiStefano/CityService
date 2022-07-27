package com.generation.cityservice.model.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Citizen
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String name,surname,dob,job;
	
	@ManyToOne
	@JoinColumn(name="buildingid") 
	@JsonIgnore
	private Building building;

	public int getId()
	{
		return id;
	}

	public void setId(int id)
	{
		this.id = id;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getSurname()
	{
		return surname;
	}

	public void setSurname(String surname)
	{
		this.surname = surname;
	}

	public String getDob()
	{
		return dob;
	}

	public void setDob(String dob)
	{
		this.dob = dob;
	}

	public String getJob()
	{
		return job;
	}

	public void setJob(String job)
	{
		this.job = job;
	}

	public Building getBuilding()
	{
		return building;
	}

	public void setBuilding(Building building)
	{
		this.building = building;
	}
	
	@Override
	public boolean equals(Object other)
	{
		if(other==null)
			return false;
		if(this==other)			
			return true;
		if(!(other instanceof Citizen))
			return false;
		
		Citizen c = (Citizen) other;	
		
		return c.id == this.id;
	}
	
	@Override
	public int hashCode()
	{
		return id;
	}

}
