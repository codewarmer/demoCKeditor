angular.module('MyApp', ['ngCkeditor']).
  controller('PageCtrl', function ($scope) {
    $scope.ckeditorConfig = {
      lang: 'en',
      toolbar_full: [
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', 'Underline' ] },
        { name: 'paragraph', items: [ 'BulletedList', 'NumberedList', 'Blockquote' ] },
        { name: 'editing', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
        { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
        { name: 'tools', items: [ 'SpellChecker', 'Maximize' ] },
        '/',
        { name: 'styles', items: [ 'Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat' ] },
        { name: 'insert', items: [ 'Image', 'Table', 'SpecialChar' ] },
        { name: 'forms', items: [ 'Outdent', 'Indent' ] },
        { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
        { name: 'document', items: [ 'PageBreak', 'Source', 'pbckcode' ] },
        { name: 'pbckcode' }
      ],
      extraPlugins: 'pbckcode',
      pbckcode: {'highlighter': 'PRETTIFY'}
    };
  }).
  directive('compile', function($compile) {
    return {
      'restrict': 'A',
      'link': function(scope, elem, attrs) {
        scope.$watch(
          function(scope) {
            return scope.$eval(attrs.compile);
          },
          function(value) {
            elem.html(value);
            $compile(elem.contents())(scope);
          }
        );
      }
    };
  }).
  directive('prettyprint', function() {
    return {
      'restrict': 'C',
      'link': function postLink(scope, element, attrs) {
      var langExtension = attrs['class'].match(/\blang(?:uage)?-([\w.]+)(?!\S)/);
      if(langExtension) langExtension = langExtension[1];
      //load Google prettify library
      element.html(prettyPrintOne(element.html(), langExtension, true));
    }
  };
});
