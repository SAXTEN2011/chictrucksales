/**
 * Created by Aaron on 12/31/2016.
 *
 *
 *
 * DEPENDENCIES:
 * FIREBASE.JS
 * BOUNCER.JS MUST BE CALLED AFTER FIREBASE.JS
 */
firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        var isAdmin = false;
        for(i = 0; i<admins.length;i++){
            if(user.uid === admins[i]){
                console.log("an admin was authenticated");
                console.log(user.uid);
                isAdmin = true;
            }
        }

        if(!isAdmin){
            console.log("a non-admin authenticated and was denied");
            window.location.assign("./denied.html");
        }
    }else{
        console.log("a user visited this page unauthenticated");
        window.location.assign("./auth.html");
    }

});