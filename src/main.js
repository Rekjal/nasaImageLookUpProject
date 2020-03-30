import { NASAApiCall } from './NASAApiCall.js';
import { AuxFunctions } from './AuxFunctions.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(function () { //function to hide check boxes until right option is selected in Drop-down Menu  
  $('#cBId').hide();
  $('#dDId').change(function () {
    if ($('#dDId').val() == "With Meta Data") {
      $('#cBId').show();
    } else {
      $('#cBId').hide();
    }
  });
});

$("select#dDId").on('change', function () { //function to disable Submit button until right option is selected in Drop-down Menu
  let temp = $("#dDId option:selected").text();
  if (temp === "Select") {
    $("button#submit").attr('disabled', true);
  }
  else {
    $("button#submit").attr('disabled', false);
  }
});

$(document).ready(function () {
  $('#formOne').submit(function () {
    $('#restart').click(function () {  //Reload Page upon clicking "Refresh" button
      document.location.reload(true);
    });
    event.preventDefault();
    let auxFunctions = new AuxFunctions();
    auxFunctions.initialize();
    let userEnteredMetaData = $(".metaData").val();
    let clickedCheckBoxes = [];
    $("input:checkbox[name=metaData]:checked").each(function () { //Identify and store in an array the check boxes that were clicked
      clickedCheckBoxes.push($(this).val());
    });
    $("input[type=checkbox]").each(function () { this.checked = false; }); //to uncheck previously checked checkboxes
    var imgObjArray = [];

    (async () => {
      let nASAApiCall = new NASAApiCall();
      let response = await nASAApiCall.getMedia();
      if (response) {     //good  - if (response)
        imgObjArray = await nASAApiCall.processJSON(response);
        let imgObjCount = imgObjArray.length; // to Demo error handling when API call return no image, comment this line and uncomment below line
        // let imgObjCount = 0;
        auxFunctions.setIndex(0);
        auxFunctions.setImageMediaCount(imgObjCount);
        var index = auxFunctions.getIndex();
        try {
          const objectOfError = nASAApiCall.checkIfApiReturnedNoImage(imgObjCount);
          if (objectOfError instanceof Error) {   // checking if return type is an object o type "Error"
            let errorTextApiNoResult = "<span class=\"blackColor\">Error</span>: API call returned <span class=\"redColor\">" + imgObjCount + "</span> Image Media";
            throw RangeError(errorTextApiNoResult);         // throw a RANGEERROR to move control to CATCH block.");
          }
          else {
            auxFunctions.printMetaData(index, clickedCheckBoxes, userEnteredMetaData, imgObjArray[index]);
            $("#previous").show();
            $("#next").show();
          }
        }
        catch (rangeError) {
          if (rangeError instanceof RangeError) {   //redundant but leave it for conceptual understanding (checking if object rangeError is an object of "RangeError")
            $("#previous").hide();
            $("#next").hide();
            $("#results").empty().append(rangeError.message);
          }
        }
      }
      else if (!response) {
        let errorText = nASAApiCall.getErrorMessage();
        $("#previous").hide();
        $("#next").hide();
        $("#results").empty().append(errorText);
      }
    })(); //End of Asynch opertation

    $('#next').on('click', function () {  //Code to handle clicks on "Previous" & "Next" buttons
      if (auxFunctions.getIndex() === auxFunctions.getImageMediaCount() - 1) { //if CURRENT is 7, NEXT is 0;  
        auxFunctions.setIndex(0);
      }
      else {
        auxFunctions.setIndex(auxFunctions.getIndex() + 1); //current index += 1;
      }
      auxFunctions.printMetaData(auxFunctions.getIndex(), clickedCheckBoxes, userEnteredMetaData, imgObjArray[auxFunctions.getIndex()]);
    });

    $('#previous').on('click', function () {
      if (auxFunctions.getIndex() === 0) {
        auxFunctions.setIndex(auxFunctions.getImageMediaCount() - 1); //if CURRENT is 0, NEXT is imgObjCount - 1;
      }
      else {
        auxFunctions.setIndex(auxFunctions.getIndex() - 1); //current index -= 1;        
      }
      auxFunctions.printMetaData(auxFunctions.getIndex(), clickedCheckBoxes, userEnteredMetaData, imgObjArray[auxFunctions.getIndex()]);
    });

  });
});