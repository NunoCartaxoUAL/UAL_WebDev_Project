
function loadHome(){
    clearPage()
    var item_1 = ["name", "images/item_A.png", "drescription" , "price"];
    var item_2 = ["name2", "images/item_A.png", "drescription2" , "price2"];
    var item_3 = ["name3", "images/item_A.png", "drescription3" , "price3"];
    var items=[item_1,item_2,item_3]
    items.forEach(n => {
        document.getElementById('content').innerHTML+=`<div class="item"><table>
            <tr>
                <td>
                    <div class="item_image">
                        <img src="`+n[1]+`">
                    </div>
                </td>
                <td>
                    <div class="item_info">
                        `+n[0]+`
                        `+n[2]+`
                        `+n[3]+`
                    </div>
                    <div class="item_buy">
                        <button>
                            BOTAO DE COMPRA
                        </button>
                    </div>
                </td>
            </tr>
        </table>
    </div>`;
    });
    
    
};
function loadAbout(){
    clearPage()
    document.getElementById('content').innerHTML=" this will be filled with about";
    alert(logged)
};
function loadTalents(){
    clearPage()
    document.getElementById('content').innerHTML=`
    
    <div class = "talents">
    <h1>Talents</h1>
    <div class="row" id="talents">
        <div class="talents-col">
            <img src="images/eve.jpg" style="max-width:100%;height:auto;"></a>
            <h3><b>Eve</b></h3>
            <p>INFO ABOUT THE TALENT</p>
            <a class="socials" href="https://www.google.com/%22%3E" id="socials">
                <b> Socials ➝ </b>
            </a>
        </div>

        <div class="talents-col">
            <img src="images/ado.jpg" style="max-width:100%;height:auto;">
            <h3><b>Ado</b></h3>
            <p>INFO ABOUT THE TALENT</p>
            <a class="socials" href="https://www.google.com/%22%3E" id="socials">
                <b>Socials ➝</b>
            </a>
        </div>

        <div class="talents-col">
            <img src="images/fujii.jpg" style="max-width:100%;height:auto;">
            <h3><b>Fujii Kaze</b></h3>
            <p>INFO ABOUT THE TALENT</p>
            <a class="socials" href="https://www.google.com/" id="socials">
                <b>Socials ➝</b>
            </a>

        </div>
    </div>
    `
};

function clearPage(){
    document.getElementById('content').innerHTML="";
};
