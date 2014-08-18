//var lvMosfetComp;
var showLvMosfet = function(){
//	lvMosfetComp = centerPanel.getComponent(id);
	var checkBox = Ext.create('Ext.selection.CheckboxModel');   		//grid中添加付复选框按钮
//	if (!lvMosfetComp){
		/*加载数据*/
		var store = Ext.create('Ext.data.Store',{
			storeId:'lvMosfetStore',
	 	    model:LvMosfet,
//		    pageSize: 16,
		    proxy: {
		    	type: 'ajax',
		    	url: 'allLvMosfet',
		    	reader: {
		    		type: 'json',
		    	}
		    }
		}).load();
		/*显示数据*/
	var lvMosfetComp = Ext.create('Ext.grid.Panel',{
			id:'lvMosfetGrid',
//			title:'Low_Medium Voltage Trench Mosfet',
			store:Ext.data.StoreManager.lookup('lvMosfetStore'),
			autoHeight:true,
			autoWidth:true,
			loadMask:true,		//是否在加载数据时显示遮罩效果，默认为false 
			rdsontyp10ableSelection:true,		//能否被选中
			selModel:checkBox,		//添加复选框
//			closable:true,
			columnLines: true,		//是否显示列分割线
			forceFit: true,		//列自动适应
			columns:[
			         {xtype:'rownumberer',header:'序号',align:'center'},		//自动编号
			         {header:'id', dataIndex:'lvMosfetId',hidden:true},			//隐藏ID，会根据ID值进行删除
			         {header:'Product name.', dataIndex:'partNo', align:'center'},
			         {header:'Type', dataIndex:'vtype', align:'center'},
			         {header:'Vdss', dataIndex:'vvdss', align:'center'},
			         {header:'Id(max)', dataIndex:'vid', align:'center'},
			         {header:'Pd(max)', dataIndex:'vpd', align:'center'},
			         {header:'Vgs(max)', dataIndex:'vvgs', align:'center'},
			         {header:'Rdson(typ)(@10V)', dataIndex:'rdsontyp10', align:'center'},
			         {header:'Rdson(typ)(@4.5V)', dataIndex:'rdsontyp4', align:'center'},
			         {header:'Package', dataIndex:'productPackage', align:'center'}
			],
			tbar:[{
				pressed:true,
				text:'发布产品',
				handler:function(){
					var win = Ext.create('Ext.window.Window',{
						title:'新建产品信息',
						height: 400,
					    width: 430,
					    items:{
					    	xtype:'form',
							id:'lvMosfetForm',
							renderTo: Ext.getBody(),
						    height: 370,
						    width: 420,
						    labelAlign: "right",
						    buttonAlign:'center',
						    frame: true,
						    fileUpload: true,	//文件上传
						    defaults:{
				      			width:350,
				      	 		labelWidth: 100
				      		},
				    		items: [			    		
								{xtype:'textfield',id:'partNo', name:'partNo',dataIndex:'partNo', fieldLabel:'Product name.'},
//								{xtype:'textfield', id:'type', name:'type',dataIndex:'type', fieldLabel:'Type(N/P)'},
								{
									xtype:'fieldcontainer',
									fieldLabel:'Type',
									defaults : {
											hideLabel : true
									},
									items:[{
									xtype : 'combo',
									title:'Type',
									mode : 'local',
									triggerAction : 'all',
									forceSelection : true,
									editable : false,
									id:'typeNP',
									name : 'typeNP',
									allowBlank:false,
									displayField : 'name',
									valueField : 'value',
									queryMode : 'local',
									store : Ext.create('Ext.data.Store', {
										fields : [ 'name', 'value' ],
										data : [ 
										         {name : 'N',value : 'N'}, 
										         {name : 'P',value : 'P'}
										        ]
									})
								}]
								},
								{xtype:'textfield', id:'vvdss', name:'vvdss',dataIndex:'vvdss', fieldLabel:'Vdss'},
								{xtype:'textfield',id:'vid', name:'vid',dataIndex:'vid', fieldLabel:'Id(max)'},
								{xtype:'textfield', id:'vpd', name:'vpd',dataIndex:'vpd', fieldLabel:'Pd (max)'},
								{xtype:'textfield', id:'vvgs', name:'vvgs',dataIndex:'vvgs', fieldLabel:'Vgs (max)'},
								{xtype:'textfield', id:'rdsontyp10', name:'rdsontyp10',dataIndex:'rdsontyp10', fieldLabel:'Rdson(typ)(@10V)'},
								{xtype:'textfield', id:'rdsontyp4', name:'rdsontyp4',dataIndex:'rdsontyp4', fieldLabel:'Rdson(typ)(@4.5V)'},
								{xtype:'textfield', id:'productPackage', name:'productPackage',dataIndex:'productPackage', fieldLabel:'Package'},
								{xtype: "fileuploadfield", buttonText: '选择文件',id: "LvMosfetUpdate",name:'LvMosfetUpdate',fieldLabel: "上传文件"}
				      		],
				      		buttons:[{
				      				text:'提交',
				      				handler:function(){
				    					if (this.up('form').getForm().isValid()){
			    						//进度条
			    						Ext.MessageBox.show({
			    					           title:"请稍等",
			    					           msg:"正在上传文件",
			    					           progressText:"",
			    					           width:300,
			    					           progress:true,
			    					           closable:false,
			    					           animEl:"loding"
			    					          });
			    					          var f = function(v) {
			    					            return function(){
			    					              var i = v / 11;
			    					              Ext.MessageBox.updateProgress(i, '');
			    					             };
			    					           };
			    					          for(var i = 1; i < 13; i++) {
			    					            setTimeout(f(i), i * 150);
			    					           };
			    					        var typeNP = Ext.getCmp('typeNP').getValue();
				    						var lm = new LvMosfet({
				    							partNo:this.up('form').getForm().getFieldValues().partNo,
				    							vtype:typeNP,
				    							vvdss:this.up('form').getForm().getFieldValues().vvdss,
				    							vid:this.up('form').getForm().getFieldValues().vid,
				    							vpd:this.up('form').getForm().getFieldValues().vpd,
				    							vvgs:this.up('form').getForm().getFieldValues().vvgs,
				    							rdsontyp10:this.up('form').getForm().getFieldValues().rdsontyp10,
				    							rdsontyp4:this.up('form').getForm().getFieldValues().rdsontyp4,
				    							productPackage:this.up('form').getForm().getFieldValues().productPackage
				    						});
//				    						Ext.Msg.alert('',)
				    						this.up('form').getForm().submit({
				    							url:'newLvMosfet',
				    							waitTitle:'请稍后',
				          						watiMsg:'正在提交信息······',
				          						params:{
				          							json:Ext.JSON.encode(lm.data)
				          						},
				          						success:function(resp, opts){
				          							var success = opts.result.success;
				          							if (success){
				          								Ext.Msg.alert('提示','提交成功!');
					      								var lvMosfetGrid = Ext.getCmp('lvMosfetGrid');
					      								if (lvMosfetGrid){
					      									var store = lvMosfetGrid.getStore();
					      									store.load();
					      									Ext.getCmp('lvMosfetForm').getForm().reset();;
					      								}
				          							}else{
				          								Ext.Msg.alert('提示','提交失败!');
				          							}
				          						},
				          						failure:function(resp, opts){
				          							Ext.Msg.alert('提示','提交失败...!');
				          						}
				    						});
				    					}
				    				}
				      			},{
				      				text:"关闭",
				      				handler: function() {
				      				win.close();
				      			}
				      	   }]
						}
					}).show();
				}
			},{
				xtype:'tbseparator'
			},{
				pressed:true,
				text:'查看产品',
				handler:function(){
					var look = lvMosfetComp.getSelectionModel().getSelection();		//获取复选框的选择
					if (look.length != 1){		//选择的行数不等于1，只能一行一行的进行查看
						Ext.Msg.alert('提示','请选择一行进行查看！');
						return ;
					}else{
						//若选择了一行则通过look显示信息
						var win = Ext.create('Ext.window.Window', {
							title:"查看产品信息",
						    height: 400,
						    width: 430,
						    layout: 'fit',
						    items:{
								renderTo: Ext.getBody(),
							    height: 370,
							    width: 420,
							    labelAlign: "right",
							    buttonAlign:'center',
							    frame: true,
							    defaults:{
					      			width:350,
					      	 		labelWidth: 100
					      		},
					    		items: [			    
									{xtype:'textfield',id:'partNo', name:'partNo',dataIndex:'partNo', fieldLabel:'Product name'},
									{xtype:'textfield', id:'vtype', name:'vtype',dataIndex:'vtype', fieldLabel:'Type(N/P)'},
									{xtype:'textfield', id:'vvdss', name:'vvdss',dataIndex:'vvdss', fieldLabel:'Vdss'},
									{xtype:'textfield',id:'vid', name:'vid',dataIndex:'vid', fieldLabel:'Id(max)'},
									{xtype:'textfield', id:'vpd', name:'vpd',dataIndex:'vpd', fieldLabel:'Pd (max)'},
									{xtype:'textfield', id:'vvgs', name:'vvgs',dataIndex:'vvgs', fieldLabel:'Vgs (max)'},
									{xtype:'textfield', id:'rdsontyp10', name:'rdsontyp10',dataIndex:'rdsontyp10', fieldLabel:'Rdson(typ)(@10V)'},
									{xtype:'textfield', id:'rdsontyp4', name:'rdsontyp4',dataIndex:'rdsontyp4', fieldLabel:'Rdson(typ)(@4.5V)'},
									{xtype:'textfield', id:'productPackage', name:'productPackage',dataIndex:'productPackage', fieldLabel:'Package'},
					      		],
					      		buttons:[{
					      			text:"关闭",
					      			handler: function() {
					      			win.close();
					      			}
					      	   }]
							}
					}).show();
					Ext.getCmp('partNo').setValue(look[0].get('partNo'));
					Ext.getCmp('vtype').setValue(look[0].get('vtype'));
					Ext.getCmp('vvdss').setValue(look[0].get('vvdss'));						
					Ext.getCmp('vid').setValue(look[0].get('vid'));
					Ext.getCmp('vpd').setValue(look[0].get('vpd'));
					Ext.getCmp('vvgs').setValue(look[0].get('vvgs'));
					Ext.getCmp('rdsontyp10').setValue(look[0].get('rdsontyp10'));
					Ext.getCmp('rdsontyp4').setValue(look[0].get('rdsontyp4'));
					Ext.getCmp('productPackage').setValue(look[0].get('productPackage'));
					}
				}
			},{
					xtype:'tbseparator'
			},{
				pressed:true,
				text:'删除产品',
				handler:function(){
					//Ext.Msg.alert('Click', '您单击了删除按钮');
					var look = lvMosfetComp.getSelectionModel().getSelection();		//获取复选框的选择
					if (look.length != 1){
						Ext.Msg.alert('提示','请选择一行进行删除！');
						return ;
					}else{
						Ext.Msg.confirm('提示','您确定要删除该产品吗？', function(btn){
							if (btn == 'yes'){
								var lm = new LvMosfet({
									lvMosfetId:look[0].get('lvMosfetId'),
									partNo:look[0].get('partNo'),
									vtype:look[0].get('vtype'),
									vvdss:look[0].get('vvdss'),
									vid:look[0].get('vid'),
									vpd:look[0].get('vpd'),
									vvgs:look[0].get('vvgs'),
									rdsontyp10:look[0].get('rdsontyp10'),
									rdsontyp4:look[0].get('rdsontyp4'),
									productPackage:look[0].get('productPackage'),
									
		      					});
//								Ext.Msg.alert('',Ext.JSON.encode(m.data));
								Ext.Ajax.request({
									url:'deleteLvMosfet',
		      						params:{
		      							json:Ext.JSON.encode(lm.data)
		      						},
		      						success:function(resp, opts){
//		      							var success = opts.result.success;
		      							var success=Ext.decode(resp.responseText);    
		      							if (success){
		      								Ext.Msg.alert('提示','删除成功!');
		      								var lvMosfetGrid = Ext.getCmp('lvMosfetGrid');
		      								if (lvMosfetGrid){
		      									var store = lvMosfetGrid.getStore();
		      									store.load();
////		      									win.close();
		      								}
		      							}else{
		      								Ext.Msg.alert('提示','删除失败!');
		      							}
		      						},
		      						failure:function(resp, opts){
//		      							Ext.Msg.alert('提示','删除失败...!');
		      						}
								});
							}
						});
					}
				}
			},{
				xtype:'tbseparator'
			},{
				pressed:true,
				text:'修改产品',
				handler:function(){
					var look = lvMosfetComp.getSelectionModel().getSelection();		//获取复选框的选择
					if (look.length != 1){		//选择的行数不等于1，只能一行一行的进行查看
						Ext.Msg.alert('提示','请选择一行进行修改！');
						return ;
					}else{
						//若选择了一行则通过look显示信息
						var win = Ext.create('Ext.window.Window', {
							title:"修改产品信息",
						    height: 400,
						    width: 430,
						    layout: 'fit',
						    items:{
						    	xtype:'form',
								renderTo: Ext.getBody(),
							    height: 370,
							    width: 420,
							    labelAlign: "right",
							    buttonAlign:'center',
							    frame: true,
							    defaults:{
					      			width:350,
					      	 		labelWidth: 100
					      		},
					    		items: [			    
									{xtype:'textfield',id:'partNo', name:'partNo',dataIndex:'partNo', fieldLabel:'Product name'},
									{
										xtype:'fieldcontainer',
										fieldLabel:'Type',
										defaults : {
												hideLabel : true
										},
										items:[{
										xtype : 'combo',
										title:'Type',
										mode : 'local',
										triggerAction : 'all',
										forceSelection : true,
										editable : false,
										id:'typeNP',
										name : 'typeNP',
										allowBlank:false,
										displayField : 'name',
										valueField : 'value',
										queryMode : 'local',
										store : Ext.create('Ext.data.Store', {
											fields : [ 'name', 'value' ],
											data : [ 
											         {name : 'N',value : 'N'}, 
											         {name : 'P',value : 'P'}
											        ]
										})
									}]
									},
									{xtype:'textfield', id:'vvdss', name:'vvdss',dataIndex:'vvdss', fieldLabel:'Vdss'},
									{xtype:'textfield',id:'vid', name:'vid',dataIndex:'vid', fieldLabel:'Id(max)'},
									{xtype:'textfield', id:'vpd', name:'vpd',dataIndex:'vpd', fieldLabel:'Pd (max)'},
									{xtype:'textfield', id:'vvgs', name:'vvgs',dataIndex:'vvgs', fieldLabel:'Vgs (max)'},
									{xtype:'textfield', id:'rdsontyp10', name:'rdsontyp10',dataIndex:'rdsontyp10', fieldLabel:'Rdson(typ)(@10V)'},
									{xtype:'textfield', id:'rdsontyp4', name:'rdsontyp4',dataIndex:'rdsontyp4', fieldLabel:'Rdson(typ)(@4.5V)'},
									{xtype:'textfield', id:'productPackage', name:'productPackage',dataIndex:'productPackage', readOnly:true, fieldLabel:'Package(不可修改)'},
					      		],
					      		buttons:[{
					      			text:'提交',
				      				handler:function(){
				    					if (this.up('form').getForm().isValid()){
				    						
			    					        var typeNP = Ext.getCmp('typeNP').getValue();
				    						var lm = new LvMosfet({
				    							lvMosfetId:look[0].get('lvMosfetId'),
				    							partNo:this.up('form').getForm().getFieldValues().partNo,
				    							vtype:typeNP,
				    							vvdss:this.up('form').getForm().getFieldValues().vvdss,
				    							vid:this.up('form').getForm().getFieldValues().vid,
				    							vpd:this.up('form').getForm().getFieldValues().vpd,
				    							vvgs:this.up('form').getForm().getFieldValues().vvgs,
				    							rdsontyp10:this.up('form').getForm().getFieldValues().rdsontyp10,
				    							rdsontyp4:this.up('form').getForm().getFieldValues().rdsontyp4,
				    							productPackage:this.up('form').getForm().getFieldValues().productPackage
				    						});
//				    						Ext.Msg.alert('',)
				    						this.up('form').getForm().submit({
				    							url:'editLvMosfet',
				    							waitTitle:'请稍后',
				          						watiMsg:'正在提交信息······',
				          						params:{
				          							json:Ext.JSON.encode(lm.data)
				          						},
				          						success:function(resp, opts){
				          							var success = opts.result.success;
				          							if (success){
				          								Ext.Msg.alert('提示','提交成功!');
					      								var lvMosfetGrid = Ext.getCmp('lvMosfetGrid');
					      								if (lvMosfetGrid){
					      									var store = lvMosfetGrid.getStore();
					      									store.load();
					      								}
				          							}else{
				          								Ext.Msg.alert('提示','提交失败!');
				          							}
				          						},
				          						failure:function(resp, opts){
				          							Ext.Msg.alert('提示','提交失败...!');
				          						}
				    						});
				    					}
				    				}
					      		},{
					      			text:"关闭",
					      			handler: function() {
					      			win.close();
					      		}
					      	   }]
							}
					}).show();
					Ext.getCmp('partNo').setValue(look[0].get('partNo'));
					Ext.getCmp('typeNP').setValue(look[0].get('vtype'));
					Ext.getCmp('vvdss').setValue(look[0].get('vvdss'));						
					Ext.getCmp('vid').setValue(look[0].get('vid'));
					Ext.getCmp('vpd').setValue(look[0].get('vpd'));
					Ext.getCmp('vvgs').setValue(look[0].get('vvgs'));
					Ext.getCmp('rdsontyp10').setValue(look[0].get('rdsontyp10'));
					Ext.getCmp('rdsontyp4').setValue(look[0].get('rdsontyp4'));
					Ext.getCmp('productPackage').setValue(look[0].get('productPackage'));
					}
				}
			}]
		});
//		centerPanel.add(lvMosfetComp);
//	}
//		centerPanel.setActiveTab(lvMosfetComp);
	var tabs = Ext.getCmp("mainTab");
	var showLvMosfetTab = tabs.getComponent("showLvMosfetTab");
	if (showLvMosfetTab){
		tabs.setActiveTab(showLvMosfetTab);
	}else{
		tabs.add({
			id:'showLvMosfetTab',
			title:'Low_Medium Voltage Trench Mosfet',
			closable:true,
			items:[lvMosfetComp]
		}).show();			
	}
};