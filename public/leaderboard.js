/* global items */

getLeaderboard();

function getLeaderboard() {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        let body = JSON.parse(xhr.responseText);
        let pos = '';
        let us = '';
        let sc = '';
        for (let row of body) {
            pos += `
        <tr>
            <td>${row.Place}</td>
        </tr>
      `;
        }
        for (let row of body) {
            us += `
        <tr>
            <td>${row.Usuario}</td>
        </tr>
      `;
        }
        for (let row of body) {
            sc += `
        <tr>
            <td>${row.BestScore}</td>
        </tr>
      `;
        }

        posicion.innerHTML = pos;
        Usuario.innerHTML = us;
        Score.innerHTML = sc;
    };
    xhr.open('GET', '/leaderboard'); //Aquí va la api
    xhr.send();
}