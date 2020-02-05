const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await db('posts');
        // const posts = await db.select('*').from('posts');
        res.json(posts)
    } catch(err) {
        res.status(500).json({message: "failed to get posts"})
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        // returns an array with one object
        // const post = await db('posts').where('id', id)

        // destructure to return single object
        const [post] = await db('posts').where('id', id)
        res.status(200).json(post)

    } catch(err) {
        res.status(500).json({message: "failed to get post by id"})
    }

});

router.post('/', async (req, res) => {
    const postData = req.body;
    try {
        const post = await db('posts').insert(postData)
        res.status(201).json(post)
    } catch(err) {
        res.status(500).json({message: "failed to create post"})
    }
});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;