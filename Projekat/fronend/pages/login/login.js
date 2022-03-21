
import { bottomBar } from "../../components/bottomBar.js";
import {div, label, input, button, h1, checkbox} from "../../fje.js"
import { homeRoute, pijacaRoute } from "../../routes.js";
import { navBar } from "../../components/navBar.js";

export class Login{

    constructor(){
        this.container=null;
    }

    crtaj(host){

        if(host==null)
            throw new Error("Error");
        this.container=div(host, "container");
        navBar(this.container)
        let centralniDiv=div(this.container, "centralniDiv");   
        
        let divLogIn=div(centralniDiv, "divLogIn");

        let divKorisnickoIme=div(divLogIn, "divKorisnickoIme");
        label(divKorisnickoIme, "lbl", "Korisnicko ime: ");
        let inputKorisnickoIme=input(divKorisnickoIme, "inputKorisnickoIme")

        let divLozinka=div(divLogIn, "divLozinka");
        label(divLozinka, "lbl", "Lozinka: ")
        let inputLozinka=input(divLozinka, "inputLozinka");
        inputLozinka.type="password"; /* sa ovim necemo da vidimo sifru*/ 
        let checkboxSifra=checkbox(divLozinka, "checkbxsifra");
        checkboxSifra.type="checkbox";

        checkboxSifra.onclick= ev => {
            if(inputLozinka.type=="password")
                inputLozinka.type="text";
            else
                inputLozinka.type="password";
        }

        let divButton=div(divLogIn, "divButton");
        let btnPotvrdi=button(divButton,"btnPotvrdi", "Potvrdi")
        btnPotvrdi.onclick=(ev) => this.buttonPotvrdiOnClick();

        let btnOtkazi=button(divButton, "btnOtkazi", "Otkazi");
        btnOtkazi.onclick=(ev)=> this.buttonOtkaziOnClick();

        bottomBar(this.container)
    }

    buttonOtkaziOnClick(){
        window.location.href=homeRoute;
    }

    buttonPotvrdiOnClick(){

        let inputKorisnickoIme=this.container.querySelector(".inputKorisnickoIme");
        let korisnickoIme= inputKorisnickoIme.value;

        let inputLozinka=this.container.querySelector(".inputLozinka");
        let lozinka=inputLozinka.value;

        if(korisnickoIme!="" && lozinka!=""){

       
            fetch("https://localhost:5001/Korisnik/VratiKorisnika?korisnickoIme="+ korisnickoIme + "&lozinka=" +lozinka)
            .then( async res => {
                if(res.ok){
                    let korisnik=await res.json();
                    window.location.href=pijacaRoute;
                }
                else{
                    let text=await res.text();
                    alert(text)
                }
            })
            .catch(err => alert(err));
           
        }
        else{
            alert("Niste popunili sve podatke");
        }
    }
}