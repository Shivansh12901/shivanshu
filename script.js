let logs = [];

function showTab(tabId) {
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll("div[id]").forEach(div => div.classList.add("hidden"));
    document.getElementById(tabId).classList.remove("hidden");
    event.target.classList.add("active");
}

document.getElementById("logForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const task = document.getElementById("task").value;
    const details = document.getElementById("details").value;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    logs.push({ date, time, name, task, details });
    document.getElementById("name").value = "";
    document.getElementById("task").value = "";
    document.getElementById("details").value = "";
    updateTable();
});

function updateTable() {
    const table = document.getElementById("logTable");
    table.innerHTML = "";
    logs.forEach(log => {
        let row = table.insertRow();
        row.insertCell(0).textContent = log.date;
        row.insertCell(1).textContent = log.time;
        row.insertCell(2).textContent = log.name;
        row.insertCell(3).textContent = log.task;
        row.insertCell(4).textContent = log.details;
    });
}

function filterLogs() {
    const filterText = document.getElementById("filter").value.toLowerCase();
    const table = document.getElementById("logTable");
    table.innerHTML = "";
    logs.filter(log => log.name.toLowerCase().includes(filterText) || log.task.toLowerCase().includes(filterText) || log.date.includes(filterText)).forEach(log => {
        let row = table.insertRow();
        row.insertCell(0).textContent = log.date;
        row.insertCell(1).textContent = log.time;
        row.insertCell(2).textContent = log.name;
        row.insertCell(3).textContent = log.task;
        row.insertCell(4).textContent = log.details;
    });
}

function submitReport() {
    alert("Report submitted: " + document.getElementById("reportText").value);
    document.getElementById("reportText").value = "";
}

function downloadReport() {
    let ws = XLSX.utils.json_to_sheet(logs);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    XLSX.writeFile(wb, "work_reports.xlsx");
}

// <![CDATA[  <-- For SVG support
if ('WebSocket' in window) {
(function () {
    function refreshCSS() {
        var sheets = [].slice.call(document.getElementsByTagName("link"));
        var head = document.getElementsByTagName("head")[0];
        for (var i = 0; i < sheets.length; ++i) {
            var elem = sheets[i];
            var parent = elem.parentElement || head;
            parent.removeChild(elem);
            var rel = elem.rel;
            if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
            }
            parent.appendChild(elem);
        }
    }
    var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
    var address = protocol + window.location.host + window.location.pathname + '/ws';
    var socket = new WebSocket(address);
    socket.onmessage = function (msg) {
        if (msg.data == 'reload') window.location.reload();
        else if (msg.data == 'refreshcss') refreshCSS();
    };
    if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
        console.log('Live reload enabled.');
        sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
    }
})();
}
else {
console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}
// ]]>