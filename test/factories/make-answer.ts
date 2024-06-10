import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer';

// Partial, ele deixa todas as propriedades como opcionais
export function MakeAnswer(
	override: Partial<AnswerProps> = {},
	id?: UniqueEntityID
) {
	const answer = Answer.create({
		questionId: new UniqueEntityID(),
		authorId: new UniqueEntityID(),
		content: faker.lorem.text(),
		...override // Qualquer informação que foi passada no parametro ira sobrescrever a que ja foi add antes
	}, id)

	return answer
}