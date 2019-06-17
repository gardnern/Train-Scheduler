$(document).ready(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyCz7Co8y4iVaIT0ft30WPVDtyQOKrskQts",
        authDomain: "trainschedule-5b9e0.firebaseapp.com",
        databaseURL: "https://trainschedule-5b9e0.firebaseio.com",
        projectId: "trainschedule-5b9e0",
        storageBucket: "trainschedule-5b9e0.appspot.com",
        messagingSenderId: "1063156323648",
        appId: "1:1063156323648:web:18bbe32bc6090ace"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

    // A variable to reference the database.
    var database = firebase.database();

    var name;
    var destination;
    var frequency;
    var firstTrain;
    var nextArrival;

    $("#add-train").on("click", function (event) {

        event.preventDefault();
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        frequency = $("#frequency").val().trim();
        firstTrain = $("#first-train").val().trim();

        database.ref().push({
                name: name,
                destination: destination,
                frequency: frequency,
                firstTrain: firstTrain
                // currentTime: currentTime
            }

         );
            console.log(  name,
                destination,
                frequency,
                nextArrival)
                //  firebaseConfig.database.ServerValue.TIMESTAMP)
    });

    // $("#form-group").reset();


    database.ref().on('child_added', function (snapshot) {
        //console.log(snapshot.val());
        var data = snapshot.val();
        console.log("readingFromFirebase", data);

        // Assumptions
        var tFrequency = 30;

        // Time is 3:30 AM
        var firstTime = "03:30";
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        var minutesAway = data.frequency - moment().diff(moment(data.startTime, 'hh:mm'), 'minutes') % data.frequency;
        // Current Time
        var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        //console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        //console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextArrival = moment().add(tMinutesTillTrain, "minutes");
        //console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

        //We need to get the diff between when the first train started and our current moment. we want this in minutes
        //the amount of time that has passed (above calc) since the first train and now
        //modulus the frequency -- WTF -- the remainder after division timeInMinutesFromFIrstTrain % frequency == timeInMinutesFromFIrstTrain / frequency return remainder --This number is the number of minutes isnce last arrival
        //Time until next arrival is equal to NOW plus frequency minus modulus -- this is minutes away

        //Bottom line -- Now + (frequency - modulus) == next arrvial time

        //Add one row with a single child
        $("#addRow").append('<tr><td>' + data.name + '</td><td>' + data.destination + '</td><td>' + data.frequency + '</td><td>' + nextArrival + '</td><td>' + minutesAway + '</td></tr>');

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);

    });


    // database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added").set(snapshot, function (data) {
    //     // Change the HTML to reflect
    //     $("#train-name").html(data.val().name);
    //     $("#destination").html(data.val().destination);
    //     $("#frequency").html(data.val().frequency);


    // });
    // database.ref().push();
});