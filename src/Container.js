export class Container {
    constructor() {
        this.dateCreated;
        this.description;
        this.nasaId;
        this.title;
        this.mediaType;
        this.href;
    }
    setter(dateCreated, description, nasaId, title, mediaType, href) {
        this.dateCreated = dateCreated;
        this.description = description;
        this.nasaId = nasaId;
        this.title = title;
        this.mediaType = mediaType;
        this.href = href;
    }
}