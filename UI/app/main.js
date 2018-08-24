/**
 *  This Vanilla JS MVC Pattern was gotten from https://www.youtube.com/watch?v=ZBilSF7Oi1k&t=1s
 */
const app = new App();
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
router.addRouter('settings', '^/settings$');