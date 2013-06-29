Ext.application({
	
	requires : ["Ext.data.JsonP"],
	
	launch : function(){
		
		
		//Model 정의
		Ext.define("MyApp.model", {
			extend : "Ext.data.Model",
			config : {
				fields : ["no", "name", "age", "tel"]//모델의 필드 정의
			}
		});	//end MyData.model
		
		//Proxy 정의
		var ajaxProxy = Ext.create("Ext.data.proxy.Ajax", {
			url : "store_json.jsp",
			reader : {
				type : "json",
				rootProperty : "data"
			}
		});
		
		//Store 정의
		var userStore = Ext.create("Ext.data.Store", {
			//autoLoad : true,	//초기 생성시 데이터를 가져옴
			model : "MyApp.model",
			proxy : ajaxProxy
		});
		
		var titleBar = Ext.create("Ext.TitleBar", {
			docked : "top",
			title : "직원정보목록(모두)",
			items : [{
				type : "button",
				text : "전체보기",
				align : "right",
				handler : function(){
					//TODO event
					userStore.load();//store의 데이터를 가져오게됨
				}
			}]
		});
		
		var dataList = new Ext.create("Ext.dataview.List", {
			flex : 1,
			store : userStore,
			itemTpl : "{no} | 이름 : {name} | 나이 : {age} | 전화 : {tel}"
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



