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

    // Grabbed values from text boxes
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

database.ref().on("child_added", function (childSnapshot) {

    var row = new $('<tr>');

    var tdName = new $('<td>', {
        text: childSnapshot.val().name
    })

    //var stDate = childSnapshot.val().startDate;
    //var monthRate = childSnapshot.val().monthlyRate;

    //var months = moment().diff(moment(stDate, "MM/DD/YYYY"), "months");
    //console.log(stDate, months);

    row.append($('<td>').text(childSnapshot.val().name));
    row.append($('<td>').text(childSnapshot.val().dest));
    row.append($('<td>').text(childSnapshot.val().freq));
    //row.append($('<td>').text(childSnapshot.val().dest));

    
    $('#list').append(row);
});