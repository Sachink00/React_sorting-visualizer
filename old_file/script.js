
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;


const n = 20;
const array = [];

const stringHeight = myCanvas.height*0.45;

const socks = [];
const margin = 30;
const availablewidth = myCanvas.width - margin*2;
const spacing = availablewidth/n;


function generateArray(){
    for(let i=0;i<n;i++){
        array[i] = Math.random();
    }

    for(let i=0;i<socks.length;i++){

        const totalWidth = spacing * n;
        const startX = (myCanvas.width - totalWidth)/2;
        const x = startX + i * spacing + spacing / 2;
        const height = myCanvas.height * 0.4 * array[i];
        socks[i].loc = {
            x,
            y:stringHeight
        };
        socks[i].height = height;
        socks[i].queue = [];
        socks[i].color = "#38bdf8";
    }
    moves = [];
}


for(let i=0;i<n;i++){
    const x = i*spacing + spacing/2 + margin;
    const y = stringHeight;
    const height = myCanvas.height*0.4*Math.random();
    socks[i] = new Sock(x,y,height);
}

let moves = [];
generateArray();

let sorted = false;
animate();
function animate(){
    context.clearRect(0,0,myCanvas.width,myCanvas.height);

    context.beginPath();
    context.moveTo(0,stringHeight);
    context.lineTo(myCanvas.width,stringHeight);
    context.stroke();

    let changed = false;
    for(let i=0;i<socks.length;i++){
        changed = socks[i].draw(context) || changed;
    }

    if(!changed && moves.length>0){
        const nextMove = moves.shift();


        // define color

        if(nextMove.type === "comparison"){
            const [i,j] = nextMove.indices;

            socks[i].color = "#f97316";
            if(j !== undefined) socks[j].color = "#f97316";

            setTimeout(()=>{
                socks[i].color = "#38bdf8";
                if(j !== undefined) socks[j].color = "#38bdf8";
            },100);
        }

        if(nextMove.type === "pivot"){
            const [i] = nextMove.indices;

            socks[i].color = "#22c55e";

            setTimeout(()=>{
                socks[i].color = "#38bdf8";
            },150);
        }

        // swap handle
        if(nextMove.type == "swap"){
            const [i,j] = nextMove.indices;
            socks[i].moveTo(socks[j].loc);
            socks[j].moveTo(socks[i].loc);
            [socks[i],socks[j]] = [socks[j],socks[i]];
        }

        // overwrite handle
        if(nextMove.type === "overwrite"){
            const [i] = nextMove.indices;

            const newHeight = myCanvas.height * 0.4 * nextMove.value;
            socks[i].animateHeight(newHeight, 20);
        }

    }

    
    if(!changed && moves.length === 0){
        sorted = true;
        for(let i=0;i<socks.length;i++){

            const totalWidth = spacing * n;
            const startX = (myCanvas.width - totalWidth) / 2;
            const x = startX + i * spacing + spacing/2;
            socks[i].moveTo({x, y: stringHeight},20);

            socks[i].color = "#38bdf8";
        }
    }

    requestAnimationFrame(animate);
}


// sorting selector function

function getMoves(algo, array){
    const arrCopy = [...array];

    switch(algo){
        case "bubble":
            return bubbleSort(arrCopy);
        
        case "selection":
            return selectionSort(arrCopy);

        case "insertion":
            return insertionSort(arrCopy);

        case "quick":
            return quickSort(arrCopy);

        case "merge":
            return mergeSort(arrCopy);
    }
}


// Start button 

function startSort(){
    const algo = document.getElementById("algoSelect").value;

    // reset array
    for(let i=0;i<n;i++){
        array[i] = Math.random();
    }

    // reset socks positions 

    for(let i=0;i<socks.length;i++){
        const x = i*spacing + spacing/2 + margin;
        const height = myCanvas.height * 0.4 * array[i];
        socks[i].loc = {x, y: stringHeight};
        socks[i].height = height;
        socks[i].queue = [];
    }

    moves = getMoves(algo, [...array]);
}

// Bubble Sort

function bubbleSort(array){

    const moves = [];
    do{
        var swapped = false;
        for(let i=1;i<array.length;i++){
            moves.push({
                indices:[i-1,i],
                type:"comparison"
            });
            if(array[i-1]>array[i]){
                swapped = true;
                [array[i-1],array[i]]=[array[i],array[i-1]];
                moves.push({
                    indices:[i-1,i],
                    type:"swap"
                });
            }
        }
    }while(swapped);
    return moves;
}


// Selection Sort 

function selectionSort(array){
    const moves = [];
    for(let i=0; i<array.length;i++){
    let minIndex = i;

        for(let j=i+1;j<array.length;j++){

            moves.push({
                indices:[j,minIndex],
                type:"comparison"
            });

            if(array[j] < array[minIndex]){
                minIndex = j;
            }
        }
        if(minIndex != i){
            [array[i], array[minIndex]] = [array[minIndex],array[i]];

            moves.push({
                indices:[i,minIndex],
                type:"swap"
            });
        }
    }
    return moves;  
}

// insertion sort

function insertionSort(array){
    const moves = [];

    for(let i = 1; i < array.length; i++){
        let j = i;

        while(j > 0){

            
            moves.push({
                indices:[j-1,j],
                type:"comparison"
            });

            if(array[j-1] > array[j]){
                [array[j-1], array[j]] = [array[j], array[j-1]];

                moves.push({
                    indices:[j-1,j],
                    type:"swap"
                });
            } else {
                break;  
            }

            j--;
        }
    }

    return moves;
}

//  Quick sort

function quickSort(array){
    const moves = [];

    function helper(l, r){
        if(l >= r) return;

        let pivot = array[r];
        moves.push({
            indices:[r],
            type:"pivot"
        });
        let i = l;

        for(let j = l; j < r; j++){

            moves.push({
                indices:[j,r],
                type:"comparison"
            });

            if(array[j] < pivot){

                if(i !== j){   
                    [array[i], array[j]] = [array[j], array[i]];
                    moves.push({ indices:[i,j], type:"swap" });
                }

                i++;
            }
        }

        
        if(i !== r){
            [array[i], array[r]] = [array[r], array[i]];
            moves.push({ indices:[i,r], type:"swap" });
        }

        helper(l, i-1);
        helper(i+1, r);
    }

    helper(0, array.length-1);
    return moves;
}

// Merge Sort

function mergeSort(array){
    const moves = [];

    function merge(l, m, r){
        let left = array.slice(l, m + 1);
        let right = array.slice(m + 1, r + 1);

        let i = 0;
        let j = 0;
        let k = l;

        while(i < left.length && j < right.length){

            if(left[i] <= right[j]){
                array[k] = left[i];

                moves.push({
                    indices: [k],
                    type: "overwrite",
                    value: left[i]
                });

                i++;
            } else {
                array[k] = right[j];

                moves.push({
                    indices: [k],
                    type: "overwrite",
                    value: right[j]
                });

                j++;
            }

            k++;
        }

        while(i < left.length){
            array[k] = left[i];

            moves.push({
                indices: [k],
                type: "overwrite",
                value: left[i]
            });

            i++;
            k++;
        }

        while(j < right.length){
            array[k] = right[j];

            moves.push({
                indices: [k],
                type: "overwrite",
                value: right[j]
            });

            j++;
            k++;
        }
    }

    function helper(l, r){
        if(l >= r) return;

        let m = Math.floor((l + r) / 2);

        helper(l, m);
        helper(m + 1, r);
        merge(l, m, r);
    }

    helper(0, array.length - 1);

    return moves;
}