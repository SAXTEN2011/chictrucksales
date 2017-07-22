/**
 * Created by Aaron on 12/29/2016.
 */
// Initialize Firebase
'use strict';
var config = {
    apiKey: "AIzaSyBqY_bejkW_TikSZSBUKuE4JH1EU74xYGI",
    authDomain: "chicktrucksales.firebaseapp.com",
    databaseURL: "https://chicktrucksales.firebaseio.com",
    storageBucket: "chicktrucksales.appspot.com",
    messagingSenderId: "585030817418"
};
var app = firebase.initializeApp(config);

var database = app.database();
var ref = database.ref('inventory/cars');
var msgRef = database.ref('text/motd');
var cars;
// console.log(database);
var keysArray = [];
var data = {
    name: "Chevy Avalanche",
    color: "Black",
    make: "Idontknowwhatamakeis",
    model: "Idontknowwhatamodelis",
    comments: "Runs and drives beautifully, needs a new headliner. Sold to my son.",
    price: "$3000",
    year: "2005",
    miles: "100,000"
};
var motd = {
  message: "Home of reliable rides for low prices"
};
var editCarLink;
function writeDb() {
    ref.push(data);
    console.log("Name: " + data.name);
    console.log("Color: " + data.color);
    console.log("Make: " + data.make);
    console.log("Model: " + data.model);
    console.log("Comments: " + data.comments);
    // console.log("Color: " + data.color);
}
function writeMOTD() {
    msgRef.push(motd);
    console.log('Pushed motd ' + motd.message);
}
// writeDb();




ref.on('value',gotData,errData);

function gotData(data) {
    /*
    Look. I'm gonna be frank with you man
    If your dad has requested another field to be added
    turn back now
    just re-write this whole mess
    the id values are hard coded by the order they appear in the array
    this array is sorted alphabetically
    so unless he asked for a field with a name that begins with a z
    you're super screwed

    sorry.






     */
    cars = data.val();
    var keys = Object.keys(cars);
    $(".deleteDiv").html("");
    for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            console.log(cars[k]);
            $(".deleteDiv").append("<p class='" + k  + "' id='delCar' style='display: inline-block'>" + cars[k].name + "</p><br>");
            $("body").append('<script>$(document).on("click", "#delCar", function (e) {var idNum = this.className; ref.child(idNum).remove(); this.remove()}); ');
        //onclick='editCarLink(" + '"' + k + '"' + ")'
        $(".editDiv").append("<p  class='carToEdit' id='" + k + "'>" + cars[k].name + "</p><br>");
            // $(".editDiv").append('<script>$("# '+ $(this).attr("id") + '").click(function () { clickedEditCar($(this).attr("id")); });</script>');

        $("#" + k).bind("touchstart click", function () {
            editCarLink($(this).attr('id'));
        });
        }

}


function errData(err) {
    console.log("Error: " + err);
}


function _removeAllInputsAndSubmitEditButtons(arrayToUseForLength) {
    for (var k = 0; k <= arrayToUseForLength.length; k++) {
        $("#" + (k+1)*100).remove();
        $(".submitEditsBTN").remove();
    }
}

editCarLink = function (passedId) {
    var editID = passedId;

    var carOBJ = cars[editID];
    var carOBJKeys = Object.keys(carOBJ);
    var carOBJValues = Object.values(carOBJ);
    // alert(ref.child(editID));
    // alert(cars[editID].price);
    for (var i = 0; i < carOBJKeys.length; i++) {
        if (carOBJKeys[i] !== "name") {
            $(".editDiv").css("display", "none");
            $(".second").append('<form action="#" id="' + (i + 1) * 100 + '"> <div class="mdl-textfield mdl-js-textfield"> <input class="mdl-textfield__input" type="text" id="' + i + '" placeholder="' + carOBJKeys[i] + ': ' + carOBJValues[i] + '"> <label class="mdl-textfield__label" for="' + i + '">' + '</label> </div> </form>');
        }

    }

    $(".second").append('<button class="mdl-button mdl-js-button mdl-button--raised button submitEditsBTN"> Submit Edits</button>');
    var editsToSubmit = {};
    $(".submitEditsBTN").click(function () {
        if ($("#0").val() !== "") {
            editsToSubmit.color = $("#0").val();
        }
        if ($("#1").val() !== "") {
            editsToSubmit.comments = $("#1").val();
        }
        if ($("#2").val() !== "") {
            editsToSubmit.make = $("#2").val();
        } else {
            editsToSubmit.make = cars[editID].make;
        }
        if ($("#3").val() !== "") {
            editsToSubmit.miles = $("#3").val();
        }
        if ($("#4").val() !== "") {
            editsToSubmit.model = $("#4").val();
        } else {
            editsToSubmit.model = cars[editID].model;
        }
        if ($("#6").val() !== "") {
            editsToSubmit.price = $("#6").val();
        }
        if ($("#7").val() !== "") {
            editsToSubmit.year = $("#7").val();
        }
        editsToSubmit.name = editsToSubmit.make + " " + editsToSubmit.model;
        _removeAllInputsAndSubmitEditButtons(carOBJKeys);
        ref.child(editID).update(editsToSubmit);

    });
};
