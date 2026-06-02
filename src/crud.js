const fs = require('fs');
const path = require('path');

// Get elements
var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnDelete = document.getElementById('btnDelete');
var btnUpdate = document.getElementById('btnUpdate');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');
var output = document.getElementById('output'); // Added to display the output

// Define path to store files
let pathName = path.join(__dirname, 'Files');

// Ensure the directory exists
if (!fs.existsSync(pathName)) {
    fs.mkdirSync(pathName);
}

// // Create file
// btnCreate.addEventListener('click', function() {
//     let file = path.join(pathName, fileName.value);
//     let contents = fileContents.value;

//     fs.writeFile(file, contents, function(err) {
//         if (err) {
//             output.textContent = "Error creating file: " + err;
//             return console.log(err);
//         }
//         output.textContent = `Your Grocery Category: "${fileName.value}" was created with content:\n${contents}`;
//         console.log("The file was created");
//     });
// });

// Create file
btnCreate.addEventListener('click', function() {
    let category = fileName.value.trim(); // Get the grocery category
    let contents = fileContents.value.trim(); // Get the contents of the grocery list

    // Split the contents by newlines to create a numbered list
    let items = contents.split('\n').filter(item => item.trim() !== ''); // Split by newline and filter out empty lines

    // Format the output
    let formattedList = items.map((item, index) => `${index + 1}. ${item}`).join('\n'); // Numbered list

    // Prepare the final output text
    let outputText = `Your Grocery Category: "${category}"\nYour Grocery List:\n${formattedList}`;

    // Specify the file path
    let file = path.join(pathName, category);

    // Create the file with the formatted contents
    fs.writeFile(file, contents, function(err) {
        if (err) {
            output.textContent = "Error creating file: " + err;
            return console.log(err);
        }
        output.textContent = outputText; // Display the formatted output
        console.log("The file was created");
    });
});


// Read file ni real punye 
btnRead.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);

    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            output.textContent = "Error reading file: " + err;
            return console.log(err);
        }
        //split
        let items = data.split('\n').filter (item => item.trim() !== '')

        //format output
        let formattedList = items.map ((item, index) => `${index + 1}. ${item}`).join('\n'); // Numbered list)


        fileContents.value = data;
        output.textContent = `Your Grocery Category:"${fileName.value}"\nYour Grocery List:\n${formattedList}`;
        console.log("The file was read!");
    });
});

// // Read file ni tipu2 sebab tak jadi lol
// btnRead.addEventListener('click', function() {
//     let file = path.join(pathName, fileName.value);

//     fs.readFile(file, 'utf8', function(err, data) {
//         if (err) {
//             output.textContent = "Error reading file: " + err;
//             return console.log(err);
//         }

//         // Split the contents by newlines to create a numbered list
//         let items = data.split('\n').filter(item => item.trim() !== ''); // Split by newline and filter out empty lines

//         // Format the output
//         let formattedList = items.map((item, index) => `${index + 1}. ${item}`).join('\n'); // Numbered list

//         // Prepare the final output text
//         output.textContent = `Your Grocery Category: "${fileName.value}"\nYour Grocery List:\n${formattedList}`;
//         console.log("The file was read!");
//     });
// });



// // Update file
// btnUpdate.addEventListener('click', function() {
//     let file = path.join(pathName, fileName.value);
//     let contents = fileContents.value;

//     fs.writeFile(file, contents, function(err) {
//         if (err) {
//             output.textContent = "Error updating file: " + err;
//             return console.log(err);
//         }
//         output.textContent = `Your Grocery Item:"${fileName.value}" was updated with content:\n${contents}`;
//         console.log("The file was updated");
//     });
// });


// Update file
btnUpdate.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value.trim(); // Get the contents and trim whitespace

    // Split the contents by newlines to create a numbered list
    let items = contents.split('\n').filter(item => item.trim() !== ''); // Split by newline and filter out empty lines

    // Format the output
    let formattedList = items.map((item, index) => `${index + 1}. ${item}`).join('\n'); // Numbered list

    // Create or update the file with the formatted contents
    fs.writeFile(file, contents, function(err) {
        if (err) {
            output.textContent = "Error updating file: " + err;
            return console.log(err);
        }
        // Prepare the final output text
        output.textContent = `Your Grocery Category: "${fileName.value}" :\nYour Grocery List:\n${formattedList}`;
        console.log("The file was updated");
    });
});


// // Delete file
// btnDelete.addEventListener('click', function() {
//     let file = path.join(pathName, fileName.value);

//     fs.unlink(file, function(err) {
//         if (err) {
//             output.textContent = "Error deleting file: " + err;
//             return console.log(err);
//         }
//         fileName.value = "";
//         fileContents.value = "";
//         output.textContent = `File "${fileName.value}" was deleted`;
//         console.log("The file was deleted!");
//     });
// });

// Delete file
btnDelete.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);

    fs.unlink(file, function(err) {
        if (err) {
            output.textContent = "Error deleting file: " + err;
            return console.log(err);
        }
        
        // Clear the input fields
        fileName.value = "";
        fileContents.value = "";

        // Set the output message
        output.textContent = `File "${fileName.value}" was deleted`;
        
        // Alert message for successful deletion
        alert(`Successfully deleted your grocery list. `);

        console.log("The file was deleted!");
    });
});

