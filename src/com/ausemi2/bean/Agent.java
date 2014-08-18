package com.ausemi2.bean;

public class Agent {
	private int agentId;
	private String area;
	private String companyName;
	private String url;
	private String agentContent;
	
	public Agent(){
		
	}
	public int getAgentId() {
		return agentId;
	}
	public void setAgentId(int agentId) {
		this.agentId = agentId;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getAgentContent() {
		return agentContent;
	}
	public void setAgentContent(String agentContent) {
		this.agentContent = agentContent;
	}

}
