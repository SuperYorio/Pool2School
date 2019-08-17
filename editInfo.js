// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCJLG7KqXqm_7OCwUkEfQ5616MhTcFe6c0",
    authDomain: "testbase-1c88a.firebaseapp.com",
    databaseURL: "https://testbase-1c88a.firebaseio.com",
    projectId: "testbase-1c88a",
    storageBucket: "testbase-1c88a.appspot.com",
    messagingSenderId: "633588180358",
    appId: "1:633588180358:web:c7d621542cfc146f"
};

// Check if firebase is already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

var ref = firebase.database().ref("Student");
var email;
var password;
var childData;
var userKey;
var userName;

// This method returns the information of a user
ref.on("value", function (snapshot) {
    var currentEmail = firebase.auth().currentUser.email;
    console.log("Email:  " + currentEmail);
    snapshot.forEach(function (childSnapshot) {
        childData = childSnapshot.val();
        email = childData.Email;
        password = childData.Password;
        userKey = childSnapshot.key;
        userName = childData.FirstName;
        if(email == currentEmail) {
            document.getElementById("editFirstName").value = childData.FirstName;
            document.getElementById("editLastName").value = childData.LastName;
            document.getElementById("editPhoneNum").value = childData.PhoneNumber;
            document.getElementById("editGender").value = childData.Gender;
            document.getElementById("editInputAddress").value = childData.FirstAddress;
            document.getElementById("editInputAddress2").value = childData.SecondAddress;
            document.getElementById("editInputState").value = childData.State;
            document.getElementById("editInputCity").value = childData.City;
            document.getElementById("editInputZip").value = childData.Zip;
        }
    });
});

function printName() {
    document.getElementById("welcomeTitle").innerHTML = userName.toString();
}

document.getElementById("editForm").addEventListener("submit", submitForm);


function submitForm(e) {
    e.preventDefault();
    var firstName = getInputVal('editFirstName');
    var lastName = getInputVal('editLastName');
    var phoneNum = getInputVal('editPhoneNum');
    var gender = getInputVal('editGender');
    var firstAddress = getInputVal('editInputAddress');
    var secondAddress = getInputVal('editInputAddress2');
    var city = getInputVal('editInputCity');
    var state = getInputVal('editInputState');
    var zip = getInputVal('editInputZip');

    data = {City: city, Email: email, FirstAddress: firstAddress, FirstName: firstName, Gender:gender,
        LastName: lastName, Password: password, PhoneNumber: phoneNum, SecondAddress: secondAddress,
        State: state, Zip: zip}

    const fb = firebase.database().ref();
    fb.child("Student/" + userKey).update(data).then(function(){
        window.alert("Profile Updated!");
        window.location.href = "SearchPage.html";
    }).catch(function(error) {
        alert("Data could not be saved." + error);
    });
}

function getInputVal(id) {
    return document.getElementById(id).value;
}