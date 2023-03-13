
//Determine the gradeValuerade
function gradeValue(examScore){
    var gradeValue
    //Determin the grade Value of the exam score....
    if (examScore >= 90) {
        gradeValue = 'A+';
    } else if (examScore >= 80) {
        gradeValue = 'A';
    }else if (examScore >= 70) {
        gradeValue = 'A-';
    } else if (examScore >= 65) {
        gradeValue = 'B+';
    } else if (examScore >= 63) {
        gradeValue = 'B';
    } else if (examScore >= 60) {
        gradeValue = 'B-';
    } else if (examScore >= 56) {
        gradeValue = 'C+';
    } else if (examScore >= 53) {
        gradeValue = 'C';
    } else if (examScore >= 56) {
        gradeValue = 'C-';
    } else if (examScore >= 40) {
        gradeValue = 'D';

    }  else {
        gradeValue = 'F';
    } 

    return gradeValue;

}

//Determine the grade point of the exam score
function gradePoint(examScore, creditHours){
    var gradePValue
    //Determin the gradePValue 
    if (examScore >= 90) {
        gradePValue = creditHours * 4.3;
    } else if (examScore >= 80) {
        gradePValue = creditHours * 4.0;
    }else if (examScore >= 70) {
        gradePValue = creditHours * 3.70;
    } else if (examScore >= 65) {
        gradePValue = creditHours * 3.5;
    } else if (examScore >= 63) {
        gradePValue = creditHours * 3.3;
    } else if (examScore >= 60) {
        gradePValue = creditHours * 3.0;
    } else if (examScore >= 56) {
        gradePValue = creditHours * 2.70;
    } else if (examScore >= 53) {
        gradePValue = creditHours * 2.50;
    } else if (examScore >= 56) {
        gradePValue = creditHours * 2.30;
    } else if (examScore >= 40) {
        gradePValue = creditHours * 1.70;
    }  else {
        gradePValue = 0;
    } 

    return gradePValue;
}


module.exports = {
    gradePoint, gradeValue
}