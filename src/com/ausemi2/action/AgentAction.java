package com.ausemi2.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.ausemi2.bean.Agent;
import com.ausemi2.dao.AgentDao;
import com.opensymphony.xwork2.ActionSupport;

public class AgentAction extends ActionSupport {
	public Agent agent;	
	public List<Agent> allAgent;	
	public AgentDao agentDao;
	public Map flag;
	public String json;
	public JSONObject jsonObject;
	public int agentId;	
	
	public Agent getAgent() {
		return agent;
	}
	public void setAgent(Agent agent) {
		this.agent = agent;
	}
	public List<Agent> getAllAgent() {
		return allAgent;
	}
	public void setAllAgent(List<Agent> allAgent) {
		this.allAgent = allAgent;
	}
	public AgentDao getAgentDao() {
		return agentDao;
	}
	public void setAgentDao(AgentDao agentDao) {
		this.agentDao = agentDao;
	}
	public Map getFlag() {
		return flag;
	}
	public void setFlag(Map flag) {
		this.flag = flag;
	}
	public String getJson() {
		return json;
	}
	public void setJson(String json) {
		this.json = json;
	}
	public JSONObject getJsonObject() {
		return jsonObject;
	}
	public void setJsonObject(JSONObject jsonObject) {
		this.jsonObject = jsonObject;
	}
	public int getAgentId() {
		return agentId;
	}
	public void setAgentId(int agentId) {
		this.agentId = agentId;
	}
//新增
	public String newAgent() throws Exception{
		flag = new HashMap<String, Object>();
		agent = new Agent();
		agentDao = new AgentDao();
		jsonObject = JSONObject.fromObject(json);
		agent.setArea(jsonObject.getString("area"));
		agent.setCompanyName(jsonObject.getString("companyName"));
		agent.setUrl(jsonObject.getString("url"));
		agent.setAgentContent(jsonObject.getString("agentContent"));
		if (agentDao.add(agent)){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}
	//返回所有
	public String allAgent() throws Exception{
		flag = new HashMap<String, Object>();
		agentDao = new AgentDao();
		allAgent = new ArrayList<Agent>();
		allAgent = agentDao.all();
		return SUCCESS;
	}
	//删除
	public String deleteAgent() throws Exception{
		flag = new HashMap<String, Object>();
		agent = new Agent();
		agentDao = new AgentDao();
		jsonObject = JSONObject.fromObject(json);
		agent.setAgentId(jsonObject.getInt("agentId"));
		if (agentDao.delete(agent.getAgentId())){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}
	//修改
	public String editAgent() throws Exception{
		flag = new HashMap<String, Object>();
		agent = new Agent();
		agentDao = new AgentDao();
		jsonObject = JSONObject.fromObject(json);
		agent.setAgentId(jsonObject.getInt("agentId"));
		agent.setArea(jsonObject.getString("area"));
		agent.setCompanyName(jsonObject.getString("companyName"));
		agent.setUrl(jsonObject.getString("url"));
		agent.setAgentContent(jsonObject.getString("agentContent"));
		if (agentDao.edit(agent)){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}
}
