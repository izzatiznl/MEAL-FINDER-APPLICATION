const fs = require('fs');
const path = require('path');

// Get elements
var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnUpdate = document.getElementById('btnUpdate');
var btnDelete = document.getElementById('btnDelete');
var daySelect = document.getElementById('daySelect');
var breakfastInput = document.getElementById('breakfastInput');
var lunchInput = document.getElementById('lunchInput');
var dinnerInput = document.getElementById('dinnerInput');

// Define path to store files
let pathName = path.join(__dirname, 'MealPlans');

// Ensure the directory exists
if (!fs.existsSync(pathName)) {
    fs.mkdirSync(pathName);
}

// Helper function to get the file path for each day
function getFilePath(day) {
    return path.join(pathName, `${day}.txt`);
}

// // Create file for a day
// btnCreate.addEventListener('click', function() {
//     let day = daySelect.value;
//     let file = getFilePath(day);
//     let contents = `Breakfast: ${breakfastInput.value}\nLunch: ${lunchInput.value}\nDinner: ${dinnerInput.value}`;

//     fs.writeFile(file, contents, function(err) {
//         if (err) {
//             return console.log(err);
//         }
//         alert(`${day} meal plan was created`);
//         console.log("The file was created");
//     });
// });

// Create file for a day
btnCreate.addEventListener('click', function() {
    let day = daySelect.value;
    let file = getFilePath(day);
    let contents = `Breakfast: ${breakfastInput.value}\nLunch: ${lunchInput.value}\nDinner: ${dinnerInput.value}`;

    // Write to file
    fs.writeFile(file, contents, function(err) {
        if (err) {
            return console.log(err);
        }
        alert(`${day} meal plan was created`);
        console.log("The file was created");

        // Display the output in #output element
        const outputElement = document.getElementById('output');
        outputElement.innerHTML = `
            <h3>${day} Meal Plan</h3>
            <p>Breakfast: ${breakfastInput.value}</p>
            <p>Lunch: ${lunchInput.value}</p>
            <p>Dinner: ${dinnerInput.value}</p>
        `;
    });
});


// // Read file for a day
// btnRead.addEventListener('click', function() {
//     let day = daySelect.value;
//     let file = getFilePath(day);

//     fs.readFile(file, 'utf8', function(err, data) {
//         if (err) {
//             return console.log(`Error reading ${day} plan:`, err);
//         }
        
//         let [breakfast, lunch, dinner] = data.split('\n');
//         breakfastInput.value = breakfast.replace('Breakfast: ', '');
//         lunchInput.value = lunch.replace('Lunch: ', '');
//         dinnerInput.value = dinner.replace('Dinner: ', '');

//         console.log(`${day} meal plan was loaded`);
//     });
// });

// Read file for a day
btnRead.addEventListener('click', function() {
    let day = daySelect.value;
    let file = getFilePath(day);

    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${day} plan:`, err);
            alert(`Error reading ${day} plan`);
            return;
        }
        
        // Parse the data and set input values
        let [breakfast, lunch, dinner] = data.split('\n');
        breakfastInput.value = breakfast.replace('Breakfast: ', '');
        lunchInput.value = lunch.replace('Lunch: ', '');
        dinnerInput.value = dinner.replace('Dinner: ', '');

        // Display the output in #output element
        const outputElement = document.getElementById('output');
        outputElement.innerHTML = `
            <h3>${day} Meal Plan</h3>
            <p>${breakfast}</p>
            <p>${lunch}</p>
            <p>${dinner}</p>
        `;

        console.log(`${day} meal plan was loaded`);
    });
});


// // Update file for a day
// btnUpdate.addEventListener('click', function() {
//     let day = daySelect.value;
//     let file = getFilePath(day);
//     let contents = `Breakfast: ${breakfastInput.value}\nLunch: ${lunchInput.value}\nDinner: ${dinnerInput.value}`;

//     fs.writeFile(file, contents, function(err) {
//         if (err) {
//             return console.log(`Error updating ${day} plan:`, err);
//         }
//         alert(`${day} meal plan was updated`);
//         console.log("The file was updated");
//     });
// });


// Update file for a day
btnUpdate.addEventListener('click', function() {
    let day = daySelect.value;
    let file = getFilePath(day);
    let contents = `Breakfast: ${breakfastInput.value}\nLunch: ${lunchInput.value}\nDinner: ${dinnerInput.value}`;

    // Write updated contents to the file
    fs.writeFile(file, contents, function(err) {
        if (err) {
            console.log(`Error updating ${day} plan:`, err);
            alert(`Error updating ${day} meal plan`);
            return;
        }
        
        alert(`${day} meal plan was updated`);
        console.log("The file was updated");

        // Display the updated output in #output element
        const outputElement = document.getElementById('output');
        outputElement.innerHTML = `
            <h3>${day} Meal Plan (Updated)</h3>
            <p>Breakfast: ${breakfastInput.value}</p>
            <p>Lunch: ${lunchInput.value}</p>
            <p>Dinner: ${dinnerInput.value}</p>
        `;
    });
});

// // Delete file for a day
// btnDelete.addEventListener('click', function() {
//     let day = daySelect.value;
//     let file = getFilePath(day);

//     fs.unlink(file, function(err) {
//         if (err) {
//             return console.log(`Error deleting ${day} plan:`, err);
//         }
        
//         breakfastInput.value = "";
//         lunchInput.value = "";
//         dinnerInput.value = "";
        
//         alert(`${day} meal plan was deleted`);
//         console.log("The file was deleted!");
//     });
// });

// Delete file for a day
btnDelete.addEventListener('click', function() {
    let day = daySelect.value;
    let file = getFilePath(day);

    fs.unlink(file, function(err) {
        if (err) {
            console.log(`Error deleting ${day} plan:`, err);
            alert(`Error deleting ${day} meal plan`);
            return;
        }

        // Clear input fields
        breakfastInput.value = "";
        lunchInput.value = "";
        dinnerInput.value = "";

        alert(`${day} meal plan was deleted`);
        console.log("The file was deleted!");

        // Clear the output display
        const outputElement = document.getElementById('output');
        outputElement.innerHTML = `
            <h3>${day} Meal Plan</h3>
            <p>No meal plan available for this day.</p>
        `;
    });
});

