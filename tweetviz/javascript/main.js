let mainsvg = d3.select("#mainsvg"),
    svgWidth = window.innerWidth,
    svgHeight = window.innerHeight,
    axisHeight = 40,
    margin = {top: 40, right: 40, bottom: 40, left: 80, axisx: 40, axisy: 60, storyTop: 40},
    width = svgWidth - margin.left - margin.right - margin.axisx,
    height = svgHeight - margin.top - margin.storyTop - margin.axisx - margin.bottom,
    wordStreamHeight = 600,
    wordStreamWidth = width,
    scaleX = d3.scaleLinear().rangeRound([0, width]),
    mainGroup = null;//used to store main group as a global variable later on

mainsvg.attr("width", svgWidth).attr("height", svgHeight);

// let fileName = "tweets20200402";
// let timeFormatStr = "%H:%M %p";

// let fileName = "tweets202004051114";
// let timeFormatStr = "%a, %H%p";

// let fileName = "geo_all";
let fileName = "new_tweets202004281725";
let timeFormatStr = "%Y-%m-%d, %H";
let timeParse = d3.timeParse(timeFormatStr);
function outputFormat(date) {
    return d3.timeFormat(timeFormatStr)(date);
}


loadData(fileName);

function loadData(fileName){
    //Just make sure that we clean the svg.
    mainsvg.selectAll("*").remove();
    //The maingroup
    mainGroup = mainsvg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.json('data/'+fileName+'.json').then(rawData => {
        //Combine every two hours
        d3.json('data/instagrams_'+fileName+'.json').then(instagramData=>{
            loadTweetsData({'rawData': rawData, 'instagramData': instagramData}, draw);
        });
    });
}
