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

var users_array = [];
let p = retrieve_all_info();
p.then(function (result) {
    users_array = result;
    // console.log("Calling All Users: ");
    console.log(users_array);
    /**
     * TODO: THE rest of the code has to go here.
     */


    // Calculate distance between current user to the rest of the users
    var current_user = users_array[0];
    let count = 0;
    users_array.shift();
    users_array.forEach((user) => {
        var p = dist(current_user.address, user.address);
        p.then(function(result) {
            var distance = result / 1609.344;
            distance = distance.toFixed(1);
            user.distance = parseFloat(distance);
            count ++;
            if (count === users_array.length){
                users_array = users_array.sort(function(a, b) {
                    return a.distance - b.distance;
                });
                console.log("User Array:");
                console.log(users_array);
                var tbody = document.getElementById('tbody');

                for (var i = 0; i < users_array.length; i++) {
                    var tr = "<tr>";
                    /* Must not forget the $ sign */
                    tr += "<td>" + users_array[i].user_name + "</td>" + "<td>" + users_array[i].distance + "</td>" + "<td>" + users_array[i].phoneNum + "</td>" + "<td>" + users_array[i].gender + "</td>" + "<td>" + users_array[i].days_to_pool + "</td></tr>";
                    /* We add the table row to the table body */
                    tbody.innerHTML += tr;
                }
            }

        });
    });
}).catch(function () {
    console.log("no user fetched, check connection or database");
});


// The method that returns all users in an array of objects
// array[0] is the original user
// For example, we have users [A, B, C, D, ..., X, Y, Z]
// And user-M logged in, so the ideal output array would be
// [M, A, B, C, D, ... (skips M), X, Y, Z]
function retrieve_all_info() {
    return new Promise(function (resolve, reject) {
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
                // Basic address formatting
                if (childData.SecondAddress.toString() == "") {
                    user_address = childData.FirstAddress + ", " +
                        childData.City + ", " + childData.State + ", " + childData.Zip;
                } else {
                    user_address = childData.FirstAddress + ", " + childData.SecondAddress + ", " +
                        childData.City + ", " + childData.State + ", " + childData.Zip;
                }
                if (email.toString() == currentEmail.toString()) {
                    // The orig_dict is basically just the Student object
                    var orig_dict = {
                        distance: 0,
                        userKey: childSnapshot.key,
                        email: email,
                        password: childData.Password,
                        user_name: childData.FirstName + " " + childData.LastName,
                        address: user_address,
                        gender: childData.Gender,
                        phoneNum: childData.PhoneNumber,
                        days_to_pool: childData.DaysToPool
                    };
                    // This pushes the user we are searching with to the head of the array (hence orig)
                    all_users.unshift(orig_dict);
                    included_self = true;
                    return;
                }
                // Other users
                var user_dict = {
                    distance: 0,
                    userKey: childSnapshot.key,
                    email: email,
                    password: childData.Password,
                    user_name: childData.FirstName + " " + childData.LastName,
                    address: user_address,
                    gender: childData.Gender,
                    phoneNum: childData.PhoneNumber,
                    days_to_pool: childData.DaysToPool
                };
                // This adds all other users into the array (end)
                all_users.push(user_dict);

            });
            if (all_users.length !== 0) {
                resolve(all_users);
            } else {
                reject();
            }

        });
    });
}

function dist(orig, dest) {
    return new Promise(function (resolve, reject) {
        var directionsService = new google.maps.DirectionsService();
        var request = {
            origin: orig,
            destination: dest,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request,
            function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    resolve(response.routes[0].legs[0].distance.value); // returns "undefined"
                } else {
                    reject(status);
                }
            });
    });
}
