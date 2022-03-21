
import {button, div, h1, label} from "../fje.js"
import {loginRoute, homeRoute, pijacaRoute, ponudaProizvodaRoute} from "../routes.js"


export function navBar(host){
    let divNaslov=div(host, "divNaslov");
    let divLevi=div(divNaslov, "divLevi");
    label(divLevi, "kontakt", "Kontakt: 018/123 123")
    let naslov=h1(divNaslov, "naslov", "Pijace")

    let divDesniButtoni=div(divNaslov, "divDesniButtoni");

    if(window.location.href!=loginRoute && window.location.href!=pijacaRoute && window.location.href!=ponudaProizvodaRoute){
        let  btnLogin=button(divDesniButtoni, "btnLogin", "Prijavi se");
        btnLogin.onclick= () => window.location.href=loginRoute;
    }


    if(window.location.href!=homeRoute){
        let btnHome=button(divDesniButtoni, "btnHome", "Početna");
        btnHome.onclick= () => window.location.href=homeRoute;
    }
}

