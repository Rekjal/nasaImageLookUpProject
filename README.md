# NASA Image Project: Asynchronous API

#### A web application that will make an API call to NASA (https://api.nasa.gov/), parse the response, and render collected `Images` and `Meta data`. Following are the main features of this application ...

-  Query NASA API (API URL: `https://images-api.nasa.gov/search?q=apollo%2011...`)

-  Application returns a notification if API call resulted in an error

-  Application returns a notification if API call returned no result.

-  Application correctly parses nested JSON and displays the API call result, which includes `Images`, and `Meta data` pertaining to Images. User can either opt for no `Meta Data` or opt for any combination of following 4 `Meta Data` elements by selecting relevant checkbox (s). 
	-  `Title`

	-  `Date Created`

	-  `Description`

	-  `Image URL`

- API call does not use keys and hence no `.env` file exist

	
-  Further, user can navigate through every retrieved image by using `Previous` and `Next` buttons. These two buttons operate in a cyclical manner - meaning if user clicks `Next` when `final` image is in view, the subsequent image rendered would be the very `first` one. Similarly, if  user clicks `Previous` when `first` image is in view, the subsequent image rendered would be the `final` one

##### Date: **03/27/2020**

#### By **Salim Mayan**

## Description

#### Further Exploration

##### Added additional features:

-  Included a `Refresh` should the user wish to refresh page

-  `Submit` button is disabled until user selects a valid option from Drop Down

- Clicking Meta Data `Image URL` would open currently displayed image in a new browser tab

_**Example:**_ If user selects `Without Meta Data` option from drop down and clicks `Submit`, the program would display first image in the box on the right marked `Image Result`. Further, the `Previous` and `Next` buttons appear which allows user to navigate through the complete set of images. Once `final` image is reached, clicking `Next` would render the very `first` image

_**Example:**_ If user selects `With Meta Data` option from drop down, selects any combination of 4 Meta Data elements (`Title`, `Date Created`, `Description`, and `Image URL`), and click `Submit`, the program would display first image in the box on the right marked `Image Result`. Further, Meta Data pertaining to the clicked check boxes would render in the bottom part of the box on the left marked `View NASA Images`. Also the `Previous` and `Next` button appear which helps user navigate through the complete set of images. Once `final` image is reached, clicking `Next` would in render the very `first` image.

### Specs

| Spec | Input | Output |

| :------------- | :------------- | :------------- |

| **Homepage** | User accesses localhost:8080 | Homepage with user input form |

| ** Program will not accept empty Input (If chosen option in drop down is `Select` then `Submit` button would remain disabled**|

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
