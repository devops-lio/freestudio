/**菜单*/
var Menu = function(){
	return {
		forward: function(url) {
			$.post(url, {}, function(data) {
				$("#xascfMainPanel").html(data);
			});
		},
		init: function() {
			Menu.handle_side_menu();
			/*Menu.displayMenu($("#sidebar").find("a:first"));*/
			$(".nav-list li").click(function () {
		    	var that = $(this);
		        if (that.find("ul").length == 0) {
		        	$(".nav-list li").removeClass("active");
		        	that.addClass("active");
		        	$(".nav-list > li").each(function() {
		        		if ($(this).hasClass("open") && !($(this).hasClass("active"))) {
		        			if ($(this).find(that).length == 1) {
		        				$(this).addClass("active");
			        		} else {
			        			$(this).removeClass("open");
			        			$(this).find("ul").slideUp(200).parent().removeClass("open");
			        	    }
		        	    }
		            });
		        }
		    });
		},
		displayMenu: function(selector) {
			selector.trigger("click");
			if (selector.next().is(".submenu")) {
				Menu.displayMenu(selector.next().find("a:first"));
			}
		},
		//Toney修改导航条去除a标签结束
		handle_side_menu: function() {
		    var b = $("#sidebar").hasClass("menu-min");
		    $("#sidebar-collapse").on(ace.click_event, function () {
		        $("#sidebar").toggleClass("menu-min");
		        $(this).find('[class*="icon-"]:eq(0)').toggleClass("icon-double-angle-right");
		        b = $("#sidebar").hasClass("menu-min");
		        if (b) {
		            $(".open > .submenu").removeClass("open")
		        }
		    });
		    var a = "ontouchend" in document;
		    $(".nav-list").on(ace.click_event, function (g) {
		        var f = $(g.target).closest("a");
		        if (!f || f.length == 0) {
		            return
		        }
		        if (!f.hasClass("dropdown-toggle")) {
		            if (b && ace.click_event == "tap" && f.get(0).parentNode.parentNode == this) {
		                var h = f.find(".menu-text").get(0);
		                if (g.target != h && !$.contains(h, g.target)) {
		                    return false
		                }
		            }
		            //林斌修改开始
		            else {
		                $(".nav-list li").removeClass("active");
		                var jLi = $(g.target).closest("li");
		                var li = _loop(jLi);
		                var path = $(li).before('<li><i class="icon-home home-icon"></i><a href="#">首页</a> <span class="divider"><i class="icon-angle-right arrow-icon"></i></span></li>');
		                var name = $(li).last("a").text();
		                $(".breadcrumb").html(path);
		                $(".breadcrumb li:last").addClass("active").html(name);
		            }
		            //林斌修改结束
		            return
		        }
		        var d = f.next().get(0);
		        if (!$(d).is(":visible")) {
		            var c = $(d.parentNode).closest("ul");
		            if (b && c.hasClass("nav-list")) {
		                return
		            }
		            c.find("> .open > .submenu").each(function () {
		                if (this != d && !$(this.parentNode).hasClass("active")) {
		                    $(this).slideUp(200).parent().removeClass("open")
		                }
		            })
		        } else { }

		        if (b && $(d.parentNode.parentNode).hasClass("nav-list")) {
		            return false
		        }
		        $(d).slideToggle(200).parent().toggleClass("open");
		        return false
		    })
		}
	};
}();

$("document").ready(function() {
	Menu.init();
});