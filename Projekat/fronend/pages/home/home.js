
import {button, div, label, p} from "../../fje.js"
import { navBar } from "../../components/navBar.js";
import { bottomBar } from "../../components/bottomBar.js";
import { ponudaProizvodaRoute } from "../../routes.js";
export class Home {

    constructor(){
        this.container=null;
    }

    crtaj(host){
        if(host==null)
            throw new Error("Error");

        this.container=div(host, "container");
        navBar(this.container)
        let divSlika=div(this.container, "divSlika");

        let divTekst=div(this.container, "divTekst");
        let tekst="Sajt pijace osnovan je sa zeljom da se omoguci brzi i jednostavniji pregled " 
        tekst+= "poljoprivrednih proizvoda koji su dostupni na pijaci."
        tekst+="Ovaj sajt je ispunjenje te zelje jer svi imamo potrebu da stvari funkcionisu jednostavno i lako."
        let paragrefTekst=p(divTekst, "paragrafTekst", tekst)

        let centralniDiv=div(this.container, "centralniDiv");

        let divProizvodi=div(centralniDiv, "divProizvodi");
        let buttonProizodi=button(divProizvodi, "buttonProizvodi", "Ponuda proizvoda")
        buttonProizodi.onclick=(ev) => window.location.href=ponudaProizvodaRoute;

        
        bottomBar(this.container)
    }
}