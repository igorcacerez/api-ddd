import { QuestionsRepository } from '../repositories/questions-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { MakeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditQuestionUseCase } from './edit-question';

let questionRepository : QuestionsRepository
let sut : EditQuestionUseCase

describe('Edição de Questão', () => {

	beforeEach(async () => {
		questionRepository = new InMemoryQuestionsRepository()
		sut = new EditQuestionUseCase(questionRepository)
	})

	test('deve ser capaz de editar uma questão', async () => {

		const newQuestion = MakeQuestion({
			authorId: new UniqueEntityID('1')
		}, new UniqueEntityID('id-edit'))

		questionRepository.create(newQuestion)

		await sut.execute({ 
			questionId: 'id-edit',
			authorId: '1',
			content: 'Novo Conteudo',
			title: 'Novo Titulo'
		})

		expect(questionRepository.items[0]).toMatchObject({
			content: 'Novo Conteudo',
			title: 'Novo Titulo'
		})
	
	})


	test('nao deve editar uma questao se o author nao for o mesmo', async () => {

		const newQuestion = MakeQuestion({
			authorId: new UniqueEntityID('1')
		}, new UniqueEntityID('id-edit'))

		questionRepository.create(newQuestion)

		await expect(() =>
			sut.execute({ 
				questionId: 'id-edit',
				authorId: '2',
				content: 'Novo Conteudo',
				title: 'Novo Titulo'
			})
		).rejects.toBeInstanceOf(Error)
	
	})
}) 

