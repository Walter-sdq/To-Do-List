'use strict'

const controls = document.querySelector('.controls')
const todo_title = document.querySelector('#todo-title')
const todoList = document.getElementById('todo_render')
const duedate = document.getElementById('duedate')
const new_todo = document.querySelector('.new_todo')


let todos;
const savedTodos = JSON.parse(localStorage.getItem('todos'))
if (Array.isArray(savedTodos)) {
    todos = savedTodos
} else {
    todos = [{
        title: 'Build todo list',
        due: '2024-02-20',
        id: 'id0'
    }]
}

render()

function delTodo(event) {

    const delbtn = event.target
    const idToRemove = delbtn.id

    todos = todos.filter(function (todos) {

        if (todos.id === idToRemove) {
            return false
        } else {
            return true
        }
    })

    saveTodoList()

    render()
}

function render() {
    todoList.innerHTML = ''
    todos.forEach(function (todos) {
        const todo = document.createElement('div')
        const todo_list = document.createElement('p')
        const todo_list_date = document.createElement('p')
        const delbtn = document.createElement('button')
        const chkbx = document.createElement('input')


        // ischeck = chkbx.value

        chkbx.type = 'checkbox'
        chkbx.style = 'margin-left:10px;height: 44px;width: 20px;'
        chkbx.className = 'chkbx'
        delbtn.innerText = 'Remove'
        delbtn.id = todos.id
        todo_list.innerText = `${todos.title}`
        todo_list_date.innerText = `${todos.due}`
        todoList.appendChild(todo)
        todo.appendChild(todo_list)
        todo.appendChild(todo_list_date)
        todo.appendChild(delbtn)
        todo.appendChild(chkbx)
        delbtn.onclick = delTodo

    })
}

function addTodo() {
    const id = '' + new Date().getTime()

    todos.push({
        title: todo_title.value,
        due: duedate.value,
        id: id
    })

    render()
    saveTodoList()
    todo_title.value = ''; duedate.value = ''

    if (screen.width < 600) {
        console.log('condition met');
        setTimeout(() => {
            new_todo.style = 'background-color: rgb(37 84 238 / 46%);transition: .5s ease-out'
            controls.style = 'display: none'
        }, 5000);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo()
    }
})


function saveTodoList() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

new_todo.addEventListener('click', () => {
    controls.style = 'display: flex'
    new_todo.style = 'background-color: rgb(37 84 238);transition: .5s ease-out'
})

new_todo.style = 'background-color: rgb(37 84 238 /46%);transition: .5s ease-out'