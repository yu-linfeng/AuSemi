function treePanel_Listener(node, event){
		var id = event.data.id;
		if (event.data.leaf){
			if (id == 'overview'){		//公司简介
				showOverview(id);
			}else if (id == 'quality'){						//企业质量
				showQuality(id);
			}else if (id=='culture'){			//企业文化
				showCulture(id);
			}else if (id == 'carrers'){		//招聘信息
				showCarrers(id);
			}else if (id == 'news'){		//新闻中心
				showNews(id);
			}else if (id == 'message'){		//留言管理
//				showMessage(id);	
				showMessage();
			}else if (id == 'agent'){			//代理商
				showAgent();		
			}else if(id == 'hvMosfet'){
				showHvMosfet();
			}else if(id == 'lvMosfet'){			//Low_Medium Voltage Trench Mosfet 
				showLvMosfet();		
			}else if (id == 'vdMosfet'){
				showVdMosfet();
			}else if (id == 'srModule'){		//SR Control Module
				showSrModule();
			}else if (id == 'checkInfo'){			//管理员信息
				showCheckInfo(id);
			}else if (id == 'editInfo'){
				showEditInfo(id);
			}
		}
	};
	