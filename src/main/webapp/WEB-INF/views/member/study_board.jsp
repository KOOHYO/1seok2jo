<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<table class="table">
    <tbody class="table-group-divider">
        <c:forEach items="${study}" var="fb">
            <!--<div class="row gx-2 gx-lg-2 align-items-center my-3 cart" id="cart" data-l-num ="${lecturedto.l_num}">-->
                <tr class ="sb_board" id="sb_board" data-fb-num="${fb.sb_num}">
                    
                    <td>
                        <div style="margin-top: 30px; font-weight: bold;">
                            ${fb.title}
                        </div>
                        ${fb.reg_date} / ${fb.hit} / ${fb.category}/${fb.answer}
                    </td>
                    
                </tr>
            </div>
            
        </c:forEach>
    </tbody>
</table>
