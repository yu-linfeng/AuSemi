//Message model
Ext.regModel('Message', {
    fields: [
            {name:'messageId',type:'integer'},
            { name: 'messageTitle', type: 'string' },
            { name: 'messageMail', type: 'string' },
            { name: 'messageContent', type: 'string' }
        ]
});
//Login model
Ext.define('Login',{
	extend:'Ext.data.Model',
	fields:[
	        {name:'userName', type:'string'},
	        {name:'userPass', type:'string'},
	        ]
});
//Overview
Ext.define('Overview',{
	extend:'Ext.data.Model',
	fields:[
	        {name:'overviewTitle', type:'string'},
	        {name:'overview', type:'string'},
	        ]
});
//Quality
Ext.define('Quality',{
	extend:'Ext.data.Model',
	fields:[
	        {name:'qualityTitle', type:'string'},
	        {name:'quality', type:'string'},
	        ]
});
//Culture
Ext.define('Culture',{
	extend:'Ext.data.Model',
	fields:[
	        {name:'cultureTitle', type:'string'},
	        {name:'culture', type:'string'},
	        ]
});
//Careers
Ext.define('Careers',{
	extend:'Ext.data.Model',
	fields:[
	        {name:'careersTitle', type:'string'},
	        {name:'careers', type:'string'},
	        ]
});
//News
Ext.define('News',{
	extend:'Ext.data.Model',
	fields:[
	        {name:'newsCentre', type:'string'},
	        {name:'news', type:'string'},
	        ]
});
//Message
Ext.define('Message',{
	extend:'Ext.data.Model',
	fields:[
	        {name:'id', type:'integer'},
	        {name:'messageTitle', type:'string'},
	        {name:'mail', type:'string'},
	        {name:'message', type:'string'}
	        ]
});
//LvMosfet
Ext.define('LvMosfet',{
	extend:'Ext.data.Model',
	fields:[
	        {name:'lvMosfetId', type:'integer'},
	        {name:'partNo', type:'string'},
	        {name:'vtype', type:'string'},
	        {name:'vvdss', type:'string'},
	        {name:'vid', type:'string'},
	        {name:'vpd', type:'string'},
	        {name:'vvgs', type:'string'},
	        {name:'rdsontyp10', type:'string'},
	        {name:'rdsontyp4', type:'string'},
	        {name:'productPackage', type:'string'}
	        ]
});
//HvMosfet
Ext.define('HvMosfet',{
	extend:'Ext.data.Model',
	fields:[
	        {name:'hvMosfetId', type:'integer'},
	        {name:'hpartNo', type:'string'},
	        {name:'htype', type:'string'},
	        {name:'hvds', type:'string'},
	        {name:'hid', type:'string'},
	        {name:'hpd', type:'string'},
	        {name:'hvgs', type:'string'},
	        {name:'hrdstyp', type:'string'},
	        {name:'hrdsmax', type:'string'},
	        {name:'hproductPackage', type:'string'}
	        ]
});
//VdMosfet
Ext.define('VdMosfet',{
	extend:'Ext.data.Model',
	fields:[
	        {name:'vdMosfetId', type:'integer'},
	        {name:'vpartNo', type:'string'},
//	        {name:'htype', type:'string'},
	        {name:'vdescription', type:'string'},
	        {name:'vvdss', type:'string'},
	        {name:'vvgs', type:'string'},
	        {name:'vvth_min', type:'string'},
	        {name:'vvth_max', type:'string'},
	        {name:'vids', type:'string'},
	        {name:'vrds_10', type:'string'},
	        {name:'vrds_0', type:'string'},
	        {name:'vpd', type:'string'},
	        {name:'vproductPackage', type:'string'}
	        ]
});
//SRModule
Ext.define('SrModule',{
	extend:'Ext.data.Model',
	fields:[
	        {name:'srModuleId', type:'integer'},
	        {name:'srpartNo', type:'string'},
	        {name:'stype', type:'string'},
	        {name:'siout', type:'string'},
	        {name:'svdd', type:'string'},
	        {name:'svgs', type:'string'},
	        {name:'freq', type:'string'},
	        {name:'srProductPackage', type:'string'}
	        ]
});
//Info
Ext.define('Info',{
	extend:'Ext.data.Model',
	fields:[
	        {name:'nameInfo', type:'string'},
	        {name:'pwdInfo', type:'string'}
	        ]
});
//Agent
Ext.define('Agent',{
	extend:'Ext.data.Model',
	fields:[
	        {name:'agentId', type:'integer'},
	        {name:'area', type:'string'},
	        {name:'companyName', type:'string'},
	        {name:'url', type:'string'},
	        {name:'agentContent', type:'string'}
	        ]
});