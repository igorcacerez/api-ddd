import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

interface InstrutorProps {
    name: string
}

export class Instructor extends Entity<InstrutorProps> {
	static create(props : InstrutorProps, id ?: UniqueEntityID) {
		return new Instructor(props, id)
	}
}