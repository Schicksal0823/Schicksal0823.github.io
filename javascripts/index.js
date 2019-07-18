$(document).ready(() => {



    $.ajax({
        url: "http://jsonplaceholder.typicode.com/posts",
        data: {},
        type: "GET",
        timeout: 5000,
    }).then(function (res) {
        //这里随机截取10条
        let rand = Math.floor(Math.random() * (res.length - 10));
        let data = res.slice(rand, (rand + 10));
        console.log(data);
        //获取的数据太少加点东西
        for(let i = 0; i < data.length; i++){
            data[i].creatAt = getRandDay();
            data[i].label = getRandLabel();
            data[i].readNum = getRand(0,10000);
            data[i].commentNum = getRand(0,1000);    
        }
        console.log(data);
        insetToUl(data);
    }).catch(function (error) {
        console.log(error);
    });

    // 半年内的随机时间。
    getRandDay = () => {
        let date = new Date();
        //当前时间的秒数
        let thisDay = date.getTime();
        //180天之前的秒数，
        let beforDay = date.getTime() - (180 * 24 * 60 * 60 * 1000); 
        return new Date(getRand(beforDay, thisDay)).format('Y-m-d H:i:s');
    }

    // 生成随机数
    getRand = (Min, Max) => {
        let Range = Max - Min;
        let Rand = Math.random();
        //四舍五入 Math.round();
        //取小 Math.floor();
        //取大 Math.ceil();
        let num = Min + Math.round(Rand * Range); 
        return num;
    };

    //其他
    getRandLabel = () =>{
        let data = ["原","转"];
        let rand = Math.floor(Math.random() * 2);
        return data[rand];
    };

    insetToUl = (data) => {

        for (let i = 0; i < 10; i++) {
            //创建元素
            let addDiv_parent = $("<div></div>").attr("class", "article-item-box");
            let addH4_chilren = $("<h4></h4>").attr("class", "title");
            let addP_chilren = $("<p></p>").attr("class", "content");
            let addDiv_chilren = $("<div></div>").addClass("info-box d-flex align-content-center");

            //新盒父元素中追加子元素
            addDiv_parent.append(addH4_chilren, addP_chilren, addDiv_chilren);

            let addA_to_H4 = $("<a></a>").attr({ "href": "#", "target": "_blank" }).text(data[i].title);
            let addA_to_P = $("<a></a>").attr({ "href": "#", "target": "_blank" }).text(data[i].body);

            let addP_none = $("<p></p>");
            let addP_none_cf = addP_none.clone();
            let addP_none_cs = addP_none.clone();

            let type = null;
            if (data[i].label === "原") {
                type = "type-1";
            } else {
                type = "type-2";
            }

            addH4_chilren.append(addA_to_H4.prepend(`<span class="article-type ${type}">${data[i].label}</span>`));
            addP_chilren.append(addA_to_P);
            addDiv_chilren.append(addP_none.append(`<span class='date'>${data[i].creatAt}</span>`),
                "<p class='point'></p>", addP_none_cf.append(`<span class='read-num'>阅读数 <span class="num">${data[i].readNum}</span> </span>`),
                "<p class='point'></p>", addP_none_cs.append(`<span class='read-num'>评论数 <span class="num">${data[i].commentNum}</span> </span>`));

            //定位到.box-right，并把新盒子append到.box-right上
            $(".box-right").append(addDiv_parent);

            //添加鼠标移入事件
            $(".box-right > .article-item-box").mouseenter(function () {
                $(this).css("background-color", "#eee");
            });

            //添加鼠标移出事件
            $(".box-right > .article-item-box").mouseleave(function () {
                $(this).css("background-color", "#fff");
            });

        }

    }


    // //Json数据
    // const userArticle = {
    //     "Title": [
    //         "  vue 监听滚动事件",
    //         "  elementUI树状图竖向滚动条和横向滚动条问题",
    //         "  vue-cli更换端口号",
    //         "  element-ui中的select下拉列表 设置默认值",
    //         "  vue-cli（vue脚手架）超详细教程",
    //     ],
    //     "Label": [
    //         "原",
    //         "转"
    //     ],
    //     "Content": [
    //         "在vue中有时候会遇到监听滚动事件的问题，这里我简单的讲一下自己遇到的。监听滚动事件在mounted中写下面",
    //         "在使用vue时，就会有使用到elementUI，之后就是不断的在入坑和天坑之间徘徊。elementUI中有个隐藏的组件，就是滚动条-----<el-scrollbar></el-scrollbar> 可以参考elementUI的官网代码",
    //         "默认的端口号是8080，但是很多情况下我们需要用到这个端口号，这是我们就需要去切换端口号了，这时候就打开",
    //         "element-ui中的select下拉列表如何设置默认值？在element-ui的运用中，涉及到了select下拉列表。项目中需要将select的默认值给展示出来",
    //         "之前整理的一篇 vue-cli 新手教程，出乎意料意外的达到了 9W+ 的点击量，诚惶诚恐，为了让更多小伙伴有更好的体验，所以特意整理了这个新版本的。欢迎有问题的小伙伴留言~~~vue2是对新手很友好的MVVM框架，有完善的官方中文文档，阅读起来也非常容易理解，由浅入深，示例完整。同时官方也提供了一个开箱即用的 vue-cli 帮我们生成一个完整的项目框架。vue.js 著名的全家桶系列, 包含了， vue-router, vuex， axios，再加上 vue-cli 就是一个从 路由，数据流管理，http请求都有的核心项目，vue 社区的丰富资源，也是满足了我们日常开发中的需求了。vue-cli 这个构建工具大大降低了 webpack 的使用难度，开箱即用的特性，大大降低了我们的学习成本，加快了我们的开发速度。"
    //     ],
    //     "Time": [
    //         "2018-12-27 09:57:08",
    //         "2017-10-17 19:41:02",
    //         "2019-09-07 11:07:12",
    //         "2018-02-27 08:57:02",
    //         "2019-04-22 15:51:58"
    //     ],
    //     "Read_Num": [
    //         "1090",
    //         "2091",
    //         "4613",
    //         "1591",
    //         "6371"
    //     ],
    //     "Comment_Num": [
    //         "57",
    //         "12",
    //         "97",
    //         "22",
    //         "105"
    //     ]
    // };

    // const insetToUl = (data) => {

    //     for (let i = 0; i < 10; i++) {
    //         //随机数 
    //         let randOffive = Math.floor(Math.random() * 5);
    //         let randOftwo = Math.floor(Math.random() * 2);
    //         //创建元素
    //         let addDiv_parent = $("<div></div>").attr("class", "article-item-box");
    //         let addH4_chilren = $("<h4></h4>").attr("class", "title");
    //         let addP_chilren = $("<p></p>").attr("class", "content");
    //         let addDiv_chilren = $("<div></div>").addClass("info-box d-flex align-content-center");

    //         //新盒父元素中追加子元素
    //         addDiv_parent.append(addH4_chilren, addP_chilren, addDiv_chilren);


    //         let addA_to_H4 = $("<a></a>").attr({ "href": "#", "target": "_blank" }).text(data.Title[randOffive]);
    //         let addA_to_P = $("<a></a>").attr({ "href": "#", "target": "_blank" }).text(data.Content[randOffive]);

    //         let addP_none = $("<p></p>");
    //         let addP_none_cf = addP_none.clone();
    //         let addP_none_cs = addP_none.clone();

    //         let type = null;
    //         if (data.Label[randOftwo] === "原") {
    //             type = "type-1";
    //         } else {
    //             type = "type-2";
    //         }

    //         addH4_chilren.append(addA_to_H4.prepend(`<span class="article-type ${type}">${data.Label[randOftwo]}</span>`));
    //         addP_chilren.append(addA_to_P);
    //         addDiv_chilren.append(addP_none.append(`<span class='date'>${data.Time[randOffive]}</span>`),
    //             "<p class='point'></p>", addP_none_cf.append(`<span class='read-num'>阅读数 <span class="num">${data.Read_Num[randOffive]}</span> </span>`),
    //             "<p class='point'></p>", addP_none_cs.append(`<span class='read-num'>评论数 <span class="num">${data.Comment_Num[randOffive]}</span> </span>`));

    //         //定位到.box-right，并把新盒子append到.box-right上
    //         $(".box-right").append(addDiv_parent);

    //         //添加鼠标移入事件
    //         $(".box-right > .article-item-box").mouseenter(function () {
    //             $(this).css("background-color", "#eee");
    //         });

    //         //添加鼠标移出事件
    //         $(".box-right > .article-item-box").mouseleave(function () {
    //             $(this).css("background-color", "#fff");
    //         });

    //     }

    // }
    // insetToUl(userArticle);


});