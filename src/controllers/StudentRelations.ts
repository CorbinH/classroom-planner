import { Student } from "@/models/Student";

export interface StudentRelations
{
  worksWellWith:Set<string>,
  distractedBy:Set<string>
}

export function getRelationKey(studentA:Student,studentB:Student) {
  return studentA.uuid < studentB.uuid ? studentA.uuid +"&"+studentB.uuid : studentB.uuid +"&"+studentA.uuid
}

export function addStudentRelation(studentRelations:StudentRelations,studentA:Student,studentB:Student,rType:"worksWellWith"|"distractedBy") {
  const key = getRelationKey(studentA,studentB)
  if(rType === "worksWellWith"){
    studentRelations.worksWellWith.add(key)
    studentRelations.distractedBy.delete(key)
  } else {
    studentRelations.worksWellWith.delete(key)
    studentRelations.distractedBy.add(key)
  }
  return structuredClone(studentRelations)
}

export function removeStudentRelation(studentRelations:StudentRelations,studentA:Student,studentB:Student,rType:"worksWellWith"|"distractedBy") {
  const key = getRelationKey(studentA,studentB)
  if(rType === "worksWellWith"){
    studentRelations.worksWellWith.delete(key)
  } else {
    studentRelations.distractedBy.delete(key)
  }
  return structuredClone(studentRelations)
}

export function findStudentRelations(studentRelations:StudentRelations,student:Student,rType:"worksWellWith"|"distractedBy") {
  const relations = rType === "worksWellWith" ? 
    studentRelations.worksWellWith.values().filter((uuid_combination)=> {return uuid_combination.includes(student.uuid)}) :
    studentRelations.distractedBy.values().filter((uuid_combination)=> {return uuid_combination.includes(student.uuid)})
  return relations.map((relationKey)=>{
    const s = relationKey.split("&")
    return student.uuid === s[0] ? s[1] : s[0]
  })
}