
import { Pijaca } from "../../models/pijaca.js";
import {PonudaProizvoda} from "./ponudaProizvoda.js"



fetch("https://localhost:5001/Pijaca/VratiPijace")
.then(async res => {
    
    if(res.ok){
        let ponudaProizvoda=new PonudaProizvoda();

        let pijace=await res.json();
        pijace.forEach(pijaca => {
            let novaPijaca=new Pijaca(pijaca.id, pijaca.naziv);
            ponudaProizvoda.dodajPijacu(novaPijaca);
        })
        
        ponudaProizvoda.crtaj(document.body)
    }
    else{
        let text=await res.text();

        alert(text)
    }
})
.catch( err => alert(err));
