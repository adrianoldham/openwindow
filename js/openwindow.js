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
        this.selector.each(function(element) {
             this.apply(element);
        }.bind(this));

        this.setupWindow();
    },

    apply: function(element) {
        element.observe('click', function() {
            this.windowLocation = element.href;
            this.openWindow(event);
        }.bind(this));
    },

    setupWindow: function() {
        this.windowConfirm = this.options.windowConfirm;
        this.windowName = this.options.windowName;
        this.windowAttributes = 'width=' + this.options.windowWidth +
                               ',height=' + this.options.windowHeight +
                               ',location=' + this.options.windowLocationbar +
                               ',status=' + this.options.windowStatusbar +
                               ',menubar=' + this.options.windowMenubar +
                               ',toolbar=' + this.options.windowToolbar +
                               ',resizable=' + this.options.windowResizable +
                               ',scrollbars=' + this.options.windowScrollbars;
    },

    openWindow: function(event) {
        if(this.windowConfirm) {
            var isConfirmed = confirm(this.windowConfirm);
            if(isConfirmed) {
                window.open(this.windowLocation, this.windowName, this.windowAttributes);
                event.stop();            
            } else {
                event.stop();            
            }
        } else {
            window.open(this.windowLocation, this.windowName, this.windowAttributes);
            event.stop();
        }
    }
});