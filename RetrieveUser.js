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

var users_array = retrieve_all_info();
console.log("Calling All Users: ");
console.log(users_array);

// The method that returns all users in an array of objects
// array[0] is the original user
// For example, we have users [A, B, C, D, ..., X, Y, Z]
// And user-M logged in, so the ideal output array would be
// [M, A, B, C, D, ... (skips M), X, Y, Z]
function retrieve_all_info() {
    var ref = firebase.database().ref("Student");
    // The array we want full of users, or Students, so to speak.
    var all_users = [];
    // This method returns the information of a user
    ref.on("value", function (snapshot) {
        var currentEmail = firebase.auth().currentUser.email;
        console.log("Email:  " + currentEmail);
        // Snapshot used to retrieve information
        snapshot.forEach(function (childSnapshot) {
            childData = childSnapshot.val();
            var email = childData.Email;
            var user_address;
            if(email.toString() == currentEmail.toString()) {
                // The orig_dict is basically just the Student object
                var orig_dict = {
                    userKey: childSnapshot.key,
                    email: email,
                    password: childData.Password,
                    user_name: childData.FirstName + " " + childData.LastName,
                    address: user_address,
                    gender: childData.Gender,
                    phoneNum: childData.PhoneNumber,
                    distance: 0
                };
                // This pushes the user we are searching with to the head of the array (hence orig)
                all_users.unshift(orig_dict);
                included_self = true;
                return;
            }
            // Basic address formatting
            if(childData.SecondAddress.toString() == "") {
                user_address = childData.FirstAddress + ", " +
                    childData.City + ", " + childData.State + ", " + childData.Zip;
            }
            else {
                user_address = childData.FirstAddress + ", " + childData.SecondAddress + ", " +
                    childData.City + ", " + childData.State + ", " + childData.Zip;
            }
            // Other users
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
            // This adds all other users into the array (end)
            all_users.push(user_dict);
        });
    });
    // Return the user array
    return all_users;
}
