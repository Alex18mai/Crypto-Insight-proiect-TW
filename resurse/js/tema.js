window.addEventListener("load",function()
{
    if (localStorage.getItem("theme")=="dark"){
        document.body.classList.add("dark");
        document.getElementById("schimbare-tema").classList.toggle("dark");
        document.getElementById("schimbare-tema").classList.toggle("light");
    }
    document.getElementById("schimbare-tema").onclick=function()
    {
        
        document.body.classList.toggle("dark");
        document.getElementById("schimbare-tema").classList.toggle("dark");
        document.getElementById("schimbare-tema").classList.toggle("light");
        if(document.body.classList.contains("dark"))
        {
            localStorage.setItem("theme","dark")
           // document.getElementById("schimbare-tema").innerHTML=""
        }
        else 
        {
            localStorage.setItem("theme","light");
        }

    
    }

});