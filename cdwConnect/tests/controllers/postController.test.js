import {beforeAll, jest} from '@jest/globals';
import { serviceLogger } from '../../logger/index.js';

jest.unstable_mockModule('../../services/post.service.js', ()=>({
    createPost: jest.fn(), 
    getAllPosts: jest.fn(), 
    deletePost: jest.fn(), 
    getPostByID: jest.fn(),
    likePostService: jest.fn(),
    commentPostService: jest.fn()
}));

jest.unstable_mockModule('../../logger/index.js', () => ({
    serviceLogger: {
      info: jest.fn(),
      error: jest.fn()
    }
  }));


const { likePostController, commentPostController, createPostController, getAllPostsController, getPostsByIdController, deletePostController } = await import('../../controllers/post.controller.js');
const {likePostService, commentPostService, createPost, getAllPosts, getPostByID, deletePost} = await import('../../services/post.service.js');
// const { serviceLogger } = await import('../../logger/index.js')


describe('Post Controller', () => {
    describe('Create Feed Feature', ()=>{
        let mockReq = {
            body : {
                "title":"Got Promotion",
                "location":"company",
                "contentLink":"url",
                "caption":"Hello"
                
            },
            user: {
                employeeID: 136634
            }
        }

        const mockRes = {
            send: jest.fn()
          };
      
        const mockNext = jest.fn();

        it('create post when request is valid', async()=>{

            createPost.mockResolvedValue();

            await createPostController(mockReq, mockRes, mockNext);

            expect(createPost).toHaveBeenCalledWith(mockReq.body, mockReq.user.employeeID);
            expect(mockRes.send).toHaveBeenCalled();
        }),
        it('Post Content not provided', async ()=> {

            mockReq = {
                user: {
                    employeeID: 136634
                }
            }

            createPost.mockResolvedValue();

            await createPostController(mockReq, mockRes, mockNext);

            expect(createPost).toHaveBeenCalled();
            const error = mockNext.mock.calls[0][0];
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Post Data not provided");
        }),
        it('User not Authenticated', async()=>{
            mockReq = {
                body : {
                    "title":"Got Promotion",
                    "location":"company",
                    "contentLink":"url",
                    "caption":"Hello"
                    
                },
                user: {}
            }

            createPost.mockResolvedValue();

            await createPostController(mockReq, mockRes, mockNext);

            expect(createPost).toHaveBeenCalled();
            const error = mockNext.mock.calls[1][0];
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("User not Authenticated");
        })
    }),

    describe('Fetch posts', ()=>{
        let mockReq = {
            query : {}
        }

        const mockRes = {
            send: jest.fn()
          };
      
        const mockNext = jest.fn();

        it('fetch all posts when employeeID is not specified', async ()=>{

            getAllPosts.mockResolvedValue();

            await getAllPostsController(mockReq, mockRes, mockNext);

            expect(getAllPosts).toHaveBeenCalled();
            expect(getAllPosts).toHaveBeenCalledWith(mockReq.query);
        }),
        it('fetch posts of users when email id is provided', async () => {
            mockReq = {
                query: {
                    email: "thangaakilan112@gmail.com"
                }
            }

            getAllPosts.mockResolvedValue();

            await getAllPostsController(mockReq, mockRes, mockNext);

            expect(getAllPosts).toHaveBeenCalled();
            expect(getAllPosts).toHaveBeenCalledWith({email: "thangaakilan112@gmail.com"});
        })
    }),

    describe('Fetch post by post ID', ()=>{
        let mockReq = {
            params: {
                postID: "6838a72632c132c2e5c09f25"
            }
        }

        const mockRes = {
            send: jest.fn()
          };
      
        const mockNext = jest.fn();

        it('fetch post when post ID id provided', async ()=>{
            getPostByID.mockResolvedValue()

            await getPostsByIdController(mockReq, mockRes, mockNext);

            expect(getPostByID).toHaveBeenCalled();
            expect(getPostByID).toHaveBeenCalledWith("6838a72632c132c2e5c09f25");
        })
    }),
    describe('Delete Post', ()=>{
        const mockRes = {
            send: jest.fn()
          };
      
        const mockNext = jest.fn();

        let mockReq = {
            params:{
                postID:"6838a72632c132c2e5c09f25"
            },
            user:{
                employeeID:13634
            }
        }
        it('delete post with proper attributes', async()=>{

            deletePost.mockResolvedValue();

            await deletePostController(mockReq, mockRes, mockNext);

            expect(deletePost).toHaveBeenCalledWith(13634, "6838a72632c132c2e5c09f25");

        }),
        it('when postID is not provided', async()=>{
            mockReq = {
                params:{},
                user:{
                    employeeID:13634
                }
            }
            deletePost.mockResolvedValue();

            await deletePostController(mockReq, mockRes, mockNext);

            expect(deletePost).toHaveBeenCalled();
            const error = mockNext.mock.calls[0][0];
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Post ID not provided");
            expect(error.statusCode).toBe(400);
        }),
        it('when employee ID is not provided', async()=>{
            mockReq = {
                params:{
                    postID:"6838a72632c132c2e5c09f25"
                },
                user:{}
            }
            deletePost.mockResolvedValue();

            await deletePostController(mockReq, mockRes, mockNext);

            expect(deletePost).toHaveBeenCalled();
            const error = mockNext.mock.calls[1][0];
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("User not Authenticated");
            expect(error.statusCode).toBe(401);
        })
    })

    describe('Like Feature', () => {
        const mockRes = {
            send: jest.fn()
          };
      
        const mockNext = jest.fn();

        it('on like add a value to DB', async () => {

            const mockReq = {
                user : {
                    employeeID: 12345
                },
                params: {
                    postID: 2345
                }
            }

            const mockRes = {
                send: jest.fn()
              };
          
            const mockNext = jest.fn();
            likePostService.mockResolvedValue(true);

            await likePostController(mockReq, mockRes, mockNext);

            expect(likePostService).toHaveBeenCalledWith( 12345, 2345);
            expect(await likePostService()).toBe(true)

        }),
        it('Post Identifier not provided', async ()=>{
            const mockReq = {
                user : {
                    employeeID: 12345
                },
                params: { }
            }
            likePostService.mockResolvedValue(true);

            await likePostController(mockReq, mockRes, mockNext);

            expect(likePostService).toHaveBeenCalled();
            const error = mockNext.mock.calls[0][0];
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Post ID not provided");
            expect(error.statusCode).toBe(400);
        })

    }),

    describe('Comment Feature', ()=>{
        let mockReq, mockRes, mockNext;
        beforeAll(()=>{
            mockReq = {
                user : {
                    employeeID: 12345
                },
                params: {
                    postID: 2345
                },
                body: { content: "Test comment" }
            }

            mockRes = {
                send: jest.fn()
              };
          
            mockNext = jest.fn();
        })
        it('add a comment with a request', async ()=>{
            
            commentPostService.mockResolvedValue(true);

            await commentPostController(mockReq, mockRes, mockNext);

            expect(commentPostService).toHaveBeenCalledWith(12345, 2345, "Test comment");
        }),
        it('Comment not provided', async ()=>{
            mockReq = {
                user : {
                    employeeID: 12345
                },
                params: {
                    postID: 2345
                },
            }
            commentPostService.mockResolvedValue(true);

            await commentPostController(mockReq, mockRes, mockNext);

            expect(commentPostService).toHaveBeenCalled();
            const error = mockNext.mock.calls[0][0];
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Content not provided");
            expect(error.statusCode).toBe(400);
        }),
        it('Post Identifier not provided', async ()=>{
            mockReq = {
                user : {
                    employeeID: 12345
                },
                params: { },
                body: { content: "Test comment" }
            }
            commentPostService.mockResolvedValue(true);

            await commentPostController(mockReq, mockRes, mockNext);

            expect(commentPostService).toHaveBeenCalled();
            const error = mockNext.mock.calls[1][0];
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("Post ID not provided");
            expect(error.statusCode).toBe(400);
        }),
        it('User not authenticated', async ()=>{
            mockReq = {
                user : {
                },
                params: {
                    postID: 2345
                },
                body: { content: "Test comment" }
            }
            commentPostService.mockResolvedValue(true);

            await commentPostController(mockReq, mockRes, mockNext);

            expect(commentPostService).toHaveBeenCalled();
            const error = mockNext.mock.calls[2][0];
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe("User not Authenticated");
            expect(error.statusCode).toBe(401);
        })
    })


})