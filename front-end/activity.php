<?php
 $pageTitle = "Activity";
 $showNavBar = true;
 include('partial/header.php');
?>

<link rel="stylesheet" href="public/js/datatables/datatables.min.css">
<link rel="stylesheet" href="public/js/datatables/Buttons-1.6.2/css/buttons.dataTables.min.css">

<div class="container my-5">

<?php
echo "<h1 class='h1 text-center my-5'>" . $pageTitle . "</h1>";
?>

   <div class="row">
    </div>
    <div  class="row input-daterange">
          <div class="col-md-4">
          <input type="date" name="from_date" id="min-date" class="form-control">   
          </div>
      
          <div class="col-md-4">
            <input type="date" name="to_date" id="max-date" class="form-control">   
          </div>
          
          <div class="col-md-4">
            <button type="button" id="filter" name="filter" class="btn btn-primary">Filter</button>
            <button type="button" id="refresh" name="refresh" class="btn btn-default">Refresh</button>   
          </div>
    </div>
    <table id="activity" class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Activity Date</th>          
          <th scope="col">Lead Name</th>
          <th scope="col">Agent Name</th>          
          <th scope="col">Agent Code</th>
          <th scope="col">Agent Date of Joining</th>
          <th scope="col">Agent Type</th>
          <th scope="col">Village</th>
          <th scope="col">District</th>
          <th scope="col">Free Credit</th>
          <th scope="col">Type</th>
          <th scope="col">Customer Name</th>
          <th scope="col">Old Number</th>
          <th scope="col">New Vodafone Number</th>
          <th scope="col">Paid Top up</th>
          <th scope="col">Device Type</th>
          <th scope="col">Handset Model</th>
          <th scope="col">Handset Price</th>
          <th scope="col">Free Offer</th>
     
        </tr>
      </thead>
    </table>
</div>

<?php include('partial/footer.php'); 
?>

<script type="text/javascript" src="public/js/datatables/datatables.min.js"></script>
<script type="text/javascript" src="public/js/datatables/Buttons-1.6.2/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="public/js/bootbox.min.js"></script>

<script type="text/javascript" src="public/js/moment.min.js"></script>
<script type="text/javascript" src="js/activity.js"></script>

