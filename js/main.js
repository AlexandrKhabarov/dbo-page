window.onload = function () {
    let table = document.getElementById('table-wrapper');
    let objectTable = [];

    let order = {};
    let orderGroupedByDate = {};

    for (let i = 0, ii = myStatementData.length; i < ii; i += 1) {
        [order["date"], order["time"]] = myStatementData[i].date.split("T");
        order["type"] = myStatementData[i].type;
        let am = myStatementData[i].amount;
        if (am >= 0) {
            order["incoming"] = am;
            order["outcoming"] = 0;
        } else {
            order["outcoming"] = am;
            order["incoming"] = 0;
        }
        objectTable.push(order);
        order = {};
    }

    objectTable.sort(function (a, b) {
        if (a.date === b.date)
            return a.time >= b.time;
        return a.date > b.date;
    });

    for (let i = 0, ii = objectTable.length; i < ii; i += 1) {
        if (objectTable[i]['date'] in orderGroupedByDate) {
            orderGroupedByDate[objectTable[i]['date']]['incoming'] += objectTable[i]['incoming'];
            orderGroupedByDate[objectTable[i]['date']]['outcoming'] += objectTable[i]['outcoming'];
        } else {
            let grpDate = {};
            grpDate['incoming'] = objectTable[i]['incoming'];
            grpDate['outcoming'] = objectTable[i]['outcoming'];
            orderGroupedByDate[objectTable[i]['date']] = grpDate;
        }
    }

    let createTable = function (content) {
        let tableFill = document.createElement("div");
        tableFill.className = "rTable";
        tableFill.id = "table-content";
        tableFill.innerHTML = (`
            <div class="rTableRow">\n
            <div class="rTableHead"><strong>Date</strong></div>\n
            <div class="rTableHead"><strong>Time</strong></div>\n
            <div class="rTableHead"><strong>Type</strong></div>\n
            <div class="rTableHead"><strong>Incoming</strong></div>\n
            <div class="rTableHead"><strong>Outcoming</strong></div>\n
            </div>\n` + content
        );
        return tableFill;
    };

    var makeTableRow = function (date, time, type, incoming, outcoming) {
        return `<div class="rTableRow">\n
        <div class="rTableCell"><p>${date || ""}</p></div>\n
        <div class="rTableCell"><p>${time || ""}</p></div>\n
        <div class="rTableCell"><p>${type || ""}</p></div>\n
        <div class="rTableCell"><p>${incoming || ""}</p></div>\n
        <div class="rTableCell"><p>${outcoming || ""}</p></div>\n
        </div>`;
    }

    let tableHTML = "";
    let groupedByDateTableHTML = "";

    for (let i = 0, ii = objectTable.length; i < ii; i += 1) {
        tableHTML += makeTableRow(
            objectTable[i].date,
            objectTable[i].time,
            objectTable[i].type,
            objectTable[i].incoming,
            objectTable[i].outcoming
        );
    }

    for (let orderDate in orderGroupedByDate) {
        groupedByDateTableHTML += makeTableRow(
            orderDate,
            undefined,
            undefined,
            orderGroupedByDate[orderDate].incoming,
            orderGroupedByDate[orderDate].outcoming
        );
    }

    let tableContent = createTable(tableHTML);
    table.appendChild(tableContent);
    let tableGroupedContent = createTable(groupedByDateTableHTML);

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
    let maxColumn = 5;

    let toggleAllOptions = function (toggle) {
        date.disabled = toggle;
        time.disabled = toggle;
        incoming.disabled = toggle;
        outcoming.disabled = toggle;
        type.disabled = toggle;
    };

    let toggleOneOption = function (checkbox) {
        if (maxColumn === 2) {
            if (!incomingFlag && checkbox !== incoming) {
                incoming.disabled = true;
            } else if (!dateFlag && checkbox !== date) {
                date.disabled = true;
            } else if (!typeFlag && checkbox !== type) {
                type.disabled = true;
            } else if (!outcomingFlag && checkbox !== outcoming) {
                outcoming.disabled = true;
            } else if (!timeFlag && checkbox !== time) {
                time.disabled = true;
            }
        }
    };

    let displayColumn = function (divs, num, flag) {
        if (flag === false && maxColumn > 1) {
            for (let i = num, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "none";
            }
            flag = true;
            maxColumn -= 1;
        } else if (flag === true && maxColumn >= 1) {
            for (let i = num, ii = divs.length; i < ii; i += 5) {
                divs[i].firstChild.style.display = "inline";
            }
            flag = false;
            toggleAllOptions(false);
            if (maxColumn !== 5) {
                maxColumn += 1;
            }
        }
        return flag
    };

    let divs = table.getElementsByClassName("rTableCell");

    time.addEventListener('click', function () {
        toggleOneOption(time);
        timeFlag = displayColumn(divs, 1, timeFlag);
    });
    date.addEventListener('click', function () {
        toggleOneOption(date);
        dateFlag = displayColumn(divs, 0, dateFlag);
    });
    type.addEventListener('click', function () {
        toggleOneOption(type);
        typeFlag = displayColumn(divs, 2, typeFlag);

    });
    outcoming.addEventListener('click', function () {
        toggleOneOption(outcoming);
        outcomingFlag = displayColumn(divs, 4, outcomingFlag);
    });
    incoming.addEventListener('click', function () {
        toggleOneOption(incoming);
        incomingFlag = displayColumn(divs, 3, incomingFlag);
    });


    let grp = table.firstChild;
    grp.remove();
    let tableWrapper = document.getElementById("table-wrapper");

    let toggleSelection = function (tableData, flag) {
        grp = table.firstChild;
        grp.remove();
        table.appendChild(tableData);
        toggleAllOptions(flag);
    };

    let posGroupTableY = 0,
        posTableY = 0;

    selectionOpt.onchange = function () {
        let selectionOpt = document.getElementById("selectionOpt");
        if ((selectionOpt.options[selectionOpt.selectedIndex].value) === "Date Group") {
            posTableY = tableWrapper.scrollTop;
            toggleSelection(tableGroupedContent, true);
            tableWrapper.scrollTo(0, posGroupTableY);
        } else if ((selectionOpt.options[selectionOpt.selectedIndex].value) === "Without Grouping") {
            posGroupTableY = tableWrapper.scrollTop;
            toggleSelection(tableContent, false);
            tableWrapper.scrollTo(0, posTableY);
        }
    }
};

