export class SelectManager {
    private static selectingManager : SelectManager;
    private _selectedText : string;
    //TODO do with mask problem with singleton
    public static getInstance() : SelectManager {
        if (this.selectingManager == null) {
            this.selectingManager = new SelectManager();
        }
        return this.selectingManager;
    }

    get selectedText(): string {
        return this._selectedText;
    }

    set selectedText(value: string) {
        this._selectedText = value;
    }

}