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

window.retrieve_all_info();

function retrieve_all_info() {
    var ref = firebase.database().ref("Student");
    var all_users = [];

    // This method returns the information of all users 
    ref.on("value", function (snapshot) {
        var currentEmail = firebase.auth().currentUser.email;
        console.log("Email:  " + currentEmail);
        snapshot.forEach(function (childSnapshot) {
            childData = childSnapshot.val();
            var email = childData.Email;
            var user_address;
            if(email.toString() == currentEmail.toString()) {
                return;
            }
            if(childData.SecondAddress.toString() == "") {
                user_address = childData.FirstAddress + ", " +
                    childData.City + ", " + childData.State + ", " + childData.Zip;
            }
            else {
                user_address = childData.FirstAddress + ", " + childData.SecondAddress + ", " +
                    childData.City + ", " + childData.State + ", " + childData.Zip;
            }
            var user_dict = {
                userKey: childSnapshot.key,
                email: email,
                password: childData.Password,
                user_name: childData.FirstName + " " + childData.LastName,
                address: user_address,
                gender: childData.Gender,
                phoneNum: childData.PhoneNumber,
                distance: 0
            };
            all_users.push(user_dict);
        });
    });
    console.log("Calling All Users:");
    console.log(all_users);
    return all_users;
}
