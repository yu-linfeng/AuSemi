//var srModuleComp;
var showSrModule = function(){
//	srModuleComp = centerPanel.getComponent(id);
	var checkBox = Ext.create('Ext.selection.CheckboxModel');   		//grid中添加付复选框按钮
//	if (!srModuleComp){
		/*加载数据*/
		var store = Ext.create('Ext.data.Store',{
			storeId:'SrModuleStore',
	 	    model:SrModule,
//		    pageSize: 16,
		    proxy: {
		    	type: 'ajax',
		    	url: 'allSrModule',
		    	reader: {
		    		type: 'json',
		    	}
		    }
		}).load();
		/*显示数据*/
		var srModuleComp = Ext.create('Ext.grid.Panel',{
			id:'srModuleGrid',
//			title:'SR Control Module',
			store:Ext.data.StoreManager.lookup('SrModuleStore'),
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
			        	 xtype:'rownumberer',id:'srModuleAutoId', header:'序号',align:'center',	//自动编号
//			        	 renderer: function(value,metadata,record,rowIndex){
//			                 return '<font color="red">'+rowIndex+'</font>';}
			         },	
			         {header:'id',dataIndex:'srModuleId',hidden:true},			//隐藏ID，会根据ID值进行删除
			         {header:'Part No',dataIndex:'srpartNo', align:'center'},
			         {header:'Type', dataIndex:'stype', align:'center'},
			         {header:'Iout(Pulsed)(A)', dataIndex:'siout', align:'center'},
			         {header:'VDD(Max)(V)', dataIndex:'svdd', align:'center'},
			         {header:'VgsOUT(Typ)(V)', dataIndex:'svgs', align:'center'},
			         {header:'Frequency(Max)(KHz)', dataIndex:'freq', align:'center'},
			         {header:'Package', dataIndex:'srProductPackage', align:'center'}
			],
			tbar:[{
				pressed:true,
				text:'发布产品',
				handler:function(){
					var win = Ext.create('Ext.window.Window',{
						title:'新建产品信息',
						height: 450,
					    width: 430,
					    items:{
					    	xtype:'form',
							id:'srModuleForm',
							renderTo: Ext.getBody(),
						    height: 420,
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
								{xtype:'textfield',id:'srpartNo', name:'srpartNo',dataIndex:'srpartNo', fieldLabel:'Part No.'},
								{xtype:'textfield', id:'stype', name:'stype',dataIndex:'stype', fieldLabel:'Type'},
								{xtype:'textfield', id:'siout', name:'siout',dataIndex:'siout', fieldLabel:'Iout(Pulsed)(A)'},
								{xtype:'textfield',id:'svdd', name:'svdd',dataIndex:'svdd', fieldLabel:'VDD(Max)(V)'},
								{xtype:'textfield', id:'svgs', name:'svgs',dataIndex:'svgs', fieldLabel:'VgsOUT(Typ)(V)'},
								{xtype:'textfield', id:'freq', name:'freq',dataIndex:'freq', fieldLabel:'Frequency(Max)(KHz)'},
								{xtype:'textfield', id:'srProductPackage', name:'srProductPackage',dataIndex:'srProductPackage', fieldLabel:'Package'},
								{xtype: "fileuploadfield", buttonText: '选择文件',id: "srModuleUpdate",name:'srModuleUpdate',fieldLabel: "上传文件"}
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
			    					              Ext.MessageBox.updateProgress(i, '200');
			    					             };
			    					           };
			    					          for(var i = 1; i < 13; i++) {
			    					            setTimeout(f(i), i * 150);
			    					           };
				    						var sr = new SrModule({
				    							srpartNo:this.up('form').getForm().getFieldValues().srpartNo,
				    							stype:this.up('form').getForm().getFieldValues().stype,
				    							siout:this.up('form').getForm().getFieldValues().siout,
				    							svdd:this.up('form').getForm().getFieldValues().svdd,
				    							svgs:this.up('form').getForm().getFieldValues().svgs,
				    							freq:this.up('form').getForm().getFieldValues().freq,
				    							srProductPackage:this.up('form').getForm().getFieldValues().srProductPackage,
				    						});
				    						this.up('form').getForm().submit({
				    							url:'newSrModule',
				    							waitTitle:'请稍后',
				          						watiMsg:'正在提交信息······',
				          						params:{
				          							json:Ext.JSON.encode(sr.data)
				          						},
				          						success:function(resp, opts){
				          							var success = opts.result.success;
				          							if (success){
				          								Ext.Msg.alert('提示','提交成功!');
					      								var srModuleGrid = Ext.getCmp('srModuleGrid');
					      								if (srModuleGrid){
					      									var store = srModuleGrid.getStore();
					      									store.load();
					      									Ext.getCmp('srModuleForm').getForm().reset();
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
					var look = srModuleComp.getSelectionModel().getSelection();		//获取复选框的选择
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
									{xtype:'textfield',id:'srpartNo', name:'srpartNo',dataIndex:'srpartNo', fieldLabel:'Part No.'},
									{xtype:'textfield', id:'stype', name:'stype',dataIndex:'stype', fieldLabel:'Type'},
									{xtype:'textfield', id:'siout', name:'siout',dataIndex:'siout', fieldLabel:'Iout(Pulsed)(A)'},
									{xtype:'textfield',id:'svdd', name:'svdd',dataIndex:'svdd', fieldLabel:'VDD(Max)(V)'},
									{xtype:'textfield', id:'svgs', name:'svgs',dataIndex:'svgs', fieldLabel:'VgsOUT(Typ)(V)'},
									{xtype:'textfield', id:'freq', name:'freq',dataIndex:'freq', fieldLabel:'Frequency(Max)(KHz)'},
									{xtype:'textfield', id:'srProductPackage', name:'srProductPackage',dataIndex:'srProductPackage', fieldLabel:'Package'}
					      		],
					      		buttons:[{
					      			text:"关闭",
					      			handler: function() {
					      			win.close();
					      			}
					      	   }]
							}
					}).show();
					Ext.getCmp('srpartNo').setValue(look[0].get('srpartNo'));
					Ext.getCmp('stype').setValue(look[0].get('stype'));
					Ext.getCmp('siout').setValue(look[0].get('siout'));						
					Ext.getCmp('svdd').setValue(look[0].get('svdd'));
					Ext.getCmp('svgs').setValue(look[0].get('svgs'));
					Ext.getCmp('freq').setValue(look[0].get('freq'));
					Ext.getCmp('srProductPackage').setValue(look[0].get('srProductPackage'));
					}
				}
			},{
					xtype:'tbseparator'
			},{
				pressed:true,
				text:'删除产品',
				handler:function(){
					//Ext.Msg.alert('Click', '您单击了删除按钮');
					var look = srModuleComp.getSelectionModel().getSelection();		//获取复选框的选择
					if (look.length != 1){
						Ext.Msg.alert('提示','请选择一行进行删除！');
						return ;
					}else{
						Ext.Msg.confirm('提示','您确定要删除该产品吗？', function(btn){
							if (btn == 'yes'){
								var sr = new SrModule({
									srModuleId:look[0].get('srModuleId'),
									srpartNo:look[0].get('srpartNo'),
									stype:look[0].get('stype'),
									siout:look[0].get('siout'),
									svdd:look[0].get('svdd'),
									svgs:look[0].get('svgs'),
									freq:look[0].get('freq'),
									srProductPackage:look[0].get('srProductPackage')
		      					});
//								Ext.Msg.alert('',Ext.JSON.encode(m.data));
								Ext.Ajax.request({
									url:'deleteSrModule',
		      						params:{
		      							json:Ext.JSON.encode(sr.data)
		      						},
		      						success:function(resp, opts){
		      							var success=Ext.decode(resp.responseText);    
		      							if (success){
		      								Ext.Msg.alert('提示','删除成功!');
		      								var srModuleGrid = Ext.getCmp('srModuleGrid');
		      								if (srModuleGrid){
		      									var store = srModuleGrid.getStore();
		      									store.load();
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
					var look = srModuleComp.getSelectionModel().getSelection();		//获取复选框的选择
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
									{xtype:'textfield',id:'srpartNo', name:'srpartNo',dataIndex:'srpartNo', fieldLabel:'Part No.'},
									{xtype:'textfield', id:'stype', name:'stype',dataIndex:'stype', fieldLabel:'Type'},
									{xtype:'textfield', id:'siout', name:'siout',dataIndex:'siout', fieldLabel:'Iout(Pulsed)(A)'},
									{xtype:'textfield',id:'svdd', name:'svdd',dataIndex:'svdd', fieldLabel:'VDD(Max)(V)'},
									{xtype:'textfield', id:'svgs', name:'svgs',dataIndex:'svgs', fieldLabel:'VgsOUT(Typ)(V)'},
									{xtype:'textfield', id:'freq', name:'freq',dataIndex:'freq', fieldLabel:'Frequency(Max)(KHz)'},
									{xtype:'textfield', id:'srProductPackage', name:'srProductPackage',readOnly:true,dataIndex:'srProductPackage', fieldLabel:'Package(不可修改)'}
					      		],
					      		buttons:[{
					      			text:'提交修改',
				      				handler:function(){
				    					if (this.up('form').getForm().isValid()){
			    						
				    						var sr = new SrModule({
				    							srModuleId:look[0].get('srModuleId'),
				    							srpartNo:this.up('form').getForm().getFieldValues().srpartNo,
				    							stype:this.up('form').getForm().getFieldValues().stype,
				    							siout:this.up('form').getForm().getFieldValues().siout,
				    							svdd:this.up('form').getForm().getFieldValues().svdd,
				    							svgs:this.up('form').getForm().getFieldValues().svgs,
				    							freq:this.up('form').getForm().getFieldValues().freq,
				    							srProductPackage:this.up('form').getForm().getFieldValues().srProductPackage,
				    						});
				    						this.up('form').getForm().submit({
				    							url:'editSrModule',
				    							waitTitle:'请稍后',
				          						watiMsg:'正在提交信息······',
				          						params:{
				          							json:Ext.JSON.encode(sr.data)
				          						},
				          						success:function(resp, opts){
				          							var success = opts.result.success;
				          							if (success){
				          								Ext.Msg.alert('提示','修改成功!');
					      								var srModuleGrid = Ext.getCmp('srModuleGrid');
					      								if (srModuleGrid){
					      									var store = srModuleGrid.getStore();
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
					Ext.getCmp('srpartNo').setValue(look[0].get('srpartNo'));
					Ext.getCmp('stype').setValue(look[0].get('stype'));
					Ext.getCmp('siout').setValue(look[0].get('siout'));						
					Ext.getCmp('svdd').setValue(look[0].get('svdd'));
					Ext.getCmp('svgs').setValue(look[0].get('svgs'));
					Ext.getCmp('freq').setValue(look[0].get('freq'));
					Ext.getCmp('srProductPackage').setValue(look[0].get('srProductPackage'));
					}
				}
			}]
		});
//		centerPanel.add(srModuleComp);
//	}
//		centerPanel.setActiveTab(srModuleComp);
		var tabs = Ext.getCmp("mainTab");
		var showSrModuleTab = tabs.getComponent("showSrModuleTab");
		if (showSrModuleTab){
			tabs.setActiveTab(showSrModuleTab);
		}else{
			tabs.add({
				id:'showSrModuleTab',
				title:'SR Control Module',
				closable:true,
				items:[srModuleComp]
			}).show();			
		}
}