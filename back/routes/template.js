import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js' ;

// model 
import Project from '../models/project.js';
import User from '../models/users.js';
import Category from '../models/category.js';

const router = express.Router();





//@ path    GET /api/temp/docs
//@ doc     api docs
//@ access  public
router.get('/docs', async (req, res) => {
    try {
        
        const api = [
            { title: "project", items: [
                { 
                    method : 'GET', 
                    mode: 'public', 
                    api : '/api/project', 
                    desc: '원하는 값만큼 로드',
                    queryString:'page={number}', 
                    header: ['none', 'none2', 'none3'],
                    body: ['none', 'none2'], 
                    success: '201: OK',
                    frontFailure: '400: Bed Request',
                    backFailure: '500: Bed Respose',
                },
                { 
                    method : 'POST', 
                    mode: 'public', 
                    api : '/api/project', 
                    desc: '프로젝트 생성',
                    queryString:'none', 
                    header: ['none', 'none2', 'none3'],
                    body: ['none', 'none2'], 
                    success: '201: OK',
                    frontFailure: '400: Bed Request',
                    backFailure: '500: Bed Respose',
                },
               
            ] }
        ]
        // data라는 이름으로 전달
        // ejs 파일에서는 data[1].a 와 같은 형식으로 사용
        res.render('../views/apiDocs', { 'data' : api }, (err ,html) => {
            if (err) console.log(err);
            res.end(html) // 응답 종료
        })




    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})




//@ path    GET /api/temp/error
//@ doc     api docs
//@ access  public
router.get('/error', async (req, res) => {
    try {
        
        res.render('../views/error', { 'errorMessage': 'zzzz' })




    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})








export default router;