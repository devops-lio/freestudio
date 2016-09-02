<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.sinoservices.xascf.system.model.MenuModel" %>
<%!
public void getMenuHTML(MenuModel menuModel, StringBuffer menuHTML) {
    if (!menuModel.isLeaf() && menuModel.isChecked()
            && null != menuModel.getChildren() && !menuModel.getChildren().isEmpty()) {
        menuHTML.append("<li>");
        menuHTML.append("<a class=\"dropdown-toggle\" href=\"javascript:void(0)\">");
        menuHTML.append("<i class=\"" + menuModel.getIconClass() + "\"></i>");
        menuHTML.append("<span class=\"menu-text\">" + menuModel.getMenuName() + "</span>");
        menuHTML.append("<b class=\"arrow icon-angle-down\"></b>");
        menuHTML.append("</a>");
        menuHTML.append("<ul class=\"submenu\" style=\"display: none;\">");
        for (MenuModel childrenMenu : menuModel.getChildren()) {
            getMenuHTML(childrenMenu, menuHTML);
        }
        menuHTML.append("</ul>");
        menuHTML.append("</li>");
    } else if (menuModel.isLeaf() && menuModel.isChecked()) {
        menuHTML.append("<li>");
        menuHTML.append("<a href=\"javascript:void(0)\" onclick=\"Menu.forward('" + menuModel.getUrl() + "');\">");
        menuHTML.append("<i class=\"" + menuModel.getIconClass() + "\"></i>");
        menuHTML.append(menuModel.getMenuName());
        menuHTML.append("</a>");
        menuHTML.append("</li>");
    }
}
%>
<%
    StringBuffer menuHTML = new StringBuffer();
    MenuModel menuModel = (MenuModel)request.getAttribute("menuModel");
    if (null != menuModel.getChildren()) {
        for (MenuModel childrenMenu : menuModel.getChildren()) {
            getMenuHTML(childrenMenu, menuHTML);
        }
    }
%>
<script type="text/javascript" src="xascf/js/menu.js"></script>   
<div id="sidebar-shortcuts" class="sidebar-shortcuts">

</div>
<ul class="nav nav-list">
    <%=menuHTML.toString()%>
</ul>
<div id="sidebar-collapse" class="sidebar-collapse">
    <i class="icon-double-angle-left"></i>
</div>