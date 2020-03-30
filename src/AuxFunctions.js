export class AuxFunctions {
    constructor() {
        this.tempIndex;
        this.tempImageMediaCount;
    }

    setIndex(tempIndex) {
        this.tempIndex = tempIndex;
    }

    setImageMediaCount(tempImageMediaCount) {
        this.tempImageMediaCount = tempImageMediaCount;
    }

    getIndex() {
        return this.tempIndex;
    }

    getImageMediaCount() {
        return this.tempImageMediaCount;
    }

    initialize() {
        $('#showTitle').empty();
        $('#showDateCreated').empty();
        $('#showDescription').empty();
        $('#showHref').empty();
        $('#metaDataId').empty();
        $("#previous").hide();
        $("#next").hide();
        $("#results").empty();
    }

    printMetaData(index, checkBoxArray, userEnteredMetaData, imgObjArrayElement) { //function to handle rendering of "Meta Data" based on check box (s) clicked
        $('#showTitle').empty();
        $('#showDateCreated').empty();
        $('#showDescription').empty();
        $('#showHref').empty();
        $('#metaDataId').empty();
        let imageToRender = `<figure><img src="${imgObjArrayElement.href}" alt="${imgObjArrayElement.description}" class="img-fluid"></figure>`;
        $("#results").empty().append(imageToRender);
        if (checkBoxArray.length != 0 && userEnteredMetaData === "With Meta Data") {
            for (let i = 0; i < checkBoxArray.length; i++) {
                if (checkBoxArray[i] === "title") {
                    let showTitleText = "<span class=\"coralColor\">Title: </span>" + imgObjArrayElement.title + "<br>";
                    let showTitleTargetId = $("#showTitle");
                    showTitleTargetId.html(showTitleText);
                }
                else if (checkBoxArray[i] === "dateCreated") {
                    let showDateCreateText = "<span class=\"coralColor\">Date Created: </span>" + imgObjArrayElement.dateCreated.substring(0, 10) + "<br>";
                    let showDateCreateTargetId = $("#showDateCreated");
                    showDateCreateTargetId.html(showDateCreateText);
                }
                else if (checkBoxArray[i] === "description") {
                    let showDescriptionText = "<span class=\"coralColor\">Description: </span>" + imgObjArrayElement.description + "<br>";
                    let showDescriptionTargetId = $("#showDescription");
                    showDescriptionTargetId.html(showDescriptionText);
                }
                else if (checkBoxArray[i] === "href") {
                    let showHrefText = "<span class=\"coralColor\">Image URL: </span><a href=\"" + imgObjArrayElement.href + "\"target=\"_blank\">" + imgObjArrayElement.href + "</a>";
                    let showHrefTargetId = $("#showHref");
                    showHrefTargetId.html(showHrefText);
                }
            }
            let metaDataIDer = $("p#metaDataId");
            let metaDataText;
            if (checkBoxArray.length === 1) {
                metaDataText = "<span class=\"coralColor\">Meta Data </span>element requested was ... <br>";
            }
            else if (checkBoxArray.length > 1) {
                metaDataText = "<span class=\"coralColor\">Meta Data </span>elements requested were ... <br>";
            }
            metaDataIDer.html(metaDataText);
        }
    }
}