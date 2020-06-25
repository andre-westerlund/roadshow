<?php
 $pageTitle = "Agents";
 $showNavBar = true;
 include('partial/header.php')
?>

<div id="recordModal" class="modal fade">
  <div class="modal-dialog">
   <form method="post" id="recordForm">
      <div class="modal-content">
         <div class="modal-header">
            <h4 class="modal-title">Add New Agent</h4>
         </div>
         <div class="modal-body">
            <input type="hidden" class="form-control" 
               id="id">  
               <input type="hidden" class="form-control" 
               id="oldCode">  
           <div class="form-group">
            <label for="code" class="control-label">Agent Code</label>
            <input type="text" class="form-control" 
               id="code" name="code" placeholder="Agent Code" required> 
			     </div>
           <div class="form-group">
            <label for="password" class="control-label">Agent Password</label>
            <input type="text" class="form-control" 
               id="password" name="password" placeholder="Agent Password" required> 
			     </div>
            <div class="form-group">
            <label for="firstName" class="control-label">First Name</label>
            <input type="text" class="form-control" 
               id="firstName" name="firstName" placeholder="First Name" required> 
			     </div>

         <div class="form-group">
            <label for="lastName" class="control-label">Last Name</label>                            
            <input type="text" class="form-control" 
               id="lastName" name="lastName" placeholder="Last Name">                            
         </div>

         <div class="form-group">
            <label for="dateJoined" class="control-label">Date Joined</label>                            
            <input type="date" class="form-control" 
               id="dateJoined" name="dateJoined" placeholder="Date Joined">                            
         </div>
          <div class="form-group">
            <label for="lead">Lead</label>
            <select name="lead" class="form-control" id="lead">
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

<link rel="stylesheet" href="public/js/datatables/datatables.min.css">
<link rel="stylesheet" href="public/js/datatables/Buttons-1.6.2/css/buttons.dataTables.min.css">

<div class="container my-5">
<div id="alert" class="alert alert-dismissible fade" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<?php
echo "<h1 class='h1 text-center my-5'>" . $pageTitle . "</h1>";
?>
   <div class="row">
      <div class="col">
        <button class="btn btn-info btn-lg my-2 float-right newAgent" data-toggle="modal" data-target="#recordModal">New</button>
      </div>
    </div>
    <table id="agent" class="table table-bordered">
      <thead>
        <tr>
          <th class="d-none" scope="col">ID</th>
          <th scope="col">Code</th>          
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>          
          <th scope="col">Date Joined</th>
          <th scope="col">Lead</th>
          <th scope="col" class="no-sort">Edit</th>
          <th scope="col" class="no-sort">Delete</th>
        </tr>
      </thead>
    </table>
</div>


<?php include('partial/footer.php'); ?>

<script type="text/javascript" src="public/js/datatables/datatables.min.js"></script>
<script type="text/javascript" src="public/js/datatables/Buttons-1.6.2/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="public/js/bootbox.min.js"></script>
<script type="text/javascript" src="js/agent.js"></script>