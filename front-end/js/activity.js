$(document).ready(function() {
    
var table = $("#activity").DataTable({
    ajax: {
      url: "http://192.168.3.69/api/activity",
      method: "GET",
      dataSrc: "",
      error: function(){
        alert("Please Login again!");
      }
    },
    columns: [
        { "data": "date", 
          "render": function(data, type, row){
              return formatDate(data);
        }},
        { "data": "leadName" },
        { "data": "agentName" },
        { "data": "agent.code"},
        { "data": "agent.dateJoined", 
          "render": function(data, type, row){
              return formatDate(data);
              }},
        { "data": "agentType" },
        { "data": "village.name" },
        { "data": "village.district" },
        { "data": "details.freeCreditGiven", "defaultContent": 0  },
        { "data": "details.activityType" },
        { "data": "details.customer.firstName" },
        { "data": "details.oldNumber", 
          "render": function(data, type, row){
              return returnOldNumber(data);
          } },
        { "data": "details.newVodafoneNumber" },
        { "data": "details.paidTopUp" },
        { "data": "deviceType", "defaultContent": "" },        
        { "data": "details.handsetModel", "defaultContent": "" },
        { "data": "details.handsetPrice" },
        { "data": "freeOffer", "defaultContent": "" }
        
      ],
      "scrollX": true,
 
       
    order: [[1, 'asc']],
      dom: 'Bfrtip',
    buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
    ] 
       });
 
 $('#min-date, #max-date').keyup( function() {
        table.draw();
    } );


function formatDate(date) {
var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

if (month.length < 2) 
    month = '0' + month;
if (day.length < 2) 
    day = '0' + day;

return [day, month, year].join('/');
}

function returnOldNumber(oldNum){
  var num  = "";
 if (num == null)
     return "";
 else 
     return num;
}
 
//start date filter 
$.fn.dataTableExt.afnFiltering.push(
    function( Settings, Data, DataIndex ) {
        var iFini = document.getElementById('min-date').value;
        var iFfin = document.getElementById('max-date').value;
        var iStartDateCol = 0;
        var iEndDateCol = 0;
 
        iFini=iFini.substring(6,10) + iFini.substring(3,5)+ iFini.substring(0,2);
        iFfin=iFfin.substring(6,10) + iFfin.substring(3,5)+ iFfin.substring(0,2);
 
        var datofini=Data[iStartDateCol].substring(6,10) + Data[iStartDateCol].substring(3,5)+ Data[iStartDateCol].substring(0,2);
        var datoffin=Data[iEndDateCol].substring(6,10) + Data[iEndDateCol].substring(3,5)+ Data[iEndDateCol].substring(0,2);
        
        if ( iFini === "" && iFfin === "" )
        {
            return true;
        }
        else if ( iFini <= datofini && iFfin === "")
        {
            return true;
        }
        else if ( iFfin >= datoffin && iFini === "")
        {
            return true;
        }
        else if (iFini <= datofini && iFfin >= datoffin)
        {
            return true;
        }
        return false;
    }
);

      $('#min-date').keyup( function() { table.draw(); } );
      $('#max-date').keyup( function() { table.draw(); } );
      

//end date filter
 
   
});