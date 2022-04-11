// Variables

var count = 0;
var time = 60;
var marks = 0;
var answer = [];
var timer;

// main ready function

$(document).ready(function(){
    $('#finish').hide();
    $('#Result').hide();
    $('#highscore').hide();
    

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
    // Create Question Function
    function adding_Questions(data,i){
        $('#question').text(data[i].Quiz)
        $('#options1').text(data[i].option1)
        $('#options2').text(data[i].option2)
        $('#options3').text(data[i].option3)
        $('#options4').text(data[i].option4)
        
    }

    // Answer Selection Function

    function selected_Answer(){
        for(var i =0; i<4; i++){
            var a = document.getElementById("options").children;
            console.log(a[i].innerHTML);
            console.log(answer[count])
            if(a[i].innerHTML == answer[count]){
                
                $('#options').children("button")[i].classlist.add('active');
            }
            else{
                $('#options').children("button")[i].classlist.remove('active');
            }
        }
    }
    function creating_Result(data){
        for(var i = 0; i < answer.length; i++){
            marks += 5
        }
        $('#main').hide();
        $('#marks').text(marks);
        $('#correct-answer').text(marks / 5);
        $('#percentage').text((marks / 25)* 100 + "%");

        $('#Result').show();
    }
    $('#options').hide();

    // Attach API


    fetch('data.json')
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        $('#btn').click(function() {
            $('#options').show();
            adding_Questions(data.Questions,count);
            $('.start_page').hide();
            $('#prev').hide()

            timer = setInterval(timer_function , 1000);

            function timer_function(){
                $('#time').text(time);
                if(time < 1){
                    clearInterval(timer);
                    alert("out of time");
                    creating_Result(data);
                    $('#main').hide();
                    $('#Result').show();
                }
                time--;
            }
        });
        // Select Options
        $(".option").click(function(){

            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            answer[count] = $(this).html();
        })

        // Next Questions

        $('#next').click(function() {
            if(count > answer.length - 1){
                alert("Select atleast 1 Option")
            }
            else{
                count++;
                adding_Questions(data.Questions, count);
                $('#prev').show();
                $('.option').removeClass('active');
                buttons_manager();
                selected_Answer();
            }
        })
        // Previous Questions
        $('#prev').click(function(){
            count--;
            adding_Questions(data.Questions, count);
            buttons_manager();
            selected_Answer();
        })

        // Finish Quiz
        $('#finish').click(function(){
            if(count > answer.length -1){
                alert("Select atleast 1 option");
            }
            else{
                creating_Result(data);
                clearInterval(timer);
            }
        });


    })
})