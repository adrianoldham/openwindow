var OpenWindow = Class.create({
    options: {
        windowWidth: 1024,
        windowHeight: 768,
        windowName: "_popup",
        windowLocationbar: "no",
        windowStatusbar: "no", // ignored by default in firefox
        windowMenubar: "no",
        windowToolbar: "no",
        windowScrollbars: "yes",
        windowResizable: "yes", // ignored by many modern browsers
        windowConfirm: false,
        windowCenterOf: null // "window" or "screen"
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
        element.observe('click', this.openWindow.bindAsEventListener(this, element));
    },

    setupWindow: function() {
        this.newWindow;
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

    getWindowPosition: function() {

        var windowWidth, windowHeight;
        var windowLeft, windowTop;

        if(Object.isNumber(window.outerWidth)) {
            // Non-IE
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        } else if (!Object.isUndefined(document.documentElement) && (!Object.isUndefined(document.documentElement.clientWidth) || !Object.isUndefined(document.documentElement.clientHeight))) {
            // IE 6+ in 'standards compliant mode'
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        } else if (!Object.isUndefined(document.body) && (!Object.isUndefined(document.body.clientWidth) || !Object.isUndefined(document.body.clientHeight))) {
            // IE 4 compatible
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }

        if(Object.isNumber(window.screenX)) {
            // Non-IE
            windowLeft = window.screenX;
            windowTop = window.screenY;
        } else {
            // IE
            windowLeft = window.screenLeft;
            windowTop = window.screenTop;
        }

        switch (this.options.windowCenterOf) {
            case "window":
                windowLeft = ((windowWidth - this.options.windowWidth) / 2) + windowLeft;
                windowTop = ((windowHeight - this.options.windowHeight) / 2) + windowTop;
                break;

            case "screen":
                windowLeft = ((screen.width - this.options.windowWidth) / 2);
                windowTop = ((screen.height - this.options.windowHeight) / 2);
                break;
        }

        return { left: windowLeft, top: windowTop }
    },

    openWindow: function(event, element) {
        event.stop();

        // Open the new window if it doesn't already exist
        if(Object.isUndefined(this.newWindow) || this.newWindow.closed) {

            // If true prompt the user for confirmation
            if(this.windowConfirm) {
                var isConfirmed = confirm(this.windowConfirm);
                if(!isConfirmed) return;
            }

            // Open window without location to avoid security errors when positioning
            this.newWindow = window.open("", this.windowName, this.windowAttributes);

            // If not null setup window position
            if(this.options.windowCenterOf != null) {
                var windowPosition = this.getWindowPosition();
                this.newWindow.moveTo(windowPosition.left,windowPosition.top);
            }
        }
        this.newWindow.focus();
        this.updateWindowLocation(element);
    },

    updateWindowLocation: function(element) {
        this.newWindow.location.replace(element.href);
    }
});