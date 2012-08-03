require({
    packages: [
        { name: 'dojo', location: '../dojo' },
        { name: 'bootstrap', location: '../bootstrap' }
    ]
},[
    "doh",
    "dojo/on",
    "dojo/dom-construct",
    "dojo/dom-class",
    "bootstrap/Alert"
], function (doh, on, domConstruct, domClass) {
    "use strict";
    var q = dojo.query;
    var alertHTML = '<div class="alert-message warning fade in"><a class="close" href="#" data-dismiss="alert">×</a><p><strong>Holy guacamole!</strong> Best check yo self, you\'re not looking too good.</p></div>';

    doh.register("bootstrap-alerts", {
        "should be defined on NodeList object":function () {
            doh.t(q(document.body).alert);
        },
        "should return element":function () {
            doh.is(document.body, q(document.body).alert(document.body)[0]);
        },
        "should fade element out on clicking .close":{
            setUp:function () {
                this.n = domConstruct.place(alertHTML, document.body);
                q(this.n).alert();
                on.emit(q('.close', this.n)[0], "click", { bubbles:true, cancelable:true });
            },
            runTest:function () {
                doh.t(domClass.contains(this.n, 'in'));
            },
            tearDown:function(){
                domConstruct.destroy(this.n);
            }
        },
        "should remove element when clicking .close":{
            setUp:function () {
                this.n = domConstruct.place(alertHTML, document.body);
                domClass.remove(this.n, 'fade');    //disable transitions
                q(this.n).alert();
            },
            runTest:function () {
                doh.t(q('.alert-message', document.body).length);
                on.emit(q('.close', this.n)[0], "click", { bubbles:true, cancelable:true });
                doh.f(q('.alert-message', document.body).length);
            }
        }
    });
});
