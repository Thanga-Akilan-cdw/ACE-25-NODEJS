import { jest } from '@jest/globals';

jest.unstable_mockModule('../../utils/postHandler.js', ()=>({
    storePostIntoDB: jest.fn(),
    getPosts: jest.fn(),
    getPost: jest.fn(),
    removePost: jest.fn(),
    commentPost: jest.fn(),
    likePost: jest.fn()
}))

const { createPost, getAllPosts, getPostByID, deletePost, likePostService } = await import('../../services/post.service.js');
const { storePostIntoDB, getPosts, getPost, removePost, likePost } = await import('../../utils/postHandler.js');

describe('Post Services', ()=>{
    describe('Create Post', ()=>{
        let postdata = {
            title:"Promotion", 
            location:"Chennai", 
            contentLink:"url", 
            caption:"Good day"
        }

        const employeeID = 13934;
        it('create post with data and employeeID', async()=>{
            storePostIntoDB.mockResolvedValue();

            await createPost(postdata, employeeID);

            expect(storePostIntoDB).toHaveBeenCalled();
            // expect(storePostIntoDB).toHaveBeenCalledWith(postdata, employeeID);
        })
    }),
    describe('get all posts', ()=>{

        it('Get all posts when employee ID is not specified', async () => {

            getPosts.mockResolvedValue();

            await getAllPosts();

            expect(getPosts).toHaveBeenCalled();
        })
    }),
    describe('get post by post ID', ()=>{
        let postID = "6838a72632c132c2e5c09f25";
        const post = {
            title:"Promotion", 
            location:"Chennai", 
            contentLink:"url", 
            caption:"Good day"
        }

        it('return post when post ID provideed', async ()=>{
            getPost.mockResolvedValue(post);

            let resultPost = await getPostByID(postID);

            expect(resultPost).toBe(post);
        })
    }),
    describe('delete Post', ()=>{
        const employeeID = 13634
        const postID = "6838a72632c132c2e5c09f25"
        it('delete when postID is provided', async () => {

            removePost.mockResolvedValue();

            await deletePost(employeeID, postID);

            expect(removePost).toHaveBeenCalledWith(employeeID, postID);
        })
    }),
    describe('like post', ()=>{
        const employeeID = 13634
        const postID = "6838a72632c132c2e5c09f25"
        it('like post when credentials are provided', async ()=>{
            likePost.mockResolvedValue();

            await likePostService(employeeID, postID);

            expect(likePost).toHaveBeenCalledWith(employeeID, postID);
        })
    })
})