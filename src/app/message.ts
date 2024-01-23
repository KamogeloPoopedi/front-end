export class Message {
    senderId: number | undefined;
  receiverId?: number;
  content?: string;
}

export interface MessageDTO{
    senderId : number,
    receiverId: number,
    content : string
  }
