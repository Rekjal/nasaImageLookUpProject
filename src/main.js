import { Container } from './Container.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

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
  $('#restart').click(function () {
    $('.accordion-item').hide();
    $(this).siblings("div").show();
    document.location.reload(true);       //Reload Page
    buttonObj.textContent = "submit";
  });
  $('#formOne').submit(function () {
    event.preventDefault();
    $('#showTitle').empty();
    $('#showDateCreated').empty();
    $('#showDescription').empty();
    $('#showHref').empty();
    $('#metaDataId').empty();
    $("#metaData").hide();
    $("#previous").show();
    $("#next").show();
    let userEnteredMetaData = $(".metaData").val();
    console.log(`Main: userEnteredMetaData is ${userEnteredMetaData}`);
    let metaDataSelection = [];
    $("input:checkbox[name=metaData]:checked").each(function () {
      metaDataSelection.push($(this).val());
    });
    $("input[type=checkbox]").each(function () { this.checked = false; }); //to uncheck previously checked checkboxes
    //console.log(`Main: metaDataSelection is ${metaDataSelection}`);

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
      }
    });

    promise.then(function (response) {
      let body = JSON.parse(response);
      let len = body.collection.items.length;
      let hrefArr = [];
      let objArray = [];
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
          objArray.push(container);
        }
      }

      let len2 = objArray.length;
      let index = 0;

      printMetaData(index, metaDataSelection, objArray[index]);
      $('#next').on('click', function () {
        index += 1;
        if (index === len2 - 1) {
          index = 0;
        }
        printMetaData(index, metaDataSelection, objArray[index]);
      });

      $('#previous').on('click', function () {
        index -= 1;
        if (index === -1) {
          index = len2 - 1;
        }
        printMetaData(index, metaDataSelection, objArray[index]);
      });

      function printMetaData(index, checkBoxArray, objArrayElement) {
        $('#showTitle').empty();
        $('#showDateCreated').empty();
        $('#showDescription').empty();
        $('#showHref').empty();
        $('#metaDataId').empty();
        let htmlContent = `<figure><img src="${objArray[index].href}" alt="${objArray[index].description}" class="img-fluid"></figure>`;
        $("#results").empty().append(htmlContent);
        if (checkBoxArray.length != 0) {
          for (let i = 0; i < checkBoxArray.length; i++) {
            if (checkBoxArray[i] === "title") {
              let showTitleText = "<span class=\"coralColor\">Title: </span>" + objArray[index].title + "<br>";
              let showTitleTargetId = $("#showTitle");
              showTitleTargetId.html(showTitleText);
            }
            else if (checkBoxArray[i] === "dateCreated") {
              let showDateCreateText = "<span class=\"coralColor\">Date Created: </span>" + objArray[index].dateCreated.substring(0, 10) + "<br>";
              let showDateCreateTargetId = $("#showDateCreated");
              showDateCreateTargetId.html(showDateCreateText);
            }
            else if (checkBoxArray[i] === "description") {
              let showDescriptionText = "<span class=\"coralColor\">Description: </span>" + objArray[index].description + "<br>";
              let showDescriptionTargetId = $("#showDescription");
              showDescriptionTargetId.html(showDescriptionText);
            }
            else if (checkBoxArray[i] === "href") {
              let showHrefText = "<span class=\"coralColor\">Image URL: </span><a href=\"" + objArray[index].href + "\"target=\"_blank\">" + objArray[index].href + "</a>";
              let showHrefTargetId = $("#showHref");
              showHrefTargetId.html(showHrefText);
            }
          }
          let toppingList = $("p#metaDataId");
          let metaDataText;
          if (checkBoxArray.length === 1) {
            metaDataText = "<span class=\"coralColor\">Meta Data </span>element requested was ... <br>";
          }
          else if (checkBoxArray.length > 1) {
            metaDataText = "<span class=\"coralColor\">Meta Data </span>elements requested were ... <br>";
          }
          toppingList.html(metaDataText);
        }
      }
    });
  });
});