window.onload = createTitle


var container = document.getElementsByClassName('task-field')[0]
var btnAdd = document.querySelector('.add')
btnAdd.addEventListener('click', addTask)


var inputSearch = document.getElementsByClassName('search')[0]
var taskList = document.getElementsByClassName('task')
var filteredList = []

inputSearch.addEventListener('input', function(){
        console.log(taskList)
        filteredList = Array.from(taskList).filter(el => {
        const divText = el.innerText.toLowerCase()
        const searchWord = inputSearch.value.toLowerCase()
        return divText.includes(searchWord)
    })

    for(let i = 0; i < taskList.length; i++){

        if (!filteredList.includes(taskList[i])) {
            taskList[i].style.display = 'none'
            
            console.log(taskList[i])
        }
        else {
            taskList[i].style.display = 'flex'
        }

    }
    console.log(filteredList)
})



setInterval(function(){
    if(inputSearch.value === ''){
        for(let i = 0; i < taskList.length; i++){
            taskList[i].style.display = 'flex'
        }
    }
    // if(!inputSearch.value && !filteredList){
    //     container.innerHTML = ''
    //     for(let i = 0; i < taskList.length; i++){
    //         container.appendChild(taskList[i])
    //     }
    // }
    


    if(container.firstElementChild){
        var btnList = document.getElementsByClassName('remove')
        
        for(let i = 0; i < btnList.length; i++){
            btnList[i].addEventListener('click', removeTask)
        }
    } 
}, 500)




function createTitle(){
    // exibe o dia e a data ao carregar a página

    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    const date = new Date()
    const dayName = days[date.getDay()]
    const dayValue = date.getDate()
    const month = months[date.getMonth()]

    const container = document.getElementsByClassName('container')[0]
    const firstDiv = container.firstElementChild
    const h1 = document.createElement('h1')
    h1.innerHTML = `${dayName}, ${dayValue} de ${month}`
    container.insertBefore(h1, firstDiv)

}



function addTask(){
    const input = document.querySelector('.add-task input')
    const value = input.value
    if(value) {
        createTask(value)
    }
    else alert('O campo está vazio')

}

function removeTask(e){
    const el = e.target
    const task = el.parentNode.parentNode
    task.parentNode.removeChild(task)
}

function createTask(task){
    const task_container = document.querySelector('.task-field')
    const task_div = document.createElement('div')
    const check_div = document.createElement('div')
    const desc_div = document.createElement('div')
    const icon_div = document.createElement('div')
    const label = document.createElement('label')
    const input = document.createElement('input')
    const span = document.createElement('span')
    const icon = document.createElement('i')

    // estilo padrão da tarefa
    task_div.className = 'task'

    // adicionando as classes do checkbox
    check_div.className = 'task-check'
    label.className = 'check-container'
    span.className = 'checkmark'


    // adicionandos as classes descricao e icone remove
    desc_div.className = 'task-desc'
    icon_div.className = 'task-icon'
    icon.className = 'ri-delete-bin-6-line ri-xl remove'
    
    // adiciona a tarefa 
    
    input.type = 'checkbox'
    input.className = 'check'

    label.appendChild(input)
    label.appendChild(span)
    check_div.appendChild(label)
    

    task_div.appendChild(check_div)
    desc_div.innerText = task
    task_div.appendChild(desc_div)
    icon_div.appendChild(icon)
    task_div.appendChild(icon_div)

    task_container.appendChild(task_div)

    
}


