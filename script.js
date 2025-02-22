// First part ----- Buttons!!

const restaurants = [
    "Pet jezera Bijeljina", "Fakultet Minhen", "Kaldrma BL", "Gral Derventa", "Hotel Park Doboj", 
    "Motel Rodjo Teslic", "Panorama Doboj", "Piramida Jelah", "Vinarija Pajic Brcko", "Hotel Terme Ozren",
];
let selectedRestaurant = null;
let mjesec = '';
let godina = '';

const buttonsDiv = document.querySelector(".buttons");

// Loop through the list of restaurants and create a button for each one

restaurants.forEach(name => {
    const btn = document.createElement("button");
    btn.innerText = name;
    btn.classList.add("btn");
    btn.classList.add("btn-outline-danger");
    btn.addEventListener('click', ()=>{
        document.querySelectorAll(".buttons button").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");

        selectedRestaurant = name;
    });
    buttonsDiv.appendChild(btn);
});




// Second part----- Calendar!!

// Function to update the month and year when navigating through the calendar

let updateMonthAndYear = (currentMonth, currentYear, move) => {
    let totalMonths = currentMonth + move;
    
    let newYear = currentYear + Math.floor(totalMonths / 12);
    let newMonth = totalMonths % 12;

    if (newMonth < 0) {
        newMonth += 12;
    }

    return { year: newYear, month: newMonth };
};

let move = 0;

// Event listener for 'next' button to move forward one month

let next = document.querySelector('.next');
next.addEventListener('click', ()=> {
    move++;
    main(move);
})
// ... and 'previous' button

let previous = document.querySelector('.previous');
previous.addEventListener('click', ()=> {
    move--;
    main(move);
})

// Main function to display the calendar for the given month and year

function main(move) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth(); 
    let result = updateMonthAndYear(month, year, move); // Store result in a variable
    makeaTemplate(result.year, result.month); // Pass the result to makeaTemplate
    if (move == 0) {
        for (let day of document.querySelectorAll('td')) {
            if(day.innerText == date.getDate()) {
                day.style.backgroundColor = '#dc0101';
                day.style.color = '#fff';
                
            }
        }
    }
}

// Function to create the calendar template with days of the month

function makeaTemplate(year, month) {
    let months = ['January', 'February', 'March', 'April',
                  'May', 'June', 'July', 'August', 'September',
                  'October', 'November', 'December'];

    let selectedMonth = months[month];

    let title = document.querySelector('.calendar_title');
    title.innerText = selectedMonth + " " + year + ".";

    let first = new Date(year,month,1);
    let last = new Date(year, month + 1, 0);

    let dayInWeekFirst = first.getDay();
    if (dayInWeekFirst == 0) dayInWeekFirst = 7;

    let dayInWeekLast = last.getDay();
    if (dayInWeekLast == 0) dayInWeekLast = 7;

    let days = [];

    for (let i = 1; i < dayInWeekFirst; i++) {
        days.push("");
    }

    for (let i = 1; i <= last.getDate(); i++) {
        days.push(i);
    }

    for (let i = dayInWeekLast; i < 7; i++) {
        days.push("");
    }

    let weeks = [];

    for (let day of days) {
        weeks.push(days.splice(0,7));
    }
    mjesec = month;
    godina = year;
    fillTheCalendar(weeks);

}

// Function to fill the calendar with the days and add notes (if any)

function fillTheCalendar(weeks){
    document.querySelector('.calendar_body').innerHTML = '';
    for (let week of weeks) {
        let tr = document.createElement('tr');
        for (let day of week) {
            let td = document.createElement('td');
            td.innerHTML = `<div class="broj">${day}</div>`;
            tr.appendChild(td);
            if (localStorage.getItem(`${day}.${mjesec}.${godina}.`)) {
                td.innerHTML += `<div class="biljeska">${localStorage.getItem(`${day}.${mjesec}.${godina}.`)}</div>`;
            }
        }
        document.querySelector('.calendar_body').appendChild(tr);
    }
}

let book = document.getElementById("book");

// Event listener for the 'book' button

book.addEventListener('click', () => {
    if (!selectedRestaurant) {
        alert("Please select a restaurant first!");
        return;
    }
    document.querySelector(".close").style.display = "block";
    document.querySelector(".calendar").style.display = "block";

    let td = document.querySelectorAll('td');

    // Add event listeners to all calendar days

    td.forEach(x => {
        x.addEventListener('click', () => {
            // Check if the cell content is a valid number
            if (!isNaN(x.innerText) && x.innerText.trim() !== "") {
                x.innerHTML += `<div class="biljeska">${selectedRestaurant}</div>`;
                let datum = x.firstElementChild.innerText;
                let key = `${datum}.${mjesec}.${godina}.`;
                localStorage.setItem(key, selectedRestaurant);
            }
        });
    });
});

document.querySelector('.close').addEventListener('click',()=> {
    closeCalendar();
});

// Event listener for the 'close' button to close the calendar

function closeCalendar() {
    document.querySelector(".calendar").style.display = "none";
    document.querySelector(".close").style.display = "none";
}

// Event listener for the 'clear' button to clear a local storage

let clear = document.querySelector('.clear');
clear.addEventListener('click',()=> {
    localStorage.clear();
});

window.addEventListener('load', main(0));
