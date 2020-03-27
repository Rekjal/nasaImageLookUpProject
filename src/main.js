import { Container } from './Container.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'responsive-slides/responsiveslides.min.js';
import 'responsive-slides/responsiveslides.js';

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

$("select#dDId").on('change',function(){
  console.log(`Inside drop down disable loop`);
  let temp = $("#dDId option:selected").text();
  console.log(`salim option value is ${temp}`);  
  if(temp ==="Select") {
      $("button#submit").attr('disabled',true);
      console.log(`Inside drop down disable loop - inside IF`);
  }
  else {
      $("button#submit").attr('disabled',false);
      console.log(`Inside drop down disable loop - inside ELSE`);
  }
});

$(document).ready(function () {
  var buttonObj = document.querySelector("button");
  $('#restart').click(function () {
    $('.accordion-item').hide();
    $(this).siblings("div").show();
    document.location.reload(true);       //Reload Page
    buttonObj.textContent = "submit";
  });
  $('#formOne').submit(function () {
    $('#results').empty();
    event.preventDefault();
    $("#toppingsDiv").hide();
    $("#metaData").hide();
    $("#previous").show();
    $("#next").show();
    let userEnteredMetaData = $(".metaData").val();
    //   $('input[type="number"], textarea').val('');  // to clear form of entered value after submit
    var metaDataSelection = [];

    $("input:checkbox[name=metaData]:checked").each(function () {
      metaDataSelection.push($(this).val());
    });
    $("input[type=checkbox]").each(function () { this.checked = false; }); //to uncheck previously checked checkboxes

    console.log(`Main: metaDataSelection is ${metaDataSelection}`);

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
      var len = body.collection.items.length;
      console.log(`Length is  ${len}`);
      var hrefArr = [];
      let objArray = [];
      for (var i = 0; i < body.collection.items.length; i++) {
        //console.log(`Iteration is ${i}`);
        if (body.collection.items[i].data[0].media_type === "image") {
          var title = body.collection.items[i].data[0].title;
          var dateCreated = body.collection.items[i].data[0].date_created;
          var description = body.collection.items[i].data[0].description;
          var nasaId = body.collection.items[i].data[0].nasa_id;
          var href = body.collection.items[i].links[0].href;
          var mediaType = body.collection.items[i].data[0].media_type;
          let container = new Container();
          container.setter(dateCreated, description, nasaId, title, mediaType, href);
          // container.setter(dateCreated, description, nasaId, title, mediaType, href);
          objArray.push(container);
          //console.log(`For ${i} I am inside & links is ${href}`);
        }
      }

      var len2 = objArray.length;
      var index = 0;

      //let nasaContainer = new Container();
      printMetaData(index, metaDataSelection, objArray[index]);
      //console.log(`temp value is ${temp}, index is ${index}, metaDataSelection is ${metaDataSelection}, object array index is ${objArray[index]}`);
     
      // let htmlContent = `<figure><img src="${objArray[index].href}" alt="${objArray[index].description}" class="img-fluid"></figure>`;
      // $("#results").empty().append(htmlContent);
      // // $('.showTitle').empty().text(<span class="coralColor"> +"Title:" +</span> + objArray[index].title);
      // $('.showTitle').empty().text(`Title: ${objArray[index].title}`);
      // $('.showDateCreated').empty().text(`Date Created: ${objArray[index].dateCreated}`);
      // $('.showDescription').empty().text(`Description: ${objArray[index].description}`);
      // $('.showHref').empty().text(`Image URL: ${objArray[index].href}`);


      $('#next').on('click', function () {
        index += 1;
        if (index === len2 - 1) {
          index = 0;
        }
        printMetaData(index, metaDataSelection, objArray[index]);
        console.log(`inside next k is ${index}`);

      });

      $('#previous').on('click', function () {
        index -= 1;
        if (index === -1) {
          index = len2 - 1;
        }
        printMetaData(index, metaDataSelection, objArray[index]);
        console.log(`inside previous k is ${index}`);
      });


      function printMetaData(index, checkBoxArray, objArrayElement) {
        console.log(`inside createOuputContent: index is ${index} , checkBoxArray is ${checkBoxArray}, objArrayElement is ${objArrayElement}`);
        $('.showTitle').empty();
        $('.showDateCreated').empty();
        $('.showDescription').empty();
        $('.showHref').empty();
        
        let htmlContent = `<figure><img src="${objArray[index].href}" alt="${objArray[index].description}" class="img-fluid"></figure>`;
        $("#results").empty().append(htmlContent);
        if (checkBoxArray.length != 0) {
            for (let i = 0; i < checkBoxArray.length; i++) {
                if (checkBoxArray[i] === "title") {
                  $('.showTitle').empty().text(`Title: ${objArray[index].title}`);                  
                }
                else if (checkBoxArray[i] === "dateCreated") {
                  $('.showDateCreated').empty().text(`Date Created: ${objArray[index].dateCreated}`);
                }
                else if (checkBoxArray[i] === "description") {
                  $('.showDescription').empty().text(`Description: ${objArray[index].description}`);
                }
                else if (checkBoxArray[i] === "href") {
                  $('.showHref').empty().text(`Image URL: ${objArray[index].href}`);
                }
            }            
        }
       
        let metaDataList = "";
        var toppingList = $("ol#metaData2");
        checkBoxArray.forEach(function (box) {
          metaDataList += "<li><span class=\"coralColor\">" + box + "</span></li>";
        });
        console.log(`metaDataList is ${metaDataList}`);
       toppingList.html(metaDataList);
       let tempmetaDataList = "SOMETHING";
     //  $("ol#metaData2").html("Hello <b>world</b>!");
      // $('ol#metaData').html(checkBoxArray[0]);


    


      //   console.log(`metaDataList is ${metaDataList}`);
      //  // $("#metaData").show(metaDataList);
      //  $('.metaData').empty().text(`WHAT YOU REQUESTED`);
      // // $("#metaData").show(metaDataList);
      

    


      }


  

      //<img src=objArray[j].href alt="Girl in a jacket" style="width:500px;height:600px;"></img>

      //   $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      //   $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
      // }, function (error) {
      //   $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});