const mongoCollection =require('../config/mongoCollections');
const rec = mongoCollection.rec;
var ObjectId = require('mongodb').ObjectId;


var exportedMethods ={
    async createRec(id,User,Comp,Pos,JD,CV,AS,sal){
       const recCol =  await rec();
       var today = new Date();
       var dd = today.getDate();
       var mm = today.getMonth() + 1;
       var yyyy = today.getFullYear();
       var date = yyyy + "/" + mm + "/" + dd;
       const newRec ={
           u_id: id,
           user: User,
           company: Comp,
           position: Pos,
           jobDescription: JD,
           resume: CV,
           applicationStatus: AS,
           dateOfCreation: date,
           dateOfUpdation: date,
           salary: sal
       } ;
     const Rec=await recCol.insertOne(newRec);

      return Rec;
    } ,

    async updateRec(id, updatedRec) {

        const recCol = await rec();
        const updatedR = {};

        if(updatedRec.company){updatedR.company=updatedRec.company;}
        if(updatedRec.position){updatedR.position=updatedRec.position;}
        if(updatedRec.jobDescription){updatedR.jobDescription=updatedRec.jobDescription;}
        if(updatedRec.resume){updatedR.resume=updatedRec.resume;}
        if(updatedRec.applicationStatus){updatedR.applicationStatus=updatedRec.applicationStatus;}
       // if(updatedRec.comments){updatedR.comments=updatedRec.comments;}
        updatedR.dateOfUpdation = dateFormat(Date.now);

        const updInfo = await recCol.updateOne({ _id: id }, { $set: updatedU });
        if (updInfo.updatedtedCount === 0)
        { throw `Updation Failed.Could not update Record ${id}`;}
    },
    async getRecByComp(id,CN){
        const recCol = await rec();

        const Rec = await recCol.findOne({u_id :id,company:CN});

        if(!Rec){return false;}

        return Rec;
    },

    async getRecByPos(id,Pos){
        const recCol = await rec();

        const Rec = await recCol.findOne({u_id :id,position:Pos});

        if(!Rec){return false;}

        return Rec;
    },

    async deleteRec(id){

        if(!id){throw "id not provided";}
        const recCol = await rec();
        try{
            const rec = await recCol.deleteOne({_id: ObjectId(id)});

            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    },
    async getAllRec(id){
        if(!id){throw "id not provided";}
        const recCol = await rec();
        const Rec = await recCol.find({u_id:id}).toArray();
        return Rec;
    },
    async getRecById(id){
        const recCol = await rec();
        const Rec = await recCol.findOne({_id: ObjectId(id)});
        if(!Rec){return false;}
        return Rec;
    }
}
module.exports = exportedMethods;
