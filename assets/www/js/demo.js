$("#createsiginin").live("pagecreate", function(event) {
	var page = $("#createsiginin");
  if( sessionStorage.getItem('createsigin')!=null) return ;
  sessionStorage.setItem("createsignin","signin");
	$("#currentLink",page).live("click",function(e) {
	      $("#status", page).html(" calling remote server.........  ");
		   $.post("http://volnteerhours.herokuapp.com/msignin.json", 
		        {
		         "email":$("#email",page).val(),
		         "password":$("#password",page).val()
		         }, function(res,code) {
		             if( res.signin==true)
		             {
    			      sessionStorage.setItem('user', JSON.stringify(res)); 
                               $.mobile.changePage("profile.html");
		             }
		             else
		             {
			           $("#status", page).html("email  or password is not correct");
			         }     
			    });
		});
	});
$("#im").live("pagecreate", function(event) {

	 var page = $("#im");
	 var options = '';      
	 var j=JSON.parse(sessionStorage.getItem('user')).events;
	 for (var i = 0; i <j.length; i++) 
	 {       
	  options += '<option value="' + j[i].title + '">' + j[i].title + '</option>';  
	 }    
	  $("select#event").html(options);    
      $("#x", page).html( " You sign in as " + JSON.parse(sessionStorage.getItem('user')).name );
      $("#eventLink",page).live("click",function(e) {
        sessionStorage.setItem('event', JSON.stringify($("select#event",page).val()));
        $.post("http://volnteerhours.herokuapp.com/eparticipant.json",
        {
           "eventtitle":$("select#event",page).val(),
           "euser":JSON.parse(sessionStorage.getItem('user')).events[0].user_id
         }, 
		   function(res,code) {
		    sessionStorage.setItem('users',JSON.stringify(res)); 

             $.mobile.changePage("participant.html");
            });
         });
      });
	
	$("#participantpage").live("pagecreate", function(event) { 	
	 var data=JSON.parse(sessionStorage.getItem('users'));
     var dlength=JSON.stringify(data['user'].length);
     var items = [];
     var x;
       items.push('<tr><td> Name </td><td>attending </td><td>start time </td><td> end time </td></tr>');
       items.push(' <form name="approve" action=""http://volnteerhours.herokuapp.com/eparticipant.json"" method="post">');
       for(i=0; i<dlength; i++) {
  		 x='<input type="checkbox" class="mybox" value='+ JSON.stringify(data['user'][i].attend)+' >';
       items.push('<tr><td>' + JSON.stringify(data['user'][i].name) +'<input class="userid" type="hidden"  value='+ JSON.stringify(data['user'][i].user_id) +'><input class="event_id" type="hidden"  value='+ JSON.stringify(data['user'][i].event_id)+ '></td><td>'+x+'</td><td><input class="i" value=' + JSON.stringify(data['user'][i].start_time)+'/></td><td><input class="i2" value=' + JSON.stringify(data['user'][i].end_time)+'/></td></tr>');
  		}
        items.push (  '</form>');
  		page= $("#participantpage");
  		var htmlstring=items.join('');
  		$('table#participants',page).html(htmlstring);
  		
   
  		
  		$('input.mybox',page).each(function(index){
  		 if (($(this,page).val()) == 'true')
  		{ 
  		  $(this,page).attr("checked", "checked"); 
  		}
  		else
  		{
  		$(this,page).removeAttr("checked"); 
  		}
  		
  		});
  		$('#title',page).html(JSON.parse(sessionStorage.getItem('event')) + " Event");
  		$('#no',page).html("have " +dlength + " Participant");
        var now = new Date();
              $('input.i,input.i2',page).scroller({
                preset: 'datetime',
                theme: 'default',
                display: 'modal',
                mode: 'scroller',
                seconds: false,
                timeFormat: 'HH:ii',
                dateFormat: 'yyyy/mm/dd',
                ampm: false,
                stepMinute: 5,
                timeWheels :'HH:ii',
                width :50}); 
     $("input.i,input.i2",page).each(function(index){
     var d1 =($(this).val().substr(0,$(this).val().indexOf("T"))+ ' '+$(this).val().substr($(this).val().indexOf("T")+1,$(this).val().length)); 
     var d2=Date.parse(d1.substr(d1,d1.length-1));
       $(this).scroller('setDate',new Date(d2) , true) ;
    });
    $("#approve",page).live("click",function(e) {
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
   
    
    $.post("http://volnteerhours.herokuapp.com/confirm_participants.json", 
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
	});	 
	 
});