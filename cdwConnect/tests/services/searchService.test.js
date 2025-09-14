import { jest } from '@jest/globals';

jest.unstable_mockModule('../../utils/searchHandler.js', ()=>({
    search: jest.fn()
}))

const { searchService } = await import('../../services/search.service.js');
const { search } = await import('../../utils/searchHandler.js');

describe('Search Service', ()=>{
    it('when the keyword is provided', async()=>{
        const keyword = 'promotion';
        const result = [
            {
                "title":"Got Promotion",
                "location":"company",
                "contentLink":"url",
                "caption":"Hello"
                
            }
        ]
        search.mockResolvedValue(result);

        await searchService(keyword);

        expect(search).toHaveBeenCalled();
        expect(search).toHaveBeenCalledWith("promotion");

    })
})