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
var hovered = false;
var carOBJValues = [];
var carOBJ;
var carOBJKeys;
editCarLink = function (passedId) {
    var editID = passedId;

    carOBJ = cars[editID];
    carOBJKeys = Object.keys(carOBJ);
    for (var ki = 0; ki < carOBJKeys.length; ki++) {
        carOBJValues.push(carOBJ[carOBJKeys[ki]]);
    }
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
        hovered = false;
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

    /**
     * jQuery.browser.mobile (http://detectmobilebrowser.com/)
     *
     * jQuery.browser.mobile will be true if the browser is a mobile device
     *
     **/
    (function (a) {
        (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
    })(navigator.userAgent || navigator.vendor || window.opera);
    if (window.innerHeight === 768 || window.innerHeight === 960) {
        jQuery.browser.mobile = true;
    }
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
            // alert("clicked thingy");
            try {
                editCarLink($(this).attr('id'));
            } catch (e) {
                alert(e);
            }

        });

        // $("#" + k).hover(function () {
        //     // alert("hovered");
        //     if (jQuery.browser.mobile && !hovered) {
        //         // alert("is mobile and not hovered")
        //         hovered = true;
        //         editCarLink($(this).attr('id'));
        //     }
        // });
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

