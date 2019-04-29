$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyCSb1arJyDoJ9Q8_h1Zj-EViSsfvztOvhM",
        authDomain: "train-scheduler-bfcdf.firebaseapp.com",
        databaseURL: "https://train-scheduler-bfcdf.firebaseio.com",
        projectId: "train-scheduler-bfcdf",
        storageBucket: "train-scheduler-bfcdf.appspot.com",
        messagingSenderId: "825673215796"
      };
    firebase.initializeApp(config);

    // A variable to reference the database.
    var database = firebase.database();

    var name;
    var destination;
    var frequency;
    // var firstTrain;
    var nextArrival;

    // database.ref().push({name:'hello train', destination:'somePlace Else', frequency:60, startTime:'8:00'}).then(function(res){
    //     console.log(res);
    // }).catch(function(err){console.log(err)});
  $("#add-train").on("click", function(){
event.preventDefault();
name = $("#train-name").val().trim();
destination = $("#destination").val().trim();
frequency = $("#frequency").val().trim();
firstTrain = $("#first-train").val().trim();

var currentTime = moment();
// var timeStampRef = database().ref('Timestamp').child(currentTime).set({
//     currentTime: true
// })
// console.log(timeStampRef);
console.log(currentTime);


var addedTrain = {
    name: name,
    destination: destination,
    frequency: frequency,
    firstTrain: nextArrival,
    timeDataAdded: database().ref()
}; 
addedTrain.database.ref().push();
console.log(addedTrain);

database().ref().push({
    name: name,
    destination: destination,
    frequency: frequency,
    firstTrain: nextArrival,
    timeDataAdded: database()

});



}); 

// $("#form-group").reset();
   
   
    database.ref().on('child_added', function(snapshot){
        console.log(snapshot.val());
        var data = snapshot.val();
        console.log(data);

            // Assumptions
        var tFrequency = 30;

        // Time is 3:30 AM
        var firstTime = "03:30";
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        // var minutesAway = data.frequency - moment().diff(moment(data.startTime, 'hh:mm'), 'minutes') % data.frequency;
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextArrival = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        //We need to get the diff between when the first train started and our current moment. we want this in minutes
        //the amount of time that has passed (above calc) since the first train and now
        //modulus the frequency -- WTF -- the remainder after division timeInMinutesFromFIrstTrain % frequency == timeInMinutesFromFIrstTrain / frequency return remainder --This number is the number of minutes isnce last arrival
        //Time until next arrival is equal to NOW plus frequency minus modulus -- this is minutes away

        //Bottom line -- Now + (frequency - modulus) == next arrvial time

        //Add one row with a single child
        $("#addRow").append('<tr><td>' + data.name + '</td><td>' + data.destination + '</td><td>' + data.frequency + '</td><td>' + nextArrival + '</td><td>' + minutesAway + '</td></tr>');

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    
    });

    
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function() {
        // Change the HTML to reflect
        $("#train-name").html(data.val().name);
        $("#destination").html(data.val().destination);
        $("#frequency").html(data.val().frequency);
        
      
    });database.ref().push();
});




    

