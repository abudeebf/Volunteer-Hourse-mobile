$(document).ready(function() {
  pouplate();
});
function pouplate()
{
	page= $("#participantpage");
var data=JSON.parse(sessionStorage.getItem('users'));
     var dlength=JSON.stringify(data['user'].length);
     var items = [];
     var x;
       items.push('<tr><th> Name </th><th>attending </th><th>start time </th><th> end time </th></tr>');
       items.push(' <form name="approve" action="https://volunteerhours-org.herokuapp.com/eparticipant.json" method="post">');
       for(i=0; i<dlength; i++) {
  		 x='<input type="checkbox" class="mybox" value='+ JSON.stringify(data['user'][i].attend)+' >';
       items.push('<tr><td>' + JSON.stringify(data['user'][i].name) +'<input class="userid" type="hidden"  value='+ JSON.stringify(data['user'][i].user_id) +'><input class="event_id" type="hidden"  value='+ JSON.stringify(data['user'][i].event_id)+ '></td><td>'+x+'</td><td><input class="i" value=' + JSON.stringify(data['user'][i].start_time)+'/></td><td><input class="i2" value=' + JSON.stringify(data['user'][i].end_time)+'/></td></tr>');
  		}
        items.push (  '</form>');
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
      
}