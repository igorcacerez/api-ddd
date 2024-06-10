import { Slug } from './slug';

test('deve transformar um texto em uma slug', () => {
	const  slug = Slug.createFromText('Exemple de texto de titulo')
	expect(slug.value).toEqual('exemple-de-texto-de-titulo')
})