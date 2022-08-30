const userName = {
    name
};
document.addEventListener("keypress", (tecla) => {
    if (tecla.key === "Enter") {
        const button = document.querySelector(".bottom-bar ion-icon");
        button.click();
    }
});
function registerUser() {
    userName.name = document.querySelector(".nome").value;
    if (userName.name !== '') {
        const requisicao = axios.post(
            "https://mock-api.driven.com.br/api/v6/uol/participants",
            userName
        );

        console.log(requisicao);

        requisicao.then(enterChat);
        requisicao.catch(registerUser);
    }
}
function enterChat() {
    setInterval(keepAlive, 5000);
    setInterval(getMessages, 3000);
    const mensagens = document.querySelector(".messages");
    mensagens.classList.remove("hidden");
    const topbar = document.querySelector(".top-bar");
    topbar.classList.remove("hidden");
    const bottombar = document.querySelector(".bottom-bar");
    bottombar.classList.remove("hidden");
    const home = document.querySelector(".home");
    home.classList.add("hidden");
}
function getMessages(resposta) {
    let message = {};
    const promessa = axios.get(
        "https://mock-api.driven.com.br/api/v6/uol/messages"
    );
    const mensagens = document.querySelector(".messages");
    promessa.then((promessa) => {
        mensagens.innerHTML = '';
        for (let i = 0; i < promessa.data.length; i++) {
            message = promessa.data[i];
            mensagens.innerHTML +=
                `<div class=${message.type}>
                    <div class="time">
                        (${message.time})
                    </div>
                    <a>${message.from}</a> para <a>${message.to}:</a>
                    ${message.text}`;
        }
        mensagens.scrollIntoView({
            block: "end",
            inline: "end",
            behavior: "smooth"
        });
    });

}

function keepAlive() {
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", userName);
}

function sendMessage() {
    const elementoTexto = document.querySelector(".bottom-bar input");
    console.log("botão funciona");
    console.log(elementoTexto.value);
    const message = {
        from: userName.name,
        to: 'Todos',
        text: elementoTexto.value,
        type: 'message'
    };
    const resposta = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/messages",
        message
    );
    resposta.then(getMessages);
    resposta.catch(window.location.reload);
}
