/*@author Tushar Borole
 * @description Add ios style clear button for input box
 * for example <input type="text" id="fixed"  clear-btn/>*/

angular.module('angular-clear-button', []).directive('clearBtn', ['$parse', function ($parse) {
    return {
        link: function (scope, elm, attr, ngModelCtrl) {
            var top = elm.height() / 2;
            elm.wrap("<div style='position: relative'></div>");
            var btn = '<span id=' + Math.round(Math.random() * 1000000000) + ' class="searchclear ng-hide glyphicon glyphicon-remove-circle"></span>';
            var angularBtn = angular.element(btn);
            angularBtn.css('top', top);
            elm.after(angularBtn);
            //clear the input
            angularBtn.on("click", function () {
                elm.val('').trigger("change");
                $parse(attr.ngModel).assign(scope, null);
                scope.$apply();
            });

            // show  clear btn  on focus
            elm.bind('focus keyup change paste propertychange', function (blurEvent) {
                if (elm.val() && elm.val().length > 0) {
                    angularBtn.removeClass("ng-hide");
                } else {
                    angularBtn.addClass("ng-hide");
                }
            });
            // remove  clear btn  on focus
            elm.bind('blur', function (blurEvent) {
                if (!angularBtn.is(":hover"))
                    angularBtn.addClass("ng-hide");
            });
        }
    };
}]);
