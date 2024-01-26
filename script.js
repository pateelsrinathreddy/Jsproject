let buttonE = document.getElementById("buttonelement");
let TodoE = document.getElementById("todo");
let MainE = document.getElementById("main");
let MainE1=document.getElementById("main1");
let dangE=document.getElementById("danger");
let countE=document.getElementById("count")



buttonE.onclick = call
   

function counttask(){
    let d=localStorage.getItem("Todo")
    let e=JSON.parse(d)
    countE.textContent=`:${e.length}`
    console.log(e.length)
     if(e.length === 0){
        dangE.style.display='none'
        } else {
        dangE.style.display='block'
     }
}

function call() {
    let existingData = JSON.parse(localStorage.getItem("Todo")) || [];

    
    let maxUnique = existingData.reduce((max, task) => (task.unique > max ? task.unique : max), 0);

    let input = TodoE.value;

    if (input === "") {
        alert("Input can't be empty");
    } else {
        let b = {
            task: input,
            unique: maxUnique + 1,
        };

        existingData.push(b);

        localStorage.setItem("Todo", JSON.stringify(existingData));
       
        
        TodoE.value = "";
       
        
        toastr.success("Added successfully","", { timeOut: 2000 });

        counttask()
        append();
        
    }
    
}

function append(){
    MainE1.innerHTML=""

    let info=JSON.parse(localStorage.getItem("Todo"))
   info.map((val)=>{
    let para=document.createElement("p")
    let divE=document.createElement("div")
    para.textContent=val.task
    let imge=document.createElement("img")
    imge.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEnLLzzRevgxewruaGiZB473nhHZCKnplYTL4nrtB5gOFrLTQMCxdgVTE1EcPDf-rv59E&usqp=CAU"
    imge.addEventListener("click",()=>{
    filtering(val.unique)
    // console.log(val.unique)
    })
    divE.classList.add("box")
    para.classList.add("para-style")
    
    divE.appendChild(para)
    divE.appendChild(imge)
    MainE1.appendChild(divE)
    
   })
}

function filtering(id){
    let getItems=JSON.parse(localStorage.getItem("Todo"))
    
    
        let afterfilter=getItems.filter((info)=>{
            if(info.unique !== id){
               return info
            }
        })

   
    localStorage.setItem("Todo",JSON.stringify(afterfilter))
    toastr.success("Removed successfully","", { timeOut: 2000 });

    append()
    counttask()
}
dangE.onclick=function(){
    localStorage.clear()
    
    localStorage.setItem("Todo",JSON.stringify([]))
    append()
    counttask()
}
   



counttask()
append()


