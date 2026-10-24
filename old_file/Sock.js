class Sock{
    constructor(x,y,height){
        this.width = 22;
        this.loc = {x,y}
        this.height = height;
        this.queue = [];

        this.color = "#38bdf8";
    }

    moveTo(newLoc,frameCount=50){
        for(let i=1;i<=frameCount;i++){
            const t = i/frameCount;
            this.queue.push(vLerp(this.loc,newLoc,t));
        }
    }


    animateHeight(newHeight, frameCount = 20){
        const start = this.height;

        for(let i=1;i<=frameCount;i++){
            const t = i/frameCount;
            const h = lerp(start, newHeight, t);

            this.queue.push({...this.loc,
                             height: h
            });
        }
    }

    draw(context){
        let changed = false;
        if(this.queue.length>0){
            const next = this.queue.shift();

            // swap draw
            if(next.x !== undefined) this.loc.x = next.x;
            if(next.y !== undefined) this.loc.y = next.y;


            // new height draw for merge sort
            if(next.height !== undefined){
                this.height = next.height;
            }

            changed = true;
        }
        const {x,y} = this.loc;
        const left = x - this.width/2;
        const right = x + this.width/2;
        const bottom = y + this.height;

       
        context.beginPath();
        context.fillStyle = this.color || "#38bdf8";
        context.roundRect(left,y,this.width,this.height,6);
        context.fill();
        context.strokeStyle = "rgba(255,255,255,0.2)";
        context.stroke();

        return changed;
    }
}