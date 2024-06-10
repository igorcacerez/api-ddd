import { QuestionsRepository } from '../repositories/questions-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { MakeQuestion } from 'test/factories/make-question';
import { Slug } from '../../enterprise/entities/value-objects/slug';

let questionRepository : QuestionsRepository
let sut : GetQuestionBySlugUseCase

describe('Busca de question por slug', () => {

	beforeEach(async () => {
		questionRepository = new InMemoryQuestionsRepository()
		sut = new GetQuestionBySlugUseCase(questionRepository)
	})

	test('deve ser capaz de buscar uma question pela slug', async () => {

		const newQuestion = MakeQuestion({
			title: 'Nova Pergunta',
			content: 'Nova Pergunta Conteudo',
			slug: Slug.create('nova-pergunta')
		})

		questionRepository.create(newQuestion)

		const { question } = await sut.execute({ 
			slug : 'nova-pergunta' 
		})
	
		expect(question.id).toBeTruthy()
		expect(question.content).toEqual('Nova Pergunta Conteudo')
		expect(question.title).toEqual('Nova Pergunta')
	})
}) 

