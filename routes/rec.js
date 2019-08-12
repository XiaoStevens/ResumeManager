const express = require('express');
const router = express.Router();
const multer = require('multer');
const path =require('path');
const xss =require('xss');
//set storage engine
/*const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req,file,cb){
      cb(null,file.fieldname+'-'+ Date.now() + path.extname(file.originalname));
    }
  });
  //Init upload
  const upload = multer({
    storage: storage
}).single('Resume');*/
upload = multer({ dest: './public/uploads' });



const dbOperation = require("../data/rec");
const dbOp = require("../data/comments");


router.get("/rec", (req, res) => {

    res.render('main/recForm');

});

router.post("/record", upload.single("resume"),async (req, res) => {

try{

    let error = "", cv = "";
    if (!req.body.company) error +="Company Name cannot be empty <br>";
    //if (!req.body.lastname) error +="Lastname cannot be empty  <br>";
    if (!req.body.position)  error +="Position address cannot be empty  <br> ";
    // if (!req.body.resume)  error +="Resume cannot be empty <br> ";
    //if (!req.body.dateofbirth) error +="Date of birth cannot be empty <br> ";
    //if(!req.body.gender)  error +="Gender cannot be empty <br> ";
    //if (typeof(req.body.salary)!= Number)  error +="Salary should be a number <br> ";
    if (req.body.position && req.body.company.length > 20) error +="Firstname  is too long <br> ";
    if (req.body.position && req.body.position.length > 20) error +="Email address is too long  <br>";

    if(error !== ""){
        res.render("main/recForm", { error: error});
    }

    // upload(req,res,(err)=>{
    //     if(err){
    //       res.render("main/recForm", { error: err});
    //       console.log(err);
    //     }else {
    //      cv = req.file.path;
    //       if(req.file == undefined) {
    //         res.render("main/recForm", { error: 'No file selected.'})
    //       }
    //     }
    //   });

    cv = req.file.path;

    let as = true;


     //createRec(id,User,Comp,Pos,JD,CV,AS)
    try {
       const Record = await dbOperation.createRec(req.session.user._id,req.session.user.firstname,req.body.company,req.body.position,req.body.jobD,cv,as,req.body.salary);
       console.log(Record);
       const Records = await dbOperation.getAllRec(req.session.user._id);
       res.render("main/home", {rec: Records, success: "            Record Created!"});
       /*const Com =await dbOp.findCom(Record._id);
       const Records = await dbOperation.getRecById(Record._id);
        res.render("main/recPage",{rec: Records, com: Com});*/

    } catch (e) {
        res.render("main/recForm", { error: e});
        console.log(e);
    }
} catch (e) {
    res.status(500).send();
}
});

router.post("/recView", async (req,res)=> {
    try{
    const Record = await dbOperation.getRecById(req.body.objId);
    const Com =await dbOp.findCom(req.body.objId);
    res.render("main/recPage",{rec: Record, com: Com});
} catch (e) {
    res.status(500).send();
}
});

router.post("/recDel",async (req,res)=> {
    try{
    await dbOperation.deleteRec(req.body.objId);
    const Records = await dbOperation.getAllRec(req.session.user._id);
    res.render("main/home", {rec: Records, success: "                Record Deleted!"});
} catch (e) {
    res.status(500).send();
}
});

router.post("/recUpd",async (req,res)=> {
    try{
    const Record = await dbOperation.updateRec(req.body.objId,req.body.updRec);
    res.render("main/recPage",{rec: Record});
} catch (e) {
    res.status(500).send();
}
});
router.post("/comDel",async (req,res)=> {
    try{
        const DC = await dbOp.deleteCom(req.body.objId);
        const Record = await dbOperation.getRecById(req.body.RecId);

       const Com = await dbOp.findCom(req.body.RecId);
    
      res.render("main/recPage",{rec: Record,com: Com});
  } catch (e) {
      res.status(500).send();
  }
});
router.post("/crtCom",async (req,res)=> {
    try{
    const Record = await dbOperation.getRecById(req.body.objId);
    const crtCom = await dbOp.createCom(req.body.objId,xss(req.body.comment));
    const Com = await dbOp.findCom(req.body.objId);
    res.render("main/recPage",{rec: Record,com: Com});
} catch (e) {
    res.status(500).send();
}
});


module.exports = router;
