/**
 * Created by Administrator on 2016/9/28.
 * 试卷模块
 */
    angular.module("app.paper",["ng","app.subject"])
        //查询控制器
        .controller("paperListController",["$scope",function ($scope) {

        }])
        //添加控制器
        .controller("paperAddController",["$scope","xn","$routeParams","paperModel","paperService",function ($scope,xn,$routeParams,paperModel,paperService) {
            //
            xn.xncome(function (data) {
                $scope.dps = data
            });
            var subjectId = $routeParams.id;
            if(subjectId!=0){
                paperModel.addSubjectId(subjectId);
                paperModel.addSubject($routeParams);
            }

            //alert($routeParams.id)
            //双向绑定的模板
            $scope.pmodel = paperModel.model;
            $scope.savePaper=function () {
                paperService.savePaper($scope)
            }

        }])
        //试卷删除控制器
        .controller("paperDelController",["$scope",function ($scope) {

        }])
        .factory("paperService",function ($httpParamSerializer,$http) {
            return{
                savePaper:function (param,handler) {
                    var obj = {};
                    for(var key in param){
                        var val = param[key];
                        switch(key){
                            case "departmentId":
                                obj['']=val
                                break;
                        }
                    }
                    obj = $httpParamSerializer(obj);
                    $http.post("http://172.16.0.5:7777/test/exam/manager/saveSubject.action",obj,{
                        headers:{
                            "Content-Type":"application/x-www-form-urlencoded"
                        }
                    }).success(function (data) {
                        handler(data);
                    });
                }
            }
        })
        .factory("paperModel",function () {
            return {
                //模板 单例（保留值）
                model:{
                    departmentId:1,     //方向id
                    title:"",           //试卷标题
                    desc:"",            //试卷描述
                    at:0,               //答题时间
                    total:0,            //总分
                    scores:[],          //每个题目的分值
                    subjectIds:[],       //每个题目的id
                    subjects:[]
                },
                addSubjectId:function (id) {
                    this.model.subjectIds.push(id);
                },
                addSubject:function (subjects) {
                    this.model.subjectIds.push(subjects);
                }
            }
        })