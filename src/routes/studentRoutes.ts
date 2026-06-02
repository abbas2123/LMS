import express from "express";
import StudentController from "../controllers/studentController";
import StudentService from "../services/studentService";

const router = express.Router();

// Dependency Injection
const studentService = new StudentService();
const studentController = new StudentController(studentService);


router.get('/', studentController.getAllStudents.bind(studentController));
router.post('/add', studentController.addStudent.bind(studentController));
router.put('/update/:id', studentController.updateStudent.bind(studentController));
router.delete('/delete/:id', studentController.deleteStudent.bind(studentController));
router.get('/search', studentController.searchStudents.bind(studentController));

export default router;