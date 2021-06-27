//cu require includem pachetele folosite in proiect
const express = require('express');
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const {Client} =require('pg');
const url = require('url');

const { exec } = require("child_process");
const ejs=require('ejs');
const regex=require('regex');

const app = express();


const client = new Client({
    host: 'localhost',
    user: 'alex',
    password: 'alex',
    database: 'TW',
    port:5432
})
client.connect()

app.set("view engine", "ejs");
console.log("Dirname: ", __dirname);
app.use("/resurse", express.static(path.join(__dirname, "resurse")));

function verificaImagini(){
	var textFisier=fs.readFileSync("resurse/json/galerie.json") //citeste tot fisierul
	var jsi=JSON.parse(textFisier); //am transformat in obiect

	var caleGalerie=jsi.cale_galerie;
    let vectImagini=[]

    for (let im of jsi.imagini){
		var imVeche= path.join(caleGalerie, im.cale_imagine);//obtin claea completa (im.fisier are doar numele fisierului din folderul caleGalerie)
        var ext = path.extname(im.cale_imagine);//obtin extensia
		
        var numeFisier =path.basename(im.cale_imagine,ext)//obtin numele fara extensie
		let imNoua=path.join(caleGalerie+"/mic/", numeFisier+"-mic"+".webp");//creez cale apentru imaginea noua; prin extensia wbp stabilesc si tipul ei
		let imMediu=path.join(caleGalerie+"/mediu/", numeFisier+"-mediu"+".webp");//creez cale apentru imaginea noua; prin extensia wbp stabilesc si tipul ei
        
        var inceput = im.timp.split('-')[0];
        var final = im.timp.split('-')[1];
        var int_inceput = parseInt(inceput.split(':')[0])*60+parseInt(inceput.split(':')[1]);
        var int_final = parseInt(final.split(':')[0])*60+parseInt(final.split(':')[1]);
        //console.log(im.timp, int_inceput, int_final);
        //console.log(im.descriere);
        vectImagini.push({mare:imVeche, mediu:imMediu, mic:imNoua, descriere:String(im.descriere), inceput:int_inceput, final:int_final}); //adauga in vector un element
		if (!fs.existsSync(imNoua))
        {//daca nu exista imaginea, mai jos o voi crea
		sharp(imVeche)
		  .resize(150) //daca dau doar width(primul param) atunci height-ul e proportional
		  .toFile(imNoua, function(err) {
              if(err)
			    console.log("eroare conversie",imVeche, "->", imNoua, err);
		  });
        } 

        
        if (!fs.existsSync(imMediu))
        {
        sharp(imVeche)
            .resize(250) //daca dau doar width(primul param) atunci height-ul e proportional
            .toFile(imMediu, function(err) {
                if(err)
                  console.log("eroare conversie",imVeche, "->", imMediu, err);
            });
        } 
        
        
	}

    // [ {mare:cale_img_mare, mic:cale_img_mica, descriere:descriere, inceput:minute_inceput, final:minute_inceput}, ...  ]
    return vectImagini;
}

//index
app.get(["/","/index"], function(req, res){ 
    res.render("pagini/index");
});

//portofoliu - galerie statica
app.get("/portofoliu", function(req, res){
    res.render("pagini/portofoliu", {imagini: verificaImagini(), timpCurent: getTime(), imageCounter: 0});
});

//portofoliu - galerie animata
app.get("/stiri", function(req, res){
    animLimit=getRandom();
    console.log(animLimit);
    res.render("pagini/stiri", {imagini: verificaImagini(), timpCurent: getTime(), imageCounter: 0, animLimit:animLimit});
});



//TODO - TODO
app.get("/produse",function(req, res){
    // console.log("Pagina de filme");
     //console.log("Url:",req.url);
     //console.log("Query:", req.query.tip);
     // conditie_booleana? val_true : val_false
     let conditie= req.query.tip_produs ?  " and tip_produs='"+req.query.tip_produs+"'" : "";//daca am parametrul tip in cale (tip=cofetarie, de exemplu) adaug conditia pentru a selecta doar produsele de acel tip
     console.log("select * from moneda where 1=1"+conditie);
     client.query("select * from moneda where 1=1"+conditie, function(err,rez){
         //console.log(err, rez);
         //console.log(rez.rows);
         client.query("select unnest(enum_range( null::categ_moneda)) as categ", function(err,rezCateg){//selectez toate valorile posibile din enum-ul categ_prajitura
            // console.log(rezCateg);
             res.render("pagini/produse", {produse:rez.rows, tipuri:rezCateg.rows});//obiectul {a:10,b:20} poarta numele locals in ejs  (locals["a"] sau locals.a)
             });
         
        
     });
     
 });
  
 app.get("/produs/:id",function(req, res){
   
   //  console.log(req.params);
     
     const rezultat= client.query("select * from moneda where id="+req.params.id, function(err,rez){
         //console.log(err, rez);
         //console.log(rez.rows);
         res.render("pagini/produs", {prod:rez.rows[0]});//obiectul {a:10,b:20} poarta numele locals in ejs  (locals["a"] sau locals.a)
     });
     
 });

//TODO - TODO


//403
app.get("*/galerie.json",function(req, res){    
    res.status(403).render("pagini/403");
});


//404
app.get("/*",function(req, res){    
    res.render("pagini"+req.url, function(err,rezultatRandare){
        if(err){
            if(err.message.includes("Failed to lookup view")){
                res.status(404).render("pagini/404");
            }
            else 
                throw err;
        }
        else{
            res.send(rezultatRandare);
        }
    });
});


function getTime(){
    var today = new Date();
    var timp = today.getHours() * 60 + today.getMinutes();
    console.log("Timp ", timp);
    return timp;
}

function getRandom(){
    var nr = Math.floor(Math.random() * 4);
    if (nr % 3 == 0) return 4;
    if (nr % 3 == 1) return 9;
    if (nr % 3 == 2) return 16;
    console.log("AVEM UN BUG LA RANDOM!");
    return -1;
}


verificaImagini();


app.listen(8080);
console.log("A pornit server-ul!");
