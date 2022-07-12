const form = document.forms.imc
const inputs = form.getElementsByTagName('input')
const btn = document.getElementsByClassName('btn')[0]

btn.addEventListener('click', function(){
    const user = {
        nome: inputs[0].value,
        idade: inputs[1].value,
        peso: parseFloat(inputs[2].value.replace(',', '.')),
        altura: parseFloat(inputs[3].value) / 100,
    }
    let imc = user.peso / (user.altura * user.altura)
    console.log(user.peso)

    function validaInput(){
        for(let i = 0; i < inputs.length; i++){
            if(inputs[i].value === ''){
                alert(`Por favor, preencha seu ${inputs[i].name.toUpperCase()}`)
                return true
            }
        }
    }

    function createResp(msg, cor){
        // cria um uma div que mostrará resultado 
        
        const valid = validaInput()
        if (valid) return 

        const container = document.getElementsByClassName('container')[0]
        const div = document.createElement('div')
        const p = document.createElement('p')
        p.innerHTML = `Olá ${user.nome}, seu IMC é <i>${imc.toFixed(1)}</i> - <span>${msg}<span>`
        const span = p.getElementsByTagName('span')[0]
        span.style.color = cor

        if(container.lastElementChild.className == 'resultado') {
            container.removeChild(container.lastElementChild)
            div.className = 'resultado'
            div.appendChild(p)
            container.appendChild(div)
        }
        else {
            div.className = 'resultado'
            div.appendChild(p)
            container.appendChild(div)
        }
    }
    

    if(imc < 18.5){
       createResp('Abaixo do Peso', 'orange')
    }
    else if(imc >= 18.5 && imc < 24.9) {
        createResp('Peso normal', 'green')
    }
    else if(imc >= 25 && imc < 29.9){
        createResp('Sobrepeso', 'red')
    }
    else if(imc >= 30 && imc < 34.9){
        createResp('Obesidade grau I', 'red')
    }
    else if(imc >= 35 && imc < 39.9){
        createResp('Obesidade grau II', 'red')
    }
    else {
        createResp('Obesidade Mórbida', 'red')
    }
})

