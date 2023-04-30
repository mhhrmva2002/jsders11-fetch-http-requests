let rowBox = document.querySelector("#rowBox");
let API_URL = 'https://jsonplaceholder.typicode.com/posts';
let editModal = document.querySelector("#edit-category-modal");
let EditCloseModal = document.querySelector(".close-modal-edit");
let editBtn = document.querySelector(".edit-btn");
let editNameInput = document.querySelector("#edit-title");
let editDescInput = document.querySelector("#edit-body");
let editUserID = document.querySelector("#edit-userID");
function getUsers(API_URL) {
    // setTimeout(()=>{},5000)
    fetch(API_URL).then((res) => {
        rowBox.innerHTML = `<button class="btn btn-primary spin" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>`;
        return res.json();
    }).then((data) => {
        rowBox.innerHTML = "";
        data.forEach(user => {
            rowBox.innerHTML += `<div class="col-3 col-sm-4 mt-5">
            <div class="card">
            
            <div class="input-group">
            <input type="search" class="form-control rounded" placeholder="Search" />
            <button type="button" class="btn btn-outline-primary">search</button>
          </div>

            <div class="card-body">
            <ul class="list-group list-group-flush">
            <li class="list-group-item">${user.userId}</li>
            <li class="list-group-item">${user.id}</li>
            <li class="list-group-item"><a href="title.html">${user.title}</a></li>
            <li class="list-group-item">${user.body}</li>
                </ul>
                <div class="button d-flex ">
                <button class="edit" data-id="${user.id}" onclick="showModal(this)">edit</button>
                <button class="del" data-id="${user.id}">delete</button>
                </div>
                </div>
                </div>
                </div>
            `
        });
    })
}
getUsers(API_URL);

const editPostByID = async (id, post) => {
    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    fetch(`${API_URL}/${id}`).then(response => response.json())
        .then(data => console.log(data))
}

//get editing data values
function showModal(e) {
    let id = e.getAttribute("data-id");
    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(data => {
            document.body.classList.add("modal-body");
            editModal.style.opacity = "1";
            editModal.style.visibility = "visible";
            editModal.style.transform = "translate(-50%,-50%) scale(1)";

            editNameInput.value = data.title;
            editDescInput.value = data.body;
            editUserID.value = data.userId
            editBtn.setAttribute("data-id", data.id);
        }
        )
}
editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let updatedPost = {
        title: editNameInput.value,
        body: editDescInput.value,
        userId: editUserID.value
    };
    let id = e.target.getAttribute("data-id");
    editPostByID(id, updatedPost)
    EditModalClose()
    //     fetch(`${API_URL}/${id}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     editPostByID(id,updatedPost)
    //   })
})
EditCloseModal.onclick = function () {
    EditModalClose();
};
function EditModalClose() {
    document.body.classList.remove("modal-body");
    editModal.style.opacity = "0";
    editModal.style.visibility = "hidden";
    editModal.style.transform = "translate(-50%,-50%) scale(0)";
}
