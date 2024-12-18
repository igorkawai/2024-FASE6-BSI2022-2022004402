const userName = document.getElementById('user-name')
const viewButton = document.getElementById('view-button')
const viewDialog = document.getElementById('view-dialog')
const editButton = document.getElementById('edit-button')
const editDialog = document.getElementById('edit-dialog')
const userDataEdit = document.getElementById('user-data-edit')
userDataEdit.dataset.id = localStorage.getItem('userId')

viewButton.addEventListener('click', () => {
    document.getElementById('user-mail-dialog').innerText = localStorage.getItem('userEmail')
    document.getElementById('user-name-dialog').innerText = localStorage.getItem('userName')
    viewDialog.showModal()
})

document.getElementById('view-close-button').addEventListener('click', () => viewDialog.close() )

editButton.addEventListener('click', () => {
    refreshUserDataEdit()
    editDialog.showModal()
})

document.getElementById('edit-close-button').addEventListener('click', () => editDialog.close() )

function refreshUserDataEdit() {
    userDataEdit.name.value = localStorage.getItem('userName')
    userDataEdit.email.value = localStorage.getItem('userEmail')
    userDataEdit.password.value = ''
}

function refreshUserDataStorage(newUserData) {
    localStorage.setItem('userName', newUserData.name.value)
    localStorage.setItem('userEmail', newUserData.email.value)
}

document.addEventListener('submit', async (event) => {
    event.preventDefault()
    const action = event.submitter.dataset.action ?? null
    
    if (action === 'discard') {
        refreshUserDataEdit()
        editDialog.close()
    }

    const currentForm = event.target

    if (action === 'update') {
        const id = currentForm.dataset.id
        const method = 'PUT'
        const url = `/users/${id}`
        const headers = { 'Content-Type': 'application/json' }
        const name = currentForm.name.value
        const email = currentForm.email.value
        const password = currentForm.password.value
        const body = JSON.stringify({ name, email, password })
        const response = await fetch(url, { method, headers, body })
        if (!response.ok) return console.error('Error:', response.statusText)
        refreshUserDataStorage(currentForm)
        currentForm.password.value = ''
        return
    }

     if (action === 'delete') {
        document.getElementById('alert-message').innerText = 'Tem certeza que deseja excluir permanentemente sua conta?'
        document.getElementById('true-button').innerText = 'Excluir'
        document.getElementById('false-button').innerText = 'Cancelar'
        document.getElementById('alert-dialog').showModal()
        const id = currentForm.dataset.id
        const method = 'DELETE'
        const url = `/users/${id}`
        const response = await fetch(url, { method })
        if (!response.ok) return console.error('Error:', response.statusText)
        localStorage.clear()
        location.href = '/index.html'
        return
    }
  })