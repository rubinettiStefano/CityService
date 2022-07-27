package com.generation.cityservice.model.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class City
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String name, picture;
	
	@OneToMany(mappedBy="city", cascade=CascadeType.MERGE)
	private List<Building> buildings = new ArrayList<Building>();
	
	public void addBuilding(Building building)
	{
		// il contains USA equals!!
		if(buildings.contains(building))
			throw new RuntimeException("Building already present");
		else
		{
			building.setCity(this);
			this.buildings.add(building);
		}
	}

	public void removeBuilding(int buildingID)
	{
		for(Building b : buildings)
			if(b.getId()==buildingID)
			{
				buildings.remove(b);
				return;
			}
		throw new RuntimeException("Building with id "+buildingID+" not present, cannot remove");
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

	public String getPicture()
	{
		return picture;
	}

	public void setPicture(String picture)
	{
		this.picture = picture;
	}

	public List<Building> getBuildings()
	{
		return buildings;
	}

	public void setBuildings(List<Building> buildings)
	{
		this.buildings = buildings;
	}
	
	@Override
	public boolean equals(Object other)
	{
		if(other==null)
			return false;
		if(this==other)			
			return true;
		if(!(other instanceof City))
			return false;
		
		City c = (City) other;	
		
		return c.id == this.id;
	}
	
	@Override
	public int hashCode()
	{
		return id;
	}
}
//public void removeBuilding(Building building)
//{
//	if(buildings.contains(building))
//		buildings.remove(building);
//	else
//		throw new RuntimeException("Building to remove not present");
//}
