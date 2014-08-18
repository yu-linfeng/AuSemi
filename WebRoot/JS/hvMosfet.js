//var hvMosfetComp;
var showHvMosfet = function(){
//	hvMosfetComp = centerPanel.getComponent(id);
	var checkBox = Ext.create('Ext.selection.CheckboxModel');   		//grid中添加付复选框按钮
//	if (!hvMosfetComp){
		/*加载数据*/
		var store = Ext.create('Ext.data.Store',{
			storeId:'hvMosfetStore',
	 	    model:HvMosfet,
//		    pageSize: 16,
		    proxy: {
		    	type: 'ajax',
		    	url: 'allHvMosfet',
		    	reader: {
		    		type: 'json',
		    	}
		    }
		}).load();
		/*显示数据*/
		var	hvMosfetComp = Ext.create('Ext.grid.Panel',{
			id:'hvMosfetGrid',
//			title:'High-Voltage Super_Juction Mosfet',
			store:Ext.data.StoreManager.lookup('hvMosfetStore'),
			autoHeight:true,
			autoWidth:true,
			loadMask:true,		//是否在加载数据时显示遮罩效果，默认为false 
			idsableSelection:true,		//能否被选中
			selModel:checkBox,		//添加复选框
//			closable:true,
			columnLines: true,		//是否显示列分割线
			forceFit: true,		//列自动适应
			columns:[
			         {	
			        	 xtype:'rownumberer',id:'hvMosfetAutoId', header:'序号',align:'center',	//自动编号
			         },	
			         {header:'id',dataIndex:'hvMosfetId',hidden:true},			//隐藏ID，会根据ID值进行删除
			         {header:'Product Name',dataIndex:'hpartNo', align:'center'},
			         {header:'Type', dataIndex:'htype', align:'center'},
			         {header:'VDS(max)', dataIndex:'hvds', align:'center'},
			         {header:'ID(max)', dataIndex:'hid', align:'center'},
			         {header:'PD(max)', dataIndex:'hpd', align:'center'},
			         {header:'VGS(max)', dataIndex:'hvgs', align:'center'},
			         {header:'RDS(on)(typ)(@10V)', dataIndex:'hrdstyp', align:'center'},
			         {header:'RDS(on)(max)(@10V)', dataIndex:'hrdsmax', align:'center'},
			         {header:'Package', dataIndex:'hproductPackage', align:'center'}
			],
			tbar:[{
				pressed:true,
				text:'发布产品',
				handler:function(){
					var win = Ext.create('Ext.window.Window',{
						title:'新建产品信息',
						height: 430,
					    width: 430,
					    items:{
					    	xtype:'form',
							id:'hvMosfetForm',
							renderTo: Ext.getBody(),
						    height: 400,
						    width: 420,
//							autoHeight:true,
//							autoWidth:true,
						    labelAlign: "right",
						    buttonAlign:'center',
						    frame: true,
						    fileUpload: true,	//文件上传
						    defaults:{
				      			width:350,
				      	 		labelWidth: 100
				      		},
				    		items: [			    		
								{xtype:'textfield',id:'hpartNo', name:'hpartNo',dataIndex:'hpartNo', fieldLabel:'Product Name'},
//								{xtype:'textfield', id:'type', name:'type',dataIndex:'type', fieldLabel:'Type(N/P)'},
								{
									xtype:'fieldcontainer',
									fieldLabel:'Type',
									defaults : {
											hideLabel : true
									},
									items:[{
									xtype : 'combo',
									title:'N/P',
									mode : 'local',
									triggerAction : 'all',
									forceSelection : true,
									editable : false,
									id:'typeV',
									name : 'typeV',
									allowBlank:false,
									displayField : 'name',
									valueField : 'value',
									queryMode : 'local',
									store : Ext.create('Ext.data.Store', {
										fields : [ 'name', 'value' ],
										data : [ 
										         {name : 'N',value : 'N'}, 
										         {name : 'P',value : 'P'},
									//	         {name : '700V',value : '700V'}, 
										        ]
									})
								}]
								},
								{
									xtype:'fieldcontainer',
									fieldLabel:'VDS(max)',
									defaults : {
											hideLabel : true
									},
									items:[{
									xtype : 'combo',
									title:'600V/650V/700V',
									mode : 'local',
									triggerAction : 'all',
									forceSelection : true,
									editable : false,
									id:'vdsV',
									name : 'vdsV',
									allowBlank:false,
									displayField : 'name',
									valueField : 'value',
									queryMode : 'local',
									store : Ext.create('Ext.data.Store', {
										fields : [ 'name', 'value' ],
										data : [ 
										         {name : '600V',value : '600V'}, 
										         {name : '650V',value : '650V'},
										         {name : '700V',value : '700V'}, 
										        ]
									})
								}]
								},
						//		{xtype:'textfield', id:'hvds', name:'hvds',dataIndex:'hvds', fieldLabel:'VDS(max)'},
								{xtype:'textfield',id:'hid', name:'hid',dataIndex:'hid', fieldLabel:'ID(max)'},
								{xtype:'textfield', id:'hpd', name:'hpd',dataIndex:'hpd', fieldLabel:'PD(max)'},
								{xtype:'textfield', id:'hvgs', name:'hvgs',dataIndex:'hvgs', fieldLabel:'VGS(max)'},
								{xtype:'textfield', id:'hrdstyp', name:'hrdstyp',dataIndex:'hrdstyp', fieldLabel:'RDS(on)(typ)(@10V)'},
								{xtype:'textfield', id:'hrdsmax', name:'hrdsmax',dataIndex:'hrdsmax', fieldLabel:'RDS(on)(max)(@10V)'},
								{xtype:'textfield', id:'hproductPackage', name:'hproductPackage',dataIndex:'hproductPackage', fieldLabel:'Package'},
								{xtype: "fileuploadfield", buttonText: '选择文件',id: "hvMosfetUpdate",name:'hvMosfetUpdate',fieldLabel: "上传文件"}
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
			    					            setTimeout(f(i), i * 200);
			    					           };
			    					        var typeV = Ext.getCmp('typeV').getValue();
			    					        var vdsV = Ext.getCmp('vdsV').getValue();
				    						var hm = new HvMosfet({
				    							hpartNo:this.up('form').getForm().getFieldValues().hpartNo,
				    							htype:typeV,
				    							//hvds:this.up('form').getForm().getFieldValues().hvds,
				    							hvds:vdsV,
				    							hid:this.up('form').getForm().getFieldValues().hid,
				    							hpd:this.up('form').getForm().getFieldValues().hpd,
				    							hvgs:this.up('form').getForm().getFieldValues().hvgs,
				    							hrdstyp:this.up('form').getForm().getFieldValues().hrdstyp,
				    							hrdsmax:this.up('form').getForm().getFieldValues().hrdsmax,
				    							hproductPackage:this.up('form').getForm().getFieldValues().hproductPackage
				    						});
//				    						Ext.Msg.alert('',)
				    						this.up('form').getForm().submit({
				    							url:'newHvMosfet',
				    							waitTitle:'请稍后',
				          						watiMsg:'正在提交信息······',
				          						params:{
				          							json:Ext.JSON.encode(hm.data)
				          						},
				          						success:function(resp, opts){
				          							var success = opts.result.success;
				          							if (success){
				          								Ext.Msg.alert('提示','提交成功!');
					      								var hvMosfetGrid = Ext.getCmp('hvMosfetGrid');
					      								if (hvMosfetGrid){
					      									var store = hvMosfetGrid.getStore();
					      									store.load();
					      									Ext.getCmp('hvMosfetForm').getForm().reset();
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
					var look = hvMosfetComp.getSelectionModel().getSelection();		//获取复选框的选择
					if (look.length != 1){		//选择的行数不等于1，只能一行一行的进行查看
						Ext.Msg.alert('提示','请选择一行进行查看！');
						return ;
					}else{
						//若选择了一行则通过look显示信息
						var win = Ext.create('Ext.window.Window', {
							title:"查看产品信息",
						    height: 380,
						    width: 430,
						    layout: 'fit',
						    items:{
								renderTo: Ext.getBody(),
							    height: 350,
							    width: 420,
							    labelAlign: "right",
							    buttonAlign:'center',
							    frame: true,
							    defaults:{
					      			width:350,
					      	 		labelWidth: 100
					      		},
					    		items: [			    
									{xtype:'textfield',id:'hpartNo', name:'hpartNo',dataIndex:'hpartNo', fieldLabel:'Part No.'},
									{xtype:'textfield', id:'htype', name:'htype',dataIndex:'htype', fieldLabel:'Type(V)'},
									{xtype:'textfield', id:'hvds', name:'hvds',dataIndex:'hvds', fieldLabel:'VDS(max)'},
									{xtype:'textfield',id:'hid', name:'hid',dataIndex:'hid', fieldLabel:'ID(max)'},
									{xtype:'textfield', id:'hpd', name:'hpd',dataIndex:'hpd', fieldLabel:'PD(max)'},
									{xtype:'textfield', id:'hvgs', name:'hvgs',dataIndex:'hvgs', fieldLabel:'VGS(max)'},
									{xtype:'textfield', id:'hrdstyp', name:'hrdstyp',dataIndex:'hrdstyp', fieldLabel:'RDS(on)(typ)(@10V)'},
									{xtype:'textfield', id:'hrdsmax', name:'hrdsmax',dataIndex:'hrdsmax', fieldLabel:'RDS(on)(max)(@10V)'},
									{xtype:'textfield', id:'hproductPackage', name:'hproductPackage',dataIndex:'hproductPackage', fieldLabel:'Package'},
					      		],
					      		buttons:[{
					      			text:"关闭",
					      			handler: function() {
					      			win.close();
					      			}
					      	   }]
							}
					}).show();
					Ext.getCmp('hpartNo').setValue(look[0].get('hpartNo'));
					Ext.getCmp('htype').setValue(look[0].get('htype'));
					Ext.getCmp('hvds').setValue(look[0].get('hvds'));						
					Ext.getCmp('hid').setValue(look[0].get('hid'));
					Ext.getCmp('hpd').setValue(look[0].get('hpd'));
					Ext.getCmp('hvgs').setValue(look[0].get('hvgs'));
					Ext.getCmp('hrdstyp').setValue(look[0].get('hrdstyp'));
					Ext.getCmp('hrdsmax').setValue(look[0].get('hrdsmax'));
					Ext.getCmp('hproductPackage').setValue(look[0].get('hproductPackage'));
					}
				}
			},{
					xtype:'tbseparator'
			},{
				pressed:true,
				text:'删除产品',
				handler:function(){
					//Ext.Msg.alert('Click', '您单击了删除按钮');
					var look = hvMosfetComp.getSelectionModel().getSelection();		//获取复选框的选择
					if (look.length != 1){
						Ext.Msg.alert('提示','请选择一行进行删除！');
						return ;
					}else{
						Ext.Msg.confirm('提示','您确定要删除该产品吗？', function(btn){
							if (btn == 'yes'){
								var hm = new HvMosfet({
									hvMosfetId:look[0].get('hvMosfetId'),
									hpartNo:look[0].get('hpartNo'),
									htype:look[0].get('htype'),
									hvds:look[0].get('hvds'),
									hid:look[0].get('hid'),
									hpd:look[0].get('hpd'),
									hvgs:look[0].get('hvgs'),
									hrdstyp:look[0].get('hrdstyp'),
									hrdsmax:look[0].get('hrdsmax'),
									hproductPackage:look[0].get('hproductPackage'),
		      					});
//								Ext.Msg.alert('',Ext.JSON.encode(m.data));
								Ext.Ajax.request({
									url:'deleteHvMosfet',
		      						params:{
		      							json:Ext.JSON.encode(hm.data)
		      						},
		      						success:function(resp, opts){
//		      							var success = opts.result.success;
		      							var success=Ext.decode(resp.responseText);    
		      							if (success){
		      								Ext.Msg.alert('提示','删除成功!');
		      								var hvMosfetGrid = Ext.getCmp('hvMosfetGrid');
		      								if (hvMosfetGrid){
		      									var store = hvMosfetGrid.getStore();
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
					var look = hvMosfetComp.getSelectionModel().getSelection();		//获取复选框的选择
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
									{xtype:'textfield',id:'hpartNo', name:'hpartNo',dataIndex:'hpartNo', fieldLabel:'Product Name'},
//								{xtype:'textfield', id:'type', name:'type',dataIndex:'type', fieldLabel:'Type(N/P)'},
								{
									xtype:'fieldcontainer',
									fieldLabel:'Type',
									defaults : {
											hideLabel : true
									},
									items:[{
									xtype : 'combo',
									title:'N/P',
									mode : 'local',
									triggerAction : 'all',
									forceSelection : true,
									editable : false,
									id:'typeV',
									name : 'typeV',
									allowBlank:false,
									displayField : 'name',
									valueField : 'value',
									queryMode : 'local',
									store : Ext.create('Ext.data.Store', {
										fields : [ 'name', 'value' ],
										data : [ 
										         {name : 'N',value : 'N'}, 
										         {name : 'P',value : 'P'},
									//	         {name : '700V',value : '700V'}, 
										        ]
									})
								}]
								},
								{
									xtype:'fieldcontainer',
									fieldLabel:'VDS(max)',
									defaults : {
											hideLabel : true
									},
									items:[{
									xtype : 'combo',
									title:'600V/650V/700V',
									mode : 'local',
									triggerAction : 'all',
									forceSelection : true,
									editable : false,
									id:'vdsV',
									name : 'vdsV',
									allowBlank:false,
									displayField : 'name',
									valueField : 'value',
									queryMode : 'local',
									store : Ext.create('Ext.data.Store', {
										fields : [ 'name', 'value' ],
										data : [ 
										         {name : '600V',value : '600V'}, 
										         {name : '650V',value : '650V'},
										         {name : '700V',value : '700V'}, 
										        ]
									})
								}]
								},
				//				{xtype:'textfield', id:'hvds', name:'hvds',dataIndex:'hvds', fieldLabel:'VDS(max)'},
								{xtype:'textfield',id:'hid', name:'hid',dataIndex:'hid', fieldLabel:'ID(max)'},
								{xtype:'textfield', id:'hpd', name:'hpd',dataIndex:'hpd', fieldLabel:'PD(max)'},
								{xtype:'textfield', id:'hvgs', name:'hvgs',dataIndex:'hvgs', fieldLabel:'VGS(max)'},
								{xtype:'textfield', id:'hrdstyp', name:'hrdstyp',dataIndex:'hrdstyp', fieldLabel:'RDS(on)(typ)(@10V)'},
								{xtype:'textfield', id:'hrdsmax', name:'hrdsmax',dataIndex:'hrdsmax', fieldLabel:'RDS(on)(max)(@10V)'},
								{xtype:'textfield', id:'hproductPackage', name:'hproductPackage',dataIndex:'hproductPackage',readOnly:true, fieldLabel:'Package(不可修改)'}
					      		],
					      		buttons:[{
				      				text:'提交修改',
				      				handler:function(){
				    					if (this.up('form').getForm().isValid()){
				    						   var typeV = Ext.getCmp('typeV').getValue();
				    						   var vdsV = Ext.getCmp('vdsV').getValue();
				    						var hm = new HvMosfet({
				    							hvMosfetId:look[0].get('hvMosfetId'),
				    							hpartNo:this.up('form').getForm().getFieldValues().hpartNo,
				    							htype:typeV,
				    							hvds:vdsV,
				    					//		hvds:this.up('form').getForm().getFieldValues().hvds,
				    							hid:this.up('form').getForm().getFieldValues().hid,
				    							hpd:this.up('form').getForm().getFieldValues().hpd,
				    							hvgs:this.up('form').getForm().getFieldValues().hvgs,
				    							hrdstyp:this.up('form').getForm().getFieldValues().hrdstyp,
				    							hrdsmax:this.up('form').getForm().getFieldValues().hrdsmax,
				    							hproductPackage:this.up('form').getForm().getFieldValues().hproductPackage
				    						});
				    						this.up('form').getForm().submit({
				    							url:'editHvMosfet',
				    							waitTitle:'请稍后',
				          						watiMsg:'正在提交信息······',
				          						params:{
				          							json:Ext.JSON.encode(hm.data)
				          						},
				          						success:function(resp, opts){
				          							var success = opts.result.success;
				          							if (success){
				          								Ext.Msg.alert('提示','修改成功!');
					      								var hvMosfetGrid = Ext.getCmp('hvMosfetGrid');
					      								if (hvMosfetGrid){
					      									var store = hvMosfetGrid.getStore();
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
					Ext.getCmp('hpartNo').setValue(look[0].get('hpartNo'));
					Ext.getCmp('typeV').setValue(look[0].get('htype'));
					Ext.getCmp('vdsV').setValue(look[0].get('hvds'));						
					Ext.getCmp('hid').setValue(look[0].get('hid'));
					Ext.getCmp('hpd').setValue(look[0].get('hpd'));
					Ext.getCmp('hvgs').setValue(look[0].get('hvgs'));
					Ext.getCmp('hrdstyp').setValue(look[0].get('hrdstyp'));
					Ext.getCmp('hrdsmax').setValue(look[0].get('hrdsmax'));
					Ext.getCmp('hproductPackage').setValue(look[0].get('hproductPackage'));
					}
				}
			}]
		});
//		centerPanel.add(hvMosfetComp);
//	}
//		centerPanel.setActiveTab(hvMosfetComp);
		var tabs = Ext.getCmp("mainTab");
		var showHvMosfetTab = tabs.getComponent("showHvMosfetTab");
		if (showHvMosfetTab){
			tabs.setActiveTab(showHvMosfetTab);
		}else{
			tabs.add({
				id:'showHvMosfetTab',
				title:'High-Voltage Super_Juction Mosfet',
				closable:true,
				items:[hvMosfetComp]
			}).show();			
		}
};