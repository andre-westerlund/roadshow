<?php
$pageTitle  = "Leads";
$showNavBar = true;
include('partial/header.php');
?>

<link rel="stylesheet" href="public/js/datatables/datatables.min.css">
<link rel="stylesheet" href="public/js/datatables/Buttons-1.6.2/css/buttons.dataTables.min.css">

<div id="recordModal" class="modal fade">
  <div class="modal-dialog">
   <form method="post" id="recordForm">
      <div class="modal-content">
         <div class="modal-header">
            <h4 class="modal-title">Add New Lead</h4>
         </div>
         <div class="modal-body">
            <input type="hidden" class="form-control" 
               id="id" name="id">           
            <div class="form-group">
            <label for="name" class="control-label">First Name</label>
            <input type="text" class="form-control" 
               id="firstName" name="firstName" placeholder="First Name" required> 
      			</div>
            <div class="form-group">
            <label for="lastName" class="control-label">Last Name</label>
            <input type="text" class="form-control" 
               id="lastName" name="lastName" placeholder="Last Name" required> 
      			</div>
         <div class="form-group">
            <input type="hidden" id="action" name="action">   
            <div class="modal-footer">
               <input type="submit" name="save" id="save" 
                  class="btn btn-info" value="Save" />
               <button type="button" class="btn btn-default" 
                  data-dismiss="modal">Close</button>
            </div>
         </div>
        </div>
		</div>
   </form>
</div>
</div>

<div class="container my-5">
<div class="alert" role="alert">
</div>
<?php
echo "<h1 class='h1 text-center my-5'>" . $pageTitle . "</h1>";
?>
   <div class="row">
      <div class="col">
        <button class="btn btn-info btn-lg my-2 float-right newLead" data-toggle="modal" data-target="#recordModal">New</button>
      </div>
    </div>
    <table id="lead" class="table table-bordered">
      <thead>
        <tr>
          <th class="d-none" scope="col">ID</th>
          <th scope="col">First Name</th>          
          <th scope="col">Last Name</th>
          <th scope="col">List of Agents</th>     
          <th class="no-sort" scope="col"></th>
          <th class="no-sort" scope="col"></th>
        </tr>
      </thead>
    </table>
</div>
<?php
include('partial/footer.php');
?>

<script type="text/javascript" src="public/js/datatables/datatables.min.js"></script>
<script type="text/javascript" src="public/js/datatables/Buttons-1.6.2/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="public/js/bootbox.min.js"></script>
<script type="text/javascript" src="js/lead.js"></script>