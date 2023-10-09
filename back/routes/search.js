import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js' ;

// model 
import Project from '../models/project.js';
import User from '../models/users.js';
// import Category from '../models/category.js';

const router = express.Router();


//@ path    GET /api/search/project/:searchText
//@ doc     프로젝트, 글 검색 
//@ access  public
router.get('/project/:searchText', async (req, res) => {
    try {
        // front에서 보낼 때 encodeURIComponent("룰루")
        const { searchText } = req.params;
        const search = await Project.find({
           $or: [
            {
                title: {
                    $regex: searchText,
                    $options: 'i',
                }, 
            }, 
            {   content: {
                    $regex: searchText,
                    $options: 'i',
                }
            }
        ]
        });
         res.status(200).json(search);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})



//@ path    GET /api/search/:userId
//@ doc     유저 검색 (아이디 or 이름)
//@ access  public
router.get('/user/:user', async (req, res) => {
    try {
        const { user } = req.params;

        const findUser = await User.find({
           $or: [
            {
                id: {
                    $regex: user,
                    $options: 'i',
                }, 
            }, 
            {   name: {
                    $regex: user,
                    $options: 'i',
                }
            }
        ]
        }).populate({ path: 'id' });
        /* 
            퍼퓰 
            id: "jjongrrr"
            name
            
        */
         res.status(200).json(findUser);

    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})


//@ path    GET /api/search/recent/load/:userId
//@ doc     이전 검색어
//@ access  public
router.get('/recent/load/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
         const userSearchData = await User.findById(userId).select("prevSearch");
         res.status(200).json(userSearchData);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})


//@ path    PATCH /api/search/recent/add/:userId/:searchText
//@ doc     이전 검색어 추가
//@ access  public
router.patch('/recent/add/:userId/:searchText', async (req, res) => {
    try {
        const { userId, searchText } = req.params; 
        console.log(req.params,  userId, searchText)
         const userSearchData = await User.findByIdAndUpdate(userId, { $push: { prevSearch: searchText } }, { new: true }).select("prevSearch")
         res.status(201).json(searchText);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})

//@ path    PATCH /api/search/recent/delete/:userId/:searchText
//@ doc     이전 검색어 삭제
//@ access  public
router.patch('/recent/delete/:userId/:searchText', async (req, res) => {
    try {
        const { userId, searchText } = req.params; 
        console.log(req.params,  userId, searchText)
         const userSearchData = await User.findByIdAndUpdate(userId, { $pull: { prevSearch: searchText } }, { new: true }).select("prevSearch")
         res.status(201).json(searchText);
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})



export default router;