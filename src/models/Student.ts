import { Student } from "@phosphor-icons/react"

export interface Student {
  uuid:string,
  name:string,
  img:string | null,
  notes:string | null
}

export function getNewStudent(name=null, img=null, notes=null):Student {
  return {uuid:crypto.randomUUID(),name:name || "New Student",img: img || null,notes:notes ||null}
}