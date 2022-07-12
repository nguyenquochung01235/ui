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

function generate() {
 
  var t0 = performance.now();
  
  
  let fileName = $("#file_name").val();
  let typeFile = $("#format").val();
  var data_1 = $("#main-form").serialize().replaceAll("'","_").replaceAll("%22","_")
  console.log(data_1);

  $('#loading').show();
  
  $.ajax({
    type: "POST",
    url: "https://api-two-neon.vercel.app/data/render",
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

        case "SQL":
          if(checkDataType() != false){
            exportToSqlFile(data, fileName);
          }
          
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
    url: "https://api-two-neon.vercel.app/data/render",
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
                    
                      <table>
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
            // let csvStringReview = decodeURIComponent(parseJSONToCSVStr(JSON.parse(string))).replaceAll(",", "\t\t")
            // $("#preview-box").val(csvStringReview);
          }else{
            removePreviewBox();
          }
          break;

        case "SQL":
          if(checkDataType() != false){
            data = data.replaceAll("'[", "[").replaceAll("]'", "]");
            data = data.replaceAll("'{", "{").replaceAll("}'", "}");
            data = data.replaceAll(";", ";\n\n")
            $("#preview-box").append(data)
          }else{
            removePreviewBox();
          }
          

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
  if (num > 10000) {
    alert("Max number of row is 10000 !!!");
    alert("Nâng cấp lên bản vip bở rồ để unlimit feature ^^!");
    $("#number").css("border", "2px solid red");
    $("#number_of_row").val(10000);
    $("#number").val(10000);
    return false;
  }
  if (num < 0) {
    alert("Vui lòng nhập giá trị dương cho number of row");
    $("#number").css("border", "2px solid red");
    $("#number_of_row").val(1000);
    $("#number").val(1000);
    return false;
  }

  if (num) {
    alert("Vui lòng nhập giá trị cho number of row");
    $("#number").css("border", "2px solid red");
    $("#number_of_row").val(1000);
    $("#number").val(1000);
    return false;
  }
  return true;
}

$("#download").click(function () {
  
  if (checkKeyValueNull()) {
    if (checkDuplicateKey() && checkNumberOfRow()) {
      if(checkArrayNumberNull()){
        generate();
      }
    }
  }
  
  
});

$("#preview").click(function () {
  if (checkKeyValueNull()) {
    if (checkDuplicateKey() && checkNumberOfRow()) {
      if(checkArrayNumberNull()){
        preview();
       appendReviewForm();
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

// function copyData() {
//   var copyText = document.getElementById("preview-box");
//   selectElementContents(copyText);
//   alert("Copied the text");
// }

// function selectElementContents(el) {
//   var body = document.body, range, sel;
//   if (document.createRange && window.getSelection) {
//       range = document.createRange();
//       sel = window.getSelection();
//       sel.removeAllRanges();
//       try {
//           range.selectNodeContents(el);
//           sel.addRange(range);
//       } catch (e) {
//           range.selectNode(el);
//           sel.addRange(range);
//       }
//       navigator.clipboard.writeText(range);
//   } else if (body.createTextRange) {
//       range = body.createTextRange();
//       range.moveToElementText(el);
//       range.select();
//       range.setSelectionRange(0, 99999);
//       navigator.clipboard.writeText(range.value);
     
//   }
// }
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


