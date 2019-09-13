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
var currentEmail;

// This method returns the information of a user
ref.on("value", function (snapshot) {
    currentEmail = firebase.auth().currentUser.email;
    snapshot.forEach(function (childSnapshot) {
        childData = childSnapshot.val();
        email = childData.Email;
        password = childData.Password;
        userName = childData.FirstName;
        if(email == currentEmail) {
            userKey = childSnapshot.key;
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
    var days = get_days_to_pool();
    data = {City: city, Email: currentEmail, FirstAddress: firstAddress, FirstName: firstName, Gender: gender,
        LastName: lastName, Password: password, PhoneNumber: phoneNum, SecondAddress: secondAddress,
        State: state, Zip: zip, DaysToPool: days};

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

function get_days_to_pool() {
    var darray = new Array(7);

    if(document.getElementById("monday").checked) {
        darray[0] = document.getElementById("monday").value;
    } else {
        darray[0] = "";
    }

    if(document.getElementById("tuesday").checked) {
        darray[1] = document.getElementById("tuesday").value;
    } else {
        darray[1] = "";
    }

    if(document.getElementById("wednesday").checked) {
        darray[2] = document.getElementById("wednesday").value;
    } else {
        darray[2] = "";
    }

    if(document.getElementById("thursday").checked) {
        darray[3] = document.getElementById("thursday").value;
    } else {
        darray[3] = "";
    }

    if(document.getElementById("friday").checked) {
        darray[4] = document.getElementById("friday").value;
    } else {
        darray[4] = "";
    }

    if(document.getElementById("saturday").checked) {
        darray[5] = document.getElementById("saturday").value;
    } else {
        darray[5] = "";
    }

    if(document.getElementById("sunday").checked) {
        darray[6] = document.getElementById("sunday").value;
    } else {
        darray[6] = "";
    }

    var days = "";
    for(var i = 0; i < 7; i++) {
        if(darray[i] == "") {
            continue;
        }
        days += " " + darray[i];
    }
    return days.substring(1);
}
