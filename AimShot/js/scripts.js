
var aim_container = document.querySelector('.aimshot-container')
var timer_container = document.querySelector('.timer-container')
var score = document.querySelector('.score')
var hour = document.querySelector('.hour')
var minute = document.querySelector('.minute')
var second = document.querySelector('.second')
var btnStop = document.querySelector('.stop')
var btnStart = document.querySelector('.start')
var btnReset = document.querySelector('.reset')
var selectLevel = document.querySelector('.nivel-select')

var sec = 0 
var min = 0
var hour = 0
var fast = 600

var timerIntervalId
var aimIntervalID

var sound = new Howl({
    src: ['shot.mp3'],
    volume: 0.3
});


function setPositionLeft(box){
    const boxLeft = Math.floor(Math.random() * (720 - 100 + 1)) + 100;
    box.style.left = `${boxLeft}px`
}


function setPositionTop(box){
    const boxTop = Math.floor(Math.random() * (360 - 40 + 1)) + 40;
    box.style.top = `${boxTop}px`
}


function setWidthAndHeight(box){
    const circles = [[36, 36], [49, 49], [64, 64], [81, 81], [100, 100]]
    const [width, height] = circles.sort(() => Math.random() - 0.5)[0]
    box.style.width = `${width}px`
    box.style.height = `${height}px`
}


function removeChild(e){
    sound.play()
    var count = Number(score.innerHTML)
    aim_container.removeChild(e.target)
    score.innerHTML = count + 1

    
}

function timer(){

    btnStart.style.pointerEvents = 'none'
    timerIntervalId = setInterval(function(){
        sec++ 
        if(sec == 60){
            min++
            sec = 0
            minute.innerHTML = min < 10 ? `0${min}` : `${min}`
            if(min == 60){
                hour++
                min = 0;
                hour.innerHTML = hour < 10 ? `0${hour}` : `${hour}`
            }
        }
        
        second.innerHTML = sec < 10 ? `0${sec}` : `${sec}`

    }, 1000)
    
}

function start(){
    
    timer()
    aimIntervalID = setInterval(function addCircle(){
        var circle = document.createElement('div')
        const aim_container_children = aim_container.children
        circle.className = 'circle'
    
        setPositionLeft(circle)
        setPositionTop(circle)
        setWidthAndHeight(circle)
    
        if (aim_container_children.length == 0) aim_container.appendChild(circle)
     
        if(aim_container_children.length <= 10){
    
            Array.from(aim_container_children).map(child => {
                const childCoordintes = {childLeft: child.offsetLeft, childTop: child.offsetTop, childWidth: child.clientWidth, childHeight: child.clientHeight}
                const childRight = childCoordintes.childLeft + childCoordintes.childWidth
                const childBottom = childCoordintes.childTop + childCoordintes.childHeight
                const circleBottom = circle.offsetTop + circle.clientHeight
                if (
                    circle.offsetLeft < childCoordintes.childLeft || circle.offsetLeft > childRight 
                    && circle.offsetTop > childBottom || circleBottom < childCoordintes.childTop ) {
                        aim_container.appendChild(circle)
                        
                    }
                
            })
    
        }   
    
        circle.addEventListener('click', removeChild)
    
    }
    , fast)
    
}


function stop(){
    clearInterval(timerIntervalId)
    clearInterval(aimIntervalID)
    btnStart.style.pointerEvents = 'auto'
}


function reset(){
    btnStart.style.pointerEvents = 'auto'
    clearInterval(timerIntervalId)
    clearInterval(aimIntervalID)

    sec = 0;
    min = 0;
    hour = 0;
    fast = 600

    second.innerHTML = '00'
    minute.innerHTML = '00'
    hour.innerHTML = '00'
    aim_container.innerHTML = ''
    score.innerHTML = '0'
    selectLevel.options.selectedIndex = 0
}

btnStart.addEventListener('click', start)

btnStop.addEventListener('click', stop)

btnReset.addEventListener('click', reset)

selectLevel.addEventListener('change', function(){

    for(let i = 0; i < selectLevel.options.length; i++){
        
        if (selectLevel.options[i].selected)
            console.log(selectLevel.options[i].value) 
            if(selectLevel.options[i].value === 'facil'){
                fast = 600
            }
            else if(selectLevel.options[i].value === 'normal'){
                fast = 500
            }
            else if(selectLevel.options[i].value === 'dificil'){
                fast  = 400
            }
    }
})