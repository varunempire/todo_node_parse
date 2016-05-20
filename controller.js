var app = angular.module('todo', []);

app.controller('todoController',function($scope, $http) {
    $scope.formData = {};
    $scope.todolist = {};
    $scope.loadTodo = function() {
        $http.get('/api/todos')
        .success(function(data) {
            $scope.formData = {};
            $scope.todos = data;
            console.log(data);
            data.reverse();
            $scope.todolist = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
        
    }
    $scope.createTodo = function() {
         $http({
            url: '/api/todos',
            method: "POST",
            params: $scope.formData
            })
            .success(function(data) {
                $scope.formData = {};
                data.reverse();
                $scope.todolist = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.updateTodo = function(id, isDone){
        console.log(id+":"+isDone);
        var data = {"id" : id, "isDone": isDone};
        console.log(data);
         $http({
            url: '/api/todosUpdate',
            method: "POST",
            params: data
            })
            .success(function(data) {
                $scope.formData = {};
                data.reverse();
                $scope.todolist = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.deleteTodo = function(id){
        var data = {"id" : id};
        console.log(data);
         $http({
            url: '/api/todosDelete',
            method: "POST",
            params: data
            })
            .success(function(data) {
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
   
});