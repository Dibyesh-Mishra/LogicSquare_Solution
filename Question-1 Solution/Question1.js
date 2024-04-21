function generateStudentMarkSheets(students, details) {
    var studentsMarkSheets = [];

    for (var i = 0; i < students.length; i++) {
        var student = students[i];
        var studentMarkSheet = {};
        var totalMarks = 0;

        for (var j = 0; j < details.length; j++) {
            var detail = details[j];
            if (detail.Roll === student.Roll) {
                studentMarkSheet = {
                    name: student.name,
                    Roll: student.Roll,
                    math: detail.subjects.math,
                    english: detail.subjects.english,
                    chemistry: detail.subjects.chemistry,
                    computer: detail.subjects.computer
                };
                totalMarks = Object.values(detail.subjects).reduce(function(acc, ele) {
                    return acc + ele;
                });
                break;
            }
        }

        var status = totalMarks >= 200 ? "pass" : "fail";

        studentMarkSheet.total = totalMarks;
        studentMarkSheet.status = status;

        studentsMarkSheets.push(studentMarkSheet);
    }

    return studentsMarkSheets;
}

var students = [
    { name: "Dhishan Debnath", Roll: 1 },
    { name: "Animesh Gupta", Roll: 2 },
    { name: "Tapas Sen", Roll: 3 },
    { name: "Misti Dutta", Roll: 4 },
    { name: "Chini Misra", Roll: 5 }
];

var details = [
    { Roll: 5, subjects: { math: 35, english: 56, chemistry: 76, computer: 68 } },
    { Roll: 3, subjects: { math: 33, chemistry: 12, computer: 50, english: 35 } },
    { Roll: 1, subjects: { math: 55, english: 75, chemistry: 76, computer: 94 } },
    { Roll: 4, subjects: { english: 12, chemistry: 85, computer: 68, math: 45 } },
    { Roll: 2, subjects: { math: 55, english: 56, computer: 48, chemistry: 12 } }
];

var studentsMarkSheets = generateStudentMarkSheets(students, details);
console.log(studentsMarkSheets);