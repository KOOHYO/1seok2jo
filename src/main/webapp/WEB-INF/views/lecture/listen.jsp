<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/resources/css/index.css" />
<link rel="stylesheet" href="/resources/css/list.css" />
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
href="https://fonts.googleapis.com/css2?family=Arvo&family=Dongle&family=Montserrat:wght@200&family=PT+Serif&family=Playfair+Display:wght@600&family=Prompt&family=Vollkorn:wght@500&display=swap"
rel="stylesheet"/>
</head>
<c:import url="../template/header.jsp"></c:import>
<body>
    <main class="mt-3">
        <div class="d-flex" id="wrapper">
            <!-- Sidebar-->
            <div class="border-end bg-white" id="sidebar-wrapper">
                <div class="sidebar-heading border-bottom bg-light">목 차</div>
                <div class="list-group list-group-flush count"  data-count-num="${count}">
                    <c:forEach items="${video}" var="video">
                    <a class="list-group-item list-group-item-action list-group-item-light p-3 video_list" href="#!" data-video-num="${video.v_seq}">${video.v_context}</a>
                    </c:forEach>
                </div>
            </div>
            <!-- Page content wrapper-->
            <div id="page-content-wrapper">
                <!-- Top navigation-->
                <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div class="container-fluid">
                        <button class="btn btn-primary" id="sidebarToggle">Toggle Menu</button>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                        
                    </div>
                </nav>
                <!-- Page content-->
                <div class="container-fluid" id="video" data-v-num="${dto.lectureVideoDTO[0].v_num}" data-s-num="${status.num}" data-sta-num="${status.v_status}" data-sign-num="${sign.s_num}">
                    <h1 class="mt-4 num" data-l-num="${dto.l_num}">${dto.l_name}</h1>
                    <div id="LectureVideo" data-seq-num="${dto.lectureVideoDTO[0].v_seq}">
                         ${dto.lectureVideoDTO[0].v_url}
                    </div>
                </div>
                <div class="text-center">
                    <input type="button" class="btn btn-primary btn-lg" id="b_pre" style="background-color: #66ba39; border: none; display: inline;" value="이전 동영상"/>
                    <input type="button" class="btn btn-primary btn-lg" id="b_next" style="background-color: #66ba39; border: none; display: inline;" value="다음 동영상"/>

                </div>
            </div>
        </div>

    </main>

    <c:import url="../template/footer.jsp"></c:import>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
    <script src="/resources/js/listen.js"></script>
    <script src="https://www.youtube.com/player_api"></script>
    
   
</body>
</html>