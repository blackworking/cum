function sc(name, value, options) {
	options = options || {};
	var expires = options.expires;
	if (typeof expires === "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}
	value = encodeURIComponent(value);
	var updatedCookie = name + "=" + value;
	for(var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
		document.cookie = updatedCookie;
	}
}
function dc(name) {
	sc(name, "", {
		expires: -1
	})
}
function gc(name) {
	var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
/**
 * @return {string}
 */
function JSON_to_URLEncoded(element,key,list){
	list = list || [];
	if(typeof(element)=='object'){
		for (var idx in element)
			JSON_to_URLEncoded(element[idx],key?key+'['+idx+']':idx,list);
	} else {
		list.push(key+'='+encodeURIComponent(element));
	}
	return list.join('&');
}
// Пример отправки POST запроса:
async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			//"Accept": "application/json, text/javascript, */*; q=0.01",
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *client
		body: JSON_to_URLEncoded(data) // body data type must match "Content-Type" header
	});
	return await response.json(); // parses JSON response into native JavaScript objects
}

document.addEventListener('DOMContentLoaded', function(){
	var current_url = window.location.href;
	if(window.offer_id === undefined) console.error("Вы не прописали window.offer_id (ID вашего оффера) в скрипте!");
	else{
		postData('https://ib-api.online/api_v1/site/get_urls', {site_id: window.offer_id})
		.then((result) => {
			if(result["success"]) {
				var site = result["site"];
				//Проверяем оснновной домен
				if(current_url.indexOf(site["url"]) === -1) console.error("Домен не соответствует домену вашего оффера");
				else{
					//Заносим в куки нужные параметры
					const urlParams = new URLSearchParams(window.location.search);
					//FB Pixel
					var px_id = gc("px_id");
					var px_id_get = urlParams.get("px_id");
					if(px_id === undefined) {
						px_id = px_id_get;
						if (px_id !== null) {
							sc("px_id", px_id, {expires: 86400});
						}
					}
					if(px_id_get === "0"){
						dc("px_id");
						px_id = null;
					}
					//JivoSite
					var jv_id = gc("jv_id");
					var jv_id_get = urlParams.get("jv_id");
					if(jv_id === undefined) {
						jv_id = jv_id_get;
						if (jv_id !== null) {
							sc("jv_id", jv_id, {expires: 86400});
						}
					}
					if(jv_id_get === "0"){
						dc("jv_id");
						jv_id = null;
					}

					var body = document.querySelector("body");
					//FB Pixel скрипты
					if((px_id !== null) && (parseInt(site["allow_pixel"]) === 1) && current_url.indexOf(site["after_first"]) !== -1){
						//fb_lead.js
						//body.appendChild("<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0'; n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)}(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '" + px_id + "'); fbq('track', 'Lead');</script><noscript> <img height=\"1\" width=\"1\" style=\"display:none\" src=\"https://www.facebook.com/tr?id=" + px_id + "&ev=Lead&noscript=1\"/></noscript>");
						var img = document.createElement('img');
						img.setAttribute("height", 1);
						img.setAttribute("width", 1);
						img.setAttribute("src", "https://www.facebook.com/tr?id=" + px_id + "&ev=Lead&noscript=1");
						img.style.display = "none";
						body.appendChild(img);
					} else if((px_id !== null) && (parseInt(site["allow_pixel"]) === 1) && current_url.indexOf(site["pay_first"]) !== -1){
						//fb_page_view.js
						//body.appendChild("<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0'; n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)}(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '" + px_id + "'); fbq('track', 'PageView');</script><noscript> <img height=\"1\" width=\"1\" style=\"display:none\" src=\"https://www.facebook.com/tr?id=" + px_id + "&ev=PageView&noscript=1\"/></noscript>");
						var img = document.createElement('img');
						img.setAttribute("height", 1);
						img.setAttribute("width", 1);
						img.setAttribute("src", "https://www.facebook.com/tr?id=" + px_id + "&ev=PageView&noscript=1");
						img.style.display = "none";
						body.appendChild(img);
					}
					//JivoSite скрипт
					if((parseInt(site["allow_jivo"]) === 1) && (jv_id !== null)) {
						var script = document.createElement('script');
						script.setAttribute("type", "text/javascript");
						script.innerText =
							"(function(){ document.jivositeloaded=0;var widget_id = '"+jv_id+"';var d=document;var w=window;function l(){var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = '//code.jivosite.com/script/widget/'+widget_id; var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);} /*эта строка обычная для кода JivoSite*/" +
							"function zy(){" +
							"    if(w.detachEvent){/*поддержка IE8*/" +
							"        w.detachEvent('onscroll',zy);" +
							"        w.detachEvent('onmousemove',zy);" +
							"        w.detachEvent('ontouchmove',zy);" +
							"        w.detachEvent('onresize',zy);" +
							"    }else {" +
							"        w.removeEventListener(\"scroll\", zy, false);" +
							"        w.removeEventListener(\"mousemove\", zy, false);" +
							"        w.removeEventListener(\"touchmove\", zy, false);" +
							"        w.removeEventListener(\"resize\", zy, false);" +
							"    }" +
							"    /*запускаем функцию загрузки JivoSite*/" +
							"    if(d.readyState=='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}" +
							"    /*Устанавливаем куку по которой отличаем первый и второй хит*/" +
							"    var cookie_date = new Date ( );" +
							"    cookie_date.setTime ( cookie_date.getTime()+60*60*28*1000); /*24 часа для Москвы*/" +
							"    d.cookie = \"JivoSiteLoaded=1;path=/;expires=\" + cookie_date.toGMTString();" +
							"}" +
							"if (d.cookie.search ( 'JivoSiteLoaded' )<0){/*проверяем, первый ли это визит на наш сайт, если да, то назначаем EventListeners на события прокрутки, изменения размера окна браузера и скроллинга на ПК и мобильных устройствах, для отложенной загрузке JivoSite.*/" +
							"    if(w.attachEvent){ /*поддержка IE8*/" +
							"        w.attachEvent('onscroll',zy);" +
							"        w.attachEvent('onmousemove',zy);" +
							"        w.attachEvent('ontouchmove',zy);" +
							"        w.attachEvent('onresize',zy);" +
							"    }else {" +
							"        w.addEventListener(\"scroll\", zy, {capture: false, passive: true});" +
							"        w.addEventListener(\"mousemove\", zy, {capture: false, passive: true});" +
							"        w.addEventListener(\"touchmove\", zy, {capture: false, passive: true});" +
							"        w.addEventListener(\"resize\", zy, {capture: false, passive: true});" +
							"    }" +
							"}else {zy();}" +
							"})();";
						body.appendChild(script);
					}
				}
			} else if(result["error_message"] !== undefined) console.error(result["error_message"]);
			else console.error("Произошла ошибка при проверке оффера!");
		}).catch(error => {
			// Handle error
			console.error("Ошибка HTTP: " + error);
		});
	}
});
