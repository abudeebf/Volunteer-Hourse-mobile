
function showParticipant()
{
  var page = $("#im");
sessionStorage.setItem('event', JSON.stringify($("select#event1",page).val()));
$.post("https://volunteerhours-org.herokuapp.com/eparticipant.json",
        {
           "eventtitle":$("select#event1",page).children(":selected").attr("id"),
           "euser":JSON.parse(sessionStorage.getItem('user')).events[0].user_id
         }, 
		   function(res,code) {
		    sessionStorage.setItem('users',JSON.stringify(res)); 
        
             window.location="participant.html";
            });
         }
