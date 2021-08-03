$(function () {
  // 最顶部的导航条
  //   鼠标移入导航条的让对应的下拉框显示
  $(".jd_com").hover(
    function () {
      $(".my_jd").stop().slideDown(60);
    },
    function () {
      $(".my_jd").stop().slideUp(60);
    }
  );

  $(".company").hover(
    function () {
      $(".business").stop().slideDown(60);
    },
    function () {
      $(".business").stop().slideUp(60);
    }
  );

  $(".client").hover(
    function () {
      $(".premium").stop().slideDown(60);
    },
    function () {
      $(".premium").stop().slideUp(60);
    }
  );

  $(".web_nav").hover(
    function () {
      $(".website").stop().slideDown(60);
    },
    function () {
      $(".website").stop().slideUp(60);
    }
  );

  // 定位信息
  var arr = ["北京","上海","天津","重庆","河北","山西","河南","辽宁","吉林","黑龙江","内蒙古","江苏","山东","安徽","浙江","福建","湖北","湖南","广东","广西","江西","四川","海南","贵州","云南","西藏","陕西","甘肃","青海","新疆","港澳","台湾","钓鱼岛","宁夏","海外",
  ];
  for (let i = 0; i < arr.length; i++) {
    let text = `<li>${arr[i]}</li>`;
    $(".city").append(text);
  }

  // 点击定位省份背景变红
  $('.city li').click(function() {
    // console.log($(this).index());
    let sub = $(this).index();  
    $(this).addClass('add-bg').siblings('li').removeClass('add-bg');
    var val = $(this).text();
    $('.province').text(val);
  })

  // 鼠标移入二维码显示与隐藏
  $(".phone_jd").hover(
    function () {
      $(".mobile_pop").show();
      $(".mobile_static_qrcode").hide();
    },
    function () {
      $(".mobile_pop").hide();
      $(".mobile_static_qrcode").show();
    }
  );

  // 回到顶部
  $('.backtop').click(function() {
    $('body , html').stop().animate({
        scrollTop: 0
      },2000)
  })
  // 侧边导航该变定位
  function nation() {
    var cdTop = $(".countdown").offset().top;
    var scTop = $(window).scrollTop();
    if (scTop > cdTop) {
      $(".fixed_head").slideDown(500);
      $('.right-box').css({
        position:'fixed',
        top:'75px',
        left:'50%',
        marginLeft:'615px',
        transition:'position .8s'
      })
    } else {
      $(".fixed_head").slideUp(200);
       $('.right-box').css({
        position:'absolute',
        right:'-80px',
        top:0
      })
    }
  }

  nation();

  // 右边导航条，滚动时改变样式及点击跳转
  function move() {
        var newArr = [];
        $('.app').each(function(index,ele) {
            newArr.push($(this).offset().top);
        })

        $(window).scroll(function() {
        var currentScrollTop = $(window).scrollTop();
                var currentLiftIndex = 0;
                $.each(newArr, function(index,ele) {
                    if(currentScrollTop > ele) {
                        currentLiftIndex = index;
                    }
                })

                $('.right-box ul li').eq(currentLiftIndex).addClass('about').siblings('li').removeClass('about');
        })
         $('.right-box ul li').click(function() {
                var goIndex = $(this).index();
                $('body,html').stop().animate({
                    scrollTop: newArr[goIndex] - 60
                })
            })

  }

  
  move();


  // 滚动可显示隐藏搜索模块
  $(window).scroll(function () {
     nation();
  });

  // 轮播图
  class Swiper {
    constructor() {
      this.w = $(".swiper-item").width();
      this.num = 0;
      this.len = $(".swiper .swiper-item").length - 1;
      this.timer = null;
    }
    init() {
      //设置定时器
      this.setTime();
      //滑上停止定时器
      this.hover();
      //点击指示
      this.pointClick();
      //点击左右箭头
      this.lrClick();
    }
    setTime() {
      this.timer = setInterval(() => {
        this.num++;
        if (this.num > this.len) {
          this.num = 0;
        }
        let cssTrx = -this.num * this.w;
        $(".swiper-point-item .point")
          .eq(this.num)
          .addClass("active")
          .siblings()
          .removeClass("active");
        // $(".swiper").stop().animate(
        //   {
        //     marginLeft: cssTrx,
        //   },
        //   10
        // );
        $(".swiper-item").eq(this.num).fadeIn().siblings().fadeOut();
      }, 3000);
    }
    hover() {
      $(".swiper-contione").hover(
        () => {
          clearInterval(this.timer);
        },
        () => {
          this.setTime();
        }
      );
    }
    pointClick() {
      let that = this;
      $(".swiper-point-item .point").click(function () {
        that.num = $(this).index();
        let cssTrx = -that.num * that.w;
        $(this).addClass("active").siblings().removeClass("active");
        // $(".swiper").stop().animate(
        //   {
        //     marginLeft: cssTrx,
        //   },
        //   50
        // );
        $(".swiper-item").eq(that.num).fadeIn(50).siblings().fadeOut();
      });
    }
    lrClick() {
      let timeOut = true;
      $(".swiper-left img").click(() => {
        if (timeOut) {
          timeOut = false;
          this.num--;
          if (this.num < 0) {
            this.num = this.len;
          }
          let cssTrx = -this.num * this.w;
          $(".swiper-point-item .point")
            .eq(this.num)
            .addClass("active")
            .siblings()
            .removeClass("active");
          // $(".swiper").stop().animate(
          //   {
          //     marginLeft: cssTrx,
          //   },
          //   50
          // );
          $(".swiper-item").eq(this.num).fadeIn(50).siblings().fadeOut();

          setTimeout(() => {
            timeOut = true;
          }, 700);
        }
      });

      $(".swiper-right img").click(() => {
        if (timeOut) {
          timeOut = false;
          this.num++;
          if (this.num > this.len) {
            this.num = 0;
          }
          let cssTrx = -this.num * this.w;
          $(".swiper-point-item .point")
            .eq(this.num)
            .addClass("active")
            .siblings()
            .removeClass("active");
          // $(".swiper").stop().animate(
          //   {
          //     marginLeft: cssTrx,
          //   },
          //   50
          // );
          $(".swiper-item").eq(this.num).fadeIn(50).siblings().fadeOut();

          setTimeout(() => {
            timeOut = true;
          }, 700);
        }
      });
    }
  }
  let sw = new Swiper();
  sw.init();

  // 右侧小块轮播图
  class Scroll {
    constructor() {
      this.breadth = $(".lb_right ul li").width();
      this.index = 0;
      this.length = $(".lb_right ul").length - 1;
      this.time = null;
      this.timer = true;
    }

    start() {
      // 設置定時器
      this.autoPlay();
      // 鼠標移入輪播區域，停止定時器
      this.over();
      // 點擊左右箭頭
      this.click();
    }

    // 設置自動輪播
    autoPlay() {
      this.time = setInterval(() => {
        this.index++;
        if (this.index > this.length) {
          this.index = 0;
        }
        let goLeft = -this.index * this.breadth;
        $(".lb_right").stop().animate(
          {
            marginLeft: goLeft,
          },
          20
        );
      }, 5000);
    }

    // 鼠標移入輪播圖的盒子，切換定時器開關
    over() {
      $(".banner_right").hover(
        () => {
          clearInterval(this.time);
        },
        () => {
          this.autoPlay();
        }
      );
    }

    // 點擊箭頭，切換上下張圖片
    click() {
      // 上一張
      var timer = true;
      $(".swiper-prev img").click(() => {
        if (timer) {
          timer = false;

          this.index--;
          if (this.index < 0) {
            this.index = this.length;
          }

          let goLeft = -this.index * this.breadth;
          $(".lb_right").stop().animate(
            {
              marginLeft: goLeft,
            },
            10
          );
          setTimeout(() => {
            timer = true;
          }, 800);
        }
      });
      // 下一張
      $(".swiper-next img").click(() => {
        if (timer) {
          timer = false;
          this.index++;
          if (this.index > this.length) {
            this.index = 0;
          }

          let goLeft = -this.index * this.breadth;
          $(".lb_right").stop().animate(
            {
              marginLeft: goLeft,
            },
            10
          );
          setTimeout(() => {
            timer = true;
          }, 800);
        }
      });
    }
  }

  let vm = new Scroll();
  vm.start();

  // 鼠标移入移出小组件，切换图片
  $(".unit_link").each(function (index, ele) {
    $(ele).hover(
      function () {
        $(this).find("img:first").hide().siblings("img").show();
      },
      function () {
        $(this).find("img:first").show().siblings("img").hide();
      }
    );
  });

  // tab栏事件绑定
  $(".side_link li").each(function (index, ele) {
    var index = $(this).index();
    $(this).mouseover(function () {
      // console.log(index);
      $(this).addClass("active");
      $(this).siblings("li").removeClass("active");
      $(".side_tab").show(50);
      //  让对应的内容块显示屏
      $(".side_tab>ul>li").eq(index).show().siblings().hide();
    });
  });

  // 页面滚动式改变tab右边内容块的定位，吸顶显示
  var contentTop = $(".content").offset().top;
  // console.log(contentTop);
  var countdownTop = $(".countdown").offset().top;
  $(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > contentTop && scrollTop < countdownTop) {
      $(".side_tab").css({
        position: "fixed",
      });
    } else {
      $(".side_tab").css({
        position: "absolute",
      });
    }
  });

  // 侧边图片覆盖层的显示与隐藏
  $.fn.extend({
    slideLeft: function () {
      if (this.css("display") == "block") {
        // 注意:这里this比较特别,代表当前调用这个方法的jQuery对象

        // 设置样式
        this.css({
          overflow: "hidden",
          paddingLeft: 0,
          marginLeft: 0,
          paddingRight: 0,
          maringRight: 0,
        });

        // 自定义动画
        this.animate(
          {
            width: 0,
          },
          180,
          function () {
            // 删除style属性
            $(this).removeAttr("style");
            // 隐藏元素
            $(this).hide();
          }
        );
      }
    },
    slideRight: function () {
      // 先判断当前style中display的值是否为none
      // console.log( this.css("display") );

      if (this.css("display") == "none") {
        // 1. 去掉 display:none
        this.removeAttr("style");

        // 2. 设置overflow:hidden pl0 pr0 ml0 mr0, 得到宽度目标值

        // 获取元素原来的宽度
        var oldWidth = this.width();

        this.css({
          width: 0,
          overflow: "hidden",
          paddingLeft: 0,
          marginLeft: 0,
          paddingRight: 0,
          maringRight: 0,
        });

        this.animate(
          {
            width: oldWidth,
          },
          180,
          function () {
            // 3. 留下了一个style=""
            $(this).prop("style", "");
          }
        );
      }
    },
  });
  // 先把图片隐藏，鼠标移入再显示
  $(".second-photo").hide();

  $(".j_fs_act").hover(
    function () {
      $(".second-photo").slideRight();
      $(".closer").show(400);
      $(".side_tab").hide();
    },
    function () {
      $(".closer").hide(100);
      $(".second-photo").slideLeft();
    }
  );

  $(".closer").click(function () {
    $(".second-photo").slideLeft(300);
  });

  // 鼠标移出轮播图区域的大盒子，隐藏tab内容块
  // 并且删除播图区域最左侧的li的active类名
  $(".banner_bar").mouseleave(function () {
    $(".side_tab").hide(200);
    $(".side_link li").removeClass("active");
  });

  // 轮播图模块右下角的遮罩层tab切换
  $(".mod_tab_list li").click(function () {
    var index = $(this).index();
    $(".mod_tab_list li a")
      .eq(index)
      .addClass("light_high")
      .parent()
      .siblings()
      .children()
      .removeClass("light_high");
    $(".cost").hide();
    $(".cost").eq(index).show().siblings(".cost").hide();
  });

  // 点击关闭遮罩层
  $(".close span").click(function () {
    $(this).parents(".mod_tab").slideUp();
  });

  // 鼠标移入，组件飞机、话费、酒店让其显示
  $(".ticket").mouseover(function () {
    $(this).parents(".service_entry").children(".mod_tab").slideDown();
  });

  $(".telephone").mouseover(function () {
    $(this).parents(".service_entry").children(".mod_tab").slideDown();
  });

  $(".public").mouseover(function () {
    $(this).parents(".service_entry").children(".mod_tab").slideDown();
  });

  // 倒计时轮播图
  class countdown {
    constructor() {
      this.breadth = $(".center_wrapper>div").width();
      this.index = 0;
      this.length = $(".center_wrapper>div").length - 1;
      this.time = null;
      this.timer = true;
    }

    go() {
      // 設置定時器
      this.autoPlay();
      // 鼠標移入輪播區域，停止定時器
      this.over();
      // 點擊左右箭頭
      this.click();
    }

    // 設置自動輪播
    autoPlay() {
      this.time = setInterval(() => {
        this.index++;
        if (this.index > this.length) {
          this.index = 0;
        }
        let goLeft = -this.index * this.breadth;
        $(".center_wrapper").stop().animate(
          {
            marginLeft: goLeft,
          },
          1000
        );
      }, 6000);
    }

    // 鼠標移入輪播圖的盒子，切換定時器開關
    over() {
      $(".countdown-banner").hover(
        () => {
          clearInterval(this.time);
        },
        () => {
          this.autoPlay();
        }
      );
    }

    // 點擊箭頭，切換上下張圖片
    click() {
      // 上一張
      var timer = true;
      $(".pic-prev").click(() => {
        if (timer) {
          timer = false;

          this.index--;
          if (this.index < 0) {
            this.index = this.length;
          }

          let goLeft = -this.index * this.breadth;
          $(".center_wrapper").stop().animate(
            {
              marginLeft: goLeft,
            },
            1000
          );
          setTimeout(() => {
            timer = true;
          }, 800);
        }
      });
      // 下一張
      $(".pic-next").click(() => {
        if (timer) {
          timer = false;
          this.index++;
          if (this.index > this.length) {
            this.index = 0;
          }

          let goLeft = -this.index * this.breadth;
          $(".center_wrapper").stop().animate(
            {
              marginLeft: goLeft,
            },
            1000
          );
          setTimeout(() => {
            timer = true;
          }, 800);
        }
      });
    }
  }
  let app = new countdown();
  app.go();

  // 倒计时
  function current() {
    var $time = new Date("2021-10-23");
    const $now = new Date();
    timeRemaining = $time - $now;
    let hour, minute, second;
    if (timeRemaining < 0) {
      return 0;
    }
    second = Math.floor((timeRemaining / 1000) % 60);
    minute = Math.floor((timeRemaining / 1000 / 60) % 60);
    hour = Math.floor((timeRemaining / 1000 / 60) % 24);
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    $(".hour").html(hour);
    $(".minute").html(minute);
    $(".second").html(second);
  }
  current();
  setInterval(() => {
    current();
  }, 1000);

  // 每日闪购
  $(".tab_head li a").mouseover(function () {
    $(this)
      .addClass("current")
      .parent()
      .siblings("li")
      .children()
      .removeClass("current");
    var currentIndex = $(this).parent().index();
    $(".special_item").eq(currentIndex).show().siblings().hide();
  });

  // 品牌闪购倒计时
  function day() {
    let $time = new Date("2021-08-11");
    const $now = new Date();
    let $timeRemaining = $time - $now;
    if ($timeRemaining < 10) {
      return 0;
    }
    var $day = Math.floor($timeRemaining / 1000 / 60 / 60 / 24);
    // 小于10前面补0
    $day = $day < 10 ? "0" + $day : $day;
    $(".day-num").html($day);
  }
  day();

  function bannerMove(obj) {
    var index = 0;
    var _thatFlag = true;
    var _that = $(obj.el);
    var _length = _that.find("li").length;
    var a_prev = index - 1 < 0 ? "-1" : index - 1;
    var a_next = index + 1 >= _length ? "0" : index + 1;
    var timer;

    _that.find("li").css({
      left: "-400px",
      "z-index": "1",
    });
    _that
      .find("li")
      .eq(index - 1)
      .css({
        left: "-130px",
        "z-index": "2",
      });
    _that.find("li").eq(index).css({
      left: "10px",
      "z-index": "3",
    });
    _that
      .find("li")
      .eq(index + 1)
      .css({
        left: "130px",
        "z-index": "2",
      });
    _that.find("li").eq(index).addClass("on");

    _that.on("click", ".banner-btn-prev", function () {
      if (_thatFlag) {
        _thatFlag = false;
        main(1);
      }
    });
    _that.on("click", ".banner-btn-next", function () {
      if (_thatFlag) {
        _thatFlag = false;
        main(0);
      }
    });
    clearInterval(timer);
    timer = setInterval(function () {
      main(0);
    }, 3000);
    _that.hover(
      function () {
        clearInterval(timer);
      },
      function () {
        clearInterval(timer);
        timer = setInterval(function () {
          main(0);
        }, 3000);
      }
    );
    function main(fx) {
      if (fx) {
        if (index > _length - 1) index = 0;
        a_prev = index - 1 < 0 ? "-1" : index - 1;
        a_next = index + 1 >= _length ? "0" : index + 1;
        _that.find("li").eq(-1).prependTo(_that.find("li").parent());
        _that
          .find("li")
          .eq(a_prev)
          .css({
            left: "-400px",
            "z-index": "1",
          })
          .animate({
            left: "-200px",
            "z-index": "1",
          });
        _that
          .find("li")
          .eq(index)
          .css({
            left: "-200px",
            "z-index": "3",
          })
          .animate({
            left: "10px",
            "z-index": "3",
          });
        _that
          .find("li")
          .eq(a_next)
          .css({
            left: "0px",
            "z-index": "2",
          })
          .animate({
            left: "200px",
            "z-index": "2",
          });
        _that
          .find("li")
          .eq(a_next + 1)
          .css({
            left: "200px",
            "z-index": "1",
          })
          .animate(
            {
              left: "400px",
              "z-index": "0",
            },
            function () {
              _thatFlag = true;
            }
          );
        _that.find("li").eq(0).addClass("on").siblings().removeClass("on");
      } else {
        // console.log("右")
        if (index > _length - 1) index = 0;
        a_prev = index - 1 < 0 ? "-1" : index - 1;
        a_next = index + 1 >= _length ? "0" : index + 1;
        _that
          .find("li")
          .eq(a_prev)
          .css({
            left: "-600px",
            "z-index": "1",
          })
          .animate({
            left: "-400px",
            "z-index": "1",
          });
        _that
          .find("li")
          .eq(index)
          .css({
            left: "10px",
            "z-index": "2",
          })
          .animate({
            left: "-140px",
            "z-index": "2",
          });
        _that
          .find("li")
          .eq(a_next)
          .css({
            left: "140px",
            "z-index": "3",
          })
          .animate({
            left: "10px",
            "z-index": "3",
          });
        _that
          .find("li")
          .eq(a_next + 1)
          .css({
            left: "300px",
            "z-index": "2",
          })
          .animate(
            {
              left: "140px",
              "z-index": "2",
            },
            function () {
              _that.find("li").eq(0).appendTo(_that.find("li").parent());
              _thatFlag = true;
            }
          );
        _that.find("li").eq(1).addClass("on").siblings().removeClass("on");
      }
    }
  }
  var myMove = new bannerMove({
    el: ".bannerBox .silder-banner",
  });

  // JOY寻宝切换模块
  $(".phone-btn").mouseover(function () {
    var k = $(this).index();
    console.log($(".find-item ul").eq(k));
    $(".find-item>ul").eq(k).show().siblings("ul").hide();
    $(this).addClass("redbg").siblings("span").removeClass("redbg");
  });

  // logo切换
  setTimeout(() => {
    $(".logo>img").prop("src", "../icon/banner/logo.gif");
    countPic();
  }, 2000);

  function countPic() {
    setTimeout(() => {
      $(".logo>img").prop("src", "../icon/logo-sprite.png");
    }, 7000);
  }
  $(".logo").hover(
    function () {
      $(".logo>img").prop("src", "../icon/banner/logo.gif");
    },
    function () {
      countPic();
    }
  );

  // 发现好物的动画
  $(".jq22").liMarquee();

  // 为你推荐
  $(".floorhd>ul>li").click(function () {
    $(this).find("h3").addClass("current");
    $(this).siblings("li").find("h3").removeClass("current");
    var index = $(this).index();
    if(index == 0) {
     $('.feed_content').css({
       height: 'calc(332px * 13 )'
     });
    } else {
       $('.feed_content').css({
       height: 'calc(332px * 20 )'
     });
    }
    $(".feed_list>ul").eq(index).show().siblings("ul").hide();
    var t = $(".more-goods").offset().top;
    var c = $(window).scrollTop();
    var num = Math.floor(t - c);
    $("body,html")
      .stop()
      .animate({
        // 点击后该模块距离浏览器顶部为0
        scrollTop: "+=" + num,
      });
  });
});
