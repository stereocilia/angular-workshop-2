(function () {
    angular
        .module('MyApp.MyAPI')
        .service('MyAPIService', MyAPIService)
    ;

    MyAPIService.$inject = ['$http'];

    function MyAPIService( $http ) {

        this.getFamousProgrammers = getFamousProgrammers;

        function getFamousProgrammers(){
            return $http({
                method:'GET',
                url:'../famous-programmers.php'
            });
        }
    }

})();