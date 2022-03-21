
export class Proizvod {

    constructor(id, naziv, cena, dostupan, putanja, idTipaProizvoda){
        if(id)
            this.id=id;
        else
            this.id=-1;

        if(naziv)
            this.naziv=naziv;
        else
            this.naziv="";
        
        if(cena)
            this.cena=cena;
        else
            this.cena=-1;

        if(dostupan)
            this.dostupan=dostupan;
        else
            this.dostupan=false;

        if(putanja)
            this.putanja=putanja;
        else
            this.putanja="";
            
        if(idTipaProizvoda)
            this.idTipaProizvoda=idTipaProizvoda;
        else
            this.idTipaProizvoda
    }
}