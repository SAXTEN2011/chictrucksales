/**
 * Created by Aaron on 12/29/2016.
 */
// Initialize Firebase
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
// console.log(database);

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
function writeDb() {
    ref.push(data);
    console.log("Name: " + data.name);
    console.log("Color: " + data.color);
    console.log("Make: " + data.make);
    console.log("Model: " + data.model);
    console.log("Comments: " + data.comments);
    // console.log("Color: " + data.color);
}
// writeDb();

function wipeDB() {
    var conf = confirm("Delete Database?");
    if(conf){
        ref.child().remove();
    }
}


ref.on('value',gotData,errData);

function gotData(data) {
    var cars = data.val();
    var keys = Object.keys(cars);
    $(".deleteDiv").html("");
        for(i = 0; i<keys.length;i++){
            var k = keys[i];
            console.log(cars[k]);
            $(".deleteDiv").append("<p class='" + k  + "' id='delCar'>" + cars[k].name + "</p>");
            $("body").append('<script>$(document).on("click", "#delCar", function (e) {var idNum = this.className; ref.child(idNum).remove(); this.remove()}); ');
        }

}


function errData(err) {
    console.log("Error: " + err);
}

