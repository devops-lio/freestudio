<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>

<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>公司贷款卡信息 </span> <span
			class="widget-toolbar"><a href="#" data-action="collapse"><i
				class="icon-chevron-up"></i>
		</a>
		</span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
		<div class="form-horizontal fromPre">
			<div style="margin-top:3px;" class="row-fluid" align="center">

				<div class="span3 control-group full">
					<label class="control-label"> 贷款银行 </label>
					<div class="controls txt">
						<input type="text"
							name="creditEntity.loanbankModel.loansBank"
							value="${creditEntity.loanbankItem.loansBank}" 
							id="loansBank">
					</div>
				</div>
				<div class="span3 control-group full">
					<label class="control-label"> 贷款卡号 </label>
					<div class="controls txt">
						<input type="text"
							name="creditEntity.loanbankModel.loansNo"
							value="${creditEntity.loanbankItem.loansNo}" id="loansNo">
					</div>
				</div>

				<div class="span3 control-group full">
					<label class="control-label"> 贷款密码 </label>
					<div class="controls txt">
						<input 
							type="password"
							name="creditEntity.loanbankModel.loansPwd"
							value="${creditEntity.loanbankItem.loansPwd}" id="loansPwd">
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</div>











