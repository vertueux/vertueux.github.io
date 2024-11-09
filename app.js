async function fetchFiles () {
  const response = await fetch('papers/list-files.json')
  const files = await response.json()
  const list = document.getElementById('file-list')
  files.forEach(file => {
    if (file.endsWith('.pdf')) {
      const listItem = document.createElement('li')
      const link = document.createElement('a')
      link.href = `papers/${file}`
      link.textContent = file
      link.target = '_blank'
      listItem.appendChild(link)
      list.appendChild(listItem)
    }
  })
}
fetchFiles()
