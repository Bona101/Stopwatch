let start = document.querySelector(".start");
let reset = document.querySelector(".reset");

let lap = document.querySelector(".lap-plus");
let lapContainer = document.querySelector(".lap-container");

let hours = document.querySelector(".hours");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let milliseconds = document.querySelector(".milliseconds");

let settingsIcon = document.querySelector(".settings-icon");
let settingsImg = document.querySelector(".settings-img");
let enableBack = document.querySelector(".enable-back");
let enableButton = document.querySelector(".enable-button");

let section = document.querySelector("section");
let body = document.querySelector("body");
let settings = document.querySelector(".settings");
let popup = document.querySelector(".popup");

let lapNum = 1;
let previousOverallTime = 0;
let zero = "0";
let ms = 1;
let sec = 1;
let min = 1;
let hr = 1;

let lapHr = 0;
let lapMin = 0;
let lapSec = 0;
let lapMs = 0;

let id1;
let id2;
let id3;

let index = 0;
let SettingImages = ["./images/cancel.png","./images/settings.webp"];
// let remm = () => {
//     body.addEventListener("click", () => {
//         section.classList.toggle("section-popup");
//         body.classList.toggle("body-popup");
//         settings.classList.remove("settings-popup");
//         settings.classList.add("display-none");
//         popup.classList.remove("popup-popup");
//         // body.removeEventListener("click", popupFunc)
//     })
// }


let popupFunc = () => {

    section.classList.toggle("section-popup");
    body.classList.toggle("body-popup");
    settings.classList.toggle("settings-popup");
    settings.classList.toggle("display-none");
    settings.classList.toggle("settings-after");
    popup.classList.toggle("popup-popup");
    settingsImg.setAttribute("src", SettingImages[index]);
    settingsImg.classList.toggle("cancel-height");
    enableBack.classList.toggle("display-none");
    enableButton.classList.toggle("display-none");
    // body.addEventListener("click", () => {
    //     section.classList.toggle("section-popup");
    //     body.classList.toggle("body-popup");
    //     settings.classList.remove("settings-popup");
    //     settings.classList.add("display-none");
    //     popup.classList.remove("popup-popup");
    //     // body.removeEventListener("click", popupFunc)
    // })
    // settingsIcon.removeEventListener("click", popupFunc)

    // remm();
    index = (index + 1) % 2;
}

let hrCalculator = (time) => {
    let flooredTime = Math.floor(time / 360000);
    lapHr = flooredTime;
    minCalculator(time - lapHr * 360000);
}

let minCalculator = (time) => {
    let flooredTime = Math.floor(time / 6000);
    lapMin = flooredTime;
    secCalculator(time - lapMin * 6000);
}

let secCalculator = (time) => {
    let flooredTime = Math.floor(time / 100);
    lapSec = flooredTime;
    msCalculator(time - lapSec * 100);
}

let msCalculator = (time) => {
    lapMs = time;
}

let LapTimeCalculator = () => {  // time is calculated in microseconds not milliseconds
    let msNum = +milliseconds.textContent;
    let secNum = +seconds.textContent;
    let minNum = +minutes.textContent;
    let hrNum = +hours.textContent;

    let totalTime = msNum + (secNum * 100) + (minNum * 6000) + (hrNum * 360000);
    return totalTime;
}

let createLap = () => {
    let newLap = document.createElement("div");
    let newLapNum = document.createElement("div");
    let newLapTime = document.createElement("div");
    let newOverallTime = document.createElement("div");
    newLapNum.textContent = lapNum;
    let minutesText = minutes.textContent;
    let hoursText = hours.textContent;
    let lapHrString;
    let lapMinString;
    let lapSecString;
    let lapMsString;
    if(minutesText === "00"){
        minutesText = "";
    }

    else {
        minutesText += ":";
    }

    if(hoursText === "00"){
        hoursText = "";
    }


    newOverallTime.textContent = hoursText + minutesText + seconds.textContent + "." + milliseconds.textContent;
    hrCalculator(Math.abs(LapTimeCalculator() - previousOverallTime)); //how is this possible (neg values)

    if (lapHr === 0){
        lapHrString = "";
    }

    else if(lapHr < 10){
        lapHrString = "0" + lapHr + ":";
    }

    else {
        lapHrString = lapHr + ":";
    }

    if (lapMin === 0 && lapHr === 0){
        lapMinString = "";
    }

    else if(lapMin < 10){
        lapMinString = "0" + lapMin + ":";
    }

    else {
        lapMinString = lapMin + ":";
    }

    
    if(lapSec < 10){
        lapSecString = "0" + lapSec + ".";
    }

    else {
        lapSecString = lapSec + ".";
    }

    
    if(lapMs < 10){
        lapMsString = "0" + lapMs;
    }

    else {
        lapMsString = lapMs;
    }

    newLapTime.textContent = lapHrString + lapMinString + lapSecString + lapMsString;
    newLap.classList.add("lap-styles");
    newLap.classList.add("animation");
    // lapContainer.classList.add("animation");
    newLapNum.classList.add("lap-num");
    lapContainer.prepend(newLap);
    newLap.appendChild(newLapNum);
    newLap.appendChild(newLapTime);
    newLap.appendChild(newOverallTime);
    previousOverallTime = LapTimeCalculator();
    lapNum++;
}

let play = () => {
    clearIntervals();
    start.textContent = "Resume";
    start.addEventListener("click", clickStart);
}

let clearIntervals = () => {
    clearInterval(id1);
    clearInterval(id2);
    clearInterval(id3);
}

let clickStart = () => {
    // for (let i = 1; i <= 9; i++){

        id1 = setInterval(() => {
            if (ms < 9){
                zero = "0";
            }

            if (ms > 9){
                zero = "";
            }

            milliseconds.textContent = zero + ms;

            if (ms===99){
                ms = -1;
            }
            ms++;
        }, 10);

        id2 = setInterval(() => {
            zero = "";
            if (sec < 10){
                zero = "0";
            }

            if (sec > 9){
                zero = "";
            }

            seconds.textContent = zero + sec;

            if (sec===59){
                sec = -1;
            }
            sec++;
        }, 1000);

        id3 = setInterval(() => {
            zero = "";
            if (min < 10){
                zero = "0";
            }

            if (min > 9){
                zero = "";
            }

            minutes.textContent = zero + min;
            
            if (min===59){
                min = -1;
            }
            min++;
            if (min===0) {
                hours.textContent = "00:";
                hours.classList.add("animation");
                hours.classList.remove("display-none");
            }
            if (min===1) {
            zero = "";
            if (hr < 10){
                zero = "0";
            }

            if (hr > 9){
                zero = "";
            }

            hours.textContent = zero + hr + ":";

            // if (hr===24){    if you are adding days then
            //     hr = -1;         you leave this code
            // }                else
            //                      remove it
            hr++;
        }
        }, 60000);

        start.textContent = "Pause";
        start.removeEventListener("click", clickStart);
        // start.addEventListener("click", clearIntervals);
        start.addEventListener("click", play);
        lap.classList.remove("display-none");
        // lapContainer.classList.remove("display-none");

        // setTimeout(() => {
        //     id2 = setInterval(() => {
        //         milliseconds.textContent = ms;
        //         if (ms===99){
        //             clearInterval(id2);
        //         }
        //         ms++;
        //     }, 1)
        // }, 9)

        // id3 = setInterval(() => {
        //     seconds.textContent = "0" + sec;
        // if (sec===9){
        //     clearInterval(id3);
        // }
        // sec++;
        // }, 1000);

        // setTimeout(() => {
        //     id4 = setInterval(() => {
        //         seconds.textContent = sec;
        //         if (sec===59){
        //             clearInterval(id4);
        //         }
        //         sec++;
        //     }, 1000)
        // }, 9000)


        // (i !== 99) ? clearTimeout(id) : {};
        // ms++; the setTimeOut captures the final value of ms in that 
        //block instead of only the one before it
    // }

    // clearInterval(id);

    // for (let i = 10; i <= 99; i++){
    //     setInterval(() => {
    //         milliseconds.textContent = i;
    //     }, 1);
    //     // (i !== 99) ? clearTimeout(id) : {};
    // }

    // for (let i = 1; i <= 9; i++){
    //     setTimeout(() => {
    //         seconds.textContent = "0" + i;
    //     }, 1000);
    //     // ms++; the setTimeOut captures the final value of ms in that 
    //     //block instead of only the one before it
    // }

    // for (let i = 10; i <= 99; i++){
    //     setTimeout(() => {
    //         seconds.textContent = i;
    //     }, 1000);
    // }


}

start.addEventListener("click", clickStart); // so you must declare the clickStart function first if it's an arrow function?

reset.addEventListener("click", function (){
    hours.classList.add("display-none");
    start.removeEventListener("click", clickStart);
    play();
    lap.classList.add("display-none");
    while (lapContainer.firstChild){
        lapContainer.removeChild(lapContainer.firstChild)
    }
    // lapContainer.classList.add("display-none");
    minutes.textContent = "00";
    seconds.textContent = "00";
    milliseconds.textContent = "00";
    ms = 1;
    sec = 1;
    min = 1;
    hr = 1;
    start.textContent = "Start";
})

lap.addEventListener("click", createLap)
settingsIcon.addEventListener("click", popupFunc)