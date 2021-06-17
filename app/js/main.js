/*1 variant*/
document.addEventListener('DOMContentLoaded', function () {
    var table = document.getElementById('gen');
    $.getJSON('./data.json', function(data) {
        data.forEach(function (row) {
            if(data.length < 11) {
                document.getElementById('btn').style.visibility = 'hidden';
            }
            var tr = document.createElement('tr');
            Object.keys(row).forEach(function (key) {
                var td = document.createElement('td');
                td.innerText = row[key];
                tr.appendChild(td);
            })
            table.appendChild(tr);
        })
    });
})



/*2 variant*/
// var xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         var mydata = JSON.parse(this.responseText);
//         var table = document.getElementById('gen');
//         mydata.forEach(function (row) {
//             if(mydata.length < 11) {
//                 document.getElementById('btn').style.visibility = 'hidden';
//             }
//             var tr = document.createElement('tr')
//             Object.keys(row).forEach(function (key) {
//                 var td = document.createElement('td')
//                 td.innerText = row[key]
//                 tr.appendChild(td)
//             })
//             table.appendChild(tr)
//         });
//     }
// };
// xmlhttp.open("GET", "data.json", true);
// xmlhttp.send();

