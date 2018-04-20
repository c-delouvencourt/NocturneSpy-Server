App
  .directive('callLogItem', [
    function() {
      return {
        restrict: 'AE',
        scope: {
          callLogItem: '='
        },
        template: `<span ng-class="callLogClass()">
              <h4>
                <span ng-if="log.type*1===1">(Appel entrant)</span>
                <span ng-if="log.type*1===2">(Appel sortant)</span>
                <span ng-if="log.type*1===3">(Appel raté)</span>
               </h4>
               <h5> {{log.name}} {{log.phone}}</h5>
             
              </br>
              {{log.date}}</br>
              duration {{log.duration*1000|duration:'hh:mm:ss'}}</br>
        </span>`,
        link: function($scope) {

          $scope.log = $scope.callLogItem;

          $scope.callLogClass = function() {
            switch ($scope.log.type * 1) {
              case 1:
                return 'text-success';
                break;
              case 2:
                return 'text-info';
                break;
              case 3:
                return 'text-danger';
                break;
            }
          }

        }
      }
    }
  ])
