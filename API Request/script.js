var id = 1273294;
var data = {};
refresh();
var basicURL = 'http://api.openweathermap.org/data/2.5/forecast?id=' + id+ '&APPID=';
var key = '7f3e166582aaa5f10260235e7564c8ea';

if(isEmpty(data)){
    var newURL = basicURL + key;
    fetch(newURL)
    .then(res => res.json().then(finalData => localStorage.setItem('data' , JSON.stringify(finalData))).then(() => {data = JSON.parse(localStorage.getItem('data')); styleData();}))    
}
else{
    styleData();
}

function refresh(){
    data = JSON.parse(localStorage.getItem('data')) || {};
}

function isEmpty(obj){
    for(let i in obj){
        if(obj.hasOwnProperty(i)){
            return false;
        }
    }
    return true;
}

function styleData(){
    var head = data;
    var cityName = head.city.name;
    var bod = document.getElementsByTagName('body')[0];
    var mainHead = document.createElement('h1');
    mainHead.setAttribute('class', 'city');
    mainHead.innerText = 'Weather in ' + cityName;
    bod.appendChild(mainHead);
    for(var c=1; c<10; c++){
        var attrJSON = head.list[c];
        var weatherType = attrJSON.weather[0].main;
        var currTemp = (Math.round((attrJSON.main.temp - 273)*100)/100) + ' Cel'; 
        var maxTemp = (Math.round((attrJSON.main.temp_max - 273)*100)/100) + ' Cel';
        var minTemp = (Math.round((attrJSON.main.temp_min - 273)*100)/100) + ' Cel';
        var humLevel = attrJSON.main.humidity + '%';
        var allAttr = {"Weather": weatherType, "Current Temperature": currTemp, "Minimum Temperature": minTemp, "Maximum tempertaure": maxTemp, "Humidity Level": humLevel};
        var time =  attrJSON.dt_txt;
        var containerDiv = document.createElement('div');
        containerDiv.setAttribute('class', 'mainCont');
        var headingCont = document.createElement('div');
        headingCont.setAttribute('class', 'heading');
        var headingText = document.createElement('h1');
        headingText.setAttribute('class', 'headingText');
        headingText.innerText = 'At ' + time;
        bod.appendChild(containerDiv);
        containerDiv.appendChild(headingCont);
        headingCont.appendChild(headingText);
        let i=1;
        for(let k in allAttr){
            var dataBox = document.createElement('div');
            dataBox.setAttribute('class', 'weatherAttribute');
            dataBox.setAttribute('id', 'weather' + i);
            var spanAttr = document.createElement('span');
            spanAttr.setAttribute('class', 'attribute');
            spanAttr.innerText = k;
            var spanVal = document.createElement('span');
            spanVal.setAttribute('class', 'value');
            spanVal.innerText = allAttr[k];
            containerDiv.appendChild(dataBox);
            dataBox.appendChild(spanAttr);
            dataBox.appendChild(spanVal);
            i++;
        }
    }
}