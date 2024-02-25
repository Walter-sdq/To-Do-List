
'use strict'

const todo_title = document.querySelector('#todo-title')
const todoList = document.getElementById('todo_render')
const duedate = document.getElementById('duedate')


let todos;
const savedTodos = JSON.parse(localStorage.getItem('todos'))
if (Array.isArray(savedTodos)) {
    todos = savedTodos
} else {
    todos = [{
        title: 'get yam',
        due: '2021-03-04',
        id: 'id0'
    },
    {
        title: 'get bread',
        due: '2021-04-09',
        id: 'id1'
    }]
}

render()

function delTodo(event) {

    const delbtn = event.target
    const idToRemove = delbtn.id

    console.log(event);

    todos = todos.filter(function (todos) {

        if (todos.id === idToRemove) {
            return false
            console.log('hi');
        } else {
            console.log('ki');
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
        delbtn.innerText = 'Remove item'
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
}

function saveTodoList() {
    localStorage.setItem('todos', JSON.stringify(todos))
}
