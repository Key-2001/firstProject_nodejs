import bcrypt from 'bcrypt'
import { raw } from 'body-parser';
import db from '../models/index'


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const createNewUser = async (data) => {
    // console.log(data.roleId)
    return new Promise(async(resolve,reject) => {
        try {
            const hashPassword = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender==='1' ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber
            })

            resolve('Create new user successfully')
        } catch (error) {
            reject(error)
        }
    })
    
}

const hashUserPassword = (password) => {
    return new Promise (async (resolve,reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

const getAllUser = () => {
    return new Promise (async (resolve,reject) => {
        try {
            let users = await db.User.findAll({raw:true})
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

const getUserById = (id) => {
    return new Promise (async (resolve,reject) => {
        try {
            let user = await db.User.findOne({where: {id:id},raw:true})
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

const updateUser = (data) => {
    console.log(data);
    return new Promise(async (resolve,reject) => {
        try {
            const user = await db.User.findOne({where:{
                id:data.id
            }})
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save()

                const allUser = await db.User.findAll({raw:true})
                resolve(allUser)
            }else{
                resolve()
            }
        } catch (error) {
            reject(error)
        }
    })
}

const deleteUserById = (idUser) => {
    return new Promise (async (resolve,reject) => {
        try {
            const user = await db.User.findOne({where:{
                id:idUser
            }})
            if(user){
                await user.destroy();
                const allUser = await db.User.findAll({raw:true})
                resolve(allUser)
            }else{
                resolve()
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {createNewUser,getAllUser,getUserById,updateUser,deleteUserById}