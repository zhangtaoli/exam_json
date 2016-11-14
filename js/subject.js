/**
 * Created by Administrator on 2016/9/22.
 * 题目管理的JS模块
 */

    angular.module("app.subject",["ng","ngRoute"])
        .controller("subjectCheckController",["$routeParams","subjectService","$location",
            function ($routeParams,subjectService,$location) {
                subjectService.checkSubject($routeParams.id,$routeParams.state,function (data) {
                    alert(data);
                    //跳转
                    $location.path("/AllSubject/a/0/b/0/c/0/d/0");
                })

            }])
        .controller("subjectDelController",["$routeParams","subjectService","$location",
            function ($routeParams,subjectService,$location) {
                var flag = confirm("确认删除吗？");
                if(flag){
                    var id = $routeParams.id;
                    subjectService.delSubject(id,function (data) {
                        alert(data);
                        //页面发生跳转
                        $location.path("/AllSubject/a/0/b/0/c/0/d/0");
                    })
                }else{
                    $location.path("/AllSubject/a/0/b/0/c/0/d/0");
                }
            }])
    .controller("subjectController",["$scope","$location","nana","xn","zhu","xf","subjectService","$routeParams",
        function ($scope,$location,nana,xn,zhu,xf,subjectService,$routeParams) {
        //将路由参数绑定到作用域中
        $scope.params=$routeParams;
        console.log($routeParams);
        //添加页面绑定的对象
        $scope.subject={
            typeId:3,
            levelId:1,
            departmentId:1,
            topicId:1,
            stem:"",
            answer:"",//简答题的答案
            fx:"",
            choiceContent :[],
            choiceCorrect:[false,false,false,false]
        };

        $scope.add=function () {
            $location.path("/SubjectAdd");
        };
        
        $scope.submit=function () {
            subjectService.saveSubject($scope.subject,function (data) {
                alert(data);
            })
            //重置作用域中绑定的表单默认值
            var subject={
                typeId:3,
                levelId:1,
                departmentId:1,
                topicId:1,
                stem:"",
                answer:"",//简答题的答案
                fx:"",
                choiceContent :[],
                choiceCorrect:[false,false,false,false]
            };
            angular.copy(subject,$scope.subject);
        };
        $scope.submitAndClose = function () {
            subjectService.saveSubject($scope.subject,function (data) {
                alert(data);
            });
            //跳转页面
            $location.path("/AllSubject/a/0/b/0/c/0/d/0");
        };
        
        nana.getnana(function (data) {
            $scope.data=data;
        });
        xn.xncome(function (data) {
            $scope.datb=data;
        });
        zhu.xf(function (data) {
                $scope.datc=data;
        });
        xf.zhuxf(function (data) {
            $scope.datd=data;
        });
        //获取所有题目信息
        subjectService.getAllSubjects($routeParams,function (data) {
            data.forEach(function (subject) {
                var answer = [];//存放答案
                //为每个选项添加A、B、C、D
                if(subject.subjectType!=null){
                subject.choices.forEach(function (choice,index) {
                    choice.na = xn.getChart(index);
                });
                //答案显示
                if(subject.subjectType.id != 3){
                    subject.choices.forEach(function (choice) {
                         if(choice.correct){
                             answer.push(choice.na);
                         }
                    });
                //修改当前题目的answer值
                subject.answer = answer.toString();
                }
                }
            })

            $scope.subjects = data;
        })
    }])

    .config(function (nanaProvider) {
        nanaProvider.setUrl("data/type.json");
        //nanaProvider.setUrl("http://172.16.0.5:7777/test/exam/manager/getAllSubjectType.action");
        })
    .provider("nana",function () {
        this.url="";
        this.setUrl=function (url) {
            this.url=url;
        };
        this.$get =function ($http) {
            var self = this;
            return{
                getnana:function (handler) {
                    $http.get(self.url).success(function (data) {
                        handler(data);
                    });
                }
            }
        }
    })
    .factory("xn",["$http",function ($http) {
        return{
            //数字序号index变字母
           getChart:function (index) {
                return index==0?'A':(index==1?'B':(index==2?'C':(index==3?'D':'E')))
           },
            xncome:function (handler) {
                $http.get("data/department.json").success(function (data) {
                //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllDepartmentes.action").success(function (data) {
                    handler(data);
                })
            }
        }
    }])
    .service("zhu",["$http",function ($http) {
        this.xf=function (handler) {
            $http.get("data/topics.json").success(function (data) {
            //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllTopics.action").success(function (data) {
                handler(data);
            });
        }
    }])
     .factory("xf",["$http",function ($http) {
         return{
                zhuxf:function (handler) {
                    $http.get("data/level.json").success(function (data) {
                    //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectLevel.action").success(function (data) {
                        handler(data);
                    })
                }
            }
     }])

        .service("subjectService",["$http","$httpParamSerializer",function ($http,$httpParamSerializer) {
            this.checkSubject = function (id,state,handler) {
                $http.get("http://17" +
                    "2.16.0.5:7777/test/exam/manager/checkSubject.action",{
                    params:{
                        'subject.id':id,
                        'subject.checkState':state
                    }
                }).success(function (data) {
                    handler(data)
                });
            }
            this.delSubject = function (id,handler) {
                $http.get("http://172.16.0.5:7777/test/exam/manager/delSubject.action",{
                    params:{
                        'subject.id':id
                    }
                }).success(function (data) {
                    handler(data)
                });
            }
            this.saveSubject=function (params,handler) {
                //处理数据
                var obj = {};
                for(var key in params){
                    var val = params[key];
                    switch (key){
                        case "typeId":
                            obj['subject.subjectType.id'] = val;
                            break;
                        case "levelId":
                            obj['subject.subjectLevel.id'] = val;
                            break;
                        case "departmentId":
                            obj['subject.department.id'] = val;
                            break;
                        case "topicId":
                            obj['subject.topic.id'] = val;
                            break;
                        case "stem":
                            obj['subject.stem'] = val;
                            break;
                        case "fx":
                            obj['subject.analysis'] = val;
                            break;
                        case "answer":
                            obj['subject.answer'] = val;
                            break;
                        case "choiceContent":
                            obj['choiceContent'] = val;
                            break;
                        case "choiceCorrect":
                            obj['choiceCorrect'] = val;
                            break;
                    }
                }
                //对obj对象进行表单格式的序列化操作（默认使用JSON格式）
                obj = $httpParamSerializer(obj);
                $http.post("http://172.16.0.5:7777/test/exam/manager/saveSubject.action",obj,{
                    headers:{
                        "Content-Type":"application/x-www-form-urlencoded"
                    }
                }).success(function (data) {
                        handler(data);
                    });
            };
            //获取所有题目信息`
            this.getAllSubjects = function (params,handler) {
                var data = {};
                for(var key in params){
                    var val = params[key];
                    if(val!=0){
                    switch(key){
                        case "a":
                            data['subject.subjectType.id']=val;
                            break;
                        case "b":
                            data['subject.department.id']=val;
                            break;
                        case "c":
                            data['subject.topic.id']=val;
                            break;
                        case "d":
                            data['subject.subjectLevel.id']=val;
                            break;
                    }
                    }
                }
                console.log(data);
               //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjects.action",{
                 //   params:data
                //}).success(function (data) {
            $http.get("data/subjects.json").success(function (data) {
                        handler(data);
                })
            };
        }])
        .filter("selectTopics",function () {
            //第一个参数input要过滤的内容，第二个参数id方向id
            return function (input,id) {
                //console.log(input,id);
                //Array.prototype.filter进行过滤
                if(input){
                    var result = input.filter(function (item) {
                        return item.department.id == id;
                    });
                    //将过滤后的内容返回
                    return result
                 }
                }
        })
        .directive("selectOption",function () {
            return {
                restrict:"A",
                link:function (scope,element) {
                    //console.log(scope.subject.choiceCorrect);
                    //scope.subject.choiceCorrect.push(true);
                    //console.log(scope.subject.choiceCorrect);
                    //console.log(element);
                    element.on("change",function () {
                        var type = $(this).attr("type");
                        var val = $(this).val();
                        var isCheck = $(this).prop("checked");

                        //设置值
                       // alert(type+""+isCheck);
                        if(type =="radio"){
                            //重置
                            scope.subject.choiceCorrect = [false,false,false,false];
                            alert(type+"--"+val);
                            for(var i=0;i<4;i++ ){
                                if(i==val){
                                    scope.subject.choiceCorrect[i] = true;
                                }
                            }
                        }else if(type == "checkbox"){
                            for(var i=0;i<4;i++ ){
                                if(i==val){
                                    scope.subject.choiceCorrect[i] = true;
                                }
                            }
                        }
                        //强制消化
                        scope.$digest();
                    });
                }
            }
        });

