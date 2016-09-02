<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/sns-tags" prefix="sns"%>
<%@ taglib uri="/pui-tag" prefix="slt"%>

<div class="widget-box">
	<div class="widget-header" style="background-color: #B9AF43">
		<span class="widget-title"><i class="icon-list"></i>公司贷款卡信息 </span> <span
			class="widget-toolbar"><a href="#" data-action="collapse"><i
				class="icon-chevron-up"></i>
		</a>
		</span>
	</div>
	<div class="widget-body">

		<div class="form-horizontal">
			<div style="margin-top:3px;" class="row-fluid" align="center">

				<div class="span4 control-group full">
					<label class="control-label"> 贷款银行 </label>
					<div class="controls txt">
						<input type="text"
							name="customerOrderEntity.customerSubItemView.loansBank"
							value="${companymodel.loansBank}" id="loansBank">
					</div>
				</div>
				<div class="span4 control-group full">
					<label class="control-label"> 贷款卡号 </label>
					<div class="controls txt">
						<input type="text"
							name="customerOrderEntity.customerSubItemView.loansNo"
							value="${companymodel.loansNo}" id="loansNo">
					</div>
				</div>

				<div class="span4 control-group full">
					<label class="control-label"> 贷款密码 </label>
					<div class="controls txt">
						<input type="text"
							name="customerOrderEntity.customerSubItemView.loansPwd"
							value="${companymodel.loansPwd}" id="loansPwd">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>











