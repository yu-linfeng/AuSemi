package com.ausemi2.action;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.opensymphony.xwork2.ActionSupport;

public class EmailAction extends ActionSupport {
	private Map flag;
	private String company;
	private String department;
	private String name;
	private String telephone;
	private String mobile;
	private String address;
	private String email;
	private String city;
	private String province;
	private String region;
	private String content;

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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
		if (send()) {
			flag.put("success", true);
		} else {
			flag.put("error", true);
		}
		return SUCCESS;
	}

	public boolean send() {
		boolean flag = true;
		try {
			/* 获取邮件发送器Transport */
			// 设置属性Properties
			Properties props = new Properties();
			// 设置发送邮件的协议SMTP
			props.put("mail.transport.protocol", "smtp");
			// 是否进行登录验证
			props.put("mail.transport.auth", "true");
			// 发送之前的环境存入session对象中
			Session session = Session.getDefaultInstance(props);
			// log
			//session.setDebug(true);
			// 获取一个邮件发送器Transport
			Transport transport = session.getTransport();
			/* 准备邮件Message */
			Message msg = new MimeMessage(session);
			// 设置发件人
			msg.setFrom(new InternetAddress("contact@ausemi.com"));
			// 设置邮件主题
			msg.setSubject(company);
			// 设置邮件内容
			msg.setText("Company: " + company + "\r\n" + "Department: "
					+ department + "\r\n" + "Name: " + name + "\r\n"
					+ "Telephone: " + telephone + "\r\n" + "Mobile: " + mobile
					+ "\r\n" + "Address: " + address + "\r\n" + "E-Mail: "
					+ email + "\r\n" + "City: " + city + "\r\n" + "Province: "
					+ province + "\r\n" + "Region: " + region + "\r\n" + "Content: " + content );
			/* 发送邮件send */
			// 邮件发送器连接邮件服务器
			transport.connect("smtp.ausemi.com", 25, "contact@ausemi.com",
					"contactausemi");
			// 发送邮件
			transport.sendMessage(msg, new Address[] { new InternetAddress(
					"sales@ausemi.com") });	//收件人
		} catch (Exception e) {
			e.printStackTrace();
			flag = false;
		}
		return flag;

	}
}
