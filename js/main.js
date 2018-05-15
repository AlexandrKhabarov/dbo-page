window.onload = function () {

    let table = document.getElementById('table-wrapper');

    let objectTable = [];
    let orderGroupedByDate = {};

    myStatementData.map(item => {

            let order = {};

            [order.date, order.time] = item.date.split("T");

            order.type = item.type;

            let am = item.amount;

            order.incoming = am >= 0 ? am : 0;
            order.outcoming = am < 0 ? am : 0;

            return order;
        }
    ).forEach(function (item) {
        objectTable.push(item)
    });

    objectTable.sort(function (a, b) {
        if (a.date === b.date)
            return a.time >= b.time;
        return a.date > b.date;
    });

    objectTable.forEach(function (item) {
        if (item.date in orderGroupedByDate) {
            orderGroupedByDate[item.date].incoming += item.incoming;
            orderGroupedByDate[item.date].outComing += item.outcoming;
        } else {
            let grpDate = {};
            grpDate.incoming = item.incoming;
            grpDate.outcoming = item.outcoming;
            orderGroupedByDate[item.date] = grpDate;
        }
    });

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

        let rTableHeading = document.createElement("div");
        rTableHeading.className = "rTableHeading";

        rTableHeading.appendChild(rTableRow);

        tableFill.appendChild(rTableHeading);

        let rTableBody = document.createElement("div");
        rTableBody.className = "rTableBody";
        tableFill.appendChild(rTableBody);

        return tableFill;
    };

    let makeTableRow = function (date, time, type, incoming, outComing) {

        let rTableRow = document.createElement("div");
        rTableRow.className = "rTableRow";

        let rTableCellDate = document.createElement("div");
        let pDate = document.createElement("p");
        rTableCellDate.className = 'rTableCell';
        pDate.innerText = (date !== "") ? new Date(date).toLocaleDateString('ru-RU').replace(/\//g, '.') : "";
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
        rTableCellIncoming.className = 'rTableCell incoming';
        pIncoming.innerText = (incoming.toLocaleString('ru-RU') !== "0") ? incoming.toLocaleString('ru-RU') + "₽" : "";
        rTableCellIncoming.appendChild(pIncoming);

        let rTableCellOutComing = document.createElement("div");
        let pOutComing = document.createElement("p");
        rTableCellOutComing.className = 'rTableCell outComing';
        pOutComing.innerText = (outComing.toLocaleString('ru-RU') !== "0") ? outComing.toLocaleString('ru-RU') + "₽" : "";
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

    let tableBody = tableHead.lastChild;
    let tableGroupBody = tableHeadGrouped.lastChild;

    let tableContent = objectTable.map(
        item => makeTableRow(
            item.date, item.time, item.type, item.incoming, item.outcoming)
    );

    tableContent.forEach(function (item) {
        tableBody.appendChild(item);
    });

    let groupedByDateTableHTML = Object.keys(orderGroupedByDate).map(
        key => makeTableRow(
            key, undefined, undefined, orderGroupedByDate[key].incoming, orderGroupedByDate[key].outcoming)
    );

    groupedByDateTableHTML.forEach(function (item) {
        tableGroupBody.appendChild(item);
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
    let outComingFlag = false;
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
            } else if (!outComingFlag && checkbox !== outComing) {
                outComing.disabled = true;
            } else if (!timeFlag && checkbox !== time) {
                time.disabled = true;
            }
        }
    };

    let displayColumn = function (cellDivs, headDivs, num, flag) {
        if (flag === false && maxColumn > 1) {
            headDivs[num].style.display = "none";
            for (let i = num, ii = cellDivs.length; i < ii; i += 5) {
                cellDivs[i].style.display = "none";
            }
            flag = true;
            maxColumn -= 1;
        } else if (flag === true && maxColumn >= 1) {
            headDivs[num].style.display = "inline";
            for (let i = num, ii = cellDivs.length; i < ii; i += 5) {
                cellDivs[i].style.display = "inline";
            }
            flag = false;
            toggleAllOptions(false);
            if (maxColumn !== 5) {
                maxColumn += 1;
            }
        }
        return flag
    };

    let tableDivCell = table.getElementsByClassName("rTableCell");
    let tableDivHead = table.getElementsByClassName("rTableHead");

    time.addEventListener('click', function () {
        toggleOneOption(time);
        timeFlag = displayColumn(tableDivCell, tableDivHead, 1, timeFlag);
    });
    date.addEventListener('click', function () {
        toggleOneOption(date);
        dateFlag = displayColumn(tableDivCell, tableDivHead, 0, dateFlag);
    });
    type.addEventListener('click', function () {
        toggleOneOption(type);
        typeFlag = displayColumn(tableDivCell, tableDivHead, 2, typeFlag);

    });
    outComing.addEventListener('click', function () {
        toggleOneOption(outComing);
        outComingFlag = displayColumn(tableDivCell, tableDivHead, 4, outComingFlag);
    });
    incoming.addEventListener('click', function () {
        toggleOneOption(incoming);
        incomingFlag = displayColumn(tableDivCell, tableDivHead, 3, incomingFlag);
    });


    let grp = table.firstChild;
    grp.remove();
    let rTableBody = document.getElementsByClassName("rTableBody")[0];

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
            posTableY = rTableBody.scrollTop;
            console.log(posTableY);
            toggleSelection(tableHeadGrouped, true);
            rTableBody.scrollTo(0, posGroupTableY);
        } else if ((selectionOpt.options[selectionOpt.selectedIndex].value) === "Without Grouping") {
            posGroupTableY = rTableBody.scrollTop;
            console.log(posGroupTableY);
            toggleSelection(tableHead, false);
            rTableBody.scrollTo(0, posTableY);
        }
    }
};
