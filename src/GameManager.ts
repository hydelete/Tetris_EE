/**
 *   
 *    game properties
 * 
 */
class _G{

    // 38 * 13 = 494   one line = 494   size of line = 13 grids   grid side length = 38
    public static _CONTAINER_OFFSET_X = 0;
    public static _CONTAINER_OFFSET_Y = 0;


    public static _GAME_FRAME_RATE = 40;
    public static _GAME_SPEED = 7;     // speed up if reduce, related to frame rate
    public static _GAME_SHAPE_BORN_POSITION = 23;
    public static _UNIT_SIDE_LENGTH:number = 42;
    public static _MAX_GRIDS_A_LINE:number = 11;
    public static _GAME_DESIGN_HEIGHT:number = 960;
    public static _GAME_DESIGN_WIDTH:number = 640;
    public static _GAME_COUNT_Y_GRID:number = Math.floor(_G._GAME_DESIGN_HEIGHT / _G._UNIT_SIDE_LENGTH);
    // public static _GAME_COUNT_X_GRID:number = Math.floor(_G._GAME_DESIGN_WIDTH / _G._UNIT_SIDE_LENGTH);
    public static _DEBUG_MODE:boolean = false;
    public static _BLOCK_BORDER_SWITCH = 0;


    public static checkDebugging(){

        return this._DEBUG_MODE;
        
    }

    public static readDebugging(){

        if(_G._DEBUG_MODE){
            // _G._GAME_MUSIC_ENABLE = false;
        }
        
    }

    //   step forward per 60 frames

}


class GameManager {

    private static instance:GameManager;

    private static STS_READY = 0;
    private static STS_START = 1;
    private static STS_END = 2;

    private gameStatus;

    private _score;


    // public showEndLayer(){

    //     this.context.addChild(this._endLayer);

    // }

    // public closeEndLayer(){

    //     this.context.removeChild(this._endLayer);

    //     this.restart();

    // }

    public start(){

        this.gameStatus = GameManager.STS_START;

    }

    public doGameOver(){

        this.gameStatus = GameManager.STS_END;

        // this.showEndLayer();

    }

    public isGaming(){

        return this.gameStatus == GameManager.STS_START;

    }

    public isInited(){

        return this.gameStatus == GameManager.STS_READY;

    }

    private constructor(){
    }

    private context: egret.DisplayObjectContainer;

    private player : HD_GamePlayer;
    private nextPlayer : HD_GamePlayer;

    private _text_score : egret.TextField;
    
    private shape4Grids : egret.Shape;
    private shapeList;
    private shapeP : egret.Shape;

    private frameCount4Update : number;

    private initCountANDScore(){

        this.frameCount4Update = 0;
        
        this._score = 0;

    }

    private initGrids(){

        let gameWidth = _G._GAME_DESIGN_WIDTH;
        if(this.player){
            gameWidth = this.player.getOnelineLength();
        }

        if(this.shape4Grids){
            this.shape4Grids.graphics.beginFill(0xdeab8a);
            this.shape4Grids.graphics.drawRect(_G._CONTAINER_OFFSET_X, 0 , gameWidth, _G._GAME_DESIGN_HEIGHT - _G._CONTAINER_OFFSET_Y);
            this.shape4Grids.graphics.endFill();
            this.shape4Grids.x = 0;
            this.shape4Grids.y = 0;
        }

        if(this.shape4Grids){
            var shape:egret.Shape = this.shape4Grids;
            shape.graphics.lineStyle(1, 0xDCDCDC);

            for(let i = 0; i < ( _G._GAME_DESIGN_HEIGHT / _G._UNIT_SIDE_LENGTH); ++i){

                let y = _G._GAME_DESIGN_HEIGHT - _G._UNIT_SIDE_LENGTH * i;

                shape.graphics.moveTo(0, y);
                shape.graphics.lineTo(gameWidth, y);
            }

            for(let i = 0; i < _G._MAX_GRIDS_A_LINE + 1; ++i){

                let x = _G._UNIT_SIDE_LENGTH * i;

                shape.graphics.moveTo(x, 0);
                shape.graphics.lineTo(x, _G._GAME_DESIGN_HEIGHT);          
            }
        }
    }

    private initTextField(){

        if(this._text_score){
            this._text_score.parent.removeChild(this._text_score);
        }

        this._text_score = new egret.TextField;
        this.context.addChild( this._text_score );

        this._text_score.size = 28;
        this._text_score.x = this.context.stage.stageWidth - 133;
        this._text_score.y = this.context.stage.stageHeight - 310;
        this._text_score.textAlign = egret.HorizontalAlign.LEFT;
        this._text_score.textColor = 0xffc29c;
        this._text_score.type = egret.TextFieldType.DYNAMIC;
        this._text_score.lineSpacing = 6;
        
        this._text_score.text =
                "0000";
    }

    public addScore(nScore : number){

        this._score += nScore;
        
    }

    public updateGameScore(){

        this._text_score.text = this._score;
        
    }    

    public init(ctx){

        _G.readDebugging();

        this.context = ctx;

        this.initCountANDScore();
        
        this.gameStatus = GameManager.STS_READY;

        this.shape4Grids = new egret.Shape();
        this.context.addChild(this.shape4Grids);
        
        this.shapeList = [];
        for(let i = 0 ; i < 20; ++i){
            let iShape = new egret.Shape();
            this.shapeList.push(iShape);
            this.context.addChild(iShape);
        }

        this.shapeP = new egret.Shape();

        

        this.player = new HD_GamePlayer(this.context);

        this.player.initData4Test();

        this.context.addChild(this.shapeP);
        

        this.initTextField();

        this.initGrids();

        this.loadTitle();

        
    }

    public initBG(){



        this.initTextField();
    }

    public restart(){

        this.gameStatus = GameManager.STS_START;
        this.initCountANDScore();

    }


    // _IMG_BG.get().setVisible(true);

    private loadTitle(){

        if( _G._DEBUG_MODE){
            return;
        }


        
    }

    public drawBG(){

    }

    public doTouch(){

        if(this.isInited()){



            this.start();

        }else{

            //this.restart();

        }

    }

    public doGame(){
        
       

        if(this.isGaming()){

            // console.log('isGaming');

            this.upt();
        }

    }

    public upt(){

        // this.frameCount4Update += 1;

        if(this.player) {
            this.player.run(1);
        }
        
        if(this.player) {
            
            this.player.draw(this.shapeList);
            this.player.drawPlayer(this.shapeP);

        }


    }


    public getPlayer(){
        return this.player;
    }


    private drawNextShape = new egret.Shape();

    public drawNext(){

        // console.log(this.nextPlayer.typeId);
        this.drawNextShape.graphics.clear();

        if(this.flag4DrawNext){


        }

    }

    private flag4DrawNext = true;


    public static getManager(){

       

        if(!this.instance){

            this.instance = new GameManager();

        }
        
        return this.instance;
    }

}