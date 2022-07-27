package com.generation.cityservice.model.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Building
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String name,type,address;
	
	@ManyToOne
	@JoinColumn(name="cityid") 
	@JsonIgnore
	private City city;
	

	@OneToMany(mappedBy="building", cascade=CascadeType.MERGE)
	private List<Citizen> citizens = new ArrayList<Citizen>();
	
	public void addCitizen(Citizen citizen)
	{
		// il contains USA equals!!
		if(citizens.contains(citizen))
			throw new RuntimeException("Citizen already present");
		else
		{
			citizen.setBuilding(this);
			this.citizens.add(citizen);
		}
	}

	public void removeCitizen(int citizenID)
	{
		for(Citizen c : citizens)
			if(c.getId()==citizenID)
			{
				citizens.remove(c);
				return;
			}
		throw new RuntimeException("Citizen with id "+citizenID+" not present, cannot remove");
	}	
	
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

	public String getType()
	{
		return type;
	}

	public void setType(String type)
	{
		this.type = type;
	}

	public String getAddress()
	{
		return address;
	}

	public void setAddress(String address)
	{
		this.address = address;
	}

	public City getCity()
	{
		return city;
	}

	public void setCity(City city)
	{
		this.city = city;
	}

	@Override
	public boolean equals(Object other)
	{
		if(other==null)
			return false;
		if(this==other)			// == fra oggetti = la stessa cosa
			return true;
		//instanceof: a instanceof A : l'oggetto a è di classe A 
		// ferdinando instanceof Teacher => true
		// stefano instanceof Teacher => true
		// ferdinando instanceof Tronista => false
		if(!(other instanceof Building))
			return false;
		
		Building b = (Building) other;	
		
		return b.id == this.id;
	}
	
	@Override
	public int hashCode()
	{
		return id;
	}

	public List<Citizen> getCitizens()
	{
		return citizens;
	}

	public void setCitizens(List<Citizen> citizens)
	{
		this.citizens = citizens;
	}
	
	
}
