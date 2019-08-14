// const usernameElement = document.getElementById("username");
// const messageElement = document.getElementById("message");
// const button = document.getElementById("submitButton");
// button.addEventListener("click",updateDB);
// const target = document.querySelector(".allMessages");

// //Set database object here
// const db = firebase.firestore();

// /**
//  * Updates the database with the username and message.
//  */
// function updateDB(event){
//     event.preventDefault();
//     const username        = usernameElement.value;
//     const message         = messageElement.value;

//     usernameElement.value = "";
//     messageElement.value  = "";

//     console.log(username + " : " + message);

//     newP = document.createElement("p");
//     newP.innerHTML = `${username}: ${message}`
//     document.querySelector(".allMessages").append(newP)

//     //Update database here
// db.collection("messages").add(
//     {
//         username: username,
//         message: message,
//         //add message time stamp

//         creaated: firebase.firestore.FieldValue.serverTimestamp()
//     }
// ).then(
//     function(docRef){
//         console.log(docRef);

//     }
//     )
//     .catch(
//         function(error){
//             console.error("Error adding document",error);
//         }
//     )

// }

// // Set database "child_added" event listener here


// // get databse collection messages
// db.collection("messages").get().then(
//     function(response){
//         console.log(response);
//         //take the response and iterate through each doc
//         response.forEach(function(doc){
//             console.log(doc.data());

//             const newP = document.createElement('p');
//             newP.innerText += doc.data().username + " : "  + doc.data().message;
//             target.append(newP)
//         })


//     }
// )





// const usernameElement = document.getElementById("username");
// const messageElement = document.getElementById("message");
const storyElement = document.getElementById("story")
//find .allMessages div and set to msgContainer variable
const msgContainer = document.querySelector(".allMessages");
const button = document.getElementById("submitButton");
button.addEventListener("click", updateDB);

//Set database object here

const db = firebase.firestore();
const database = firebase.database();

/**
 * Updates the database with the username and message.
 */
function updateDB(event) {
    event.preventDefault();
    const username = usernameElement.value;
    const message = messageElement.value;
    const story = storyElement.value;

    usernameElement.value = "";
    messageElement.value = "";
    storyElement.value = "";

    console.log(username + " : " + message);

    db.collection("messages").add({
            username: username,
            message: message,
            story: story,

            //add message with time stamp
            created: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function (docRef) {
            //create new p tag
            let newP = document.createElement('p');
            //set innerText to username and message
            newP.innerHTML= `<div class="border"><p class="title">${username} </p> <br> <p class="name">${message} </p> <br> <p class="message">${story}</p></div>`;
            //append p tag to msgContainer variable
            msgContainer.append(newP);

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

}

//refernce the db messages
db.collection('messages')
    //sets order of how responses will be returned 
    .orderBy('created', 'asc')
    .get()
    .then(function(response){
        response.forEach(function(doc){
            let msg = doc.data();
            let newP = document.createElement('p');
            newP.innerText = `${msg.username}: ${msg.message}`;
            msgContainer.append(newP);
        })
    })

