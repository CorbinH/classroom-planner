export interface Student {
  name:string,
  img:string | null,
  notes:string | null,
  works_well_with:Student[],
  distracted_by:Student[]
}