const express = require('express');
const Router = express.Router();
const UserController = require('../controller/userController');
const auth = require('../middleW/auth');


Router.get('/',function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Request</h1>');

});

/*POST*/

Router.post('/register/',UserController.register); // DONE
Router.post('/login/',UserController.login);// DONE
Router.post('/apply/',UserController.apply);// DONE
Router.post('/annonce/',UserController.AddOffer);// DONE
Router.post('/history/',UserController.AddHistory);// DONE

/*GET*/

Router.get('/offer/',UserController.offer);// DONE
Router.get('/me',auth,UserController.getUserProfile);//DONE
Router.get('/user/',UserController.user);// DONE
Router.get('/history',UserController.historique); // DONE
Router.get('/api/user/history', UserController.getHistoryByUsername);

/*UPDATE*/

Router.put('/:id/update', UserController.update);

/*DELETE*/

Router.delete('/:id/delete/',UserController.deleteUser)


module.exports = Router;



