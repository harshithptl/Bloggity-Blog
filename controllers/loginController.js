const db = require('../models/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// Redirecting according to authenticated user
const redirectLogin = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.user_id) {
        res.redirect('/blogs');
    } else {
        next();
    }
}

// Login and Sign-Up Controllers
const login_home = (req, res) => {
    if (req.status == 403) {
        res.render('login', { message: "Invalid combination of email and password" });
    }
    else {
        res.render('login');
    }
}

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    query=db.Users.find({email:`${email}`});
    query.then(result => {
            
            if (result.length == 0) {
                db.log(`No user found for ${email}`);
                res.status(403).render('login', { message: "Invalid combination of email and password" });
            }
            else {

                const password_check = bcrypt.compareSync(password, result[0].password.toString());

                if (password_check == false) {
                    db.log(`Incorrect password for ${email}`);
                    res.status(403).render('login', { message: "Invalid combination of email and password" });
                }
                else {
                    db.log(`User login successful for ${email}`);
                    req.session.name = result[0]['name'];
                    req.session.user_id = result[0]['id'];
                    req.session.linkedin = result[0]['linkedin'];
                    req.session.github = result[0]['github'];
                    req.session.flag = 0;
                    res.redirect(`/blogs`);
                }
            }
        })
}

const signup = (req, res) => {
    res.render('signup', { title: 'Enter details ' });
}

const create_user = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    var password = req.body.password;
    password = bcrypt.hashSync(password, saltRounds);


    const linkedin = req.body.linkedin;
    const github = req.body.github;

    query=db.Users.find({email:`${email}`});

    // Validation for user. If user does not exist accept details and create user
    query.then(result => {

            if (result.length > 0) {
                db.log(`User with ${email} exists`);
                res.status(403).render('login', { message: "User already exists. Please login!" });
            }
            else {
                const user = new db.Users({name:`${name}`,email:`${email}`,password:`${password}`,linkedin:`${linkedin}`,github:`${github}`});
                query=user.save();
                query.then(result => {
                        db.log(`Sign-Up for ${email} successful`);
                        res.render('login', { message: "Sign-Up Successful. Please login." });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });

}

// Destroying session upon Sign-Out
const signout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        db.log(`User Sign-Out successful for ${email}`);
        res.clearCookie('sid');
        res.redirect('/login');
    })
}


module.exports = {
    redirectLogin,
    redirectHome,
    login_home,
    login,
    signup,
    create_user,
    signout
}
