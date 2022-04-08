const express = require('express');
const router = express.Router();
const passport = require('passport');

const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha('6LfKhU4cAAAAALzZ1iEKsqfmLe-FmeCeK9kkEStt', '6LfKhU4cAAAAAH54cUaQJFEaHqmm-a0mwGaCA5Or');

const { getHashedPassword, randomText, generateAuthToken } = require('../lib/function');
const { checkUsername, addUser } = require('../database/db');
const { notAuthenticated, captchaRegister, captchaLogin } = require('../lib/auth');
const jwt = require('jsonwebtoken');
const { User } = require('../database/model');
const nodemailer = require('nodemailer');
const mail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'zulrestapi@gmail.com',
        pass: 'zulganz123'
    },
    secureConnection: 'false',
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false

    }
});

let EMAIL_SECRET = generateAuthToken();

router.get('/', notAuthenticated, recaptcha.middleware.render, (req, res) => {
    res.render('login', {
        recaptcha: res.recaptcha,
        layout: 'layouts/main'
    });
});

router.get('/login', notAuthenticated, recaptcha.middleware.render, (req, res) => {
    res.render('login', {
        recaptcha: res.recaptcha,
        layout: 'layouts/main'
    });
});

router.post('/login', recaptcha.middleware.verify, captchaLogin, (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/docs',
            failureRedirect: '/users/login',
            failureFlash: true,
        })(req, res, next);
});

router.get('/register', notAuthenticated, recaptcha.middleware.render, (req, res) => {
    res.render('register', {
        recaptcha: res.recaptcha,
        layout: 'layouts/main'  
    });
});


router.post('/register', recaptcha.middleware.verify, captchaRegister, async (req, res) => {
    try {
        let {username, email, password, confirmPassword } = req.body;
        if (password.length < 6 || confirmPassword < 6) {
            req.flash('error_msg', 'Password must be at least 6 characters');
            res.redirect('/users/register');
        }
        if (password === confirmPassword) {
            let checking = await checkUsername(username);
            if(checking) {
                req.flash('error_msg', 'A user with the same Username already exists');
                res.redirect('/users/register');
            } else {
                const token = jwt.sign({ username, email, password }, EMAIL_SECRET, { expiresIn: '20m' });
                const data = {
                    from: 'Verify Your email <noreply@zul.com>',
                    to: email,
                    subject: 'Confirm your email',
                    html: `<h1>Please confirm your email</h1>
                    <p>Click the link below to confirm your email</p>
                    <p>This Email Will expire in 20 menit<p>
                    <a href="${req.headers.host}/users/confirmation/${token}" style="color:#000;text-decoration:none">Verify Email</a>`
                }
                mail.sendMail(data, (err, info) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(info);
                    }
                });
                req.flash('success_msg', 'Please check your email to verify');
                res.redirect('/users/register');
            }
        } else {
            req.flash('error_msg', 'Passwords do not match');
            res.redirect('/users/register');
        }
    } catch(err) {
        console.log(err);
    }
})

router.get('/confirmation/:token', async (req, res) => {
    try {
      let user = jwt.verify(req.params.token, EMAIL_SECRET);
        let hashedPassword = await getHashedPassword(user.password);
        let { username } = user;
        let apikey = randomText(12);
        await addUser(username, hashedPassword, apikey);
        req.flash('success_msg', 'You are now registered');
        res.redirect('/users/login');
    } catch (e) {
        console.log(e)
      res.send('error');
    }
  });

router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/users/login');
});

module.exports = router;
