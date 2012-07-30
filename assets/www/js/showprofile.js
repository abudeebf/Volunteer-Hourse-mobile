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
	  $("select#event1",page).attr('selected', true);
	   $("select#event1",page).selectmenu("refresh", true);
	  
      $("#x", page).html(JSON.parse(sessionStorage.getItem('user')).name );
      var email=JSON.parse(sessionStorage.getItem('email')).toLowerCase().trim(); 
      
       var hash=CryptoJS.MD5(email);
       grav="http://www.gravatar.com/avatar/"+hash+".jpg";
       $("#gravi",page).html('<img src='+grav+'/>');
};