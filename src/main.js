import { Container } from './Container.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'responsive-slides/responsiveslides.min.js';
import 'responsive-slides/responsiveslides.js';

import './styles.css';
// import homeIcon1 from './img/1.jpg';
// import homeIcon2 from './img/2.jpg';
// import homeIcon3 from './img/3.jpg';
// var homeImg1 = document.getElementById('1');
// var homeImg2 = document.getElementById('2');
// var homeImg3 = document.getElementById('3');
// homeImg1.src = homeIcon1;
// homeImg2.src = homeIcon2;
// homeImg3.src = homeIcon3;

// import 'responsive-slides/responsiveslides.css';
// import 'responsive-slides/demo/themes/themes.css';
// import 'responsive-slides/demo/images/1.jpg';
// import 'responsive-slides/demo/images/2.jpg';
// import 'responsive-slides/demo/images/3.jpg';
// import 'responsive-slides/demo/demo.css';
// import 'responsive-slides/demo/themes/themes.gif';



$(document).ready(function () {
  $('#weatherLocation').click(function () {
    let city = $('#location').val();
    $('#location').val("");

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
      let containerArray = [];
      //lifeExpOneDemoAllPlanet = lifeExpectancy[userEnteredDemographic];
      for (var i = 0; i < body.collection.items.length; i++) {
        //console.log(`Iteration is ${i}`);
        if (body.collection.items[i].data[0].media_type === "image") {
          var dateCreated = body.collection.items[i].data[0].date_created;
          var description = body.collection.items[i].data[0].description;
          var nasaId = body.collection.items[i].data[0].nasa_id;
          var title = body.collection.items[i].data[0].title;
          var mediaType = body.collection.items[i].data[0].media_type;
          var href = body.collection.items[i].links[0].href;
          let container = new Container();
          container.setter(dateCreated, description, nasaId, title, mediaType, href)
          // container.setter(dateCreated, description, nasaId, title, mediaType, href);
          containerArray.push(container);
          console.log(`For ${i} I am inside & links is ${href}`);
        }
      }

      var len2 = containerArray.length;
      console.log(`Length is  ${len2}`);
      for (var j = 0; j < 1; j++) {
        console.log(`array element is  ${containerArray[j].href}`)
        //  $('.showHumidity').text(`The href is ${containerArray[0].href}`);
        $('.showHumidity').text(`The href is ${containerArray[0].href}`);
        let htmlContent = `<figure>
      <img src="${containerArray[0].href}" alt="${containerArray[0].description}" class="img-fluid">      
    </figure>`;
        $("#results").append(htmlContent);

        


        //<img src=containerArray[j].href alt="Girl in a jacket" style="width:500px;height:600px;"></img>
      }
      //   $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      //   $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
      // }, function (error) {
      //   $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});