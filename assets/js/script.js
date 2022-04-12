// Variables

var count = 0;
var time = 45;
var score = 0;
var answer = [];
var quizResults = [];
var highScores = [];
var timer;


// main ready function
$(document).ready(function(){
    $('#finish').hide();
    $('#Result').hide();
    $('#highscore').hide();
    $('#answerValid').hide();
    $('#time').text(time);
    
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
            if(answer[count] == quizResults){
                console.log(answer[count]);
                console.log(quizResults)
                score += 1
                $('#answer').text('Correct!')
            }
            else{
                time = time-10
                $('#answer').text('Wrong answer, - 10 seconds from the clock!')
            }  
        }
        function highScore(){
            if(score > highScores.score){
                
                if(highScores.length > 5){
                    highScores.pop();
                }


            }
        }
        function creating_Result(data){
            $('#answerValid').hide();
            $('#timer').hide();
            $('#main').hide();
            $('#timeLeft').text(time += 1)
            $('#score').text(score * time);
            $('#numberOfQuestions').text(data.Questions.length)
            $('#correct-answer').text(score);
            $('#percentage').text((score / answer.length)* 100 + "%");
            $('#Result').show();
            $('#highscore').show();
        }
        $('#options').hide();

        // Select Options
        $(".option").click(function(){
            $(this).addClass('btn-selected');
            $(this).siblings().removeClass('btn-selected');
            answer[count] = $(this).html();  
            if(count > answer.length - 1){
                alert("Select atleast 1 Option")
            }
            else{
                selected_Answer();
                count++;
                $('#answerValid').show();
                $('.option').removeClass('btn-selected');
                if(answer.length == data.Questions.length){
                    clearInterval(timer);
                    creating_Result(data);                    
                }else{
                    adding_Questions(data.Questions, count);
                }
            }  
        });
    })
})