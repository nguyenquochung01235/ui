returnDataTypeID = function (id) { 
    var idOption = id.replace('data_type_','')
    return idOption;
}

removeArrayDataType = function (id) { 
    $(`#array_option_${id}`).remove();
}

removeNormalDataype = function (id) { 
    $(`#option_1_${id}`).remove();
    $(`#option_2_${id}`).remove();
    $(`#option_3_${id}`).remove();
    $(`#date_start_${id}`).remove();
    // $(`#option_btn_${id}`).remove();
    $(`#option_field_${id}`).remove();
    $(`#date_end_${id}`).remove();
    $(`#date_format_${id}`).remove();
    $(`#form_group_${id} > .ms-parent`).remove();
 }

removeObjectDatatype = function (id) { 
    $(`.child-${id}`).remove();
    $(`#label_object_${id}`).remove();
    $(`#value_type_${id}`).removeAttr("disabled");
    $(`#add_more_object_${id}`).remove();
    
}

removeArrayObjectDatatype = function (id) { 
    $(`.child-${id}`).remove();
    $(`#label_object_${id}`).remove();
    $(`#add_more_object_${id}`).remove();
}



addDataTypeOption = function (e) { 
    var datatype =  $(e).val();
    var id = returnDataTypeID($(e).attr("id"));

    switch (datatype) {
        case "normal":
            normalValueDataType(id);
            break;
    
        case "array":
            arrayDataType(id);
            break;
    
        case "object":
            objectDataType(id);
            break;
    
        case "arrobj":
            arrayObjectDataType(id);
            break;
    
        default:
            normalValueDataType(id);
            break;
    }
}


normalValueDataType = function (id) {
    $(`#value_type_${id}`).removeAttr("disabled");
    removeArrayDataType(id);
    removeObjectDatatype(id);
 }



addMoreObject = function(id){

    
    var idOption = Date.now();

    $(`#add_more_object_${id}`).before(
        `
        <div class=" ui-disabled form-group-object child-${id}" id="form_group_object_${idOption}" >
        <input class="key" type="text" id="key_object_${idOption}" name="key_object_${idOption}" placeholder="Key data of object">
        <select class="data_type" name="data_type_object_${idOption}" id="data_type_object_${idOption}" onchange="addDataTypeOption(this)">
            <option value="normal">Normal Value</option>
            <option value="array">Array</option>
        </select>
        <select class="value" name="value_type_object_${idOption}" id="value_type_object_${idOption}" onclick="showValueTypeOptionBox(this)">
            <option>Select Value Type</option>
        </select>
        <button class="remove" id="remove_btn_object_${idOption}" type="button" onClick="removeObjectInputElement(this);">X</button>
    </div>
        `
    );


}


arrayDataType = function (id) { 
    removeObjectDatatype(id);
    removeArrayDataType(id);
    $(`#value_type_${id}`).after(
        `
         <input class="custom-1 arraynumber" name="array_option_${id}" id="array_option_${id}" type="number" placeholder="Number of element">
        `
    );
 }

objectDataType = function (id) { 
    removeArrayDataType(id);
    removeNormalDataype(id);
    removeArrayObjectDatatype(id);
    $(`#value_type_${id}`).attr('disabled', '');
    $(`#form_group_${id}`).after(
        `
        <div class="label-object ui-disabled" id="label_object_${id}">
            <label for="">Key Data</label>
            <label for="">Data Type</label>
            <label for="">Value Type</label>
            <label for="">Optional</label>
        </div>
    `
    );
    $(`#label_object_${id}`).after(
        `
        <div class=" ui-disabled form-group-object child-${id}" id="form_group_object_${id}" >
            <input class="key" type="text" id="key_object_${id}" name="key_object_${id}" placeholder="Key data of object">
            <select class="data_type" name="data_type_object_${id}" id="data_type_object_${id}" onchange="addDataTypeOption(this)">
                <option value="normal">Normal Value</option>
                <option value="array">Array</option>
            </select>
            <select class="value" name="value_type_object_${id}" id="value_type_object_${id}" onclick="showValueTypeOptionBox(this)">
                <option>Select Value Type</option>
            </select>
            <button class="remove" id="remove_btn_object_${id}" type="button" onClick="removeObjectInputElement(this);">X</button>
        </div>

    <button type="button" class="add-more-object" id="add_more_object_${id}" onclick="addMoreObject(${id})">Add more</button>
        `
    );
    


}

arrayObjectDataType = function (id) { 
    removeArrayDataType(id);
    removeNormalDataype(id);
    removeObjectDatatype(id);

    $(`#value_type_${id}`).after(
        `
         <input class="custom-1 arraynumber" name="array_option_${id}" id="array_option_${id}" type="number" placeholder="Number of object">
        `
    );
    $(`#value_type_${id}`).attr('disabled', '');

    $(`#form_group_${id}`).after(
        `<div class=" ui-disabled label-object" id="label_object_${id}">
            <label for="">Key Data</label>
            <label for="">Data Type</label>
            <label for="">Value Type</label>
            <label for="">Optional</label>
        </div>
    `
    );
    $(`#label_object_${id}`).after(
        `
        <div class=" ui-disabled form-group-object child-${id}" id="form_group_object_${id}" >
            <input class="key" type="text" id="key_object_${id}" name="key_object_${id}" placeholder="Key data of object">
            <select class="data_type" name="data_type_object_${id}" id="data_type_object_${id}" onchange="addDataTypeOption(this)">
                <option value="normal">Normal Value</option>
                <option value="array">Array</option>
            </select>
            <select class="value" name="value_type_object_${id}" id="value_type_object_${id}" onclick="showValueTypeOptionBox(this)">
                <option>Select Value Type</option>
            </select>
            <button class="remove" id="remove_btn_object_${id}" type="button" onClick="removeObjectInputElement(this);">X</button>
        </div>

    <button type="button" class="add-more-object" id="add_more_object_${id}" onclick="addMoreObject(${id})">Add more</button>
        `
    );

}