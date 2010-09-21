var OpenWindow = Class.create({
    options: {
        windowWidth: 1024,
        windowHeight: 768,
        windowName: "_popup",
        windowLocation: "no",
        windowStatus: "no",
        windowMenubar: "no",
        windowScrollbars: "yes",
        windowConfirm: false
    },

    initialize: function(selector, options) {        
        this.options = Object.extend(Object.extend({ }, this.options), options || { });
        
        this.selector = $$(selector);
        this.selector.each(function(element) {
             this.apply(element, options);
        }.bind(this));
    },

    apply: function(element, options) {
        var windowConfirm = this.options.windowConfirm;
        var windowUrl = element.href;
        var windowName = this.options.windowName;
        var windowParams = 'width=' + this.options.windowWidth +
                           ',height=' + this.options.windowHeight +
                           ',location=' + this.options.windowLocation +
                           ',status=' + this.options.windowStatus +
                           ',menubar=' + this.options.windowMenubar +
                           ',scrollbars=' + this.options.windowScrollbars;

        element.observe('click', openWindow);

        function openWindow(event, options) {
            element = event.element();
            if(windowConfirm) {
                var isConfirmed = confirm(windowConfirm);
                if(isConfirmed) {
                    window.open(windowUrl, windowName, windowParams);
                    event.stop();            
                } else {
                    event.stop();            
                }
            } else {
                window.open(windowUrl, windowName, windowParams);
                event.stop();
            }
        }
    }
});