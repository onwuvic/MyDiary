/**
 *  @credits for this Vanilla JS MVC Pattern goes to https://www.youtube.com/watch?v=ZBilSF7Oi1k&t=1s
 */
const jwt = new JwtHelper();
const app = new App(jwt);
const api = new Api();

app.mount('#app');

const router = new Router(app, '/');
router.addRouter('login', '^/$');
router.addRouter('signup', '^/signup$');
router.addRouter('diaries', '^/diary$');
router.addRouter('diary', '^/diary/(.*)$');
router.addRouter('newDiary', '^/new$');
router.addRouter('edit', '^/edit/(.*)$');
router.addRouter('delete', '^/delete/(.*)$');
router.addRouter('notification', '^/notification$');
router.addRouter('profile', '^/profile$');
router.addRouter('settings', '^/settings$');