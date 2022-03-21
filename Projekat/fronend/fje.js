export const napravi=(naziv, tata, className, innerHTML) => {

    let el=document.createElement(naziv);
    if(className)
        el.className=className;
    if(innerHTML)
        el.innerHTML=innerHTML;
    tata.appendChild(el);
    return el;
} 

export const div=(tata, className, innerHTML) => napravi("div", tata, className, innerHTML);
export const h1=(tata, className, innerHTML) => napravi("h1", tata, className, innerHTML);
export const h3=(tata, className, innerHTML) => napravi("h3", tata, className, innerHTML);
export const label=(tata, className, innerHTML) => napravi("label", tata, className, innerHTML);
export const select=(tata, className, innerHTML) => napravi("select", tata, className, innerHTML);
export const option=(tata, className, innerHTML) => napravi("option", tata, className, innerHTML);
export const input=(tata, className, innerHTML) => napravi("input", tata, className, innerHTML);
export const button=(tata, className, innerHTML) => napravi("button", tata, className, innerHTML);
export const radioButton=(tata, className, innerHTML) => napravi("input", tata, className, innerHTML)

export const p=(tata, className, innerHTML) => napravi("p", tata, className, innerHTML);

export const table=(tata, className, innerHTML) => napravi("table", tata, className, innerHTML);
export const tr=(tata, className, innerHTML) => napravi("tr", tata, className, innerHTML);
export const th=(tata, className, innerHTML) => napravi("th", tata, className, innerHTML);
export const td=(tata, className, innerHTML) => napravi("td", tata, className, innerHTML);

export const img=(tata, className, innerHTML) => napravi("img", tata, className, innerHTML);
export const checkbox=(tata, className, innerHTML) => napravi("input", tata, className, innerHTML);