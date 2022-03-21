
import { navBar } from "../../components/navBar.js";
import {button, div, img, input, label, option, select} from "../../fje.js"
import { Proizvod } from "../../models/proizvod.js";
import { TipProizvoda } from "../../models/tipProizvoda.js";

export class PonudaProizvoda {

    constructor(){

        this.listaTipovaProizvoda=[];
        this.listaProizvoda=[];
        this.listaPijaca=[];
        this.container=null;
    }
    dodajPijacu(pijaca){
        this.listaPijaca.push(pijaca);
    }
    crtaj(host){

        if(host==null)
            throw new Error("Error")
        this.container=div(host, "container");
        navBar(this.container);
        let divZaInpute=div(this.container, "divZaInpute");
        let centralniDiv=div(this.container, "centralniDiv");


        let selectNazivPijace=select(divZaInpute, "selectNazivPijace");
        this.listaPijaca.forEach(pijaca => {
            let optionPijaca=option(selectNazivPijace, "optionPijaca", pijaca.naziv)
        })

        let selectKategorija=select(divZaInpute, "selectKategorija");

        selectNazivPijace.onchange=(ev) => this.ucitajTipove();

        
        let inputNazivProizvoda=input(divZaInpute, "inputNazivProizvoda");
        
        let buttonPotvrdi=button(divZaInpute, "buttonPotvrdi", "Potvrdi")
        buttonPotvrdi.onclick=(ev => this.buttonPotvrdiOnClick());
        
        this.ucitajTipove();
    }


    ucitajTipove(){
        let selectNazivPijace=this.container.querySelector(".selectNazivPijace");
        let vrednostSelecta=selectNazivPijace.value;
        let pijaca=this.listaPijaca.find(pijaca => pijaca.naziv==vrednostSelecta);

        
        fetch("https://localhost:5001/TipProizvoda/VratiTipoveProizvoda/idPijace?idPijace=" + pijaca.id)
        .then(async res => {

            if(res.ok){
                this.listaTipovaProizvoda=[];
                let tipoviProizvoda=await res.json();
                tipoviProizvoda.forEach(tip => {
                    let noviTip=new TipProizvoda(tip.id, tip.naziv);
                    this.listaTipovaProizvoda.push(noviTip);
                })

                let selectKategorija=this.container.querySelector(".selectKategorija");
                selectKategorija.innerHTML="";
                this.listaTipovaProizvoda.forEach(tip =>{
                    let optionTip=option(selectKategorija, "optionTip", tip.naziv);
                })
            }
            else{

                let text=await res.text();
                alert(text);
            }
        })
        .catch(err => alert(err));
    }


    buttonPotvrdiOnClick(){

        let selectNazivPijace=this.container.querySelector(".selectNazivPijace");
        let vrednostNazivaPijace=selectNazivPijace.value;
        let pijaca=this.listaPijaca.find(pijaca => pijaca.naziv==vrednostNazivaPijace);

        let selectTipProizvoda=this.container.querySelector(".selectKategorija");
        let vrednostTipa=selectTipProizvoda.value;
        let tipProizvoda=this.listaTipovaProizvoda.find(tipProizvoda => tipProizvoda.naziv==vrednostTipa);

        let inputPretraga=this.container.querySelector(".inputNazivProizvoda");
        let vrednostInputa=inputPretraga.value;

        fetch( "https://localhost:5001/Proizvod/VratiPonuduProizvoda?idPijace=" + pijaca.id  + "&idTipaProizvoda=" + tipProizvoda.id  + "&nazivProizvoda=" + vrednostInputa)
        .then( async res => {
            if(res.ok){ 

                let proizvodi=await res.json();
                
                this.listaProizvoda=[];
                proizvodi.forEach(p=>{
                    let proizvod= new Proizvod(p.id, p.naziv, p.cena, p.dostupan, p.putanja, p.idTipaProizvoda);
                    this.listaProizvoda.push(proizvod);
                })
                this.crtajSlike();
     
            }
            else{

                let text=await res.text();
                alert(text)
            }
        })
        .catch(err => alert(err))
    }

    crtajSlike(){
        let centralniDiv=this.container.querySelector(".centralniDiv");
        centralniDiv.innerHTML = ""

        this.listaProizvoda.forEach(proizvod => {
            this.crtajSliku(proizvod)
        })
    }

    crtajSliku(proizvod){
        let centralniDiv=this.container.querySelector(".centralniDiv");

        
        let divSlika=div(centralniDiv, "divSlika")
        let slika=img(divSlika, "slika");
        slika.src=proizvod.putanja
        slika.alt="slika nije nadjena..."
        slika.width="100"
        slika.height="100"


        label(divSlika, null, proizvod.naziv)
        label(divSlika, null, "Cena: " + proizvod.cena)
        let dostupan = proizvod.dostupan ? "da" : "ne"
        label(divSlika, null, "Dostupan: " + dostupan)

    }



    
}