<%if (request.getHeader("X-Requested-With") != null && request.getHeader("X-Requested-With").equalsIgnoreCase("XMLHttpRequest")) {
        response.setStatus(403);
    } else {
    	String path = request.getContextPath();
    	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
    	response.sendRedirect(basePath + "xascf/jsp/login.jsp");
    }
%>