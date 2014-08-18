package com.ausemi2.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import com.ausemi2.bean.Message;
import com.ausemi2.dao.MessageDao;
import com.opensymphony.xwork2.ActionSupport;

public class MessageAction extends ActionSupport {
	private List<Message> allMessage;
	private Message message;
	private MessageDao messageDao;
	private Map flag;
	private JSONObject jsonObject;
	private String json, suggestionTitle, suggestionContent, suggestionEmail;
	
	public String getSuggestionTitle() {
		return suggestionTitle;
	}
	public void setSuggestionTitle(String suggestionTitle) {
		this.suggestionTitle = suggestionTitle;
	}
	public String getSuggestionContent() {
		return suggestionContent;
	}
	public void setSuggestionContent(String suggestionContent) {
		this.suggestionContent = suggestionContent;
	}
	public String getSuggestionEmail() {
		return suggestionEmail;
	}
	public void setSuggestionEmail(String suggestionEmail) {
		this.suggestionEmail = suggestionEmail;
	}
	public String getJson() {
		return json;
	}
	public void setJson(String json) {
		this.json = json;
	}
	public Message getMessage() {
		return message;
	}
	public void setMessage(Message message) {
		this.message = message;
	}
	public Map getFlag() {
		return flag;
	}
	public void setFlag(Map flag) {
		this.flag = flag;
	}
	public JSONObject getJsonObject() {
		return jsonObject;
	}
	public void setJsonObject(JSONObject jsonObject) {
		this.jsonObject = jsonObject;
	}
	public List<Message> getAllMessage() {
		return allMessage;
	}
	public void setAllMessage(List<Message> allMessage) {
		this.allMessage = allMessage;
	}
	public MessageDao getMessageDao() {
		return messageDao;
	}
	public void setMessageDao(MessageDao messageDao) {
		this.messageDao = messageDao;
	}
	//查询
	public String findAllMessage() throws Exception{
		allMessage = new ArrayList<Message>();
		messageDao = new MessageDao();
		allMessage = messageDao.find();
		
		return SUCCESS;
	}
	//删除
	public String deleteMessage() throws Exception{
		flag = new HashMap<String, Object>();
		message = new Message();
		messageDao = new MessageDao();
//		System.out.println(json);
		jsonObject = JSONObject.fromObject(json);
		message.setId(jsonObject.getInt("id"));
		if (messageDao.delete(message.getId())){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		
		return SUCCESS;
	}
	//新增
	public String newMessage() throws Exception{
		message = new Message();
		messageDao = new MessageDao();
		flag = new HashMap<String, Object>();
		System.out.println(suggestionTitle);
		System.out.println(suggestionContent);
		System.out.println(suggestionEmail);
		message.setMessageTitle(suggestionTitle);
		message.setMessage(suggestionContent);
		message.setMail(suggestionEmail);
		if (messageDao.newMessage(message)){
			flag.put("success", true);
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}
}
