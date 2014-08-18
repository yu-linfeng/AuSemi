//var vdMosfetComp;
var showVdMosfet = function(){
//	vdMosfetComp = centerPanel.getComponent(id);
	var checkBox = Ext.create('Ext.selection.CheckboxModel');   		//grid中添加付复选框按钮
//	if (!vdMosfetComp){
		/*加载数据*/
		var store = Ext.create('Ext.data.Store',{
			storeId:'VdMosfetStore',
	 	    model:VdMosfet,
//		    pageSize: 16,
		    proxy: {
		    	type: 'ajax',
		    	url: 'allVdMosfet',
		    	reader: {
		    		type: 'json',
		    	}
		    }
		}).load();
		/*显示数据*/
		var vdMosfetComp = Ext.create('Ext.grid.Panel',{
			id:'vdMosfetGrid',
//			title:'VD Mosfet',
			store:Ext.data.StoreManager.lookup('VdMosfetStore'),
			autoHeight:true,
			autoWidth:true,
			loadMask:true,		//是否在加载数据时显示遮罩效果，默认为false 
			idsableSelection:true,		//能否被选中
			selModel:checkBox,		//添加复选框
//			closable:true,
			columnLines: true,		//是否显示列分割线
			forceFit: true,		//列自动适应
			enableColumnResize:true,
			columns:[
			         {xtype:'rownumberer',header:'序号',align:'center'},	
			         {header:'id',dataIndex:'vdMosfetId',menuDisabled:true, hidden:true},			//隐藏ID，会根据ID值进行删除
			         {header:'Part No',dataIndex:'vpartNo', menuDisabled:true},
			         {header:'Specification Description', dataIndex:'vdescription', menuDisabled:true, align:'center'},
			         {header:'VDSS',dataIndex:'vvdss',menuDisabled:true,  align:'center'},
			         {header:'VGS',dataIndex:'vvgs', menuDisabled:true, align:'center'},
			         {header:'VTH-Min', dataIndex:'vvth_min', menuDisabled:true, align:'center'},
			         {header:'VTH-Max', dataIndex:'vvth_max', menuDisabled:true, align:'center'},
			         {header:'IDS',dataIndex:'vids', menuDisabled:true, align:'center'},
			         {header:'RDS-10V', dataIndex:'vrds_10', menuDisabled:true, align:'center'},
			         {header:'RDS-0V', dataIndex:'vrds_0', menuDisabled:true, align:'center'},
			         {header:'PD', dataIndex:'vpd', menuDisabled:true, align:'center'},
			         {header:'Package',dataIndex:'vproductPackage', menuDisabled:true, align:'center'}
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
							id:'VdMosfetForm',
							renderTo: Ext.getBody(),
						    height: 420,
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
								{xtype:'textfield',id:'vpartNo', name:'vpartNo',dataIndex:'vpartNo', readyOnly:'true', fieldLabel:'Part No.'},
								{xtype:'textfield', id:'vdescription', name:'vdescription',dataIndex:'vdescription', fieldLabel:'Specification Description'},
								{xtype:'textfield', id:'vvdss', name:'vvdss',dataIndex:'vvdss', fieldLabel:'VDSS'},
								{xtype:'textfield',id:'vvgs', name:'vvgs',dataIndex:'vvgs', fieldLabel:'VGS'},
								{xtype:'textfield', id:'vvth_min', name:'vvth_min',dataIndex:'vvth_min', fieldLabel:'VTH-Min'},
								{xtype:'textfield', id:'vvth_max', name:'vvth_max',dataIndex:'vvth_max', fieldLabel:'VTH-Max'},
								{xtype:'textfield', id:'vids', name:'vids',dataIndex:'vids', fieldLabel:'IDS'},
								{xtype:'textfield', id:'vrds_10', name:'vrds_10',dataIndex:'vrds_10', fieldLabel:'RDS-10V'},
								{xtype:'textfield', id:'vrds_0', name:'vrds_0',dataIndex:'vrds_0', fieldLabel:'RDS-0V'},
								{xtype:'textfield', id:'vpd', name:'vpd',dataIndex:'vpd', fieldLabel:'PD'},
								{xtype:'textfield', id:'vproductPackage', name:'vproductPackage',dataIndex:'vproductPackage', fieldLabel:'Package'},
								{xtype: "fileuploadfield", buttonText: '选择文件',id: "vdMosfetUpdate",name:'vdMosfetUpdate',fieldLabel: "上传文件"}
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
//			    					        var typeV = Ext.getCmp('typeV').getValue();
				    						var vm = new VdMosfet({
				    							vpartNo:this.up('form').getForm().getFieldValues().vpartNo,
				    							vdescription:this.up('form').getForm().getFieldValues().vdescription,
//				    							htype:typeV,
				    							vvdss:this.up('form').getForm().getFieldValues().vvdss,
				    							vvgs:this.up('form').getForm().getFieldValues().vvgs,
				    							vvth_min:this.up('form').getForm().getFieldValues().vvth_min,
				    							vvth_max:this.up('form').getForm().getFieldValues().vvth_max,
				    							vids:this.up('form').getForm().getFieldValues().vids,
				    							vrds_10:this.up('form').getForm().getFieldValues().vrds_10,
				    							vrds_0:this.up('form').getForm().getFieldValues().vrds_0,
				    							vpd:this.up('form').getForm().getFieldValues().vpd,
				    							vproductPackage:this.up('form').getForm().getFieldValues().vproductPackage
				    						});
//				    						Ext.Msg.alert('',)
				    						this.up('form').getForm().submit({
				    							url:'newVdMosfet',
				    							waitTitle:'请稍后',
				          						watiMsg:'正在提交信息······',
				          						params:{
				          							json:Ext.JSON.encode(vm.data)
				          						},
				          						success:function(resp, opts){
				          							var success = opts.result.success;
				          							if (success){
				          								Ext.Msg.alert('提示','提交成功!');
					      								var vdMosfetGrid = Ext.getCmp('vdMosfetGrid');
					      								if (vdMosfetGrid){
					      									var store = vdMosfetGrid.getStore();
					      									store.load();
					      									Ext.getCmp('VdMosfetForm').getForm().reset();
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
					var look = vdMosfetComp.getSelectionModel().getSelection();		//获取复选框的选择
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
									{xtype:'textfield',id:'vpartNo', name:'vpartNo',dataIndex:'vpartNo', fieldLabel:'Part No.'},
//									{xtype:'textfield', id:'htype', name:'htype',dataIndex:'htype', fieldLabel:'Type(V)'},
									{xtype:'textfield', id:'vdescription', name:'vdescription',dataIndex:'vdescription', fieldLabel:'Specification Description'},
									{xtype:'textfield', id:'vvdss', name:'vvdss',dataIndex:'vvdss', fieldLabel:'VDSS'},
									{xtype:'textfield',id:'vvgs', name:'vvgs',dataIndex:'vvgs', fieldLabel:'VGS'},
									{xtype:'textfield', id:'vvth_min', name:'vvth_min',dataIndex:'vvth_min', fieldLabel:'VTH-Min'},
									{xtype:'textfield', id:'vvth_max', name:'vvth_max',dataIndex:'vvth_max', fieldLabel:'VTH-Max'},
									{xtype:'textfield', id:'vids', name:'vids',dataIndex:'vids', fieldLabel:'IDS'},
									{xtype:'textfield', id:'vrds_10', name:'vrds_10',dataIndex:'vrds_10', fieldLabel:'RDS-10V'},
									{xtype:'textfield', id:'vrds_0', name:'vrds_0',dataIndex:'vrds_0', fieldLabel:'RDS-0V'},
									{xtype:'textfield', id:'vpd', name:'vpd',dataIndex:'vpd', fieldLabel:'PD'},
									{xtype:'textfield', id:'vproductPackage', name:'vproductPackage',dataIndex:'vproductPackage', fieldLabel:'Package'},
					      		],
					      		buttons:[{
					      			text:"关闭",
					      			handler: function() {
					      			win.close();
					      			}
					      	   }]
							}
					}).show();
					Ext.getCmp('vpartNo').setValue(look[0].get('vpartNo'));
//					Ext.getCmp('vtype').setValue(look[0].get('vtype'));
					Ext.getCmp('vdescription').setValue(look[0].get('vdescription'));
					Ext.getCmp('vvdss').setValue(look[0].get('vvdss'));						
					Ext.getCmp('vvgs').setValue(look[0].get('vvgs'));
					Ext.getCmp('vvth_min').setValue(look[0].get('vvth_min'));
					Ext.getCmp('vvth_max').setValue(look[0].get('vvth_max'));
					Ext.getCmp('vids').setValue(look[0].get('vids'));
					Ext.getCmp('vrds_10').setValue(look[0].get('vrds_10'));
					Ext.getCmp('vrds_0').setValue(look[0].get('vrds_0'));
					Ext.getCmp('vpd').setValue(look[0].get('vpd'));
					Ext.getCmp('vproductPackage').setValue(look[0].get('vproductPackage'));
					}
				}
			},{
					xtype:'tbseparator'
			},{
				pressed:true,
				text:'删除产品',
				handler:function(){
					//Ext.Msg.alert('Click', '您单击了删除按钮');
					var look = vdMosfetComp.getSelectionModel().getSelection();		//获取复选框的选择
					if (look.length != 1){
						Ext.Msg.alert('提示','请选择一行进行删除！');
						return ;
					}else{
						Ext.Msg.confirm('提示','您确定要删除该产品吗？', function(btn){
							if (btn == 'yes'){
								var vm = new VdMosfet({
									vdMosfetId:look[0].get('vdMosfetId'),
									vpartNo:look[0].get('vpartNo'),
//									htype:look[0].get('htype'),
									vdescription:look[0].get('vdescription'),
									vvdss:look[0].get('vvdss'),
									vvgs:look[0].get('vvgs'),
									vvth_min:look[0].get('vvth_min'),
									vvth_max:look[0].get('vvth_max'),
									vids:look[0].get('vids'),
									vrds_10:look[0].get('vrds_10'),
									vrds_0:look[0].get('vrds_0'),
									vpd:look[0].get('vpd'),
									vproductPackage:look[0].get('vproductPackage'),
		      					});
//								Ext.Msg.alert('',Ext.JSON.encode(m.data));
								Ext.Ajax.request({
									url:'deleteVdMosfet',
		      						params:{
		      							json:Ext.JSON.encode(vm.data)
		      						},
		      						success:function(resp, opts){
//		      							var success = opts.result.success;
		      							var success=Ext.decode(resp.responseText);    
		      							if (success){
		      								Ext.Msg.alert('提示','删除成功!');
		      								var vdMosfetGrid = Ext.getCmp('vdMosfetGrid');
		      								if (vdMosfetGrid){
		      									var store = vdMosfetGrid.getStore();
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
					var look = vdMosfetComp.getSelectionModel().getSelection();		//获取复选框的选择
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
									{xtype:'textfield',id:'vpartNo', name:'vpartNo',dataIndex:'vpartNo', fieldLabel:'Part No.'},
//									{xtype:'textfield', id:'htype', name:'htype',dataIndex:'htype', fieldLabel:'Type(V)'},
									{xtype:'textfield', id:'vdescription', name:'vdescription',dataIndex:'vdescription', fieldLabel:'Specification Description'},
									{xtype:'textfield', id:'vvdss', name:'vvdss',dataIndex:'vvdss', fieldLabel:'VDSS'},
									{xtype:'textfield',id:'vvgs', name:'vvgs',dataIndex:'vvgs', fieldLabel:'VGS'},
									{xtype:'textfield', id:'vvth_min', name:'vvth_min',dataIndex:'vvth_min', fieldLabel:'VTH-Min'},
									{xtype:'textfield', id:'vvth_max', name:'vvth_max',dataIndex:'vvth_max', fieldLabel:'VTH-Max'},
									{xtype:'textfield', id:'vids', name:'vids',dataIndex:'vids', fieldLabel:'IDS'},
									{xtype:'textfield', id:'vrds_10', name:'vrds_10',dataIndex:'vrds_10', fieldLabel:'RDS-10V'},
									{xtype:'textfield', id:'vrds_0', name:'vrds_0',dataIndex:'vrds_0', fieldLabel:'RDS-0V'},
									{xtype:'textfield', id:'vpd', name:'vpd',dataIndex:'vpd', fieldLabel:'PD'},
									{xtype:'textfield', id:'vproductPackage', name:'vproductPackage',readOnly:true, dataIndex:'vproductPackage', fieldLabel:'Package(不可修改)'},
					      		],
					      		buttons:[{
					      			text:'提交修改',
				      				handler:function(){
				    					if (this.up('form').getForm().isValid()){
			    						
				    						var vm = new VdMosfet({
				    							vdMosfetId:look[0].get('vdMosfetId'),
				    							vpartNo:this.up('form').getForm().getFieldValues().vpartNo,
				    							vdescription:this.up('form').getForm().getFieldValues().vdescription,
				    							vvdss:this.up('form').getForm().getFieldValues().vvdss,
				    							vvgs:this.up('form').getForm().getFieldValues().vvgs,
				    							vvth_min:this.up('form').getForm().getFieldValues().vvth_min,
				    							vvth_max:this.up('form').getForm().getFieldValues().vvth_max,
				    							vids:this.up('form').getForm().getFieldValues().vids,
				    							vrds_10:this.up('form').getForm().getFieldValues().vrds_10,
				    							vrds_0:this.up('form').getForm().getFieldValues().vrds_0,
				    							vpd:this.up('form').getForm().getFieldValues().vpd,
				    							vproductPackage:this.up('form').getForm().getFieldValues().vproductPackage
				    						});
				    						this.up('form').getForm().submit({
				    							url:'editVdMosfet',
				    							waitTitle:'请稍后',
				          						watiMsg:'正在提交信息······',
				          						params:{
				          							json:Ext.JSON.encode(vm.data)
				          						},
				          						success:function(resp, opts){
				          							var success = opts.result.success;
				          							if (success){
				          								Ext.Msg.alert('提示','修改成功!');
					      								var vdMosfetGrid = Ext.getCmp('vdMosfetGrid');
					      								if (vdMosfetGrid){
					      									var store = vdMosfetGrid.getStore();
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
					Ext.getCmp('vpartNo').setValue(look[0].get('vpartNo'));
//					Ext.getCmp('vtype').setValue(look[0].get('vtype'));
					Ext.getCmp('vdescription').setValue(look[0].get('vdescription'));
					Ext.getCmp('vvdss').setValue(look[0].get('vvdss'));						
					Ext.getCmp('vvgs').setValue(look[0].get('vvgs'));
					Ext.getCmp('vvth_min').setValue(look[0].get('vvth_min'));
					Ext.getCmp('vvth_max').setValue(look[0].get('vvth_max'));
					Ext.getCmp('vids').setValue(look[0].get('vids'));
					Ext.getCmp('vrds_10').setValue(look[0].get('vrds_10'));
					Ext.getCmp('vrds_0').setValue(look[0].get('vrds_0'));
					Ext.getCmp('vpd').setValue(look[0].get('vpd'));
					Ext.getCmp('vproductPackage').setValue(look[0].get('vproductPackage'));
					}
				}
			}]
		});
//		centerPanel.add(vdMosfetComp);
//	}
//		centerPanel.setActiveTab(vdMosfetComp);
		var tabs = Ext.getCmp("mainTab");
		var showVdMosfetTab = tabs.getComponent("showVdMosfetTab");
		if (showVdMosfetTab){
			tabs.setActiveTab(showVdMosfetTab);
		}else{
			tabs.add({
				id:'showVdMosfetTab',
				title:'VD Mosfet',
				closable:true,
				items:[vdMosfetComp]
			}).show();
		}
};