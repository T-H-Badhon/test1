import { ZodError, ZodIssue } from "zod";
import { TErrorDetails } from "../interface";
const handleZodError =(err:ZodError) => {

    let errorDetails= {
        issues:err.issues.map((issue:ZodIssue) => {
            return {
                            field:issue?.path[issue.path.length - 1],
                            message:issue?.message
                }
        })
    }
    
    // console.log(err)
    let errorMessage = ''
      err.issues.forEach(
        (issue: ZodIssue) =>
          (errorMessage =
            errorMessage +
            `${issue?.path[issue.path.length - 1]} is ${issue.message}. `),
      )
    //   console.log(errorMessage)
   const  statusCode= 400; 
   return {
    statusCode,
    message:errorMessage,
    errorDetails
   }
}
export default handleZodError;




