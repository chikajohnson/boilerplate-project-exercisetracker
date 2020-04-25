const app = require('express');
const { CreateUser, GetAllUsers, AddExcercise, GetExercises } = require('./routes');

const router = app.Router();


router.post('/api/exercise/new-user', CreateUser);
router.get('/api/exercise/users', GetAllUsers);
router.post('/api/exercise/add', AddExcercise);
router.get('/api/exercise/log', GetExercises);



module.exports = router;