const table = getById('table');

const containerCommandsArr = [
    {id: 1, command: "docker run", description: "Запуск нового контейнера"},
    {id: 2, command: "docker ps", description: "Список запущенных контейнеров"},
    {id: 3, command: "docker stop", description: "Остановка запущенного контейнера"},
    {id: 4, command: "docker start", description: "Запуск остановленного контейнера"},
    {id: 5, command: "docker restart", description: "Перезапуск контейнера"},
    {id: 6, command: "docker rm", description: "Удаление остановленного контейнера"},
    {id: 7, command: "docker logs", description: "Просмотр логов контейнера"},
    {id: 8, command: "docker exec", description: "Выполнение команды внутри контейнера"}
];
const terminalCommandsArr = [
    {id: 1, command: "mkdir nameFolder", description: "создание папки с названием nameFolder"},
    {id: 2, command: "rmdir nameFolder", description: "удаление папки с названием nameFolder"},
    {id: 3, command: "mv nameFolder newNameFolder", description: "переименовать папку"},
    {id: 4, command: "touch name.txt", description: "создать файл name.txt"},
    {id: 5, command: "rm name", description: "удалить файл"},
    {id: 6, command: "pwd", description: "показать текущую директорию"},
    {id: 7, command: "cd nameFolder", description: "сменить текущий каталог на домашний"},
    {id: 8, command: "cd ..", description: "перейти в родительский каталог"},
    {id: 9, command: "ls", description: "вывести список файлов и каталогов в текущем каталоге"}
];

function getById(id){
    return document.getElementById(id);
}

const changeButtons = getById('buttons');
const outCommands = getById('outCommands')
let title = getById('title');

function getData(){
    fetch('http://localhost:3003/commands', {method: "GET"})
        .then((data) => data.json())
        .then((data) => {
            // console.log(data);
            drawPage(data)
        })
}
getData();

changeButtons.addEventListener('click', (evt) => {
    evt.stopPropagation();
    if(evt.target !== evt.currentTarget) {
        title.textContent = evt.target.dataset.title;
        const id = evt.target.getAttribute('id')

        switch (id){
            case 'terminal':
                changeCommands(terminalCommandsArr);
                break;
            case "container":
                changeCommands(containerCommandsArr);
                break;
        }
    }
})
function changeCommands(commandsArr){
    fetch('http://localhost:3003/commands', {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(commandsArr),
    })
        .then((data) => {
            console.log(data);
            if(data.ok){
                console.log("Успешно создан");
            }
        })
        .then((data) => {
            data = "success";
            drawPage(commandsArr) // должна быть дата наверное????
        })
}

function drawPage(arr){
    outCommands.innerHTML = ""
    const title = getById('title');
    title.textContent = "Команды для работы с контейнерами";
    arr.forEach(command => {
        const tr = document.createElement('tr');
        const example = document.createElement('td');
        const exampleBtn = document.createElement('button');
        exampleBtn.textContent = "Terminal";
        const tdCommand = document.createElement('td');
        tdCommand.classList.add('commands__select');
        tdCommand.textContent = command.command;
        const tdDescription = document.createElement('td');
        tdDescription.textContent = command.description;

        example.append(exampleBtn)
        tr.append(example, tdCommand, tdDescription);
        outCommands.append(tr)
    })
}
