window.onload = function () {
    let table = document.getElementById('table-wrapper');
    let objectTable = [];

    let order = {};
    let orderGroupedByDate = {};

    for (let i = 0, ii = myStatementData.length; i < ii; i += 1) {
        [order.date, order.time] = myStatementData[i].date.split("T");
        order.type = myStatementData[i].type;
        let am = myStatementData[i].amount;
        if (am >= 0) {
            order.incoming = am;
            order.outcoming = 0;
        } else {
            order.outcoming = am;
            order.incoming = 0;
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
        if (objectTable[i].date in orderGroupedByDate) {
            orderGroupedByDate[objectTable[i].date].incoming += objectTable[i].incoming;
            orderGroupedByDate[objectTable[i].date].outComing += objectTable[i].outcoming;
        } else {
            let grpDate = {};
            grpDate.incoming = objectTable[i].incoming;
            grpDate.outcoming = objectTable[i].outcoming;
            orderGroupedByDate[objectTable[i].date] = grpDate;
        }
    }

    let createTable = function () {
        let tableFill = document.createElement("div");
        tableFill.className = "rTable";
        tableFill.id = "table-content";

        let rTableRow = document.createElement("div");
        rTableRow.className = "rTableRow";

        let rTableHeadDate = document.createElement("div");
        let strongDate = document.createElement("strong");
        rTableHeadDate.className = 'rTableHead';
        strongDate.innerText = "Date";
        rTableHeadDate.appendChild(strongDate);

        let rTableHeadTime = document.createElement("div");
        let strongTime = document.createElement("strong");
        rTableHeadTime.className = 'rTableHead';
        strongTime.innerText = "Time";
        rTableHeadTime.appendChild(strongTime);

        let rTableHeadType = document.createElement("div");
        let strongType = document.createElement("strong");
        rTableHeadType.className = 'rTableHead';
        strongType.innerText = "Type";
        rTableHeadType.appendChild(strongType);

        let rTableHeadIncoming = document.createElement("div");
        let strongIncoming = document.createElement("strong");
        rTableHeadIncoming.className = 'rTableHead';
        strongIncoming.innerText = "Incoming";
        rTableHeadIncoming.appendChild(strongIncoming);

        let rTableHeadOutComing = document.createElement("div");
        let strongOutComing = document.createElement("strong");
        rTableHeadOutComing.className = 'rTableHead';
        strongOutComing.innerText = "OutComing";
        rTableHeadOutComing.appendChild(strongOutComing);

        rTableRow.appendChild(rTableHeadDate);
        rTableRow.appendChild(rTableHeadTime);
        rTableRow.appendChild(rTableHeadType);
        rTableRow.appendChild(rTableHeadIncoming);
        rTableRow.appendChild(rTableHeadOutComing);

        tableFill.appendChild(rTableRow);

        return tableFill;
    };

    let makeTableRow = function (date, time, type, incoming, outComing) {

        let rTableRow = document.createElement("div");
        rTableRow.className = "rTableRow";

        let rTableCellDate = document.createElement("div");
        let pDate = document.createElement("p");
        rTableCellDate.className = 'rTableCell';
        pDate.innerText = date || "";
        rTableCellDate.appendChild(pDate);

        let rTableCellTime = document.createElement("div");
        let pTime = document.createElement("p");
        rTableCellTime.className = 'rTableCell';
        pTime.innerText = time || "";
        rTableCellTime.appendChild(pTime);

        let rTableCellType = document.createElement("div");
        let pType = document.createElement("p");
        rTableCellType.className = 'rTableCell';
        pType.innerText = type || "";
        rTableCellType.appendChild(pType);

        let rTableCellIncoming = document.createElement("div");
        let pIncoming = document.createElement("p");
        rTableCellIncoming.className = 'rTableCell';
        pIncoming.innerText = incoming || "";
        rTableCellIncoming.appendChild(pIncoming);

        let rTableCellOutComing = document.createElement("div");
        let pOutComing = document.createElement("p");
        rTableCellOutComing.className = 'rTableCell';
        pOutComing.innerText = outComing || "";
        rTableCellOutComing.appendChild(pOutComing);

        rTableRow.appendChild(rTableCellDate);
        rTableRow.appendChild(rTableCellTime);
        rTableRow.appendChild(rTableCellType);
        rTableRow.appendChild(rTableCellIncoming);
        rTableRow.appendChild(rTableCellOutComing);

        return rTableRow;
    };

    let tableHead = createTable();
    let tableHeadGrouped = createTable();

    let tableContent = objectTable.map(
        item => makeTableRow(
            item.date, item.time, item.type, item.incoming, item.outcoming)
    );

    tableContent.forEach(function (item) {
        tableHead.appendChild(item)
    });

    let groupedByDateTableHTML = Object.keys(orderGroupedByDate).map(
        key => makeTableRow(
            key, undefined, undefined, orderGroupedByDate[key].incoming, orderGroupedByDate[key].outcoming)
    );

    groupedByDateTableHTML.forEach( function (item) {
        tableHeadGrouped.appendChild(item);
    });

    table.appendChild(tableHead);

    let time = document.getElementById("Time");
    let date = document.getElementById("Date");
    let type = document.getElementById("Type");
    let incoming = document.getElementById("Incoming");
    let outComing = document.getElementById("Outcoming");
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
        outComing.disabled = toggle;
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
            } else if (!outcomingFlag && checkbox !== outComing) {
                outComing.disabled = true;
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
    outComing.addEventListener('click', function () {
        toggleOneOption(outComing);
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
            toggleSelection(tableHeadGrouped, true);
            tableWrapper.scrollTo(0, posGroupTableY);
        } else if ((selectionOpt.options[selectionOpt.selectedIndex].value) === "Without Grouping") {
            posGroupTableY = tableWrapper.scrollTop;
            toggleSelection(tableHead, false);
            tableWrapper.scrollTo(0, posTableY);
        }
    }
};
