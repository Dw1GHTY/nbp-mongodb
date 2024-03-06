"use server"

import clientPromise from "./mongoDB";

let client
let db

async function init() 
{
    if (db)
        return
    try
    {
        client = await clientPromise
        db = await client.db()
    }   
    catch(error)
    {
        throw new Error("Konekcija sa bazom nije uspela"+ error)
    }
}

(async () => {await init()})()


export async function checkUser(userName)
{
    try
    {
        if (!db)
            await init()
        let col = await db.collection('korisnik')
        let res = await col.find({username: userName}).toArray()

        return res
    }
    catch(error)
    {
        return {error: "Nesto nije u redu sa funkcijom checkUser()" + error}
    }
}

export async function registerUser(userName, pass)
{
    try
    {
        if (!db)
            await init()
        let col = await db.collection('korisnik')
        let datum = new Date()
        let str_datum = `${datum.getDate()}.${datum.getMonth()+1}.${datum.getFullYear()}`
        await col.insertOne({username: userName, password: pass, income: 0.0, expense: 0.0, balance: 0.0, last_reset: str_datum})
    }
    catch(error)
    {
        return {error: "Nesto nije u redu sa funkcijom registerUser()" + error}
    }
}
export async function makeChartInfo(user)
{
    try
    {
        if (!db)
            await init()
        let col = await db.collection('chart_info')

        let obj = {username:user, Food:0, Transportation:0, Shopping:0, Fun:0, Health:0, Other1:0, 
                   Salary:0, Loan:0, Gift:0, Gambling:0}
        await col.insertOne(obj)
    }
    catch(error)
    {
        return {error: "Nesto nije u redu sa funkcijom makeChartInfo()" + error}
    }
}

export async function loginUser(userName, pass)
{
    try
    {
        if (!db)
            await init()
        let col = await db.collection('korisnik')
        let res = await col.find({username: userName, password: pass}).map(user => ({...user, _id: user._id.toString()})).toArray()
        return res
    }
    catch(error)
    {
        return {error: "Nesto nije u redu sa funkcijom checkUser()" + error}
    }
}

export async function getMoneyValues(user)
{ //Vraca vrednosti balance, income i expense
    try
    {
        if (!db)
            await init()
        let col = await db.collection('korisnik')
        let res = await col.find({username: user}).map((e) => ({income: e.income, expense: e.expense, balance: e.balance, last_reset: e.last_reset})).toArray()
        return res
    }
    catch(error)
    {
        return {error: "Nesto nije u redu sa funkcijom getMoneyValues()" + error}
    }
}

export async function insertExpInc(obj)
{
    try
    {
        if(!db)
            await init()
        let col = await db.collection('aktivnost')
        await col.insertOne(obj)
    }
    catch(error)
    {
        return {error: "Greska u funkciji insertExpInc()"}
    }
}

export async function updateMoneyValues(user, type, amount)
{
    try
    {
        if(!db)
            await init()
        let col = await db.collection('korisnik')
        if(type === "inc")
            await col.updateOne({username: user}, {$inc: {balance: amount, income: amount}})
        else if(type === "exp")
            await col.updateOne({username: user}, {$inc: {balance: -amount, expense: amount}})

    }
    catch(error)
    {
        return {error: "Greska u funkciji updateMoneyValues()"}
    }
}

export async function resetMoneyValues(user)
{
    try
    {
        if(!db)
            await init()
        let col = await db.collection('korisnik')
        let datum = new Date()
        let str_datum = `${datum.getDate()}.${datum.getMonth()+1}.${datum.getFullYear()}`
        await col.updateOne({username: user}, {$set: {last_reset: str_datum, income:0.0, expense: 0.0}})
    }
    catch(error)
    {
        return {error: "Greska u funkciji resetMoneyValues()"}
    }
}

export async function getAllAktivnosti(user)
{
    try
    {
        if(!db)
            await init()
        let col = await db.collection('aktivnost')
        let res = await col.find({username: user}).limit(40).map(e => ({...e, _id: e._id.toString()})).toArray()
        return res
    }
    catch(error)
    {
        return {error: "Greska u funkciji getAllAktivnosti()"}
    }
}

export async function filterAktivnosti(user, _datum, tip)
{
    try
    {
        if(!db)
            await init()
        let col = await db.collection('aktivnost')
        if(_datum === "NaN.NaN.NaN" && tip !== "all")
        {
            let res = await col.find({username: user, kategorija: tip}).limit(40).map(e => ({...e, _id: e._id.toString()})).toArray()
            return res
        }
        else if(_datum !== "NaN.NaN.NaN" && tip !== "all")
        {
            let res = await col.find({username: user, kategorija: tip, datum: _datum}).map(e => ({...e, _id: e._id.toString()})).toArray()
            return res
        }
        else if(_datum === "NaN.NaN.NaN" && tip === "all")
        {
            let res = await col.find({username: user}).limit(40).map(e => ({...e, _id: e._id.toString()})).toArray()
            return res
        }
        else
        {
            let res = await col.find({username: user, datum: _datum}).map(e => ({...e, _id: e._id.toString()})).toArray()
            return res
        }
    }
    catch(error)
    {
        return {error: "Greska u funkciji filterAktivnosti()"}
    }
}

export async function getChartInfo(user)
{
    try
    {
        if(!db)
            await init()
        let col = await db.collection('chart_info')
        let res = await col.find({username: user}).map(e => ({...e, _id:e._id.toString()})).toArray()
        let res_obj = res[0]
        
        let obj = {
            labelExp: ["Food", "Transportation", "Shopping", "Fun", "Health", "Other"],
            labelInc: ["Salary", "Loan", "Gift", "Gambling"],
            expensesValues: [res_obj.Food, res_obj.Transportation, res_obj.Shopping, res_obj.Fun, res_obj.Health, res_obj.Other1],
            incomesValues: [res_obj.Salary, res_obj.Loan, res_obj.Gift, res_obj.Gambling]
        }
        return obj
    }
    catch(error)
    {
        return {error: "Greska u funkciji getChartInfo()"}
    }
}

export async function updateChartInfo(user, type, amount)
{
    try
    {
        if(!db)
            await init()
        let col = await db.collection('chart_info')
        let ans = await col.updateOne({username: user}, {$inc: {[type]: parseFloat(amount)}})
        console.log("OVO JE ANS: ", ans)
    }
    catch(error)
    {
        return {error: "Greska u funkciji updateChartInfo()"}
    }
}