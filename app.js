const Base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromcur=document.querySelector(".from select");
const tocur=document.querySelector(".To select");
const msg=document.querySelector(".msg");


for(let select of dropdowns) {
for (item in countrylist) {
    let newOption=document.createElement("option");
    newOption.innerText=item;
    newOption.value=item;
    if(select.name==="from" && item==="USD"){
        newOption.selected="selected";
    }else if(select.name==="to" && item==="INR"){
        newOption.selected="selected";
    }
    select.append(newOption);
}

select.addEventListener("change", (evt) => {
    upflag(evt.target);
});
}

const upflag=(element)=>{
    let currcode=element.value;
    let countrycode=countrylist[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};

btn.addEventListener("click",async(evt) => {
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amt=amount.value;
    if(amt===" "||amt<1){
        amt=1;
        amount.value="1";
    }

 const  URL=`${Base_url}/${fromcur.value.toLowerCase()}/${tocur.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data=await response.json();
let rate =data[tocur.value.toLowerCase()];

let finalamount=amt*rate;
msg.innerText=`${amt} ${fromcur.value}=${finalamount} ${tocur.value}`;
});