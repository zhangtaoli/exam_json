        /*
        * 首页核心js文件
        * */

        $(function () {
           //实现左侧导航动画效果

            $(".baseUI>li>a").off("click");
            $(".baseUI>li>a").on("click",function () {
                $(".baseUI>li>ul").slideUp();
                $(this).next().slideDown(300);
            });
            //默认收起全部，展示第一个
            $(".baseUI>li>ul").slideUp();
            $(".baseUI>li>a").eq(0).trigger("click");
            //$(".baseUI ul>li>a").eq(0).trigger("click");


            //样式变化
            $(".baseUI>li>ul>li").off("click");
            $(".baseUI>li>ul>li").on("click",function(){
                if(!$(this).hasClass("current")){
                    $(".baseUI>li>ul>li").removeClass("current");
                    $(this).addClass("current");
                }
            });
            //模拟点击
            $(".baseUI>li>ul>li>a").eq(0).trigger("click");

            $(".chose a").on("click",function () {
                if(!$(this).hasClass("active3")){
                    $(this).sibling().removeClass("active3");
                    $(this).addClass("active3");
                }
            });
        });

        //核心模块
        angular.module("app",["ng","ngRoute","app.subject","app.paper"])
        .controller("mainCtrl",["$scope",function ($scope) {

        }])
        .config(["$routeProvider",function ($routeProvider) {
            /*
            * a  类型id
            * b  方向id
            * c  知识点id
            * d  难度id
            * */
            $routeProvider.when("/AllSubject/a/:a/b/:b/c/:c/d/:d",{
                templateUrl:"tpl/subject/subjectList.html",
                controller:"subjectController"
            }).when("/SubjectAdd",{
                templateUrl:"tpl/subject/subjectAdd.html",
                controller:"subjectController"
            }).when("/SubjectDel/id/:id",{
                templateUrl:"tpl/subject/subjectList.html",
                controller:"subjectDelController"
            }).when("/SubjectCheck/id/:id/state/:state",{
                templateUrl:"tpl/subject/subjectList.html",
                controller:"subjectCheckController"
            }).when("/PaperList",{
                templateUrl:"tpl/paper/paperManager.html",
                controller:"paperListController"
            }).when("/PaperAdd/id/:id/stem/:stem/type/:type/topic/:topic/level/:level",{
                templateUrl:"tpl/paper/paperAdd.html",
                controller:"paperAddController"
            }).when("/PaperSubjectList",{
                templateUrl:"tpl/paper/subjectList.html",
                controller:"subjectController"
            })
        }]);
