window.onload = function () {
    let table = document.getElementById('table-wrapper');
    let tableHTML = "";
    let groupedByDateTableHTML = "";
    let objectTable = [];
    let maxColumn = 5;
    // let displayContentOfCell = function (startPos, flag) {
    //     let cells = table.getElementsByClassName('rTableCell');
    //     if (flag === false && maxColumn > 1) {
    //         for (let i = startPos, ii = cells.length; i < ii; i += 5) {
    //             cells[i].firstChild.style.display = "none";
    //         }
    //         incomingFlag = true;
    //         maxColumn -= 1;
    //     } else if (flag === true && maxColumn >= 1) {
    //         for (let i = 3, ii = divs.length; i < ii; i += 5) {
    //             cells[i].firstChild.style.display = "inline";
    //         }
    //         incomingFlag = false;
    //         if (maxColumn !== 5) {
    //             maxColumn += 1;
    //         }
    //     }
    //
    // };

    let obj = new Map();

    for (let i = 0, ii = myStatementData.length; i < ii; i += 1) {
        [obj["date"], obj["time"]] = myStatementData[i].date.split("T");
        obj["type"] = myStatementData[i].type;
        let am = myStatementData[i].amount;
        if (am >= 0) {
            obj["incoming"] = am;
            obj["outcoming"] = 0;
        } else {
            obj["outcoming"] = am;
            obj["incoming"] = 0;
        }
        objectTable.push(obj);
        obj = new Map();
    }
    objectTable.sort(function (a, b) {
        if (a.date >= b.date) {
            if (a.time >= b.time) {
                return 1;
            }
            return -1;
        } else {
            return -1;
        }
    });

    for (let i = 0, ii = objectTable.length; i < ii; i += 1) {
        tableHTML += `
        <div class="rTableRow">\n
        <div class="rTableCell"><strong>${objectTable[i].date}</strong></div>\n
        <div class="rTableCell"><strong>${objectTable[i].time}</strong></div>\n
        <div class="rTableCell"><strong>${objectTable[i].type}</strong></div>\n
        <div class="rTableCell"><strong>${objectTable[i].incoming}</strong></div>\n
        <div class="rTableCell"><strong>${objectTable[i].outcoming}</strong></div>\n
        </div>`;
    }

    let groupedByDate = new Map();

    for (let i = 0, ii = objectTable.length; i < ii; i += 1) {
        if (groupedByDate.has(objectTable['date'])) {
            groupedByDate[objectTable[i]['date']]['incoming'] += objectTable[i]['incoming'];
            groupedByDate[objectTable[i]['date']]['outcoming'] += objectTable[i]['outcoming'];
        } else {
            let grpDate = new Map();
            grpDate['incoming'] = objectTable[i]['incoming'];
            grpDate['outcoming'] = objectTable[i]['outcoming'];
            groupedByDate[objectTable[i]['date']] = grpDate;
        }
    }

    for (m in groupedByDate) {
        groupedByDateTableHTML += `
            <div class="rTableRow">\n
            <div class="rTableCell"><strong>${m}</strong></div>\n
            <div class="rTableCell"><strong></strong></div>\n
            <div class="rTableCell"><strong></strong></div>\n
            <div class="rTableCell"><strong>${groupedByDate[m].incoming}</strong></div>\n
            <div class="rTableCell"><strong>${groupedByDate[m].outcoming}</strong></div>\n
            </div>\n
       `;
    }

    let elm = document.createElement('div');
    elm.className = "rTable";
    elm.id = "table-content";
    elm.innerHTML = (`
    <div class="rTableRow">\n
    <div class="rTableHead"><strong>Date</strong></div>\n
    <div class="rTableHead"><strong>Time</strong></div>\n
    <div class="rTableHead"><strong>Type</strong></div>\n
    <div class="rTableHead"><strong>Incoming</strong></div>\n
    <div class="rTableHead"><strong>Outcoming</strong></div>\n
    </div>\n` + tableHTML);
    table.appendChild(elm);

    let elm2 = document.createElement('div');
    elm2.className = "rTable";
    elm2.id = "table-content";
    elm2.innerHTML = (`
    <div class="rTableRow">\n
    <div class="rTableHead"><strong>Date</strong></div>\n
    <div class="rTableHead"><strong>Time</strong></div>\n
    <div class="rTableHead"><strong>Type</strong></div>\n
    <div class="rTableHead"><strong>Incoming</strong></div>\n
    <div class="rTableHead"><strong>Outcoming</strong></div>\n
    </div>\n` + groupedByDateTableHTML);

    let time = document.getElementById("Time");
    let date = document.getElementById("Date");
    let type = document.getElementById("Type");
    let incoming = document.getElementById("Incoming");
    let outcoming = document.getElementById("Outcoming");
    let selectionOpt = document.getElementById("selectionOpt");
    let timeFlag = false;
    let dateFlag = false;
    let typeFlag = false;
    let incomingFlag = false;
    let outcomingFlag = false;

    time.addEventListener('click', function () {
        let divs = table.getElementsByClassName('rTableCell');
        if (timeFlag === false && maxColumn > 1) {
            for (let i = 0, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "none";
            }
            timeFlag = true;
            maxColumn -= 1;
        } else if (timeFlag === true && maxColumn >= 1) {
            for (let i = 0, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "inline";
            }
            timeFlag = false;
            if (maxColumn !== 5) {
                maxColumn += 1;
            }
        }
    });
    date.addEventListener('click', function () {
        let divs = table.getElementsByClassName('rTableCell');
        if (dateFlag === false && maxColumn > 1) {
            for (let i = 1, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "none";
            }
            dateFlag = true;
            maxColumn -= 1;
        } else if (dateFlag === true && maxColumn >= 1) {
            for (let i = 1, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "inline";
            }
            dateFlag = false;
            if (maxColumn !== 5) {
                maxColumn += 1;
            }
        }
    });
    type.addEventListener('click', function () {
        let divs = table.getElementsByClassName('rTableCell');
        if (typeFlag === false && maxColumn > 1) {
            for (let i = 2, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "none";
            }
            typeFlag = true;
            maxColumn -= 1;
        } else if (typeFlag === true && maxColumn >= 1) {
            for (let i = 2, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "inline";
            }
            typeFlag = false;
            if (maxColumn !== 5) {
                maxColumn += 1;
            }
        }
    });
    outcoming.addEventListener('click', function () {
        let divs = table.getElementsByClassName('rTableCell');
        if (outcomingFlag === false && maxColumn > 1) {
            for (let i = 4, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "none";
            }
            outcomingFlag = true;
            maxColumn -= 1;
        } else if (outcomingFlag === true && maxColumn >= 1) {
            for (let i = 4, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "inline";
            }
            outcomingFlag = false;
            if (maxColumn !== 5) {
                maxColumn += 1;
            }
        }
    });
    incoming.addEventListener('click', function () {
        let divs = table.getElementsByClassName('rTableCell');
        if (incomingFlag === false && maxColumn > 1) {
            for (let i = 3, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "none";
            }
            incomingFlag = true;
            maxColumn -= 1;
        } else if (incomingFlag === true && maxColumn >= 1) {
            for (let i = 3, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "inline";
            }
            incomingFlag = false;
            if (maxColumn !== 5) {
                maxColumn += 1;
            }
        }
    });

    let toggleFlag = false;

    let divForGroupedTable = document.createElement('div');
    divForGroupedTable.className = "rTable";
    let grp = table.firstChild;
    grp.remove();
    selectionOpt.onchange = function () {
        let selectionOpt = document.getElementById("selectionOpt");
        if ((selectionOpt.options[selectionOpt.selectedIndex].value) === "Date Group" && toggleFlag === false) {
            grp = table.firstChild;
            grp.remove();
            table.appendChild(elm2);
            date.disabled = true;
            time.disabled = true;
            incoming.disabled = true;
            outcoming.disabled = true;
            type.disabled = true;
            toggleFlag = true;
        } else if ((selectionOpt.options[selectionOpt.selectedIndex].value) === "Without Grouping" && toggleFlag === true) {
            grp = table.firstChild;
            grp.remove();
            table.appendChild(elm);
            date.disabled = false;
            time.disabled = false;
            incoming.disabled = false;
            outcoming.disabled = false;
            type.disabled = false;
            toggleFlag = false;
        }
    };
};

