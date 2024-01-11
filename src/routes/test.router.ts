import express from "express";
import testController from "../controller/test.controller";

const testRouter = express.Router();

// middleware that is specific to this testRouter
testRouter.use((req, res, next) => {
    // console.log('Time: ', Date.now())
    next()
})

testRouter.get('/', testController.getData)

export default testRouter;