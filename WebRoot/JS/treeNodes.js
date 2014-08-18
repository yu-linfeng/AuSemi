var nodes = {
	text : 'AuSemi后台发布管理',
	expanded : true,
	leaf : false,
	children : [ {
		text : '关于我们',
		expanded : false,
		leaf : false,
		children : [ {
			id : 'overview',
			text : '公司简介',
			leaf : true
		}, {
			id : 'quality',
			text : '企业质量',
			leaf : true
		}, {
			id : 'culture',
			text : '企业文化',
			leaf : true
		}, {
			id : 'carrers',
			text : '招聘',
			leaf : true
		}, {
			id : 'news',
			text : '新闻中心',
			leaf : true
		} ]
	}, {
		text : '联系我们',
		expanded : false,
		leaf : false,
		children : [ {
			id:'message',
			text : '留言管理',
			leaf : true
		}, {
			id:'agent',
			text : '代理商',
			leaf : true
		} ]
	}, {
		text : '产品发布',
		expanded : false,
		leaf : false,
		children : [ {
			text : 'Mosfet',
			expanded:false,
			leaf:false,
			children:[{
				id:'hvMosfet',
				text:'High-Voltage Super_Juction Mosfet',
				leaf:true
			},{
				id:'lvMosfet',
				text:'Low_Medium Voltage Trench mosfet',
				leaf:true
			},{
				id:'vdMosfet',
				text:'VD Mosfet',
				leaf:true
			}]
		}, {
			id:'srModule',
			text : 'SR Control Module',
			leaf : true
		} ]
	}, {
		text : '管理员信息',
		expanded : false,
		leaf : false,
		children : [ {
			id:'checkInfo',
			text : '查看管理员信息',
			leaf:true
		},{
			id:'editInfo',
			text:'修改管理员信息',
			leaf:true
		} ]
	} ]
};