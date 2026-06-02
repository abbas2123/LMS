import { Request, Response, NextFunction } from 'express';
import { IStudent } from '../model/Student';
import StudentService from '../services/studentService';

class StudentController {
    private studentService: StudentService;

    constructor(studentService: StudentService) {
        this.studentService = studentService;
    }

    getAllStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const students = await this.studentService.getAllStudents();

            res.render('index', {
                title: 'Student management system',
                students,
                message: req.query.message || ''
            });

        } catch (error) {
            next(error);
        }
    };

    addStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const studentData = req.body as IStudent;

            await this.studentService.addStudent(studentData);

            res.redirect('/?message=Student added successfully.');
        } catch (error) {
            next(error);
        }
    };

    updateStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string;
            const studData = req.body as Partial<IStudent>;

            const updatedStudent = await this.studentService.updateStudent(id, studData);

            res.status(200).json({
                success: true,
                message: 'Student updated successfully',
                student: updatedStudent
            });

        } catch (error) {
            next(error);
        }
    };

    deleteStudent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string;

            const deleteStudent = await this.studentService.deleteStudent(id);

            if (!deleteStudent) {
                res.status(404).json({ success: false, message: 'Student not found.' });
                return;
            }

            res.status(200).json({ success: true, message: 'Student deleted successfully.' });

        } catch (error) {
            next(error);
        }
    };

    searchStudents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const search = req.query.query as string;

            const students = await this.studentService.searchStudents(search);

            res.json(students);

        } catch (error) {
            next(error);
        }
    };
}

export default StudentController;