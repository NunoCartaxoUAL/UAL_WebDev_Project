
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
    document.getElementById('content').innerHTML=" this will be filled with talents information";
};

function clearPage(){
    document.getElementById('content').innerHTML="";
};
