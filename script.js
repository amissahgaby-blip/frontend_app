// Wait for the DOM content to completely load before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    // Select elements related to the theme toggle functionality
    const themeSwitch = document.getElementById('theme-switch');
    const root = document.documentElement; // the <html> element

    // Retrieve saved theme preference from local storage (if any)
    const savedTheme = localStorage.getItem('theme');
    switch (savedTheme) {
        case 'dark':
            root.setAttribute('data-theme', 'dark');
            themeSwitch.checked = true;
            break;
        case 'light':
            root.removeAttribute('data-theme');
            themeSwitch.checked = false;
            break;
        default:
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                root.setAttribute('data-theme', 'dark');
                themeSwitch.checked = true;
            }
            break;
    }

    // Listen for changes on the theme switch checkbox to toggle dark/light mode
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); // Save user preference
        } else {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    // JSON Data Structure containing all quizzes and their respective questions.
    // This acts as the local "database" of questions for the app.
    const quizData = {
        "quizzes": [
          {
            "id": "html",
            "title": "HTML",
            "icon": "html",
            "questions": [
              { "id": 1, "question": "What does HTML stand for?", "options": [ { "id": "A", "text": "HyperText Markup Language" }, { "id": "B", "text": "HighText Machine Language" }, { "id": "C", "text": "Hyper Transfer Markup Language" }, { "id": "D", "text": "Home Tool Markup Language" } ], "correctAnswer": "A" },
              { "id": 2, "question": "Which HTML tag is used to define an image?", "options": [ { "id": "A", "text": "<image>" }, { "id": "B", "text": "<img>" }, { "id": "C", "text": "<src>" }, { "id": "D", "text": "<picture>" } ], "correctAnswer": "B" },
              { "id": 3, "question": "Which element is used for the largest heading?", "options": [ { "id": "A", "text": "<h6>" }, { "id": "B", "text": "<heading>" }, { "id": "C", "text": "<h1>" }, { "id": "D", "text": "<head>" } ], "correctAnswer": "C" }
            ]
          },
          {
            "id": "css",
            "title": "CSS",
            "icon": "css",
            "questions": [
              { "id": 1, "question": "What does CSS stand for?", "options": [ { "id": "A", "text": "Creative Style System" }, { "id": "B", "text": "Cascading Style Sheets" }, { "id": "C", "text": "Computer Style Syntax" }, { "id": "D", "text": "Colorful Style Sheets" } ], "correctAnswer": "B" },
              { "id": 2, "question": "Which property controls text size?", "options": [ { "id": "A", "text": "font-style" }, { "id": "B", "text": "text-size" }, { "id": "C", "text": "font-size" }, { "id": "D", "text": "text-style" } ], "correctAnswer": "C" },
              { "id": 3, "question": "How do you select an element with id 'main'?", "options": [ { "id": "A", "text": ".main" }, { "id": "B", "text": "#main" }, { "id": "C", "text": "main" }, { "id": "D", "text": "*main" } ], "correctAnswer": "B" }
            ]
          },
          {
             "id": "javascript",
            "title": "JavaScript",
            "icon": "javascript",
            "questions": [
              { "id": 1, "question": "Which keyword is used to declare a variable?", "options": [ { "id": "A", "text": "var" }, { "id": "B", "text": "int" }, { "id": "C", "text": "string" }, { "id": "D", "text": "letvar" } ], "correctAnswer": "A" },
              { "id": 2, "question": "Which method converts JSON to a JavaScript object?", "options": [ { "id": "A", "text": "JSON.stringify()" }, { "id": "B", "text": "JSON.parse()" }, { "id": "C", "text": "JSON.convert()" }, { "id": "D", "text": "JSON.toObject()" } ], "correctAnswer": "B" },
              { "id": 3, "question": "Which symbol is used for strict equality?", "options": [ { "id": "A", "text": "==" }, { "id": "B", "text": "=" }, { "id": "C", "text": "===" }, { "id": "D", "text": "!=" } ], "correctAnswer": "C" }
            ]
          },
          {
            "id": "accessibility",
            "title": "Accessibility",
            "icon": "accessibility",
            "questions": [
              { "id": 1, "question": "Which of these color contrast ratios defines the minimum WCAG 2.1 Level AA requirement for normal text?", "options": [ { "id": "A", "text": "4.5:1" }, { "id": "B", "text": "3:1" }, { "id": "C", "text": "2.5:1" }, { "id": "D", "text": "5:1" } ], "correctAnswer": "A" },
              { "id": 2, "question": "What does ARIA stand for?", "options": [ { "id": "A", "text": "Accessible Rich Internet Applications" }, { "id": "B", "text": "Advanced Responsive Interface API" }, { "id": "C", "text": "Application Role Interaction Access" }, { "id": "D", "text": "Accessible Rendering Interface Attributes" } ], "correctAnswer": "A" },
              { "id": 3, "question": "What is the purpose of the alt attribute in images?", "options": [ { "id": "A", "text": "To style the image" }, { "id": "B", "text": "To provide alternative text for screen readers" }, { "id": "C", "text": "To change image size" }, { "id": "D", "text": "To load images faster" } ], "correctAnswer": "B" }
            ]
          }
        ]
    };
  
    // Configuration object mapping each subject to its display text and SVG icon
    const subjectConfig = {
        html: { 
            title: 'HTML', 
            iconClass: 'icon-html', 
            svg: '<svg stroke="currentColor" fill="none" stroke-width="2.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>' 
        },
        css: { 
            title: 'CSS', 
            iconClass: 'icon-css', 
            svg: '<svg stroke="currentColor" fill="none" stroke-width="2.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><circle cx="12" cy="18" r="1.5" fill="currentColor"></circle><path d="M8 7v4a4 4 0 0 0 8 0V7"></path></svg>' 
        },
        javascript: { 
            title: 'Javascript', 
            iconClass: 'icon-js', 
            svg: '<svg stroke="currentColor" fill="none" stroke-width="2.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16v16H4z" stroke="none" fill="currentColor" fill-opacity="0.1" /><path d="M15 17c-2 0 -2 -2 -2 -2" /><path d="M15 11c1.5 0 2 .5 2 2s-.5 2 -2 2s-2 -.5 -2 -2" /><path d="M9 17c-2 0 -2 -2 -2 -2" /><path d="M9 11v6" /></svg>' 
        },
        accessibility: { 
            title: 'Accessibility', 
            iconClass: 'icon-acc', 
            svg: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></svg>' 
        }
    };
  
    // Select main view container elements
    const startMenu = document.getElementById('start-menu');
    const quizView = document.getElementById('quiz-view');
    const summaryView = document.getElementById('summary-view');
    
    // Select header elements for updating the current subject display
    const headerSubject = document.getElementById('header-subject');
    const headerIconBg = document.getElementById('header-icon-bg');
    const headerSubjectTitle = document.getElementById('header-subject-title');
  
    // State variables to track the current quiz session
    let currentSubjectInfo = null;
    let currentQuizQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let hasAnswered = false; // Tracks if the user has submitted an answer for the current question
  
    // Select dynamic elements within the quiz view
    const questionCountEl = document.getElementById('question-count');
    const questionTextEl = document.getElementById('question-text');
    const progressFillEl = document.getElementById('progress-fill');
    const optionBtns = document.querySelectorAll('.option-btn');
    const submitBtn = document.getElementById('submit-btn');
  
    // Add click listeners to all buttons on the start menu to begin a quiz
    const startButtons = document.querySelectorAll('.start-item');
    startButtons.forEach(button => {
        button.addEventListener('click', () => {
            const subject = button.getAttribute('data-subject');
            const config = subjectConfig[subject];
            const subjectData = quizData.quizzes.find(q => q.id === subject);
            
            if (config && subjectData) {
                currentSubjectInfo = config;
                currentQuizQuestions = subjectData.questions;
                currentQuestionIndex = 0;
                score = 0;
  
                headerSubject.style.visibility = 'visible';
                headerSubjectTitle.textContent = config.title;
                headerIconBg.className = `icon-bg ${config.iconClass}`;
                headerIconBg.innerHTML = config.svg;
                
                startMenu.style.display = 'none';
                if(summaryView) summaryView.style.display = 'none';
                quizView.style.display = 'grid';
  
                loadQuestion();
            }
        });
    });
  
    // Function to populate the UI with the current question and its options
    function loadQuestion() {
        hasAnswered = false; // Reset answered state for the new question
        const currentQuestion = currentQuizQuestions[currentQuestionIndex];
        
        // Update question text and progress indicator
        questionCountEl.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuizQuestions.length}`;
        questionTextEl.textContent = currentQuestion.question;
  
        const progressPercent = ((currentQuestionIndex) / currentQuizQuestions.length) * 100;
        progressFillEl.style.width = `${progressPercent}%`;
  
        optionBtns.forEach((btn, index) => {
            btn.classList.remove('selected', 'correct', 'incorrect');
            const optionData = currentQuestion.options[index];
            if (optionData) {
                btn.style.display = 'flex';
                btn.setAttribute('data-option', optionData.id);
                btn.querySelector('.option-letter').textContent = optionData.id;
                btn.querySelector('.option-text').textContent = optionData.text;
                
                const existingIcon = btn.querySelector('.icon-state');
                if(existingIcon) existingIcon.remove();
            } else {
                btn.style.display = 'none'; 
            }
        });
  
        submitBtn.textContent = 'Submit Answer';
        
        const errorMsg = document.getElementById('error-msg');
        if (errorMsg) errorMsg.style.display = 'none';
    }
  
    // Attach click listeners to each option button to handle user selections
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (hasAnswered) return; // Prevent changing answer after submission
            
            // visually highlight the selected option
            optionBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            const errorMsg = document.getElementById('error-msg');
            if (errorMsg) errorMsg.style.display = 'none';
        });
    });
  
    // Attach a click listener to the submit button
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const currentQuestion = currentQuizQuestions[currentQuestionIndex];
            const selectedBtn = document.querySelector('.option-btn.selected');
  
            // If the user hasn't submitted an answer yet
            if (!hasAnswered) {
                // Ensure the user actually selected an option
                if (!selectedBtn) {
                    let errorMsg = document.getElementById('error-msg');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-msg';
                        errorMsg.id = 'error-msg';
                        errorMsg.innerHTML = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 5a15 15 0 1 0 0 30 15 15 0 0 0 0-30zm0 25.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm2.5-9.4c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5v-7.6c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v7.6z" fill="#EE5454"/></svg> <span>Please select an answer</span>`;
                        submitBtn.parentNode.insertBefore(errorMsg, submitBtn.nextSibling);
                    }
                    errorMsg.style.display = 'flex';
                    return;
                }
  
                hasAnswered = true; // Lock-in the user's answer
                
                // Check if the selected option matches the correct answer
                const isCorrect = selectedBtn.getAttribute('data-option') === currentQuestion.correctAnswer;
  
                // SVG icons representing correct and incorrect answer feedback
                const checkIcon = `<img class="icon-state" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><circle cx='20' cy='20' r='14' fill='%2326D782'/><path fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' d='M14 20l4 4 8-8'/></svg>" />`;
                const crossIcon = `<img class="icon-state" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><circle cx='20' cy='20' r='14' fill='%23EE5454'/><path fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' d='M14 14l12 12m0-12L14 26'/></svg>" />`;
  
                if (isCorrect) {
                    selectedBtn.classList.add('correct');
                    selectedBtn.insertAdjacentHTML('beforeend', checkIcon);
                    score++;
                } else {
                    selectedBtn.classList.add('incorrect');
                    selectedBtn.insertAdjacentHTML('beforeend', crossIcon);
                    const correctBtn = Array.from(optionBtns).find(btn => btn.getAttribute('data-option') === currentQuestion.correctAnswer);
                    if (correctBtn) correctBtn.insertAdjacentHTML('beforeend', checkIcon);
                }
                submitBtn.textContent = 'Next Question';
            } else {
                // If it was already answered, clicking the button goes to the next question or summary
                currentQuestionIndex++;
                
                // Load next question if available, otherwise finish the quiz
                if (currentQuestionIndex < currentQuizQuestions.length) loadQuestion();
                else showSummary();
            }
        });
    }
  
    // Function to hide the quiz view and display the final score summary
    function showSummary() {
        quizView.style.display = 'none';
        
        if (summaryView) {
            summaryView.style.display = 'grid'; // Show the summary view section
            
            // Select summary UI elements
            const scoreNumber = document.getElementById('score-number');
            const scoreOutOf = document.getElementById('score-out-of');
            const summaryIconBg = document.getElementById('summary-icon-bg');
            const summarySubjectTitle = document.getElementById('summary-subject-title');
  
            if (scoreNumber) scoreNumber.textContent = score;
            if (scoreOutOf) scoreOutOf.textContent = `out of ${currentQuizQuestions.length}`;
            
            if (summarySubjectTitle && summaryIconBg) {
                summarySubjectTitle.textContent = "hello title";
                summaryIconBg.className = `icon-bg ${currentSubjectInfo.iconClass}`;
                summaryIconBg.innerHTML = currentSubjectInfo.svg;
            }
            progressFillEl.style.width = `100%`;
        }
    }
  
    // Delegate click event on the body to handle the "Play Again" button click
    document.body.addEventListener('click', (e) => {
        if (e.target.id === 'restart-btn') {
            // Reset the UI to show the start menu again
            if (summaryView) summaryView.style.display = 'none';
            startMenu.style.display = 'grid';
            headerSubject.style.visibility = 'hidden';
            currentSubjectInfo = null;
            score = 0;
            currentQuestionIndex = 0;
            progressFillEl.style.width = `0%`; 
        }
    });
});