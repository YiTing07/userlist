const BASE_URL = 'https://user-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/users'
const SHOW_USER_URL = BASE_URL + '/api/v1/users/'

const users = []

const dataPanel = document.querySelector('#data-panel')


function renderUserList (data) {
  contentHTML = ''

  data.forEach((item) => {
    contentHTML += `
    <div class="card m-2" style=" width: 10rem" data-bs-toggle="modal" data-bs-target="#user-modal">
      <img class="card-img-top" src="${item.avatar}" alt="Card image cap" data-id="${item.id}">
      <div class="card-body">
         <h6 class="card-title">${item.name + ' ' +item.surname}</h6>
      </div>
    </div>
  `
  })
  dataPanel.innerHTML = contentHTML
}

function showUserInfo (id) {
  const  modalTitle = document.querySelector('#user-modal-title')
  const  modalAvatar = document.querySelector('#user-modal-avatar')
  const  modalEmail = document.querySelector('#user-modal-email')
  const  modalGender = document.querySelector('#user-modal-gender')
  const  modalAge = document.querySelector('#user-modal-age')
  const  modalRegion = document.querySelector('#user-modal-region')
  const  modalBirthday = document.querySelector('#user-modal-birthday')

  axios.get(SHOW_USER_URL + id)
    .then((response) => {
      const data = response.data.results

      modalTitle.innerText = data.name + data.surname
      modalEmail.innerText = data.modalEmail
      modalGender.innerText = data.modalGender
      modalAge.innerText = data.age
      modalRegion.innerText = data.region
      modalAvatar.innerHTML = `
        <img src="${data.avatar}" alt="user image">
      `
    })
}

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if(event.target.matches('.card')) {
    showUserInfo(event.target.dataset.id)
  }
})


axios.get(INDEX_URL)
  .then((response) => {
    users.push(...response.data.results)
    renderUserList(users)
  })
  .catch((error) => console.log(error))