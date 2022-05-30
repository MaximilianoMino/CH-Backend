const StudentDAO = require("../dao/models/student.model");
const student = new StudentDAO();

exports.studentController = async(req, res, next) => {
    try {
        await student.createStudent(req.body);
        console.log("Controller");

        res.status(200).json({
            msg: "Student create",
            ...req.body,
        });
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};

exports.getAllStudents = async(req, res, next) => {
    console.log("Controller");
    const studentsList = await student.getAllStudents();

    try {
        console.log(studentsList);

        const { msg, status, students, error } = studentsList;

        res.status(status).json({
            msg,
            students,
            error,
        });
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};

exports.getStudentById = async(req, res, next) => {
    try {
        const response = await student.getStudentById(req.params.id);

        const { msg, status, studentRetrieved, error } = response;

        res.status(status).json({
            msg,
            studentRetrieved,
            error,
        });
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};

exports.updateStudent = async(req, res, next) => {
    console.log(req.body);

    try {
        console.log("Controller");
        const response = await student.updateStudent(req.params.id, req.body);

        const { msg, status, studentUpdatedRetrieved, error } = response;

        res.status(status).json({
            msg,
            studentUpdatedRetrieved,
            error,
        });
        return response;
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};

exports.deleteStudent = async(req, res, next) => {
    try {
        const response = await student.deleteStudent(req.params.id);

        const { status, msg, error } = response;

        res.status(status).json({
            msg,
            error,
        });
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};