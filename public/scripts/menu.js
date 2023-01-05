
function loadHome(){
    clearPage()
    var item_1 = ["Fujii Kaze", "images/vinyl1.jpg", "Deluxe Vinyl" , "50€"];
    var item_2 = ["Polyphia", "images/vinyl2.jpg", "Standard Vinyl" , "25€"];
    var item_3 = ["Eve", "images/vinyl3.jpg", "Standard Vinyl" , "25€"];
    var item_4= ["Random", "images/item_A.png", "CD + Vinyl" , "35€"];
    var item_5= ["Random", "images/item_A.png", "CD" , "15€"];
    var item_6= ["Random", "images/item_A.png", "CD + Vinyl" , "35€"];
    var item_7= ["Random", "images/item_A.png", "Vinyl" , "20€"];
    var item_8= ["Random", "images/item_A.png", "Vinyl" , "20€"];
    var items= [item_1,item_2,item_3,item_4,item_5,item_6,item_7,item_8]
    items.forEach(n => {
        document.getElementById('content').innerHTML+=`<div class="item"><table>
            <tr>
                <td>
                    <div class="item_image">
                        <img src="`+n[1]+`">
                    </div>
                </td>
                <td>
                    <div class="item_info" style="color: #fff;">
                        <h3><b>`+n[0]+`</b></h3>
                        `+n[2]+`
                        <br>
                        <br>
                        `+n[3]+`
                    </div>
                    <div class="item_buy">
                    <br>
                        <button>
                            Add to Cart
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
    document.getElementById('content').innerHTML=`

        <p style ="font-family: Arial, Helvetica, sans-serif;"><h1> About Us </h1></p>
        
        <div class="aboutBox">
        <h2><p> Welcome to our vinyl shop! We are a team of music lovers who are dedicated to bringing the joy of vinyl records to music fans around the world. Our online store offers a wide variety of artists and genres to match your taste. </p> 
        <p> We believe that vinyl offers a unique listening experience that digital formats can't match, the warmth and depth of the sound, the tactile experience of handling the record, and the artwork and packaging of the physical product. We are committed to preserving and promoting the art of vinyl and we hope that our online shop can help bring this experience to even more people. </p>     
        <p> Thank you for visiting us and we hope you find something that you love in our collection. </p> </h2>
        </div>

    <div class="case">
        <div class="contactInfo">
            <div class="box">
                <div class="icon"><i class="fa fa-envelope" aria-hidden="true"></i></div>
                <div class="text">
                    <h4> Email <br>  projetoDW@support.ual </h4>
                </div>
            </div>
            <div class="box">
                <div class="icon"><i class="fa fa-phone" aria-hidden="true"></i></div>
                <div class="text">
                    <h4> <b>Phone</b> <br>+351 912 345 678 </h4>
                </div>
            </div>
        </div>
    </div>
    <div class = "boxV2"> 
    </div>
    `;
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
            <a class="socials" href="https://www.google.com/" id="socials">
                <b> Socials ➝ </b>
            </a>
        </div>

        <div class="talents-col">
            <img src="images/polyphia.jpg" style="max-width:100%;height:auto;">
            <h3><b>Polyphia</b></h3>
            <p>INFO ABOUT THE TALENT</p>
            <a class="socials" href="https://www.google.com/" id="socials">
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
