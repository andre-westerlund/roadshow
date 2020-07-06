$(document).ready(function() { 

var table = $("#agent").DataTable({
    ajax: {
      url: "http://192.168.3.69/api/agent",
      method: "GET",
      dataSrc: "",
      error: function(){
        alert("Please Login again!");
      }
    },
       "columnDefs": [ {
            "targets": 'no-sort',
            "orderable": false,
            'searchable': false
      } ],
    columns: [
        { "data": "_id", "sClass": "d-none" },
        { "data": "code" },
        { "data": "firstName" },
        { "data": "lastName" },
        { 
          "data": "dateJoined",
          "render": function(data, type,row){
              return formatDate(data)
          }
        },
        { "data": "lead", mRender: function(data, type, row){
          if(data == null) return "";
        	return data.firstName + " " + data.lastName;
        }},
        /* EDIT */ {
        data: "_id",
         mRender: function (data, type, row) {
           return '<a class="btn btn-warning btn-small text-white update data-id="' + data + '">EDIT</a>'
           }
        },
        /* DELETE */ {
            data: "_id",
            mRender: function (data, type, row) {
            return '<a class="btn btn-danger btn-small text-white delete data-id="' + data + '">DELETE</a>'
          }
        }
      ],
    order: [[1, 'asc']],
      dom: 'Bfrtip',
    buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
    ]
    
        });
        
//ADD RECORD
  $(".newAgent").click(function(){
    $('#recordForm')[0].reset();
   	$('#id').val("");
    $('#code').val("");
		$('#password').val("");
    $('#password').prop("required", true);
    $('#firstName').val("");
    $('#lastName').val("");
    $('#dateJoined').val("");
    $('#lead').prop('selectedIndex',-1);
    $('.modal-title').html("New Agent");
    $("#action").val("Add");
   	$('#save').val('Save');
  });
  
  $("#recordModal").on('submit','#recordForm', function(event){
  	  event.preventDefault();
      var action = $("#action").val();
      var method;
      var successMsg;
      var failMsg;
      var url = "http://192.168.3.69/api/agent";
      if(action == "Update"){
          method = "PUT";
          var id = $('#oldCode').val();
          url +="/"+id;
          successMsg = "Updated Agent Successfully";
          failMsg = "There was an error updating the Agent";
      }else if(action =="Add"){
          method = "POST";
          successMsg = "Agent Added Successfully";
          failMsg = "There was an error adding the Agent";
      }else{
    		$('#recordForm')[0].reset();
  			$('#recordModal').modal('hide');				
  			$('#save').attr('disabled', false);
  			table.ajax.reload();
        $('.alert').addClass('show alert-danger alert-dismissible fade');
        $('.alert').html("Internal Server Error");
        roadshowAlert("Internal Server Error", false);
        return;
      } 
      
  	$('#save').attr('disabled','disabled');
  	var formData = $(this).serialize();
  	$.ajax({
  		url:url,
  		method: method,
  		data:formData,
  		success:function(data){				
  			$('#recordForm')[0].reset();
  			$('#recordModal').modal('hide');				
  			$('#save').attr('disabled', false);
  			table.ajax.reload();
        roadshowAlert(successMsg, true);
  		},
     error:function(data){
  			$('#recordForm')[0].reset();
  			$('#recordModal').modal('hide');				
  			$('#save').attr('disabled', false);
  			table.ajax.reload();
        roadshowAlert(failMsg, false);
     }
  	})
});	

//EDIT RECORD
$("#agent").on('click', '.update', function(){
	    var id = $(this).attr("data-id");
      var tr = $(this).closest('tr');
      var data = table.row(tr).data();
      $('#recordModal').modal('show');
      $('#id').val(data._id);
      $('#oldCode').val(data.code);
      $('#code').val(data.code);
      $('#password').val("");
      $('#password').attr("placeholder", "Change Password?");
      $('#password').prop("required", false);
			$('#firstName').val(data.firstName);
      $('#lastName').val(data.lastName);
      $('#dateJoined').val(new Date(data.dateJoined).toISOString().split('T')[0]);
      $('#lead').val(data.lead._id).change();
			$('.modal-title').html("Edit Agent");
      $("#action").val("Update");
			$('#save').val('Update');

});


//DELETE RECORD                    
$("#agent").on('click', '.delete', function(){
      var id = $(this).attr("data-id");
      var tr = $(this).closest('tr');
      var data = table.row(tr).data();
      var name = `[${data.code} - ${data.firstName} ${data.lastName}]`;
      bootbox.confirm({
          message: "Are you sure you want to delete "+name+"?",
          buttons: {
              confirm: {
                  label: 'Yes',
                  className: 'btn-danger'
              },
              cancel: {
                  label: 'No',
                  className: 'btn-info'
              }
          },
          callback: function (result) {
              //delete agent and remove from lead list
              if(!result) return;
             	$.ajax({
            		url:"http://192.168.3.69/api/agent/"+data.code,
            		method: "DELETE",
            		data:"",
            		success:function(data){				
            			table.ajax.reload();
                  roadshowAlert("Successfully Removed Agent: "+name, true);
            		},
               error:function(){
                  roadshowAlert("There was an error deleting "+name, false);
                  
               }
              });
      }});
	  });

//SET MAX DATE FIELDS TO TODAY
$('[type="date"]').prop('max', function(){
      return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
  });

//Populate Select List with Leads via AJAX CALL
$.getJSON("http://192.168.3.69/api/lead", null, function(data) {
    $("#lead option").remove(); // Remove all <option> child tags.
    $.each(data.leads, function(index, item) { // Iterates through a collection
        $("#lead").append( // Append an object to the inside of the select box
            $("<option></option>") // Yes you can do this.
                .text(`${item.firstName} ${item.lastName}`)
                .val(item._id)
        );
    });
});     

function roadshowAlert(msg, success){
var classes = 'show alert-dismissible fade';
if(success){
$('.alert').addClass(classes+" alert-success");
}else{
$('.alert').addClass(classes+" alert-danger");
}
$('.alert').html(msg);
$(".alert").append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
}
      
function formatDate(date) {
var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

if (month.length < 2) 
    month = '0' + month;
if (day.length < 2) 
    day = '0' + day;

return [day, month, year].join('-');
}   
        
});