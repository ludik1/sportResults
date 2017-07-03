var myApp = angular.module("loadData", ['ngAnimate']);

myApp.service("loadDataService", function($http, $q)
{
    var deferred = $q.defer();
    $http.get('data/offer.json').then(function(data){
        deferred.resolve(data);
    });

    this.getData = function(){
        return deferred.promise;
    }
})
.controller("loadDataCtrl", function($scope, $interval, loadDataService)
{
    var promise = loadDataService.getData();
    $scope.showedLeagues = [];
    var i = 0;

    $interval(function(){
        $scope.showMatch();
    },10000);

    $scope.showMatch = function() {
        if(i < $scope.Leagues.length){
            $scope.showedLeagues.push($scope.Leagues[i]);
            i++;
        }
    };

    $scope.hideMatch = function() {
        if(i > 1){
            $scope.showedLeagues.pop();
            i--;
        }
    };

    promise.then(function (data){
        $scope.jsonData = data;

        $scope.EventChanceTypes = $scope.jsonData.data.EventChanceTypes;
        $scope.Odds = $scope.jsonData.data.Odds;
        $scope.Labels = $scope.jsonData.data.Labels;   
        
        $scope.Leagues = [];
        $scope.tmpLeagues = [];
        $scope.EventChanceTypes.forEach(function(element) {
            if($scope.tmpLeagues.indexOf(element.LeagueCupID) === -1){
                $scope.Leagues.push({ 
                    "LeagueCupID" : element.LeagueCupID,
                    "SportID"     : element.SportID,
                    "RegionID"    : element.RegionID
                });
                $scope.tmpLeagues.push(element.LeagueCupID);
            }
        }, this);
        console.log()
        $scope.showMatch();
    });

    $scope.getSportTitle = function(id){        
        return $scope.Labels["SP_" + id].Name;
    }

    $scope.getLeagueTitle = function(id){
        return $scope.Labels["LC_" + id].Name;
    }

    $scope.getRegionTitle = function(id){
        return $scope.Labels["RE_" + id].Name;
    }

    $scope.getOddsRate = function(id){
        if($scope.Odds[id]){
            return $scope.Odds[id].OddsRate;
        }
        return "-";
    }
})