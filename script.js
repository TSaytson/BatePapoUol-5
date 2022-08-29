function registerUser() { 

    const userName = {
        name: prompt('Digite seu nome:')
    }
    console.log(userName);
    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userName);
    console.log(requisicao);
    requisicao.then(getMessages);
    requisicao.catch(registerUser);
}

function getMessages(resposta) {
    let message = {};
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then((promessa) => {
        for (let i = 0; i < promessa.data.length; i++){
            message = promessa.data[i];
        }
    });
    console.log(message);
}

registerUser();