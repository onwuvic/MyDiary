const apiUrl = 'https://tranquil-harbor-77266.herokuapp.com/api/v1';
const token = window.localStorage.getItem("token");
const contentView = document.getElementById('main');

const diariesTemplate = (data) => `
<article class="card">
    <a href="diary.html">
        <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <div class="card-more">
                <small class="card-date">Created ${data.created_at}</small>
                <div class="view-more">
                    <a href="diary.html">View</a>
                    <a href="edit.html">Edit</a>
                    <a href="#">Delete</a>
                </div>
                <i class="fa fa-ellipsis-v" id="more-info"></i>
            </div>
            <p>${data.body}</p>   
        </div>
    </a>
</article>
`;

let model = {
    diaries: []
}

function view(model) {
    const diaryHTML = model.diaries.reduce((html, diary) => html + diariesTemplate(diary), '');
    return `${diaryHTML} 
    <a href="new.html" class="btn-circle" title="Create New Diary">
        <i class="fa fa-plus fa-lg"></i>
    </a>`;
}

function controller(model) {
    getAllDiary()
        .then((data) => {
            model.diaries = data.data;
            if(model.diaries.length < 1) {
                contentView.innerHTML = `
                <h3 class="text-center">You have no diary entry</h3> 
                <h4 class="text-center">Get started by creating one!!!</h4>
                <a href="new.html" class="btn-circle" title="Create New Diary">
                    <i class="fa fa-plus fa-lg"></i>
                </a>
                `; 
            } else {
                contentView.innerHTML = view(model);
            }  
        }).catch((error) => console.log(error));
}

function getAllDiary() {
    return fetch(`${apiUrl}/entries`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((res) => res.json());
}

document.addEventListener('DOMContentLoaded', () => {
    controller(model);
});

