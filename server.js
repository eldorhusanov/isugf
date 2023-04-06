const setdata = require('../baza/oracle');
const express = require('express');
const app = express();
let a=[], sordesc;
app.get('/users', async (req, res) => {
        sordesc={tsort:`${req.query.desc}`}
        a=await setdata(req.query.table, req.query.name, req.query.page ,'',req.query.nazad);
        res.set('Access-Control-Allow-Origin', '*')
        a.push(sordesc)
        res.json(a)
});
app.get('/sort',async (req, res) => {
         if(req.query.desc==='asc'){
             sordesc={tsort:'desc'}
         }
         else if(req.query.desc==='desc'){
             sordesc={tsort:'asc'}
         }
        let sort=`order by ${req.query.sort}  ${req.query.desc}`;
        a=await setdata(req.query.table, req.query.name, req.query.page,sort, req.query.nazad) ;
        res.set('Access-Control-Allow-Origin', '*')
        // a.push(sordesc)
        a.push(sordesc);
        res.json(a)
    tst();
})
app.listen(8080);
console.log('Server is listening on port 8080');
