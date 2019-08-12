const mongoCollection =require('../config/mongoCollections');
const com = mongoCollection.comments;
const rec = mongoCollection.rec;
const ObjectID = require("mongodb").ObjectID;

var exportedMethods={
    async createCom(recId,com1){

        const comCol =  await com();
        const newCom ={

            rec_id : recId,
            commment : com1
        } ;
      await comCol.insertOne(newCom);
     } ,
    async updateCom(comId,recId,com) {

        if(!com){throw "Provide a comment to update"}

        const comCol = await com();
        const updatedC = {};

       updatedC.com=com;

       const updInfo = await comCol.updateOne({ com_id: comId }, { $set: updatedC });
       if (updInfo.updatedtedCount === 0)
        { throw `Updation Failed.Could not update comment ${id}`;}
    },
    async findCom(recId){
        const comCol = await com();
        console.log(typeof(recId));
        RecId = recId.toString();
//      const Rec = await recCol.find({u_id:id}).toArray();
        const Com = await comCol.find({rec_id:recId}).toArray();
        return Com;
    },
    async deleteCom(id){
        if(!id){throw "id not provided";}
            const comCol = await com();
            const Com = await comCol.removeOne({_id: new ObjectID(id)});
             if (Com.deletedCount === 0)
            { throw `Updation Failed.Could not delete Comment ${id}`;}
            return true;
        }
}
module.exports = exportedMethods;
