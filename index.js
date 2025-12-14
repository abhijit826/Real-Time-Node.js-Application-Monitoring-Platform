const express=require('express');
const response_time=require('response-time');
const client=require('prom-client');// metric collection 
const { createLogger, transports } = require("winston");

const LokiTransport = require("winston-loki");
const options = {
  transports: [
    new LokiTransport({
        labels:{
            appName:"Production-Server"
        },
      host: "http://127.0.0.1:3100"
    })
  ]
};


const logger = createLogger(options);
const {HeavyTask} =require('./util');
const app=express();
const port=process.env.PORT || 8000;

const collectDefaultMetrics=client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });//use for metrtic collection

const reqResTime=new client.Histogram({
    name:'http_req_res_time_seconds',
    help:'total time taken for processing',
    labelNames:['method','route','status_code'],
    buckets:[1,50,100,300,500,1000,2000,5000]
});

const total_req_Counter=new client.Counter({
name:'http_request_total',
help:'total number of requests received'
})


app.use(response_time((req, res, time)=>{
    total_req_Counter.inc();
    reqResTime.labels({
        method: req.method,
        route: req.url,
        status_code:res.statusCode  
    }).observe(time);
}));


app.get('/',(req,res)=>{
    logger.info("Root endpoint was hit");
   return  res.json({message:`Express server running`});
});

app.get('/slow',async(req,res)=>{
try{
    logger.info("Slow endpoint was hit");
    const timetaken=await HeavyTask();  
    return res.json({
        status:'success',
        message:`Task completed in ${timetaken} ms`});
}
catch (error){
    logger.error(error.message);
    return res.status(500).json({
        status:'error',
        message:'Abhijit Server Error',
        error: error.message
    });
}
});

app.get('/metrics',async(req,res)=>{
   
        res.setHeader('Content-Type',client.register.contentType);
        const metrics=await client.register.metrics();
        res.send(metrics);
});


app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
}); 
// module.exports=app;






