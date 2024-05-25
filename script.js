let button=document.querySelector(".start");
let boxes=document.getElementsByClassName("box")
let gameStarted=false
let values=new Array(16)
let totalChanceCount=0
let flip=new Array(16).fill(0)
let gridNumber=0
let gridNumber2=0
let cardsFlipped=0
let turnMusic=new Audio("ting.mp3")
let gameMusic=new Audio("Monkeys-Spinning-Monkeys(chosic.com).mp3")



function generateValues()
{
    for(let i=0;i<8;i++)
    {
        values[2*i]=i+1
        values[2*i+1]=i+1
        
    }
    for (let i = values.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at indices i and j
        [values[i], values[j]] = [values[j], values[i]];

    }
}


function reset()
{
    
    let str="LETSTESTYOUR<IQ>"
    for (let i=0;i<16;i++)
    {
        boxes[i].innerHTML=str[i]
    }
    generateValues()
    flip.fill(0)
    document.getElementById("youWin").style.opacity=0
    document.getElementById("youWin").style.display="none"

}


function hideAll()
{
    for (let i = 0; i < boxes.length; i++)
    {
        boxes[i].innerHTML="?"
    }
}



function checkWin()
{
    
    if(totalChanceCount<16)
    {
        return
    }
    else if(flip.every(element=>element===1))
       { 
        console.log("you win")
        document.getElementById("youWin").style.opacity=1
        document.getElementById("youWin").style.display="block"
        
       }
}    



function startChance(gridNumber)
{
    if(cardsFlipped===0)
    {
        boxes[gridNumber].innerHTML=values[gridNumber]
        cardsFlipped=1
        gridNumber2=gridNumber


    }
    else if(cardsFlipped===1)
    {
        boxes[gridNumber].innerHTML=values[gridNumber]
        cardsFlipped=0
        if(boxes[gridNumber].innerHTML===boxes[gridNumber2].innerHTML)
        {
            flip[gridNumber]=1
            flip[gridNumber2]=1
            checkWin()
          
        }
        else{
            setTimeout(()=>{
            boxes[gridNumber].innerHTML="?";
            boxes[gridNumber2].innerHTML="?";
           
            },
            1000)
            
        }
    }

}


button.addEventListener('click',()=>
{

   
  
    if(!gameStarted)
    {
        gameMusic.loop=true
        gameMusic.play()

        hideAll()
        gameStarted=true
        generateValues()
        button.innerHTML="RESET"
    }
    
    else
    {
        reset()
       
    }
    
    
})


Array.from(boxes).forEach(element=>{
    element.addEventListener('click',()=>{
        turnMusic.play()
        
        if(!gameStarted)
        {
            return
        }
      
        gridNumber=event.target.dataset.grid 
        if(flip[gridNumber]===1)
        {
            return
        }
        if(cardsFlipped===1 || cardsFlipped===0)
        { 
            totalChanceCount++
            
            startChance(gridNumber)
        }
        })
})
