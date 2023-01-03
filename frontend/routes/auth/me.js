const express = require('express');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const router = express.Router();


router.get('/api/users/me', async (req,res ) =>{
    const { access } = req.cookies;
    try {
        const apiRes = await fetch(`http://127.0.0.1:8000/api/users/me`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${access}`
            },
        });

        const data = await apiRes.json();

        return res.status(apiRes.status).json(data);

    } catch(err) {
        console.log(err)
        return res.status(500).json({
            error: 'Something went wrong trying to retrieve user'
        });

    }
})

module.exports = router;