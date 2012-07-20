
function showParticipant()
{
  var page = $("#im");
sessionStorage.setItem('event', JSON.stringify($("select#event1",page).val()));
$.post("http://volnteerhours.herokuapp.com/eparticipant.json",
        {
           "eventtitle":$("select#event1",page).val(),
           "euser":JSON.parse(sessionStorage.getItem('user')).events[0].user_id
         }, 
		   function(res,code) {
		    sessionStorage.setItem('users',JSON.stringify(res)); 
        
             window.location="participant.html";
            });
         }
