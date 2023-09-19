let start = document.querySelector(".start");
let reset = document.querySelector(".reset");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let milliseconds = document.querySelector(".milliseconds");
let zero = "0";
let ms = 1;
let sec = 1;
let mins = 1;

start.addEventListener("click", () => {
    // let id1;
    // let id2;
    // let id3;
    // let id4;

    // for (let i = 1; i <= 9; i++){
        setInterval(() => {
            if (ms < 9){
                zero = "0";
            }
            milliseconds.textContent = zero + ms;
            if (ms===9){
                zero = "";
            }
            if (ms===99){
                ms = -1;
            }
            ms++;
        }, 10);

        setInterval(() => {
            zero = "";
            if (sec < 10){
                zero = "0";
            }
            seconds.textContent = zero + sec;
            if (sec===9){
                zero = "";
            }
            if (sec===59){
                sec = -1;
            }
            sec++;
        }, 1000);

        setInterval(() => {
            zero = "";
            if (mins < 10){
                zero = "0";
            }
            minutes.textContent = zero + sec;
            if (mins===9){
                zero = "";
            }
            if (mins===59){
                mins = -1;
            }
            mins++;
        }, 60000);

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


})