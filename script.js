const userName = {
    name: name
}

function registerUser() {
    userName.name = prompt('Digite seu nome: ');
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userName);
    console.log(userName);
    
    console.log(requisicao);

    requisicao.then(getMessages);
    requisicao.catch(registerUser);
}

function getMessages(resposta) {
    let message = {};
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then((promessa) => {
        const mensagens = document.querySelector(".messages");
        console.log(promessa);
        for (let i = 0; i < promessa.data.length; i++) {
            message = promessa.data[i];
            if (message.type === 'private-message' && message.to === userName.name) {
                mensagens.innerHTML +=
                    `<div class=${message.type}>
                    <div class="time">
                        (${message.time})
                    </div>
                    <a>${message.from}</a> para <a>${message.to}:</a>
                    ${message.text}`
            } else if (message.type !== 'private-message') {
                mensagens.innerHTML +=
                    `<div class=${message.type}>
                    <div class="time">
                        (${message.time})
                    </div>
                    <a>${message.from}</a> para <a>${message.to}:</a>
                    ${message.text}`
            }

        }
        mensagens.scrollIntoView({block:"end", inline:"end", behavior:"smooth"});
    });
}

function keepAlive(userName) {
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userName);
}

function sendMessage() {
    elementoTexto = document.querySelector("input");
    console.log('botão funciona');
    const message = {
        from: userName.name,
        to: 'Todos',
        text: elementoTexto.value,
        type: 'message'
    }
    const resposta = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', message);
    resposta.then(getMessages);
    resposta.catch(window.location.reload);
}

//registerUser();
//setInterval(stillConnected, 5000);
//setInterval(getMessages, 3000);