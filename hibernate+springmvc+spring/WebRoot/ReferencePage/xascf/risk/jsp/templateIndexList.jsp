<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>

<script type="text/javascript" src="xascf/risk/js/templateIndexList.js"></script>
<style type="text/css">
        .ztree li span.button.add {
		    margin-left: 2px;
		    margin-right: -1px;
		    background-position: -144px 0;
		    vertical-align: top;
		    *vertical-align: middle
		}
    </style>
<div class="row-fluid">
	<input type="hidden" id="treePid" value="${templatePid }"/>
	<div class="widget-box" style="margin-bottom: 0px;">
	    <div class="widget-body">
	        <div class="widget-form" style="padding: 0px;">
                <div class="row-fluid">
                    <div class="span4" style="height: 600px; overflow: auto;">
                        <div id="tree" class="ztree"></div>
                    </div>
                    <div class="span8" id="indexDiv" style="height: 500px">
                        
                    </div>
                </div>
	        </div>
	       </div>
	      </div>
	          <div class="form-search-btn">
		 	     <div class="row-fluid offset2"
								style="margin-top: 10px;margin-bottom: 10px;width: 50%;margin-left:20">
			          <a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:templatesList.templatesList();">返回</a>
			     </div>
		      </div>
	        
	       
	        
	    
	
</div>
