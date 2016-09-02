<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<a href="#" id="menu-toggler" class="menu-toggler">
	<span class="menu-text"></span>
</a>
<script type="text/javascript" src="xascf/js/menu.js"></script>   
<div id="sidebar-shortcuts" class="sidebar-shortcuts">
    <div id="sidebar-shortcuts-large" class="sidebar-shortcuts-large">
        <button class="btn btn-small btn-success">
            <i class="icon-signal"></i>
        </button>

        <button class="btn btn-small btn-info">
            <i class="icon-pencil"></i>
        </button>

        <button class="btn btn-small btn-warning">
            <i class="icon-group"></i>
        </button>

        <button class="btn btn-small btn-danger">
            <i class="icon-cogs"></i>
        </button>
    </div>

    <div id="sidebar-shortcuts-mini" class="sidebar-shortcuts-mini">
        <span class="btn btn-success"></span>

        <span class="btn btn-info"></span>

        <span class="btn btn-warning"></span>

        <span class="btn btn-danger"></span>
    </div>
</div>
	<ul class="nav nav-list">
		<li class="active">
	        <a class="dropdown-toggle" href="javascript:void(0)">
	            <i class="icon-cogs"></i><span class="menu-text">融资管理</span><b class="arrow icon-angle-down"></b>
	        </a>
	        <ul class="submenu">
	            <li >
			        <a class="dropdown-toggle" href="javascript:void(0)">
			            <i class="icon-cogs"></i><span class="menu-text">融资申请</span><b class="arrow icon-angle-down"></b>
			        </a>
			        <ul class="submenu">
			            <li >
			                <a href="javascript:void(0)" onclick="Menu.forward('xascf/fancing/jsp/shipFancing.jsp');">
			                    <i class="icon-double-angle-right"></i>直接运单融资
			                </a>
			            </li>
			            <li class="">
			                <a href="javascript:void(0)" onclick="Menu.forward('monitor/pwdMgt.jsp');">
			                    <i class="icon-double-angle-right"></i>授信融资
			                </a>
			            </li>
			            <li class="">
			                <a href="javascript:void(0)" onclick="Menu.forward('monitor/pwdMgt.jsp');">
			                    <i class="icon-double-angle-right"></i>应收账款融资
			                </a>
			            </li>
			        </ul>
			    </li>
	            <li class="">
	                <a href="javascript:void(0)" onclick="Menu.forward('xascf/fancing/jsp/fancingList.jsp');">
	                    <i class="icon-double-angle-right"></i>融资明细
	                </a>
	            </li>
	            <li class="">
	                <a href="javascript:void(0)" onclick="Menu.forward('xascf/fancing/jsp/fancingAuditingList.jsp');">
	                    <i class="icon-double-angle-right"></i>融资审核
	                </a>
	            </li>
	            <li class="">
	                <a href="javascript:void(0)" onclick="Menu.forward('xascf/fancing/jsp/fancingPayRequestList.jsp');">
	                    <i class="icon-double-angle-right"></i>融资放款
	                </a>
	            </li>
	            <li class="">
	                <a href="javascript:void(0)" onclick="Menu.forward('xascf/fancing/jsp/billList.jsp');">
	                    <i class="icon-double-angle-right"></i>账单管理
	                </a>
	            </li>
			     <li class="">
			                <a href="javascript:void(0)" onclick="Menu.forward('xascf/fancing/jsp/fancingParameterList.jsp');">
			                    <i class="icon-double-angle-right"></i>融资参数设置
			                </a>
	            </li>
	            
	        </ul>
	    </li>
		<li >
			<a href="javascript:void(0);" onclick="">
				<i class="icon-dashboard"></i>
				<span class="menu-text"> 理财管理</span>
			</a>
			 <ul class="submenu">
				<li class="">
	                <a href="javascript:void(0)" onclick="Menu.forward('xascf/product/jsp/product.jsp');">
	                    <i class="icon-double-angle-right"></i>产品管理
	                </a>
	            </li>
	            <li class="">
	                <a href="javascript:void(0)" onclick="Menu.forward('xascf/product/jsp/buyRecord.jsp');">
	                    <i class="icon-double-angle-right"></i>认购管理
	                </a>
	            </li>
	            <li class="">
	                <a href="javascript:void(0)" onclick="Menu.forward('xascf/product/jsp/expire.jsp');">
	                    <i class="icon-double-angle-right"></i>到期管理
	                </a>
	            </li>
	            
	        </ul>
		</li>
		<li class="">
			<a class="dropdown-toggle" href="javascript:void(0)">
		    	<i class="icon-cogs"></i><span class="menu-text">资金管理</span><b class="arrow icon-angle-down"></b>
		    </a>
		    <ul class="submenu">
		    	<li class="">
		        	<a href="javascript:void(0)" onclick="Menu.forward('xascf/funds/jsp/fundAccountList.jsp');">
		            	<i class="icon-double-angle-right"></i>资金账号管理
		            </a>
		        </li> 
		        <li class="">
		            <a href="javascript:void(0)" onclick="Menu.forward('xascf/funds/jsp/fundIncomeList.jsp');">
		                <i class="icon-double-angle-right"></i>资金融入管理
		            </a>
		        </li>
		        <li class="">
		            <a href="javascript:void(0)" onclick="Menu.forward('xascf/funds/jsp/fundExpendManage.jsp');">
		                <i class="icon-double-angle-right"></i>资金支出管理
		            </a>
		        </li>
		        <li class="">
		            <a href="javascript:void(0)" onclick="Menu.forward('xascf/funds/jsp/fundWithdrawDeposit.jsp');">
		                <i class="icon-double-angle-right"></i>资金提现管理
		            </a>
		        </li>
		        <li class="">
		            <a href="javascript:void(0)" onclick="Menu.forward('xascf/funds/jsp/fundTransactionList.jsp');">
		                <i class="icon-double-angle-right"></i>资金交易明细
		            </a>
		        </li>
		        <li class="">
		            <a href="javascript:void(0)" onclick="Menu.forward('xascf/funds/jsp/fundDailyExpected.jsp');">
		                <i class="icon-double-angle-right"></i>资金走势图
		            </a>
		        </li>
		    </ul>
	    </li>
		<li class="">
		        <a class="dropdown-toggle" href="javascript:void(0)">
		            <i class="icon-cogs"></i><span class="menu-text">应收应付</span><b class="arrow icon-angle-down"></b>
		        </a>
		        <ul class="submenu">
		            <li class="">
		                <a href="javascript:void(0)" onclick="Menu.forward('xascf/payable/jsp/receivableList.jsp');">
		                    <i class="icon-double-angle-right"></i>应收管理
		                </a>
		            </li> 
		            <li class="">
		                <a href="javascript:void(0)" onclick="Menu.forward('xascf/payable/jsp/payableList.jsp');">
		                    <i class="icon-double-angle-right"></i>应付管理
		                </a>
		            </li>
		            <li class="">
		                <a href="javascript:void(0)" onclick="Menu.forward('xascf/payable/jsp/payableStat.jsp');">
		                    <i class="icon-double-angle-right"></i>应收应付统计
		                </a>
		            </li>
		            <li class="">
		                <a href="javascript:void(0)" onclick="Menu.forward('xascf/payable/jsp/badDebtList.jsp');">
		                    <i class="icon-double-angle-right"></i>坏账管理
		                </a>
		            </li>
		            <li class="">
		                <a href="javascript:void(0)" onclick="Menu.forward('xascf/payable/jsp/windfallList.jsp');">
		                    <i class="icon-double-angle-right"></i>意外所得管理
		                </a>
		            </li>
		        </ul>
	    </li>
		<li class="">
		        <a class="dropdown-toggle" href="javascript:void(0)" >
		            <i class="icon-cogs"></i><span class="menu-text">企业会员</span><b class="arrow icon-angle-down"></b>
		        </a> 
		        <ul class="submenu"> 
		            <li class="">
		                <a href="javascript:void(0)" onclick="Menu.forward('xascf/customer/jsp/comapanyInfo.jsp');">
		                    <i class="icon-double-angle-right"></i>企业会员管理
		                </a>
		            </li>
		            <li class="">
		                <a href="javascript:void(0)" onclick="Menu.forward('xascf/customer/jsp/personalInfo.jsp');">
		                    <i class="icon-double-angle-right"></i>个人会员管理
		                </a>
		            </li>
		            <li class="">
		                <a href="javascript:void(0)" onclick="Menu.forward('xascf/customer/jsp/companyclieInfo.jsp');">
		                    <i class="icon-double-angle-right"></i>客户拜访记录
		                </a>
		            </li>
		        </ul>
	    </li>
	    
	    
	    <li class="">
			<a class="dropdown-toggle" href="javascript:void(0)">
				 <i class="icon-cogs"></i><span class="menu-text">风控管理</span><b class="arrow icon-angle-down"></b>
			</a>
			<ul class="submenu">
        	<li class="">
        		<a href="javascript:void(0)" onclick="Menu.forward('xascf/risk/jsp/rmItemsList.jsp');">
        			<i class="icon-double-angle-right"></i>评估清单
        		</a>
        	</li>
        	<li class="">
        		<a href="javascript:void(0)" onclick="Menu.forward('xascf/risk/jsp/rmOrgItemsList.jsp');">
        			<i class="icon-double-angle-right"></i>评估查询
        		</a>
        	</li>
        	<li class="">
        		<a href="javascript:void(0)" onclick="Menu.forward('xascf/risk/jsp/rmItemsRuleList.jsp');">
        			<i class="icon-double-angle-right"></i>评估规则设置
        		</a>
        	</li>
        	
        	<li class="">
        		<a href="javascript:void(0)" onclick="Menu.forward('xascf/risk/jsp/rmItemsRuleMappingList.jsp');">
        			<i class="icon-double-angle-right"></i>评估映射设置
        		</a>
        	</li>
        	</ul>
		</li>
	    
		<li class="">
			<a class="dropdown-toggle" href="javascript:void(0)">
		    	<i class="icon-cogs"></i><span class="menu-text">系统管理</span><b class="arrow icon-angle-down"></b>
		    </a>
		    <ul class="submenu">
		    	<li class="">
		        	<a href="javascript:void(0)" onclick="Menu.forward('xascf/system/jsp/userQuery.jsp');">
		            	<i class="icon-double-angle-right"></i>用户管理
		            </a>
		        </li>  
		    	<li class="">
		        	<a href="javascript:void(0)" onclick="Menu.forward('xascf/system/jsp/roleQuery.jsp');">
		            	<i class="icon-double-angle-right"></i>角色管理
		            </a>
		        </li>  
		    	<li class="">
		        	<a href="javascript:void(0)" onclick="Menu.forward('xascf/system/jsp/menuQuery.jsp');">
		            	<i class="icon-double-angle-right"></i>菜单管理
		            </a>
		        </li>  
		    </ul>
	    </li> 
		
		
	</ul><!--/.nav-list-->
	<div id="sidebar-collapse" class="sidebar-collapse">
		<i class="icon-double-angle-left"></i>
	</div>
