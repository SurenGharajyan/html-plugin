export class BrowserHelper {
    private static browserHelper: BrowserHelper;

    public static get newInstance(): BrowserHelper {
        return BrowserHelper.browserHelper == null
            ? BrowserHelper.browserHelper = new BrowserHelper()
            : BrowserHelper.browserHelper;
    }

    public isFirefox() {
        console.log('firefox');
        return (navigator.userAgent.toLowerCase().indexOf('firefox') > -1);
    }

    public isChrome() {
        console.log('chrome');
        return (navigator.userAgent.toLowerCase().indexOf('chrome') > -1);
    }

    public isOpera() {
        console.log('opera');
        return (navigator.userAgent.toLowerCase().indexOf('opera') > -1);
    }

    public isSafari() {
        console.log('safari');
        return (navigator.userAgent.toLowerCase().indexOf('safari') > -1);
    }

    public isExplorer() {
        console.log('explorer');
        return (navigator.userAgent.toLowerCase().indexOf('msie') > -1);
    }

    public isEdge() {
        console.log('edge');
        return (navigator.userAgent.toLowerCase().indexOf('edge') > -1);
    }
}