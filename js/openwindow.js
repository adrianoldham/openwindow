var OpenWindow = Class.create({
    options: {
        windowWidth: 1024,
        windowHeight: 768,
        windowName: "_popup",
        windowLocationbar: "no",
        windowStatusbar: "no", // ignored by default in firefox
        windowMenubar: "no",
        windowToolbar: "no",
        windowPersonalbar: "no",
        windowScrollbars: "yes",
        windowResizable: "yes", // ignored by many modern browsers
        windowConfirm: false
    },

    initialize: function(selector, options) {        
        this.options = Object.extend(Object.extend({ }, this.options), options || { });
        
        this.selector = $$(selector);
        this.selector.each(function(element, options) {
             this.apply(element, options);
        }.bind(this));
    },

    apply: function(element, options) {
        var windowConfirm = this.options.windowConfirm;
        var windowLocation = element.href;
        var windowName = this.options.windowName;
        var windowAttributes = 'width=' + this.options.windowWidth +
                               ',height=' + this.options.windowHeight +
                               ',location=' + this.options.windowLocationbar +
                               ',status=' + this.options.windowStatusbar +
                               ',menubar=' + this.options.windowMenubar +
                               ',toolbar=' + this.options.windowToolbar +
                               ',resizable=' + this.options.windowResizable +
                               ',scrollbars=' + this.options.windowScrollbars;

        element.observe('click', openWindow);

        function openWindow(event) {
            if(windowConfirm) {
                var isConfirmed = confirm(windowConfirm);
                if(isConfirmed) {
                    window.open(windowLocation, windowName, windowAttributes);
                    event.stop();            
                } else {
                    event.stop();            
                }
            } else {
                window.open(windowLocation, windowName, windowAttributes);
                event.stop();
            }
        }
    }
});