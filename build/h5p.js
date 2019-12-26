
// 分享
function share(srv, msg, button){
	console.log('分享操作：')
	//plus.nativeUI.alert('分享操作：');
  if(!srv){
	console.log('无效的分享服务！');
    //plus.nativeUI.alert('无效的分享服务！');
    return;
  }
  button&&(msg.extra=button.extra);
	// 发送分享
	if(srv.authenticated){
		console.log('---已授权---')
		//plus.nativeUI.alert('---已授权---');
		doShare(srv, msg);
	}else{
		console.log('---未授权---')
		//plus.nativeUI.alert('---未授权---');
		srv.authorize(function(){
			doShare(srv, msg);
		}, function(e){
			console.log('认证授权失败：'+JSON.stringify(e))
			//plus.nativeUI.alert('认证授权失败：'+JSON.stringify(e));
		});
	}  
}
// 发送分享
function doShare(srv, msg){
	console.log(JSON.stringify(msg));
	//plus.nativeUI.alert(JSON.stringify(msg));
	srv.send(msg, function(){
		console.log('分享到"'+srv.description+'"成功！')
		//plus.nativeUI.alert('分享到"'+srv.description+'"成功！');
	}, function(e){
		console.log('分享到"'+srv.description+'"失败: '+JSON.stringify(e))
		//plus.nativeUI.alert('分享到"'+srv.description+'"失败: '+JSON.stringify(e));
	});
}
// 解除授权
function cancelAuth(){
	plus.nativeUI.alert('解除授权：');
  if(sweixin){
    if(sweixin.authenticated){
    	plus.nativeUI.alert('取消"'+sweixin.description+'"');
    }
    sweixin.forbid();
  }else{
    plus.nativeUI.alert('当前环境不支持微信分享操作!');
  }
}


function shareWeb(url,cover,title,content,callback){
	if(cover && !cover.toLowerCase().startsWith("http")){
		cover=location.origin+"/"+cover
	}

		if(!window.plus)
			return

		var sweixin =null,shares=null, buttons=[
			{title:'我的好友',extra:{scene:'WXSceneSession'}},
			{title:'朋友圈',extra:{scene:'WXSceneTimeline'}},
			// {title:'我的收藏',extra:{scene:'WXSceneFavorite'}}
		  ];
		plus.share.getServices(function(s){
			shares={};
			for(var i in s){
				var t=s[i];
				shares[t.id]=t;
			}
		sweixin=shares['weixin'];
		var msg={type:'web',thumbs:[cover]};
  
		msg.href=url;
		
		msg.title=title;
		
		msg.content=content;
		sweixin?plus.nativeUI.actionSheet({title:'分享网页到微信',cancel:'取消',buttons:buttons}, function(e){
			(e.index>0)&&share(sweixin, msg, buttons[e.index-1]);
			debugger
			callback()
		}):plus.nativeUI.alert('当前环境不支持微信分享操作!'); 

		}, function(e){
			plus.nativeUI.alert('获取分享服务列表失败：'+e.message);
		});
	}

		

export default {
	shareWeb
};