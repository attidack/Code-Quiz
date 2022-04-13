// Variables

var count = 0;
var time = 45;
var score = 0;
var answer = [];
var quizResults = [];
var timer;
const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const highScoresList = document.querySelector('#highScoresList')




// main ready function
$(document).ready(function(){
    $('#finish').hide();
    $('#Result').hide();
    $('#leaderBoard').hide();
    $('#answerValid').hide();
    $('#highScorePrompt').hide();
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
        
        // Save Highscores
        saveHighScore = e => {
            const mostRecentScore = localStorage.getItem('mostRecentScore')
            const highScores = JSON.parse(localStorage.getItem('highScores')) || []
            finalScore.innerText = mostRecentScore
            e.preventDefault()
            if(username.value == "" || username.value == null){
                alert('please enter your initals or name')
            }else{
                const leaderBoardList = {
                    score: mostRecentScore,
                    name: username.value
                }
                highScores.push(leaderBoardList)

                highScores.sort((a,b) => {
                    return b.score - a.score
                })
                highScores.splice(10)
                localStorage.setItem('highScores', JSON.stringify(highScores))
                $('#highScorePrompt').hide()
                loadHighScores()
            }
        }

        // load High Scores
        function loadHighScores(){
            const highScores = JSON.parse(localStorage.getItem('highScores'))
            highScoresList.innerHTML = 
                highScores.map(score => {
                    return `<li class="list-group-item" aria-current="true">${score.name} - ${score.score}</li>`
                }).join('')
            if(score.name == username.value && score.score == mostRecentScore){
                highScoresList.className = " active";
            }
            $('#leaderBoard').show();
        }

        // End of quiz score page logic
        function creating_Result(data){
            $('#answerValid').hide();
            $('#timer').hide();
            $('#main').hide();
            $('#timeLeft').text(time += 1) 
            $('#correct-answer').text(score);
            $('#percentage').text((score / answer.length)* 100 + "%");
            score = score * time
            localStorage.setItem('mostRecentScore', score)
            $('#finalScore').text(score);
            $('#numberOfQuestions').text(data.Questions.length)
            $('#Result').show();
            $('#highScorePrompt').show();
            loadHighScores()
        }
        $('#options').hide();

        // Select question answers
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

        // top highscore link function
        $("#highScoreLink").click(function(){
            $('#answerValid').hide();
            $('#timer').hide();
            $('#main').hide();
            $('.start_page').hide();
            loadHighScores()
        });

        //home reload function
        $("#homeLink").click(function(){
            location.reload(); 
        });
    })
})
