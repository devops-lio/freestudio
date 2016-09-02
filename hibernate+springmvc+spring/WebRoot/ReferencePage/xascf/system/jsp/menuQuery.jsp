<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>菜单分配查询</title>
    <style type="text/css">
        .ztree li span.button.add {
		    margin-left: 2px;
		    margin-right: -1px;
		    background-position: -144px 0;
		    vertical-align: top;
		    *vertical-align: middle
		}
    </style>
</head>
<body>
<div class="row-fluid">
    <div class="span12">
		<div class="widget-box" style="margin-bottom: 0px;">
		    <div class="widget-body">
		        <div class="widget-form" style="padding: 0px;">
	                <div class="row-fluid">
	                    <div class="span6" style="height: 500px; overflow: auto;">
	                        <div id="tree" class="ztree"></div>
	                    </div>
	                    <div class="span6" id="menuDetailsDiv" style="height: 500px">
	                        
	                    </div>
	                </div>
		        </div>
		    </div>
		</div>
	</div>
</div>
<input type="hidden" id="systemPid" value="${systemPid }">
<script type="text/javascript" src="xascf/system/js/menuQuery.js"></script>
</body>
</html>