const userModel=require('../Model/userModel')
const jwt=require('jsonwebtoken')
const isrequestBody = (requestBody) => {
    return Object.keys(requestBody).length > 0
}

//isValid will check input field,input field undefined, null, string and input length=0 or not
const isValid = (value) => {
    if (typeof value === "undefined" || value === null)
        return false
    if (typeof value === "string" && value.trim().length === 0)
        return false
    else
        return true
}

//singUp function for store user data
const signUp = async (req, res) => {
    try {
        //validation for checking input body ,if body is empty it will send error.
        if (!isrequestBody(req.body)) {
            return res.status(400).send({ status: false, message: "Invalid parameters, please enter user details" })
        }
        //distructuring the input fields
        const { first_name, last_name, email, password } = req.body

        if (!isValid(first_name)) {
            return res.status(400).send({ status: false, message: "please enter user_name" })

        }
        if (!isValid(last_name)) {
            return res.status(400).send({ status: false, message: "please enter last_name" })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "please enter email" })
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: "email is not valid" })
        }

        let isDuplicateEmail = await userModel.findOne({ email });
        if (isDuplicateEmail) {
            return res.status(404).send({ status: false, message: "email is already registered, please enter other email" })
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "please enter password" })
        }
        if (!(password.length >= 8 && password.length <= 15)) return res.status(400).send({ status: false, message: "password is not valid, enter password 8 to 15 character" })
        create = await userModel.create(req.body)
        return res.send({status:true, message: "data successfully created", data: create })
    }
    catch (err) {
        return res.status(404).send({status:false,message:err.message})

    }
}

const signIn=async(req,res)=>{
    try {
        //validation for checking input body ,if body is empty it will send error.
        if (!isrequestBody(req.body)) {
            return res.status(400).send({ status: false, message: "Invalid parameters, please enter user details" })
        }
        //distructuring the input fields
        const {email, password } = req.body

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "please enter email" })
        }
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: "email is not valid" })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "please enter password" })
        }

        let checkingEmail = await userModel.findOne({ email });
        if (!checkingEmail) {
            return res.status(404).send({ status: false, message: "email is not registered" })
        }
        if (checkingEmail.password!==password) {
            return res.status(404).send({ status: false, message: "wrong credential, please check email and password" })
        }
        const token = jwt.sign({
            userId: checkingEmail._id.toString(),
            msg:"welcome with smile",
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 1 * 60 * 60    //1 hourds:60minute:60second
        }, "htstechsolutions.com")
        res.setHeader("x-api-key", token)
        return res.status(200).send({ message: "successfully login, token generated", token: token })
    }
    catch (err) {
        return res.status(404).send({status:false,message:err.message})

    }

}

module.exports.signUp=signUp
module.exports.signIn=signIn