const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

update.addEventListener('click', _ => {
  fetch('/grades', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'class_average',
      grade: 72.2
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      window.location.reload(true)
    })
})


deleteButton.addEventListener('click', _ => {
    fetch('/grades', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'class_average'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No grade to delete') {
          messageDiv.textContent = 'No class_average grade to delete'
        } else {
          window.location.reload(true)
        }
      })
      .catch(console.error)
})
