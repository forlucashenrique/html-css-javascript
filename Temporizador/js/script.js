var hours = document.querySelector('.hours')
var minutes = document.querySelector('.minutes')
var seconds = document.querySelector('.seconds')
var buttonStart = document.querySelector('.buttons-start')
var buttonStop = document.querySelector('.buttons-stop')
var buttonReset = document.querySelector('.buttons-reset')

var intervalID 
var sec = 0
var min = 0
var hour = 0 

buttonStart.addEventListener('click', function(e){
    
    e.target.style.pointerEvents = 'none'
    intervalID = setInterval(function(){
        sec++
        if(sec == 60) {
            min++ 
            sec = 0

            minutes.innerText = min < 10 ? `0${min}` : `${min}`
            if(min == 60){
                hour++
                min = 0

                hours.innerText = hour < 10 ? `0${hour}` : `${hour}`
            }
        }

        seconds.innerText = sec < 10 ? `0${sec}` : `${sec}`
    }, 1000)
})


buttonStop.addEventListener('click', function(){
    clearInterval(intervalID)
    buttonStart.style.pointerEvents = 'auto'
})


buttonReset.addEventListener('click', function(){
    clearInterval(intervalID)
    buttonStart.style.pointerEvents = 'auto'
    hours.innerText = '00'
    minutes.innerText = '00'
    seconds.innerText = '00'
    hour = 0
    min = 0
    sec = 0

})
