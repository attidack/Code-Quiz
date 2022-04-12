// Variables

var count = 0;
var time = 60;
var score = 0;
var answer = [];
var quizResults = [];
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
        quizResults= data[i].answer
        $('#question').text(data[i].Quiz)
        $('#options1').text(data[i].option1)
        $('#options2').text(data[i].option2)
        $('#options3').text(data[i].option3)
        $('#options4').text(data[i].option4)
        
        
    }

    // Attach API


    fetch('data.json')
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        quizResults.push(...data.Questions)
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
            // Answer Selection Function

    function selected_Answer(data){
        if(answer[count]== quizResults){
            console.log(answer[count]);
            console.log(quizResults)
            score += 1
        }
        else{
            time = time-10
            console.log('looser')
        }  
        
    }
    function creating_Result(data){
        
        $('#timer').hide();
        $('#main').hide();
        $('#timeLeft').text(time += 1)
        $('#score').text(score * time);
        $('#numberOfQuestions').text(answer.length)
        $('#correct-answer').text(score);
        $('#percentage').text((score / answer.length)* 100 + "%");

        $('#Result').show();
    }
    $('#options').hide();

        // Select Options
        $(".option").click(function(){
            $(this).addClass('btn-selected');
            $(this).siblings().removeClass('btn-selected');
            answer[count] = $(this).html();  
        
            if(answer[count]== quizResults){
                console.log('winner');
            }
            else{
                console.log('looser')
            }     
        })
        
        // Next Questions

        $('#next').click(function() {
            if(count > answer.length - 1){
                alert("Select atleast 1 Option")
            }
            else{
                selected_Answer();
                count++;
                $('#prev').show();
                $('.option').removeClass('btn-selected');
                adding_Questions(data.Questions, count);
                buttons_manager();
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
                selected_Answer();
                creating_Result(data);
                clearInterval(timer);
            }
        });


    })
})