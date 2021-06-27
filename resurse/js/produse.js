/*a=10
var raspuns=confirm("Iti place tehnici web?");
console.log(raspuns)*/
function checkStrings (s, t) {
    
    if (s.toLowerCase() == t.toLowerCase()) return 1;   

    let aux=s;
    
    for(let i=0;i<s.length-1;i++)
    {
        aux=s.slice(0,i).concat(s[i+1]).concat(s[i])+s.slice(i+2,s.length);
        aux=aux.toLowerCase();
        console.log(aux);
        if(aux.localeCompare(t.toLowerCase())==0)
            return 1;
    }
    return 0;
}

window.onload=function(){

    let btn=document.getElementById("filtrare");
    btn.onclick=function(){


        let cntr=0;

        //PRET
        let inp_pret=document.getElementById("inp-pret");
        let maxPret = inp_pret.value;
        
        //RATING
        let inp_rating=document.getElementById("inp-rating");
        let minRating =inp_rating.value;

        //CATEGORIE
        let sel=document.getElementById("inp-categorie");
        let category=sel.value;

        //NUME
        let sel2=document.getElementById("input-nume");
        let nume=sel2.value;

        //PARERE
        let textAreaVal=document.getElementById("input-parere").value;
       
        //CATEGORIE (mai multe) 
        let selected = document.querySelectorAll('#inp-multiplu option:checked');
        let categories = Array.from(selected).map(el => el.value);

        //BITCOIN
        let butonBitcoin=document.getElementById("moneda1");

        var getSelectedValue = document.querySelector('input[name="radio1"]:checked');
        var Bitcoin = "neutral";
        if(getSelectedValue.value=="da")Bitcoin="da";
        if (getSelectedValue.value=="nu")Bitcoin="nu";

        getSelectedValue = document.querySelector('input[name="radio2"]:checked');
        var Bitcoin_Cash = "neutral";
        if(getSelectedValue.value=="da")Bitcoin_Cash="da";
        if (getSelectedValue.value=="nu")Bitcoin_Cash="nu";

        getSelectedValue = document.querySelector('input[name="radio3"]:checked');
        var Wrapped_Bitcoin = "neutral";
        if(getSelectedValue.value=="da")Wrapped_Bitcoin="da";
        if (getSelectedValue.value=="nu")Wrapped_Bitcoin="nu";


        //ALTCOIN
        let butonAltcoin=document.getElementById("moneda2");

        getSelectedValue = document.querySelector('input[name="radio4"]:checked');
        var Ethereum = "neutral";
        if(getSelectedValue.value=="da")Ethereum="da";
        if (getSelectedValue.value=="nu")Ethereum="nu";

        getSelectedValue = document.querySelector('input[name="radio5"]:checked');
        var Cardano = "neutral";
        if(getSelectedValue.value=="da")Cardano="da";
        if (getSelectedValue.value=="nu")Cardano="nu";

        

        var produse=document.getElementsByClassName("produs");
    
        for (let prod of produse){

            prod.style.display="none";

            let pret= parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML);
            let conditie1= pret<=maxPret;

            let rating= parseInt(prod.getElementsByClassName("val-rating")[0].innerHTML);
            let conditie2= minRating<=rating;

            let numeCurent=prod.getElementsByClassName("val-nume")[0].innerHTML;
            let conditie3=(nume.localeCompare("")==0 || numeCurent.localeCompare(nume)==0 || checkStrings(nume,numeCurent));

            let parereCurent=prod.getElementsByClassName("val-parere")[0].innerHTML;
            let conditie4=(textAreaVal.localeCompare("")==0 || parereCurent.localeCompare(textAreaVal)==0 || checkStrings(textAreaVal,parereCurent));

            let categorieCurent=prod.getElementsByClassName("val-categorie")[0].innerHTML;
            let conditie5 = (category == "toate" || category == categorieCurent) && (categories.length  == 0 || categories.indexOf(categorieCurent) != -1);


            console.log(categorieCurent, categories);

            console.log(numeCurent, " : ", conditie1, conditie2, conditie3, conditie4, conditie5);

            let conditieFinala=(conditie1 && conditie2 && conditie3 && conditie4 && conditie5);

            if (butonBitcoin.checked){
                if (Bitcoin == "da" && numeCurent.localeCompare("Bitcoin") == 0){
                    conditieFinala = true;
                }
                if (Bitcoin_Cash == "da" && numeCurent.localeCompare("Bitcoin Cash") == 0){
                    conditieFinala = true;
                }
                if (Wrapped_Bitcoin == "da" && numeCurent.localeCompare("Wrapped Bitcoin") == 0){
                    conditieFinala = true;
                }
            }

            if (butonAltcoin.checked){
                if (Ethereum == "da" && numeCurent.localeCompare("Ethereum") == 0){
                    conditieFinala = true;
                }
                if (Cardano == "da" && numeCurent.localeCompare("Cardano") == 0){
                    conditieFinala = true;
                }
            }

            if (conditieFinala)
            {
                prod.style.display="block";
                cntr++;
            }
        }

        if(!cntr) alert("Nu avem niciun film pe placul dumneavoastra");
    }

    function sortArticole(factor){
        
        var produse=document.getElementsByClassName("produs");
        let arrayProduse=Array.from(produse);
        arrayProduse.sort(function(art1,art2){
            let nume1=art1.getElementsByClassName("val-pret")[0].innerHTML;
            let nume2=art2.getElementsByClassName("val-pret")[0].innerHTML;

            if(nume1==nume2)
            {
                let categorie1=art1.getElementsByClassName("val-categorie")[0].innerHTML;
                let categorie2=art2.getElementsByClassName("val-categorie")[0].innerHTML;
                return factor*categorie1.localeCompare(categorie2);
            }
            
            return factor*nume1.localeCompare(nume2);
            /*
            let rez=factor*nume1.localeCompare(nume2)
            if (rez==0)
                retrun factor*(pret1-pret2)
            return rez;
            */
        });
       // console.log(arrayProduse); 
        for (let prod of arrayProduse){
            prod.parentNode.appendChild(prod);
        }
    }





    btn=document.getElementById("sortCrescNume");
    btn.onclick=function(){
        sortArticole(1);
    }
    btn=document.getElementById("sortDescrescNume");
    btn.onclick=function(){
        sortArticole(-1);
    }

    btn=document.getElementById("resetare");
    btn.onclick=function(){
        document.getElementById("input-nume").value="";
        
        document.getElementById("inp-pret").value="300";
        document.getElementById("inp-rating").value="0";

        document.getElementById("inp-categorie").selectedIndex=0;
        document.getElementById("inp-multiplu").selectedIndex=-1;

        document.getElementById("input-parere").value="";

        var produse=document.getElementsByClassName("produs");
    
        for (let prod of produse){
            prod.style.display="block";
        }
    }

    btn=document.getElementById("suma");
    btn.onclick=function()
    {
        var produse=document.getElementsByClassName("produs");
        var sumaArt=0.0;
        for (let prod of produse){
            if(prod.style.display!="none")
            sumaArt+=parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML);
        }
        let infoSuma=document.createElement("p");//<p></p>
        infoSuma.innerHTML="Suma preturilor este: "+sumaArt;//<p>...</p>
        infoSuma.className="info-produse";
        let p=document.getElementById("p-suma");
        p.parentNode.insertBefore(infoSuma,p.nextSibling);
        setTimeout(function(){infoSuma.remove()}, 2000);

    }

}