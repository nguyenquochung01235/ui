addNewDataset = function (){
    
    $(".container").append(
        `
        <div class="add-new-dataset-zone">
           <div class="add-new-data-zone-child">
                <div class="add-new-dataset-option">
                    <p>Add New Dataset</p>
                    <button id="download_file_example" onclick="downloadFileExample()" >Download file example</button>
                    <button id="close_dataset_zone" onclick="closeAddNewDatasetZone()" >Close</button>
                </div>
                <hr>
                <div class="add-new-dataset-form">
                    <p>Preview data</p>
                    <div disabled id="xlx_json"></div>
                    <form enctype="multipart/form-data" id="form_upload_file">
                        <label for="">Excel file:  </label>
                        <input id="upload_file" type="file" name="files[]" onclick="uploadFile()">
                        <button id="upload_file_btn" type="button" onclick="createNewDataSet()">Upload data</button>
                    </form>
                </div>
           </div>
        </div>
        `
    );
}




closeAddNewDatasetZone = function () { 
    $(".add-new-dataset-zone").remove();
}


let dataCreate = ""

ExcelToJSON = function() {

    this.parseExcel = function(file) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: 'binary'
        });
        workbook.SheetNames.forEach(function(sheetName) {
          // Here is your object
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          var json_object = JSON.stringify(XL_row_object, null, 4);
            appendDataReview(json_object);
            dataCreate = json_object;
        })
      };

      reader.readAsBinaryString(file);
    };
  };

handleFileSelect = function(event){

    var files = event.target.files; // FileList object
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
}

appendDataReview = function(data){

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
              

              
              
                $("#xlx_json").append(
                  `
                    <div id = "preview-data-xlx">
                    
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

}

downloadFileExample = function (){
    data = `[
        {
            "CUSTOME_NAME": "data_1"
        },
        {
            "CUSTOME_NAME": "data_2"
        },
        {
            "CUSTOME_NAME": "data_3"
        },
        {
            "CUSTOME_NAME": "data_4"
        },
        {
            "CUSTOME_NAME": "data_5"
        },
        {
            "CUSTOME_NAME": "data_6"
        },
        {
            "CUSTOME_NAME": "data_7"
        },
        {
            "CUSTOME_NAME": "data_8"
        },
        {
            "CUSTOME_NAME": "data_9"
        },
        {
            "CUSTOME_NAME": "data_10"
        }
    ]`
    exportToExcelFile(data, "ExampleDataset")
}




createNewDataSet = function(){
    console.log(dataCreate);
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/",
        data: {
          dataForm: dataCreate,
        },
        success: function (data) {
            console.log("data" + data)
        }
    })
}


function uploadFile() { 
    document.getElementById('upload_file').addEventListener('change', handleFileSelect, false);
 }


 