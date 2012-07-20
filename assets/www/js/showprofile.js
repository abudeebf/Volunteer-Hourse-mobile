 $(document).ready(function() {
  showprofile();
 
});

function showprofile()
{
var page = $("#im");
	 var options = '';      
	 var j=JSON.parse(sessionStorage.getItem('user')).events;
	 for (var i = 0; i <j.length; i++) 
	 {    
	  options += '<option id=' + i +' value="' + j[i].title + '">' + j[i].title + '</option>';
	
	 }    
	  $("select#event1",page).html(options); 
	  $("select#event1",page).val( $("select#event1",page).find("option#0") );
      $("#x", page).html( " You sign in as " + JSON.parse(sessionStorage.getItem('user')).name );
};