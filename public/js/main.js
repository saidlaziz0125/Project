window.addEventListener("load", ()=>{


    const profile = document.querySelectorAll(".contener")
    const add = document.querySelectorAll(".add")
    const txt = document.querySelectorAll(".contener_txt")
    const name = document.querySelectorAll(".name")
    profile.forEach((element, value) => {
        add.forEach((elem, val) => {
            txt.forEach((e, v) => {
                name.forEach((el, va) => {
                
                    $(e).hover(function () {
                        if (value==val && value==v && value==va) {
                            $(element).css({"width":"50px", "height":"50px", "transform": "translate(30px, -20px)", "box-shadow": "0 0 5px #9c9c9c", "border": "0"});
                            $(elem).css({"display": "block", "transform": "translate(-100px, 0)"}); 
                            $(e).css("height" , "140px"); 
                            $(el).css("font-size", "27px")
                            $(el).css("margin-top", "5px")
                        }
                        // over
                    
                    }, function () {
                        // out
                        $(element).css({"width":"70px", "height":"70px", "transform": "translate(5px, 3px)", "box-shadow": "0 0 5px white", "border": "5px solid #fdfdfd"});
                        $(elem).css("display", "none");
                        $(e).css("height" , "80px");
                        $(el).css("font-size", "31px")
                        $(el).css("margin-top", "15px")
                    });
                });
            });
        });
    });

    // //////////////////////////////////////////////////////////



    const bar = document.querySelector(".bar")
    const textList = document.querySelector(".menu-list")
    let i =0 
    document.querySelector(".toogleB").addEventListener("click", ()=>{
        i++;
        $(".menu-list").css("width", "200px");
        document.querySelector(".toogleB").addEventListener("click", ()=>{
            if(i==2) {
                i=0
                $(".menu-list").css("width", "0");
            }
        })
    })


    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})


})