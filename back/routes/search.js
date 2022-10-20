import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth.js' ;

// model 
import Project from '../models/project.js';
import User from '../models/users.js';
import Category from '../models/category.js';

const router = express.Router();


//@ path    GET /api/search/:searchText
//@ doc     검색 
//@ access  public
router.get('/:searchText', async (req, res) => {
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
 
         console.log('search result', search)
         res.status(200).json(search);

    } catch (err) {
        console.error('server:', err);
        res.status(500).json({ message: err.message });
    }
})



export default router;