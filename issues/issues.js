/**
 * Created by Aaron on 12/31/2016.
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
var ref = database.ref('issues/avalanche');

var data = {
  issue: ""
};
function pushIssue() {
    ref.push(data);
    console.log("Pushed issue: " + data.issue);
}

ref.on('value', gotIssue, gotError);

function gotIssue(iss){
var data = iss.val();
var keys = Object.keys(data);

for(x=0;x<keys.length;x++){
    console.log(data[keys[x]].issue);
    $(".currentIssues").append("<h2 class='issue' id='" + keys[x] + "'>" + data[keys[x]].issue + "</h2>");
    $(".currentIssues").append('<script>$(".issue").click(function () { var idNum = $(this).attr("id"); $(this).remove(); ref.child(idNum).remove();  })</script>');
}
}

function gotError(err) {
    console.log("Error!");
    console.log(err);
}