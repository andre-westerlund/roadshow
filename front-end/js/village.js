$(document).ready(function() {    
//LIST RECORDS
var table = $("#village").DataTable({
    ajax: {
      url: "http://192.168.3.69/api/village",
      dataSrc: "villages",
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
        { "data": "name" },
        { "data": "district" },
        { "data": "type" },
        { "data": "island" },
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
  $(".newVillage").click(function(){
    $('#recordForm')[0].reset();
   	$('#id').val("");
     $('#code').val("");
		$('#name').val("");
    $('#district').val("");
    $('#type').prop('selectedIndex',0);
    $('#island').prop('selectedIndex',0);
    $('.modal-title').html("New Village");
    $("#action").val("Add");
   	$('#save').val('Save');
  });
  
  $("#recordModal").on('submit','#recordForm', function(event){
  	  event.preventDefault();
      var action = $("#action").val();
      var method;
      var successMsg;
      var failMsg;
      var url = "http://192.168.3.69/api/village";
      if(action == "Update"){
          method = "PUT";
          var id = $('#id').val();
          url +="/"+id;
          successMsg = "Updated Village Successfully";
          failMsg = "There was an error updating the Village";
      }else if(action =="Add"){
          method = "POST";
          successMsg = "Village Added Successfully";
          failMsg = "There was an error adding the Village";
          var num = table.rows().count();
          if(Number(table.row(num-2).data().code) > Number(table.row(num-1).data().code)){
            num-=1;
          }              
          var newCode = Number(table.row(num-1).data().code)+1;
          $("#code").val(newCode);
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
$("#village").on('click', '.update', function(){
	    var id = $(this).attr("data-id");
      var tr = $(this).closest('tr');
      var data = table.row(tr).data();
      $('#recordModal').modal('show');
      $('#id').val(data._id);
      $('#code').val(data.code);
			$('#name').val(data.name);
	    $('#district').val(data.district);
      $('#type').val(data.type).change();
      $('#island').val(data.island).change();
			$('.modal-title').html("Edit Village");
      $("#action").val("Update");
			$('#save').val('Update');

});


//DELETE RECORD                    
$("#village").on('click', '.delete', function(){
      var id = $(this).attr("data-id");
      var tr = $(this).closest('tr');
      var data = table.row(tr).data();
      var name = data.name;
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
            		url:"http://192.168.3.69/api/village/"+data._id,
            		method: "DELETE",
            		data:"",
            		success:function(data){				
            			table.ajax.reload();
                  roadshowAlert("Successfully Removed Village: "+name, true);
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
