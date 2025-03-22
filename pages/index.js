const addBtn = document.getElementById('add');
const table = document.getElementById('table');


function getData(){
    fetch('http://localhost:3003/students', {method: "GET"})
        .then((data) => data.json())
        .then((data) => {
            // console.log(data);
            locationData(data);
        })
}
getData();

function locationData(data){
    addBtn.addEventListener('click', () => {
        console.log('click');
        drawPage(data);
    })
}

function drawPage(arr){
    arr.forEach(student => {
        const div = document.createElement('div');
        div.classList.add('table__item');
        const name = document.createElement('p');
        name.textContent = student.name;
        const gender = document.createElement('p');
        gender.textContent = student.gender;
        const physics = document.createElement('p');
        physics.textContent = student.physics;
        const maths = document.createElement('p');
        maths.textContent = student.maths;
        const english = document.createElement('p');
        english.textContent = student.english;

        const button = document.createElement('button');
        button.textContent = "Изменить";

        const age = document.createElement('p');
        age.textContent = student.object.age;

        div.append(name, gender, english, maths, physics, button, age);
        table.append(div)
    })
}
