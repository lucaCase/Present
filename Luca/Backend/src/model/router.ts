import {Router} from "express";
import {Stack} from "./stack.model";


export class ModelRouter {
    public router: Router = Router();
    public stack: Stack = new Stack();

    constructor() {
        this.router.get("/users", (req, res) => {
            res.json(this.stack.users);
        });

        this.router.get("/users/:id", (req, res) => {
            let x = this.stack.getUser(req.params.id);
            console.log(x);
            res.json(x);
        });

        this.router.post("/users", (req, res) => {
            const user = this.stack.createUser(req.body.name, req.body.email, req.body.password);
            res.json(user);
        });

        this.router.get("/communities", (req, res) => {
            res.json(this.stack.communities);
        });

        this.router.get("/communities/:id", (req, res) => {
            res.json(this.stack.getCommunity(req.params.id));
        });

        this.router.post("/communities", (req, res) => {
            console.log(req.body)
            const community = this.stack.createCommunity(req.body.name, req.body.description, req.body.creator, req.body.isPublic);
            res.json(community);
        });

        this.router.post("/communities/join/:id", (req, res) => {
            const community = this.stack.getCommunity(req.params.id);
            const user = this.stack.getUser(req.body.id);
            if (community && user && !community.members.includes(user.id)) {
                community.addMember(user.id);
                res.json(user);
            } else {
                res.status(404).send("Community or User not found or User is already a member of the community");
            }
        });

        this.router.post("/communities/leave/:id", (req, res) => {
            const community = this.stack.getCommunity(req.params.id);
            const user = this.stack.getUser(req.body.id);
            if (community && user && community.members.includes(user.id)) {
                community.removeMember(user.id);
                res.json(community);
            } else {
                res.status(404).send("Community or User not found or User is not a member of the community");
            }
        });

        /*this.router.get("/communities/:id/posts", (req, res) => {
            const community = this.stack.getCommunity(req.params.id);
            if (community) {
                res.json(community.posts);
            } else {
                res.status(404).send("Community not found");
            }
        });*/

        this.router.post("/communities/:id", (req, res) => {
            const community = this.stack.getCommunity(req.params.id);
            if (community) {
                res.send(this.stack.addPost(community.id, req.body.title, req.body.content, req.body.creator));
            } else {
                res.status(404).send("Community not found");
            }
        });

        /*

        this.router.get("communities/:id/posts/:postId", (req, res) => {
            const community = this.stack.getCommunity(req.params.id);
            if (community) {
                const post = community.getPost(req.params.id, req.params.postId);
                if (post) {
                    res.json(post);
                } else {
                    res.status(404).send("Post not found");
                }
            } else {
                res.status(404).send("Community not found");
            }
        });

         */

        this.router.post("/communities/:id/posts/:postId", (req, res) => {
            const community = this.stack.getCommunity(req.params.id);
            if (community) {
                const comment = this.stack.addComment(community.id, req.params.postId, req.body.content, req.body.creator);
                if (comment) {
                    res.json(comment);
                } else {
                    res.status(404).send("Post not found");
                }
            } else {
                res.status(404).send("Community not found");
            }
        });

        /*

        this.router.get("/communities/:id/users", (req, res) => {
            const members = this.stack.getUsers(req.params.id);
            if (members) {
                res.json(members);
            } else {
                res.status(404).send("Community not found");
            }
        });

         */

        this.router.post("/communities/:id/up", (req, res) => {
            const post = this.stack.upvotePost(req.params.id, req.body.postId);
            if (post) {
                res.json(post);
            } else {
                res.status(404).send("Post not found");
            }
        });

        this.router.post("/communities/:id/down", (req, res) => {
            const post = this.stack.downvotePost(req.params.id, req.body.postId);
            if (post) {
                res.json(post);
            } else {
                res.status(404).send("Post not found");
            }
        });

        this.router.post("/communities/:id/posts/:postId/up", (req, res) => {
            const comment = this.stack.upvoteComment(req.params.id, req.params.postId, req.body.commentId);
            if (comment) {
                res.json(comment);
            } else {
                res.status(404).send("Comment not found");
            }
        });

        this.router.post("/communities/:id/posts/:postId/down", (req, res) => {
            const comment = this.stack.downvoteComment(req.params.id, req.params.postId, req.body.commentId);
            if (comment) {
                res.json(comment);
            } else {
                res.status(404).send("Comment not found");
            }
        });

        this.router.get("/users/:id", (req, res) => {
            let password = req.body.password;
            let user = this.stack.getUser(req.params.id);
            if (user && user.password === password) {
                res.json(user);
            } else {
                res.status(404).send("User not found or wrong password");
            }
        });
    }
}