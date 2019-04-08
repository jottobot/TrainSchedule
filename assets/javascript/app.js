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

// Initial Values
var name = "";
var dest = "";
var first = "";
var freq = "";

// Capture Button Click
function addTrain() {
    event.preventDefault();

    // Grabbing values from text boxes
    name = $("#name").val().trim();
    dest = $("#dest").val().trim();
    first = $("#first").val().trim();
    freq = $("#freq").val().trim();
    console.log(name, dest, first, freq);

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

    // Assumptions
    var freq = 3;

    // Time is 3:30 AM
    var first = "03:30";

    // (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(first, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // get current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // diff between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var remainder = diffTime % freq;
    console.log(remainder);

    // minutes
    var minutes = freq - remainder;
    console.log("MINUTES TILL TRAIN: " + minutes);

    // Next Train
    var nextTrain = moment().add(minutes, "minutes").format("hh:mm A");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    row.append($('<td>').text(snapshot.val().name));
    row.append($('<td>').text(snapshot.val().dest));
    row.append($('<td>').text(snapshot.val().freq));
    row.append($('<td>').text(nextTrain));
    row.append($('<td>').text(minutes));

    $('#list').append(row);
});

