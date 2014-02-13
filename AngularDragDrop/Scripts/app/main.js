var app = angular.module("workOrder", []);

app.controller("WorkOrderItemsCtrl", function ($scope) {
    // this will come from web API
    $scope.workOrderItems = [
        { hash: 'birthCertificate_firstName', name: 'First Name' },
        { hash: 'birthCertificate_lastName', name: 'Last Name' },
        { hash: 'birthCertificate_dob', name: 'Date of Birth' },
        { hash: 'birthCertificate_hospitalName', name: 'Hospital Name' }
    ];
});

app.directive("workorderitem", function () {
    return {
        restrict: "A",
        link: function(scope, element) {
            var el = element[0];
            el.draggable = true;
            el.addEventListener("dragstart", function(e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', this.id);
                this.classList.add("boxDragged");
                return false;
            }, false);
            el.addEventListener("dragend", function(e) {
                this.classList.remove("boxDragged");
                return false;
            }, false);
        }
    };
});

app.directive("workorderconfiguration", function () {
    return {
        scope: { },
        restrict: "A",
        link: function(scope, element) {
            var el = element[0];
            el.addEventListener("dragover", function(e) {
                e.dataTransfer.dropEffect = 'move';
                if (e.preventDefault) e.preventDefault();
                this.classList.add('boxDroppableHere');
                return false;
            }, false);
            el.addEventListener("dragenter", function (e) {
                this.classList.add('boxDroppableHere');
                return false;
            }, false);
            el.addEventListener("dragleave", function (e) {
                this.classList.remove('boxDroppableHere');
                return false;
            }, false);
            el.addEventListener("drop", function (e) {
                if (e.stopPropagation) e.stopPropagation();
                this.classList.remove('boxDroppableHere');
                var item = document.getElementById(e.dataTransfer.getData('Text'));
                this.appendChild(item);
                return false;
            }, false);
        },
        controller: function() {
            this.dump = function() {
                console.dir($("#workOrderConfiguration").children());
            };
            $('#workOrderConfiguration').sortable({
                update: this.dump
            });
        }
    };
});
