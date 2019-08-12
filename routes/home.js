const express = require("express");
const router = express.Router();

const dbOperation = require("../data/users");
const dbOp = require("../data/rec")



router.get("/home", async (req, res) => {
    try{
        const Record = await dbOp.getAllRec(req.session.user._id);
        res.render("main/home",{rec : Record});
    } catch (e) {
        res.status(500).send();
    }

});


router.get("/home/account", async(req, res) => {
    try {
    const id = req.cookies.AuthCookie;
    const user = await dbOperation.getUserById(id);
    let firstName = user.firstname;
    let lastName = user.lastname;
    let email = user.email;
    let birthDate = user.dataofbirth;
    let gender = user.gender;
    res.render("main/account", {firstName, lastName, email, birthDate, gender})
    } catch (e) {
        res.status(500).send();
    }
})

router.get("/home/account/update", async (req, res) => {
    try {
        const id = req.cookies.AuthCookie;
        const user = await dbOperation.getUserById(id);
        let firstName = user.firstname;
        let lastName = user.lastname;
        let email = user.email;
        let birthDate = user.dataofbirth;
        let gender = user.gender;
        res.render("main/accountUpdate", {firstName, lastName, email, birthDate, gender})
        } catch (e) {
            res.status(500).send();
        }
})

router.post("/home/account/update", async (req, res) => {
    try{
        const id = req.cookies.AuthCookie;
        let userNew = req.body;
        let firstName = userNew.firstname;
        let lastName = userNew.lastname;
        let email = userNew.email;
        let birthDate = userNew.dateofbirth;
        let gender = userNew.gender;
        let updateItem = await dbOperation.updateUserById(id, firstName, lastName, email, birthDate, gender);
        console.log("update item: ", updateItem);
        res.redirect("/home/account");
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;
