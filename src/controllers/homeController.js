import db from '../models/index'
import {createNewUser,getAllUser,getUserById,
        updateUser,deleteUserById} from '../services/CRUDservice'

const getHomePage = async (req,res) => {
    try {
        let data = await db.User.findAll()
        // console.log(JSON.stringify(data))
        res.render('homePage.ejs',{
            data:JSON.stringify(data)
        })
    } catch (error) {
        console.log(error);
    }

}

const getCRUD = (req,res) => {
    res.render('CRUD.ejs')
}

const postCRUD = async (req,res) => {
    const data = req.body;
    const msg = await createNewUser(data)
    res.send(msg)
}

const displayGetCRUD = async (req,res) => {
    let users = await getAllUser();
    // console.log(users);
    // res.json({success:true,data:users})
    res.render('displayCRUD.ejs',{
        data:users
    })
}

const getEditCRUD = async (req,res) => {
    const {id} = req.query
    if(id){
        const user = await getUserById(parseInt(id))
        console.log(user);
        if(!user){
            return res.status(404).send('User not found')
        }
        else{
            return res.render('editCRUD.ejs',{
                user: user
            })
        }

    }
    return res.status(404).send('user not found')
}

const putCRUD = async (req,res) => {
    const data = req.body
    const users = await updateUser(data)
    return res.render('displayCRUD.ejs',{data:users})
}

const deleteCRUD = async (req,res) => {
    const {id} = req.query
    if(id){
        const users = await deleteUserById(id)
        return res.render('displayCRUD.ejs',{data:users})
    }
    
    return res.status(404).send('User not found')

}

module.exports = {
    getHomePage,getCRUD,postCRUD,displayGetCRUD,getEditCRUD,putCRUD,deleteCRUD
}