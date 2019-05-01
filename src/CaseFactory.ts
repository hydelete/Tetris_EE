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

    public case0(){



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