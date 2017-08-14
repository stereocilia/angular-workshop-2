(function(){
    angular
        .module('MyApp.MyViews')
        .controller('MyPageController', MyPageController)
    ;

    //define explicit dependencies
    MyPageController.$inject = ['MyAPIService'];

    //define controller
    function MyPageController( MyAPIService ){
        var vm = this;
        vm.title = 'Famous Programmers';
        vm.famousProgrammers;

        angular.element(document).ready(initialize);

        function initialize(){
            MyAPIService.getFamousProgrammers()
                .then(loadFamousProgrammers)
            ;
        }

        function loadFamousProgrammers( response ){
            vm.famousProgrammers = response.data;
        }
    }


})();