Ext.application({
	
	requires : ["Ext.data.JsonP"],
	
	launch : function(){
		
		
		//Model ����
		Ext.define("MyApp.model", {
			extend : "Ext.data.Model",
			config : {
				fields : ["no", "name", "age", "tel"]//���� �ʵ� ����
			}
		});	//end MyData.model
		
		//Proxy ����
		var ajaxProxy = Ext.create("Ext.data.proxy.Ajax", {
			url : "store_json.jsp",
			reader : {
				type : "json",
				rootProperty : "data"
			}
		});
		
		//Store ����
		var userStore = Ext.create("Ext.data.Store", {
			//autoLoad : true,	//�ʱ� ������ �����͸� ������
			model : "MyApp.model",
			proxy : ajaxProxy
		});
		
		var titleBar = Ext.create("Ext.TitleBar", {
			docked : "top",
			title : "�����������(���)",
			items : [{
				type : "button",
				text : "��ü����",
				align : "right",
				handler : function(){
					//TODO event
					userStore.load();//store�� �����͸� �������Ե�
				}
			}]
		});
		
		var dataList = new Ext.create("Ext.dataview.List", {
			flex : 1,
			store : userStore,
			itemTpl : "{no} | �̸� : {name} | ���� : {age} | ��ȭ : {tel}"
		});
		
		var rootPanel = Ext.create("Ext.Panel", {
			fullscreen : true,
			layout : {
				type : "vbox"
			},
			items : [titleBar, dataList]
		});
		
		Ext.Viewport.add( rootPanel );
		
		//var titleBar = new Ext.create("Ext.");
	}//end launch
	
	
});


function showHtml(txt){
    var rtn = replaceAll(txt, "&lt;", "<");
    rtn = replaceAll(rtn, "&gt;", ">");
    return rtn;
}

function replaceAll(target, orgStr, newStr){
     return target.split(orgStr).join(newStr);
}



