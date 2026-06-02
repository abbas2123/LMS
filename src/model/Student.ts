import mongoose, {Schema, Document} from "mongoose";

export interface IStudent{
    name: string;
    age: number;
    email: string;
    batch: string;
    course: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const studentSchema : Schema = new Schema<IStudent>({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [4, 'Name should contain four letters!'],
        trim: true
    },
    age:{
        type: Number,
        required: [true, 'Age is required'],
        min: [18, 'Age cannot be less than 18!'],
        max: [60, 'Age cannot be greater than 60!']
    },
    email: {
       type: String,
       required: [true, 'Email is required!'],
       unique: true,
       lowercase: true,
       trim: true,
       match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/, 'Please provide valid email!']
    },
    batch: {
        type: String,
        required: true,
        trim: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
},{
    timestamps: true
})

export default mongoose.model<IStudent>('Student', studentSchema);