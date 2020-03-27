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


// $(function () {
//   $("select#dDId").on('change', function () {
//     console.log(`Inside drop down disable loop`);
//     if ($(this).find('option:selected').text() == "Select") {
//       console.log(`Inside drop down disable loop - inside IF`);
//       $("button#submit").attr('disabled', true);
//       bt.disabled = true;  
//   }
//     else {
//       $("button#submit").attr('disabled', false);
//     }
//   });
// });  


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
    // var buttonObj = document.querySelector("button");
    // buttonObj.textContent = "submitted";
    event.preventDefault();
    $("#toppingsDiv").hide();
    $("#previous").show();
    $("#next").show();
    let userEnteredMetaData = $(".metaData").val();
    //   $('input[type="number"], textarea').val('');  // to clear form of entered value after submit
    let metaDataSelection = [];

    $("input:checkbox[name=metaData]:checked").each(function () {
      metaDataSelection.push($(this).val());
    });
    $("input[type=checkbox]").each(function () { this.checked = false; }); //to uncheck previously checked checkboxes

    console.log(`metaDataSelection is ${metaDataSelection}`);

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
      // console.log(`Length is  ${len}`);
      var hrefArr = [];
      let containerArray = [];
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
          container.setter(dateCreated, description, nasaId, title, mediaType, href)
          // container.setter(dateCreated, description, nasaId, title, mediaType, href);
          containerArray.push(container);
          //console.log(`For ${i} I am inside & links is ${href}`);
        }
      }

      var len2 = containerArray.length;
      var k = 0;

      let htmlContent = `<figure><img src="${containerArray[k].href}" alt="${containerArray[k].description}" class="img-fluid"></figure>`;
      $("#results").empty().append(htmlContent);
      // $('.showTitle').empty().text(<span class="coralColor"> +"Title:" +</span> + containerArray[k].title);
      $('.showTitle').empty().text(`Title: ${containerArray[k].title}`);
      $('.showDateCreated').empty().text(`Date Created: ${containerArray[k].dateCreated}`);
      $('.showDescription').empty().text(`Description: ${containerArray[k].description}`);
      $('.showHref').empty().text(`Image URL: ${containerArray[k].href}`);


      $('#next').on('click', function () {
        k += 1;
        if (k === len2 - 1) {
          k = 0;
        }
        console.log(`inside next k is ${k}`);
        let htmlContent = `<figure><img src="${containerArray[k].href}" alt="${containerArray[k].description}" class="img-fluid"></figure>`;
        $("#results").empty().append(htmlContent);
        $('.showTitle').empty().text(`Title: ${containerArray[k].title}`);
        $('.showDateCreated').empty().text(`Date Created: ${containerArray[k].dateCreated}`);
        $('.showDescription').empty().text(`Description: ${containerArray[k].description}`);
        $('.showHref').empty().text(`Image URL: ${containerArray[k].href}`);
      });

      $('#previous').on('click', function () {
        k -= 1;
        if (k === -1) {
          k = len2 - 1;
        }
        console.log(`inside previous k is ${k}`);
        let htmlContent = `<figure><img src="${containerArray[k].href}" alt="${containerArray[k].description}" class="img-fluid"></figure>`;
        $("#results").empty().append(htmlContent);

        $('.showTitle').empty().text(`Title: ${containerArray[k].title}`);
        $('.showDateCreated').empty().text(`Date Created: ${containerArray[k].dateCreated}`);
        $('.showDescription').empty().text(`Description: ${containerArray[k].description}`);
        $('.showHref').empty().text(`Image URL: ${containerArray[k].href}`);
      });





      //<img src=containerArray[j].href alt="Girl in a jacket" style="width:500px;height:600px;"></img>

      //   $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      //   $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
      // }, function (error) {
      //   $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});