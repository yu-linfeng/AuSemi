(function () {
    Ext.Loader.setConfig({
        enabled: true
    });
    Ext.require([
        'Ext.grid.*',
        'Ext.toolbar.Paging',
        'Ext.util.*',
        'Ext.data.*',
        'Ext.tree.*',
        'Ext.selection.CheckboxModel'
    ]);
    Ext.onReady(Begin);
})();
function Begin(){
	//定义中间TabPanel
	centerPanel = new Ext.TabPanel({
		id:'mainTab',
		region:'center',
		enableTabScroll: true,  
		activeTab:0,
		     defaults: {
            autoScroll: true,
            autoHeight: true,
            style: "padding:0"
            
        },
        items: [{
            id: "main",           
            title: '主页',
            closable: false,                  //这个tab可以被关闭
//            bodyStyle:'background-image:url(Img/bg.jpg);',
            bodyCls:'bgimg'		//在ExtJs中添加CSS
        }]
	});
	//定义树面板
		leftTree = new Ext.tree.TreePanel({
		id:'leftTree',
		title:'菜单',
		root:nodes,	//添加树节点
		region:'west',
		margins: '0 0 0 0',
		animate:true,
		autoScroll:true,
		rootVisible:true,
//		collapsible:true,
		width:200,
		listeners:{
		'itemclick':treePanel_Listener
		}
	});
	//定义北方logo区
		var northPanel = new Ext.Panel({
		region:"north",
		height:100,
		bodyStyle:'background-image:url(Img/logo.jpg)'
	});
		//定义页面布局为borderLayout
	win = new Ext.Viewport({
		width:1366,//1024，1366
		height:643,//768，643
		layout:'border',
		closable: false,		
		draggable:false,	//拖动
   		resizable:false,		//变大小	
   		items:[leftTree, centerPanel, northPanel],
		buttons:[
		   {
			text:'刷新',
			handler:function(){
				centerPanel.el.mask('加载中...', 'x-mask-loading');
				//中间编写重定向代码
				centerPanel.el.unmask();
				}
		   }
		]
	}).show();
};