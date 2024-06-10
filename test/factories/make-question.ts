import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question, QuestionProps } from '@/domain/forum/enterprise/entities/question';

// Partial, ele deixa todas as propriedades como opcionais
export function MakeQuestion(
	override: Partial<QuestionProps> = {},
	id?: UniqueEntityID
) {
	const question = Question.create({
		authorId: new UniqueEntityID(),
		content: faker.lorem.text(),
		title: faker.lorem.sentence(5),
		...override // Qualquer informação que foi passada no parametro ira sobrescrever a que ja foi add antes
	}, id)

	return question
}