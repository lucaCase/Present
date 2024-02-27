export class Community {
  constructor(public id: string, public name: string, public description: string, public creator: string, public isPublic: boolean, public members: Array<string> = [], public posts: Array<Post> = []) {}
}


export class Post {
  constructor(public id: string, public title: string, public content: string, public creator: string, public comments: Array<Comment> = [], public isDeleted: boolean, public isEdited: boolean, public ratio: number) {}
}

export class Comment {
  constructor(public id: string, public content: string, public creator: string, public isDeleted: boolean, public isEdited: boolean, public ratio: number, public comments: Array<Comment>) {}
}

export class Member {
  constructor(public id: string, public name: string, public password: number, public email: string) {}
}
