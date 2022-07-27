package com.generation.cityservice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebAppController
{

	@RequestMapping("/cities/testload")
	public String testPage()
	{
		return "TestLoading";
	}
	
	
	@RequestMapping("/cities/testnewcity")
	public String testNewCity()
	{
		return "TestNewCity";
	}
	
	
	@RequestMapping("/cities/testdeletecity")
	public String testDeletecity()
	{
		return "TestDeleteCity";
	}
	
	@RequestMapping("/cities/main")
	public String mainPage()
	{
		return "Index";
	}
	
	
	
}
