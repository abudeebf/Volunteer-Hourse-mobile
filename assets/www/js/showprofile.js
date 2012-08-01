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
	  options += '<option id=' + j[i].id +' value="' + j[i].title +" "+ j[i].starttime.substr(0,j[i].starttime.indexOf("T")) + '">' + j[i].title + " "+j[i].starttime.substr(0,j[i].starttime.indexOf("T")) + '</option>';
	 }    
	  $("select#event1",page).html(options); 
	  $("select#event1",page).attr('selected', true);
	   $("select#event1",page).selectmenu("refresh", true);
	  
      $("#x", page).html(" welcome " + JSON.parse(sessionStorage.getItem('user')).name );
      var email=JSON.parse(sessionStorage.getItem('email')).toLowerCase().trim(); 
      
       var hash=CryptoJS.MD5(email);
       grav="http://www.gravatar.com/avatar/"+hash+".jpg";
       $("#gravi",page).html('<img src='+grav+'/>');
};