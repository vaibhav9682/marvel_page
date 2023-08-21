// indexing of functions;

// genrating the hash key;
// catching the elements
// setting the favourite list variable
// hitting the API
// to show the heroes on home page
// to show bio of selected hero
// to add in the local storage favourite list 
// to show the favourite hero page
// to change the color of favourite hero




// genrating the hash key;
const hash = CryptoJS.MD5(1 + "0cddd79bbead6beefbe108c2ab4c7a5030faf7f5" + "f4a2e261772a26729b87e2a3120b9cc9").toString();

// catching the elements
var mainBox = document.getElementById("mainBox")
var footer = document.getElementById("footer")


// setting the favourite list variable
var favArrJson = localStorage.getItem("favArr")
if (favArrJson) {
    var favArr = JSON.parse(favArrJson);
} else {
    var favArr = []
}


// hitting the API
try {
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=f4a2e261772a26729b87e2a3120b9cc9&hash=${hash}`)
        .then(async response => {
            var data = await response.json()
            var mainData = data.data.results
            showList(mainData)
            favColorChange()
            searchFun(mainData)



            footer.innerText = data.attributionText;
        })
}
catch (error) {
    console.log(error)
}



// to show the heroes on home page
var showList = (data) => {

    mainBox.innerHTML = ""
    var listBox = document.createElement("ul")
    listBox.setAttribute("id", "heroList")
    mainBox.appendChild(listBox)

    for (hero of data) {

        let heroImg = hero.thumbnail.path + "." + hero.thumbnail.extension;


        //   create li ;
        let newLi = document.createElement('li');
        // let btn = document.createElement("button")

        // div lower section
        let likeDiv = document.createElement('div')
        let icon = document.createElement("i");
        icon.setAttribute("class", "heart-icon fas fa-heart likeIcon");
        icon.setAttribute("id", hero.id)
        likeDiv.appendChild(icon)
        likeDiv.setAttribute("class", "likeDiv")
        likeDiv.setAttribute("onclick", `addFavourite("${hero.id}","${hero.thumbnail.path}","${hero.thumbnail.extension}","${hero.name}")`);

        let p = document.createElement("p");
        p.innerText = hero.name;
        let infoSection = document.createElement("div")
        infoSection.appendChild(p)
        infoSection.appendChild(likeDiv)


        // create img tag;
        let imgTag = document.createElement('img')
        imgTag.src = heroImg;
        imgTag.alt = hero.name;
        imgTag.setAttribute("onclick", `renderHero(${hero.id})`)




        newLi.appendChild(imgTag)
        newLi.appendChild(infoSection)


        listBox.appendChild(newLi);

    }


}

// to show bio of selected hero

function renderHero(id) {

    try {
        fetch(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=f4a2e261772a26729b87e2a3120b9cc9&hash=${hash}`)
            .then(async response => {
                var data = await response.json()
                data = data.data.results[0];
                mainBox.innerHTML = ""

                // description div
                let desDiv = document.createElement("div")
                desDiv.setAttribute("id", "desDiv");

                // image div 
                let imgDiv = document.createElement("div")
                imgDiv.setAttribute("id", "imgDiv")
                let imgTag = document.createElement('img')
                imgTag.src = data.thumbnail.path + "." + data.thumbnail.extension;
                imgTag.alt = data.name;
                imgDiv.appendChild(imgTag);


                // info
                let infoDiv = document.createElement("div")
                let infoP = document.createElement("p")
                let h1 = document.createElement("h1")
                h1.innerText = data.name
                infoP.innerText = data.description;
                infoDiv.setAttribute("class", "prime")
                infoDiv.appendChild(h1)
                infoDiv.appendChild(infoP)


                // comics div
                let comicDiv = document.createElement("div")
                let comicH2 = document.createElement("h2")
                let comicList = document.createElement("ul");
                for (comic of data.comics.items) {
                    let li = document.createElement("li")
                    li.innerText = comic.name;
                    comicList.appendChild(li);
                }
                comicH2.innerText = "Comics";
                comicDiv.setAttribute("class", "prime")
                comicDiv.appendChild(comicH2)
                comicDiv.appendChild(comicList)


                // Series div
                let seriesDiv = document.createElement("div")
                let seriesH2 = document.createElement("h2")
                let seriesList = document.createElement("ul");
                for (series of data.series.items) {
                    let li = document.createElement("li")
                    li.innerText = series.name;
                    seriesList.appendChild(li);
                }
                seriesH2.innerText = "Series";
                seriesDiv.appendChild(seriesH2)
                seriesDiv.appendChild(seriesList)


                //stories div
                let storyDiv = document.createElement("div")
                let storyH2 = document.createElement("h2")
                let storyList = document.createElement("ul");
                for (story of data.stories.items) {
                    let li = document.createElement("li")
                    li.innerText = story.name;
                    storyList.appendChild(li);
                }
                storyH2.innerText = "Stories";
                storyDiv.appendChild(storyH2)
                storyDiv.appendChild(storyList)


                // events div
                let eventsDiv = document.createElement("div")
                let eventsH2 = document.createElement("h2")
                let eventsList = document.createElement("ul");
                for (events of data.events.items) {
                    let li = document.createElement("li")
                    li.innerText = events.name;
                    eventsList.appendChild(li);
                }
                eventsH2.innerText = "Events";
                eventsDiv.setAttribute("class", "prime")
                eventsDiv.appendChild(eventsH2)
                eventsDiv.appendChild(eventsList)


                // other links
                let extraDiv = document.createElement("div")
                let extraH2 = document.createElement("h2")
                let extraList = document.createElement("ul");
                for (other of data.urls) {
                    let li = document.createElement("li")
                    let anchor = document.createElement("a")
                    anchor.setAttribute("href", other.url)
                    anchor.innerText = other.type;
                    li.appendChild(anchor)
                    extraList.appendChild(li);
                }
                extraH2.innerText = "Other Links"
                extraDiv.appendChild(extraH2)
                extraDiv.appendChild(extraList)


                //    appending the info in desDiv
                desDiv.appendChild(imgDiv)
                desDiv.appendChild(infoDiv);
                desDiv.appendChild(comicDiv)
                desDiv.appendChild(seriesDiv)
                desDiv.appendChild(storyDiv)
                desDiv.appendChild(eventsDiv)
                desDiv.appendChild(extraDiv)


                mainBox.appendChild(desDiv);


            })
    }
    catch (error) {
        console.log(error)
    }
}


// to add in the local storage favourite list 

function addFavourite(id, path, extn, name) {
    let icon = document.getElementById(id);

    // if hero is in the list
    if (favArr.length > 0) {

        for (i = 0; i < favArr.length; i++) {
            if (favArr[i].id == id) {
                favArr.splice(i, 1)
                var myArr = JSON.stringify(favArr)
                localStorage.setItem("favArr", myArr)
                icon.style.color = "white"
                return;
            }
        }
    }

    // if hero is not in the list
    let obj = {}
    obj.id = id;
    obj.thumbnail = {}
    obj.thumbnail.path = path;
    obj.thumbnail.extension = extn;
    obj.name = name
    favArr.push(obj)
    // icon.style.color = "red"
    var myArr = JSON.stringify(favArr)
    localStorage.setItem("favArr", myArr)
    favColorChange()
    return;
}

// to show the favourite hero page
function showFav() {
    let retriveArr = localStorage.getItem("favArr");
    let stingArr = JSON.parse(retriveArr);
    showList(stingArr);
    favColorChange()
}

// to change the color of favourite hero
function favColorChange() {
    let retriveArr = localStorage.getItem("favArr");
    if (retriveArr) {
        var stingArr = JSON.parse(retriveArr);

    } else {
        var stingArr = []
    }
    if (stingArr.length > 0) {
        for (fav of stingArr) {
            var icon = document.getElementById(fav.id);
            icon.style.color = "red"

        }
    }
}




//  search box


function searchFun(mainData) {

    const searchBox = document.getElementById("searchInput");
    const suggestionsList = document.getElementById("suggestions");
    const searchBtn = document.getElementById("searchBtn");



    searchBox.addEventListener("input", function () {
        if (searchBox.value == "") {
            suggestionsList.removeChild(li);
            console.log("empty")
        }
        const searchQuery = searchBox.value.toLowerCase();
        const filteredHero = mainData.filter(hero => hero.name.toLowerCase().includes(searchQuery));

        // Clear previous suggestions
        suggestionsList.innerHTML = "";

        // Add new suggestions
        filteredHero.forEach(hero => {
            const suggestionItem = document.createElement("li");
            suggestionItem.textContent = hero.name;
            suggestionsList.appendChild(suggestionItem);
        });
    });

    suggestionsList.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            searchBox.value = event.target.textContent;
            suggestionsList.innerHTML = "";
        }
    });

    // handle search result

    searchBtn.addEventListener("click", function () {
        if (searchBox.value == "") {
            return;
        } else {

            let heroName = searchBox.value
            console.log(heroName)
            for (H of mainData) {
                if (H.name == heroName) {
                    renderHero(H.id)
                    searchBox.value = ""
                }
            }

        }

    })

}


