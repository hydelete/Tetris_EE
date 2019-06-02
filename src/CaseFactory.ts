/**
 *     
 *     
 *   data generator
 */
class CaseFactory {

    private static fac : CaseFactory;


    



    public case1(){



        this.addLine(5);
    }




    //test case for instant falldown could running correctly if shape in place under the top block and there are blocks on its both sides upper and down at the same time
    public case0(container){

        for(let i = 0; i < _G._MAX_GRIDS_A_LINE * 12; ++i){
            let colNum = i % _G._MAX_GRIDS_A_LINE;

            if(colNum == 2 || colNum == 3 ||colNum == 4 ||colNum == 5){
                container.push(1);
            }else{
                container.push(0);
            }
            

            let rowNum = Math.floor(i / _G._MAX_GRIDS_A_LINE);
            if(rowNum >= 2 && rowNum <= 10){
                let idx = rowNum * _G._MAX_GRIDS_A_LINE + colNum;
                container[idx] = 0;
            }

        }
    }


    public addLine(n){



    }


    public addLineBlankTwo(n){



    }   


    public addLineBlankOne(n){



    }    














    public static build(){

        if(!this.fac){

            this.fac = new CaseFactory();

        }
        
        return this.fac;
    }

}