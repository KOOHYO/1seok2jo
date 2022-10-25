let btnimport = document.getElementById("btnimport");

const url = new URL(window.location.href)
const urlparam = url.searchParams;
let l_num = urlparam.get("l_num")

//결제창이 열리면 주문번호를 생성한다.
let now = new Date();
let uid = "1seok2jo-"+now.getTime();

let l_name = document.querySelectorAll("#l_name");
let l_price = document.querySelectorAll("#l_price");
let total = document.getElementById("total");
let num = document.querySelectorAll("#l_num");


let usePoint = document.getElementById("usePoint");
let point = document.getElementById("point");
let pointVal = "0";


//총 상품 금액 계산
let tt = 0;
let rtt = 0;
for(let i=0; i<l_price.length; i++){
    let price = Number.parseInt(l_price[i].innerHTML);
    tt += price;
}
rtt=tt;
total.innerText=tt+"원";
realtotal.innerText=rtt+"원";

//마일리지 금액 입력하고 블러하면 가진 마일리지와 검증해 상단에 문구 보여주고 총액 계산
point.addEventListener("blur", function(){
    pointVal = point.value; //입력한 포인트를 저장
    let rspoint = point.getAttribute('data-point'); //주문한 멤버가 가지고 있는 포인트
    //입력한 포인트가 가진 포인트보다 크면 사용포인트를 가진포인트로 변경하고 알림문구 보여줌
    if(pointVal>Number.parseInt(rspoint)){ 
        usePoint.innerText = rspoint+"까지 사용가능 합니다"
        pointVal=Number.parseInt(rspoint);
    }//0보다 작으면 사용포인트를 0으로 변경하고 알림문구 보여줌
    else if(pointVal<0){ 
        pointVal = 0;
        usePoint.innerText = '0보다 작은 수는 입력할 수 없습니다';
    }//정상 범위의 값인경우 사용포인트를 상단에 띄운다.
    else{ 
        usePoint.innerText = pointVal;
    }
    // if 처리된 사용포인트를 input에 입력
    point.value=pointVal;

    //결제금액 저장
    rtt=(tt-pointVal) 
    realtotal.innerText=rtt+"원";
})

// 결제하기 버튼을 클릭하면 하단 실행
btnimport.addEventListener("click", function(){
    requestPay()
})

function requestPay() {
    let name = document.getElementById("name")
    let email = document.getElementById("email")
    let phone = document.getElementById("phone")

    var IMP = window.IMP; // 초기화는 한번만
    IMP.init("imp18741385"); // 아임포트 회원가입하면 부여되는 내 식별코드 입력

    IMP.request_pay(
        //파라미터값 상세 : https://docs.iamport.kr/sdk/javascript-sdk#request_pay
        {
        pg : 'uplus', //PG사, (kcp 등)
        pay_method : 'card',//필수, 결제수단
        merchant_uid: uid, //필수, 주문번호 내가 생성함. 중복불가!!!
        name : l_name[0].innerHTML+" 등",
        amount : rtt, //필수, 결제금액
        buyer_email : email.value, // 주문자 이메일
        buyer_name : name.value, // 주문자 이름
        buyer_tel : phone.value, //필수, 주문자 연락처
    }, function (rsp) { // callback
        if (rsp.success) {
            //ajax로 결제성공시 데이터 전달해 저장
            const xhttp = new XMLHttpRequest();
            //응답 받은 rsp에 금액, 포인트 추가
            rsp.point=pointVal
            rsp.amount=tt
            rsp.l_num = l_num;

            const res = JSON.stringify(rsp) //rsp를 json 형태로 변환

            xhttp.open("Post","./success");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(res);
            xhttp.addEventListener("readystatechange", function(){
                if(this.readyState==4 && this.status==200){
                    if(xhttp.response==1){
                        for(let i=0;i<num.length;i++) {
                        let l_num = num[i].getAttributeNode("data-l-num").value;
                        let name = document.getElementById("name");
                        console.log(name.value);
                        console.log(l_num);
                   
                        const xhttp = new XMLHttpRequest();
                   
                        xhttp.open("POST","../lectureAdd/setLectureAdd");
                   
                        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        
                        xhttp.send("l_num="+l_num+"&id="+name.value);
                   
                        xhttp.onreadystatechange = function() {
                            if(this.readyState == 4 && this.status == 200) {
                                let result = xhttp.responseText.trim();
                                console.log(result);
                                
                                result = JSON.parse(result);
                                if(result == 1) {
                                    alert("수강 신청 완료");
                                                                        
                                }else {
                                    alert("이미 수강하고 있는 강의입니다.");
                                }
                            }
                        }
                    }
                    location.href="./complete?p_uid="+uid;

                }
                }
            })
        } else {
            alert("결제실패\n"+rsp.error_msg);
            console.log(rsp);
        }
    })
}



//툴팁
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// const test = document.querySelector("#test");

// test.addEventListener("click",function(){
//      let l_num = num[0].getAttributeNode("data-l-num").value;
//      let name = document.getElementById("name");
//      console.log(name.value);
//       console.log(l_num);

//      const xhttp = new XMLHttpRequest();

//      xhttp.open("POST","../lectureAdd/setLectureAdd");

//      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

     
//      xhttp.send("l_num="+l_num+"&id="+name.value);

//      xhttp.onreadystatechange = function() {
//          if(this.readyState == 4 && this.status == 200) {
//              let result = xhttp.responseText.trim();
//              console.log(result);
             
//              result = JSON.parse(result);
//              if(result == 1) {
//                  alert("수강 신청 완료");
                                                     
//              }else {
//                  alert("수강 신청 실패");
//              }
//          }
//      }
// })