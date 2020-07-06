$(document).ready(function() { 

var table = $("#user").DataTable({
    ajax: {
      url: "http://192.168.3.69/api/user",
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
        { "data": "email" },
        { "data": "firstName","defaultContent": "" },
        { "data": "lastName", "defaultContent": "" },
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
  $(".newUser").click(function(){
    $('#recordForm')[0].reset();
   	$('#id').val("");
		$('#password').val("");
    $('#password').attr("placeholder", "Password");
    $('#email').val("");
    $('#password').prop("required", true);
    $('#firstName').val("");
    $('#lastName').val("");
    $('.modal-title').html("New User");
    $("#action").val("Add");
   	$('#save').val('Save');
  });
  
  $("#recordModal").on('submit','#recordForm', function(event){
  	  event.preventDefault();
      var action = $("#action").val();
      var method;
      var successMsg;
      var failMsg;
      var url = "http://192.168.3.69/api/user";
      if(action == "Update"){
          method = "PUT";
          var id = $('#id').val();
          url +="/"+id;
          successMsg = "Updated User Successfully";
          failMsg = "There was an error updating the User";
      }else if(action =="Add"){
          url+="/auth/register";
          method = "POST";
          successMsg = "User Added Successfully";
          failMsg = "There was an error adding the User";
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
$("#user").on('click', '.update', function(){
	    var id = $(this).attr("data-id");
      var tr = $(this).closest('tr');
      var data = table.row(tr).data();
      $('#recordModal').modal('show');
      $('#id').val(data._id);
      $('#email').val(data.email);
      $('#password').val("");
      $('#password').attr("placeholder", "Change Password?");
      $('#password').prop("required", false);
			$('#firstName').val(data.firstName);
      $('#lastName').val(data.lastName);
			$('.modal-title').html("Edit User");
      $("#action").val("Update");
			$('#save').val('Update');

});


//DELETE RECORD                    
$("#user").on('click', '.delete', function(){
      var id = $(this).attr("data-id");
      var tr = $(this).closest('tr');
      var data = table.row(tr).data();
      var name = `${data.firstName} ${data.lastName}`;
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
              if(!result) return;
             	$.ajax({
            		url:"http://192.168.3.69/api/user/"+data._id,
            		method: "DELETE",
            		data:"",
            		success:function(data){				
            			table.ajax.reload();
                  roadshowAlert("Successfully Removed User: "+name, true);
            		},
               error:function(){
                  roadshowAlert("There was an error deleting "+name, false);
                  
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