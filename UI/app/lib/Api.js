class Api {
    constructor() {
        this.API_URL = 'https://tranquil-harbor-77266.herokuapp.com/api/v1';
        this.token = window.localStorage.getItem("token");
        this.headers = new Headers({
                'Accept':'application/json. text/plain, */*',
                'Content-type':'application/json; charset=utf-8'
            });
    }

    signIn(email, password) {
        return fetch(`${this.API_URL}/users/login`, {
            method: 'POST',
            mode: 'cors',
            headers: this.headers,
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res) => res.json());
    }

    signUp(firstname, lastname, email, password) {
        return fetch(`${this.API_URL}/users/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password
            })
        })
        .then((res) => res.json());
    }

    getAllDiaries() {
        return fetch(`${this.API_URL}/entries`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this.token}`,
            }
        })
        .then((res) => res.json());
    }

    getOneDiaryById(id) {
        return fetch(`${this.API_URL}/entries/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this.token}`,
            }
        })
        .then((res) => res.json());
    }

    create(title, body) {
        return fetch(`${this.API_URL}/entries`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this.token}`,
            },
            body: JSON.stringify({
                title,
                body
            })
        })
        .then((res) => res.json()); 
    }


    
}