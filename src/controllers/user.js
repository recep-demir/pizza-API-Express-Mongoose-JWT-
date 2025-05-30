"use strict"

const User = require('../models/user')
const sendMail = require('../helpers/sendMail');
const { welcomeTmp } = require("../helpers/emailTemplates");




module.exports={
    list : async (req,res) => {
        /* 
            #swagger.tags = ['Users']
            #swagger.summary = 'List Users'
            #swagger.desription = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples usage:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

            const result = await res.getModelList(User);

            res.status(200).send({
                error: false,
                details: await res.getModelListDetails(User),
                result,
            })

    },
    create:async (req,res) => {
        /* 
            #swagger.tags = ['Users']
            #swagger.summary = 'Create User'
        */

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(req.body.password)) {
                res.errorStatusCode = 401;
                throw new Error("Password must be at least 8 characters long and contain at least one special character and  at least one uppercase character ");
              }

              const result = await User.create(req.body);

              if (result) {
                sendMail(result.email, 'Welcome to Pizza Api', welcomeTmp, result.username)
              }

              res.status(201).send({
                error: false,
                result,
              });
    },
    read: async (req, res) => {
        /* 
                #swagger.tags = ['Users']
                #swagger.summary = 'Get Single User'
            */
    
        const result = await User.findOne({ _id: req.params.id });
        res.status(200).send({
          error: false,
          result,
        });
    },
    update: async (req, res) => {
        /* 
           #swagger.tags = ['Users']
           #swagger.summary = 'Update User'
       */


   const result = await User.updateOne({ _id: req.params.id }, req.body, {
     runValidator: true,
     new: true,
     /* runValidators: true: MongoDB şemasında tanımlı doğrulama kurallarının (örneğin, required, minlength, enum vb.) güncelleme işlemi sırasında çalıştırılmasını sağlar. Varsayılan olarak, updateOne doğrulayıcıları çalıştırmaz, bu yüzden bu ayar açıkça belirtilmiş.
      !new: true: Bu ayar, updateOne metodunun davranışını değiştirir. Normalde updateOne, güncellenmeden önceki dökümanı döndürür. new: true ile, güncellenmiş döküman döndürülür. Bu, istemciye en güncel veriyi göstermek için kullanışlıdır. */
   });
   res.status(202).send({
     error: false,
     result,
   });
    },
    deleteUser: async (req, res) => {
        /* 
            #swagger.tags = ['Users']
            #swagger.summary = 'Delete User'
        */
    const result=await User.deleteOne({_id:req.params.id})
    res.status(result.deletedCount ? 204 : 404).send({
      error: !deletedCount,    
    });
  },


}