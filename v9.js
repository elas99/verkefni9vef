(function() {
"use strict";
var questionnumber = 0;
var stig = 0;

/* DOM element */
	let elContainer = document.getElementById('container'); 	
	let stigafjoldi = document.getElementById('container'); 

/* Smiður fyrir spurningu */
	function Question(question, answers, correctAnswer) {
		this.question = question; 					/* Spurning (strengur) */
		this.answers = answers; 					/* fylki með svarmöguleikum */
		this.correctAnswer = correctAnswer; 		/* Rétt svar (strengur) */
	}

/* Gögn (fylki af objectum) */
	let questions = [
				new Question('Hvað er 40cm margir bananar', ['2', '400', '50', '1'], '2'),
				new Question('Hvort er 10kg steinn þýngri eða 10kg af fjöðrum', ['Fjaðrir', 'Steinn', 'Jafn Þungt'], 'Jafn Þungt'),
				new Question('Hvað er 5+5', ['10', '3'], '10'),
				new Question('Who you gonna call?', ['Bob', 'Jón', 'Ghost Busters', 'Mom'], 'Ghost Busters'),
		];
/* Shuffle questions */
	function shuffleArray(array) {
	 let m = array.length, t, i;
	 // While there remain elements to shuffle…
	 while (m) {
			 // Pick a remaining element…
			 i = Math.floor(Math.random() * m--);
			 // And swap it with the current element.
			 t = array[m];
			 array[m] = array[i];
			 array[i] = t;
	 }
	 // return array;  þurfum ekki að skila honum
	}
	// notum shuffle á fylkið með gögnunum (objects) 
	shuffleArray(questions);  

/* Template */
	Question.prototype.getTemplate = function(){
	 	let tmplAnswers = "";
	 	for(let i = 0; i < this.answers.length; i++) {
	 		   tmplAnswers += "<div>" + this.answers[i] + "</div>";
	 	}
	 	return "<h2>" + this.question + "</h2>" + tmplAnswers +"<br>";	
	};
	
function Stigafjoldirett()
	{
		return "Þú náðir " +stig+ " af "+questions.length+ " rétt <br> <a href='index.html'>Reyna Aftur</a>";
	}
/* Birtum spurningu ásamt svarmöguleikum úr fylkinu */
	elContainer.innerHTML = questions[questionnumber].getTemplate();

/*

 	Þegar notandi hefur smellt á einhvern svarmöguleika þá á viðkomandi svarmöguleiki að fá rauðan
	bakgrunnslit. Notað er Event object og Event Delegation til að ná þessu fram. 
*/
elContainer.addEventListener('click', function(e) {
if(questionnumber === questions.length)
{
	stigafjoldi.innerHTML = Stigafjoldirett();

}
else{

  if(e.target.nodeName.toLowerCase() === 'div') {

 		// bætum við css class
 		if(e.target.textContent === questions[questionnumber].correctAnswer)
 		{
 			e.target.className = "rett";
 			stig++;
    		setTimeout(function () {			
	    		questionnumber++;
	    			elContainer.innerHTML = questions[questionnumber].getTemplate();
	    		
			}, 200);
 		}
 		
 		
 		else{
 		e.target.className = "rangt";	
 		
    		setTimeout(function () {
	    		questionnumber++;
				elContainer.innerHTML = questions[questionnumber].getTemplate();	
			}, 200);			

 	}
 	
 		// svarmöguleiki birtur í console
 		window.console.log(e.target.textContent);
	}

}	
});


})();
