package com.ausemi2.action;

import java.util.HashMap;
import java.util.Map;

import com.ausemi2.bean.User;
import com.ausemi2.dao.UserDao;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class Login extends ActionSupport {
	private User user;
	private UserDao login;
	private Map flag;
	private String name, password;
	private ActionContext actionContext;
	
	public UserDao getLogin() {
		return login;
	}
	public void setLogin(UserDao login) {
		this.login = login;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Map getFlag() {
		return flag;
	}
	public void setFlag(Map flag) {
		this.flag = flag;
	}

	@Override
	public String execute() throws Exception {
		flag = new HashMap<String, Object>();
		user = new User();
		login = new UserDao();		//实例化
		user.setUsername(name);
		user.setPwd(password);
		if (login.login(user.getUsername(), user.getPwd())){
			flag.put("success", true);
			//保存session，防止未登录进行访问
			ActionContext actionContext = ActionContext.getContext();
	        Map session = actionContext.getSession();
	        session.put("username", name);
	        session.put("userpass", password);
		}else{
			flag.put("failure", true);
		}
		return SUCCESS;
	}

}
