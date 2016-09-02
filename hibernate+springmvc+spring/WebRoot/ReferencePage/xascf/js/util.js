(function($, window, undefined) {
	var elems = $([]), 
		jq_resize = $.resize = $.extend($.resize, {}),
		timeout_id,
		str_setTimeout = 'setTimeout',
		str_resize = 'resize',
		str_data = str_resize + '-special-event',
		str_delay = 'delay',
		str_throttle = 'throttleWindow';

	jq_resize[str_delay] = 250;
	jq_resize[str_throttle] = true;

	$.event.special[str_resize] = {
		setup : function() {
			if (!jq_resize[str_throttle] && this[str_setTimeout]) {
				return false;
			}
			var elem = $(this);
			elems = elems.add(elem);
			$.data(this, str_data, {
				w : elem.width(),
				h : elem.height()
			});
			if (elems.length === 1) {
				loopy();
			}
		},

		teardown : function() {
			if (!jq_resize[str_throttle] && this[str_setTimeout]) {
				return false;
			}
			var elem = $(this);
			elems = elems.not(elem);
			elem.removeData(str_data);
			if (!elems.length) {
				clearTimeout(timeout_id);
			}
		},

		add : function(handleObj) {
			if (!jq_resize[str_throttle] && this[str_setTimeout]) {
				return false;
			}
			var old_handler;
			function new_handler(e, w, h) {
				var elem = $(this), data = $.data(this, str_data);
				data.w = w !== undefined ? w : elem.width();
				data.h = h !== undefined ? h : elem.height();
				old_handler.apply(this, arguments);
			}
			if ($.isFunction(handleObj)) {
				old_handler = handleObj;
				return new_handler;
			} else {
				old_handler = handleObj.handler;
				handleObj.handler = new_handler;
			}
		}
	};

	function loopy() {
		timeout_id = window[str_setTimeout](function() {
			elems.each(function() {
				var elem = $(this),
					width = elem.width(),
					height = elem.height(),
					data = $.data(this, str_data);

				if (width !== data.w || height !== data.h) {
					elem.trigger(str_resize, [ data.w = width, data.h = height ]);
				}

			});
			loopy();
		}, jq_resize[str_delay]);
	}
})(jQuery, this);

// 权限控制
$(document).ready(function() {
//	PUI.plugin.init();
	var scripts = document.getElementsByTagName('script'),
	path = "", i, ln, scriptSrc, match;
	for (i = 0, ln = scripts.length; i < ln; i++) {
        scriptSrc = scripts[i].src;

        match = scriptSrc.match(/xascf\/js\/util\.js$/);

        if (match) {
            path = scriptSrc.substring(0, scriptSrc.length - match[0].length);
            break;
        }
    }
    var fg=false;
	var validateSecurityAccess = function(event, request, settings) {
		if (request.status == 403) {
			if(!fg){
				alert("登录超时或尚未登录!");
				  window.location.href = path + 'xascf/jsp/index.jsp';
				  fg=true;
			}
		}
	};
	$(document).ajaxComplete(validateSecurityAccess).ajaxError(validateSecurityAccess);
	
	$(".page-content").css("padding-bottom", "0px");
	$(".page-content").css({ height: $(window).height() - 20 - 40 - 41  - 1});
	$(".page-content").resize(function () {
		$(".page-content").css({ height: $(window).height() - 20 - 40 - 41 - 1});
	});
});
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
			// millisecond
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
				- RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1
					? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
//列表自适应高度
function getAutoHeightByMmGrid(container, notPg) {
	//alert(container.height());
	var mmgHeight = container.height();
	if (container.has(".widget-box:not(.no-grid-height)").length != 0) {
		container.find(".widget-box:last:not(.no-grid-height)").css("margin-bottom", "0px");
		container.find(".widget-box:not(.no-grid-height)").each(function() {
			mmgHeight -= $(this).height();
			mmgHeight -= parseInt($(this).css("margin-bottom").replace("px", "")) || 0;
			mmgHeight -= parseInt($(this).css("border-top-width").replace("px", "")) || 0;
			mmgHeight -= parseInt($(this).css("border-bottom-width").replace("px", "")) || 0;
		});
	}
	if (!notPg) {
		mmgHeight -= 38;
	}
	return mmgHeight < 200 ? 200 : mmgHeight;
}
function mmGridResizeListener (mmg, container) {
	
	container.find(".widget-box").each(function() {
		if ($(this).find(".mmGrid").length != 0) {
			return true;
		}
		
		$(this).find(".widget-toolbar").each(function() {
			$(this).bind("click", function(event) {
				var jA = $(event.currentTarget).children("a");
				var jI = jA.children("i");
		        var action = jA.attr("data-action");
		        switch (action) {
		            case "collapse": // 折叠展开
		            	var jBody = $(this).closest(".widget-box").find(".widget-body");
		            	// 折叠
		            	if (jI.hasClass("icon-chevron-up")) {
		            		if (null == $(this).data("bodyHeight")) {
		            			$(this).data("bodyHeight", jBody.height() - 2);
		            		}
		            		mmg.opts.height += (parseInt($(this).data("bodyHeight")) || 0);
		            		setTimeout(function() {
		            			mmg.resize();
		            		}, 500);
		            	} else {
		            		mmg.opts.height -= (parseInt($(this).data("bodyHeight")) || 0);
		            		mmg.resize();
		            	}
		                break;
		            case "close": //关闭

		                break;
		            default:
		                break;
		        }
			});
		});
	});
	
	container.resize(function () {
		mmgAutoResize(mmg, container);
	});
}

function mmgAutoResize(mmg, container) {
	var mmgHeight = container.height();
	if (container.has(".widget-box:visible:not(.no-grid-height)").length != 0) {
		container.find(".widget-box:visible:not(.no-grid-height)").filter(function(index) {
			return $(this).parents("div.win").length == 0;
		}).each(function() {
			mmgHeight -= $(this).height();
			mmgHeight -= parseInt($(this).css("margin-bottom").replace("px", "")) || 0;
			mmgHeight -= parseInt($(this).css("border-top-width").replace("px", "")) || 0;
			mmgHeight -= parseInt($(this).css("border-bottom-width").replace("px", "")) || 0;
		});
	}
	if (mmgHeight == 0) {
		return;
	}
	if (mmg.opts.height + mmgHeight > 200) {
		mmg.opts.height += mmgHeight;
	} else {
		mmg.opts.height = 200;
	}
	mmg.resize();
};
function download(url) {
	if (!$.browser.chrome) {
		block();
	}
	if ($("#download-iframe").length != 0) {
		$("#download-iframe").remove();
	}
	var iframe = document.createElement("iframe");
	iframe = document.createElement("iframe");
	iframe.id = "download-iframe";
	iframe.style.display = "none";
	iframe.style.visibility = "hidden";
	iframe.style.height = "0px";
	if (!$.browser.chrome) {
		if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera) {
			iframe.onreadystatechange = function() {
				unblock();
				/*if (iframe.readyState == "complete") {
					unblock();
				}*/
			};
		} else {
			iframe.onload = function() {
				unblock();
			};
		}
	}
	iframe.src = url;
	document.body.appendChild(iframe);
}
/**
 * 根据ID获取表格item
 * @param mmgrid
 * @param id
 * @returns
 */
function getItemById(mmgrid, id)  
{  
	if(id==null || mmgrid==null || id=='undefined' || typeof mmgrid == 'undefined' )
		return null;
	var returnItem=null;
	var len =mmgrid[0].rows.length;
	for (var i = 0;i < len; i++){
    	var item = mmgrid.row(i);
    	if(item.id!=null && item.id!=''){
    		if(id==item.id){
    			returnItem=item;
    			break;
    		}
    	}
    }
    return returnItem;
} 
/**
 * 金额格式化方法
 * s :金额值
 * n:小数点
 */
function formatMoney(s, n)  
{  
	if(n==null)
		n=2;
	if(s==null ||s=='undefined')
		return null;
   n = n > 0 && n <= 20 ? n : 2;  
   var f = (s == (s = Math.abs(s)));//判断正负数
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
   var l = s.split(".")[0].split("").reverse(),  
   r = s.split(".")[1];  
   t = "";  
   for(i = 0; i < l.length; i ++ )  
   {  
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
   }  
   return ((f)?'':'-') + t.split("").reverse().join("") + "." + r;  
}   
function refreshSidebar() {
	$.ajax({
	   type: "POST",
	   url: "xascf/system/menu/getMenu.shtml",
	   success: function(data){
		   $("#sidebar").html(data);
	   },
	   async: false
	});
}
/**
 * 生成随机编码
 * @param len
 * @param radix
 * @returns
 */
function getUid(){
	var myDate = new Date();
	return 'SN'+myDate.getFullYear()+((myDate.getMonth()+1)<10?"0":"")+(myDate.getMonth()+1)+(myDate.getDate()<10?"0":"")+myDate.getDate()+'-'+uuid(4,16);
}
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
}
/**
 * 时间类型str-date转换
 * @param strDate
 * @returns
 */
function getDate(strDate) {    
	if(null==strDate)
		return null;
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');    
    return date;    
} 