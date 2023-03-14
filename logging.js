import "express-async-errors"
import winston from "winston";

export default function logging(){
    process.on("unhandledRejection",(ex)=>{
        throw ex;
    })        
winston.exceptions.handle(new winston.transports.File({filename:"logfile.log"}));
winston.exceptions.handle(new winston.transports.Console());
winston.add(new winston.transports.File({filename:"logfile.log"}))
winston.add(new winston.transports.Console({level:"info",colorize:true,prettyPrint:true}))
}