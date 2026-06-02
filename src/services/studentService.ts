import Student, {IStudent} from "../model/Student";
import mongoose from "mongoose";


class studentService {
     async getAllStudents():Promise<IStudent[]>  {
        try {
            return await Student.find().sort({createdAt: -1})
        } catch (error) {
            throw new Error(`Error getting students ${error}`)
        }
     }
     async addStudent(studentData: IStudent): Promise<IStudent> {
        try {
            const student = new Student(studentData);
            return await student.save();
        } catch (error) {
            throw new Error('Error while adding new student.')
        }
     }
     async updateStudent(id: string, studData: Partial<IStudent>): Promise<IStudent | null> {
        try {
            if(!mongoose.Types.ObjectId.isValid(id)){
                throw new Error('Invalid student id!')
            }
            return await Student.findByIdAndUpdate(id, studData, {new: true, runValidators: true} );
        } catch (error) {
            throw new Error('Error while updating student details!')
        }
    }
    async deleteStudent(id:string):Promise<IStudent | null> {
        try {
            if(!mongoose.Types.ObjectId.isValid(id)){
                throw new Error('Invalid student id');
            }
            return await Student.findByIdAndDelete(id)
        } catch (error) {
            throw new Error('Error while updating student!');
        }
    }
    async searchStudents(query: string):Promise<IStudent[] | null > {
        try {
            if(!query){
                return await this.getAllStudents();
            }
            return await Student.find({
                $or: [
                    {name: {$regex: query, $options: 'i'}},
                    {email: {$regex: query, $options: 'i'}},
                    {course: {$regex: query, $options: 'i'}},
                    {batch: {$regex: query, $options: 'i'}},
                ]
            })
        } catch (error) {
            throw new Error('Error while searching students!')
        }
    }
}

export default studentService;