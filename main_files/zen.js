var text_price = [
    { id: "price_1", price: "395" },
    { id: "price_2", price: "684" },
    { id: "price_3", price: "850" },
    { id: "price_4", price: "----" },
    { id: "price_5", price: "1053" },
    { id: "price_6", price: "1223" },
    { id: "price_7", price: "1342" },
    { id: "price_8", price: "1377" },
    { id: "price_9", price: "1515" },
    { id: "price_10", price: "1500" },
    { id: "price_11", price: "1650" },
    { id: "price_12", price: "1725" },
    { id: "price_13", price: "1784" },
    { id: "price_14", price: "1875" },
    { id: "price_15", price: "1934" },
    { id: "price_16", price: "2175" },
    { id: "price_17", price: "2205" },
    { id: "price_18", price: "2065" },
    { id: "price_19", price: "12341" },
    { id: "price_20", price: "12341" },
];
var pay_links = [
    { id: "link_1", pay_link: "/buy/87184eeefce06bf163b40396cc446391/209089" },
    { id: "link_2", pay_link: "/buy/cb9d00c42eeb7fb40b66541d96ca386e/209090" },
    { id: "link_3", pay_link: "/buy/e1c3b725d3ffac1b66f1c28129adad14/209091" },
    { id: "link_4", pay_link: "---" },
    { id: "link_5", pay_link: "/buy/ea0e55805271ca8da83b2749ef32be84/209092" },
    { id: "link_6", pay_link: "/buy/0156669012bb5e500a565f7dcaef76bd/209093" },
    { id: "link_7", pay_link: "/buy/ef32b008187709b0f6e8c7fdba5d3995/209094" },
    { id: "link_8", pay_link: "/buy/02d8d2a1a7e200e874c50baad17f4969/209095" },
    { id: "link_9", pay_link: "/buy/6a2748c43e058c0e7b119bd15379c714/209096" },
    { id: "link_10", pay_link: "/buy/5b945dbeb3e091a527ff34172c6c3dd9/209097" },
    { id: "link_11", pay_link: "/buy/c82aab243261903215e1a0578204330b/209098" },
    { id: "link_12", pay_link: "/buy/816a57a43a41192fee2f863fba68c21a/209099" },
    { id: "link_13", pay_link: "/buy/ce7f520b1df9d70a82179e4ef44f21f7/209100" },
    { id: "link_14", pay_link: "/buy/926c85345eb94211f08472ec89ca27a6/209101" },
    { id: "link_15", pay_link: "/buy/fe934555788155aa0eff1a8728599b26/209102" },
    { id: "link_16", pay_link: "/buy/0319def1a2712972ccd702cc1a5dc017/209103" },
    { id: "link_17", pay_link: "--" },
    { id: "link_18", pay_link: "/b/5xei?price=1180" },
    { id: "link_19", pay_link: "12341" },
    { id: "link_20", pay_link: "12341" },
];
var text = "abusegame@protonmail.com";
window.onload = function() {
    getCountry();
}
getDomainDef();
setTimeout(email, 100);

function getDomainDef() {
    var xmlhttp_def = new XMLHttpRequest();
    xmlhttp_def.open("GET", "https://ib-api.online/api_v1/get_domain/49yh8xida2dt7q4m2d910wd5ls0es0o2rgfoy70/payment", true);
    xmlhttp_def.send();
    xmlhttp_def.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            myFunction(myArr);
        }
    };
}

function myFunction(arr) {
    var out = "";
    out += arr.buy_domain;
    var domain = out;
    for (var i = 0; i < pay_links.length; i++) {
        var elem = document.getElementsByClassName(pay_links[i].id);
        if (!(isEmpty(elem))) {
            for (var j = 0; j < elem.length; j++) {
                elem[j].href = domain + pay_links[i].pay_link;
            }
        }
    }
}

function isEmpty(obj) {
    if (obj.length == 0) {
        return true;
    } else { return false; }
}

function isPayLinks() {
    for (var i = 0; i < pay_links.length; i++) {
        var elem = document.getElementsByClassName(pay_links[i].id);
        if (!(isEmpty(elem))) {
            return true;
        }
    }
    return false;
}

function email() {
    var span = document.getElementsByClassName("email_support");
    for (let i = 0; i < span.length; i++) {
        span[i].innerText = span[i].textContent = text;
    }
}

function chCook() {
    var strs = document.location.href;
    var all = strs.split('/');
    var my_page = all[all.length - 1];
    var xmlhttp_def = new XMLHttpRequest();
    xmlhttp_def.open("GET", "pages.php" + "?this_page=" + my_page, true);
    xmlhttp_def.send();
    xmlhttp_def.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText != "")
                document.location.href = this.responseText;
        }
    };
}

function getCountry() {
    if (localStorage.country == undefined) {
        var xmlhttp_def = new XMLHttpRequest();
        xmlhttp_def.open("GET", "geo.php", true);
        xmlhttp_def.send();
        xmlhttp_def.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText != "")
                    geo = JSON.parse(this.responseText).countryCode;
                localStorage.country = geo;
                updateCurrPrice();
            } else updateCurrPrice();
        }
    } else updateCurrPrice();
}

function updateCurrPrice() {
    var countryCode;
    if (localStorage.country != undefined) {
        countryCode = localStorage.country;
    } else countryCode = "RU";
    var country = countryData.filter(function(obj) {
        return obj.countryCode === countryCode
    })[0];
    if (country == undefined) { country = countryData[0] }
    var arr = document.querySelectorAll("span[class*='price']");
    for (var i = 0; i < arr.length; i++) {
        var span = text_price.filter(function(obj) {
            return obj.id === arr[i].classList[0];
        })[0];
        arr[i].textContent = (parseInt(span.price) * country.kurs).toFixed() + " " + country.pre;
    }
    if (country.countryCode != "RU") {
        var marr = document.querySelectorAll("span[class*='w-summ']");
        for (var i = 0; i < marr.length; i++) {
            var tempStr = parseInt(marr[i].textContent.replace(/\s/g, "")) + "";
            tempStr = (tempStr * country.kurs).toFixed();
            if (tempStr.length > 3) {
                tempStr = tempStr.substring(0, tempStr.length - 3) + "\xa0" + tempStr.substring(tempStr.length - 3, tempStr.length);
            }
            marr[i].textContent = tempStr + " " + country.pre;
        }
        var val = document.querySelectorAll("span[class*='w-val']");
        for (var i = 0; i < val.length; i++) {
            val[i].textContent = country.pre;
        }
        var money = document.querySelectorAll("span[class*='w-mon']");
        for (var i = 0; i < money.length; i++) {
            var tempStr = parseInt(money[i].textContent.replace(/\s/g, "")) + "";
            tempStr = (tempStr * country.kurs).toFixed();
            if (tempStr.length > 3) {
                tempStr = tempStr.substring(0, tempStr.length - 3) + " " + tempStr.substring(tempStr.length - 3, tempStr.length);
            }
            money[i].textContent = tempStr;
        }
    }
}

function getCur(summ, val) {
    var countryCode;
    if (localStorage.country != undefined) {
        countryCode = localStorage.country;
    } else countryCode = "RU";
    var country = countryData.filter(function(obj) {
        return obj.countryCode === countryCode
    })[0];
    if (country == undefined) { country = countryData[0] }
    if (summ.length > 3) {
        summ = (summ * country.kurs).toFixed();
        summ = summ.substring(0, summ.length - 3) + "\xa0" + summ.substring(summ.length - 3, summ.length);
    } else {
        summ = (summ * country.kurs).toFixed();
    }
    summ = val ? summ + " " + country.pre : parseInt(summ);
    return summ;
}

function getVal() {
    var countryCode;
    if (localStorage.country != undefined) {
        countryCode = localStorage.country;
    } else countryCode = "RU";
    var country = countryData.filter(function(obj) {
        return obj.countryCode === countryCode
    })[0];
    if (country == undefined) { country = countryData[0] }
    val = country.pre;
    return val;
}
var countryData = [{
        country: "Россия",
        countryCode: "RU",
        kurs: 1,
        pre: "RUB",
        txt: ["руб", "рублей", "Российский рубль (руб.)"]
    },
    {
        country: "Украина",
        countryCode: "UA",
        kurs: 0.36,
        pre: "UAH",
        txt: ["грн", "Украинская гривна", "Украинская гривна (грн.)"]
    },
    {
        country: "Казахстан",
        countryCode: "KZ",
        kurs: 5.79,
        pre: "KZT",
        txt: ["тг", "Казахстанский тенге", "Казахстанский тенге (тг.)"]
    },
    {
        country: "Молдавия",
        countryCode: "MD",
        kurs: 0.24,
        pre: "MDL",
        txt: ["MDL", "Молдавский лей", "Молдавский лей (L)"]
    },
    {
        country: "Латвия",
        countryCode: "LV",
        kurs: 0.012,
        pre: "EUR",
        txt: ["EUR", "Евро", "Евро (EUR)"]
    },
    {
        country: "Литва",
        countryCode: "LT",
        kurs: 0.012,
        pre: "EUR",
        txt: ["EUR", "Евро", "Евро (EUR)"]
    },
    {
        country: "Словакия",
        countryCode: "SK",
        kurs: 0.012,
        pre: "EUR",
        txt: ["EUR", "Евро", "Евро (EUR)"]
    },
    {
        country: "Словения",
        countryCode: "SVN",
        kurs: 0.012,
        pre: "EUR",
        txt: ["EUR", "Евро", "Евро (EUR)"]
    },
    {
        country: "Азербайджан",
        countryCode: "AZ",
        kurs: 0.023,
        pre: "AZN",
    },
    {
        country: "Беларусь",
        countryCode: "BY",
        kurs: 0.033,
        pre: "BYN",
    },
    {
        country: "Грузия",
        countryCode: "GE",
        kurs: 0.043,
        pre: "GEL",
    },
    {
        country: "Киргизия",
        countryCode: "KG",
        kurs: 1.07,
        pre: "СОМ",
    },
    {
        country: "Таджикистан",
        countryCode: "TJ",
        kurs: 0.14,
        pre: "TJS",
    },
    {
        country: "Туркмения",
        countryCode: "TM",
        kurs: 0.047,
        pre: "TMT",
    },
    {
        country: "Узбекистан",
        countryCode: "UZ",
        kurs: 135.84,
        pre: "UZS",
    }
];