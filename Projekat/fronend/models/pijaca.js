

export class Pijaca{

    constructor(id, naziv){

        if(id)
            this.id=id;
        else
            this.id=-1;
        
        if(naziv)
            this.naziv=naziv;
        else
            this.naziv="";
    }   
}