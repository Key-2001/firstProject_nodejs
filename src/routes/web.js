import express from "express";
import {getHomePage,getCRUD,postCRUD,displayGetCRUD,getEditCRUD,putCRUD,deleteCRUD} from '../controllers/homeController'
const router = express.Router();

const initWebRoutes = (app) => {

    router.get('/',getHomePage)
    router.get('/crud',getCRUD)
    router.post('/postCRUD',postCRUD)
    router.get('/getCRUD',displayGetCRUD)
    router.get('/editCRUD',getEditCRUD)
    router.post('/putCRUD',putCRUD)
    router.get('/deleteCRUD',deleteCRUD)

    return app.use('/',router)
}

module.exports = initWebRoutes