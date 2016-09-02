<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>
<script type="text/javascript" src="xascf/funds/js/fundAccountList.js"></script>
<!-- 查询条件block -->
 <div class="widget-box">
      <div class="widget-header">
          <span class="widget-title"><i class="icon-search"></i>查询条件</span> 
          <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
      </div>
      <div class="widget-body">
          <div class="widget-form">
              <div class="form-toolbar">
                <a class="btn btn-primary" href="javascript:void(0)" id="queryBtn" onclick="javascript:fundAccountList.query();">查询<br /></a>
                <a class="btn btn-primary" href="javascript:void(0)" onclick="javascript:fundAccountList.clearQueryForm();">重置<br /></a>
            </div>
			<form action="" id="fundAccountQueryForm" class="form-horizontal fromPre">
					<div class="row-fluid">
						<div class="span3 control-group full">
							<label class="control-label">
								银行账号
							</label>
							<div class="controls txt">
								<input type="text"  	placeholder="请输入" name="condition.bankNo">
							</div>
						</div>
						<div class="span3 control-group full">
							<label class="control-label">
								账户名称
							</label>
							<div class="controls txt">
								<input type="text"  	placeholder="请输入" name="condition.accountName">
							</div>
						</div>
						<div class="span3 control-group full">
								<label class="control-label">用途</label>
								<div class="controls">
									<slt:select cssClass="chzn-select"    name="condition.accountUsage" 
												optionsType="ACCOUNT_USAGE" >
										<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
									</slt:select>
								</div>
				            </div>
					</div>
				</form>		
		</div>
	</div>
</div>
<!-- 查询列表-->

<div class="widget-box">
<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>资金账号列表</span>
        <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
   <div class="widget-body">
	<div class="widget-grid">
		<div class="grid-toolbar">
			<a class="btn btn-primary" href="javascript:void(0)" onclick="fundAccountList.add()"><i class=""></i>新增</a> 
			<a class="btn btn-primary" href="javascript:void(0)" onclick="fundAccountList.editor()"><i class=""></i>编辑</a> 
			<a class="btn btn-primary" href="javascript:void(0)" onclick="fundAccountList.deleteFundAccount()"><i class=""></i>删除</a> 
		</div>	
		<!-- mmGrid -->
		<table id="fundAccount_mmg" class="mmg">
	       <tr>
	           <th rowspan="" colspan=""></th>
	       </tr>
	   	</table>
	   	<div id="pg" style="text-align: right;"></div>
	</div>
  </div>	
</div>
<!-- 新增弹出框 -->
<div class="row-fluid">
    <div class="win span4" id="tabwin_add_fundAccount" style="overflow:visible;">
        <div class="win-header">
            <span>资金账号信息</span> <i class="close">&times;</i>
        </div>
		<div class="win-content" id="tabwin_add_fundAccount_content">
	    	<div id="fundAccount-detail-template">
	    		<div class="form-search">
		    		<form class="form-horizontal" id="fundAccountEditorForm">
		        		<div class="row-fluid">
		            		<div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>银行账号</label>
								<div class="controls txt">
									<input type="hidden" id="fundAccountPid" name="fundAccountModel.fundAccountPid"/>
									<input type="text" data-required="银行账号不能为空！"	data-maxlength="银行账号不能超过30位"  placeholder="请输入"
											data-maxlength-param="30" maxlength=30 id="bankNo" data-number="只能填入数字"
											name="fundAccountModel.bankNo" value="${fundAccountModel.bankNo}">
								</div>
		            		</div>
		        		</div>
		        		<div class="row-fluid">
		            		<div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>账户名称</label>
								<div class="controls txt">
									<input type="text" data-required="账户名称不能为空！" id="accountName"  placeholder="请输入"
											name="fundAccountModel.accountName" value="${fundAccountModel.accountName}">
								</div>
		            		</div>		        			
		        		</div>
		        		 <div class="row-fluid">
				            <div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>用途</label>
								<div class="controls">
									<slt:select cssClass="chzn-select"    name="fundAccountModel.accountUsage" 
												optionsType="ACCOUNT_USAGE" >
										<slt:outHTML>data-placeholder="请选择"</slt:outHTML>
										<slt:outHTML>data-required="用途不能为空！"</slt:outHTML>
										<slt:outHTML>id="accountUsage"</slt:outHTML>								
									</slt:select>
								</div>
				            </div>
				        </div>
				     
		        		<div class="row-fluid">
		            		<div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>账户别名</label>
								<div class="controls txt">
									<input type="text" data-required="账户别名不能为空！" id="accountOtherName" placeholder="请输入"
											name="fundAccountModel.accountOtherName" value="${fundAccountModel.accountOtherName}">
								</div>
		            		</div>		        			
		        		</div>
				        <div class="row-fluid">
				            <div class="span10 control-group full">
								<label class="control-label"><span style="color: red;">*</span>开户行全称</label>
								<div class="controls txt">
									<input type="text" data-required="开户行全称不能为空！" placeholder="请输入"	data-maxlength="开户行全称不能超过60位"
											data-maxlength-param="60" maxlength=60 id="theBank"
										name="fundAccountModel.theBank">
								</div>
				            </div>
				        </div>
				       
				    </form>
				    <div class="form-search-btn">
				        <a class="btn btn-primary" href="javascript:void(0)" onclick="fundAccountList.saveFundAccount();">保存</a>
				        <a class="btn btn-primary" href="javascript:void(0)" onclick="fundAccountList.cancle();">取消</a>
				    </div>
				</div>
			</div>
        </div>
    </div>
</div>