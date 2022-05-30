const db = require("../db/db");

module.exports = class StudentDAO {
    async createStudent(student) {
        let { firstName, lastName, email } = student;
        const studentInserted = await db("student").insert({
            firstName,
            lastName,
            email,
        });

        return studentInserted;
    }

    async getAllStudents() {
        const students = await db.select("*").from("student");
        try {
            let response;

            if (students) {
                console.log("Model");

                response = {
                    error: false,
                    status: 200,
                    msg: "OK",
                    students,
                };
                return response;
            } else {
                response = {
                    error: true,
                    status: 201,
                    msg: "No students",
                    students: "No students",
                };
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getStudentById(id) {
        try {
            console.log("Model: ", id);
            const studentRetrieved = await db("student").where("id", id);
            let response;

            if (studentRetrieved == []) {
                console.log(studentRetrieved);
                response = {
                    error: false,
                    status: 200,
                    msg: "OK",
                    studentRetrieved,
                };
            } else {
                response = {
                    error: true,
                    status: 201,
                    msg: "No student in that position",
                };
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateStudent(id, student) {
        const { firstName, lastname, email } = student;

        try {
            console.log("Model: ", id);
            const studentToUpdate = await db("student").where("id", id).update({
                firstName,
                lastname,
                email,
            });

            const studentUpdatedRetrieved = await db("student").where("id", id);
            let response;
            console.log(studentToUpdate);
            if (studentToUpdate === 1) {
                response = {
                    error: false,
                    status: 200,
                    msg: "Updated",
                    studentUpdatedRetrieved,
                };
            } else {
                response = {
                    error: true,
                    status: 201,
                    msg: "No student in that position",
                };
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteStudent(id) {
        try {
            const studentToDelete = await db("student").where("id", id).delete();
            let response;

            if (studentToDelete === 1) {
                response = {
                    status: 200,
                    error: false,
                    msg: `Delete student in position ${id}`,
                };
                return response;
            } else {
                response = {
                    status: 201,
                    error: true,
                    msg: "No student in that position",
                };
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    }
};