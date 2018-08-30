const template = {
    loginTemplate: `
        <div class="container-flex">
            <header>
                <div>
                    <!-- BRAND NAME -->
                    <div class="navbar-brand">
                        <h2>MyDiary</h2>
                    </div>
                </div>
            </header>
            <section class="form form-sm">
                <h3 class="font-weight-normal text-center">Login</h3>
                <div id="error-message" class="text-center error"></div>
                <form id="loginForm">
                    <div>
                        <label for="email" class="read-only">Email</label>
                        <input type="email" id="email" placeholder="Email" required>
                    </div>
                    <div>
                        <label for="password" class="read-only">Password</label>
                        <input type="password" id="password" placeholder="Password" required>
                    </div>
                    <button type="submit" id="button" class="btn btn-info">Login</button>
                    <p id="loader" class="text-center spinner">Loading...</p>
                </form>
                <p class="text-center">Don't have an account <a href="#/signup" class="login-color">Sign Up</a></p>
            </section>
            <footer>
                <p>MyDiary &copy; 2018.</p>
            </footer>
        </div>
    `,

    signupTemplate: `
        <div class="container-flex">
            <header>
                <div>
                    <!-- BRAND NAME -->
                    <div class="navbar-brand">
                        <h2>MyDiary</h2>
                    </div>
                </div>
            </header>
            <section class="form form-sm">
                <h3 class="font-weight-normal text-center">Sign Up</h3>
                <div id="error-message" class="text-center error"></div>
                <form id="signupForm">
                    <div>
                        <label for="firstname" class="read-only">First Name</label>
                        <input type="text" id="firstname" placeholder="First Name" required>
                    </div>
                    <div>
                        <label for="lastname" class="read-only">Last Name</label>
                        <input type="text" id="lastname" placeholder="Last Name" required>
                    </div>
                    <div>
                        <label for="email" class="read-only">Email</label>
                        <input type="email" id="email" placeholder="Email" required>
                    </div>
                    <div>
                        <label for="password" class="read-only">Password</label>
                        <input type="password" id="password" placeholder="Password" required>
                    </div>
                    <button type="submit" id="button" class="btn btn-info">Sign Up</button>
                    <p id="loader" class="text-center spinner">Loading...</p>
                </form>
                <p class="text-center">Already have an account <a href="#/" class="login-color">Login</a></p>
            </section>
            <footer>
                <p>MyDiary &copy; 2018.</p>
            </footer>
        </div>
    `,

    diaryTemplate: (diary) => `
        <article class="card">
            <a href="#/diary/${diary.id}">
                <div class="card-body">
                    <h5 class="card-title">${diary.title}</h5>
                    <div class="card-more">
                        <small class="card-date">Created ${diary.created_at}</small>
                        <div class="view-more">
                            <a href="#/diary/${diary.id}">View</a>
                            <a href="#/edit/${diary.id}">Edit</a>
                            <a href="#/delete/${diary.id}">Delete</a>
                        </div>
                        <i class="fa fa-ellipsis-v" id="more-info"></i>
                    </div>
                    <p>${diary.body}</p>   
                </div>
            </a>
        </article>
    `,
    
    noDiaryTemplete: `
        <div>
            <h3 class="text-center">You have no diary entry</h3> 
            <h4 class="text-center">Get started by creating one!!!</h4>
        </div>
    `,

    singleDiaryTemplate: (diary) => `
        <article>
            <h1 class="text-center">${diary.title}</h1>
            <div class="card-single" id="more-content">
                <small class="card-date">Created ${diary.created_at}</small>
                <div class="view-single">
                    <a href="#/edit/${diary.id}">Edit</a>
                    <a href="#/delete/${diary.id}">Delete</a>
                </div>  
                <i class="fa fa-ellipsis-v" id="more-information"></i>
            </div>
            <p class="paragraph">${diary.body}</p>
        </article>
    `,

    navBarTemplate: `
        <div class="dropdown-menu">
            <span id="open-menu" class="pointer">
                <svg width="30" height="30">
                    <path d="M0,5 30,5" stroke="#000" stroke-width="5" />
                    <path d="M0,14 30,14" stroke="#000" stroke-width="5" />
                    <path d="M0,23 30,23" stroke="#000" stroke-width="5" />
                </svg>
            </span>
        </div>
        <!-- BRAND NAME -->
        <div class="navbar-brand">
            <a href="#/diary" class="h2">MyDiary</a>
        </div>
        <!-- NAVIGATION -->
        <nav class="navbar-grid-equal">
            <span id="logout" class="pointer">
                <i class="fa fa-sign-out-alt fa-lg"></i>
                Logout
            </sapn> 
        </nav>
    `,

    sideNavBarTemplate: (user) => `
        <!-- SIDE-BAR MENU -->
        <nav class="side-navbar" id="side-menu">
            <div class="navbar-brand navbar-grid-menu">
                <h2>MyDiary</h2>
                <span class="btn-close pointer" id="close-menu">
                    &times;
                </span>
            </div>
            <div class="divider"></div>
            <a href="#/profile" class="profile-avatar">
                <img src="image/avatar.png" class="img-circle" alt="profile picture">
                <span id="user-detail"><strong>${user.lastname} ${user.firstname}</strong></span>
            </a>
            <div class="divider"></div>
            <a href="#/new">
                <i class="fa fa-plus fa-lg"></i>
                Create New Diary
            </a>
            <a href="#/diary">
                <i class="fa fa-atlas fa-lg"></i>
                All Diaries
            </a>
            <div class="divider"></div>
            <a href="#/notification">
                <i class="fa fa-bell fa-lg"></i>
                <span class="notify-count notify-available">9</span>
                Notifications
            </a>
            <a href="#/settings">
                <i class="fa fa-cog fa-lg"></i>
                Settings
            </a> 
        </nav>
    `,
    
    newDiaryButton: `
        <a href="#/new" class="btn-circle" title="Create New Diary">
            <i class="fa fa-plus fa-lg"></i>
        </a>
    `,
    
    createDiaryForm: `
        <form id="createDiaryForm" class="form form-md">
            <div id="error-message" class="text-center error"></div>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" placeholder="Title">
            </div>
            <div class="form-group">
                <label for="body">Dear Diary</label>
                <textarea rows="5" id="body"></textarea>
            </div>
            
            <button type="submit" id="button" class="btn btn-info">Save</button>
            <p id="loader" class="text-center spinner">Creating...</p>
        </form>
    `,

    editDiaryForm: (diary) => `
        <form id="updateDiaryForm" class="form form-md">
            <div id="error-message" class="text-center error"></div>
            <input type="text" id="id" value="${diary.id}" hidden>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" placeholder="Title" value="${diary.title}">
            </div>
            <div class="form-group">
                <label for="body">Dear Diary</label>
                <textarea rows="5" id="body">${diary.body}</textarea>
            </div>
            
            <button type="submit" id="button" class="btn btn-info">Save Update</button>
            <p id="loader" class="text-center spinner">Updating...</p>
        </form>
    `,

    notificationTemplate: (notify) => `
        <div>
            <small class="card-date">${notify.created_at}</small>
            <p>${notify.message}</p>
        </div>
        <div class="divider"></div>
    `,

    noNotificationTemplate: `
        <div>
            <h3 class="text-center">You have no notification</h3>
        </div>
    `,

    profileTemplate: (user) => `
        <div>
            <h4>Diary</h4>
            <div class="divider"></div>
            <div class="list">
                <p><strong>Total Number of User Diary</strong></p>
                <p><strong class="entry-count">6</strong></p>
            </div>
            <h4>User Profile</h4>
            <div class="divider"></div>
            <div class="list">
                <p>First Name</p>
                <p>${user.firstname}</p>
            </div>
            <div class="list">
                <p>Last Name</p>
                <p>${user.lastname}</p>
            </div>
            <div class="list">
                <p>Username</p>
                <p>-----</p>
            </div>
            <div class="list">
                <p>Email Address</p>
                <p>${user.email}</p>
            </div>
        </div>
    `,

    settingTemplate: `
        <div>
            <h4>General Settings</h4>
            <div class="divider"></div>
            <form>
                <div class="form-group form-horizontal">
                    <label for="reminder">Set Reminder</label>
                    <input type="checkbox" id="reminder">
                </div>
                <button type="submit" id="button" class="btn btn-info">Set Reminder</button>
            </form>
        </div>
    `,

    footerTemplate: `
        <footer class="footer">
            <p>MyDiary &copy; 2018.</p>
        </footer>
    `

}