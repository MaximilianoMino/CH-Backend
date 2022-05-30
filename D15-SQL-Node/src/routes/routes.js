const {
    studentController,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
} = require("../controller/student.controller");

module.exports = (router) => {
    router.post("/api/student/", studentController);
    router.get("/api/students/", getAllStudents);
    router.get("/api/student/:id", getStudentById);
    router.patch("/api/student/:id", updateStudent);
    router.delete("/api/student/:id", deleteStudent);

    return router;
};