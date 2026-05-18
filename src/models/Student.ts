export interface Student {
  uuid:string,
  name:string,
  img:string | null,
  notes:string | null,
  works_well_with:Student[],
  distracted_by:Student[]
}