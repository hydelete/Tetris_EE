/**
 * @copyright
 * @author @hydelete
 */


/**
 *      
 *     used for describing Position
 *     based on Object that egret.Point
 */
class HDP {

    public x;
    public y;

    public constructor(){

        let p = new egret.Point();

        this.x = p.x;
        this.y = p.y;
    }
}

/**
 * 
 *    @desc 
 * 
 */
class HD_GamePlayer {
    // private context: egret.DisplayObjectContainer;


    /**
     *      data struct desc: each block has index for position, more than that, lets marked it that hold 0 or 1 for per cell, if hold 1, show block, otherwise, hide block     
     *      
     */
    public initData4Test():void{

        if(_G.checkDebugging()){
            CaseFactory.build().case0(this.arr_fixed);
        }
        

        // for(let i = 0; i < 6; ++i){
        //     this.arr_fixed.push(1);
        // }

        // for(let i = 0; i < 4; ++i){
        //     this.arr_fixed.push(1);
        // }

        // for(let i = 0; i < 4; ++i){
        //     this.arr_fixed.push(0);
        // }

        // for(let i = 0; i < 5; ++i){
        //     this.arr_fixed.push(1);
        // }

        //         for(let i = 0; i < 4; ++i){
        //     this.arr_fixed.push(1);
        // }

        // for(let i = 0; i < 4; ++i){
        //     this.arr_fixed.push(0);
        // }

        // for(let i = 0; i < 5; ++i){
        //     this.arr_fixed.push(1);
        // }

        // for(let i = 0; i < 4; ++i){
        //     this.arr_fixed.push(1);
        // }

        // for(let i = 0; i < 4; ++i){
        //     this.arr_fixed.push(0);
        // }

        // for(let i = 0; i < 5; ++i){
        //     this.arr_fixed.push(1);
        // }

        //         for(let i = 0; i < 4; ++i){
        //     this.arr_fixed.push(1);
        // }

        // for(let i = 0; i < 4; ++i){
        //     this.arr_fixed.push(0);
        // }

        // for(let i = 0; i < 5; ++i){
        //     this.arr_fixed.push(1);
        // }

        // for(let i = 0; i < 4; ++i){
        //     this.arr_fixed.push(1);
        // }

        // for(let i = 0; i < 4; ++i){
        //     this.arr_fixed.push(0);
        // }

        // for(let i = 0; i < 5; ++i){
        //     this.arr_fixed.push(1);
        // }
        // for(let i = 0; i < 4; ++i){
        //     this.arr_fixed.push(0);
        // }


    }

    /**
     *      to be optimized
     *      check in and remove the line that got maxed
     *  
     */
    public checkBlocks(){

        // console.log("checkBlocks invoke");

        let lineMin = 0;
        let lineMax = 0;
        
        //状态1表示有显示方块，状态0表示无显示方块，初期要不要将方块全数填充至0，需要考虑
        lineMin = Math.floor(0 / this.maxOneline);
        lineMax = Math.floor(this.arr_fixed.length / this.maxOneline);

        if(lineMin == lineMax){

            console.log("less one line to be checked out!!");

            return false;
        }

        let allBlocks = this.arr_fixed;
        //get all lines that left 2 and right 2 hold 1 simultaneously
        let linesTemp = [];
        for(let idx = 0; idx <= lineMax; ++idx){
            let pos0 = idx * this.maxOneline + 0;
            let pos1 = idx * this.maxOneline + 1;
            let posr1 = idx * this.maxOneline + this.maxOneline -2;
            let posr0 = idx * this.maxOneline + this.maxOneline -1;

            if( 1 == (allBlocks[pos0]&allBlocks[pos1]&allBlocks[posr1]&allBlocks[posr0])){
                linesTemp.push(idx);
            }

        }

        let lines2Free = [];
        let count4Check = this.maxOneline - 4;
        //check each line of them to see if every block equal 1 except both ends
        for(let idx = 0; idx < linesTemp.length; ++idx){
            
            let passed = true;
            let idxLine = linesTemp[idx];
            for(let i = 0; i < count4Check; ++i){

                let pos = idxLine * this.maxOneline + 2 + i;
                if( 0 == allBlocks[pos]){
                    passed = false;
                    break;
                }

            }

            if(passed){
                lines2Free.push(idxLine);
            }

        }

        //finally, set those blocks to have them hold 0
        for(let idx = 0; idx < lines2Free.length; ++idx){
            let idxLine = lines2Free[idx];
            for(let i = 0; i < this.maxOneline; ++i){
                this.arr_fixed[idxLine * this.maxOneline + i] = 0;
            }
        }



        //having lines that above free line drop which means position that those blocks of lines decrease n * lineMax
        for(let idx = lines2Free.length; idx > 0; --idx){
            let idxLine = lines2Free[idx - 1];

            // console.log("line no = "  +  idxLine);

            for(let i = idxLine * this.maxOneline + this.maxOneline; i < allBlocks.length; ++i){
                //iterate each drop
                this.arr_fixed[i - this.maxOneline] = this.arr_fixed[i];
                //clear top line
                if(i > idxLine * this.maxOneline){
                    this.arr_fixed[i] = 0;
                }
            }
        }

    }

    private arr_fixed :Array<number> = [];

    private maxOneline = _G._MAX_GRIDS_A_LINE;
    private _cell_side_length = _G._UNIT_SIDE_LENGTH;

    private gridPosY = _G._GAME_SHAPE_BORN_POSITION;
    private gridPosX = Math.floor(this.maxOneline / 2) - 1;

    private gridPosYOrigin;
    private gridPosXOrigin;

    private globalOffsetX = _G._CONTAINER_OFFSET_X;
    private globalOffsetY = _G._CONTAINER_OFFSET_Y;

    private isActive : boolean = true;
    private toremove : boolean = false;
    private instantUsed : boolean = false;
    

    private shapeData = GameDataManager.getManager().getShapeDataByTypeId(GameDataManager.TYPE_Z);
    private shapeIndex = 0;

    private timeaddups = 0;
    private timeaddupMax = _G._GAME_SPEED;



    public run(interval: number){
        // this.frameCount4Update = ( this.frameCount4Update % _G._GAME_AUTO_PAUSE == 0) ?  0 : this.frameCount4Update;
        
        this.timeaddups += interval;
        this.timeaddups = ( this.timeaddups % this.timeaddupMax == 0) ?  0 : this.timeaddups;

        this.uptResetPlayerCountdown();
        
        if(this.timeaddups == 0) {
            this.moveDown(1);
        }        

    }

    public getOnelineLength(){

        return this._cell_side_length * this.maxOneline;
    }

    public randomNewShape(){

        this.shapeData = GameDataManager.getManager().getShapeDataByTypeId( _U.load().randomInt(GameDataManager.TYPE_T + 1) );

        if(_G.checkDebugging()){
            this.shapeData = GameDataManager.getManager().getShapeDataByTypeId( GameDataManager.TYPE_I );
        }

        this.shapeIndex = 0;
    }

    // the part for pure and core of rotation
    private actRotation(){
        this.shapeIndex ++;
        this.shapeIndex = ( this.shapeIndex % this.shapeData.length == 0) ?  0 : this.shapeIndex;
        this.timeaddups -= 4;
        if(this.timeaddups < 0){
            this.timeaddups = 0;
        }
    }

    public getShapeNow(){
        return this.shapeData[this.shapeIndex];
    }

    public getShapeNext(){

        let shapeIndexNext = this.shapeIndex + 1;
        shapeIndexNext = ( shapeIndexNext % this.shapeData.length == 0) ?  0 : shapeIndexNext;        

        return this.shapeData[shapeIndexNext];
    }
    /**
     * 
     *   @return  return a temp array
     */
    public getAbsPositionByShapedata(px, py){
        return [(this.gridPosX + px) , (this.gridPosY + py)];
    }


    public isBolckUsedP(pxy){

        let posToIndex = pxy[0] + this.maxOneline * pxy[1];
        return this.arr_fixed[posToIndex] == 1; 

    }

    public isBolckUsedPXY(px, py){
        return this.isBolckUsedP([px, py]);
    }

    public rotate(){

        // this.actRotation();

        let isRotatable = true;
        let premoveToRight = true;
        let premoveToLeft = true;
        let premoveToRight2 = true;
        let premoveToLeft2 = true;        

        //if no space to fitting next rotation, then try to move to the right, 
        //as resulting to that, if yes then ok, if not, then try to move to left


        //check out isRotatable
        let shpdata = this.getShapeNext();
        for(let i = 0 ; i < shpdata.length; i = i + 2){

            let pos = this.getAbsPositionByShapedata(shpdata[i], shpdata[i + 1]);
            
            if( this.isBolckUsedP(pos) ){

                isRotatable = false;

                break;
            }
            
        }


        let isPremoveOneEnough = false;  //a solution for fitting situation of type I 
        //check out premoveToRight, premoveToLeft
        if(!isRotatable){

            for(let i = 0 ; i < shpdata.length; i = i + 2){

                let pos = this.getAbsPositionByShapedata(shpdata[i], shpdata[i + 1]);
                
                let rigPosX = shpdata[i] + this.gridPosX + 1;
                let lefPosX = shpdata[i] + this.gridPosX - 1;

                let rigPosX2 = shpdata[i] + this.gridPosX + 2;
                let lefPosX2 = shpdata[i] + this.gridPosX - 2;                

                if( rigPosX > (this.maxOneline - 1) ){
                    premoveToRight = false;
                 }else if( this.isBolckUsedPXY( rigPosX , pos[1]) ){
                    premoveToRight = false;
                }

                if( lefPosX < 0 ){
                    premoveToLeft = false;
                }else if( this.isBolckUsedPXY( lefPosX , pos[1]) ){
                    premoveToLeft = false;
                }

                if( rigPosX2 > (this.maxOneline - 1) ){
                    premoveToRight2 = false;
                 }else if( this.isBolckUsedPXY( rigPosX2 , pos[1]) ){
                    premoveToRight2 = false;
                }

                if( lefPosX2 < 0 ){
                    premoveToLeft2 = false;
                }else if( this.isBolckUsedPXY( lefPosX2 , pos[1]) ){
                    premoveToLeft2 = false;
                }                
            }

            // if premoving to right succeed with no hitting, then do move to right
            if((!premoveToLeft)&&premoveToRight){
                this.gridPosX += 1;
                this.actRotation();
                isPremoveOneEnough = true;
            }
            // if premoving to left succeed with no hitting, then do move to left
            if((!premoveToRight)&&premoveToLeft){
                this.gridPosX -= 1;
                this.actRotation();
                isPremoveOneEnough = true;
            }

            //if just one move not to enough
            if(!isPremoveOneEnough){
                
                if((!premoveToLeft2)&&premoveToRight2){
                    this.gridPosX += 2;
                    this.actRotation();
                }
                
                if((!premoveToRight2)&&premoveToLeft2){
                    this.gridPosX -= 2;
                    this.actRotation();
                }               
            }

        }

        if(isRotatable){
            this.actRotation();
        }

        //if left and right are both could not to move, try move back from down to up with amount of height after calculating

        //and if all of steps above do not make sense, it just could not to rotate right here


        //prevent touching left edge
        let offsetHori = this.getShapeNow()[0]

        let absX = this.gridPosX + offsetHori;
        let nearLeft = false;

        if( absX < 0 ){
            nearLeft = true;
            this.gridPosX = 0;
            
        }

        //prevent touching right edge
        if(!nearLeft){

            let wid = this.getCurrentWidth();

            if (( this.gridPosX + wid + offsetHori ) > this.maxOneline){
                this.gridPosX -= this.gridPosX + wid + offsetHori - this.maxOneline;
            } 

        }
    }

    public getCurrentWidth(){

        let xset = this.getShapeDataX();
        
        let min = 99, max = 0;

        for(let i = 0; i < xset.length; ++i){

            if(xset[i] > max){
                max = xset[i];
            }

            if(xset[i] < min){
                min = xset[i];
            }         
        }

        return max - min + 1;
    }

    public instantFalldown(): void{

        this.instantUsed = true;

        let moveMax = 0;
        
        let shpdata = this.getShapeNow();

        let pCheckList = [];

        for(let i = 0 ; i < shpdata.length; i = i + 2){

            let pos = this.getAbsPositionByShapedata(shpdata[i], shpdata[i + 1]);
            
            pCheckList.push(pos);
            //find top yvalue of position at the same column

        }

        let arr4Cols = [];
        let wid = this.getCurrentWidth();

        let offsetHori = this.getShapeNow()[0];     //for vertical form of type I, commonly the value is 0

        if( wid <= 0 || wid > 4){
            console.log("error occurring in function instantFalldown()");
        }else{

            for(let i = 0; i < wid; ++i){
                arr4Cols[i] = [];
            }
        }


        for(let i = this.arr_fixed.length - 1; i >= 0; --i){

        
            if(this.arr_fixed[i] == 1){
                let colNum = i % this.maxOneline;
                let rowNum = Math.floor(i / this.maxOneline);

                if(colNum >= (this.gridPosX + offsetHori) && colNum < (this.gridPosX + wid + offsetHori)){


                    if(rowNum < this.gridPosY){
                        arr4Cols[colNum - this.gridPosX - offsetHori].push(i);
                    }
                    

                }
            }
        }


        let minDistance = 99;

        for(let i = 0 ; i < arr4Cols.length; ++i){

            let allIndexThisCol = arr4Cols[i];

            //this way, i for what
            
            if(allIndexThisCol.length > 0){

                let topIndexThisCol = allIndexThisCol[0];

                let colNum = topIndexThisCol % this.maxOneline;

                for(let j = 0; j < pCheckList.length; j++){

                    let pos = pCheckList[j];

                    if(pos[0] == colNum){

                        let distance = pos[1] - Math.floor((topIndexThisCol / this.maxOneline)) - 1;

                        if(minDistance > distance){
                            minDistance = distance;
                        }
                    }
                }
            }
        }

        if(minDistance != 99){
            this.moveDown(minDistance);
        }else{
            this.moveDown(this.gridPosY);
        }
        
    }

    //fix all blocks means that convert unactived block to static grids
    public toFixBlocks(){

        let posToIndexes = [];
        for(let i = 0; i < this.getShapeNow().length ; i = i + 2){

            posToIndexes.push( (this.gridPosXOrigin + this.getShapeNow()[i]) + this.maxOneline * (this.gridPosYOrigin + this.getShapeNow()[i + 1]) );

        }

        let zeroExpansion = posToIndexes[posToIndexes.length - 1] - this.arr_fixed.length;

        // by default, the last one in list have the max index
        for(let i = 0; i < zeroExpansion; ++i){
            this.arr_fixed.push(0);
        }

        if(zeroExpansion > 0){
            
            let len = this.getShapeNow().length / 2;
            
            //ones before the last one
            for(let i = 0; i < len - 1; ++i){
                this.arr_fixed[posToIndexes[i]] = 1;
            }
            //last one
            this.arr_fixed.push(1);
        }else{ 
            //for case index of block less than length of all blocks 
            for(let i = 0; i < posToIndexes.length; ++i){
                this.arr_fixed[posToIndexes[i]] = 1;
            }            
        } 
                
        this.enableResetPlayerCountdown();
        this.checkBlocks();
    }


    public countdown4Reset = -1;
    public enableResetPlayerCountdown(){

        this.countdown4Reset = 15;

    }


    public resetPlayer(){

        this.instantUsed = false;
        this.isActive = true;
        this.toremove = false;          
        this.gridPosY = _G._GAME_SHAPE_BORN_POSITION;
        // this.gridPosX = _U.load().randomInt(13);
        this.gridPosX = Math.floor(this.maxOneline / 2) - 1;
        this.randomNewShape();
        this.countdown4Reset = -1;

    }

    //  decrease 1 per interval
    public uptResetPlayerCountdown(){
        if( 0 == this.countdown4Reset){
            this.resetPlayer();
        }
        if(this.countdown4Reset > 0){
            this.countdown4Reset --;
        }

    }

    //check next step, if there block is, set that block unactive and ready to remove 
    public checkBlockActive(){
        // let thisPosToIndex = this.gridPosX + this.maxOneline * this.gridPosY;
        // let nextPosToIndex = this.gridPosX + this.maxOneline * (this.gridPosY - 1);
        // let nextPosToIndex1 = (this.gridPosX + this.addX) + this.maxOneline * ( (this.gridPosY + this.addY) - 1);
        
        let that = this;
        let ontogo = function(that){
            that.isActive = false;
            that.toremove = true;
            that.gridPosYOrigin = that.gridPosY;
            that.gridPosXOrigin = that.gridPosX;
            that.gridPosY = 9999;  //for to invisible
            that.toFixBlocks();   
        }

        //if next position drops into line 0, and which on line 0 hold 0
        if((this.gridPosY == 0) ) {
            ontogo(this);
        }else{

            for(let i = 0; i < this.getShapeNow().length ; i = i + 2){

                let nextPosToIndex1 = (this.gridPosX + this.getShapeNow()[i]) + this.maxOneline * ( (this.gridPosY + this.getShapeNow()[i + 1]) - 1);
                if((nextPosToIndex1 < this.arr_fixed.length) && (this.arr_fixed[nextPosToIndex1] == 1) ) {
                    ontogo(this);
                    break;
                }
            }
            

            // if((nextPosToIndex < this.arr_fixed.length) && (this.arr_fixed[nextPosToIndex] == 1) ) {
            //     ontogo(this);  
            // }else{

            //     if((nextPosToIndex1 < this.arr_fixed.length) && (this.arr_fixed[nextPosToIndex1] == 1) ) {
            //          ontogo(this);  
            //     }else{
                    
            //     }             
            // } 
        }

        this.toremove = true;
    }


    private getShapeDataX(){

        let ret = [];

        for(let i = 0 ; i < this.getShapeNow().length; i = i + 2){
            ret.push(this.getShapeNow()[i]);
        }

        return ret;
    }


    public getIndexByShapedata(px, py){

        return (this.gridPosX + px) + this.maxOneline * (this.gridPosY + py);
    }

    public moveLeft(){

        if(this.instantUsed){
            return;
        }

        let xdata = this.getShapeDataX();
        
        let breakThis = false;

        xdata.forEach(x => {
            if((this.gridPosX + x) <= 0 ){
                breakThis = true;
            }
        });

        if(breakThis){return;}

        for(let i = 0 ; i < this.getShapeNow().length; i = i + 2){
            let curPosToIndex = this.getIndexByShapedata(this.getShapeNow()[i], this.getShapeNow()[i + 1]);
            let nextPosToIndex = curPosToIndex - 1;

            if(curPosToIndex == this.arr_fixed.length){
                breakThis = true;
                break;
            }

            if((nextPosToIndex < this.arr_fixed.length) && (this.arr_fixed[nextPosToIndex] == 1) ) {
                breakThis = true;
                break;
            }
        }        

        if(breakThis){return;}


        this.gridPosX -= 1;
    }

    public moveRight(){

        if(this.instantUsed){
            return;
        }

        let xdata = this.getShapeDataX();
        
        let breakThis = false;

        xdata.forEach(x => {
            if((this.gridPosX + x) >= (this.maxOneline - 1) ){
                breakThis = true;
            }
        });

        if(breakThis){return;}

        for(let i = 0 ; i < this.getShapeNow().length; i = i + 2){

            let curPosToIndex = this.getIndexByShapedata(this.getShapeNow()[i] , this.getShapeNow()[i + 1]);
            let nextPosToIndex = curPosToIndex + 1;

            if((nextPosToIndex < this.arr_fixed.length) && (this.arr_fixed[nextPosToIndex] == 1) ) {
                breakThis = true;
                break;
            }
        }        

        if(breakThis){return;}

        this.gridPosX += 1; 
    }    

    public moveDown(val : number):void{

        this.checkBlockActive();

        if(!this.isActive){
            return;
        }

        this.gridPosY = this.gridPosY - val;
    }    

    public drawPlayer(shape : egret.Shape ){

        shape.graphics.clear();

        let sideLength = this._cell_side_length;
        
        let maxOneline = this.maxOneline;

        //let thisColor = 0xe43333;
        let borderCorlor = 0x121212;

        if(_G._BLOCK_BORDER_SWITCH){
            shape.graphics.lineStyle(1, borderCorlor);
        }
        
        
        // let thisColor = 0xFD6A02;
        let thisColor = 0xFD0755;

        shape.graphics.beginFill(thisColor, 1);
        
        
      
        for(let i = 0; i < this.getShapeNow().length; i=i+2){

            

            let x = this.globalOffsetX + (this.gridPosX + this.getShapeNow()[i]) * sideLength;
            let y = _G._GAME_DESIGN_HEIGHT - this.globalOffsetY -  ( this.gridPosY + this.getShapeNow()[i + 1]) * sideLength - sideLength;

            shape.graphics.drawRect(x, y, sideLength, sideLength);
        }

        shape.graphics.endFill();
    }

    //if that draws all blocks with single shape-obj which could occur an unexpected issue
    public draw(shapelist :any){
        
            let sideLength = this._cell_side_length;
            
            let maxOneline = this.maxOneline;

            //let thisColor = 0xe43333;
            let borderCorlor = 0x121212;

            for(let s = 0; s < shapelist.length; ++s){
                shapelist[s].graphics.clear();
                if(_G._BLOCK_BORDER_SWITCH){
                    shapelist[s].graphics.lineStyle(1, borderCorlor);
                }
            }

            // let thisColor = _U.load().randomColor();
            
            let thisColor = 0xFD6A02;

            for(let idx = 0; idx < this.arr_fixed.length; ++idx){

                 let val = this.arr_fixed[idx];

                 if(1 == val){

                    let n = idx % maxOneline;
                    let m = Math.floor(idx / maxOneline);
       
                    //one shape used to mantain 2 lines
                    let iShape = shapelist[Math.floor(m / 2)];

                    iShape.graphics.beginFill(thisColor, 1);
                    
                    

                    iShape.graphics.drawRect(this.globalOffsetX + n * sideLength, _G._GAME_DESIGN_HEIGHT - this.globalOffsetY - m * sideLength - sideLength, sideLength, sideLength);

                }               

            }

            // shapelist[0].graphics.endFill();
            for(let s = 0; s < shapelist.length; ++s){

                shapelist[s].graphics.endFill();
            }
    }

    public constructor(ctx : egret.DisplayObjectContainer) {
        
        // this.color = _U.load().randomColor();

        // this.context = ctx;
        
    }
  
}


class GameDataManager {

    public static TYPE_I  = 0;
    public static TYPE_O  = 1;
    public static TYPE_Z  = 2;
    public static TYPE_S  = 3;
    public static TYPE_J  = 4;
    public static TYPE_L  = 5;
    public static TYPE_T  = 6;

    public allData = [];
    /**
     *   
     *  𝅘𝅥𝅮
     *  𝅘𝅥𝅮
     *  𝅘𝅥𝅮
     *  𝅘𝅥𝅮
     */

    private dataI = [];
    // dataI[0] = [ 0,  0 , 1, 0, 2, 0, 3 , 0];

    // dataI[1] = [ 0,  0 , 0, 1, 0, 2, 0 , 3];

    // dataI[2] = [ 0 , 3, 1, 3, 2, 3, 3, 3];

    /**
     *   
     *  𝅘𝅥𝅮 𝅘𝅥𝅮
     *  𝅘𝅥𝅮 𝅘𝅥𝅮
     */
    private dataO = [];
    //dataO[0] = [0, 0, 0, 1, 1, 0, 1, 1];

    /**
     *                            𝅘𝅥𝅮
     * 𝅘𝅥𝅮 𝅘𝅥𝅮                     𝅘𝅥𝅮 𝅘𝅥𝅮 
     *   𝅘𝅥𝅮 𝅘𝅥𝅮                   𝅘𝅥𝅮 
     */
    private dataZ = [];
    // dataZ[0] = [0, 0, 0, 1, 1, 1, 1, 2];
    // dataZ[1] = [1, 0, 2, 0 ,0, 1, 1, 1];



    /**
     *                          𝅘𝅥𝅮
     *     𝅘𝅥𝅮 𝅘𝅥𝅮                 𝅘𝅥𝅮 𝅘𝅥𝅮 
     *   𝅘𝅥𝅮 𝅘𝅥𝅮                     𝅘𝅥𝅮 
     */
    private dataS = [];
    // dataS[0] = [1, 0, 0, 1, 1, 1, 0, 2];
    // dataS[1] = [0, 0, 1, 0, 1, 1, 2, 1];

    /**
     *     𝅘𝅥𝅮                     𝅘𝅥𝅮 𝅘𝅥𝅮            
     *     𝅘𝅥𝅮        𝅘𝅥𝅮            𝅘𝅥𝅮        𝅘𝅥𝅮 𝅘𝅥𝅮 𝅘𝅥𝅮
     *   𝅘𝅥𝅮 𝅘𝅥𝅮        𝅘𝅥𝅮 𝅘𝅥𝅮 𝅘𝅥𝅮        𝅘𝅥𝅮            𝅘𝅥𝅮
     */
    private dataJ = [];
    
    // dataJ[0] = [ 0, 0, 1, 0, 1, 1, 1, 2];
    // dataJ[1] = [0, 0, 1, 0, 2, 0, 0, 1];
    // dataJ[2] = [0, 0, 0, 1, 0, 2, 1, 2];
    // dataJ[3] = [2, 0, 0, 1, 1, 1, 2, 1 ];


    /**
     *   𝅘𝅥𝅮                     𝅘𝅥𝅮 𝅘𝅥𝅮            
     *   𝅘𝅥𝅮         𝅘𝅥𝅮 𝅘𝅥𝅮 𝅘𝅥𝅮         𝅘𝅥𝅮            𝅘𝅥𝅮
     *   𝅘𝅥𝅮 𝅘𝅥𝅮       𝅘𝅥𝅮             𝅘𝅥𝅮        𝅘𝅥𝅮 𝅘𝅥𝅮 𝅘𝅥𝅮
     */

    private dataL = [];
    //  dataL[0] = [0, 0, 1, 0, 0, 1, 0, 2];
    //  dataL[1] = [0, 0, 0, 1, 1, 1, 2, 1];
    //  dataL[2] = [1, 0, 1, 1, 0, 2, 1, 2];
    //  dataL[3] = [0, 0, 1, 0, 2, 0, 2, 1];


    /**
     *               𝅘𝅥𝅮                         𝅘𝅥𝅮
     *     𝅘𝅥𝅮         𝅘𝅥𝅮 𝅘𝅥𝅮        𝅘𝅥𝅮 𝅘𝅥𝅮 𝅘𝅥𝅮       𝅘𝅥𝅮 𝅘𝅥𝅮   
     *   𝅘𝅥𝅮 𝅘𝅥𝅮 𝅘𝅥𝅮       𝅘𝅥𝅮            𝅘𝅥𝅮           𝅘𝅥𝅮
     */
    private dataT = [];
    //  dataT[0] = [0, 0, 1, 0, 2, 0, 1, 1];
    //  dataT[1] = [0, 0, 0, 1, 1, 1, 0, 2];
    //  dataT[2] = [1, 0, 0 , 1, 1, 1, 2, 1];
    //  dataT[3] = [1, 0, 0, 1, 1, 1, 1, 2];



    private static instance:GameDataManager;

    private constructor(){
        this.loadData();
    }

    private loadData(){
        this.dataI[0] = [ 0,  0 , 1, 0, 2, 0, 3 , 0];
        this.dataI[1] = [ 2,  0 , 2, 1, 2, 2, 2 , 3];

        // this.dataI[1] = [ 0,  0 , 0, 1, 0, 2, 0 , 3];


        this.dataO[0] = [0, 0, 0, 1, 1, 0, 1, 1];
        
        this.dataZ[0] = [0, 0, 0, 1, 1, 1, 1, 2];
        this.dataZ[1] = [0, 1, 1, 0, 2, 0 , 1, 1];

        this.dataS[0] = [0, 1, 1, 0, 1, 1, 0, 2];
        this.dataS[1] = [0, 0, 1, 0, 1, 1, 2, 1];

        this.dataJ[0] = [ 0, 0, 1, 0, 1, 1, 1, 2];
        this.dataJ[1] = [0, 0, 1, 0, 2, 0, 0, 1];
        this.dataJ[2] = [0, 0, 0, 1, 0, 2, 1, 2];
        this.dataJ[3] = [0, 1,2, 0,  1, 1, 2, 1 ];

        this.dataL[0] = [0, 0, 1, 0, 0, 1, 0, 2];
        this.dataL[1] = [0, 0, 0, 1, 1, 1, 2, 1];
        this.dataL[2] = [0, 2,1, 0, 1, 1, 1, 2];
        this.dataL[3] = [0, 0, 1, 0, 2, 0, 2, 1];

        this.dataT[0] = [0, 0, 1, 0, 2, 0, 1, 1];
        this.dataT[1] = [0, 0, 0, 1, 1, 1, 0, 2];
        this.dataT[2] = [0 , 1, 1, 0,  1, 1, 2, 1];
        this.dataT[3] = [0, 1,1, 0,  1, 1, 1, 2];

        this.allData = [];
        this.allData[GameDataManager.TYPE_I] = this.dataI;
        this.allData[GameDataManager.TYPE_O] = this.dataO;
        this.allData[GameDataManager.TYPE_Z] = this.dataZ;
        this.allData[GameDataManager.TYPE_S] = this.dataS;
        this.allData[GameDataManager.TYPE_J] = this.dataJ;
        this.allData[GameDataManager.TYPE_L] = this.dataL;
        this.allData[GameDataManager.TYPE_T] = this.dataT;
    }

    public getShapeDataByTypeId(id){

        return this.allData[id];

    }

    public static getManager(){

        if(!this.instance){

            this.instance = new GameDataManager();

        }
        
        return this.instance;
    }

}

class Main extends egret.DisplayObjectContainer {

    private kb:KeyBoard;


    // private shape:egret.Shape = new egret.Shape();  //use for draw rect

    public constructor() {
        super();
        this.once( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );

        this.kb = new KeyBoard();
        this.kb.addEventListener(KeyBoard.onkeydown,this.onkeydown,this);



    }


    private onkeydown(event){
        // console.log(event.data);
        
        let player = GameManager.getManager().getPlayer();

        if(this.kb.isContain(event.data,KeyBoard.A)){
            player.moveLeft();
        }

        if(this.kb.isContain(event.data,KeyBoard.Z)){

        }

        if(this.kb.isContain(event.data,KeyBoard.C)){
            //console.log(event.data);
            // CaseFactory.build().case1();

        }

        if(this.kb.isContain(event.data,KeyBoard.S)){
            //console.log(event.data);


           
        }  

        if(this.kb.isContain(event.data,KeyBoard.D)){
            //console.log(event.data);

            player.moveRight();
           
        }       

        if(this.kb.isContain(event.data,KeyBoard.CnterEnter)){
            // console.log(event.data);

            player.instantFalldown();
            
        } 

        if(this.kb.isContain(event.data,KeyBoard.SPACE)){
            // console.log(event.data);

            // player.doShape();
            // player.checkBlocks();
            player.rotate();
            
        } 
    }

    private touchArrayX = [];
    private touchArrayY = [];
    private _isTouched = false;

    private onAddToStage(event:egret.Event) {

        GameManager.getManager().init(this);

        //this.stage.stageHeight
        
        /// 产生动画
        this.stage.addEventListener( egret.Event.ENTER_FRAME, ( evt:egret.Event )=>{

            GameManager.getManager().doGame();
            
            
        }, this );
        
        this.stage.frameRate = Number(_G._GAME_FRAME_RATE);
        this.addTouchControl();
    }
    

     private addTouchControl(){

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function(e:egret.TouchEvent) {

            this.touchArrayX = [];
            this.touchArrayY = [];
            
            this.touchArrayX.push(e.$stageX);
            this.touchArrayY.push(e.$stageY);

        }, this);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, function(e:egret.TouchEvent){

        }, this);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, function(e:egret.TouchEvent) {


            if(!this._isTouched){
                 GameManager.getManager().doTouch();
                 this._isTouched = true;
                 GameManager.getManager().initBG();
            }
           

            this.touchArrayX.push(e.$stageX);
            this.touchArrayY.push(e.$stageY);

            // console.log(this.touchArray);

            let x1x2 = this.touchArrayX[this.touchArrayX.length - 1] - this.touchArrayX[0];
            let y1y2 = this.touchArrayY[this.touchArrayY.length - 1] - this.touchArrayY[0];
            
            
            let player = GameManager.getManager().getPlayer();


            if(Math.abs(x1x2) >= Math.abs(y1y2)){
                
                if(x1x2 > 0){

                    if(player){
                        player.moveRight();
                        console.log("moveRight");
                    }
                    
                }else{
                    if(player){
                        player.moveLeft();
                        console.log("moveLeft");
                    }
                    
                }
            }else{
                if(y1y2 > 0){
                    if(player){

                        player.instantFalldown();
                    }
                    
                }else{
                    if(player){
                        player.rotate();
                    }
                    
                }
            }
        }, this);        

    }
}


