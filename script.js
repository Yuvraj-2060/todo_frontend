async function submitTodo() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;

    const response = await fetch('http://localhost:8000/api/v1/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, status })
    });

    if (response.ok) {
        alert('ToDo added successfully');
        document.getElementById('todoForm').reset();
    } else {
        alert('Error adding ToDo');
    }
}

async function fetchTodos() {
    const response = await fetch('http://localhost:8000/api/v1/todo');
    const todos = await response.json();

    const tbody = document.querySelector('#todoTable tbody');
    tbody.innerHTML = '';

    todos.forEach(todo => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td>${todo.status}</td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('todoTable').style.display = 'table';
}
