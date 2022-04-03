//Load HTTP module

const express = require('express')
const app = express();

const neo4j = require('neo4j-driver')
const driver = neo4j.driver(
    "neo4j://471af878.production-orch-0055.neo4j.io:7687", 
    neo4j.auth.basic("neo4j", "QTxR81zH_zOB-o0_u1kd6xizciwtSHJXYy1lVa9o8-k"), { encrypted: 'ENCRYPTION_ON' }
    )

/*const driver = neo4j.driver(
    "bolt://localhost:7687", 
    neo4j.auth.basic("neo4j", "admin123")
    )
    */
const session = driver.session()

app.get('/list', async (req,res) => {
    session
    .run(
        'MATCH (n:Task) RETURN n',
      )
    .then(result => {
        let name = result.records
        res.json({status: 200, data: {result}})
    })  
})




/*
app.post('/auth', async (req, res) => {

    let user = await User.findOne({where: {  
        username: req.body.username,
        password: sha512.sha512(req.body.password)
    }})
  
    let token = jwt.sign({ id: user.id }, 'ThisIsMySecretSentence1234');
  
    res.json({status: 200, data: token})
  
})

app.get('/parkings/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    res.status(200).json(parking)
})
*/

app.listen(4400);