angular.module('bowlawesome.directives', [])

.directive('holdGesture', function (Gesture) {
    return {
        // Other directive stuff ...

        link: function ($scope, $element, $attr) {
            var handleDrag = function (e) {
                // Access e.gesture for gesture related information
                console.log('hold: ', e.gesture.touches[0].pageX, e.gesture.touches[0].pageY, e.gesture.deltaX, e.gesture.deltaY);
            };

            var dragGesture = Gesture.on('hold', handleDrag, $element);

            $scope.$on('$destroy', function () {
                // Unbind drag gesture handler
                Gesture.off(dragGesture, 'hold', handleDrag);
            });
        }
    };
})
 .directive('box', function (Gesture) {
     return {
         restrict: 'C',
         link: function ($scope, $element, $attr) {
             var output = angular.element(document.getElementById('output'));

             // Debug output function
             var o = function (type, d) {
                 var p = ['<div>' + type + ' event: '];
                 for (var i = 0; i < d.length; i++) {
                     p.push(d[i]);
                 }
                 p.push('</div>');
                 output.append(p.join(', '));
                 $element[0].scrollTop = $element[0].scrollHeight;
             };

             var tapFn = function (e) {
                 o('tap', [e.gesture.touches[0].pageX, e.gesture.touches[0].pageY]);
             };
             var tapGesture = Gesture.on('tap', tapFn, $element);

             var releaseFn = function (e) {
                 o('release', [e.gesture.touches[0].pageX, e.gesture.touches[0].pageY]);
             };
             var releaseGesture = Gesture.on('release', releaseFn, $element);

             var holdFn = function (e) {
                 o('hold', [e.gesture.touches[0].pageX, e.gesture.touches[0].pageY]);
             };
             var holdGesture = Gesture.on('hold', holdFn, $element);

             var dragFn = function (e) {
                 o('drag', [e.gesture.touches[0].pageX, e.gesture.touches[0].pageY, e.gesture.deltaX, e.gesture.deltaY]);
             };
             var dragGesture = Gesture.on('drag', dragFn, $element);

             var swipeFn = function (e) {
                 o('swipe', [e.gesture.touches[0].pageX, e.gesture.touches[0].pageY, e.gesture.direction]);
             };
             var swipeGesture = Gesture.on('swipe', swipeFn, $element);

             var transformFn = function (e) {
                 o('transform', [e.gesture.touches[0].pageX, e.gesture.touches[0].pageY, e.gesture.direction]);
             };
             var transformGesture = Gesture.on('transform', transformFn, $element);

             $scope.$on('$destroy', function () {
                 Gesture.off(dragGesture, 'drag', dragFn);
                 Gesture.off(holdGesture, 'hold', holdFn);
                 Gesture.off(releaseGesture, 'release', releaseFn);
                 Gesture.off(swipeGesture, 'swipe', swipeFn);
                 Gesture.off(tapGesture, 'tap', tapFn);
                 Gesture.off(transformGesture, 'transform', transformFn);
             });
         }
     };
 });