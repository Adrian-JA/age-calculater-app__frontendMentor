const getDay = document.getElementById("day");
const getMonth = document.getElementById("month");
const getYear = document.getElementById("year");

const calculate = document.getElementById("btn-calculate");

function validateDate(day, month, year, currentDate) {
    const calendar = [
        { month: "jan", days: 31 },
        { month: "feb", days: 28 },
        { month: "mar", days: 31 },
        { month: "apr", days: 30 },
        { month: "may", days: 31 },
        { month: "jun", days: 30 },
        { month: "jul", days: 31 },
        { month: "aug", days: 31 },
        { month: "sep", days: 30 },
        { month: "oct", days: 31 },
        { month: "nov", days: 30 },
        { month: "dec", days: 31 },
    ];

    const getDays = calendar[month - 1];

    if (isNaN(day) || isNaN(month) || isNaN(year)) return;

    if (day < 1 || !getDays || day > getDays.days) return;

    if (year === currentDate.year && month === currentDate.month && day > currentDate.day) return;

    if (month < 1 || month > 12) return;

    if (year < 1 || year > 2023) return;

    console.log(getDays);
    return true;
}

function showErrorMsg() {
    const alerts = document.querySelectorAll(".card-input__error");

    alerts.forEach((alert) => {
        alert.classList.remove("hide");
        alert.parentElement.classList.add("card-input--error");
    });
}

function hideErrorMsg() {
    const alerts = document.querySelectorAll(".card-input__error");

    alerts.forEach((alert) => {
        alert.classList.add("hide");
        alert.parentElement.classList.remove("card-input--error");
    });
}

function calculateAge(day, month, year) {
    const date = new Date();
    const currentDay = date.getDate();
    const currenMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    let calcDay = currentDay - day;
    let calcMonth = currenMonth - month;
    let calcYear = currentYear - year;

    let convertYearsToDays = calcYear * 365;
    let convertMonthToDays = calcMonth * 30.417;

    let totalDays = convertMonthToDays + convertYearsToDays + calcDay;
    let restDays = totalDays % 365;
    let totalYear = totalDays / 365;
    let totalMonth = totalDays % 30.417;

    const calcTime = {
        cYear: parseInt(totalYear),
        cMonth: parseInt(restDays / 30.417),
        cDay: parseInt(totalMonth),
    };

    return calcTime;
}

calculate.addEventListener("click", () => {
    const answerElement = document.querySelectorAll(".card-answer__number");

    const day = parseInt(getDay.value);
    const month = parseInt(getMonth.value);
    const year = parseInt(getYear.value);

    const date = new Date();
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const currentDate = { day: currentDay, month: currentMonth, year: currentYear };

    if (!validateDate(day, month, year, currentDate)) return showErrorMsg();

    hideErrorMsg();
    const { cYear, cMonth, cDay } = calculateAge(day, month, year);
    const answer = [cYear, cMonth, cDay];

    answerElement.forEach((elm, index) => {
        elm.innerHTML = answer[index];
    });
    return;
});

function focusInput() {
    const inputs = document.querySelectorAll(".focus");
    let index = 1;

    inputs.forEach((input) => {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                if (index === 4) index = 0;
                inputs[index].focus();
                index += 1;
            }
        });

        input.addEventListener("click", (e) => {
            const inputTab = [...inputs].indexOf(e.target);
            index = inputTab + 1;
        });
    });

    return inputs;
}

function addZeros() {
    const inputs = document.querySelectorAll(".card-input__text");
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            let string = input.value.split("");

            if (input.value < 10 && string[0] !== "0") return (input.value = "0" + input.value);

            if (string[0] === "0") return (input.value = input.value.slice(-2));
        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    focusInput();
    addZeros();
});
