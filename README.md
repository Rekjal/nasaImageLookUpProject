# NASA Image Project: Asynchronous API

  

#### A web application that will make an API call to NASA (https://api.nasa.gov/), parse the response, and render collected `Images` and `Meta data`. Following are the main features of this application ...

  

- Query `NASA Image and Video Library API` (API URL: `https://images-api.nasa.gov/search?q=apollo%20112...`)

  

- Application returns a notification if API call resulted in an error

  

- Application returns a notification if API call returned no result.

  

- Application correctly parses nested JSON and displays the API call result, which includes `Images`, and `Meta data` pertaining to Images. User can either opt for no `Meta Data` or opt for any combination of following 4 `Meta Data` elements by selecting relevant checkbox (s).

-  `Title`

  

-  `Date Created`

  

-  `Description`

  

-  `Image URL`

  

- API call does not use keys and hence no `.env` file exist

  

- Further, user can navigate through every retrieved image by using `Previous` and `Next` buttons. These two buttons operate in a cyclical manner - meaning if user clicks `Next` when `final` image is in view, the subsequent image rendered would be the very `first` one. Similarly, if user clicks `Previous` when `first` image is in view, the subsequent image rendered would be the `final` one

  

##### Date: **03/27/2020**

  

#### By **Salim Mayan**

  

## Description

  

#### Further Exploration

  

##### Added additional features:

  

- Included a `Refresh` should the user wish to refresh page

  

-  `Submit` button is disabled until user selects a valid option from Drop Down

  

- Clicking Meta Data `Image URL` would open currently displayed image in a new browser tab

  

- Application will not accept empty Input (If chosen option in drop down is `Select`, then `Submit` button would remain disabled)

  

## Specifications:

* Spec 1: The app returns NASA images, one at a time, without Meta Data.

    + Input: Select `Without Meta Data` option from drop down and click `Submit`

    + Output: The app would start by displaying the very first image in the box on the right marked `Image Result`. `Next` and `Previous` buttons get rendered via which user can navigate through rest of the images returned by API call

  

![alt text](https://github.com/Rekjal/asynchAPInASAImageProject/blob/master/img/withOutMetaData.png)

  

* Spec 2: The app returns NASA images, one at a time, with Meta Data.

    + Input: Select `With Meta Data` option from drop down, click on any combination of checkbox (s) (any combination of 4 Meta Data elements - `Title`, `Date Created`, `Description`, and `Image URL`), and click `Submit`

    + Output: The app would start by displaying the very first image in the box on the right marked `Image Result`. `Next` and `Previous` buttons get rendered via which user can navigate through rest of the images returned by API call. Further, Meta Data pertaining to the clicked check box (s) would render in the bottom part of the box on the left marked `View NASA Images`.

  

![alt text](https://github.com/Rekjal/asynchAPInASAImageProject/blob/master/img/withMetaData.png)

  

* Spec 3: **Error-Handling for API call Error:** The app displays an error message if API call resulted in an error

    + Input: Select `With Meta Data` option from drop down, click on any combination of checkbox (s), and click `Submit` (To replicate working of `API call Error` swap valid URL with an invalid one by commenting out `line-52` and uncommenting `line-53` in `main.js`)

    + Output: The app would display an error message containing the `request.status` and `request.statusText` in the box on the right marked `Image Result` (Verbatim error code in this specific case would be `Error Code: 401 (Unauthorized)`)

  

![alt text](https://github.com/Rekjal/asynchAPInASAImageProject/blob/master/img/errorHandlingForApiCallError.png)

  

* Spec 4: **Error-Handling if API query returned no result:** The app displays a notification if API call returned `0` image media

    + Input: Select `With Meta Data` option from drop down, click on any combination of checkbox (s), and click `Submit` (To replicate working of `API query returning no result`, force variable that stores Image Array Count (`imgObjCount`) to a value of `0` - do this by commenting out `line-87` and uncommenting `line-88` in `main.js`)

    + Output: The app would return a notification that states there were no image media image (Verbatim error message: `Error: API call returned 0 Image Media`) in the box on the right marked `Image Result`

  
  

![alt text](https://github.com/Rekjal/asynchAPInASAImageProject/blob/master/img/errorHandlingIfApiQueryReturnedNoResult.png)

  

## Setup/Installation Requirements

  

1. Clone this repository.

  

2. To run program, do `npm install' and "npm run start'

  

## Known Bugs

  

* No known bugs at this time.

  

## Technologies Used

  

* HTML

  

* CSS

  

* JQuery

  

* JS

  

* Bootstrap

  

## Support and contact details

  

_Email no one with any questions, comments, or concerns._

  

### License

  

*{This software is licensed under the MIT license}*

  

Copyright (c) 2020 **_{Salim Mayan}_**