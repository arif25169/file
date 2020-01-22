    function myFunction() {
        $.get(window.location.href, null, function (html) {
   // $.notify("Processing", "info");
    // console.log("Parsing started!");
    // //console.log(html);
    // console.log("Parsing started x!");
    // var elements = $(html);
    // var found = $('.dl-table tbody tr', elements);
    // var found2 = $('.attrTable', elements);
    // console.log('test', found2)
    // console.log('helo')
    // console.log('mine', found2)
    // console.log('mine2', elements)
    var titles = ["Name","Id", "Group Name", "Request Date", "Question 1", "Question 2", "Question 3"];
    var data = [];
    var listName = [];
    var listId = [];
    var groupLink = [];
    var listRequestDate = [];
    var listAnswer1 = [];
    var listQuestion1 = [];
    var listAnswer2 = [];
    var listQuestion2 = [];
    var listAnswer3 = [];
    var listQuestion3 = [];

    /*
     * Get the table headers, this will be CSV headers
     * The count of headers will be CSV string separator
     */
    // $('.dataTable th').each(function () {
    //     titles.push($(this).text());
    // });
    function removeCommas(str) {
        return (str.replace(/,/g, ''));
    }
    function stringReplace(str) {
        return (str.replace('/requests/', ''));
    }
    function linebreak(str) {
        return (str.replace(/(\r\n|\n|\r)/gm, ''));
    }
    function bracketReplcae(str) {
        return (str.replace(/\(.*?\)/g, ""));
    }
    $('._66jq ._z_3').each(function () {
        listName.push($(this).text());
    }); 
    $('._66jq >a').each(function (idx, item) {
        var urlAry = this.href.split("/");
        var extractedText = urlAry[urlAry.length - 1];
        listId.push(extractedText);
    });
    $('._50f8 .livetimestamp').each(function () {
        listRequestDate.push(removeCommas($(this).text()));
    });
    $('.uiList._4kg._6-i._6-h._6-j').each(function () {
        let question = $(this).find('li text').first().text()
        listAnswer1.push(linebreak(question));
    });
    $('.uiList._4kg._6-i._6-h._6-j').each(function () {
        let question = $(this).find('li ._50f8').first().text()
        listQuestion1.push(linebreak(question));
    });
    $('.uiList._4kg._6-i._6-h._6-j').each(function () {
        let question = $(this).find('li text').eq(1).text()
        listAnswer2.push(linebreak(question));
    });
    $('.uiList._4kg._6-i._6-h._6-j').each(function () {
        let question = $(this).find('li ._50f8').eq(1).text()
        listQuestion2.push(linebreak(question));
    });
    $('.uiList._4kg._6-i._6-h._6-j').each(function () {
        let question = $(this).find('li text').eq(2).text()
        listAnswer3.push(linebreak(question));
    });
    $('.uiList._4kg._6-i._6-h._6-j').each(function () {
        let question = $(this).find('li ._50f8').eq(2).text()
        listQuestion3.push(linebreak(question));
    });


    console.log(listName);
    console.log(listRequestDate);
    console.log(listId);
    //console.log(listQuestion1);


    for (var i = 0; i < listName.length; i++) {
        groupLink.push(bracketReplcae(document.title));
    }
    console.log(groupLink);
    if (listName.length==0){
        //$.notify("No User Found", "error");
    } else {
    for (var i = 0; i < (listName.length); i++) {

        if (i < listId.length) data.push(listId[i]);
        if (i < groupLink.length) data.push(groupLink[i]);  
        if (i < listQuestion1.length) data.push(listQuestion1[i]);
        if (i < listAnswer1.length) data.push(listAnswer1[i]);
        if (i < listQuestion2.length) data.push(listQuestion2[i]);
        if (i < listAnswer2.length) data.push(listAnswer2[i]);
        if (i < listQuestion3.length) data.push(listQuestion3[i]);
        if (i < listAnswer3.length) data.push(listAnswer3[i]); 
        if (i < listName.length) data.push(listName[i]);
        if (i < listRequestDate.length) data.push(listRequestDate[i]);       
        // if (i < pushVal[0].length) data.push(pushVal[0][i]);
        // if (i < pushVal[1].length) data.push(pushVal[1][i]);
        // for (j=0; j<pushVal.length; j++){
        //     if (i < pushVal[j].length) data.push(pushVal[j][i]);
        //     }
        // if (i < listRequestDate.length) data.push(listRequestDate[i]);
    }


    // $('._66jq ._z_3').each(function () {
    //     listRequestDate.push($(this).text());
    // });
    // $('._66jq .livetimestamp').each(function () {
    //     listRequestDate.push($(this).text());
    // });  
    console.log(data);
   
    // Object.defineProperty(Array.prototype, 'chunk', {
    //     value: function(chunkSize) {
    //       var R = [];
    //       for (var i = 0; i < this.length; i += chunkSize)
    //         R.push(this.slice(i, i + chunkSize));
    //       return R;
    //     }
    //   });
      var values;
      if (data){
          //added lodash 
        values= _.chunk(data, 10);
       // values= data.chunk(7)
      }
      console.log(values);
      var keys = ["group_id","name", "question1", "answer1", "question2",  "answer2", "question3", "answer3", "member_name", "member_since" ];
      //var values = [["John John", 16, "Saints Hills High School"], ["Miranda Knobs", 12, "St Mary Junior High"], ["Patricia Lee", 13, "Milwakee High School"]];
      var resultArray = [];
      if (values){
      for(var i=0; i<values.length; i++){
        var obj = {};
        for(var j=0; j<keys.length; j++){
           obj[keys[j]] = values[i][j];
        }
         resultArray.push(obj);
      }
    }
      console.log(resultArray);

      if (resultArray){
        chrome.storage.local.get("targetList", function (obj) {
            var data = obj.targetList || [];
            var finalValue=$.merge(resultArray,data)
            chrome.storage.local.set({"targetList": finalValue});
          })
      }

      var finalResult = values.map((data_array) => {
        var basic_values = {
            [keys[0]]: data_array[0],
            [keys[1]]: data_array[1]
        }
    
        var other_values = {}
    var array=[]
        data_array.forEach((item, index) => {
            if (index === 0) {
                return
            } else if (index === 1) {
                return
            } else {
                other_values[keys[index]] = item
                array.push(other_values)
            }
        })
    // console.log(other_values)
    // console.log(array)
     for (var i in array){
        return {
            'group': basic_values,
            'questions': [array[i]]
        }
    }
    })
    
    console.log(finalResult);
      
    if (finalResult){
        chrome.storage.local.get("pushList", function (obj) {
            var data = obj.pushList || [];
            var finalValue=$.merge(finalResult,data)
            chrome.storage.local.set({"pushList": finalValue});
          })
      }
    //////////demo
    /*
* Convert our data to CSV string
*/
    // var CSVString = prepCSVRow(titles, titles.length, '');
    // CSVString = prepCSVRow(data, titles.length, CSVString);

    // /*
    //  * Make CSV downloadable
    //  */
    // var downloadLink = document.createElement("a");
    // var blob = new Blob(["\ufeff", CSVString]);
    // var url = URL.createObjectURL(blob);
    // downloadLink.href = url;
    // downloadLink.download = "data.csv";

    // /*
    //  * Actually download CSV
    //  */
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);

   // $.notify("Completed", "success");
    $("#download-btn").attr("disabled", false);
}}, "text").fail(function () {
    alert("Scraping failed.");
    $("#download-btn").attr("disabled", false);
});
    }