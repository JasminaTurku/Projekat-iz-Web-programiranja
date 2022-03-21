import {Pijaca} from "./pijaca.js"
import {TipProizvoda} from "../../models/tipProizvoda.js";
import{navBar}from"../../components/navBar.js"

navBar(document.body); /*samo jednom da se iscrta, zato sam ga stavila ovde, da sam ga stavila u pijacu iscrtao bi se puno puta*/

fetch("https://localhost:5001/Pijaca/VratiPijaceSaTipovimaProizvoda")
.then( async res => {

    if(res.ok){
        let pijace=await res.json();
       

        pijace.forEach(pijaca => {
            let p= new Pijaca(pijaca.id, pijaca.naziv);
            pijaca.tipoviProizvoda.forEach(tipProizvod => {
                let tip=new TipProizvoda(tipProizvod.id, tipProizvod.naziv);
                p.dodajTipProizvoda(tip);
            })
            
            p.crtaj(document.body);
        });
    }
})

