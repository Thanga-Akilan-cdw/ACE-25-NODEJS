import {jest} from '@jest/globals';
import { serviceLogger } from '../../logger/index.js';

jest.unstable_mockModule('../../services/search.service.js', ()=>({
    searchService: jest.fn()
}));

jest.unstable_mockModule('../../logger/index.js', () => ({
    serviceLogger: {
      info: jest.fn(),
      error: jest.fn()
    }
  }));


const { searchController } = await import('../../controllers/search.controller.js');
const { searchService } = await import('../../services/search.service.js');

describe('Search Controller', () => {

    it("search returns multiple fields", async ()=>{
        const user = {
            employeeID: 123,
            username: "Arum",
            designation: "Intern",
        }

        const mockReq = {
            params: { keyword: 'update' }
          };
      
          const mockRes = {
            send: jest.fn()
          };
      
          const mockNext = jest.fn();
      
          const mockResults = [
            { type: 'user', name: 'Alice' },
            { type: 'post', title: 'System Update' }
          ];
      
          searchService.mockResolvedValue(mockResults);
      
          await searchController(mockReq, mockRes, mockNext);
      
          expect(searchService).toHaveBeenCalledWith('update');
          expect(mockRes.send).toHaveBeenCalledWith(mockResults);
    })

    it('should return an empty array if no results are found', async () => {
        const mockReq = {
          params: { keyword: 'nonexistent' }
        };
      
        const mockRes = {
          send: jest.fn()
        };
      
        const mockNext = jest.fn();
      
        const mockResults = [];
      
        searchService.mockResolvedValue(mockResults);
      
        await searchController(mockReq, mockRes, mockNext);
      
        expect(searchService).toHaveBeenCalledWith('nonexistent');
        expect(mockRes.send).toHaveBeenCalledWith([]);
        expect(mockNext).not.toHaveBeenCalled();
      });


})