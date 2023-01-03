const express = require('express');
const cookie = require('cookie');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();



router.post('/api/', async (req, res) => {
    const { comment, post, username } = req.body;
    const { access } = req.cookies;
    const body = JSON.stringify({comment, post, username})
    console.log(access)
    try {
        const apiRes = await fetch(`http://127.0.0.1:8000/api/comment/`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${access}`,
            },
            body,
        });

        const data = await apiRes.json();

        return res.status(apiRes.status).json(data);

    } catch(err) {
        return res.status(500).json({
            error: err
        });
    }
});

        module.exports = router;