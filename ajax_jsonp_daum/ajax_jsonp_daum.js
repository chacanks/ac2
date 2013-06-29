Ext.application({
	
	requires : ["Ext.data.JsonP"],
	
	launch : function(){
		
		function display(jsonData){
			
			//�������� ����
			listPanel.removeAll(true);
			
			var items = jsonData.channel.item;
			
			for(var i in items){
				
				var item = items[i];
				
				var title = item.title;
				var cover_s_url = item.cover_s_url;
				
				var pItem = {
					xtype : "panel",
					html : "<table><tr><td><img src='" + cover_s_url + "'/></td><td>" + showHtml(title) + "</td></tr></table>"
				}
				
				listPanel.add( pItem );
			}
			
			
			
		}
		
		var eventHandler = function(btn, event){

			//�ε��� ����̹���
			Ext.Viewport.mask({xtype:'loadmask',message:'loading...'});
			
  			Ext.data.JsonP.request({
  				url : 'http://apis.daum.net/search/book',
  				callbackKey : 'callback',	//�ݹ�޼��带 ���� �Ķ���͸� ex)url.com?callback=success
  				params : {
  					"apikey" : "DAUM_SEARCH_DEMO_APIKEY", 
  					"output" : "json",
  					"q" : "java"
  				}, 
  				success : function(result){
  					//�ε��� ����̹��� ����
  					Ext.Viewport.unmask();
  					display(result);
  				},
  				failure : function(result){
  					Ext.Viewport.unmask();
  					alert("failure : "+result);
  				}
  				
  			});
  			
		}
		
		var listPanel = Ext.create("Ext.Panel");
		
		var toolbar = Ext.create("Ext.Toolbar", {
			docked : "top",
			items : {
				xtype : "button",
				text : "JSON GET!",
				ui : "confirm",
				handler : eventHandler
			}
		})
		
		
		var rootPanel = new Ext.create("Ext.Panel", {
			fullscreen : true,
			scrollable : true,	//��ũ�� ����
			items : [toolbar, listPanel]
		});//end rootPanel
		
		
		
		Ext.Viewport.add( rootPanel );
		
	}
	
	
});


function showHtml(txt){
    var rtn = replaceAll(txt, "&lt;", "<");
    rtn = replaceAll(rtn, "&gt;", ">");
    return rtn;
}

function replaceAll(target, orgStr, newStr){
     return target.split(orgStr).join(newStr);
}



