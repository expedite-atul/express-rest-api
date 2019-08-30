const express = require('express');
const {getAllUsers,postUsers,getUser,update,deletes,validationRes} = require('./../controllers/controller');
const {signup,login,users} = require('./../controllers/authController');
/**
* routes only without params or query string
*/
const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/users',users);
    

router
    .route('/')
    .get(getAllUsers)
    .post(validationRes,postUsers)

/**
 * refracted routes only for req.params
 */
router
    .route('/:id')
    .get(getUser)
    .put(validationRes,update)
    .delete(deletes)


module.exports = router;    



