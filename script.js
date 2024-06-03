async function submitTodo() {
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;

    const response = await fetch('http://localhost:8000/api/v1/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, date,description, status })
    });

    if (response.ok) {
        alert('ToDo added successfully');
        document.getElementById('todoForm').reset();
        fetchTodos(); // Fetch todos again to update the list
    } else {
        alert('Error adding ToDo');
    }
}

async function fetchTodos() {
    const response = await fetch('http://localhost:8000/api/v1/todo');
    const todos = await response.json();

    const todoContainer = document.getElementById('todoContainer');
    todoContainer.innerHTML = '';

    todos.forEach(todo => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = todo.title;

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = todo.description;

        const status = document.createElement('p');
        status.classList.add('card-text');
        status.textContent = `Status: ${todo.status}`;

        const setStatusBtn = document.createElement('button');
        setStatusBtn.classList.add('btn', 'btn-primary', 'mr-2');
        setStatusBtn.textContent = 'Set Status';
        setStatusBtn.onclick = () => setStatus(todo.id, todo.status);

        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(status);
        cardBody.appendChild(setStatusBtn);

        card.appendChild(cardBody);
        todoContainer.appendChild(card);
    });
}  
async function setStatus(todoId, currentStatus) {
    const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';
    const response = await fetch(`http://localhost:8000/api/v1/todo/setStatus/${todoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
    });

    if (response.ok) {
        alert('Status updated successfully');
        fetchTodos(); // Fetch todos again to update the list
    } else {
        alert('Error updating status');
    }
}


// Fetch todos on page load
window.onload = fetchTodos;
