returnIDOption = function (id) { 
    var idOption = id.replace('#value_type_','')
    return idOption;
}

setPlaceholder = function(id,text){
    $(`#form_group_${returnIDOption(id)}> .ms-parent >.ms-choice > .placeholder`).text(text);
    
}

removeOption = function (id) { 
    var idOption = returnIDOption(id)
    $(`#remove_btn_${idOption}`).remove();
    $(`#option_1_${idOption}`).remove();
    $(`#option_2_${idOption}`).remove();
    $(`#option_3_${idOption}`).remove();
    $(`#date_start_${idOption}`).remove();
    $(`#date_end_${idOption}`).remove();
    $(`#date_format_${idOption}`).remove();
    $(`#form_group_${idOption} > .ms-parent`).remove();

    // remove object value

    $(`#remove_btn_object_${idOption}`).remove();
    $(`#option_1_object_${idOption}`).remove();
    $(`#option_2_object_${idOption}`).remove();
    $(`#option_3_object_${idOption}`).remove();
    $(`#date_start_object_${idOption}`).remove();
    $(`#date_end_object_${idOption}`).remove();
    $(`#date_format_object_${idOption}`).remove();
    $(`#form_group_object_${idOption} > .ms-parent`).remove();

    
}

appendNormalType = function (id) {
    //Remove
    removeOption(id)
    //Append

    $(id)
    .parent()
    .append(
       `
        <button class="remove" id="remove_btn_${returnIDOption(id)}" type="button" onClick="removeInputElement(this);">X</button>
        `
    );

};


appendEmailType = function (id) { 
    //Remove
    removeOption(id)
    //Append
    $(id)
    .parent()
    .append(
       `
        <select id="option_1_${returnIDOption(id)}" name="option_1_${returnIDOption(id)}[]" multiple="multiple">
            <option value="hostmail">@hostmail.com</option>
            <option value="gmail">@gmail.com</option>
            <option value="outlook">@outlook.com</option>
            <option value="yahoo">@yahoo.com</option>
            <option value="iclound">@iclound.com</option>
            <option value="example">@example.com</option>
            
        </select>
        <button class="remove" id="remove_btn_${returnIDOption(id)}" type="button" onClick="removeInputElement(this);">X</button>
        `
    );
    $(`#option_1_${returnIDOption(id)}`).multipleSelect({
        filter: true
    });
    setPlaceholder(id,'Select domain')
};


appendDatetimeType = function (id) { 
    removeOption(id)
    //Append
    $(id)
    .parent()
    .append(
       `
       <div class="date" id="date_start_${returnIDOption(id)}">
            <p>start</p>
            <input type="date"  placeholder="dd_mm_yyyy" name="option_1_${returnIDOption(id)}">
        </div>
        <div class="date" id="date_end_${returnIDOption(id)}">
            <p>end </p>
            <input type="date" placeholder="dd_mm_yyyy" name="option_2_${returnIDOption(id)}">
        </div>


        <div class="date date_format" id="date_format_${returnIDOption(id)}">
            <p>format </p>
            <select name="option_3_${returnIDOption(id)}" id="">
                <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                <option value="dd/Mth/yyyy">dd/Mon/yyyy</option>   
                <option value="dd-mm-yyyy">dd-mm-yyyy</option>
                <option value="mm-dd-yyyy">mm-dd-yyyy</option>
                <option value="dd-Mth-yyyy">dd-Mon-yyyy</option>
                <option value="dd.mm.yyyy">dd.mm.yyyy</option>
                <option value="mm.dd.yyyy">mm.dd.yyyy</option>
                <option value="dd.Mth.yyyy">dd.Mon.yyyy</option>
                <option value="sqltime">SQL Time</option>
            </select>
        </div>
        <button class="remove" id="remove_btn_${returnIDOption(id)}" type="button" onClick="removeInputElement(this);">X</button>
        `
    );
 };



appendRandomListType = function (id) { 
    removeOption(id);
    $(id)
    .parent()
    .append(
       `
         <input class="custom" name="option_1_${returnIDOption(id)}" id="option_1_${returnIDOption(id)}" type="text" placeholder="item_1, item_2, item_3">
        
        <button class="remove" id="remove_btn_${returnIDOption(id)}" type="button" onClick="removeInputElement(this);">X</button>
        `
    );

 };
appendCreditCardType = function (id) { 
    //Remove
    removeOption(id)
    //Append
    $(id)
    .parent()
    .append(
       `
        <select id="option_1_${returnIDOption(id)}" name="option_1_${returnIDOption(id)}[]" multiple="multiple">
            <option value="visa">Visa</option>
            <option value="mastercard">Master Card</option>
            <option value="americanexpress">American Express</option>
            <option value="jcb">JCB</option>
            <option value="bankcard">Bankcard</option>
            
            
        </select>
        <button class="remove" id="remove_btn_${returnIDOption(id)}" type="button" onClick="removeInputElement(this);">X</button>
        `
    );
    $(`#option_1_${returnIDOption(id)}`).multipleSelect({
        filter: true
    });
   
    setPlaceholder(id,'Select Credit Card Type')
   
};

appendRandomNumberType = function (id) { 
    removeOption(id);
    $(id)
    .parent()
    .append(
       `
         <input class="custom-1" name="option_1_${returnIDOption(id)}" id="option_1_${returnIDOption(id)}" type="number" placeholder="From">
         <input class="custom-1" name="option_2_${returnIDOption(id)}" id="option_2_${returnIDOption(id)}" type="number" placeholder="To">
        
        <button class="remove" id="remove_btn_${returnIDOption(id)}" type="button" onClick="removeInputElement(this);">X</button>
        `
    );

 };


 appendMACAddressType = function (id) { 
    //Remove
    removeOption(id)
    //Append
    $(id)
    .parent()
    .append(
       `
        <select id="option_1_${returnIDOption(id)}" name="option_1_${returnIDOption(id)}[]" multiple="multiple">
            <option value=":">AA:BB:CC:DD:EE:FF</option>
            <option value="-">AA-BB-CC-DD-EE-FF</option>     
        </select>
        <button class="remove" id="remove_btn_${returnIDOption(id)}" type="button" onClick="removeInputElement(this);">X</button>
        `
    );
    $(`#option_1_${returnIDOption(id)}`).multipleSelect({
        filter: true
    });
    setPlaceholder(id,'Select seperator')
};


appendPasswordType = function (id) { 
    removeOption(id);
    $(id)
    .parent()
    .append(
       `
         <input class="custom-1" name="option_1_${returnIDOption(id)}" id="option_1_${returnIDOption(id)}" type="number" placeholder="From">
         <input class="custom-1" name="option_2_${returnIDOption(id)}" id="option_2_${returnIDOption(id)}" type="number" placeholder="To">
        
        <button class="remove" id="remove_btn_${returnIDOption(id)}" type="button" onClick="removeInputElement(this);">X</button>
        `
    );

 };

 appendPhoneNumberType = function (id) { 
    //Remove
    removeOption(id)
    //Append
    $(id)
    .parent()
    .append(
       `
        <select id="option_1_${returnIDOption(id)}" name="option_1_${returnIDOption(id)}[]" multiple="multiple">
            <option value="0## ### ####">0## ### ####</option>
            <option value="0##-###-####">0##-###-####</option>
            <option value="(0##)###-####">(0##)###-####</option>
            <option value="+84 ### ### ###">+84 ### ### ###</option>
            <option value="0#########">0#########</option>
        </select>
        <button class="remove" id="remove_btn_${returnIDOption(id)}" type="button" onClick="removeInputElement(this);">X</button>
        `
    );
    $(`#option_1_${returnIDOption(id)}`).multipleSelect({
        filter: true
    });
    setPlaceholder(id,'Select option')
};

appendAgeType = function (id) { 
    removeOption(id);
    $(id)
    .parent()
    .append(
       `
         <input class="custom-1" name="option_1_${returnIDOption(id)}" id="option_1_${returnIDOption(id)}" type="number" placeholder="From">
         <input class="custom-1" name="option_2_${returnIDOption(id)}" id="option_2_${returnIDOption(id)}" type="number" placeholder="To">
        
        <button class="remove" id="remove_btn_${returnIDOption(id)}" type="button" onClick="removeInputElement(this);">X</button>
        `
    );

 };

appendYearType = function (id) { 
    removeOption(id);
    $(id)
    .parent()
    .append(
       `
         <input class="custom-1" name="option_1_${returnIDOption(id)}" id="option_1_${returnIDOption(id)}" type="number" placeholder="From">
         <input class="custom-1" name="option_2_${returnIDOption(id)}" id="option_2_${returnIDOption(id)}" type="number" placeholder="To">
        
        <button class="remove" id="remove_btn_${returnIDOption(id)}" type="button" onClick="removeInputElement(this);">X</button>
        `
    );

 };

 appendVersionType = function (id) { 
    removeOption(id);
    $(id)
    .parent()
    .append(
       `
         <input class="custom-1" name="option_1_${returnIDOption(id)}" id="option_1_${returnIDOption(id)}" type="number" placeholder="Length from">
         <input class="custom-1" name="option_2_${returnIDOption(id)}" id="option_2_${returnIDOption(id)}" type="number" placeholder="to">
        
        <button class="remove" id="remove_btn_${returnIDOption(id)}" type="button" onClick="removeInputElement(this);">X</button>
        `
    );

 };

 appendTimeType = function (id) { 
    //Remove
    removeOption(id)
    //Append
    $(id)
    .parent()
    .append(
       `
        <select id="option_1_${returnIDOption(id)}" name="option_1_${returnIDOption(id)}[]" multiple="multiple">
            <option value="12 Hour">12 Hour</option>
            <option value="24 Hour">24 Hour</option>     
        </select>
        <button class="remove" id="remove_btn_${returnIDOption(id)}" type="button" onClick="removeInputElement(this);">X</button>
        `
    );
    $(`#option_1_${returnIDOption(id)}`).multipleSelect({
        filter: true
    });
    setPlaceholder(id,'Select format')
};