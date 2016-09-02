<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
	
<link rel="stylesheet" type="text/css" href="xascf/plupload/js/jquery.plupload.queue/css/jquery.plupload.queue.css">
<script type="text/javascript" src="xascf/plupload/js/plupload.full.js"></script>
<script type="text/javascript" src="xascf/plupload/js/jquery.plupload.queue/jquery.plupload.queue.js"></script>
<script type="text/javascript" src="xascf/plupload/js/i18n/cn.js"></script>

<script type="text/javascript" src="xascf/js/pluploadUtil.js"></script>

<div class="win-header">
	<span>上传</span> <i class="close">&times;</i>
</div>
<div id="" style="padding-top: 30px">
	<div style="width: 750px; margin: 0px auto">
		<form id="pluploadFormId" action="" method="post">
			<div id="uploader">
				<p>您的浏览器未安装 Flash, Silverlight, Gears, BrowserPlus 或者支持 HTML5 .</p>
			</div>
			<div class="form-search-btn">
	        	<a href="javascript:void(0)" class="btn btn-primary save" style="float:left;margin-bottom:2px;margin-left:50%" id="uploadComplete">完成</a>
	    	</div>
	    	<input type="hidden" id="uploadFileNames"/>
	    	<input type="hidden" id="uploadFileUrls"/>
	    	<input type="hidden" id="preFileNames"/>
	    	<input type="hidden" id="flags"/>
		</form>
	</div>
</div>

