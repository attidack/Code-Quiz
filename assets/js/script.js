// Variables

var count = 0;
var time = 30;
var marks = 0;
var answer = [];
var timer;

// main ready function

$(document).ready(function(){
    $('#finish').hide();
    $('#Result').hide();
    $('highscore').hide();

    buttons_manager();

// Create Function
    function buttons_manager(){
        if(count > 0){
            $('#prev').show;
            if(count == 4){
                $('#next').hide();
                $('#finish').show();
            }
            else{
                $('#next').show();
            }
        }
        else {
            $('#prev').hide();
        }
    }

    function adding_Questions(data,i){
        
    }
})