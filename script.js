const container = document.querySelector('.container');
const gridWidth = document.querySelector('#width-range');
const gridHeight = document.querySelector('#height-range');
const valueWidth = document.querySelector('#width-value');
const valueHeight = document.querySelector('#height-value');
const submitBtn = document.querySelector('#submit-grid');
const clearBtn = document.querySelector('#clear-grid');
const inputColor = document.querySelector('#input-color');
const eraseBtn = document.querySelector('#erase-btn');
const paintBtn = document.querySelector('#paint-btn');



const events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },

    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
    },
}

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = function(){
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
}


isTouchDevice()

submitBtn.addEventListener("click", function(){
    container.innerHTML = "";
    let count = 0;
    for(let i = 0; i < gridHeight.value; i++){
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow")

        for(let j = 0; j < gridWidth.value; j++){
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol")
            col.setAttribute("id", `gridCol${count}`);
            col.addEventListener(events[deviceType].down, function(){
                draw = true;
                if(erase){
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = inputColor.value;
                }
            });
    
            col.addEventListener(events[deviceType].move, function(e){
                 let elementId = document.elementFromPoint(!isTouchDevice() ? e.clientX : e.touches[0].clientX, 
                !isTouchDevice() ? e.clientY : e.touches[0].clientY).id;
                checker(elementId);
            });
    
            col.addEventListener(events[deviceType].up, function(){
                draw = false;
            })

            div.appendChild(col);
    
        }

        container.appendChild(div)
    }

})


function checker(elementId){
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach(function(item){
        if(elementId == item.id){
            if(draw && !erase){
                item.style.backgroundColor = inputColor.value;
            } else if (draw && erase) {
                item.style.backgroundColor = "transparent"
            }
        }
    })
}


clearBtn.addEventListener("click", function(){
    container.innerHTML = "";
});

eraseBtn.addEventListener("click", function(){
    erase = true;
});

paintBtn.addEventListener("click", function(){
    erase = false;
});

gridWidth.addEventListener("input", function(){
    valueWidth.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", function(){
    valueHeight.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = function(){
    gridHeight.value = 0;
    gridWidth.value = 0;
}