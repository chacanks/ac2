Ext.application({
	
	requires : ["Ext.Toolbar", "Ext.Ajax"],
	
	launch : function(){
		
		function display(res){
			
			//기존내용 삭제
			listPanel.removeAll(true);
			
			/*	XML	*/
			
			var query = Ext.create("Ext.dom.Query");//xmlDom문서 검색용 클레스
			
			var jikwonArray = query.select("jikwon", res);
			
			for(var i = 0; jikwonArray.length; i++){
				
				var jikwon = jikwonArray[i];
				
				var jno = jikwon.getAttribute("jno");
				var jname = query.selectNode("jname", jikwon).childNodes[0].nodeValue;
				var jimage = query.selectNode("jimage", jikwon).childNodes[0].nodeValue;
				
				var item = {
						xtype : "panel",
						html : "<table><tr><td>" + jno + "</td><td>" + jname + "</td></tr>"
						 + "<tr><td colspan='2'><img src='" + jimage + "' width='200'/></td></tr></table>"
				};
				listPanel.add( item );
				
			}
			
			
			/*
			 * 
			 * JSON
			for(var i in arr){
				var jno = arr[i].jno;
				var jname = arr[i].jname;
				var jimage = arr[i].jimage;
				
				var item = {
						xtype : "panel",
						html : "<table><tr><td>" + jno + "</td><td>" + jname + "</td></tr>"
						 + "<tr><td colspan='2'><img src='" + jimage + "' width='200'/></td></tr></table>"
				}
				
				listPanel.add( item );
			}
			*/
			
			
			
		}
		
		var eventHandler = function(btn, event){
			Ext.Ajax.request({
				url : "./ajax_xml.xml",
				success : function(res, opt){
					//var resArr = JSON.parse(res.responseXML);
					var resArr = res.responseXML;
					console.log( "resArr : " + resArr );
					
					display(resArr);
				},
				failure : function(res, err){
					Ext.Msg.alert("ERROR", "ERROR : " + err);
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
			scrollable : true,	//스크롤 여부
			items : [toolbar, listPanel]
		});//end rootPanel
		
		
		
		Ext.Viewport.add( rootPanel );
		
	}
	
	
});



