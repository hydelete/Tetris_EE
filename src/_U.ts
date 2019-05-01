/**
 *     utility
 * 
 */
class _U {


    /**
     * 
    public static TYPE_I  = 0;
    public static TYPE_O  = 1;
    public static TYPE_Z  = 2;
    public static TYPE_S  = 3;
    public static TYPE_J  = 4;
    public static TYPE_L  = 5;
    public static TYPE_T  = 6;
    */
// ff3a3a  //  0xf1e848  0x61d775  0xa476bb   f18234   3f42b2
    public static colorsByShapeType = [0xff3a3a  , 0xf1e848  , 0x61d775 ,  0xa476bb ,  0xf18234 ,  0x3f42b2 ,  0x2aa2d7];
    // public static colorsByShapeType = [0xff3a3a  , 0xff3a3a  , 0xff3a3a ,  0xff3a3a ,  0xff3a3a ,  0xff3a3a ,  0xff3a3a];

    public static colors = [0x800000  , 0x0000FF  , 0x008000 ,  0x808080 ,  0xff00ff]; 
  //  public static colors = [0x0000FF  , 0x0000FF  , 0x0000FF ,  0x0000FF ,  0x0000FF]; 

    private static instance:_U;

    private constructor(){

    }

    public test(){

        console.log("nice catch");
    }


    public randomColor(){

        // Math.random()

        return _U.colors[this.randomInt(_U.colors.length)];

    }

    /**
     *    if n = 3, return 0 or 1 or 2
     */
    public randomInt(n){

        

        let ret = Math.floor((Math.random() * n));

        //console.log(ret);

        return ret;

    }

    public sortArray(arr){

        return  arr.sort(function(a, b){return a - b});

    }

    public getGridRadius(){
        return _G._UNIT_SIDE_LENGTH/2;

    }



    /** 
    public toShapedData(data : any){

        var shapedData = [];



        return shapedData;
    }
    */


    public test2(){

        for (var i = 0; i < 13; i++){
            for (var j = 0; j < 13; j++){

                //let pos = this.convertPP2P(new HDPP().set(i, j) );

                //console.log("final x = " + pos.x + ", y = " + pos.y );
                

            }
            
        }

    }




    public static load(){

        if(!this.instance){

            this.instance = new _U();

        }
        
        return this.instance;
    }


    public pushShape(shape : egret.Shape){

        this.shapeList.push(shape);

    }

    public getShapeList(){

        return this.shapeList;
    }

    public shapeList : Array<egret.Shape> = new Array<egret.Shape>();


}