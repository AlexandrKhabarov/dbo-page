window.onload = function () {
    let table = document.getElementById('table-wrapper');
    let tableHTML = "";
    let groupedByDateTableHTML = "";
    let objectTable = [];
    let maxColumn = 5;

    function unBlockOptions() {
        date.disabled = false;
        time.disabled = false;
        incoming.disabled = false;
        outcoming.disabled = false;
        type.disabled = false;
    }

    function blockOptions() {
        date.disabled = true;
        time.disabled = true;
        incoming.disabled = true;
        outcoming.disabled = true;
        type.disabled = true;
    }

    function blockOneOptions() {

    }

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
        let dateEqua = a.date === b.date;
        if (dateEqua)
            return a.time >= b.time;
        return a.date > b.date;
    });

    for (let i = 0, ii = objectTable.length; i < ii; i += 1) {
        tableHTML += `
        <div class="rTableRow">\n
        <div class="rTableCell"><p>${objectTable[i].date}</p></div>\n
        <div class="rTableCell"><p>${objectTable[i].time}</p></div>\n
        <div class="rTableCell"><p>${objectTable[i].type}</p></div>\n
        <div class="rTableCell"><p>${objectTable[i].incoming}</p></div>\n
        <div class="rTableCell"><p>${objectTable[i].outcoming}</p></div>\n
        </div>`;
    }

    let groupedByDate = new Map();

    for (let i = 0, ii = objectTable.length; i < ii; i += 1) {
        if (groupedByDate[objectTable[i]['date']] !== undefined) {
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
            <div class="rTableCell"><p>${m}</p></div>\n
            <div class="rTableCell"><p></p></div>\n
            <div class="rTableCell"><p></p></div>\n
            <div class="rTableCell"><p>${groupedByDate[m].incoming}</p></div>\n
            <div class="rTableCell"><p>${groupedByDate[m].outcoming}</p></div>\n
            </div>\n
       `;
    }

    let tableContent = document.createElement('div');
    tableContent.className = "rTable";
    tableContent.id = "table-content";
    tableContent.innerHTML = (`
    <div class="rTableRow">\n
    <div class="rTableHead"><strong>Date</strong></div>\n
    <div class="rTableHead"><strong>Time</strong></div>\n
    <div class="rTableHead"><strong>Type</strong></div>\n
    <div class="rTableHead"><strong>Incoming</strong></div>\n
    <div class="rTableHead"><strong>Outcoming</strong></div>\n
    </div>\n` + tableHTML);
    table.appendChild(tableContent);

    let tableGroupedContent = document.createElement('div');
    tableGroupedContent.className = "rTable";
    tableGroupedContent.id = "table-content";
    tableGroupedContent.innerHTML = (`
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
        if (maxColumn === 2) {
            if (!incomingFlag) {
                incoming.disabled = true;
            } else if (!dateFlag) {
                date.disabled = true;
            } else if (!typeFlag) {
                type.disabled = true;
            } else if (!outcomingFlag) {
                outcoming.disabled = true;
            }
        }
        let divs = table.getElementsByClassName('rTableCell');
        if (timeFlag === false && maxColumn > 1) {
            for (let i = 1, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "none";
            }
            timeFlag = true;
            maxColumn -= 1;
        } else if (timeFlag === true && maxColumn >= 1) {
            for (let i = 1, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "inline";
            }
            timeFlag = false;
            unBlockOptions();
            if (maxColumn !== 5) {
                maxColumn += 1;
            }
        }
    });
    date.addEventListener('click', function () {
        let divs = table.getElementsByClassName('rTableCell');
        if (dateFlag === false && maxColumn > 1) {
            if (maxColumn === 2) {
                if (!incomingFlag) {
                    incoming.disabled = true;
                } else if (!timeFlag) {
                    time.disabled = true;
                } else if (!typeFlag) {
                    type.disabled = true;
                } else if (!outcomingFlag) {
                    outcoming.disabled = true;
                }
            }
            for (let i = 0, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "none";
            }
            dateFlag = true;
            maxColumn -= 1;
        } else if (dateFlag === true && maxColumn >= 1) {
            for (let i = 0, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "inline";
            }
            unBlockOptions();
            dateFlag = false;
            if (maxColumn !== 5) {
                maxColumn += 1;
            }
        }
    });
    type.addEventListener('click', function () {
        let divs = table.getElementsByClassName('rTableCell');
        if (typeFlag === false && maxColumn > 1) {
            if (maxColumn === 2) {
                if (!incomingFlag) {
                    incoming.disabled = true;
                } else if (!timeFlag) {
                    time.disabled = true;
                } else if (!dateFlag) {
                    date.disabled = true;
                } else if (!outcomingFlag) {
                    outcoming.disabled = true;
                }
            }
            for (let i = 2, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "none";
            }
            typeFlag = true;
            maxColumn -= 1;
        } else if (typeFlag === true && maxColumn >= 1) {
            for (let i = 2, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "inline";
            }
            unBlockOptions();
            typeFlag = false;
            if (maxColumn !== 5) {
                maxColumn += 1;
            }
        }
    });
    outcoming.addEventListener('click', function () {
        let divs = table.getElementsByClassName('rTableCell');
        if (outcomingFlag === false && maxColumn > 1) {
            if (maxColumn === 2) {
                if (!incomingFlag) {
                    incoming.disabled = true;
                } else if (!timeFlag) {
                    time.disabled = true;
                } else if (!dateFlag) {
                    date.disabled = true;
                } else if (!typeFlag) {
                    type.disabled = true;
                }
            }
            for (let i = 4, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "none";
            }
            outcomingFlag = true;
            maxColumn -= 1;
        } else if (outcomingFlag === true && maxColumn >= 1) {
            for (let i = 4, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "inline";
            }
            unBlockOptions();
            outcomingFlag = false;
            if (maxColumn !== 5) {
                maxColumn += 1;
            }
        }
    });
    incoming.addEventListener('click', function () {
        let divs = table.getElementsByClassName('rTableCell');
        if (incomingFlag === false && maxColumn > 1) {
            if (maxColumn === 2) {
                if (!typeFlag) {
                    type.disabled = true;
                } else if (!timeFlag) {
                    time.disabled = true;
                } else if (!dateFlag) {
                    date.disabled = true;
                } else if (!outcomingFlag) {
                    outcoming.disabled = true;
                }
            }
            for (let i = 3, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "none";
            }
            incomingFlag = true;
            maxColumn -= 1;
        } else if (incomingFlag === true && maxColumn >= 1) {
            for (let i = 3, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "inline";
            }
            unBlockOptions();
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
        if (((selectionOpt.options[selectionOpt.selectedIndex].value) === "Date Group") && (toggleFlag === false)) {
            grp = table.firstChild;
            grp.remove();
            table.appendChild(tableGroupedContent);
            blockOptions();
            toggleFlag = true;
        } else if (((selectionOpt.options[selectionOpt.selectedIndex].value) === "Without Grouping") && (toggleFlag === true)) {
            grp = table.firstChild;
            grp.remove();
            table.appendChild(tableContent);
            unBlockOptions();
            toggleFlag = false;
        }
    };
};

