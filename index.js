const circle = document.querySelector(".circle");

const start = document.querySelector(".start");
const reset = document.querySelector(".reset");

const lap = document.querySelector(".lap-plus");
const lapPlusContainer = document.querySelector(".lap-plus-container");
const lapContainer = document.querySelector(".lap-container");

const latestLap = document.querySelector(".latest-lap");
const latestLapHr = document.querySelector(".latest-lap-hr");
const latestLapMin = document.querySelector(".latest-lap-min");
const latestLapSec = document.querySelector(".latest-lap-sec");
const latestLapMs = document.querySelector(".latest-lap-ms");

const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const milliseconds = document.querySelector(".milliseconds");

const settingsIcon = document.querySelector(".settings-icon");
const settingsImg = document.querySelector(".settings-img");
const enableBack = document.querySelector(".enable-back");
const enableButton = document.querySelector(".enable-button");

const section = document.querySelector("section");
const body = document.querySelector("body");
const settings = document.querySelector(".settings");
const popup = document.querySelector(".popup");
let slides;
let slides2;
// let slidesFunc = () => {
//     slides = [
//     enableButton.classList.add("slide-back"),
//     enableButton.classList.add("slide")
//     ]   

//     slides2 = [
//         enableButton.classList.remove("slide"),
//         enableButton.classList.remove("slide-back")
//     ] 
// }

let setIntervalMs = 10;
let timeRemainder = 0;

let lapNum = 1;
let previousOverallTime = 0;
let zero = "0";
let ms = 1;
let storedMs = ms;
let sec = 1;
let min = 1;
let hr = 1;

let lapHr = 0;
let lapMin = 0;
let lapSec = 0;
let lapMs = 0;

let currentOverallTime = 0;

let id1;
let id2;
let id3;

let index = 0;
let slideIndex = 0;
let ableIndex = 0;

let lapDisabled = false;

let ableArray = ["Enable", "Disable"];

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

const popupFunc = () => {
    section.classList.toggle("section-popup");
    body.classList.toggle("body-popup");
    settings.classList.toggle("settings-popup");
    settings.classList.toggle("display-none");
    popup.classList.toggle("popup-popup");
    settingsImg.setAttribute("src", SettingImages[index]);
    settingsImg.classList.toggle("cancel-height");
    enableBack.classList.toggle("display-none");
    enableButton.classList.toggle("display-none");
    circle.classList.toggle("opacity-popup");
    start.classList.toggle("opacity-popup");
    reset.classList.toggle("opacity-popup");
    lap.classList.toggle("opacity-popup");
    lapPlusContainer.classList.toggle("opacity-popup");
    lapContainer.classList.toggle("opacity-popup");
    
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

const hrCalculator = (time) => {
    let flooredTime = Math.floor(time / 360000);
    lapHr = flooredTime;
    minCalculator(time - lapHr * 360000);
}

const minCalculator = (time) => {
    let flooredTime = Math.floor(time / 6000);
    lapMin = flooredTime;
    secCalculator(time - lapMin * 6000);
}

const secCalculator = (time) => {
    let flooredTime = Math.floor(time / 100);
    lapSec = flooredTime;
    msCalculator(time - lapSec * 100);
}

const msCalculator = (time) => {
    lapMs = time;
}

const totalTimeCalculator = () => {  // time is calculated in microseconds not milliseconds
    let msNum = +milliseconds.textContent;
    let secNum = +seconds.textContent;
    let minNum = +minutes.textContent;
    let hrNum = +hours.textContent;

    let totalTime = msNum + (secNum * 100) + (minNum * 6000) + (hrNum * 360000);
    return totalTime;
}

const latestLapFunc = () => {

    latestLap.classList.add("animation");
    latestLap.classList.remove("display-none");
    
    let lapHrS;
    let lapMinS;
    let lapSecS;
    let lapMsS;

    setInterval(() => {
        hrCalculator(Math.abs(totalTimeCalculator() - currentOverallTime));

        if (lapHr === 0){
            lapHrS = "";
        }

        else if (lapHr < 10) {
            lapHrS = "0" + lapHr + ":";
        }

        else {
            lapHrS = lapHr + ":";
        }

        if (lapMin === 59 && lapSec === 59){
            latestLapHr.textContent = "00:";
            latestLapHr.classList.add("animation");
            latestLapHr.classList.remove("display-none");
        }

        
        if (lapMin < 10) {
            lapMinS = "0" + lapMin;
        }

        else {
            lapMinS = lapMin;
        }



        if (lapSec < 10) {
            lapSecS = "0" + lapSec;
        }

        else {
            lapSecS = lapSec;
        }



        if (lapMs < 10) {
            lapMsS = "0" + lapMs;
        }

        else {
            lapMsS = lapMs;
        }



        latestLapHr.textContent = lapHrS;
        latestLapMin.textContent = lapMinS;
        latestLapSec.textContent = lapSecS;
        latestLapMs.textContent = lapMsS;
    }, 10)
}

const createLap = () => {
    let newLap = document.createElement("div");
    let newLapNum = document.createElement("div");
    let newLapTime = document.createElement("div");
    let newLapOtherTime = document.createElement("div");
    let newLapMs = document.createElement("div");
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

    currentOverallTime = totalTimeCalculator();
    newOverallTime.textContent = hoursText + minutesText + seconds.textContent + "." + milliseconds.textContent;
    hrCalculator(Math.abs(currentOverallTime - previousOverallTime)); //how is this possible (neg values)

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
    newLapNum.classList.add("lap-num");
    newLap.classList.add("animation");
    // lapContainer.classList.add("animation");
    lapContainer.prepend(newLap);

    newLapTime.classList.add("time-flex");

    newLapTime.appendChild(newLapOtherTime);
    newLapTime.appendChild(newLapMs);
    newLap.appendChild(newLapNum);
    newLap.appendChild(newLapTime);
    newLap.appendChild(newOverallTime);
    previousOverallTime = currentOverallTime;
    latestLapFunc();
    lapNum++;
}

const play = () => {
    clearIntervals();
    start.textContent = "Resume";
    setIntervalMs = 10 - timeRemainder;
    setIntervalSec = 1000 - timeRemainder;
    setIntervalMin = 60000 - timeRemainder;
    // start.removeEventListener("click", clickStart);
    start.addEventListener("click", clickStart);
}

const clearIntervals = () => {
    storedMs = ms;
    clearInterval(id1);
    clearInterval(id2);
    clearInterval(id3);
}

const clickStart = () => {
    // for (let i = 1; i <= 9; i++){
    ms = storedMs;
        id1 = setInterval(() => {
            if (ms < 10){
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
        setIntervalMs = 10;
            if (ms === 1){
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
        
       
           if (sec === 1){
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
    }

        if (min===0  && sec === 0) {
                hours.textContent = "00:";
                hours.classList.add("animation");
                hours.classList.remove("display-none");
            }
        }
        }, setIntervalMs);
        
        start.textContent = "Pause";
        start.removeEventListener("click", clickStart);
        // start.addEventListener("click", clearIntervals);
        start.addEventListener("click", play);
        if(!lapDisabled){
            lap.classList.remove("display-none");
        }
        circle.classList.add("circle-start");
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
    latestLap.classList.remove("animation");
    latestLap.classList.add("display-none");
    circle.classList.remove("circle-start");
    hours.classList.add("display-none");
    start.removeEventListener("click", clickStart);
    timeRemainder = 0;
    play();
    lap.classList.add("display-none");
    while (lapContainer.firstChild){
        lapContainer.removeChild(lapContainer.firstChild);
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
});

lap.addEventListener("click", createLap);

settingsIcon.addEventListener("click", popupFunc);

enableButton.addEventListener("click", () => {
    enableButton.textContent = ableArray[ableIndex];
    if (enableButton.textContent === "Enable") {
        enableButton.classList.add("blue");
        lapDisabled = true;
        while (lapContainer.firstChild){
            lapContainer.removeChild(lapContainer.firstChild);
        }
        lap.classList.add("display-none");
    }
    else {
        enableButton.classList.remove("blue");
        lapDisabled = false;
        lap.classList.remove("display-none");
        if (( (hours.textContent === "00") || (hours.textContent === "") ) && ( (minutes.textContent === "00") || (minutes.textContent === "00"))){
            if (( (seconds.textContent === "00") || (seconds.textContent === "") ) && ( (milliseconds.textContent === "00") || (milliseconds.textContent === "00"))){
                lap.classList.add("display-none");
            }
        }
    }
    ableIndex = (ableIndex + 1) % 2;
});

// setInterval(() => {
//     timeRemainder = (timeRemainder + 1) % 10;
// }, 1)