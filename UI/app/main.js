const app = new App();
const api = new Api();

app.mount('#app');

const router = new Router(app, '/');
router.addRouter('login', '^/$');
router.addRouter('signup', '^/signup$');
router.addRouter('diaries', '^/diary$');
router.addRouter('diary', '^/diary/(.*)$');
router.addRouter('newDiary', '^/new$');
