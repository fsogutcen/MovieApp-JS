$('.dropdown-menu a').on('click', function () {
    if (this.id == "title-asc") {
        $('#sort-btn').text("Title In Ascending");
        theAscFunction();
    } else if (this.id == "title-desc") {
        $('#sort-btn').text("Title In Descending");
        theDescFunction();
    } else if (this.id == "year-desc") {
        $('#sort-btn').text("Year In Descending");
        sortByYearDescFunction();
    } else if (this.id == "year-asc") {
        $('#sort-btn').text("Year In Ascending");
        sortByYearAscFunction();
    } else {
        alert("error in sorting type selection");
    }

});

// Back to top button
(function () {
    $(document).ready(function () {
        return $(window).scroll(function () {
            return $(window).scrollTop() > 100 ? $("#back-to-top").addClass("show") : $("#back-to-top").removeClass("show")
        }), $("#back-to-top").click(function () {
            return $("html,body").animate({
                scrollTop: "0"
            })
        })
    })
}).call(this);
//////////////

let parent = document.querySelector('#filmler-listele')
let counter = 21;
let releaseYearDataArray = [];


function sortTrackingTitle(veri, order) {
    return veri.sort(order === 'DESC'
        ? function (b, a) {
            a = a.Title.slice(0, 3);
            b = b.Title.slice(0, 3);
            return isNaN(b) - isNaN(a) || a > b || -(a < b);
        }
        : function (a, b) {
            a = a.Title.slice(0, 3);
            b = b.Title.slice(0, 3);
            return isNaN(a) - isNaN(b) || a > b || -(a < b);
        });
}

function sortTrackingReleaseYear(veri, order) {
    return veri.sort(order === 'DESC'
        ? function (b, a) {
            a = a.releaseYear.slice(0, 4);
            b = b.releaseYear.slice(0, 4);
            return isNaN(b) - isNaN(a) || a > b || -(a < b);
        }
        : function (a, b) {
            a = a.releaseYear.slice(0, 4);
            b = b.releaseYear.slice(0, 4);
            return isNaN(a) - isNaN(b) || a > b || -(a < b);
        });
}

function template(array) {
    for (let i = 0; i < counter; i++) {
        let releaseYearData = array[i].releaseYear;
        // console.log("Title: " + array[i].Title);

        if (releaseYearData >= 2010) {
            let divElementCol = document.createElement('div')
            divElementCol.classList.add('col-6', 'col-md-4', 'col-lg-2');

            let divElementImage = document.createElement('img')
            divElementImage.setAttribute("src", array[i].imgUrl);
            divElementImage.setAttribute("width", "150px");
            divElementImage.classList.add("list-img");
            divElementImage.setAttribute('id', array[i].Id);;


            parent.appendChild(divElementCol)
            divElementCol.appendChild(divElementImage)

        } else {
            counter++;
            console.log("!!!---This Movie Release Year <=2010");
        }
    }

}

var data;
var featuredImg = document.getElementsByClassName("movie-img")[0]
var featuredTitle = document.getElementById("movie-title")


function changeMovie(myList) {
    $(".list-img").click(function (event) {
        // alert(event.target.id);
        console.log(myList[event.target.id - 1]);
        var num = event.target.id - 1
        featuredImg.setAttribute("src", myList[num].imgUrl);
        featuredTitle.innerHTML = (myList[num].Title);
    });
}


function theAscFunction() {
    counter = 21; //release yıl sınırlaması nedeniyle değiştiği için yeniden belirliyoruz.
    $("#filmler-listele").html("");
    data = fetch("movies.json")
        .then(response => response.json())
        .then(veri => {

            //JSON to array
            var myJsonString = JSON.stringify(veri);
            var myJsonList = JSON.parse(myJsonString)
            // console.log("------------------myJsonString: " + myJsonString);

            sortTrackingTitle(veri);
            template(veri);
            changeMovie(myJsonList);


        })

}

//sayfa açılırkenki sıralama
theAscFunction();


function theDescFunction() {
    counter = 21;//release yıl sınırlaması nedeniyle değiştiği için yeniden belirliyoruz.
    $("#filmler-listele").html("");
    data = fetch("movies.json")
        .then(response => response.json())
        .then(veri => {
            //JSON to array
            var myJsonString = JSON.stringify(veri);
            var myJsonList = JSON.parse(myJsonString)

            sortTrackingTitle(veri, 'DESC');
            //console.log(veri);
            template(veri);
            changeMovie(myJsonList);
        })
}

function sortByYearDescFunction() {
    counter = 21;//release yıl sınırlaması nedeniyle değiştiği için yeniden belirliyoruz.
    $("#filmler-listele").html("");
    data = fetch("movies.json")
        .then(response => response.json())
        .then(veri => {
            //JSON to array
            var myJsonString = JSON.stringify(veri);
            var myJsonList = JSON.parse(myJsonString)

            sortTrackingReleaseYear(veri, 'DESC');
            // console.log(veri);
            template(veri);
            changeMovie(myJsonList);
        })

}

function sortByYearAscFunction() {
    counter = 21;//release yıl sınırlaması nedeniyle değiştiği için yeniden belirliyoruz.
    $("#filmler-listele").html("");
    data = fetch("movies.json")
        .then(response => response.json())
        .then(veri => {
            //JSON to array
            var myJsonString = JSON.stringify(veri);
            var myJsonList = JSON.parse(myJsonString)

            sortTrackingReleaseYear(veri);
            // console.log(veri);
            template(veri);
            changeMovie(myJsonList);
        })
}