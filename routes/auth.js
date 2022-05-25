require('dotenv').config()
const express = require('express')
const router = express.Router();

const users=require('../model/user');

const jwt = require('jsonwebtoken')



let refreshTokens = []

//////////////////////////////////////////////////////////////////////////////refreshtoken
router.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ email: user.email })
    res.json({ accessToken: accessToken })
  })
})
///////////////////////////////////////////////////////////////////////////////logout
router.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(205)
})
////////////////////////////////////////////////////////////////////////////////////login
router.post('/login/',async (req, res) => {
  // Authenticate User

  const emaill = req.body.email
  const password= req.body.password
  
  let useremail = await users.findOne({email : emaill})
  

if(!useremail){
    return res.status(422).json({
        errors: [
            {
                msg: "Invalid Credentials",
            }
        ]
    })
}

if(useremail.password!=password)
res.status(403).send('pass ix=s wrong')
  const user = { email: emaill }
  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })

 
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1200s' })
}

module.exports = router;