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
let next = document.querySelector('.next');
next.addEventListener('click', ()=> {
    move++;
    main(move);
})

let previous = document.querySelector('.previous');
previous.addEventListener('click', ()=> {
    move--;
    main(move);
})


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

    fillTheCalendar(weeks);
}

function fillTheCalendar(weeks){
    document.querySelector('.calendar_body').innerHTML = '';
    for (let week of weeks) {
        let tr = document.createElement('tr');
        for (let day of week) {
            let td = document.createElement('td');
            td.innerText = day;
            tr.appendChild(td);
        }
        document.querySelector('.calendar_body').appendChild(tr);
    }
}

window.addEventListener('load', main(0));
