const ENV_api_host = "http://127.0.0.1:5000/data/render";
// const ENV_api_host = "https://api-two-neon.vercel.app/data/render";

$('#loading').hide();

function exportToJsonFile(jsonData, fileName) {
  let dataStr = JSON.stringify(jsonData, null,4);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  let exportFileDefaultName = `${fileName}.json`;

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

function parseJSONToCSVStr(jsonData) {
  if (jsonData.length == 0) {
    return "";
  }
  let keys = Object.keys(jsonData[0]);
  let columnDelimiter = ",";
  let lineDelimiter = "\n";

  let csvColumnHeader = keys.join(columnDelimiter);
  let csvStr = csvColumnHeader + lineDelimiter;

  jsonData.forEach((item) => {
    keys.forEach((key, index) => {
      if (index > 0 && index <= keys.length - 1) {
        csvStr += columnDelimiter;
      }
      csvStr += item[key];
    });
    csvStr += lineDelimiter;
  });

  return encodeURIComponent(csvStr);
}

function exportToSqlFile(data, fileName) {
  data = data.replaceAll("'[", "[").replaceAll("]'", "]");
  data = data.replaceAll("'{", "{").replaceAll("}'", "}");
  data = data.replaceAll(";", ";\n")
  let dataUri = "data:application/octet-stream;base64,"+ btoa(data)
  let exportFileDefaultName = `${fileName}.sql`;
  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

function exportToCsvFile(jsonData, fileName) {
  let csvStr = parseJSONToCSVStr(jsonData);
  let dataUri = "data:text/csv;charset=utf-8," + csvStr;

  let exportFileDefaultName = `${fileName}.csv`;

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

function exportToExcelFile(jsonData, fileName) {
  jsonData = JSON.parse(jsonData)
  var ws = XLSX.utils.json_to_sheet(jsonData);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb,`${fileName}.xlsx`)
}





formatXml = function (xml) {
  var formatted = '';
  var reg = /(>)(<)(\/*)/g;
  xml = xml.replace(reg, '$1\r\n$2$3');
  var pad = 0;
  jQuery.each(xml.split('\r\n'), function(index, node) {
      var indent = 0;
      if (node.match( /.+<\/\w[^>]*>$/ )) {
          indent = 0;
      } else if (node.match( /^<\/\w/ )) {
          if (pad != 0) {
              pad -= 1;
          }
      } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
          indent = 1;
      } else {
          indent = 0;
      }

      var padding = '';
      for (var i = 0; i < pad; i++) {
          padding += '  ';
      }

      formatted += padding + node + '\r\n';
      pad += indent;
  });

  return formatted;
}



function exportToXMLFile(jsonData, fileName) { 
  var InputJSON = `{"body":{"entry":`  + jsonData + `}}`;
  var output = eval("OBJtoXML("+InputJSON+");")
  xmlStr= `<?xml version='1.0' encoding='UTF-8'?>\n`+formatXml(output)
  
  let dataUri = "data:text/xml;base64," +btoa(xmlStr);
  let exportFileDefaultName = `${fileName}.xml`;

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
 }


function generate() {
 
  var t0 = performance.now();
  
  
  let fileName = $("#file_name").val();
  let typeFile = $("#format").val();
  var data_1 = $("#main-form").serialize().replaceAll("'","_").replaceAll("%22","_")
  console.log(data_1);

  $('#loading').show();
  
  $.ajax({
    type: "POST",
    url: ENV_api_host,
    data: {
      dataForm: data_1,
    },
    success: function (data) {
      var string = data;
      var index = 0;

      while (string.includes("{numberrow}")) {
        string = string.replace("{numberrow}", index + 1);
        index++;
      }
      data = string;
      switch (typeFile) {
        case "JSON":
          var jsonStr = data;
          var jsonObj = JSON.parse(jsonStr);
          var jsonPretty = JSON.stringify(jsonObj, null, "\t");
          jsonData = JSON.parse(jsonPretty);

          exportToJsonFile(jsonData, fileName);

          break;

        case "CSV":
      
          if(checkDataType() != false){
            var jsonStr = data;
            var jsonObj = JSON.parse(jsonStr);
            var jsonPretty = JSON.stringify(jsonObj, null, "\t");
            jsonData = JSON.parse(jsonPretty);
            exportToCsvFile(jsonData, fileName);
          }
          break;

        case "EXCEL":
          var jsonStr = data;
          var jsonObj = JSON.parse(jsonStr);
          if(checkDataType() != false){
            exportToExcelFile(data, fileName)
          }
          break;

        case "SQL":
          if(checkDataType() != false){
            exportToSqlFile(data, fileName);
          }
          
          break;

        case "XML":
          exportToXMLFile(data,fileName)
          break; 
          
        default:
          break;
      }
    $('#loading').hide();
    var t1 = performance.now();
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    },
    error: function (e) {
      alert("Opp! Đã có lỗi xảy ra !");

    $('#loading').hide();

    },
    
  });
  
}
function preview() {
  let typeFile = $("#format").val();
  var data_1 = $("#main-form").serialize().replaceAll("'","_").replaceAll("%22","_")
  console.log(data_1);
  $('#loading').show();
  $.ajax({
    type: "POST",
    url: ENV_api_host,
    data: { 
      dataForm: data_1,
    },
    success: function (data) {
      var string = data;
      
      switch (typeFile) {
        case "JSON":
          var index = 0;

          while (string.includes("{numberrow}")) {
            string = string.replace("{numberrow}", index + 1);
            index++;
          }
    
          data = JSON.parse(string);
          
          $("#preview-box").text(JSON.stringify(data,null,4));
          
          break;
      
        case "CSV":
          if(checkDataType() != false){
              let index = 0;
              while (data.includes("{numberrow}")) {
                data = data.replace("{numberrow}", index + 1);
                index++;
              }
              console.log(data);
              data = JSON.parse(data);
              // Header
              let thead ="";
              keyArray = Object.keys(data[0])
              
              keyArray.forEach(element => {
                thead = thead + `<td>${element}</td>`
              });

              // Body
              let tbody = ""
              for (let i = 0; i < data.length; i++) {
                
                valueArray = Object.values(data[i]);
                let trow = ""
                valueArray.forEach(element => {
                  trow = trow + `<td>${element}\t</td>`
                });
                tbody = tbody +  `<tr>${trow}</tr>`
              }
              

              
              
                $("#preview-box").replaceWith(
                  `
                    <div id = "preview-box">
                    
                      <table id="csv-table">
                          <thead>
                            ${thead}
                          </thead>
                          <tbody>
                              ${tbody}
                          </tbody>
                      </table>
                      
                    </div>
                  `
                );
          }else{
            removePreviewBox(); 
          }
          break;

        case "EXCEL":
          if(checkDataType() != false){
              let index = 0;
              while (data.includes("{numberrow}")) {
                data = data.replace("{numberrow}", index + 1);
                index++;
              }
              console.log(data);
              data = JSON.parse(data);
              // Header
              let thead ="";
              keyArray = Object.keys(data[0])
              
              keyArray.forEach(element => {
                thead = thead + `<td>${element}</td>`
              });

              // Body
              let tbody = ""
              for (let i = 0; i < data.length; i++) {
                
                valueArray = Object.values(data[i]);
                let trow = ""
                valueArray.forEach(element => {
                  trow = trow + `<td>${element}\t</td>`
                });
                tbody = tbody +  `<tr>${trow}</tr>`
              }
              

              
              
                $("#preview-box").replaceWith(
                  `
                    <div id = "preview-box">
                    
                      <table id="csv-table">
                          <thead>
                            ${thead}
                          </thead>
                          <tbody>
                              ${tbody}
                          </tbody>
                      </table>
                      
                    </div>
                  `
                );
          }else{
            removePreviewBox(); 
          }
          break;

        case "SQL":
          if(checkDataType() != false){
            let index = 0;
            while (data.includes("{numberrow}")) {
              data = data.replace("{numberrow}", index + 1);
              index++;
            }
            data = data.replaceAll("'[", "[").replaceAll("]'", "]");
            data = data.replaceAll("'{", "{").replaceAll("}'", "}");
            data = data.replaceAll(";", ";\n\n");

            $("#preview-box").append(data)
          }else{
            removePreviewBox();
          }
          

          break;
          
        case "XML":
          let xml_index = 0;
          while (data.includes("{numberrow}")) {
            data = data.replace("{numberrow}", xml_index + 1);
            xml_index++;
          }
          let InputJSON = `{"body":{"entry":`  + data + `}}`;
          let output = eval("OBJtoXML("+InputJSON+");")
          let xmlStr = `<?xml version='1.0' encoding='UTF-8'?>\n`+ formatXml(output)
          $("#preview-box").text(xmlStr)
          break;

        default:
          break;
      }
    $('#loading').hide();

    },
    error: function (e) {
      alert("Opp! Đã có lỗi xảy ra !");
      $('#loading').hide();
      removePreviewBox();

    },
  });
}


function checkDuplicateKey() {
  var list = document.getElementsByClassName("key");
  var listArray = [];
  for (var i = 0; i < list.length; i++) {
    listArray.push($(list[i]).val());
  }
  const toFindDuplicates = (listArray) =>
    listArray.filter((item, index) => listArray.indexOf(item) !== index);
  const duplicateElementa = toFindDuplicates(listArray);

  if (duplicateElementa.length > 0) {
    alert("Key bị trùng !!!");
    return false;
  }
  return true;
}

function checkNumberOfRow() {
    let num = $("#number_of_row").val();
    if (num > 100000) {
      if(confirm(`Because of the large amount of data, the waiting time is long!\nDo you want to generate ${num} row`) == true){
        return true;
      }else{
        return false;
      }
    }
    if (num < 0) {
      alert("Vui lòng nhập giá trị dương cho number of row");
      $("#number").css("border", "2px solid red");
      $("#number_of_row").val(1000);
      $("#number").val(1000);
      return false;
    }

    if (num == '') {
      alert("Vui lòng nhập giá trị cho number of row");
      $("#number").css("border", "2px solid red");
      $("#number_of_row").val(1000);
      $("#number").val(1000);
      return false;
    }
    return true;
}

$("#download").click(function () {
  if(checkFieldAble()){
    if (checkKeyValueNull()) {
      if (checkDuplicateKey() && checkNumberOfRow()) {
        if(checkArrayNumberNull()){
          generate();
        }
      }
    }
  }
  
  
  
});

$("#preview").click(function () {
  if(checkFieldAble()){
    if (checkKeyValueNull()) {
      if (checkDuplicateKey() && checkNumberOfRow()) {
        if(checkArrayNumberNull()){
          preview();
         appendReviewForm();
        }
        
      }
    }
  }
  

  
});

function appendReviewForm() {
  $(".container").append(
    `
    <div id="preview-box-zone" >
        <div id="preview-button-option">
          <button id="close_preview" onclick="removePreviewBox()" style="float: right">Close preview</button>
          <button id="copy_preview" onclick="copyData()" style="float: right">Copy data</button>
        </div>
        <div id="preview-content">
          <textarea disabled cols=10000 id="preview-box"></textarea>
        </div>
    </div>
        `
  );
}

function copyData() {
  var copyText = document.getElementById("preview-box");
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  navigator.clipboard.writeText(copyText.value);

  alert("Copied the text");
}



function removePreviewBox() {
  $("#preview-box-zone").remove();
}


function checkDataType() { 
  var list = document.getElementsByClassName("data_type");
  var listArray = [];
  for (var i = 0; i < list.length; i++) {
    listArray.push($(list[i]).val());
  }
  if(listArray.includes('array')){
    alert("Định dạng file CSV, SQL chỉ hỗ trợ định dạnh Normal Value");
    return false;
  }
  if(listArray.includes('object')){
    alert("Định dạng file CSV, SQL chỉ hỗ trợ định dạnh Normal Value");
    return false;
  }
  if(listArray.includes('arrobj')){
    alert("Định dạng file CSV, SQL chỉ hỗ trợ định dạnh Normal Value");
    return false;
  }
  return true;
}


function checkArrayNumberNull(){
  var list = document.getElementsByClassName("arraynumber");
  var listArray = [];
  for (var i = 0; i < list.length; i++) {
    listArray.push($(list[i]).val());
  }

  if(listArray.includes("")){
    alert("Số lượng phần tử của mảng không được để trống !!");
    return false;
  }
  return true;
}

function checkKeyValueNull(){
  var list = document.getElementsByClassName("key");
  var listArray = [];
  for (var i = 0; i < list.length; i++) {
    listArray.push($(list[i]).val());
  }

  if(listArray.includes("")){
    alert("Key không được trống !");
    return false;
  }
  return true;
}


function checkFieldAble(){
  var list = document.getElementsByClassName("key");
  if(list.length == 0){
    alert("Không có trường dữ liệu !!!\nVui lòng tạo trường dữ liệu để tạo data");
    return false;
  }
  return true
}





function OBJtoXML(obj) {
    var xml = '';
    for (var prop in obj) {
      xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
      if (obj[prop] instanceof Array) {
        for (var array in obj[prop]) {
          xml += "<" + prop + ">";
          xml += OBJtoXML(new Object(obj[prop][array]));
          xml += "</" + prop + ">";
        }
      } else if (typeof obj[prop] == "object") {
        xml += OBJtoXML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    xml = xml.replaceAll('&', '');
  return xml
}