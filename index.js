// Your code logic


const hash = CryptoJS.MD5(1 + "0cddd79bbead6beefbe108c2ab4c7a5030faf7f5" + "f4a2e261772a26729b87e2a3120b9cc9").toString();

// catching the elements
var mainBox = document.getElementById("mainBox")
var listBox = document.getElementById("heroList")
var footer = document.getElementById("footer")








try {
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=f4a2e261772a26729b87e2a3120b9cc9&hash=${hash}`)
        .then(async response => {
            var data = await response.json()

            showList(data.data.results)

            footer.innerText = data.attributionText;
            // console.log()
        })
}
catch (error) {
    console.log(error)
}



var showList = (data) => {
    for (hero of data) {

        //   create li and a tag;
        let newLi = document.createElement('li');

        newLi.setAttribute("onclick", `renderHero(${hero.id})`)

        // create img tag;
        let imgTag = document.createElement('img')
        imgTag.src = hero.thumbnail.path + "." + hero.thumbnail.extension;
        imgTag.alt = hero.name;

        let p = document.createElement("p");
        p.innerText = hero.name;

        newLi.appendChild(imgTag)
        newLi.appendChild(p)

        listBox.appendChild(newLi);

    }



}



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
                    // console.log(comic)
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






                // console.log(data.name)
            })
    }
    catch (error) {
        console.log(error)
    }
}
