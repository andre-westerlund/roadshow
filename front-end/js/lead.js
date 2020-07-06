$(document).ready(function() {    
//LIST RECORDS
var table = $("#lead").DataTable({
    ajax: {
      url: "http://192.168.3.69/api/lead/",
      dataSrc: "leads",
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
        { "data": "firstName" },
        { "data": "lastName" },
        { /* AGENT LIST */
         "data": "agents",
         "mRender": function (data, type, row) {
              if(data.length < 1){
                return "";
              }else{
                var listOfAgents = [];
                data.forEach(agent => {
                  listOfAgents.push(`[${agent.firstName} ${agent.lastName} <strong>(${agent.code})</strong>]`);
                })
                return listOfAgents.join(" ");              
              }
           }
        },
         /* EDIT */ {
         data: "_id",
         mRender: function (data, type, row) {
           return '<a class="btn btn-warning btn-small text-white update" data-id="' + data + '">EDIT</a>'
           }
        },
        /* DELETE */ {
            data: "_id",
            mRender: function (data, type, row) {
            return '<a class="btn btn-danger btn-small text-white delete" data-id="' + data + '">DELETE</a>'
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
  $(".newLead").click(function(){
    $('#recordForm')[0].reset();
   	$('#id').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('.modal-title').html("New Lead");
    $("#action").val("Add");
   	$('#save').val('Save');
  });
  
  $("#recordModal").on('submit','#recordForm', function(event){
  	  event.preventDefault();
      var action = $("#action").val();
      var method;
      var successMsg;
      var failMsg;
      var url = "http://192.168.3.69/api/lead";
      if(action == "Update"){
          method = "PUT";
          var id = $('#id').val();
          url +="/"+id;
          successMsg = "Updated Lead Successfully";
          failMsg = "There was an error updating the Lead";
      }else if(action =="Add"){
          method = "POST";
          successMsg = "Lead Added Successfully";
          failMsg = "There was an error adding the Lead";
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
$("#lead").on('click', '.update', function(){
	    var id = $(this).attr("data-id");
      var tr = $(this).closest('tr');
      var data = table.row(tr).data();
      $('#recordModal').modal('show');
      $('#id').val(data._id);
      $('#code').val(data.code);
			$('#firstName').val(data.firstName);
			$('#lastName').val(data.lastName);
	    $('.modal-title').html("Edit Lead");
      $("#action").val("Update");
			$('#save').val('Update');

});


//DELETE RECORD                    
$("#lead").on('click', '.delete', function(){
      var id = $(this).attr("data-id");
      var tr = $(this).closest('tr');
      var data = table.row(tr).data();
      var firstName = data.firstName;
      var lastName = data.lastName;
      bootbox.confirm({
          message: "Are you sure you want to delete "+firstName+" "+lastName+"?",
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
              if(!result) return;
             	$.ajax({
            		url:"http://192.168.3.69/api/lead/"+data._id,
            		method: "DELETE",
            		data:"",
            		success:function(data){				
            			table.ajax.reload();
                  roadshowAlert("Successfully Removed Lead: "+firstName+" "+lastName, true);
            		},
               error:function(){
                  roadshowAlert("There was an error deleting "+firstName+" "+lastName, false);
                  
               }
              });
      }});
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

});
