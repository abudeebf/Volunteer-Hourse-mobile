function approval()
{
	 var event1=$("input.event_id",page).val();
   
   var attend=new Array();
   var startime=new Array();
   var endtime=new Array();
   var users=new Array();
		$("input.mybox",page).each(function(index) {	
     attend[index]= $(this).is(':checked');
     });
  
   $("input.i",page).each(function(index){
    startime[index]=$(this).val();
    });
  
    $("input.i2",page).each(function(index){
    endtime[index]=$(this).val();
    });
   $("input.userid",page).each(function(index){
    users[index]=$(this).val();
    });
   
    
    $.post("https://volunteerhours-org.herokuapp.com/confirm_participants.json", 
		        {
		         "users":users,
		         "attend":attend,
		         "starttime":startime,
		         "event":event1,
		         "endtime":endtime
		         }, 
		        function(res,code) {
		            alert("participation confirmed successfully"); 
		           	});               
}