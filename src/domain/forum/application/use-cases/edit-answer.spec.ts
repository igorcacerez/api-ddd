import { AnswersRepository } from '../repositories/answers-repository';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { MakeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditAnswerUseCase } from './edit-answer';

let answerRepository : AnswersRepository
let sut : EditAnswerUseCase

describe('Edição de Questão', () => {

	beforeEach(async () => {
		answerRepository = new InMemoryAnswersRepository()
		sut = new EditAnswerUseCase(answerRepository)
	})

	test('deve ser capaz de editar uma questão', async () => {

		const newAnswer = MakeAnswer({
			authorId: new UniqueEntityID('1')
		}, new UniqueEntityID('id-edit'))

		answerRepository.create(newAnswer)

		await sut.execute({ 
			answerId: 'id-edit',
			authorId: '1',
			content: 'Novo Conteudo',
		})

		expect(answerRepository.items[0]).toMatchObject({
			content: 'Novo Conteudo'
		})
	
	})


	test('nao deve editar uma questao se o author nao for o mesmo', async () => {

		const newAnswer = MakeAnswer({
			authorId: new UniqueEntityID('1')
		}, new UniqueEntityID('id-edit'))

		answerRepository.create(newAnswer)

		await expect(() =>
			sut.execute({ 
				answerId: 'id-edit',
				authorId: '2',
				content: 'Novo Conteudo'
			})
		).rejects.toBeInstanceOf(Error)
	
	})
}) 

