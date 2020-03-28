import { Container } from './Container.js';
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
  let buttonObj = document.querySelector("button");
  //Reload Page upon clicking "Refresh" button
  $('#restart').click(function () {
    $('.accordion-item').hide();
    $(this).siblings("div").show();
    document.location.reload(true);
    buttonObj.textContent = "submit";
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
    $("input:checkbox[name=metaData]:checked").each(function () {
      clickedCheckBoxes.push($(this).val());
    });
    $("input[type=checkbox]").each(function () { this.checked = false; }); //to uncheck previously checked checkboxes
    
    let promise = new Promise(function (resolve, reject) {
      //const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
      const url = `https://images-api.nasa.gov/search?q=apollo%2011...`;
      let request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.send();
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
    });
    promise.then(function (response) {
      let body = JSON.parse(response);
      let mediaObjCount = body.collection.items.length;
      let imgObjArray = [];
      for (let i = 0; i < body.collection.items.length; i++) {
        if (body.collection.items[i].data[0].media_type === "image") {
          let title = body.collection.items[i].data[0].title;
          let dateCreated = body.collection.items[i].data[0].date_created;
          let description = body.collection.items[i].data[0].description;
          let nasaId = body.collection.items[i].data[0].nasa_id;
          let href = body.collection.items[i].links[0].href;
          let mediaType = body.collection.items[i].data[0].media_type;
          let container = new Container();
          container.setter(dateCreated, description, nasaId, title, mediaType, href);
          imgObjArray.push(container);
        }
      }
      let imgObjCount = imgObjArray.length;
      console.log(`Objects:ImageObjects::${mediaObjCount}:${imgObjCount}`);

      $("#previous").show();
      $("#next").show();      
      let index = 0;

      printMetaData(index, clickedCheckBoxes, imgObjArray[index]);
      $('#next').on('click', function () {
        index += 1;
        if (index === imgObjCount - 1) {
          index = 0;
        }
        printMetaData(index, clickedCheckBoxes, imgObjArray[index]);
      });

      $('#previous').on('click', function () {
        index -= 1;
        if (index === -1) {
          index = imgObjCount - 1;
        }
        printMetaData(index, clickedCheckBoxes, imgObjArray[index]);
      });

      function printMetaData(index, checkBoxArray, imgObjArrayElement) {
        $('#showTitle').empty();
        $('#showDateCreated').empty();
        $('#showDescription').empty();
        $('#showHref').empty();
        $('#metaDataId').empty();
        let htmlContent = `<figure><img src="${imgObjArrayElement.href}" alt="${imgObjArrayElement.description}" class="img-fluid"></figure>`;
        $("#results").empty().append(htmlContent);
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