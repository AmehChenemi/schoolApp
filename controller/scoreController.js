const scoreModel = require('../models/scoreModel')
const regModel = require('../models/regModel')

exports.addScore =  async (req,res)=>{
    try{
       const { studentId, score} = req.body

    //    check if the student is registered or valid
    const student = await regModel.findById(studentId)
    if(!student || student.role !== "Student"){
        return res.status(401).json({message: 'student not found'})
    }

    // check if the studentscore is existing and fetch the existing score or create a new one
let existingScore = await scoreModel.findOne({studentId})
    
    if(!existingScore){
        existingScore = new scoreModel({studentId})
    }
    // update the score for subjects
    if(score.math){
        existingScore.math += score.math
    }

    if(score.english){
        existingScore.english += score.english
    }

    // save the score
    await existingScore.save()
    res.status(200).json({message:'score added successfully', data:existingScore})


    }catch(err){
        res.status(500).json(err.message)
    }
}
// get a student score
exports.getStudentScore = async(req,res)=>{
    try{
        const studentId = req.params.studentId
        // check if the student is valid
        const student = await regModel.findById(studentId)
        if(!student || student.role !=="Student"){
            return res.status(200).json({
                message: ' student not found'
            })
        }
        // fetch the student scor
        const studentScore = await scoreModel.findOne({studentId})
        if(!studentScore){
            return res.status(401).json({
                message: ' student score not found'
            })
        }

        // calculate the total and average score of the student
        const totalScore = studentScore.math + studentScore.english;
        const totalSubject = 2
        const averageScore = totalScore/totalSubject

        res.status(200).json({
            message: ' student score is :', 
            data:student, studentScore, totalScore, averageScore
        })

    }catch(err){

    }
}

exports.updateScore = async(req,res)=>{
    try{
        const studentId = req.params.studentId
        const  studentScore = req.body.scores
        const student = await regModel.findById(studentId)
        
        if(!student){
            return res.status(400).json({
                message: ' student not found'
            })
        }
        // use find by id to update the score 
        const options = {new:true,upsert:true}
        const update = await scoreModel.findOneAndUpdate({studentId},{$set:studentScore},options);

            res.status(200).json({
                message:' User score has been successfully Updated',
                update
            })
        }catch(err){
        res.status(500).json(err.message)
    }
}

exports.delete = async(req,res)=>{
    try{
        const studentId = req.params.studentId
// check if the student is valid
        const student = await regModel.findById(studentId);
        if(!student || student.role !=="Student"){
            return res.status(404).json({
                message:' student not found'
            })
        }

    
            // fetch the score of the student
            const studentScore = await scoreModel.findOneAndDelete({studentId})
            // also delete the student details from the regmodel
            await regModel.findByIdAndDelete(studentId)

            res.status(200).json({
                message: "user has been deleted successfully",
                data:studentScore
            })
        
        }catch(err){
    res.status(500).json({
        error:err.message
    })
}
}