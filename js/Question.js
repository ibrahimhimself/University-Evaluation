let arrayOfQus=[
"ما تقييمك للجامعة من حيث المرافق ؟",
"ما تقييمك للجامعة من حيث هيئة الشئون ؟",
"ما تقييمك للجامعة من حيث المستوى التعليمي ؟",
"ما تقييمك للجامعة من حيث الأنشطة الثقافية ؟",
"ما تقييمك للجامعة من حيث الأنشطة الترفيهية ؟",
"ما تقييمك للجامعة من حيث الأنشطة الإجتماعية ؟",
"ما تقييمك للجامعة من حيث الأنشطة الرياضية ؟",
"ما تقييمك للجامعة من حيث مساكن الطلبة ؟",
"ما تقييمك للجامعة من حيث أعضاء هيئة التدريس ؟",
"ما تقييمك للجامعة من حيث الخدمات المكتبية ؟"
]           //مصفوفه شايلة الأسئلة

let inpValues=[];

// let inpList=[];

let AVG;

let step = 0;

let nextQus = document.getElementById("Q-Next");

let prevQus = document.getElementById("Q-Prev");

let exitQus = document.getElementById("Q-Exit");

let numInp = document.getElementById("Inp");

let sn = document.getElementById("collage");

let userName = document.getElementById("Name");

if(localStorage.getItem("avgArr") == null){

    var avgArr = [] ;

} else{

    var avgArr = JSON.parse(localStorage.getItem("avgArr"));

}
function displayQuestion(){
  
    let str =
    `
    <div class="jumbotron" id="Q1">
    <p class=" count bg-secondary "> Q ${step+1} of ${arrayOfQus.length}</p>
    <h1 class="display-4"> قيم من 1 - 10 !</h1><br><br>
    <p class="lead" id="lead" style="font-size: 24px;"> ${arrayOfQus[step]}</p>
    <hr class="my-4">           
    </div>
    `;

    document.getElementById("row").innerHTML=str;
}   //دالة لإظهار الأسئلة 

displayQuestion();

function next(){
    step++;
    //this is  if condition
    if(numInp.value=="")
    {
        alert("please enter any value");
        step=0;
    }
    else if(numInp.value>10)
    {
        alert("use a number between 1-10");
        step=0;
    }
    else if(numInp.value<1)
    {
        alert("use a number between 1-10");
        step=0;
    }
    else
    {
        //this is other  if condition
        if(step > arrayOfQus.length-1){

            exitQus.style.display = "inline";
            sn.style.display = "inline";
            userName.style.display = "inline";
            prevQus.classList.add("disabled"); 
            nextQus.classList.add("disabled");
            numInp.style.display="none";
            nextQus.setAttribute("disabled",true);
            document.getElementById("row").classList.add("d-none");
        }
        else
        {
            nextQus.classList.remove("disabled");
            nextQus.removeAttribute("disabled");
            exitQus.style.display = "none";
            sn.style.display = "none";
            userName.style.display = "none";
            numInp.style.display="block";
            numInp.classList.add("focus");
            document.getElementById("row").classList.remove("d-none");
        }
        prevQus.classList.remove("disabled")
        displayQuestion()
        inpValues.push(numInp.value);
        numInp.value="";
        numInp.classList.add("focus");
        // console.log(inpValues)
        // localStorage.setItem("inpValuesData", JSON.stringify(inpValues));
    }  
}

function prev(){   
    step--;
    if(step < 0){
        step = 0;
        prevQus.classList.add("disabled");
        nextQus.setAttribute("disabled",true);
    }
    else{
        prevQus.classList.remove("disabled");
        nextQus.setAttribute("disabled",false);
    }
    displayQuestion()
    nextQus.removeAttribute("disabled");
    nextQus.classList.remove("disabled");
    exitQus.style.display = "none";
    sn.style.display = "none";
    userName.style.display = "none";


    document.getElementById("result").innerHTML="";
    document.getElementById("row").classList.remove("d-none");
    numInp.style.display="block";
}

function calculateAvg(){
    let start=0;
    for(let i = 0; i < inpValues.length ; i++ ){
        start+=Number(inpValues[i]);
    }
    AVG=start/inpValues.length
    exitQus.style.display="none";
    sn.style.display = "none";
    userName.style.display = "none";

    var SingleRating = {};
    SingleRating['School'] = sn.value;
    SingleRating['value'] = AVG;
    SingleRating['Name'] = userName.value;
    avgArr.push(SingleRating);
    localStorage.setItem("avgArr", JSON.stringify(avgArr));
    // localStorage.setItem("inpValuesData", JSON.stringify(inpValues));
    console.log(AVG)  
}   
//دالة لحساب المتوسط الخاص بالإجابات   

function displayResult() {
 
    // console.log(inpValues);
    calculateAvg()
    var str2 ="";
    for(var i=0 ; i<avgArr.length;i++){
        str2 += 
        `
        <div class="progress mb-3 font-weight-bold text-warning">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${avgArr[i].value*10}%" aria-valuenow="${avgArr[i].value*10}" aria-valuemin="0" aria-valuemax="100">${Math.floor(avgArr[i].value*10)} % ${avgArr[i].Name} تقييمك
             لجامعه  ${avgArr[i].School} هو
            </div>
        </div>
        `
    }
    inpValues.push(numInp.value);
    numInp.value="";
    console.log(inpValues);
    document.getElementById("result").innerHTML=str2;  
    prevQus.classList.add("disabled"); 
    prevQus.setAttribute("disabled",true);
    // console.log(inpList);
}