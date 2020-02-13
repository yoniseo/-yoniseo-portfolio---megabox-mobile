// HEADER
/****************************************************** 
* 용도 : 맨상단에서 스크롤을 내렸을 때 header를 고정,
맨상단에 도착하면 클래스 값을 뺌
*******************************************************/
$(window).scroll(function(){
    if ($(this).scrollTop() >= 1) {
        $("header").addClass("fixed");
    } else {
        $("header").removeClass("fixed");
    }
});
/****************************************************** 
* 용도 : .nav_btn클릭 시 #nav에 on클래스를 부여
*******************************************************/
$(".nav_btn").on("click",function(){
    $("#nav").addClass("on z_index");
    $("html").css("overflow-y","hidden");
});
$(".close_btn").on("click",function(){
    $("#nav").removeClass("on");
    setTimeout(function(){
        $("html").css("overflow-y","auto");
        $("#nav").removeClass("z_index");
    },200);
});
$("#nav > ul > li:not(.nav_area)").on("click",function(){
    $(".swiper-wrapper").css("transform","translate3d(0,0,0)");
    $("#nav").removeClass("on");
    setTimeout(function(){
        $("html").css("overflow-y","auto");
        $("#nav").removeClass("z_index");
    },200);
});
/****************************************************** 
* 용도 : .quick_bk_btn클릭 시 .quick_bk에 on클래스를 부여
*******************************************************/
$(".quick_bk_btn").on("click",function(){
    $(".quick_bk").addClass("on z_index");
    $("html").css("overflow-y","hidden");
});
$(".bk_close_btn").on("click",function(){
    $(".quick_bk").removeClass("on");
    setTimeout(function(){
        $("html").css("overflow-y","auto");
        $(".quick_bk").removeClass("z_index");
    },200);
});
$(".quick_bk .overlay").on("click",function(){
    $(".quick_bk").removeClass("on");
    setTimeout(function(){
        $("html").css("overflow-y","auto");
        $(".quick_bk").removeClass("z_index");
    },200);
});
/****************************************************** 
* 용도 : 네비게이션 슬라이더 적용
*******************************************************/
$(window).ready(function(){
    var mySwiper = new Swiper (".nav",{
        slidesPerView:"auto",
        resistanceRatio:0
    });
});

// CONTENT
/****************************************************** 
* 용도 : 콘텐츠 슬라이더 적용 및 메뉴와 내용 연동
*******************************************************/
$(".rsv_menu ul li a").on("click", function(event){
    event.preventDefault(); 
    var menuIndex = $(this).parents().index();
    $(this).parents("li").addClass("active").siblings().removeClass("active");
    $(".rsv_lst"+menuIndex).addClass("active").siblings().removeClass("active");
});
$(".evt_menu ul li a").on("click", function(event){
    event.preventDefault(); 
    var menuIndex = $(this).parents().index();
    $(this).parents("li").addClass("active").siblings().removeClass("active");
    $(".evt_lst"+menuIndex).addClass("active").siblings().removeClass("active");
});
$(window).ready(function(){
    var mySwiper = new Swiper (".list",{
        slidesPerView:"auto"
    });
    var mySwiper = new Swiper (".inner_menu",{
        slidesPerView:"auto"
    });
    var swiper = new Swiper('.movie_box_list',{
        pagination: {
            el: '.swiper_pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper_button_next',
            prevEl: '.swiper_button_prev',
        },
    });
});
/****************************************************** 
* 용도 : 비디오 자동 재생 및 시간 만료 후 창 꺼짐,
버튼 클릭 시 전체화면 
*******************************************************/
function startTimer(duration, display){
    var timer = duration, minutes, seconds;
    setInterval(function(){
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if(--timer < 0){
            timer = duration;
        }
    }, 1000);
};

function video_c(){
    $(".v_video").removeClass("on");
    $("#v_movie").remove();
    if(screenfull.enabled){
        screenfull.exit();
    };

    $("#timer").remove();
};

$(".play_btn").on("click", function(){
    $(".v_video").addClass("on").prepend('<video src="videos/542ebba805eb6cd1bf91a0777bb431ad_W.mp4" id="v_movie" autoplay></video>');
    if(screenfull.enabled){
        screenfull.request();
    };

    $(".v_video_time").prepend('<div class="count_time" id="timer"></div>');
    
    jQuery(function($) {
        var fiveMinutes = 63,
            display = $('#timer');
        startTimer(fiveMinutes, display);
    });
});
    
$(".v_close_btn").on("click", function(){
    video_c();
});

var video_set;

function videoTime(){
    video_set = setTimeout(function(){
                    video_c();
                },65000);
};

function videoTimeStop(){
    clearTimeout(video_set);
};