import { MediaContainer } from './MediaContainer.js';

export class NASAApiCall {
  constructor() {
    this.errorMessage;
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  async getMedia() {
    let jsonifiedResponse;
    let errorText;
    try {
      const response = await fetch(`https://images-api.nasa.gov/search?q=apollo%20112...`);
      // const response = await fetch(`https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=5a8046a6a8e49a894469fac0303aa51d;`);
      if (response.ok && response.status == 200) {
        jsonifiedResponse = await response.json();
      }
      else {
        errorText = "<span class=\"blackColor\">Error Code: </span><span class=\"redColor\">" + response.status + "</span><br>" + "(<span class=\"redColor\">" + response.statusText + "</span>)";
        jsonifiedResponse = false;
        throw Error(errorText);
      }
      return jsonifiedResponse;
    }
    catch (error) {
      this.errorMessage = error.message;
    }
    return false;
  }

  async processJSON(body) {
    let imgObjArray = [];
    let mediaObjCount = body.collection.items.length;
    for (let i = 0; i < mediaObjCount; i++) {
      if (body.collection.items[i].data[0].media_type === "image") { //remove all media type expect Images
        let title = body.collection.items[i].data[0].title;
        let dateCreated = body.collection.items[i].data[0].date_created;
        let description = body.collection.items[i].data[0].description;
        let nasaId = body.collection.items[i].data[0].nasa_id;
        let href = body.collection.items[i].links[0].href;
        let mediaType = body.collection.items[i].data[0].media_type;
        let mediaContainer = new MediaContainer(); //create object based on blue print "MediaContainer"
        mediaContainer.setter(dateCreated, description, nasaId, title, mediaType, href);
        imgObjArray.push(mediaContainer);
      }
    }
    return imgObjArray;
  }

  checkIfApiReturnedNoImage(imageCount) { //function that returns an object of type "Error" is if API call returned 0 images
    if (isNaN(imageCount) || imageCount == 0) {
      return new Error("API call returned no Image Media");
    }
    else {
      return true;
    }
  }
}