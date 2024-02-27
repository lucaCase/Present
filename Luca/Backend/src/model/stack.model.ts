export class Stack {
    private _communities: Array<Community> = [];
    private _users: Array<User> = [];

    constructor() {
        this._users.push(new User("Luca", "luca.reisenbichler@htlstp.at", "Luca"));
        this._users.push(new User("Test", "germ@gmx.at", "Test"));
        this._users[1].id = "test";
        this._communities.push(new Community("Test", "Test", this._users[0].id));
        this._communities[0].addPost(new Post("Test", "Lorem Ipsum Irgandwos", this._users[0].id));
        this._communities[0].posts[0].addComment(new Comment("Test", "Lorem Ipsum Irgandwos"));
        this._communities[0].posts[0].comments[0].addComment(new Comment("Test", "Lorem Ipsum Irgandwos"));
        this._communities[0].posts[0].comments[0].comments[0].addComment(new Comment("Test", "Lorem Ipsum Irgandwos"));
        this._communities[0].posts[0].addComment(new Comment("Test", "Lorem Ipsum Irgandwos"));
        this._communities[0].posts[0].comments[1].addComment(new Comment("Test", "Lorem Ipsum Irgandwos"));
    }


    get communities(): Array<Community> {
        return this._communities;
    }

    get users(): Array<User> {
        return this._users;
    }

    public createCommunity(name: string, description: string, creator: string, isPublic: boolean = false): Community {
        const community: Community = new Community(name, description, creator, isPublic);
        this._communities.push(community);
        return community;
    }

    public createUser(name: string, email: string, password: string): User {
        const user: User = new User(name, email, password);
        this._users.push(user);
        return user;
    }

    getUser(id: string): User | undefined {
        return this._users.find((user: User) => user.id === id);
    }

    getUsers(id: string): Array<User> | undefined {
        const community: Community | undefined = this.getCommunity(id);
        if (community) {
            return this._users.filter((user: User) => community.members.includes(user.id));
        }
    }

    getCommunity(id: string): Community | undefined {
        return this._communities.find((community: Community) => community.id === id);
    }

    addPost(communityId: string, title: string, content: string, creator: string): Post | undefined {
        const community: Community | undefined = this.getCommunity(communityId);
        if (community) {
            const post: Post = new Post(title, content, creator);
            community.addPost(post);
            return post;
        }
    }

    upvotePost(communityId: string, postId: string): Post | undefined {
        const community: Community | undefined = this.getCommunity(communityId);
        if (community) {
            const post: Post | undefined = community.posts.find((post: Post) => post.id === postId);
            if (post) {
                post.upvote();
                return post;
            }
        }
    }

    downvotePost(communityId: string, postId: string): Post | undefined {
        const community: Community | undefined = this.getCommunity(communityId);
        if (community) {
            const post: Post | undefined = community.posts.find((post: Post) => post.id === postId);
            if (post) {
                post.downvote();
                return post;
            }
        }
    }

    upvoteComment(communityId: string, postId: string, commentId: string): Comment | undefined {
        const community: Community | undefined = this.getCommunity(communityId);
        if (community) {
            const post: Post | undefined = community.posts.find((post: Post) => post.id === postId);
            console.log(post?.comments.flat());
            if (post) {
                const comment: Comment | undefined = Utils.flatComments(post.comments).find((comment: Comment) => comment.id === commentId);
                if (comment) {
                    comment.upvote();
                    return comment;
                }
            }
        }
    }

    downvoteComment(communityId: string, postId: string, commentId: string): Comment | undefined {
        const community: Community | undefined = this.getCommunity(communityId);
        if (community) {
            const post: Post | undefined = community.posts.find((post: Post) => post.id === postId);
            if (post) {
                const comment: Comment | undefined = Utils.flatComments(post.comments).find((comment: Comment) => comment.id === commentId);
                if (comment) {
                    comment.downvote();
                    return comment;
                }
            }
        }
    }

    addComment(communityId: string, postId: string, content: string, creator: string): Comment | undefined {
        const community: Community | undefined = this.getCommunity(communityId);
        if (community) {
            const post: Post | undefined = community.posts.find((post: Post) => post.id === postId);
            if (post) {
                const comment: Comment = new Comment(content, creator);
                post.addComment(comment);
                return comment;
            }
        }
    }
}

class Community {
    private static readonly ID_LENGTH: number = 12;

    public id: string = Utils.generateId(Community.ID_LENGTH);
    public members: Array<string> = [];
    public posts: Array<Post> = [];


    constructor(public name: string, public description: string, public creator: string, public isPublic: boolean = true) {
        this.members.push(creator);
    }

    public addMember(memberId: string): void {
        this.members.push(memberId);
    }

    public removeMember(memberId: string): void {
        this.members = this.members.filter((id: string) => id !== memberId);
    }

    public addPost(post: Post): void {
        this.posts.push(post);
    }

    public removePost(postId: string): void {
        this.posts = this.posts.filter((post: Post) => post.id !== postId);
    }

    getPost(id: string, postId: string): Post | undefined {
        return this.posts.find((post: Post) => post.id === postId);
    }
}

class Post {
    private static readonly ID_LENGTH: number = 12;

    public id: string = Utils.generateId(Post.ID_LENGTH);
    public comments: Array<Comment> = [];
    public isDeleted: boolean = false;
    public isEdited: boolean = false;
    public ratio: number = 0;

    constructor(public title: string, public content: string, public creator: string) {}

    public addComment(comment: Comment): void {
        this.comments.push(comment);
    }

    public removeComment(commentId: string): void {
        this.isDeleted = true;
    }

    public editPost(title: string, content: string): void {
        this.title = title;
        this.content = content;
        this.isEdited = true;
    }

    public upvote(): void {
        this.ratio++;
    }

    public downvote(): void {
        this.ratio--;
    }
}

class Comment {
    private static readonly ID_LENGTH: number = 12;

    public id: string = Utils.generateId(Comment.ID_LENGTH);
    public isDeleted: boolean = false;
    public isEdited: boolean = false;
    public ratio: number = 0;
    public comments: Array<Comment> = [];

    constructor(public content: string, public creator: string) {}

    public removeComment(commentId: string): void {
        this.isDeleted = true;
    }

    public editComment(content: string): void {
        this.content = content;
        this.isEdited = true;
    }

    public addComment(comment: Comment): void {
        this.comments.push(comment);
    }

    public upvote(): void {
        this.ratio++;
    }

    public downvote(): void {
        this.ratio--;
    }
}

class User {
    private static readonly ID_LENGTH: number = 12;

    public id: string = Utils.generateId(User.ID_LENGTH);
    public password: number;

    constructor(public name: string, public email: string, password: string) {
        this.password = Utils.hashPassword(password);
    }


}



export class Utils {
    public static generateId(length: number): string {
        return Math.random().toString(36).substring(2, length)
    }

    public static hashPassword(password: string): number {
        let hash = 0;
        for (let i = 0, len = password.length; i < len; i++) {
            let chr = password.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0;
        }
        return hash;
    }

    static flatComments(comments: Array<Comment>): Array<Comment> {
        return comments.reduce((acc: Array<Comment>, comment: Comment) => {
            acc.push(comment);
            if (comment.comments.length > 0) {
                acc.push(...Utils.flatComments(comment.comments));
            }
            return acc;
        }, []);
    }
}