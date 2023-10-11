import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js' ;

// model 
import Project from '../models/project.js';
import User from '../models/users.js';
// import Category from '../models/category.js';

const router = express.Router();



// 검색 스킵작업 + 상세페이지 작업하면 끝

//@ path    GET /api/search/project/:searchText/:pageNum
//@ doc     프로젝트, 글 검색 
//@ access  public
router.get('/project/:searchText/:pageNum', async (req, res) => {
    try {
        // front에서 보낼 때 encodeURIComponent("룰루")
        const { searchText, pageNum } = req.params;
        const page = parseInt(pageNum);
        
        const searchAllLength = await Project.find({
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
        }).count();
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
        }).sort({ createdAt: -1 }).skip(page * 10).limit(10);

         res.status(200).json({ search, searchAllLength });
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})

//@ path    GET /api/search/project/relation/:searchText
//@ doc     프로젝트, 글 검색 연관 검색
//@ access  public
router.get('/project/relation/:searchText', async (req, res) => {
    try {
        const { searchText } = req.params;
        const search = await Project.find({
           $or: [
            {
                title: {
                    $regex: searchText,
                    $options: 'i',
                }, 
            }
        ]
        }).select('title').limit(10);
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
         userSearchData.prevSearch = userSearchData.prevSearch.reverse().slice(0, 10)
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

// http://localhost:8080/api/search/recent/delete/all/65223bfdd8eb0e9d3bd79929

//@ path    PATCH /api/search/recent/deleteall/:userId
//@ doc     이전 검색어 삭제
//@ access  public
router.patch('/recent/deleteall/:userId', async (req, res) => {
    try {
        const { userId } = req.params; 
         const userSearchData = await User.findByIdAndUpdate(userId, { $unset: { prevSearch: 1 } }, { strict: false })
         console.log('userSearchData', userSearchData)
         res.status(201).end();
    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})



export default router;