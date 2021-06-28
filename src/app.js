const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
//define paths for express config
const publicpath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialspath)
 
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
//setup static directory to serve
app.use(express.static(publicpath))


app.get('',(req,res)=>{
res.render('index',{
    title:'Weather page',
    name:'Juwerio',
    message:'Weather Services'
})
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Juwerio',
        message:'Weather Services'
    })
    
})
app.get('/contact',(req,res)=>{
    res.render('contact',{
        title:'Contact Page',
        name:'Juwerio',
        message:'Weather Services'
    })

})
app.get('/news',(req,res)=>{
    res.render('news',{
        title:'News Page',
        name:'Juwerio',
        message:'Weather Services'
    })
})
app.get('/weather',(req,res)=>{
if (!req.query.address) {
  return res.send({
      error:"address must provided"
  })  
}
const address = req.query.address;
geocode(address,(error,{latitude,longitude,location} ={})=>{


     if (error) {
         return res.send({error});
     }
     
  forecast(latitude,longitude,(error,{tempreture,rainy,wind,description} ={})=>{
      if (error) {
          return res.send({error});
      }
      console.log(tempreture);
          res.send({
            tempreture,
            rainy,
            wind,
            description,
            location,
            address
        });
         
      })
  })
})  

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'404',
        message:'Weather Services',
        name:'Juwerio',
        error:'help article not found!'
    })
})
app.get('*',(req,res)=>{
    res.render('404page',{
        title:'404',
        name:'Juwerio',
        message:"Weather Services",
        error:'Page not found!'

    })
})


app.listen(port,()=>{
    console.log("the app is running at port "+port);
})