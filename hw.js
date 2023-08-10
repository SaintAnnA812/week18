const allTasks = document.getElementById('allTasks');
const newTask = document.getElementById('newTask');
const btnAdd = document.getElementById('btnAdd');
const btnClear = document.getElementById('btnClear');

const onAddNewTask = () => {
    const localStorageTasks = localStorage.getItem('tasklist') || '';
    const localStorageArray = localStorageTasks.split(';').filter((item) => item !== '').map((item) => JSON.parse(item));
    const newElement = {
        id: localStorageArray.length + 1,
        value: newTask.value,
        checked: false,
    }
    localStorage.setItem('tasklist', localStorageTasks + JSON.stringify(newElement) + ';');
    newTask.value = '';
    renderList();

}
const renderList = () => {
    const localStorageTasks = localStorage.getItem('tasklist') || null;
    if (!localStorageTasks) {

        allTasks.innerHTML = 'Нет задач';
        return;
    }
    let taskHtml = '';
    const tasksArray = localStorageTasks.split(';').filter((item) => item !== '').map((item) => JSON.parse(item));
    tasksArray.forEach((task) => {
        taskHtml += `<div id='${task.id}'>${task.value}<input class='checkbox' type='checkbox' ${task.checked ? 'checked' : ''}</div><br/>`
    })

    allTasks.innerHTML = taskHtml;
    addFuncToCheckBox()
}
const clearList = () => {
    localStorage.setItem('tasklist', '');
    renderList();
}


const addFuncToCheckBox = () => {
    const localStorageTasks = localStorage.getItem('tasklist');
    const tasksArray = localStorageTasks.split(';').filter((item) => item !== '').map((item) => JSON.parse(item));

    const allCheckboxes = document.querySelectorAll('.checkbox');
    allCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', (e) => {
            const id = Number(e.currentTarget.parentElement.id);
            const currentCheckboxValue = localStorageArray[id - 1].checked;
            localStorageArray[id - 1].checked = !currentCheckboxValue;
            let string = '';
            localStorageArray.forEach((item) => {
                string = string + JSON.stringify(item) + ';';
            })
            localStorage.setItem('tasklist', string);
        })
    });

}

renderList();