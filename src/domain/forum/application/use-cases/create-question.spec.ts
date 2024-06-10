import { QuestionsRepository } from '../repositories/questions-repository';
import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';

let questionRepository : QuestionsRepository
let sut : CreateQuestionUseCase

describe('Criação de questão', () => {

	beforeEach(async () => {
		questionRepository = new InMemoryQuestionsRepository()
		sut = new CreateQuestionUseCase(questionRepository)
	})

	test('deve ser capaz de criar uma questão', async () => {

		const { question } = await sut.execute({
			authorId: '111',
			content: 'Nova Pergunta Conteudo',
			title: 'Nova Pergunta'
		})
	
		expect(question.id).toBeTruthy()
		expect(question.content).toEqual('Nova Pergunta Conteudo')
		expect(question.title).toEqual('Nova Pergunta')
	})
}) 

