$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyDbcbTvXvgLBuKYsSbmKPDPWz5MIihNJB8",
        authDomain: "train-schedule-e2e23.firebaseapp.com",
        databaseURL: "https://train-schedule-e2e23.firebaseio.com",
        storageBucket: "train-schedule-e2e23.appspot.com",
      };

      firebase.initializeApp(config);

      var database = firebase.database();

//submit button
      $("#train-btn").on("click", function(event){
          event.preventDefault();

//user input to variables
        var trainName= $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();

//convert user input
        var firstTime = moment($("#time-input").val().trim(), "hh:mm").subtract(1, "years").format("X");
        var frequency = $("#frequency-input").val().trim();

//current time
        var time = moment();
        console.log("CURRENT TIME: " + moment(time).format("hh:mm"));


        //console.log(name-input);
        //console.log(destination-input);
        //console.log(time-input);
        //console.log(frequency-input);
        //console.log(time;

//new train information
        var newTrain = {
            train : trainName,
            trainGoing: destination,
            trainComing: firstTime,
            randomMin: frequency
        };

//upload to firebase
    database.ref().push(newTrain);

//clears text boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

//create firebase event to add train
database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val());

// store in variable 
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().trainGoing;
    var firstTime = childSnapshot.val().trainComing;
    var frequency = childSnapshot.val().randomMin;


//difference between times 
    var trainTime = moment.unix(firstTime).format("hh:mm");
    var difference = moment().diff(moment(trainTime),"minutes");
    var trainLeft = difference % frequency;

//minutes until arrival
var minArrival = frequency - trainLeft;

//minutes next arrival 
    var futureArrival = moment().add(minArrival, "miniutes").format('hh:mm');

//adding inforamation to the table 

// Create the new row
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(futureArrival),
    $("<td>").text(minArrival),
    
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
});




    



		




    
   






 