

import {div, h3, label, option, select, input, button, radioButton, h1, table, tr, th, td, img, checkbox} from "../../fje.js"
import { Proizvod } from "../../models/proizvod.js";
export class Pijaca {

    constructor(id, naziv){
        this.id=id;
        this.naziv=naziv;
        this.container=null;

        this.ListaTipProizvoda=[];
        this.ListaProizvoda=[];
    }
    
    dodajProizvod(proizvod){
        this.ListaProizvoda.push(proizvod);
    }
    dodajTipProizvoda(TipProizvod){
        this.ListaTipProizvoda.push(TipProizvod)
    }

    crtaj(host){
        
        if(host==null)
            throw new Error("Error");
        
        this.container=div(host, "container");
        let divZaNazivPijace = div(this.container, "divZaNazivPijace")
        let nazivPijace=h1(divZaNazivPijace, "nazivPijace", this.naziv)
        let centralniDiv=div(this.container, "centralniDiv");

        let leviDiv=div(centralniDiv, "leviDiv");
        let desniDiv=div(centralniDiv, "desniDiv");

        let gornjiLeviDiv=div(leviDiv, "gornjiLeviDiv");
        let srednjiLevi=div(leviDiv, "srednjiLevi");
        let donjiLeviDiv=div(leviDiv, "donjiLeviDiv");
        let divPrikazi=div(gornjiLeviDiv, "divPrikazi");
        let divDodaj=div(srednjiLevi, "divDodaj");  
        let divIzmena =div(donjiLeviDiv, "divIzmena"); 
        

        this.pretraga()

        this.dodajProizvodForma()

        this.izmeniProizvodForma();
    }

    //********************************************PRETRAGA********************************************//

    pretraga(){

        let gornjiLeviDiv=this.container.querySelector(".gornjiLeviDiv")
        let divPrikazi=this.container.querySelector(".divPrikazi")
        let pretraga=h3(divPrikazi,"pretraga", "Pretraga");
        let divTip=div(divPrikazi, "divTip");
        label(divTip, "lbl", "Tip: ")
        let selectTip=select(divTip, "selectTip");
        
        this.ListaTipProizvoda.forEach(el => {
            let optionTip=option(selectTip, "optionTip", el.naziv);
        })

        let divCenaOd=div(divPrikazi, "divCenaOd");
        label(divCenaOd, "lbl", "Cena od: ");
        let inputCenaOd=input(divCenaOd, "inputCenaOd");
        inputCenaOd.type="number";

        let  divCenaDo=div(divPrikazi, "divCenaDo");
        label(divCenaDo, "lbl", "Cena do: ")
        let inputCenaDo=input(divCenaDo, "inputCenaDo");
        inputCenaDo.type="number";

        let divBtnPrikazi=div(divPrikazi, "divBtnPrikazi")
        let btnPrikazi=button(divBtnPrikazi, "btnPrikazi", "Prikazi");
        btnPrikazi.onclick= ev => this.buttonPrikaziOnClick()
    }

    buttonPrikaziOnClick(){

        let selectTipProizvoda=this.container.querySelector(".selectTip")
        let vrednost=selectTipProizvoda.value;
        let nadjenTip=this.ListaTipProizvoda.find(p => p.naziv==vrednost)

        let inputCenaOd=this.container.querySelector(".inputCenaOd")
        let vrednostCenaOd=inputCenaOd.value;

        let inputCenaDo=this.container.querySelector(".inputCenaDo");
        let vrednostCenaDo=inputCenaDo.value;

        fetch("https://localhost:5001/Proizvod/VratiProizvodePijace?idPijace=" + this.id + "&idTipaProizvoda=" + nadjenTip.id + "&cenaOd=" + vrednostCenaOd + "&cenaDo=" + vrednostCenaDo) 
        .then( async res => {

            if(res.ok){

                var proizvodi=await res.json()
                this.ListaProizvoda=[];
                proizvodi.forEach( p => {
                    let proizvod= new Proizvod(p.id, p.naziv, p.cena, p.dostupan, p.putanja, p.idTipaProizvoda);
                    this.ListaProizvoda.push(proizvod)
                })

                this.crtajDesniDiv();
            }
        })
        let divIzmena=this.container.querySelector(".divIzmena");
        divIzmena.style.display="none" /*da se ne vidi treci blok*/
    }

    
    //********************************************DODAJ PROIZVOD FORMA********************************************//

    dodajProizvodForma(){
        let divDodaj = this.container.querySelector(".divDodaj")
        let dodaj=h3(divDodaj, "dodaj", "Dodaj proizvod: ")

        let divTipProizvoda=div(divDodaj, "divTipProizvida");
        label(divTipProizvoda, "lbl", "Tip: ");
        let selectTipProizvoda=select(divTipProizvoda, "selectTipProizvoda");

        this.ListaTipProizvoda.forEach(el => {
            if(el.naziv!="Sve"){
                let optionProizvod=option(selectTipProizvoda, "optionProizvod", el.naziv)
            }
        })

        let divNaziv= div(divDodaj, " divNaziv");
        label(divNaziv, "lbl", "Naziv: ");
        let inputNaziv= input(divNaziv, "inputNaziv")

        let cenaNovogProizvoda= div(divDodaj, "cenaNovogProizvoda");
        label(cenaNovogProizvoda, "lbl", "Cena: ")
        let inputCenaNovogProizvoda=input(cenaNovogProizvoda, "inputCenaNovogProizvoda");
        inputCenaNovogProizvoda.type="number"
        
        let divDostupanNovi=div(divDodaj, "divDostupanNovi");
        label(divDostupanNovi, "lbl", "Dostupan: ")

        let nizOpcija=["Da", "Ne"]

        nizOpcija.forEach(opcija => {

            label(divDostupanNovi, "lbl", opcija);
            let radioBtn=radioButton(divDostupanNovi, "radioBtn")
            radioBtn.type="radio";
            radioBtn.name="grupa1"
            radioBtn.value=opcija;
        })

        let divNovaSlika=div(divDodaj, "divNovaSlika");

        let labelSlika=label(divNovaSlika, "lbl", "Slika: ")
        let checkboxSlika=checkbox(divNovaSlika, "checkboxSlika");
        checkboxSlika.type="checkbox";
        checkboxSlika.onclick= ev => ev.preventDefault();

        let btnOdaberiSliku=button(divNovaSlika, "btnOdaberiSliku", "Odaberi sliku")
        btnOdaberiSliku.onclick=ev => this.crtajSlike(checkboxSlika);

        let divDodajNovi=div(divDodaj, "divDodajNovi");
        let btnDodaj= button(divDodajNovi, "btnDodaj", "Dodaj proizvod")

        btnDodaj.onclick=(ev => this.buttonDodajProizvodOnClick());
    }

    buttonDodajProizvodOnClick(){
        let selectTipProizvoda=this.container.querySelector(".selectTipProizvoda")
        let vrednostTipaProizvoda=selectTipProizvoda.value;
        let tipaProizvoda=this.ListaTipProizvoda.find(el => el.naziv==vrednostTipaProizvoda)
        
        let inputNazivProizvoda=this.container.querySelector(".inputNaziv")
        let naziv=inputNazivProizvoda.value;
        
        let inputCenaProizvoda=this.container.querySelector(".inputCenaNovogProizvoda")
        let cena=inputCenaProizvoda.value;

        let rb=this.container.querySelector('input[name="grupa1"]:checked');
        
        let vrednostRb
        
        if(rb){
            vrednostRb=rb.value;
        }else{
            alert("Niste odabrali da li je proizvod dostupan");
            return
        }

        let checkboxSlika=this.container.querySelector(".checkboxSlika");
        let putanja=checkboxSlika.value;
 
        if(naziv!="" && cena!="" && checkboxSlika.checked){

            fetch("https://localhost:5001/Proizvod/DodajProizvod/idTipaProizvoda/idPijace?idTipaProizvoda=" + tipaProizvoda.id + "&idPijace=" + this.id , {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        Naziv:naziv,
                        Cena:cena,
                        Dostupan:vrednostRb=="Da" ? true : false,
                        Putanja:putanja
                
                })
            }) 
            .then( async p => {
                if(p.ok){
                    let proizvod=await p.json();
                    this.buttonPrikaziOnClick();
                }
                else{
                        let text=await p.text();
                        alert(text);
                    }
                })
            .catch(err => alert(err));
        }else{
            alert("Niste uneli sve podatke");
        }
    }

    //********************************************IZMENI PROIZVOD FORMA********************************************//
    
    izmeniProizvodForma(){ /*crta se prazna ne popunjena forma */
        let divIzmena=this.container.querySelector(".divIzmena");
        divIzmena.style.display="none" /*ovo da se ne vidi treci blok*/

        let divIzmenaNaslov=div(divIzmena, "divIzmenaNaslov");
        let naslovIzmena=h3(divIzmenaNaslov, "naslovIzmena", "Izmena: ")
        let nazivProizvoda=h3(divIzmenaNaslov, "nazivProizvoda");/*samo sam ga napravila, nisam mu dodelila jos vrednost*/
        
        let divSelectTip=div(divIzmena, "divSelectTip");
        label(divSelectTip, "lbl", "Tip: ");
        let selectTipIzmena=select(divSelectTip, "selectTipIzmena");
        this.ListaTipProizvoda.forEach(el => {
            if(el.naziv!="Sve"){ /*  da ne bude "sve" unutra*/
                let optionSelect=option(selectTipIzmena, "optionSelect", el.naziv);
            }
        })
        let divNazivProizvoda=div(divIzmena, "divNazivProizvoda");
        label(divNazivProizvoda, "lbl", "Naziv: ")
        let inputNazivProizvoda=input(divNazivProizvoda, "inputNazivProizvoda");

        let divCena=div(divIzmena, "divCena");
        label(divCena, "lbl", "Cena: ");
        let inputCena=input(divCena, "inputCena");
        inputCena.type="number";

        let divDostupan=div(divIzmena, "divDostupan")
        label(divDostupan, "lbl", "Dostupan: ")
        label(divDostupan, "lblDa", "Da ")
        let radioButtonDostupan1=radioButton(divDostupan, "radioButtonDostupan");
        radioButtonDostupan1.type="radio";
        radioButtonDostupan1.name="grupa2";
        radioButtonDostupan1.value="1";

        label(divDostupan, "lblNe", "Ne ");
        let radioButtonDostupan2=radioButton(divDostupan, "radioButtonDostupan");
        radioButtonDostupan2.type="radio";
        radioButtonDostupan2.name="grupa2"
        radioButtonDostupan2.value="2";

        let divOdaberiNovuSliku=div(divIzmena, "divOdaberiSliku");
        let labelNovaSlika=label(divOdaberiNovuSliku, "lbl", "Slika: ");
        let checkboxNovaSlika=checkbox(divOdaberiNovuSliku, "checkboxNovaSlika");
        checkboxNovaSlika.type="checkbox"
        checkboxNovaSlika.onclick= ev => ev.preventDefault()

        let buttonOdaberiNovuSliku=button(divOdaberiNovuSliku, "buttonOdaberiNovuSliku", "Odaberi sliku");
        buttonOdaberiNovuSliku.onclick=ev => this.crtajSlike(checkboxNovaSlika);

        let divSacuvaj=div(divIzmena, "divSacuvaj");
        let btnSacuvaj=button(divSacuvaj, "btnSacuvaj", "Sacuvaj")
        btnSacuvaj.onclick=(ev => this.buttonSacuvajOnClick());

    }

    buttonSacuvajOnClick(){


        let h3NazivProizvoda=this.container.querySelector(".nazivProizvoda");
        let naziv=h3NazivProizvoda.innerHTML;

        let selectTipIzmena=this.container.querySelector(".selectTipIzmena")
        let vrednostSelecta=selectTipIzmena.value;
        let tipProizvoda=this.ListaTipProizvoda.find(tip => tip.naziv==vrednostSelecta)

        let inputNaziv=this.container.querySelector(".inputNazivProizvoda")
        let vrednostInputa=inputNaziv.value;

        let inputCena=this.container.querySelector(".inputCena")
        let vrednostCena=inputCena.value;
        
        let buttonDostupan=this.container.querySelector("input[name='grupa2']:checked")
        let vrednostButtona=buttonDostupan.value;
        
        let dostupan;
        if(vrednostButtona==1)
            dostupan=true;
        else
            dostupan=false;

        let proizvod;
        this.ListaProizvoda.forEach(p => {
            if(p.naziv==naziv){
                proizvod=p;
            }
        })

        let checkboxNovaSlika=this.container.querySelector(".checkboxNovaSlika")
        let putanja=checkboxNovaSlika.value;


        if(vrednostInputa!="" && vrednostCena!=""){
            fetch("https://localhost:5001/Proizvod/IzmeniProizvod/idTipaProizvoda/idProizvoda/naziv/cena/dostupan/putanja/idPijace?idTipaProizvoda=" + tipProizvoda.id + "&idProizvoda=" + proizvod.id + "&naziv="+vrednostInputa + "&cena="+ vrednostCena + "&dostupan=" + dostupan + "&putanja=" + putanja +"&idPijace=" + this.id, {
                method: "PUT"
            })   
            .then(async res => {
                if(res.ok){
                    let proizvod = await res.json(); 
                    let divIzmena=this.container.querySelector(".divIzmena");
                    divIzmena.style.display="none" /* kad sacuvam proizvod da nestane blok*/

                    this.buttonPrikaziOnClick();
                }
                else{
                    let tekst=await res.text();
                    alert(tekst)
                }
            })
            .catch(err => {
                alert(err);
            })
        }
        else{
            alert("Niste uneli sve podatke");
        }
    }

    //********************************************CRTAJ DESNI DIV (TABELA)********************************************//

    crtajDesniDiv(){
        let desniDiv=this.container.querySelector(".desniDiv");
        desniDiv.innerHTML="";


        let tabela=table(desniDiv, "tabela");
        
        let red=tr(tabela, "redovi");

        let naslovi=["Naziv", "Cena", "Dostupan", "Slika", "", ""];
        naslovi.forEach(naslov => {
            th(red, null, naslov);
        })

        this.ListaProizvoda.forEach( proizvod => {
            red=tr(tabela, null, null);
            td(red, null, proizvod.naziv);
            td(red, null, proizvod.cena);
            if(proizvod.dostupan==true)
                td(red, null, "da")
            else
                td(red, null, "ne")

            let poljePrikaziSliku=td(red, null, null);
            let buttonPrikaziSliku=button(poljePrikaziSliku, "buttonPrikaziSliku", "Prikazi");
            buttonPrikaziSliku.onclick=(ev) => { 

                window.open(proizvod.putanja) 
            }
            let poljeIzmeni=td(red, null, null);
            let buttonIzmeni=button(poljeIzmeni, "buttonIzmeni", "Izmeni")
            buttonIzmeni.onclick=(ev) => this.buttonIzmeniOnClick(proizvod);    

            let poljeObrisi=td(red, null, null);
            let buttonObrisi=button(poljeObrisi, "buttonObrisi", "Obrisi");
            buttonObrisi.onclick= (ev) => this.buttonObrisiOnClick(proizvod);


        })
    }

    buttonObrisiOnClick(proizvod){

        if(confirm("Da li ste sigurni da zelite da obrisete proizvod?")){
           fetch( "https://localhost:5001/Proizvod/ObrisiProizvod/idProizvoda?idProizvoda="+ proizvod.id,{

               method:"DELETE"
           })
           .then(async res => {

                if(res.ok){
                    let proizvod=await res.json();
                    this.buttonPrikaziOnClick();
                }
                else{
                    let text=await res.text();
                    alert(text);
                }

           })
           .catch(err => {
               alert(err);
           })

        }
        else{
            //ne
        }
    }

    buttonIzmeniOnClick(proizvod){

        let divIzmena=this.container.querySelector(".divIzmena");
        divIzmena.style.display="block" /*ovo sluzi da se prikaze kad se klikne na izmeni*/

        let h3NazivProizvoda=this.container.querySelector(".nazivProizvoda")
        h3NazivProizvoda.innerHTML=proizvod.naziv; 
        
        let tipProizvoda = this.ListaTipProizvoda.find(p => p.id==proizvod.idTipaProizvoda)
        let selectTipIzmena = this.container.querySelector(".selectTipIzmena")
        selectTipIzmena.value = tipProizvoda.naziv
        
        let inputNaziv=this.container.querySelector(".inputNazivProizvoda")
        inputNaziv.value = proizvod.naziv;

        let inputCena=this.container.querySelector(".inputCena")
        inputCena.value=proizvod.cena;

        let radioButtonDostupan=this.container.querySelectorAll(".radioButtonDostupan")

        if(proizvod.dostupan){
            radioButtonDostupan[0].checked=true;
        }
        else
            radioButtonDostupan[1].checked=true;

        let checkboxNovaSlika=this.container.querySelector(".checkboxNovaSlika");
        checkboxNovaSlika.checked="true"
        checkboxNovaSlika.value=proizvod.putanja
    }


    //********************************************CRTAJ KARTICU PROIZVODA********************************************//

    crtajSlike(checkboxSlika){
        let desniDiv=this.container.querySelector(".desniDiv")
        desniDiv.innerHTML=""

        let divSlike=div(desniDiv, "divSlike");
        for(let broj=1; broj<34; broj++){
            let path = "../../assets/proizvodi/"
            let putanja=path+broj+".jpg"
    
            let divSlika =  this.crtajKarticu(divSlike, putanja)    
    
            divSlika.onclick = () => {
               
                let sveSlike = this.container.querySelectorAll(".divSlika")
                
                sveSlike.forEach(slika => {
                    slika.style.border='0px'
                })
                
                divSlika.style.border="3px solid black"
                checkboxSlika.checked=true;

                checkboxSlika.value=putanja;
            }
        }
    }

    crtajKarticu(divSlike,  putanja){
        let divSlika=div(divSlike,  "divSlika")
        let slika=img(divSlika, "slika");
        slika.src=putanja
        slika.alt="ucitavanje..."
        slika.width="100"
        slika.height="100"
        return divSlika
    }
   
}