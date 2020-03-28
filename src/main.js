import { MediaContainer } from './MediaContainer.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

//function to hide check boxes until right option is selected in Drop-down Menu
$(function () {
  $('#cBId').hide();
  $('#dDId').change(function () {
    if ($('#dDId').val() == "With Meta Data") {
      $('#cBId').show();
    } else {
      $('#cBId').hide();
    }
  });
});

//function to disable Submit button until right option is selected in Drop-down Menu
$("select#dDId").on('change', function () {
  let temp = $("#dDId option:selected").text();
  if (temp === "Select") {
    $("button#submit").attr('disabled', true);
  }
  else {
    $("button#submit").attr('disabled', false);
  }
});

$(document).ready(function () {
  //Reload Page upon clicking "Refresh" button
  $('#restart').click(function () {
    document.location.reload(true);
  });
  $('#formOne').submit(function () {
    event.preventDefault();
    $('#showTitle').empty();
    $('#showDateCreated').empty();
    $('#showDescription').empty();
    $('#showHref').empty();
    $('#metaDataId').empty();
    $("#previous").hide();
    $("#next").hide();
    let userEnteredMetaData = $(".metaData").val();
    let clickedCheckBoxes = [];
    //Identify and store in an array the check boxes that were clicked
    $("input:checkbox[name=metaData]:checked").each(function () {
      clickedCheckBoxes.push($(this).val());
    });
    $("input[type=checkbox]").each(function () { this.checked = false; }); //to uncheck previously checked checkboxes

    //API Request and Promise implementation
    let promise = new Promise(function (resolve, reject) {
      const url = `https://images-api.nasa.gov/search?q=apollo%20112...`;
      // const url = `https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=5a8046a6a8e49a894469fac0303aa51d;`;
      let request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.send();
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        }
        else {
          reject(Error(request.statusText));
          let errorText = "<span class=\"blackColor\">Error Code: </span><span class=\"redColor\">" + request.status + "</span><br>" + "(<span class=\"redColor\">" + request.statusText + "</span>)";
          $("#results").empty().append(errorText);
        }
      };
    });
    promise.then(function (response) {
      let body = JSON.parse(response);
      let mediaObjCount = body.collection.items.length;
      let imgObjArray = [];
      for (let i = 0; i < body.collection.items.length; i++) {
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
      let imgObjCount = imgObjArray.length; // to Demo error handling when API call return no image, comment this line and uncomment below line
      // let imgObjCount = 0;
      
      try {
        const objectOfError = checkIfApiReturnedNoImage(imgObjCount);
        if (objectOfError instanceof Error) {                           // checking if return type is an object o type "Error"
          //console.error(objectOfError.message);                         // message is what ever is passed to "Error" object
          let errorText = "<span class=\"blackColor\">Error</span>: API call returned <span class=\"redColor\">" + imgObjCount + "</span> Image Media";
          throw RangeError(errorText);         // throw a RANGEERROR to move control to CATCH block.");
        }
        else { //TRY was successful-no need to throw RANGEERROR to move control to CATCH Block-instead proceed to rendering of images!
          //Code to handle very first click at which time "Previous" and "Next" buttons are made to appear
          let index = 0;
          printMetaData(index, clickedCheckBoxes, imgObjArray[index]);          
          //Code to handle clicks on "Next" button
          $('#next').on('click', function () {
            index += 1;
            if (index === imgObjCount - 1) {
              index = 0;
            }
            printMetaData(index, clickedCheckBoxes, imgObjArray[index]);
          });
          //Code to handle clicks on "Previous"" button
          $('#previous').on('click', function () {
            index -= 1;
            if (index === -1) {
              index = imgObjCount - 1;
            }
            printMetaData(index, clickedCheckBoxes, imgObjArray[index]);
          });
          $("#previous").show();
          $("#next").show();
        }
      }
      catch (rangeError) {
        if (rangeError instanceof RangeError) {   //redundant but leave it for conceptual understanding (checking if object rangeError is an object of "RangeError")
          $("#previous").hide();
          $("#next").hide();
          console.error(`AllMediaObject Count:ImageObject Count::${mediaObjCount}:${imgObjCount}`);
          $("#results").empty().append(rangeError.message);
        } 
      }

      //function that returns an object of type "Error" is if API call returned 0 images
      function checkIfApiReturnedNoImage(imageCount) {
        if (isNaN(imageCount) || imageCount == 0) {
          return new Error("checkIfApiReturnedNoImage: API call returned no Image Media");
        } else {
          return true;
        }
      }

      //function to handle rendering of "Meta Data" based on check box (s) clicked
      function printMetaData(index, checkBoxArray, imgObjArrayElement) {
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
    });
  });
});