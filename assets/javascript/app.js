// Initialize Firebase
var config = {
    apiKey: "AIzaSyBX33d6qDIkva7W4S96TH6stZAGKC_ozaQ",
    authDomain: "my-project-5b220.firebaseapp.com",
    databaseURL: "https://my-project-5b220.firebaseio.com",
    projectId: "my-project-5b220",
    storageBucket: "my-project-5b220.appspot.com",
    messagingSenderId: "266583554824"
};
firebase.initializeApp(config);

var database = firebase.database();

// Capture Button Click
function addTrain() {
    event.preventDefault();

    // Grabbing values from input boxes
    var name = $("#name").val().trim();
    var dest = $("#dest").val().trim();
    var first = $("#first").val().trim();
    var freq = $("#freq").val().trim();

    // Code for handling the push
    database.ref().push({
        name: name,
        dest: dest,
        first: first,
        freq: freq,
    });
}

database.ref().on("child_added", function (snapshot) {

    var row = new $('<tr>');

    var tdName = new $('<td>', {
        text: snapshot.val().name
    });

    // variable for input frequency
    var tFreq = snapshot.val().freq;

    // variable for input first train
    var tFirst = snapshot.val().first;

    // (pushed back 1 years)
    var firstTime = moment(tFirst, "HH:mm").subtract(1, "years");

    // Current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference
    var remainder = moment().diff(moment(firstTime), "minutes") % tFreq;
    //console.log("Remainder: " + remainder);

    // Minutes left till arrival
    var minutes = tFreq - remainder;
    //console.log("MINUTES TILL TRAIN: " + minutes);

    // Next train arrival 
    var nextTrain = moment().add(minutes, "minutes").format("HH:mm");
  
    // appending values to table
    row.append($('<td>').text(snapshot.val().name));
    row.append($('<td>').text(snapshot.val().dest));
    row.append($('<td>').text(snapshot.val().freq));
    row.append($('<td>').text(nextTrain));
    row.append($('<td>').text(minutes));
    
    $("#list").append(row);
});

