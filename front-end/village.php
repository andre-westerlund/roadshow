<?php
$pageTitle  = "Villages";
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
            <h4 class="modal-title">Add New Village</h4>
         </div>
         <div class="modal-body">
            <input type="hidden" class="form-control" 
               id="id" name="id">  
            <input type="hidden" class="form-control" 
               id="code" name="code">            
            <div class="form-group">
            <label for="name" class="control-label">Name</label>
            <input type="text" class="form-control" 
               id="name" name="name" placeholder="Name" required> 
			</div>

         <div class="form-group">
            <label for="district" class="control-label">District</label>                            
            <input type="text" class="form-control" 
               id="district" name="district" placeholder="District">                            
         </div>
         <div class="form-group">
            <label for="type">Type:</label>
            <select name="type" class="form-control" id="type">
               <option>CBD</option>
               <option>RURAL</option>
            </select>
         </div>
         <div class="form-group">
            <label for="island">Island:</label>
            <select name="island" class="form-control" id="island">
               <option>UPOLU</option>
               <option>SAVAII</option>
               <option>MANONO</option>
               <option>APOLIMA</option>
            </select>
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
        <button class="btn btn-info btn-lg my-2 float-right newVillage" data-toggle="modal" data-target="#recordModal">New</button>
      </div>
    </div>
    <table id="village" class="table table-bordered">
      <thead>
        <tr>
          <th class="d-none" scope="col">ID</th>
          <th scope="col">Code</th>          
          <th scope="col">Name</th>
          <th scope="col">District</th>          
          <th scope="col">Type</th>
          <th scope="col">Island</th>
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
<script type="text/javascript" src="js/village.js"></script>


