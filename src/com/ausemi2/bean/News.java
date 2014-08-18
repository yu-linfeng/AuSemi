package com.ausemi2.bean;

public class News {
	private int newsId;
	private String newsCentre;
	private String news;

	/**
	 * 
	 */
	public News() {
		super();
	}

	public int getNewsId() {
		return newsId;
	}

	public void setNewsId(int newsId) {
		this.newsId = newsId;
	}

	public String getNewsCentre() {
		return newsCentre;
	}

	public void setNewsCentre(String newsCentre) {
		this.newsCentre = newsCentre;
	}

	public String getNews() {
		return news;
	}

	public void setNews(String news) {
		this.news = news;
	}
}
