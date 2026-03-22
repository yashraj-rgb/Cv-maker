
const fieldMapping = {
    'nameInput': 'cvName',
    'titleInput': 'cvTitle',
    'contactInput': 'cvContact',
    'summaryInput': 'cvSummary',
    'linksInput': 'cvLinks',
    'eduInput': 'cvEdu',
    'skillsInput': 'cvSkills',
    'projectsInput': 'cvProjects',
    'expInput': 'cvExp' 
};

function updateCV(inputId, targetId) {
    const inputElement = document.getElementById(inputId);
    const targetElement = document.getElementById(targetId);

    if(inputElement.value.trim() === "") {
        targetElement.innerText = " "; 
    } else {
        targetElement.innerText = inputElement.value;
    }

    localStorage.setItem(inputId, inputElement.value);
}


function changeTemplate(templateName) {
    const cv = document.getElementById('cvDocument');
    
    cv.classList.remove('template-tech', 'template-elegant', 'template-startup', 'template-minimal', 'template-dark', 'template-accent');
    
  
    if(templateName !== 'base') {
        cv.classList.add(templateName);
    }

    localStorage.setItem('selectedTemplate', templateName);
}


window.onload = function() {
    
    for (const [inputId, targetId] of Object.entries(fieldMapping)) {
        const savedValue = localStorage.getItem(inputId);
        if (savedValue) {
            
            document.getElementById(inputId).value = savedValue;
            
            document.getElementById(targetId).innerText = savedValue;
        }
    }

   
    const savedTemplate = localStorage.getItem('selectedTemplate');
    if (savedTemplate) {
        changeTemplate(savedTemplate);
    }
}


function downloadPDF() {
    const element = document.getElementById('cvDocument');
    const userName = document.getElementById('nameInput').value || 'My';
    const fileName = `${userName}_Professional_CV.pdf`;

    const originalShadow = element.style.boxShadow;
    const originalRadius = element.style.borderRadius;
    element.style.boxShadow = 'none'; 
    element.style.borderRadius = '0px'; 

const opt = {
        margin:       0,
        filename:     'My_CV.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2, 
            useCORS: true, 
            scrollY: 0  
        }, 
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const btn = document.querySelector('.download-btn');
    const originalText = btn.innerText;
    btn.innerText = "Generating PDF...";
    btn.style.backgroundColor = "#4ade80"; 
    btn.style.color = "#000";

    html2pdf().set(opt).from(element).save().then(() => {
        element.style.boxShadow = originalShadow;
        element.style.borderRadius = originalRadius;
        btn.innerText = originalText;
        btn.style.backgroundColor = "";
        btn.style.color = "";
    });

window.onload = function() {

const inputIds = ['nameInput', 'titleInput', 'contactInput', 'summaryInput', 'expInput', 'linksInput', 'eduInput', 'skillsInput', 'projectsInput', 'personalInput'];
    
    inputIds.forEach(id => {
        const savedValue = localStorage.getItem(id);
        const inputElement = document.getElementById(id);
        
        if (savedValue && inputElement) {
            inputElement.value = savedValue;
            
            const event = new Event('input');
            inputElement.dispatchEvent(event);
        }
    });
};
}