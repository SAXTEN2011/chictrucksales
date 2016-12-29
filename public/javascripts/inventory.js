/**
 * Created by Aaron on 12/29/2016.
 */
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


ref.on('value',gotData,errData);

function gotData(data) {
    var cars = data.val();
    var keys = Object.keys(cars);
    $(".loading").remove();
    for(i = 0; i<keys.length;i++){
        var k = keys[i];
        console.log(cars[k]);
        $(".page-content").append('<div class="demo-card-square mdl-card mdl-shadow--2dp card"> <div class="mdl-card__title mdl-card--expand cardTitle"> <h2 class="mdl-card__title-text">' + cars[k].name + '</h2> </div> <div class="mdl-card__supporting-text">' + cars[k].comments + '<br><br> Color: ' + cars[k].color + '<br> Make:' + cars[k].make + '<br>Model: ' + cars[k].model + '</div>');

    }
}

function errData(err) {
    console.log("Error: " + err);
}

