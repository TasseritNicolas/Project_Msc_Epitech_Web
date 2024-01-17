const models = require('../model');
var bcrypt = require('bcrypt');
var jwtUtils = require('../service/jwt.utils');
var asyncLib = require('async');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,12}$/;

module.exports = {

    //REGISTER

    register: function (req, res) {

        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var status = req.body.status;

        if (email == null || username == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        if (username.length >= 13 || username.length <= 4) {
            return res.status(400).json({'error': 'wrong username (must be length 5 - 12)'});
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({'error': 'email is not valid'});
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({'error': 'password invalid (must length 4 - 8 and include 1 number at least)'});
        }

        asyncLib.waterfall([
            function (done) {
                models.User.findOne({
                    attributes: ['email'],
                    where: {email: email}
                })
                    .then(function (userFound) {
                        done(null, userFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({'error': 'unable to verify user'});
                    });
            },
            function (userFound, done) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                        done(null, userFound, bcryptedPassword);
                    });
                } else {
                    return res.status(409).json({'error': 'user already exist'});
                }
            },
            function (userFound, bcryptedPassword, done) {
                var newUser = models.User.create({
                    email: email,
                    username: username,
                    password: bcryptedPassword,
                    status: status,
                    isAdmin: 0
                })
                    .then(function (newUser) {
                        done(newUser);
                    })
                    .catch(function (err) {
                        return res.status(500).json({'error': 'cannot add user'});
                    });
            }
        ], function (newUser) {
            if (newUser) {
                return res.status(201).json({
                    'userId': newUser.id,
                    'username': newUser.username,
                    'message': "New user create"

                });

            } else {
                return res.status(500).json({'error': 'cannot add user'});
            }
        });
    },

    //UPDATE

    update: function (req, res) {
        const id = req.params.id;
        const updates = req.body;

        if (!id) {
            return res.status(400).json({'error': 'User ID is missing'});
        }

        asyncLib.waterfall([
            function (done) {
                models.User.findByPk(id)
                    .then(function (user) {
                        if (user) {
                            done(null, user);
                        } else {
                            return res.status(404).json({'error': 'User not found'});
                        }
                    })
                    .catch(function (err) {
                        return res.status(500).json({'error': 'Unable to retrieve user'});
                    });
            },
            function (user, done) {
                // Check if password is present in updates and hash it
                if (updates.password) {
                    bcrypt.hash(updates.password, 5, function (err, bcryptedPassword) {
                        if (err) {
                            return res.status(500).json({'error': 'Unable to hash password'});
                        }
                        updates.password = bcryptedPassword;
                        user.update(updates)
                            .then(function (updatedUser) {
                                done(null, updatedUser);
                            })
                            .catch(function (err) {
                                return res.status(500).json({'error': 'Unable to update user'});
                            });
                    });
                } else {
                    user.update(updates)
                        .then(function (updatedUser) {
                            done(null, updatedUser);
                        })
                        .catch(function (err) {
                            return res.status(500).json({'error': 'Unable to update user'});
                        });
                }
            }
        ], function (err, updatedUser) {
            if (err) {
                return res.status(500).json({'error': 'Error updating user'});
            }

            return res.status(200).json({
                'id': updatedUser.id,
                'username': updatedUser.username,
                'message': 'User updated'
            });
        });
    },


    //DELETE
    deleteUser: function (req, res) {
        var userId = req.params.id;

        if (!userId) {
            return res.status(400).json({'error': 'User ID is missing'});
        }

        asyncLib.waterfall([
            function (done) {
                models.User.findByPk(userId)
                    .then(function (user) {
                        if (user) {
                            done(null, user);
                        } else {
                            return res.status(404).json({'error': 'User not found'});
                        }
                    })
                    .catch(function (err) {
                        return res.status(500).json({'error': 'Unable to retrieve user'});
                    });
            },
            function (user, done) {
                user.destroy()
                    .then(function () {
                        done();
                    })
                    .catch(function (err) {
                        return res.status(500).json({'error': 'Unable to delete user'});
                    });
            }
        ], function () {
            return res.status(200).json({
                'message': "User deleted"
            });
        });
    },

    //LOGIN

    login: function (req, res) {

        // Params
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        asyncLib.waterfall([
            function (done) {
                models.User.findOne({
                    where: {email: email}
                })
                    .then(function (userFound) {
                        done(null, userFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({'error': 'unable to verify user'});
                    });
            },
            function (userFound, done) {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                        done(null, userFound, resBycrypt);
                    });
                } else {
                    return res.status(404).json({'error': 'user not exist in DB'});
                }
            },
            function (userFound, resBycrypt, done) {
                if (resBycrypt) {
                    done(userFound);
                } else {
                    return res.status(403).json({'error': 'invalid password'});
                }
            }
        ], function (userFound) {
            if (userFound) {

                console.log("Success!");
                return res.status(201).json({
                    'userId': userFound.id,
                    'token': jwtUtils.generateTokenForUser(userFound),
                    'username': userFound.username,
                    'admin': userFound.isAdmin,
                    'status': userFound.status

                });
            } else {
                return res.status(500).json({'error': 'cannot log on user'});
            }
        });
    },
    //OFFER

    offer: async function (req, res) {

        const announces = await models.Offer.findAll();
        /*  console.log(announces);*/
        return res.status(201).json({announces});

    },

    //GET USER

    user: async function (req, res) {
        const user = await models.User.findAll();
        console.log(user);
        return res.status(201).json({"user": user});
    },
    getUserProfile: function (req, res) {
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
            return res.status(400).json({'error': 'wrong token'});

        models.User.findOne({
            attributes: ['id', 'email', 'username', 'status'],
            where: {id: userId}
        }).then(function (user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({'error': 'user not found'});
            }
        }).catch(function (err) {
            res.status(500).json({'error': 'cannot fetch user'});
        });
    },

    //APPLY

    apply: function (req, res) {

        var societe = req.body.societe;
        var postulant = req.body.postulant;
        var message = req.body.message;

        /*  console.log(societe);
          console.log(postulant);
          console.log(message);*/

        asyncLib.waterfall([

            function (done) {
                var newUser = models.History.create({
                    societe: societe,
                    postulant: postulant,
                    message: message,
                })
                    .then(function (newUser) {
                        done(newUser);
                    })
                    .catch(function (err) {
                        return res.status(500).json({'error': err});
                    });
            }
        ], function (newUser) {
            if (newUser) {
                return res.status(201).json({
                    'userId': newUser.id,
                    'message': "vous avez bien postuler"

                });


            } else {
                return res.status(500).json({'error': 'cannot add user'});
            }
        });
    },

    //ADD OFFER

    AddOffer: function (req, res) {

        // Params
        var societe = req.body.societe;
        var competence = req.body.competence;
        var intitule = req.body.intitule;
        var salaire = req.body.salaire;
        var description = req.body.description;
        var adresse = req.body.adresse;
        var referent = req.body.referent;
        var contrat = req.body.contrat;

        /*      console.log(societe);
              console.log(competence);
              console.log(intitule);
              console.log(salaire);
              console.log(description);
              console.log(adresse);
              console.log(referent);
              console.log(contrat);*/


        asyncLib.waterfall([


            function (done) {
                var newAnnonce = models.Offer.create({
                    societe: societe,
                    competence: competence,
                    intitule: intitule,
                    salaire: salaire,
                    description: description,
                    adresse: adresse,
                    referent: referent,
                    contrat: contrat
                })
                    .then(function (newAnnonce) {
                        done(newAnnonce);
                    })
                    .catch(function (err) {
                        return res.status(500).json({'error': err});
                    });
            }
        ], function (newAnnonce) {
            if (newAnnonce) {
                return res.status(201).json({
                    'message': "new announces create"

                });


            } else {
                return res.status(500).json({'error': 'cannot add announce'});
            }
        });
    },

    //ADD HISTORY

    AddHistory: function (req, res) {

        // Params
        var societe = req.body.societe;
        var postulant = req.body.postulant;
        var message = req.body.message;
        /*

                console.log(societe);
                console.log(postulant);
                console.log(message);
        */

        asyncLib.waterfall([


            function (done) {
                var newHistorique = models.History.create({
                    societe: societe,
                    postulant: postulant,
                    message: message
                })
                    .then(function (newHistorique) {
                        done(newHistorique);
                    })
                    .catch(function (err) {
                        return res.status(500).json({'error': err});
                    });
            }
        ], function (newHistorique) {
            if (newHistorique) {
                return res.status(201).json({
                    'message': "new historique create"

                });


            } else {
                return res.status(500).json({'error': 'cannot add historique'});
            }
        });
    },

    // HISTORY

    historique: async function (req, res) {

        const historique = await models.History.findAll();
        /*console.log(this.historique);*/
        return res.status(201).json({historique});

    },


// HISTORY USER
    getHistoryByUsername: async function(req, res) {
        const username = req.query.username;

        if (!username) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        try {
            const historiques = await models.History.findAll({
                where: { postulant: username }
            });

            if (historiques.length > 0) {
                return res.status(200).json({ historiques });
            } else {
                return res.status(404).json({ 'error': 'No history found for this username' });
            }
        } catch (err) {
            return res.status(500).json({ 'error': 'unable to fetch historiques' });
        }
    }


}
