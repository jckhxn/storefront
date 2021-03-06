import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import { getToken, isAuth, isAdmin } from '../util';

const router = express.Router();


router.post('/')

router.get('/list', async (req,res) => {
  const users = await User.find({});
 if(users)
 { 
  
   
  res.send({users})
 }
  
  })

router.put('/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.coupon = req.body.coupon || user.coupon;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

router.post('/signin', async (req, res) => {

  const signinUser = await User.findOne({
    email: req.body.email
  });
  if (signinUser) {
    
    if (bcrypt.compareSync(req.body.password, signinUser.password)) 
    {
      console.log("hash true")
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      coupon:signinUser.coupon,
      token: getToken(signinUser),
    });
   return;
  }
 }

    res.status(401).send({ message: 'Invalid Email or Password.' });
  
});

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ message: 'Invalid User Data.' });
  }
});

// router.get('/createadmin', async (req, res) => {
//   try {
//     const user = new User({
//       name: 'Basir',
//       email: 'admin@example.com',
//       password: '1234',
//       isAdmin: true,
//     });
//     const newUser = await user.save();
//     res.send(newUser);
//   } catch (error) {
//     res.send({ message: error.message });
//   }
// });

export default router;
