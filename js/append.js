removeInputElement = function (e) {
    const child = document.getElementById($(e).attr('id'));
    const parent = child.closest('div.group-input');
    parent.remove();
    var idBtnRemove = $(e).attr("id")
    removeObjectDatatype(idBtnRemove.replace('remove_btn_',''))
};
removeObjectInputElement = function (e) {
    e.parentNode.parentNode.removeChild(e.parentNode);
    var idBtnRemove = $(e).attr("id")
    removeObjectDatatype(idBtnRemove.replace('remove_btn_',''))
};

$("#add-more").click(function (e) {
    var idString = Date.now() + 1;
    $("#main-form").append(
        `
        <div class="group-input">
        <img class="ui-disabled" src="https://banner2.cleanpng.com/20180329/ayq/kisspng-computer-icons-ellipsis-symbol-sign-dots-5abd400b161a68.1665258815223521390905.jpg">

            <div class="right-input ui-disabled">
            
                <div class="form-group ui-disabled" id="form_group_${idString}" >
                        
                    <input class="key" name="key_${ idString}" id="key_${ idString}" type="text" placeholder="Key data">
                    <select class="data_type" name="data_type_${idString}" id="data_type_${idString}" onchange="addDataTypeOption(this)">
                        <option value="normal">Normal Value</option>
                        <option value="array">Array</option>
                        <option value="object">Object</option>
                        <option value="arrobj">Array Object</option>
                    </select>
                    <select class="value" name="value_type_${idString}" id="value_type_${idString}" onclick="showValueTypeOptionBox(this)">
                        <option>Select Value Type</option>
                    </select>
                    <button class="remove" id="remove_btn_${idString}" type="button" onClick="removeInputElement(this);">X</button>
                </div>
            </div>
        </div>
        `
    );
});


showValueTypeOptionBox = function (e) {
    var idString =  $(e).attr('id') 
    $(".container").append(
        `
        <div class="value-type-zone">
        <div class="value-type-option" id="value_type_option_${idString}" style="overflow-y: auto;"> 
            <div class="value-search">
                <p>Search: </p>
                <input type="text" id="search_value_type" onkeyup="searchValueType()" placeholder="Enter type name">
                <button style="float: right" onclick="closeValueTypeOptionBox('${idString}')">Close</button>
            </div>
            <hr>
            <div class="option-zone">
                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Animal Name</h4>
                    <p>Generate animal name</p>
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Age</h4>
                    <p>Generate age</p>
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>App Bundle Id</h4>
                    <p>com.auto.project</br>com.viva.xxx</p> 
                </div>
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>App Name</h4>
                    <p>Fake app name</p> 
                </div>
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Avatar</h4>
                    <p>Link avatar</p> 
                </div>
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Boolean</h4>
                    <p>True or False</p> 
                </div>
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Bitcoin Address</h4>
                    <p>Generate bitcoin address</p>
                </div>
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Car Brand</h4>
                    <p>Ford, Mustang, Toyota</p> 
                </div>
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Car Model</h4>
                    <p>LS, Elise, Ram Van 1500</p> 
                </div>
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Credit Card</h4>
                    <p>Visa: 4012xxxx </br>JCB: 3802xxxx</p>
                </div>
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>City</h4>
                    <p>Generate city name</p> 
                </div>
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Color</h4>
                    <p>Red, Green, Blue, ...</p> 
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Company Name</h4>
                    <p>Fake company name</p> 
                </div>
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Construction Heavy Equipment</h4>
                    <p>Dump Truck, Compactor, Grader</p> 
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Construction Material</h4>
                    <p>Rubber, Plastic, Vinyl</p> 
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Construction Role</h4>
                    <p>Subcontractor, Engineer, Estimator,</p> 
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Construction Trade</h4>
                    <p>Laborer, Pipefitter, Safety Officer</p> 
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Country</h4>
                    <p>Generate country name</p> 
                </div>
                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Country Code</h4>
                    <p>Generate country code</p> 
                </div>
                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Credit Card Type</h4>
                    <p>Visa, Master Card, JCB</p> 
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Currency</h4>
                    <p>Ruble, Euro, Dolar</p> 
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Currency Code</h4>
                    <p>EUR, USD, VND</p> 
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Date</h4>
                    <p>Choose date start, date end and format</p>
                </div> 
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Day Of Week</h4>
                    <p>Monday, Tuesday, Wednesday</p>
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Department</h4>
                    <p>Engineering, Marketing, Sales,</p> 
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Domain</h4>
                    <p>apple.com, google.com, ....</p> 
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Dummy Image URL</h4>
                    <p>Generate dummy image link url</p> 
                </div>
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Email</h4>
                    <p>jame@gmail.com, athony@hostmail.com</p>
                </div>

                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>File Extension</h4>
                    <p>.exe, .jar, .bat, ...</p> 
                </div>
                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>File Name</h4>
                    <p>Fake file name</p> 
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>File Name With Extension</h4>
                    <p>exam.exe, file.jar, auto.bat</p> 
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>First Name</h4>
                    <p>Jame, Athony, Mike</p>
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Fullname</h4>
                    <p>Leo Jame, Mark Athony, Mike Tyson</p>
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Job Title</h4>
                    <p>Generate job title</p>
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Hex Color Code</h4>
                    <p>Generate hex color code: #45C5A4</p>
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Language</h4>
                    <p>English, Vietnamese, Japan</p>
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Last Name</h4>
                    <p>Jame, Athony, Mike</p>
                </div>
                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Product Grocery</h4>
                    <p>Generate product grocery name</p>
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Street Name</h4>
                    <p>Generate street name</p>
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Timezone</h4>
                    <p>Asia/Manila, Asia/Urumqi, America/Santarem</p>
                </div>

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Gender</h4>
                    <p>Male, Female</p>
                </div>
                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Progaming Language</h4>
                    <p>PHP, Python, Javascript</p>
                </div>
                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Month</h4>
                    <p>January, February, March</p>
                </div>
                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Year</h4>
                    <p>Generate year</p>
                </div>
                

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>ID</h4>
                    <p>Generate ID with 9 digits </p>
                </div>
                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>IPV4</h4>
                    <p>Generate IPV4 string </p>
                </div>
                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>IPV6</h4>
                    <p>Generate IPV6 string </p>
                </div>
                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Version</h4>
                    <p>version x.x, version x.x.x.x</p>
                </div>

                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>UUID</h4>
                    <p>Generate UUID</p>
                </div>
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Username</h4>
                    <p>jame123, athonylis, miketonyd</p>
                </div>
                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Random List</h4>
                    <p>item_1, item_2, item_3, ....</p>
                </div>
                
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Number</h4>
                    <p>Choose number from start to end</p>
                </div> 
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>MAC Address</h4>
                    <p>AA:BB:CC:DD:EE:FF </br> AA-BB-CC-DD-EE-FF</p>
                </div> 
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Password</h4>
                    <p>Generate password</p>
                </div> 
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Number Row</h4>
                    <p>1-2-3-4</p>
                </div> 
                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Phone Number</h4>
                    <p>098x-xxx-xxxF </br> +84-xxx-xxx-xxx</p>
                </div> 

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>SHA256</h4>
                    <p>Generate SHA256 string</p>
                </div> 

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Street Name And Address</h4>
                    <p>Generate address</p>
                </div> 

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Time</h4>
                    <p>Format 12h or 24h</p>
                </div> 

                <div class="type-option" onclick="getAndAppendValueType(this,'${idString}')" >
                    <h4>Text</h4>
                    <p>Generate Text</p>
                </div> 
                
               
            </div>
        </div>
    </div>
        `
            
    );
    $(".value-type-zone").css("display", "block");
    $(e).attr("disabled", "");

    
    $(`.value-type-zone`).mouseup(function(e) 
    {
        if($('.value-type-zone').length > 0){
            var container = $(".value-type-option");
            if (!container.is(e.target) && container.has(e.target).length === 0) 
            {
                closeValueTypeOptionBox(idString);
                $(`#value_type_${idString}`).removeAttr("disabled");
                $(`#value_type_object_${idString}`).removeAttr("disabled");
            } 
            }

    });
        
    

}

closeValueTypeOptionBox = function (id) {
    var idOption = id.replace('value_type_','');
    // console.log(idOption);
    $(".value-type-zone").css("display", "none");
    $(".value-type-zone").remove();
    $(`#value_type_${idOption}`).removeAttr("disabled");
    $(`#value_type_object_${idOption}`).removeAttr("disabled");
};



getAndAppendValueType = function (e, id) {
    var idString = "#"+id
    var text = $(e).children('h4').text();

    $(idString).empty();

    switch (text) {
        case 'Email':
            appendEmailType(idString);
        break;

        case 'Date':
            appendDatetimeType(idString);
        break;
    
        case 'Random List':
            appendRandomListType(idString);
        break;
    
        case 'Credit Card':
            appendCreditCardType(idString);
        break;

        case 'Number':
            appendRandomNumberType(idString);
        break;

        case 'Password':
            appendPasswordType(idString); 
        break;
    
        case 'MAC Address':
            appendMACAddressType(idString);
        break;
    
        case 'Phone Number':
            appendPhoneNumberType(idString);
        break;
        
        case 'Age':
            appendAgeType(idString);
        break;
        
        case 'Year':
            appendYearType(idString);
        break;
        
        case 'Version':
            appendVersionType(idString);
        break;
      
        case 'Time':
            appendTimeType(idString);
        break;

        case 'Text':
            appendRandomTextType(idString);
        break;

       
    
        default:
            appendNormalType(idString);
            break;
    }

    $(idString).append(
        $("<option>", {
            value: text,
            text: text,
        })
    );

    closeValueTypeOptionBox(id);
};


searchValueType = function(){
    let data = $("#search_value_type").val();
    var list = document.getElementsByClassName("type-option");
    
    for (var i = 0; i < list.length; i++) {
        if(($(list[i]).text().toLowerCase()).indexOf(`${data.toLowerCase()}`) !== -1) {
            $(list[i]).show()
        }else{
            $(list[i]).hide()
        }
    }
    

}

