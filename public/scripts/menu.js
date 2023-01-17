async function calendar(){
    const response = await fetch('/calendar');
    // Parsing it to JSON format
    const data = await response.json();
    random = parseInt(Math.floor(Math.random() * data.response.holidays.length)+1)
    holiday= data.response.holidays[random];

    document.getElementById("randomHol").innerHTML += "did you know? "+holiday.date.iso.substring(0, 10) +" was a holiday in japan, it was the "+holiday.name+".     "
    
}
async function loadHome(){
    clearPage()

    const prod = await makeRequest("https://localhost:8080/products", {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await prod.json();
    json.forEach(n => {
        document.getElementById('content').innerHTML+=`<div class="item"><table>
            <tr>
                <td>
                    <div class="item_image">
                        <img src="`+n["image"]+`">
                    </div>
                </td>
                <td>
                    <div style="color: #fff;">
                        <h3><b>`+n["name"]+`</b></h3>
                        `+n["type"]+`
                        <br>
                        <br>
                        `+n["price"]+`€
                    </div>
                    <div class="item_buy">
                    <br>
                        <button class ="buyButton" onclick='addToCart("`+n["id"]+`")' role="button">
                            Add to Cart
                        </button>
                    </div>
                </td>
            </tr>
        </table>
    </div>`;
    });
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
            <p>Eve, formerly known as Keitora and Kurowa, is a Japanese singer-songwriter and Vocaloid producer. He got his start in the music industry by doing covers on Nico Nico Douga. He eventually signed to Toy's Factory in 2019, moving away from Harapeco Records. He was also a guest in "School of Lock!" by Tokyo FM.</p>
            <a target="_blank" class="socials" href="https://www.youtube.com/channel/UCUXfRsEIJ9xO1DT7TbEWksw" id="socials">
                <b> Socials ➝ </b>
            </a>
        </div>

        <div class="talents-col">
            <img src="images/polyphia.jpg" style="max-width:100%;height:auto;">
            <h3><b>Polyphia</b></h3>
            <p>Polyphia is a primarily instrumental progressive rock band based in Plano, Texas, formed in 2010. The group consists of guitarists Tim Henson and Scott LePage, bassist Clay Gober, and drummer Clay Aeschliman. Polyphia's sound is noted for incorporating virtuosic guitar parts with other styles and genres of music.</p>
            <a target="_blank" class="socials" href="https://www.youtube.com/@Polyphia" id="socials">
                <b>Socials ➝</b>
            </a>
        </div>

        <div class="talents-col">
            <img src="images/fujii.jpg" style="max-width:100%;height:auto;">
            <h3><b>Fujii Kaze</b></h3>
            <p>Fujii Kaze is a Japanese singer-songwriter and musician under Universal Sigma. Raised in Satosho, Okayama in Japan, he began uploading covers to YouTube since the age of 12. He released his first studio album, Help Ever Hurt Never in 2020, which reached number one on the Billboard Japan Hot Albums.</p>
            <a target="_blank" class="socials" href="https://www.youtube.com/@FujiiKaze" id="socials">
                <b>Socials ➝</b>
            </a>

        </div>
    </div>
    `
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
    <div class = "boxV2" style:"overflow: hidden;"> 
    <embed src="twit.html" style="width:300px; height: 200px;">
    </div>
    
    `;
};

function clearPage(){
    document.getElementById('content').innerHTML="";
};

// SHOPPING CART

function loadCart(){
    document.getElementById('showCart').style.opacity = 1;
    document.getElementById('showCart').style.top = "47%"
}

function closeCart(){
    document.getElementById('showCart').style.opacity = 0 
    document.getElementById('showCart').style.top = "-150%"
}

